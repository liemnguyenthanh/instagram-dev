const express = require('express');
const { isAuth } = require('../../middlewares/auth');
const controller = require('./controller');
const router = express.Router();


router.post('/',isAuth,controller.createLikeNews );
router.put('/',isAuth,controller.deteleLikeNews );
module.exports = router;
