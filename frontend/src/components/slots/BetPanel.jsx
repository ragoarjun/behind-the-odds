const BetPanel = ({

    betAmount,

    setBetAmount,

    totalSpent,

    totalReturn,

    loading,

    spinning,

    gameStarted,

    onStart,

    onSpin,

    onCashOut

}) => {

    const profit = Number(

        (

            totalReturn -

            totalSpent

        ).toFixed(2)

    );

    return (

        <div
            className="
                bg-[#181818]
                border
                border-[#2B2B2B]
                rounded-3xl
                p-7
                h-full
            "
        >

            <h2 className="text-2xl font-bold">

                Slots

            </h2>

            <p className="text-gray-400 mt-2">

                Spin the reels and chase the jackpot.

            </p>

            <div className="mt-8">

                <label className="text-gray-400 text-sm">

                    Bet Amount

                </label>

                <input

                    type="number"

                    min={1}

                    value={betAmount}

                    disabled={gameStarted}

                    onChange={(e)=>

                        setBetAmount(

                            Number(

                                e.target.value

                            )

                        )

                    }

                    className="
                        mt-2
                        w-full
                        bg-[#242424]
                        border
                        border-[#333]
                        rounded-xl
                        p-4
                        outline-none
                        focus:border-[#FA233B]
                    "

                />

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                    <span>Total Spent</span>

                    <span>

                        {totalSpent.toFixed(2)} FKE

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Total Return</span>

                    <span>

                        {totalReturn.toFixed(2)} FKE

                    </span>

                </div>

                <div className="flex justify-between font-bold">

                    <span>

                        Profit / Loss

                    </span>

                    <span

                        className={

                            profit >= 0

                                ? "text-green-400"

                                : "text-red-400"

                        }

                    >

                        {profit.toFixed(2)} FKE

                    </span>

                </div>

            </div>

            {

                !gameStarted ? (

                    <button

                        onClick={onStart}

                        disabled={loading}

                        className="
                            mt-8
                            w-full
                            bg-[#FA233B]
                            rounded-xl
                            py-4
                            font-semibold
                        "

                    >

                        {

                            loading

                                ? "Starting..."

                                : "Start Game"

                        }

                    </button>

                ) : (

                    <>

                        <button

                            onClick={onSpin}

                            disabled={spinning}

                            className="
                                mt-8
                                w-full
                                bg-[#FA233B]
                                rounded-xl
                                py-4
                                font-semibold
                            "

                        >

                            {

                                spinning

                                    ? "Spinning..."

                                    : "Spin"

                            }

                        </button>

                        <button

                            onClick={onCashOut}

                            className="
                                mt-4
                                w-full
                                bg-green-600
                                rounded-xl
                                py-4
                                font-semibold
                            "

                        >

                            Cash Out

                        </button>

                    </>

                )

            }

        </div>

    );

};

export default BetPanel;