import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import {
    getRecoveryData,
    startBreak,
    cancelBreak
} from "../services/recoveryService";

const Recovery = () => {

    const [data, setData] = useState(null);

    const [days, setDays] = useState("5");

    const [timeLeft, setTimeLeft] = useState("");

    const fetchRecovery = async () => {

        try {

            const response = await getRecoveryData();

            setData(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchRecovery();

    }, []);

    useEffect(() => {

    if (

        !data ||

        !data.cooldownActive ||

        !data.cooldownEnd

    ) {

        return;

    }

    const interval = setInterval(() => {

        const difference =

            new Date(data.cooldownEnd) -

            new Date();

        if (difference <= 0) {

            setTimeLeft("00:00:00");

            clearInterval(interval);

            fetchRecovery();

            return;

        }

        const hours = Math.floor(

            difference / 3600000

        );

        const minutes = Math.floor(

            (difference % 3600000) / 60000

        );

        const seconds = Math.floor(

            (difference % 60000) / 1000

        );

        setTimeLeft(

            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

        );

    }, 1000);

    return () => clearInterval(interval);

}, [data]);

    const handleStartBreak = async () => {

        try {

            await startBreak(Number(days));

            fetchRecovery();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleCancelBreak = async () => {

        try {

            await cancelBreak();

            fetchRecovery();

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!data) {

        return (

            <DashboardLayout>

                <div className="text-center text-gray-400 mt-20">

                    Loading...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <PageHeader

                title="Recovery"

                subtitle="Stay in control of your gambling habits."

            />

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">

                        Risk Assessment

                    </h2>

                    <p className="text-5xl font-bold mt-6">

                        {data.riskScore}

                    </p>

                    <p className="text-red-400 mt-2">

                        {data.riskCategory} Risk

                    </p>

                </div>

                <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">

                        Recovery Status

                    </h2>

                    <div className="space-y-3 mt-6">

                        <div className="flex justify-between">

                            <span>Games Played</span>

                            <span>{data.sessionGames}</span>

                        </div>

                        <div className="flex justify-between">

                            <span>Session Losses</span>

                            <span>{data.sessionLosses}</span>

                        </div>

                        <div className="flex justify-between">

                            <span>Risk Score</span>

                            <span>{data.riskScore}/100</span>

                        </div>

                        <div className="flex justify-between">

                            <span>Cooldown</span>

                            <span
                                className={
                                    data.cooldownActive
                                        ? "text-red-400"
                                        : "text-green-400"
                                }
                            >
                                {data.cooldownActive ? "Active" : "Inactive"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">

                        Take A Break

                    </h2>

                    {

                        !data.breakActive ?

                        <>

                            <input

                                type="number"

                                value={days}

                                min={1}

                                max={365}

                                onChange={(e) =>

                                    setDays(e.target.value)

                                }

                                className="w-full mt-5 bg-[#111] border border-[#333] rounded-xl p-3"

                            />

                            <button

                                onClick={handleStartBreak}

                                className="w-full mt-5 bg-red-500 hover:bg-red-600 rounded-xl py-3"

                            >

                                Start Break

                            </button>

                        </>

                        :

                        <>

                            <p className="mt-5 text-green-400">

                                Recovery Mode Active

                            </p>

                            <button

                                onClick={handleCancelBreak}

                                className="w-full mt-5 bg-[#222] hover:bg-[#333] rounded-xl py-3"

                            >

                                Cancel Break

                            </button>

                        </>

                    }

                </div>

                <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">

                        Cooldown

                    </h2>

                    {

                        data.cooldownActive ?

                        <>
                          <p className="text-red-400 text-3xl font-bold mt-6">

                              {timeLeft}

                          </p>

                          <p className="text-gray-400 mt-2">

                              Games are temporarily locked.

                          </p>
                      </>

                        :

                        <p className="text-green-400 text-2xl mt-6">

                            Not Active

                        </p>

                    }

                </div>

            </div>

            <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6 mt-6">

                <h2 className="text-xl font-semibold">

                    Recovery Insight

                </h2>

                <p className="text-gray-400 mt-4 leading-7">

                    The house is mathematically designed to win over time.
If you're trying to recover previous losses, taking a break is usually the best decision.
Remember: every bet should be entertainment, not a way to make money.

                </p>

            </div>

        </DashboardLayout>

    );

};

export default Recovery;