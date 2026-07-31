const CrashControls = ({

    betAmount,

    setBetAmount,

    loading,

    playing,

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
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                "
            >

                Crash

            </h2>

            <p
                className="
                    mt-2
                    text-gray-500
                "
            >

                Cash out before the crash.

            </p>

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

                    min={1}

                    value={betAmount}

                    disabled={playing}

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

            {

                !playing ? (

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
                            disabled:opacity-50
                        "

                    >

                        {

                            loading

                                ? "Starting..."

                                : "Start Game"

                        }

                    </button>

                ) : (

                    <button

                        onClick={onCashOut}

                        className="
                            mt-8
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

                )

            }

        </div>

    );

};

export default CrashControls;