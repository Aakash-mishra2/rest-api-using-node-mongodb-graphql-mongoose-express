const { default: mongoose } = require('mongoose');
const HttpError = require('../models/httpError');
const Error = require('../models/httpError');
const List = require('../models/list');
const Person = require('../models/user');
const getAll = async (req, res, next) => {
    try {
        //fetch all users from database 
    } catch (err) {
        const error = new Error(' Could not find Users, try again later. ', 400);
        next(error);
    }
    res.json({ message: "all okay. 3 am" });
};
const login = async (req, res, next) => {
    const { name, email, password } = req.body();

    try {
        //search for existing user with matching credentials
    } catch (err) {
        const error = new Error('Login failed for now, try later. ', 400);
        return next(error);
    }
    if (!existingUser || existingUser.password != password) {
        const error = new Error('Invalid credentials, could not log in. ', 400);
        return next(error);
    }
    existingUser.password = 0;
    existingUser.email = 0;
    res.status(200).json({ LoginFound: existingUser });
    res.json({ message: "all okay. 4 am. " });
}
const createNewList = async (req, res, next) => {



    const { items, email } = req.body();
    let user;
    try {
        const user = await Person.findOne({ email: email }, '-password -name');
    } catch (err) {
        const error = new HttpError(' An unknown error occured, please try again. ', 400)
    }
    if (!user) {
        const error = new HttpError(' This email account does not exist, please try again. ', 400);
        return next(error);
    }

    let newList;
    newList = new List({
        items,
        customer: user._id
    });
    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await newList.save();
        await user.lists.push(newList);
        await user.save();
        await sess.commitTransaction();
        sess.endSession();
    }
    catch (err) {
        const error = " Add new list session failed, try again later. ";
        return next(error);
    }

    res.status(200).json({ newList: newList.items });
}
exports.createNewList = createNewList;
exports.getAll = getAll;
exports.login = login;