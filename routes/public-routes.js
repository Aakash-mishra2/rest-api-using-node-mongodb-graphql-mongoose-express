const express = require('express');
const router = express.Router();
const citizen = require('../controllers/citizen-routes-controller');

router.get('/get', citizen.getAll);
router.post('/login', citizen.loginOne);
module.exports = router;