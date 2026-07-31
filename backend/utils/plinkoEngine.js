const MULTIPLIERS = [
    10,
    4,
    1.5,
    0.8,
    0.4,
    0.2,
    0.4,
    0.8,
    1.5,
    4,
    10
];

const WEIGHTS = [
    1,
    3,
    7,
    12,
    18,
    24,
    18,
    12,
    7,
    3,
    1
];

const weightedSlot = () => {

    const total = WEIGHTS.reduce(
        (a, b) => a + b,
        0
    );

    let random = Math.random() * total;

    for (let i = 0; i < WEIGHTS.length; i++) {

        random -= WEIGHTS[i];

        if (random <= 0) {

            return i;

        }

    }

    return 5;

};

const calculatePayout = (
    bet,
    multiplier
) => Number((bet * multiplier).toFixed(2));

const generateDrop = (betAmount) => {

    const slot = weightedSlot();

    const multiplier = MULTIPLIERS[slot];

    const payout = calculatePayout(
        betAmount,
        multiplier
    );

    return {

        slot,
        multiplier,
        payout

    };

};

module.exports = {

    generateDrop

};