const express = require('express');
const router = express.Router();
const citizen = require('../controllers/citizen-routes-controller');
const { check } = require('express-validator');

router.get('/:cid/getlist', citizen.getAllLists);
router.post('/newList', citizen.createNewList);
router.post('/login',
    [
        check('password').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
    ]
    , citizen.login);
module.exports = router;