
const User = require("../users/model");
const Follow = require("./model");

exports.createFollowing = async (req, res, next) => {
  const { userId,userFollowId } = req.body;

  const follow = await new Follow({
    user: userId,
    follower: userFollowId,
  }).save();
  const user  = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { followers: userFollowId } },
    { new: true }
  );
  await User.findOneAndUpdate(
    { _id: userFollowId },
    { $push: { following: userId } },
    { new: true }
  )
  res.send({users :user});
 };

exports.createUnFollowing = async (req, res, next) => {
  const { userId,userFollowId } = req.body;

  const follow = await Follow.findOneAndRemove({
    user: userId,
    follower: userFollowId,
  })
  const user  = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { followers: userFollowId } },
    { new: true }
  )
  await User.findOneAndUpdate(
    { _id: userFollowId },
    { $pull: { following: userId } },
    { new: true }
  )
  res.send({users:user});
 };
// exports.deteleLikeNews = async (req, res, next) => {
//   const { userId, postId } = req.body;
//   const like = await Like.findOneAndRemove({ user: userId, post: postId });
//   // Delete like from users collection
//   await User.findOneAndUpdate(
//     { _id: like.user },
//     { $pull: { likes: like.id } },
//     { new: true }
//   );
//   // Delete like from posts collection
//   const post = await Post.findOneAndUpdate(
//     { _id: like.post },
//     { $pull: { likes: like.id } },
//     { new: true }
//   )
//     .populate("likes")
//     .populate({
//       path: "comments",
//       options: { sort: { createdAt: "desc" } },
//       populate: { path: "author" },
//     })
//     .populate({
//       path: "author",
//     });
//   res.send(post);
// };
