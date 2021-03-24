const Post = require("../posts/model");
const User = require("../users/model");
const Comment = require("./model");
exports.createCommentNews = async (req, res, next) => {
  const { comment, userId, postId } = req.body;

  const newComment = await new Comment({
    comment,
    author: userId,
    post: postId,
  }).save();

  // Push comment to post collection
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: newComment.id } },
    { new: true }
  )
    .populate({
      path: "author",
    })
    .populate("likes")
    .sort("-createdAt")
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "author" },
    });
  // Push comment to user collection
  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { comments: newComment.id } }
  );

  res.send(post);
};
