const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            min: 6,
            max: 200,
        },
        imageUrl: {
            type: String,
        },
        isApproved: {
            type: Boolean,
        },
        rejectReason: {
            type: String,
        },
    },
    { timestamps: true }
);
const User = mongoose.model("Users", userSchema);
module.exports = User;