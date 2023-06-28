const HttpError = require('../models/httpError');
const Person = require('../models/user');
Person.watch().
    on('change', data => console.log(new Date(), data));

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const newUser = new Person({
        name,
        email,
        password,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRholMhydH0A3KqdWelqNqBG_YgCPQaOXa2vS2SufTU5w&usqp=CAU&ec=48600113',
        lists: []
    });
    console.log(newUser);
    try {
        await newUser.save();

    } catch (err) {
        const error = new HttpError(' Could not create new account now. try again later. ');
        return next(error);
    }
    res.status(200).json({ usernew: newUser.toObject({ getters: true }) });
}
const updateOne = async (req, res, next) => {
    const docID = req.params.cid;

    let requestedDocument;
    try {

        requestedDocument = await Person.findOneAndUpdate({ _id: docID }, { email: req.body.email, password: req.body.password });

    } catch (error) {
        const err = new HttpError('Could update user data, please try again.', 400);
        return next(err);
    }
    res.status(200).json({ message: "Document updated successfully.. " });
}
exports.createUser = createUser;
exports.updateOne = updateOne;