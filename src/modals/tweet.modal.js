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
        userName: {
            type: String,
            ref: "Users",
            required: true,
        }
    },
    { timestamps: true }
);
const Tweet = mongoose.model("Tweets", tweetSchema);
module.exports = Tweet;