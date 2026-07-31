const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    game: {
        type: String,
        required: true,
        trim: true
    },

    result: {
        type: String,
        enum: ["WIN", "LOSS"],
        required: true
    },

    betAmount: {
        type: Number,
        required: true,
        min: 1
    },

    payout: {
        type: Number,
        default: 0,
        min: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);