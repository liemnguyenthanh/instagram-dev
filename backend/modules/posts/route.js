const express = require('express');
const { isAuth } = require('../../middlewares/auth');
const controller = require('./controller');
const validation= require('./validation');

const router = express.Router();


router.post('/', isAuth ,controller.createPost );
router.get('/', isAuth ,controller.getPost );
router.get('/mypost/:author',controller.getMyPost );
module.exports = router;
