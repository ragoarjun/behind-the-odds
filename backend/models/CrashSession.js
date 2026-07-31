const mongoose = require("mongoose");

const crashSessionSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    betAmount: {

        type: Number,

        required: true,

        min: 1

    },

    crashPoint: {

        type: Number,

        required: true

    },

    status: {

        type: String,

        enum: [

            "PLAYING",

            "CASHED_OUT",

            "CRASHED"

        ],

        default: "PLAYING"

    },

    cashedOutMultiplier: {

        type: Number,

        default: 0

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(

    "CrashSession",

    crashSessionSchema

);