const HttpError = require('../models/httpError');

const updateOne = async (req, res, next) => {
    const docID = req.params.cid;
    let reqDOC;
    try {
        //fetch requested document from database.
    } catch (error) {
        const err = new HttpError('Could not fetch data, please try again.', 400);
    }

    const { newUserName, newEmail } = req.body();
    //update document elements by request body
    reqDOC.email = newEmail;
    reqDOC.userName = newUserName;

    try {
        //save updated Document.
    } catch (err) {
        const error = new HttpError(' Could not find DOC, some error occured', 400);
        return next(error);
    }

    res.status(200).json({ message: " updated the document. " })
}

exports.updateOne = updateOne;