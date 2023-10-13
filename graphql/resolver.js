const User = require('../models/creator');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { __validationErrors } = require('./schema');

module.exports = {
    createUser: async function({ userInput }, req) {
        //const email = args.userInput.email;
        let errors = [];
        if(!validator.isEmail(userInput.email)){
            errors.push({ message: 'E-mail is invalid. '});
        }
        if( validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5})){
            errors.push({ message: 'Passwords too short! '});
        }
        if(errors.length > 0){
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 1783;
            throw error;
        }
        const existingUser = await User.findOne({email : userInput.email});
        if(existingUser){
            const error = new Error("User exists already!", 400);
            throw error;
        }
        const haspav = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: haspav
        });
        const createdUser = await user.save();
            return { ...createdUser._doc, _id: createdUser._id.toString()};        
    }
};