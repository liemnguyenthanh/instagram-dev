const express = require('express');
const { isAuth } = require('../../middlewares/auth');
const controller = require('./controller');
const router = express.Router();

router.post('/',isAuth ,controller.createCommentNews );
module.exports = router;
