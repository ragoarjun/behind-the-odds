const User = require("../models/User");
const PlinkoSession = require("../models/PlinkoSession");
const Transaction = require("../models/Transaction");
const { updateRecovery } = require("../utils/recoveryManager");

const {

    generateDrop

} = require("../utils/plinkoEngine");

const startPlinkoGame = async (req, res) => {

    try {

        const {

            betAmount

        } = req.body;

        if (

            !betAmount ||

            betAmount <= 0

        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid bet amount"

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

        await PlinkoSession.deleteMany({

            user: req.user.id,

            status: "PLAYING"

        });

        const session =
            await PlinkoSession.create({

                user: req.user.id,

                betAmount

            });

        res.status(201).json({

            success: true,

            sessionId: session._id,

            betAmount

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

const dropBall = async (req, res) => {

    try {

        const {

            sessionId

        } = req.body;

        const session =
            await PlinkoSession.findOne({

                _id: sessionId,

                user: req.user.id,

                status: "PLAYING"

            });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Session not found"

            });

        }

        const user =
            await User.findById(req.user.id);

        if (

            user.balance <

            session.betAmount

        ) {

            return res.status(400).json({

                success: false,

                message: "Insufficient balance"

            });

        }

        user.balance = Number(

            (

                user.balance -

                session.betAmount

            ).toFixed(2)

        );

        await user.save();

        session.totalSpent +=

            session.betAmount;

        session.ballsDropped += 1;

        const {

          slot,

          multiplier,

          payout,

          path

      } = generateDrop(

          session.betAmount

      );

        session.totalReturn = Number(

            (

                session.totalReturn +

                payout

            ).toFixed(2)

        );

        await session.save();

        res.json({

          success: true,

          slot,

          multiplier,

          payout,

          path,

          totalSpent:

              session.totalSpent,

          totalReturn:

              session.totalReturn,

          ballsDropped:

              session.ballsDropped,

          currentBalance:

              user.balance

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

            sessionId

        } = req.body;

        const session =
            await PlinkoSession.findOne({

                _id: sessionId,

                user: req.user.id,

                status: "PLAYING"

            });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Session not found"

            });

        }

        const user =
            await User.findById(req.user.id);

        user.balance = Number(

            (

                user.balance +

                session.totalReturn

            ).toFixed(2)

        );

        await user.save();

        const profit = Number(

            (

                session.totalReturn -

                session.totalSpent

            ).toFixed(2)

        );

        await Transaction.create({

            user: req.user.id,

            game: "Plinko",

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

        await PlinkoSession.findByIdAndDelete(

            session._id

        );

        res.json({

            success: true,

            payout:

                session.totalReturn,

            profit,

            balance:

                user.balance,

            cooldown:

                cooldownTriggered

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

    startPlinkoGame,

    dropBall,

    cashOut

};