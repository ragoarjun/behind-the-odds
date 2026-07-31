const CrashMultiplier = ({

    multiplier,

    crashed

}) => {

    return (

        <div
            className="
                bg-[#181818]
                border
                border-[#2B2B2B]
                rounded-3xl
                h-full
                min-h-125
                flex
                flex-col
                items-center
                justify-center
                overflow-hidden
                relative
            "
        >

            <div
                className={`
                    absolute
                    w-80
                    h-80
                    rounded-full
                    blur-[120px]
                    transition-all
                    duration-500

                    ${
                        crashed

                            ? "bg-red-600/25"

                            : "bg-[#FA233B]/20"

                    }
                `}
            />

            <p
                className="
                    text-gray-500
                    uppercase
                    tracking-[6px]
                    text-sm
                    z-10
                "
            >

                Current Multiplier

            </p>

            <h1
                className={`
                    mt-6
                    text-8xl
                    font-black
                    z-10
                    transition-all
                    duration-300

                    ${

                        crashed

                            ? "text-red-500"

                            : "text-white"

                    }

                `}
            >

                {

                    crashed

                        ? "💥"

                        : `${multiplier.toFixed(2)}×`

                }

            </h1>

            <p
                className="
                    mt-8
                    text-gray-400
                    z-10
                "
            >

                {

                    crashed

                        ? "The rocket crashed."

                        : "Cash out before it's too late."

                }

            </p>

        </div>

    );

};

export default CrashMultiplier;