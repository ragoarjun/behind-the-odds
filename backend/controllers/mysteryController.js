const MysterySession = require("../models/MysterySession");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const {
    updateRecovery
} = require("../utils/recoveryManager");

const {

    openBox

} = require("../utils/mysteryEngine");

const startGame = async (

    req,

    res

) => {

    try {

        const {

            betAmount

        } = req.body;

        const user = await User.findById(

            req.user.id

        );

        if (

            !user

        ) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        if (

            betAmount <= 0

        ) {

            return res.status(400).json({

                message: "Invalid bet amount"

            });

        }

        const session = await MysterySession.create({

            user: user._id,

            betAmount

        });

        res.json({

            success: true,

            sessionId: session._id

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const openMysteryBox = async (

    req,

    res

) => {

    try {

        const {

            sessionId

        } = req.body;

        const session = await MysterySession.findById(

            sessionId

        );

        if (

            !session ||

            session.status !== "PLAYING"

        ) {

            return res.status(400).json({

                message: "Invalid session"

            });

        }

        const user = await User.findById(

            session.user

        );

        if (

            user.balance < session.betAmount

        ) {

            return res.status(400).json({

                message: "Insufficient balance"

            });

        }

        user.balance -= session.betAmount;

        const {

            multiplier,

            payout

        } = openBox(

            session.betAmount

        );

        user.balance += payout;

        await user.save();

        session.totalSpent +=

            session.betAmount;

        session.totalReturn +=

            payout;

        session.opens += 1;

        await session.save();

        res.json({

            success: true,

            multiplier,

            payout,

            totalSpent:

                session.totalSpent,

            totalReturn:

                session.totalReturn,

            balance:

                user.balance

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const cashOut = async (

    req,

    res

) => {

    try {

        const {

            sessionId

        } = req.body;

        const session = await MysterySession.findById(

            sessionId

        );

        if (

            !session

        ) {

            return res.status(404).json({

                message: "Session not found"

            });

        }

        session.status =

            "CASHED_OUT";

        await session.save();

        const profit = Number(

            (

                session.totalReturn -

                session.totalSpent

            ).toFixed(2)

        );

        await Transaction.create({

            user: req.user.id,

            game: "Mystery Box",

            result:

                profit >= 0

                    ? "WIN"

                    : "LOSS",

            betAmount:

                session.totalSpent,

            payout:

                session.totalReturn

        });

        const cooldownTriggered = await updateRecovery(

            req.user.id,

            profit < 0

        );

        res.json({

            success: true,

            totalSpent:

                session.totalSpent,

            totalReturn:

                session.totalReturn,

            profit,

            cooldown:

                cooldownTriggered

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {

    startGame,

    openMysteryBox,

    cashOut

};