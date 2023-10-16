const User = require('../models/creator');
const Post = require('../models/post');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { __validationErrors } = require('./schema');
const mongoose = require('mongoose');
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
    },
    deleteUser: async function({userId}, req){
        let errors = [];
        const existingUser = await User.findOne({_id : userId});
        if(!existingUser){
            const error = new Error("USER DOES NOT EXIST", 590);
            throw error;
        }
        try{
            const res = await User.deleteOne({_id: userId});
        }
        catch (err){ throw new Error('some error! '); }
        return {...existingUser._doc, _id: existingUser._id.toString()};
    },
    createPost: async function({postInput}, req){
        let errors = [];
        if( !validator.isLength(postInput.title, { min: 10})){
            errors.push({message: 'Post has a short title. Invalid too. '});
        }
        let existingPost;
        try{
             existingPost = await Post.findOne({title: postInput.title});
        }catch(err) { errors.push("Some error occured"); }
        if(existingPost){
           errors.push({message: "Post with given title exists! Create New!"});
        }
        let existingUser;
        try{
            existingUser = await User.findById(postInput.creatorId);
        }catch(err) { errors.push("Some error occured"); }
        if(!existingUser){
          errors.push({message: "Could not find this creator"});
        }
        if(errors.length>0){
            const err = new Error('Invalid title. ');
            error.data = errors;
            error.code = 34353;
            throw error;
        }
        const post = new Post({
            title: postInput.title,
            content: postInput.content,
            creator: postInput.creatorId
        });
        const createdPost = await post.save();
        return {...createdPost._doc, _id: createdPost._id.toString()};
    }
};