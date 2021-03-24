const express = require('express');
const controller = require('./controller');
const validation= require('./validation');

const router = express.Router();


router.post('/signup',controller.registerUser );
router.post('/signin', validation.signinValidation,controller.signinUser);
//get all users
router.get('/',controller.getUsers);
//get user by name
router.get('/:id',controller.getUsersById);
module.exports = router;
