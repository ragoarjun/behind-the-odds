const BetPanel = ({

    betAmount,

    setBetAmount,

    mineCount,

    setMineCount,

    multiplier,

    loading,

    gameStarted,

    onStart,

    onCashOut

}) => {

    return (

        <div
            className="
                bg-[#181818]
                border
                border-[#2B2B2B]
                rounded-3xl
                p-7
                shadow-xl
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                    text-white
                "
            >

                Mines

            </h2>

            <p
                className="
                    text-gray-500
                    text-sm
                    mt-2
                "
            >

                Choose your bet and avoid the mines.

            </p>

            {/* Bet */}

            <div className="mt-8">

                <label
                    className="
                        text-sm
                        text-gray-400
                    "
                >

                    Bet Amount

                </label>

                <input

                    type="number"

                    value={betAmount}

                    min={1}

                    onChange={(e)=>

                        setBetAmount(e.target.value)

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
                        transition
                    "

                />

            </div>

            {/* Mines */}

            <div className="mt-6">

                <label
                    className="
                        text-sm
                        text-gray-400
                    "
                >

                    Mine Count

                </label>

                <input

                    type="number"

                    min={5}

                    max={20}

                    value={mineCount}

                    onChange={(e)=>

                        setMineCount(e.target.value)

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
                        transition
                    "

                />

            </div>

            {/* Multiplier */}

            <div
                className="
                    mt-8
                    rounded-2xl
                    bg-[#202020]
                    border
                    border-[#2D2D2D]
                    p-5
                "
            >

                <p
                    className="
                        text-gray-400
                        text-sm
                    "
                >

                    Current Multiplier

                </p>

                <h1
                    className="
                        mt-2
                        text-5xl
                        font-bold
                        text-[#FA233B]
                    "
                >

                    {multiplier}×

                </h1>

            </div>

            {/* Buttons */}

            {

                !gameStarted ? (

                    <button

                        onClick={onStart}

                        disabled={gameStarted}

                        className="
                            w-full
                            mt-8
                            rounded-xl
                            bg-[#FA233B]
                            py-4
                            font-semibold
                            hover:brightness-110
                            transition
                            disabled:opacity-50
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

                    <button

                        onClick={onCashOut}

                        className="
                            w-full
                            mt-8
                            rounded-xl
                            bg-green-500
                            py-4
                            font-semibold
                            hover:bg-green-400
                            transition
                        "

                    >

                                    {

                gameStarted

                    ? "Cash Out"

                    : "Play Again"

            }

                    </button>

                )

            }

        </div>

    );

};

export default BetPanel;