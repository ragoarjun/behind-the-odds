import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import BetPanel from "../components/plinko/BetPanel";
import PlinkoBoard from "../components/plinko/PlinkoBoard";

import {

    startPlinkoGame,
    dropBall,
    cashOut

} from "../services/plinkoService";

import {

    generatePath

} from "../utils/plinkoPath";

const Plinko = () => {

    const [

        betAmount,

        setBetAmount

    ] = useState(10);

    const [

        sessionId,

        setSessionId

    ] = useState(null);

    const [

        gameStarted,

        setGameStarted

    ] = useState(false);

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        dropping,

        setDropping

    ] = useState(false);

    const [

        totalSpent,

        setTotalSpent

    ] = useState(0);

    const [

        totalReturn,

        setTotalReturn

    ] = useState(0);

    const [

        landedSlot,

        setLandedSlot

    ] = useState(null);

    const [

        path,

        setPath

    ] = useState([]);

    const [

        pendingResult,

        setPendingResult

    ] = useState(null);

    const handleStart = async () => {

        try {

            setLoading(true);

            const data = await startPlinkoGame(

                Number(betAmount)

            );

            setSessionId(

                data.sessionId

            );

            setGameStarted(true);

            setTotalSpent(0);

            setTotalReturn(0);

            setLandedSlot(null);

            setPath([]);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleDrop = async () => {

        if (

            dropping ||

            !sessionId

        ) {

            return;

        }

        try {

            setDropping(true);

            const data = await dropBall(

                sessionId

            );

            setPendingResult(data);

            setPath(

                generatePath(

                    data.slot

                )

            );

        }

        catch (error) {

            console.log(error);

            setDropping(false);

        }

    };

    const handleAnimationComplete = () => {

        if (

            !pendingResult

        ) {

            return;

        }

        setLandedSlot(

            pendingResult.slot

        );

        setTotalSpent(

            pendingResult.totalSpent

        );

        setTotalReturn(

            pendingResult.totalReturn

        );

        setDropping(false);

        setPendingResult(null);

    };

    const handleCashOut = async () => {

        try {

            await cashOut(

                sessionId

            );

            setGameStarted(false);

            setSessionId(null);

            setPath([]);

            setLandedSlot(null);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <PageHeader

                title="Plinko"

                subtitle="Drop balls and cash out whenever you want."

            />

            <div className="grid grid-cols-12 gap-8 mt-8">

                <div className="col-span-4">

                    <BetPanel

                        betAmount={betAmount}

                        setBetAmount={setBetAmount}

                        totalSpent={totalSpent}

                        totalReturn={totalReturn}

                        loading={loading}

                        dropping={dropping}

                        gameStarted={gameStarted}

                        onStart={handleStart}

                        onDrop={handleDrop}

                        onCashOut={handleCashOut}

                    />

                </div>

                <div className="col-span-8">

                    <PlinkoBoard

                        path={path}

                        dropping={dropping}

                        landedSlot={landedSlot}

                        onAnimationComplete={handleAnimationComplete}

                    />

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Plinko;