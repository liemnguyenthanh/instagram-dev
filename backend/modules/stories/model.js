const  mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storySchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type:String ,
      require : true,
    },
  },
  {
    timestamps: true,
  }
);

const storyModel = mongoose.model("Story", storySchema);
module.exports = storyModel;
