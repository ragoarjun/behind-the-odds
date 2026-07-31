const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getRecoveryData = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const transactions = await Transaction.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        const totalGames = transactions.length;

        const totalWagered = transactions.reduce(

            (sum, transaction) =>

                sum + transaction.betAmount,

            0

        );

        const totalReturned = transactions.reduce(

            (sum, transaction) =>

                sum + transaction.payout,

            0

        );

        const totalLost = Number(

            (

                totalWagered -

                totalReturned

            ).toFixed(2)

        );

        const totalWins = transactions.filter(

            transaction =>

                transaction.result === "WIN"

        ).length;

        const totalLosses = transactions.filter(

            transaction =>

                transaction.result === "LOSS"

        ).length;

        let riskScore = 0;

riskScore += Math.min(

    totalGames * 0.35,

    25

);

const averageBet =

    totalGames > 0

        ? totalWagered / totalGames

        : 0;

riskScore += Math.min(

    averageBet / 5,

    20

);

riskScore += Math.min(

    totalWagered / 250,

    20

);

const lossPercentage =

    totalWagered > 0

        ? (totalLost / totalWagered) * 100

        : 0;

riskScore += Math.min(

    lossPercentage * 0.4,

    20

);

const winRate =

    totalGames > 0

        ? (totalWins / totalGames) * 100

        : 0;

riskScore += Math.max(

    0,

    (50 - winRate) * 0.3

);

riskScore = Math.round(

    Math.min(

        riskScore,

        100

    )

);

let riskCategory = "Low";

if (riskScore >= 30) {

    riskCategory = "Moderate";

}

if (riskScore >= 60) {

    riskCategory = "High";

}

if (riskScore >= 80) {

    riskCategory = "Severe";

}

  res.json({

      success: true,

      riskScore,

      riskCategory,

      breakActive: user.breakActive,

      breakStart: user.breakStart,

      breakEnd: user.breakEnd,

      cooldownActive: user.cooldownActive,

      cooldownEnd: user.cooldownEnd,

      sessionLosses: user.sessionLosses,

      sessionGames: user.sessionGames,

      summary: {

          totalGames,

          totalWins,

          totalLosses,

          totalWagered,

          totalReturned,

          totalLost

      }

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

const startBreak = async (req, res) => {

    try {

        const { days } = req.body;

        if (
            !days ||
            days < 1 ||
            days > 365
        ) {

            return res.status(400).json({

                success: false,

                message: "Break duration must be between 1 and 365 days."

            });

        }

        const user = await User.findById(req.user.id);

        user.breakActive = true;

        user.breakStart = new Date();

        user.breakEnd = new Date(

            Date.now() +

            days *

            24 *

            60 *

            60 *

            1000

        );

        await user.save();

        res.json({

            success: true,

            message: "Break started."

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

const cancelBreak = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        user.breakActive = false;

        user.breakStart = null;

        user.breakEnd = null;

        await user.save();

        res.json({

            success: true,

            message: "Break cancelled."

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

const getProtectionStatus = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        // Automatically clear expired cooldown
        if (

            user.cooldownActive &&

            user.cooldownEnd &&

            user.cooldownEnd <= new Date()

        ) {

            user.cooldownActive = false;

            user.cooldownEnd = null;

            await user.save();

        }

        res.json({

            success: true,

            cooldownActive: user.cooldownActive,

            breakActive: user.breakActive

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

    getRecoveryData,

    startBreak,

    cancelBreak,

    getProtectionStatus

};