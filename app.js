require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const error124 = require('./models/httpError');
const { graphqlHTTP } = require('express-graphql'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const publicRoutes = require('./routes/public-routes');
const adminRoutes = require('./routes/admin-routes');
app.use('/public', publicRoutes);
app.use('/admin', adminRoutes);



const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');


app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver, 
    graphiql: true
}));


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

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kfazawl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(PORT, function () { console.log('Server started on port 5000.') });
    })
    .catch(err => {
        console.log(err);
    });
