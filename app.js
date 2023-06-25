require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const publicRoutes = require('./routes/public-routes');
app.use('/public', publicRoutes);

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
