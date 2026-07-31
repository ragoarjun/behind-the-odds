const OUTCOMES = [

    {

        chance: 60,

        multiplier: 0

    },

    {

        chance: 20,

        multiplier: 0.3

    },

    {

        chance: 10,

        multiplier: 0.7

    },

    {

        chance: 6,

        multiplier: 1.5

    },

    {

        chance: 3,

        multiplier: 4

    },

    {

        chance: 1,

        multiplier: 12

    }

];

const openBox = (

    betAmount

) => {

    const roll =

        Math.random() * 100;

    let cumulative = 0;

    let multiplier = 0;

    for (

        const outcome

        of OUTCOMES

    ) {

        cumulative +=

            outcome.chance;

        if (

            roll <= cumulative

        ) {

            multiplier =

                outcome.multiplier;

            break;

        }

    }

    const payout = Number(

        (

            betAmount *

            multiplier

        ).toFixed(2)

    );

    return {

        multiplier,

        payout

    };

};

module.exports = {

    openBox

};