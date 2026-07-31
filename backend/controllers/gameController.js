const User = require("../models/User");
const GameSession = require("../models/GameSession");
const Transaction = require("../models/Transaction");
const {updateRecovery} = require("../utils/recoveryManager");

const generateBoard = (mineCount) => {

    const board = Array(25).fill(false);

    let placed = 0;

    while (placed < mineCount) {

        const index = Math.floor(Math.random() * 25);

        if (!board[index]) {

            board[index] = true;

            placed++;

        }

    }

    return board;

};

const HOUSE_EDGE = 0.88;

const calculateMultiplier = (
    revealed,
    mineCount
) => {

    const totalTiles = 25;

    const safeTiles =
        totalTiles - mineCount;

    let probability = 1;

    for (

        let i = 0;

        i < revealed;

        i++

    ) {

        probability *=

            (safeTiles - i) /

            (totalTiles - i);

    }

    const multiplier =

        (1 / probability) *

        HOUSE_EDGE;

    return Number(

        Math.max(
            1,
            multiplier
        ).toFixed(2)

    );

};

const startMinesGame = async (req, res) => {

    try {

        const {

            betAmount,

            mineCount

        } = req.body;

        if (betAmount <= 0) {

            return res.status(400).json({

                success: false,

                message: "Invalid bet amount"

            });

        }

        if (mineCount < 5 || mineCount > 20) {

            return res.status(400).json({

                success: false,

                message: "Invalid mine count"

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

        await GameSession.deleteMany({

            user: req.user.id,

            status: "PLAYING"

        });

        user.balance -= betAmount;

        await user.save();

        const session =
            await GameSession.create({

                user: req.user.id,

                betAmount,

                mineCount,

                board: generateBoard(mineCount)

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

const revealTile = async (req, res) => {

    try {

        const {

            sessionId,

            tile

        } = req.body;

        const session =
            await GameSession.findOne({

                _id: sessionId,

                user: req.user.id

            });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "Game not found"

            });

        }

        if (

            session.status !== "PLAYING"

        ) {

            return res.status(400).json({

                success: false,

                message: "Game finished"

            });

        }

        if (

            session.revealedTiles.includes(tile)

        ) {

            return res.status(400).json({

                success: false,

                message: "Tile already opened"

            });

        }

        if (

            !Number.isInteger(tile) ||

            tile < 0 ||

            tile > 24

        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid tile"

            });

        }

        if (session.board[tile]) {

        session.status = "LOST";

        await session.save();

        await Transaction.create({

            user: req.user.id,

            game: "Mines",

            result: "LOSS",

            betAmount: session.betAmount,

            payout: 0

        });

        const cooldownTriggered = await updateRecovery(

            req.user.id,

            true

        );

        await GameSession.findByIdAndDelete(session._id);

        return res.json({

            success: true,

            safe: false,

            board: session.board,

            gameOver: true,

            cooldown: cooldownTriggered

        });

    }

        session.revealedTiles.push(tile);

        const multiplier =
            calculateMultiplier(

                session.revealedTiles.length,

                session.mineCount

            );

        await session.save();

        res.json({

            success: true,

            safe: true,

            multiplier,

            revealedTiles:

                session.revealedTiles

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
            await GameSession.findOne({

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

        const user =
            await User.findById(req.user.id);

        const multiplier =
            calculateMultiplier(

                session.revealedTiles.length,

                session.mineCount

            );

        const payout = Number(

            (
                session.betAmount *
                multiplier

            ).toFixed(2)

        );

        user.balance += payout;

        await user.save();

        session.status = "CASHED_OUT";

        await session.save();

        await Transaction.create({

            user: req.user.id,

            game: "Mines",

            result: "WIN",

            betAmount: session.betAmount,

            payout

        });

        await updateRecovery(

            req.user.id,

            false

        );

        await GameSession.findByIdAndDelete(session._id);

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

module.exports = {

    startMinesGame,

    revealTile,

    cashOut

};