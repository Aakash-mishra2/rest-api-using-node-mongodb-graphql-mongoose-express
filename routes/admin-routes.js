const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin-routes-controller');
const { check } = require('express-validator');

router.post('/signup', [
    check('email').normalizeEmail().isEmail(),
    check('name').not().isEmpty(),
    check('password').isAlphanumeric()
], admin.createUser);

router.post('/update/:cid', [
    check('password').isAlphanumeric(),
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail()
], admin.updateOne);

module.exports = router;