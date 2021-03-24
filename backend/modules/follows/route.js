const express = require('express');
const { isAuth } = require('../../middlewares/auth');
const controller = require('./controller');
const router = express.Router();


router.post('/follower',isAuth,controller.createFollowing );
router.put('/unfollow',isAuth,controller.createUnFollowing );
module.exports = router;
