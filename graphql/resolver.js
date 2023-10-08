const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    createUser: async function({ userInput }, req) {
        //const email = args.userInput.email;
        const existingUser = await User.findOne({email : userInput.email}, "-password -")
        if(existingUser){
            const error = new Error("User exists already!", 400);
            return next(error);
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