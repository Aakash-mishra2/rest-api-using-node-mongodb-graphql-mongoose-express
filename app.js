require('dotenv').config();
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const publicRoutes = require('./routes/public-routes');

app.use('/public', publicRoutes);

app.listen(PORT, () => {
    console.log("Server started at 5000");
})
