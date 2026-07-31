import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import BetPanel from "../components/slots/BetPanel";
import SlotMachine from "../components/slots/SlotMachine";

import {

    startSlotGame,
    spinSlots,
    cashOutSlots

} from "../services/slotService";

const Slots = () => {

    const [

        betAmount,

        setBetAmount

    ] = useState(10);

    const [

        sessionId,

        setSessionId

    ] = useState(null);

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        spinning,

        setSpinning

    ] = useState(false);

    const [

        gameStarted,

        setGameStarted

    ] = useState(false);

    const [

        grid,

        setGrid

    ] = useState(null);

    const [

        winningLine,

        setWinningLine

    ] = useState(null);

    const [

        totalSpent,

        setTotalSpent

    ] = useState(0);

    const [

        totalReturn,

        setTotalReturn

    ] = useState(0);

    const handleStart = async () => {

        try {

            setLoading(true);

            const data = await startSlotGame(

                Number(betAmount)

            );

            setSessionId(

                data.sessionId

            );

            setGameStarted(true);

            setGrid(null);

            setWinningLine(null);

            setTotalSpent(0);

            setTotalReturn(0);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleSpin = async () => {

        if (

            spinning ||

            !sessionId

        ) {

            return;

        }

        try {

            setSpinning(true);

            const data = await spinSlots(

                sessionId

            );

            setTimeout(() => {

                setGrid(

                    data.grid

                );

                setWinningLine(

                    data.winningLine

                );

                setTotalSpent(

                    data.totalSpent

                );

                setTotalReturn(

                    data.totalReturn

                );

                setSpinning(false);

            }, 1800);

        }

        catch (error) {

            console.log(error);

            setSpinning(false);

        }

    };

    const handleCashOut = async () => {

        try {

            await cashOutSlots(

                sessionId

            );

            setGameStarted(false);

            setSessionId(null);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <PageHeader

                title="Slots"

                subtitle="Spin the reels and chase the jackpot."

            />

            <div className="grid grid-cols-12 gap-8 mt-8">

                <div className="col-span-4">

                    <BetPanel

                        betAmount={betAmount}

                        setBetAmount={setBetAmount}

                        totalSpent={totalSpent}

                        totalReturn={totalReturn}

                        loading={loading}

                        spinning={spinning}

                        gameStarted={gameStarted}

                        onStart={handleStart}

                        onSpin={handleSpin}

                        onCashOut={handleCashOut}

                    />

                </div>

                <div className="col-span-8">

                    <SlotMachine

                        grid={grid}

                        spinning={spinning}

                        winningLine={winningLine}

                    />

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Slots;