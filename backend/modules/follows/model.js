const  mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Follow schema that has references to User schema
 */
const followSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const followModel = mongoose.model("Follow", followSchema);
module.exports = followModel;
