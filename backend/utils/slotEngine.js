const SYMBOLS = {

    LEMON: {

        name: "LEMON",

        multiplier: 0.2

    },

    CHERRY: {

        name: "CHERRY",

        multiplier: 0.5

    },

    GRAPE: {

        name: "GRAPE",

        multiplier: 1

    },

    BELL: {

        name: "BELL",

        multiplier: 2

    },

    DIAMOND: {

        name: "DIAMOND",

        multiplier: 5

    },

    SEVEN: {

        name: "SEVEN",

        multiplier: 10

    }

};

const PAYLINES = [

    [[0,0],[0,1],[0,2]],

    [[1,0],[1,1],[1,2]],

    [[2,0],[2,1],[2,2]],

    [[0,0],[1,1],[2,2]],

    [[0,2],[1,1],[2,0]]

];

const ALL_SYMBOLS = Object.values(

    SYMBOLS

);

const randomSymbol = () =>

    ALL_SYMBOLS[

        Math.floor(

            Math.random() *

            ALL_SYMBOLS.length

        )

    ];

const randomOutcome = () => {

    const roll =

        Math.random() * 100;

    if (roll < 65)

        return "LOSE";

    if (roll < 87)

        return "SMALL";

    if (roll < 96)

        return "MEDIUM";

    if (roll < 99)

        return "BIG";

    return "JACKPOT";

};

const randomPayline = () =>

    Math.floor(

        Math.random() *

        PAYLINES.length

    );

const generateLoseBoard = () => {

    while (true) {

        const grid =

            Array.from(

                {

                    length: 3

                },

                () =>

                    Array.from(

                        {

                            length: 3

                        },

                        randomSymbol

                    )

            );

        const win =

            calculateWin(

                grid,

                1

            );

        if (

            win.payout === 0

        ) {

            return grid;

        }

    }

};

const generateWinBoard = (

    symbol

) => {

    const grid =

        Array.from(

            {

                length: 3

            },

            () =>

                Array.from(

                    {

                        length: 3

                    },

                    randomSymbol

                )

        );

    const line =

        randomPayline();

    for (

        const [

            row,

            col

        ] of PAYLINES[line]

    ) {

        grid[row][col] = symbol;

    }

    return {

        grid,

        line

    };

};

const calculateWin = (

    grid,

    bet

) => {

    let highest = 0;

    let winningLine = null;

    for (

        let i = 0;

        i < PAYLINES.length;

        i++

    ) {

        const line =

            PAYLINES[i];

        const a =

            grid[line[0][0]][line[0][1]];

        const b =

            grid[line[1][0]][line[1][1]];

        const c =

            grid[line[2][0]][line[2][1]];

        if (

            a.name === b.name &&

            b.name === c.name

        ) {

            const payout =

                Number(

                    (

                        bet *

                        a.multiplier

                    ).toFixed(2)

                );

            if (

                payout >

                highest

            ) {

                highest = payout;

                winningLine = i;

            }

        }

    }

    return {

        payout: highest,

        winningLine

    };

};

const spin = (

    betAmount

) => {

    const outcome =

        randomOutcome();

    let grid;

    let winningLine = null;

    switch (

        outcome

    ) {

        case "SMALL":

            ({

                grid,

                line: winningLine

            } = generateWinBoard(

                SYMBOLS.CHERRY

            ));

            break;

        case "MEDIUM":

            ({

                grid,

                line: winningLine

            } = generateWinBoard(

                SYMBOLS.BELL

            ));

            break;

        case "BIG":

            ({

                grid,

                line: winningLine

            } = generateWinBoard(

                SYMBOLS.DIAMOND

            ));

            break;

        case "JACKPOT":

            ({

                grid,

                line: winningLine

            } = generateWinBoard(

                SYMBOLS.SEVEN

            ));

            break;

        default:

            grid =

                generateLoseBoard();

    }

    const {

        payout

    } =

        calculateWin(

            grid,

            betAmount

        );

    return {

        grid,

        payout,

        winningLine

    };

};

module.exports = {

    spin

};