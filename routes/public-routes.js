const express = require('express');
const router = express.Router();
const citizen = require('../controllers/citizen-routes-controller');

router.get('/get', citizen.getAll);

module.exports = router;