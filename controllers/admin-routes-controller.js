const httpError = require('../models/httpError');
const shopper = require('../models/user');
const itemsList = require('../models/list');
const { validationResult } = require('express-validator');

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new httpError("Wrong input added, try again. ", 400);
        return next(error);
    }

    const newUser = new shopper({
        name: req.body.name,
        email: req.body.email,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCTQq9_asJNMnRObk_8P_uoKQeQPcwFigyXw&usqp=CAU",
        password: req.body.password,
        lists: []
    });
    let user;
    try {
        user = await newUser.save();
    } catch {
        const error = new httpError("Could not create new User", 400);
        return next(error);
    }
    user.password = 0;
    user.email = 0;

    res.status(200).json({
        message: " New User Logged In!!",
        createdUser: user.toObject({ getters: true })
    })
}

const updateOne = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new httpError("Wrong input added, try again. ", 400);
        return next(error);
    }
    let requestedUser;
    try {
        requestedUser = await shopper.findOneAndUpdate(
            { _id: req.params.cid },
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        );
    }
    catch (err) {
        const error = new httpError("Could not create user!", 400);
        return next(error);
    }

    res.status(200).json({
        message: " Your records are updated, " + requestedUser.name
    });
}

exports.createUser = createUser;
exports.updateOne = updateOne;