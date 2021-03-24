
const User = require("../users/model");
const Story = require("./model");

exports.createStory = async (req, res, next) => {
  const { userId, title } = req.body;
  console.log(userId,title)
  const story = await new Story({
    user: userId,
    title:title,
  }).save();
  const user  = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { followers: userFollowId } },
    { new: true }
  ).populate({
    path: "followers",
  })
  .populate({
    path: "following",
  });
  await User.findOneAndUpdate(
    { _id: userFollowId },
    { $push: { following: userId } },
    { new: true }
  )
  res.send(user);
 };

exports.createUnFollowing = async (req, res, next) => {
  const { userId,userFollowId } = req.body;
  console.log(userId,userFollowId)
  const follow = await new Follow({
    user: userId,
    follower: userFollowId,
  }).save();
  const user  = await User.findOneAndRemove(
    { _id: userId },
    { $pull: { followers: userFollowId } },
    { new: true }
  ).populate({
    path: "followers",
  })
  .populate({
    path: "following",
  });
  await User.findOneAndUpdate(
    { _id: userFollowId },
    { $pull: { following: userId } },
    { new: true }
  )
  res.send(user);
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
