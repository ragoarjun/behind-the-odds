const User = require("../models/User");
const CrashSession = require("../models/CrashSession");
const Transaction = require("../models/Transaction");
const {updateRecovery} = require("../utils/recoveryManager");

const generateCrashPoint = () => {

    const random = Math.random();

    if (random < 0.35) {

        return Number(
            (1 + Math.random() * 0.30).toFixed(2)
        );

    }

    if (random < 0.65) {

        return Number(
            (1.30 + Math.random() * 0.70).toFixed(2)
        );

    }

    if (random < 0.85) {

        return Number(
            (2 + Math.random() * 3).toFixed(2)
        );

    }

    if (random < 0.95) {

        return Number(
            (5 + Math.random() * 5).toFixed(2)
        );

    }

    return Number(
        (10 + Math.random() * 15).toFixed(2)
    );

};

const startCrashGame = async (req, res) => {

    try {

        const {

            betAmount

        } = req.body;

        if (betAmount <= 0) {

            return res.status(400).json({

                success: false,

                message: "Invalid bet"

            });

        }

        const user =
            await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        if (user.balance < betAmount) {

            return res.status(400).json({

                success: false,

                message: "Insufficient balance"

            });

        }

        await CrashSession.deleteMany({

            user: req.user.id,

            status: "PLAYING"

        });

        user.balance = Number(

            (user.balance - betAmount).toFixed(2)

        );

        await user.save();

        const session =
            await CrashSession.create({

                user: req.user.id,

                betAmount,

                crashPoint: generateCrashPoint()

            });

        res.status(201).json({

            success: true,

            sessionId: session._id,

            balance: user.balance

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

const cashOut = async (req, res) => {

    try {

        const {

            sessionId,

            multiplier

        } = req.body;

        const session =
            await CrashSession.findOne({

                _id: sessionId,

                user: req.user.id

            });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Session not found"

            });

        }

        if (session.status !== "PLAYING") {

            return res.status(400).json({

                success: false,

                message: "Game finished"

            });

        }

        if (multiplier >= session.crashPoint) {

            session.status = "CRASHED";

            await session.save();

            await Transaction.create({

                user: req.user.id,

                game: "Crash",

                result: "LOSS",

                betAmount: session.betAmount,

                payout: 0

            });

            const cooldownTriggered = await updateRecovery(

                req.user.id,

                true

            );

            await CrashSession.findByIdAndDelete(session._id);

            return res.status(400).json({

                success: false,

                crashed: true,

                crashPoint: session.crashPoint,

                cooldown: cooldownTriggered

            });

        }

        const user =
            await User.findById(req.user.id);

        const payout = Number(

            (

                session.betAmount *

                multiplier

            ).toFixed(2)

        );

        user.balance = Number(

            (user.balance + payout).toFixed(2)

        );

        await user.save();

        session.status = "CASHED_OUT";

        session.cashedOutMultiplier = multiplier;

        await session.save();

        await Transaction.create({

            user: req.user.id,

            game: "Crash",

            result: "WIN",

            betAmount: session.betAmount,

            payout

        });

        await updateRecovery(

            req.user.id,

            false

        );

        await CrashSession.findByIdAndDelete(session._id);

        res.json({

            success: true,

            payout,

            balance: user.balance,

            cooldown: false

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

const crashGame = async (req, res) => {

    try {

        const {

            sessionId

        } = req.body;

        const session =
            await CrashSession.findOne({

                _id: sessionId,

                user: req.user.id

            });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Game not found"

            });

        }

        if (session.status !== "PLAYING") {

            return res.status(400).json({

                success: false,

                message: "Game already finished"

            });

        }

        session.status = "CRASHED";

        await session.save();

        await Transaction.create({

            user: req.user.id,

            game: "Crash",

            result: "LOSS",

            betAmount: session.betAmount,

            payout: 0

        });

        const cooldownTriggered = await updateRecovery(

            req.user.id,

            true

        );

        await CrashSession.findByIdAndDelete(session._id);

        res.json({

            success: true,

            crashPoint: session.crashPoint,

            cooldown: cooldownTriggered

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

const getCrashPoint = async (req, res) => {

    try {

        const session =
            await CrashSession.findOne({

                _id: req.params.id,

                user: req.user.id

            });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Session not found"

            });

        }

        res.json({

            success: true,

            crashPoint: session.crashPoint

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {

    startCrashGame,

    cashOut,

    getCrashPoint,

    crashGame
};