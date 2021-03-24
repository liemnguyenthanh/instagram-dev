const  mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Post schema that has references to User, Like and Comment schemas
 */
const likeSchema = Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status : {
      type :Boolean ,
      default : false
    }
  },
  {
    timestamps: true,
  }
);

const likeModel = mongoose.model("Like", likeSchema);
module.exports = likeModel;
