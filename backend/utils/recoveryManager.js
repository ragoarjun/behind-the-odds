const updateRecovery = async (

    userId,

    didLose,

    betAmount,

    netLoss

) => {

    const user = await User.findById(userId);

    if (!user) {

        return false;

    }

    if (!user.sessionActive) {

        user.sessionActive = true;

        user.sessionStartedAt = new Date();

        user.sessionLosses = 0;

        user.sessionGames = 0;

        user.sessionWagered = 0;

        user.sessionNetLoss = 0;

    }

    user.sessionGames++;

    user.sessionWagered += betAmount;

    let cooldownTriggered = false;

    if (didLose) {

        user.sessionLosses++;

        user.sessionNetLoss += netLoss;

    }

    if (

        user.sessionLosses >= 10

    ) {

        user.cooldownActive = true;

        user.cooldownEnd = new Date(

            Date.now() +

            24 *

            60 *

            60 *

            1000

        );

        user.sessionActive = false;

        user.sessionLosses = 0;

        user.sessionGames = 0;

        cooldownTriggered = true;

    }

    await user.save();

    return cooldownTriggered;

};

module.exports = {

    updateRecovery

};