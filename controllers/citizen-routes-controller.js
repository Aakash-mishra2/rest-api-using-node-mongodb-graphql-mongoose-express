const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const Error = require('../models/httpError');
const List = require('../models/list');
const Person = require('../models/user');
const getAllLists = async (req, res, next) => {
    const userID = req.params.cid;
    let requestedUser;
    try {
        requestedUser = await Person.findById(userID).populate('lists', " items ");

    } catch (err) {
        const error = new Error(' Could not find lists, try again later. ', 400);
        next(error);
    }
    console.log(requestedUser);
    if (!requestedUser || requestedUser.lists.length === 0) { return next(new HttpError('No lists for this user found. Create one. ', 400)) };
    res.json({ foundLists: requestedUser.lists.map(item => item.toObject({ getters: true })) });
};
const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty) {
        console.log(errors);
        throw new HttpError('Invaid credentials could not log you in', 400);
    }
    let existingUser;
    try {
        existingUser = await Person.findOne({ email: req.body.email });
    } catch (err) {
        const error = new Error('Login failed for now, try later. ', 400);
        return next(error);
    }

    if (!existingUser || existingUser.password !== req.body.password) {
        const error = new Error('Invalid credentials, could not log in. ', 400);
        return next(error);
    }
    existingUser.password = 0;
    existingUser.email = 0;
    res.status(200).json({ LoginFound: existingUser });
}
const createNewList = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty) {
        console.log(errors);
        throw new HttpError('Invalid Input passed, please check your data. ', 404);
    }
    const { items, email } = req.body;
    let user;
    try {
        user = await Person.findOne({ email: req.body.email }, '-password -name');
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
        listGeneratedAt: new Date(),
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
    console.log(user);
    res.status(200).json({ message: "success", newList: newList.items });
}
exports.createNewList = createNewList;
exports.getAllLists = getAllLists;
exports.login = login;