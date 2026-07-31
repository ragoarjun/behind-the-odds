const mongoose = require("mongoose");

const mysterySessionSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    betAmount: {

        type: Number,

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

    opens: {

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

    "MysterySession",

    mysterySessionSchema

);