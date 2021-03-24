const  mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Post schema that has references to User, Like and Comment schemas
 */
const commentSchema = Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
