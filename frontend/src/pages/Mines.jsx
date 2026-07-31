import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import BetPanel from "../components/mines/BetPanel";
import MineBoard from "../components/mines/MineBoard";
import GameResultModal from "../components/shared/GameResultModal";

import {
    startMinesGame,
    revealTile,
    cashOut
} from "../services/minesService";

const Mines = () => {

    const [betAmount, setBetAmount] = useState(10);

    const [mineCount, setMineCount] = useState(5);

    const [sessionId, setSessionId] = useState(null);

    const [multiplier, setMultiplier] = useState(1);

    const [revealedTiles, setRevealedTiles] = useState([]);

    const [board, setBoard] = useState(
        Array(25).fill(null)
    );

    const [gameOver, setGameOver] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [showModal, setShowModal] =
    useState(false);

    const [result, setResult] =
        useState(null);

    const handleStartGame = async () => {

        try {

            setLoading(true);

            const data =
                await startMinesGame(

                    Number(betAmount),

                    Number(mineCount)

                );

            setSessionId(data.sessionId);

            setMultiplier(1);

            setGameOver(false);

            setRevealedTiles([]);

            setBoard(
                Array(25).fill(null)
            );

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleReveal = async (index) => {

        if (

            !sessionId ||

            gameOver ||

            revealedTiles.includes(index)

        ) {

            return;

        }

        try {

            const data =
                await revealTile(

                    sessionId,

                    index

                );

            if (!data.safe) {

            const updated =
                data.board.map(tile =>

                    tile
                        ? "mine"
                        : "gem"

                );

            setBoard(updated);

            setGameOver(true);

            setResult({

                type: "LOSS",

                betAmount

            });

            setShowModal(true);

            setSessionId(null);

            return;

        }

            const updated = [...board];

            updated[index] = "gem";

            setBoard(updated);

            setMultiplier(
                data.multiplier
            );

            setRevealedTiles(
                data.revealedTiles
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleCashOut = async () => {

        try {

            const data =
                await cashOut(sessionId);

            setResult({

              type: "WIN",

              payout: Number(data.payout.toFixed(2)),

              profit: Number(
                  (data.payout - betAmount).toFixed(2)
              )

          });

        setShowModal(true);

        setSessionId(null);

        setGameOver(true);

        }

        catch (error) {

            console.log(error);

        }

    };

    const playAgain = () => {

        setShowModal(false);

        setResult(null);

        setSessionId(null);

        setMultiplier(1);

        setGameOver(false);

        setRevealedTiles([]);

        setBoard(
            Array(25).fill(null)
        );

    };

        return (

        <DashboardLayout>

            <div className="px-6 py-6">

                <PageHeader

                    title="Mines"

                    subtitle="Reveal gems, avoid mines and cash out before it's too late."

                />

                <div className="grid grid-cols-12 gap-8 mt-8">

                    <div className="col-span-4">

                        <BetPanel

                            betAmount={betAmount}

                            setBetAmount={setBetAmount}

                            mineCount={mineCount}

                            setMineCount={setMineCount}

                            multiplier={multiplier}

                            loading={loading}

                            gameStarted={!!sessionId}

                            onStart={handleStartGame}

                            onCashOut={handleCashOut}

                        />

                    </div>

                    <div className="col-span-8 flex justify-center items-center">

                        <MineBoard

                            board={board}

                            revealedTiles={revealedTiles}

                            gameOver={gameOver}

                            onReveal={handleReveal}

                        />

                    </div>

                </div>

            </div>

          <GameResultModal

            open={showModal}

            result={result}

            onPlayAgain={playAgain}

        />

        </DashboardLayout>

    );

};

export default Mines;