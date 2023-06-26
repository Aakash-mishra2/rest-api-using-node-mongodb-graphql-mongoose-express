const Error = require('../models/httpError');

const getAll = async (req, res, next) => {
    try {
        //fetch all users from database 
    } catch (err) {
        const error = new Error(' Could not find Users, try again later. ', 400);
        next(error);
    }
    res.json({ message: "all okay. 3 am" });
};
const loginOne = async (req, res, next) => {
    const { name, email, password } = req.body();

    try {
        //search for existing user with matching credentials
    } catch (err) {
        const error = new Error('Login failed for now, try later. ', 400);
        next(error);
    }
    if (!existingUser || existingUser.password != password) {
        const error = new Error('Invalid credentials, could not log in. ', 400);
        next(error);
    }
    existingUser.password = 0;
    existingUser.email = 0;
    res.status(200).json({ LoginFound: existingUser });
    res.json({ message: "all okay. 4 am. " });
}


exports.getAll = getAll;
exports.loginOne = loginOne;