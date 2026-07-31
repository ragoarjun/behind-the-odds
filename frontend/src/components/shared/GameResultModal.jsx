const GameResultModal = ({

    open,

    result,

    onPlayAgain

}) => {

    if (!open) {

        return null;

    }

    const win =
        result?.type === "WIN";

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/70
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    w-105
                    bg-[#181818]
                    border
                    border-[#2B2B2B]
                    rounded-3xl
                    p-8
                    text-center
                    animate-[fadeIn_.25s]
                "
            >

                <div className="text-7xl">

                    {

                        win

                            ? "🎉"

                            : "💣"

                    }

                </div>

                <h1
                    className="
                        mt-6
                        text-3xl
                        font-bold
                    "
                >

                    {

                        win

                            ? "Cash Out Successful"

                            : "Boom!"

                    }

                </h1>

                <p
                    className="
                        mt-4
                        text-gray-400
                    "
                >

                    {

                        win

                            ? `You won ${Number(result.payout).toFixed(2)} FKE`

                            : `You lost ${Number(result.betAmount).toFixed(2)} FKE`

                    }

                </p>

                {

                    win && (

                        <h2
                            className="
                                mt-6
                                text-5xl
                                font-bold
                                text-green-400
                            "
                        >

                            +{Number(result.profit).toFixed(2)} FKE

                        </h2>

                    )

                }

                <button

                    onClick={onPlayAgain}

                    className="
                        mt-8
                        w-full
                        py-4
                        rounded-2xl
                        bg-[#FA233B]
                        font-semibold
                        hover:brightness-110
                        transition
                    "

                >

                    Play Again

                </button>

            </div>

        </div>

    );

};

export default GameResultModal;