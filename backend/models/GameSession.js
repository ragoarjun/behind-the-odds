const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    game: {
        type: String,
        default: "MINES"
    },

    betAmount: {
        type: Number,
        required: true
    },

    mineCount: {
        type: Number,
        required: true
    },

    board: {
        type: [Boolean],
        required: true
    },

    revealedTiles: {
        type: [Number],
        default: []
    },

    currentMultiplier: {
        type: Number,
        default: 1
    },

    status: {
        type: String,
        enum: [
            "PLAYING",
            "LOST",
            "CASHED_OUT"
        ],
        default: "PLAYING"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "GameSession",
    gameSessionSchema
);