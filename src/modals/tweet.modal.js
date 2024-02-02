const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
    {
        tweetContent: {
            type: String,
            required: true,
        },
        tweetImage: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);;