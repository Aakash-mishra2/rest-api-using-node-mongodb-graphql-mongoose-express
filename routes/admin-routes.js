const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin-routes-controller');

router.post('/signup', admin.createUser);
router.post('/update/:cid', admin.updateOne);

module.exports = router;