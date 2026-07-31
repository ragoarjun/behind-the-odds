import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import BetPanel from "../components/mystery/BetPanel";
import MysteryBox from "../components/mystery/MysteryBox";

import {

    startMysteryGame,

    openMysteryBox,

    cashOutMystery

} from "../services/mysteryService";

const Mystery = () => {

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

        opening,

        setOpening

    ] = useState(false);

    const [

        gameStarted,

        setGameStarted

    ] = useState(false);

    const [

        multiplier,

        setMultiplier

    ] = useState(null);

    const [

        payout,

        setPayout

    ] = useState(0);

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

            const data = await startMysteryGame(

                Number(betAmount)

            );

            setSessionId(

                data.sessionId

            );

            setGameStarted(true);

            setMultiplier(null);

            setPayout(0);

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

    const handleOpen = async () => {

        if (

            opening ||

            !sessionId

        ) {

            return;

        }

        try {

            setOpening(true);

            const data = await openMysteryBox(

                sessionId

            );

            setTimeout(() => {

                setMultiplier(

                    data.multiplier

                );

                setPayout(

                    data.payout

                );

                setTotalSpent(

                    data.totalSpent

                );

                setTotalReturn(

                    data.totalReturn

                );

                setOpening(false);

            }, 1800);

        }

        catch (error) {

            console.log(error);

            setOpening(false);

        }

    };

    const handleCashOut = async () => {

        try {

            await cashOutMystery(

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

                title="Mystery Box"

                subtitle="Open the box. Take the risk."

            />

            <div

                className="

                    grid

                    grid-cols-12

                    gap-8

                    mt-8

                "

            >

                <div className="col-span-4">

                    <BetPanel

                        betAmount={betAmount}

                        setBetAmount={setBetAmount}

                        totalSpent={totalSpent}

                        totalReturn={totalReturn}

                        loading={loading}

                        opening={opening}

                        gameStarted={gameStarted}

                        onStart={handleStart}

                        onOpen={handleOpen}

                        onCashOut={handleCashOut}

                    />

                </div>

                <div className="col-span-8">

                    <MysteryBox

                        opening={opening}

                        multiplier={multiplier}

                        payout={payout}

                    />

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Mystery;