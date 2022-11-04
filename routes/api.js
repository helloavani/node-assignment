const express = require('express');
const router = express.Router();
const controller = require('../controllers/userService');


router.post('/add-user',controller.addUser);


module.exports = router;
