const Post = require("../posts/model");
const User = require("../users/model");
const Like = require("./model");

exports.createLikeNews = async (req, res, next) => {
  const { userId, postId } = req.body;

  const like = await new Like({
    user: userId,
    post: postId,
    status: true,
  }).save();

  // Push like to post collection
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { likes: like.id } },
    { new: true }
  )
    .populate("likes")
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "author" },
    })
    .populate({
      path: "author",
    });
  // Push like to user collection
  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { likes: like.id } },
    { new: true }
  );

  res.send(post);
};
exports.deteleLikeNews = async (req, res, next) => {
  const { userId, postId } = req.body;
  const like = await Like.findOneAndRemove({ user: userId, post: postId });
  // Delete like from users collection
  await User.findOneAndUpdate(
    { _id: like.user },
    { $pull: { likes: like.id } },
    { new: true }
  );
  // Delete like from posts collection
  const post = await Post.findOneAndUpdate(
    { _id: like.post },
    { $pull: { likes: like.id } },
    { new: true }
  )
    .populate("likes")
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "author" },
    })
    .populate({
      path: "author",
    });
  res.send(post);
};
