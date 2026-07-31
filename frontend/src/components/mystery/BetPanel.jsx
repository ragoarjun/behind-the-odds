const BetPanel = ({

    betAmount,

    setBetAmount,

    totalSpent,

    totalReturn,

    loading,

    opening,

    gameStarted,

    onStart,

    onOpen,

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

                Mystery Box

            </h2>

            <p className="mt-2 text-sm text-gray-400">

                Open boxes and chase rare multipliers.

            </p>

            <div className="mt-8">

                <label className="text-sm text-gray-400">

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

                !gameStarted ?

                (

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
                            hover:brightness-110
                            transition
                        "

                    >

                        {

                            loading

                                ? "Starting..."

                                : "Start Game"

                        }

                    </button>

                )

                :

                (

                    <>

                        <button

                            onClick={onOpen}

                            disabled={opening}

                            className="
                                mt-8
                                w-full
                                bg-[#FA233B]
                                rounded-xl
                                py-4
                                font-semibold
                                hover:brightness-110
                                transition
                            "

                        >

                            {

                                opening

                                    ? "Opening..."

                                    : "Open Box"

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
                                hover:bg-green-500
                                transition
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