require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const error124 = require('./models/httpError');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const dataString = process.env.DATABASE_URL;
mongoose.connect(dataString);
const database = mongoose.connection();
database.on('error', () => {
    console.log(error);
})
database.once('connected', () => {
    console.log("database - connected");
})


const publicRoutes = require('./routes/public-routes');
app.use('/public', publicRoutes);

//only runs incase of no response from controllers - 
app.use((req, res, next) => {
    const error = new error124(' we do not support this route yet. ', 404);
    return next(error);
});
//applied on error holding request by express.js 
app.use((error, req, res, next) => {
    if (res.headerSent) {
        //wont send a response on our own if one already sent.
        return next(error);
    }
    res.status(error.errorStatusCode || 500);
    //for the attatched client.
    res.json({ message: error.message || 'An unknown error occured!' });
})

app.listen(PORT, () => {
    console.log("Server started at 5000");
})
