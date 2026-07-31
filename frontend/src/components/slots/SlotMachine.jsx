import Reel from "./Reel";

const EMPTY_GRID = [

    [
        { name: "?" },
        { name: "?" },
        { name: "?" }
    ],

    [
        { name: "?" },
        { name: "?" },
        { name: "?" }
    ],

    [
        { name: "?" },
        { name: "?" },
        { name: "?" }
    ]

];

const SlotMachine = ({

    grid,

    spinning,

    winningLine

}) => {

    const displayGrid =

        grid ||

        EMPTY_GRID;

    const reels = [

        [

            displayGrid[0][0],

            displayGrid[1][0],

            displayGrid[2][0]

        ],

        [

            displayGrid[0][1],

            displayGrid[1][1],

            displayGrid[2][1]

        ],

        [

            displayGrid[0][2],

            displayGrid[1][2],

            displayGrid[2][2]

        ]

    ];

    return (

        <div
            className="
                h-full
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    relative
                    w-full
                    max-w-4xl
                    rounded-[40px]
                    bg-linear-to-b
                    from-[#292929]
                    via-[#1B1B1B]
                    to-[#0F0F0F]
                    border-4
                    border-[#444]
                    shadow-[0_20px_80px_rgba(0,0,0,0.7)]
                    p-10
                "
            >

                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-16
                        rounded-t-[36px]
                        bg-linear-to-r
                        from-[#FA233B]
                        via-[#ff6a7c]
                        to-[#FA233B]
                    "
                />

                <h1
                    className="
                        relative
                        z-10
                        text-center
                        text-4xl
                        font-black
                        tracking-[0.3em]
                        mb-10
                    "
                >

                    SLOTS

                </h1>

                <div
                    className="
                        flex
                        justify-center
                        gap-8
                    "
                >

                    {

                        reels.map(

                            (

                                reel,

                                index

                            ) => (

                                <Reel

                                    key={index}

                                    symbols={reel}

                                    spinning={spinning}

                                    reelIndex={index}

                                    winningLine={winningLine}

                                />

                            )

                        )

                    }

                </div>

            </div>

        </div>

    );

};

export default SlotMachine;