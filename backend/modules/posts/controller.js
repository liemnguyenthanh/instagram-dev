const Post = require("./model");
const User = require("../users/model");
const bcrypt = require("bcryptjs");
exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "author",

      })
      .populate("likes")
      .sort('-createdAt')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: 'desc' } },
        populate: { path: 'author' },
      })
      ;
    if (posts) {
      res.status(201).send(posts);
    } else {
      res.status(201).send("counld not find posts");
    }
  } catch (error) {
    next(error);
  }
};
exports.getMyPost = async (req, res, next) => {
  try {

    const posts = await Post.find({ author : req.params.author })
      .populate({
        path: "author",

      })
      .populate("likes")
      .sort('-createdAt')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: 'desc' } },
        populate: { path: 'author' },
      })
      ;
    if (posts) {
      res.status(201).send(posts);
    } else {
      res.status(201).send("counld not find posts");
    }
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      author: req.body.idUser,
    });

    //save Post
    await post.save();
    await User.findOneAndUpdate(
      { _id: req.body.idUser },
      { $push: { posts: post.id } }
    );

    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
};
