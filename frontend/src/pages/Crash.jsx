import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import CrashControls from "../components/crash/CrashControls";
import CrashMultiplier from "../components/crash/CrashMultiplier";
import GameResultModal from "../components/shared/GameResultModal";

import {

    startCrashGame,

    cashOut,

    getCrashPoint,

    crashGame

} from "../services/crashService";

const Crash = () => {

    const [betAmount, setBetAmount] =
        useState(10);

    const [sessionId, setSessionId] =
        useState(null);

    const [multiplier, setMultiplier] =
        useState(1);

    const [playing, setPlaying] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [crashed, setCrashed] =
        useState(false);

    const [showModal, setShowModal] =
    useState(false);

    const [result, setResult] =
        useState(null);

    const [

        crashPoint,

        setCrashPoint

    ] = useState(null);

    useEffect(() => {

          if (!playing)

              return;

          const interval =

              setInterval(() => {

                  setMultiplier(previous => {

                      const next = Number(

                          (previous * 1.015)

                          .toFixed(2)

                      );

                      if (
                          crashPoint &&
                          next >= crashPoint
                      ) {

                          clearInterval(interval);

                          setPlaying(false);

                          setCrashed(true);

                          crashGame(sessionId).catch(console.error);

                          return next;

                      }

                      return next;

                  });

              }, 100);

          return () =>

              clearInterval(interval);

      }, [

          playing,

          crashPoint,

          sessionId

      ]);

    const handleStart = async () => {

        try {

            setLoading(true);

            const data =
                await startCrashGame(

                    Number(betAmount)

                );

            setSessionId(data.sessionId);

            const crash =

                await getCrashPoint(

                    data.sessionId

                );

            setCrashPoint(

                crash.crashPoint

            );

            setMultiplier(1);

            setPlaying(true);

            setCrashed(false);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleCashOut = async () => {

        try {

            const data =
                await cashOut(

                    sessionId,

                    multiplier

                );

            setResult({

              type: "WIN",

              payout: Number(

                  data.payout.toFixed(2)

              ),

              profit: Number(

                  (data.payout - betAmount)

                  .toFixed(2)

              )

          });

          setPlaying(false);

          setShowModal(true);

          setSessionId(null);

        }

        catch (error) {

            if (

                error.response?.data?.crashed

            ) {

                setPlaying(false);

                setCrashed(true);

                setResult({

                  type: "LOSS",

                  betAmount,

                  crashPoint:

                      error.response.data.crashPoint

              });

              setShowModal(true);

              setSessionId(null);

            }

        }

    };

    const playAgain = () => {

      setMultiplier(1);

      setPlaying(false);

      setCrashed(false);

      setSessionId(null);

      setCrashPoint(null);

      setShowModal(false);

      setResult(null);

  };

    return (

        <DashboardLayout>

            <PageHeader

                title="Crash"

                subtitle="Cash out before the multiplier crashes."

            />

            <div className="grid grid-cols-12 gap-8 mt-8">

                <div className="col-span-4">

                    <CrashControls

                        betAmount={betAmount}

                        setBetAmount={setBetAmount}

                        loading={loading}

                        playing={playing}

                        onStart={handleStart}

                        onCashOut={handleCashOut}

                    />

                </div>

                <div className="col-span-8">

                                <CrashMultiplier

                multiplier={multiplier}

                crashed={crashed}

            />
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

export default Crash;