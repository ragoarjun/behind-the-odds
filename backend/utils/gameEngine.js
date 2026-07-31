const User = require("../models/User");
const Transaction = require("../models/Transaction");

const playGame = async ({
    userId,
    game,
    betAmount,
    winChance,
    multiplier
}) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.balance < betAmount) {
        throw new Error("Insufficient Balance");
    }

    // Deduct bet
    user.balance -= betAmount;

    const win = Math.random() < winChance;

    let payout = 0;

    if (win) {

        payout = betAmount * multiplier;

        user.balance += payout;

    }

    await user.save();

    await Transaction.create({

        user: user._id,

        game,

        result: win ? "WIN" : "LOSS",

        betAmount,

        payout

    });

    return {

        game,

        result: win ? "WIN" : "LOSS",

        betAmount,

        payout,

        currentBalance: user.balance

    };

};

module.exports = playGame;