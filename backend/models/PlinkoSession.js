const mongoose = require("mongoose");

const plinkoSessionSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    totalSpent: {

        type: Number,

        default: 0

    },

    totalReturn: {

        type: Number,

        default: 0

    },

    betAmount: {

        type: Number,

        required: true

    },

    ballsDropped: {

        type: Number,

        default: 0

    },

    status: {

        type: String,

        enum: [

            "PLAYING",

            "CASHED_OUT"

        ],

        default: "PLAYING"

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(

    "PlinkoSession",

    plinkoSessionSchema

);