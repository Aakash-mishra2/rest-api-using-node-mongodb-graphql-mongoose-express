const Citizen = require('../models/user');
const ShopList = require('../models/list');
const ShopError = require('../models/httpError');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const getAllLists = async (req, res, next) => {
    let requestedUser;

    try {
        requestedUser = await Citizen.findById(req.params.cid).populate('lists', "items");
    }
    catch (err) {
        const error = new Error(" Could not process you request from Database, Try again later", 400);
        return next(error);
    }
    if (!requestedUser || requestedUser.lists.length === 0) {
        const error = new Error(" No lists exist for the requested User.", 400);
        return next(error);
    }

    res.status(200).json({
        message: "Found your lists",
        shoplist: requestedUser.lists.map(item => item.toObject({ getters: true }))
    });
}
const createNewList = async (req, res, next) => {

    let myUser;
    try {
        myUser = await Citizen.findById(req.body.userID);
    } catch (err) {
        const error = new Error(" Could not find requested User. ", 400);
        return next(error);
    }
    console.log(myUser);

    const newList = new ShopList({
        items: req.body.items,
        listGeneratedAt: new Date(),
        customer: req.body.userID
    });
    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await newList.save({});
        await myUser.lists.push(newList);
        await myUser.save();
        sess.commitTransaction();
        sess.endSession()
    }
    catch (err) {
        const error = new Error(" Could not commit session for this new List ", 400);
        return next(error);
    }

    res.status(200).json({
        message: "New List created !!",
        createdList: newList.toObject({ getters: true })
    });
}
const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid input passed! Try again!", 400);
        return next(error);
    }
    let loginUser;
    try {
        loginUser = await Citizen.findOne({ email: req.body.email });
    } catch (err) {
        const error = new Error(" Some error occured at database. Try again later", 400);
        return next(error);
    }
    console.log(loginUser);
    if (!loginUser || loginUser.password !== req.body.password) {
        const error = new Error(" Invalid credentials entered. Try login Again. ", 400);
        return next(error);
    }
    loginUser.password = 0;
    res.status(200).json({
        message: "Login successful." + loginUser.name,
        helloUser: loginUser.toObject({ getters: true })
    });
}

exports.login = login;
exports.createNewList = createNewList;
exports.getAllLists = getAllLists;