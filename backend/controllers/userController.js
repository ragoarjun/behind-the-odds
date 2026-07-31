const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getProfile = async (req, res) => {


try {

    const user = await User.findById(
        req.user.id
    ).select("-password");

    if (!user) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    }

    res.status(200).json({
        success: true,
        user
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });

}


};

const getTransactions = async (req, res) => {


try {

    const transactions = await Transaction.find({
        user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: transactions.length,
        transactions
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });

}


};

const getStats = async (req, res) => {


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
    }).sort({ createdAt: -1 });

    const totalBets = transactions.length;

    const startingBalance = 1000;

    const netProfitLoss =
        user.balance - startingBalance;

    const profitStatus =
        netProfitLoss >= 0
            ? "PROFIT"
            : "LOSS";

    const totalAmountWagered =
        transactions.reduce(
            (sum, transaction) =>
                sum + transaction.betAmount,
            0
        );

    const totalWins =
        transactions.filter(
            transaction =>
                transaction.result === "WIN"
        ).length;

    const totalLosses =
        transactions.filter(
            transaction =>
                transaction.result === "LOSS"
        ).length;

    const gameStats = {};

    transactions.forEach(transaction => {

        if (!gameStats[transaction.game]) {

            gameStats[transaction.game] = {
                plays: 0,
                wins: 0,
                losses: 0,
                wagered: 0,
                profit: 0
            };

        }

        gameStats[transaction.game].plays++;

        gameStats[transaction.game].wagered +=
            transaction.betAmount;

        if (transaction.result === "WIN") {

            gameStats[transaction.game].wins++;

            gameStats[transaction.game].profit +=
                transaction.payout - transaction.betAmount;

        } else {

            gameStats[transaction.game].losses++;

            gameStats[transaction.game].profit -=
                transaction.betAmount;

        }

    });

    let favoriteGame = null;
    let mostPlays = 0;

    Object.entries(gameStats).forEach(
        ([game, stats]) => {

            if (stats.plays > mostPlays) {

                mostPlays = stats.plays;
                favoriteGame = game;

            }

        }
    );

    let mostProfitableGame = null;
    let highestProfit = Number.NEGATIVE_INFINITY;

    Object.entries(gameStats).forEach(
        ([game, stats]) => {

            if (stats.profit > highestProfit) {

                highestProfit = stats.profit;
                mostProfitableGame = game;

            }

        }
    );

    if (highestProfit <= 0) {
        mostProfitableGame = "None";
    }

    const biggestWin =
        transactions.length > 0
            ? Math.max(
                ...transactions.map(
                    transaction => transaction.payout
                )
            )
            : 0;

    const biggestLoss =
        transactions.length > 0
            ? Math.max(
                ...transactions.map(
                    transaction => transaction.betAmount
                )
            )
            : 0;

    const winRate =
        totalBets > 0
            ? Number(
                (
                    (totalWins / totalBets) * 100
                ).toFixed(2)
            )
            : 0;

    const averageBetSize =
        totalBets > 0
            ? Number(
                (
                    totalAmountWagered / totalBets
                ).toFixed(2)
            )
            : 0;

    const biggestBet =
        totalBets > 0
            ? Math.max(
                ...transactions.map(
                    transaction =>
                        transaction.betAmount
                )
            )
            : 0;

    const smallestBet =
        totalBets > 0
            ? Math.min(
                ...transactions.map(
                    transaction =>
                        transaction.betAmount
                )
            )
            : 0;

    const recentTransactions =
    transactions.slice(0, 5);

    const lossPercentage = Number(
        Math.max(
            0,
            (
                (
                    startingBalance -
                    user.balance
                ) /
                startingBalance
            ) * 100
        ).toFixed(2)
    );

    let riskScore = 0;

    // Total Bets (0 - 25)

    riskScore += Math.min(

        totalBets * 0.35,

        25

    );

    // Average Bet (0 - 20)

    riskScore += Math.min(

        averageBetSize / 5,

        20

    );

    // Total Wagered (0 - 20)

    riskScore += Math.min(

        totalAmountWagered / 250,

        20

    );

    // Loss Percentage (0 - 20)

    riskScore += Math.min(

        lossPercentage * 0.4,

        20

    );

    // Win Rate (0 - 15)

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

    if (

        riskScore >= 30

    ) {

        riskCategory = "Moderate";

    }

    if (

        riskScore >= 60

    ) {

        riskCategory = "High";

    }

    if (

        riskScore >= 80

    ) {

        riskCategory = "Severe";

    }

    const winLossData = [
        {
            name: "Wins",
            value: totalWins
        },
        {
            name: "Losses",
            value: totalLosses
        }
    ];

    const gamesPlayedData = Object.entries(gameStats).map(
        ([game, stats]) => ({
            game,
            plays: stats.plays
        })
    );

    let runningBalance = user.balance;

    const balanceHistory = [];

    const orderedTransactions = [...transactions];

    for (

        let i = orderedTransactions.length - 1;

        i >= 0;

        i--

    ) {

        const transaction = orderedTransactions[i];

        balanceHistory.unshift({

            balance: runningBalance

        });

        runningBalance += transaction.betAmount;

        runningBalance -= transaction.payout || 0;

    }

    balanceHistory.unshift({

        balance: startingBalance

    });

    res.status(200).json({

        success: true,

        currentBalance: user.balance,

        startingBalance,

        netProfitLoss,

        profitStatus,

        riskScore,

        riskCategory,

        totalBets,

        totalAmountWagered,

        totalWins,

        totalLosses,

        winRate,

        averageBetSize,

        biggestBet,

        smallestBet,

        recentTransactions,

        lossPercentage, 

        favoriteGame,

        mostProfitableGame,

        biggestWin,

        biggestLoss,

        gameStats,

        balanceHistory,

        winLossData,

        gamesPlayedData,

    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });

}

};

const getActivity = async (req, res) => {

    try {

        const transactions = await Transaction.find({

            user: req.user.id

        });

        const activity = {};

        transactions.forEach(transaction => {

            const date = transaction.createdAt
                .toISOString()
                .split("T")[0];

            if (!activity[date]) {

                activity[date] = {

                    date,

                    count: 0,

                    totalWagered: 0

                };

            }

            activity[date].count++;

            activity[date].totalWagered +=
                transaction.betAmount;

        });

        res.status(200).json({

            success: true,

            activity: Object.values(activity)

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
getProfile,
getTransactions,
getStats,
getActivity
};
