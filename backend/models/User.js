const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        default: 1000
    },

    breakActive: {
        type: Boolean,
        default: false
    },

    breakStart: {
        type: Date,
        default: null
    },

    breakEnd: {
        type: Date,
        default: null
    },

    cooldownActive: {
        type: Boolean,
        default: false
    },

    cooldownEnd: {
        type: Date,
        default: null
    },

    sessionLosses: {
        type: Number,
        default: 0
    },

    sessionGames: {
    type: Number,
    default: 0
    },

    sessionActive: {
        type: Boolean,
        default: false
    },

    sessionStartedAt: {
        type: Date,
        default: null
    },

    lastSessionSummary: {
        type: Date,
        default: null
    },

    sessionWagered: {
    type: Number,
    default: 0
    },

    sessionNetLoss: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "User",
    userSchema
);