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
        isApproved: {
            type: Boolean,
        },
        rejectReason: {
            type: String,
        },
        userKeyHash: {
            type: String,
        },
    },
    { timestamps: true }
);
const User = mongoose.model("Users", userSchema);
module.exports = User;