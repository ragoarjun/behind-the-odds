import { useEffect, useState } from "react";

import Symbol from "./Symbol";

const SYMBOL_POOL = [

    "🍋",
    "🍒",
    "🍇",
    "🔔",
    "💎",
    "7️⃣"

];

const SYMBOL_MAP = {

    LEMON: "🍋",
    CHERRY: "🍒",
    GRAPE: "🍇",
    BELL: "🔔",
    DIAMOND: "💎",
    SEVEN: "7️⃣",
    "?": "?"

};

const Reel = ({

    symbols,

    spinning,

    reelIndex

}) => {

    const [

        display,

        setDisplay

    ] = useState(

        symbols

    );

    useEffect(() => {

        if (

            !spinning

        ) {

            setDisplay(

                symbols

            );

            return;

        }

        const interval = setInterval(() => {

            setDisplay([

                {

                    name:

                        SYMBOL_POOL[

                            Math.floor(

                                Math.random() *

                                SYMBOL_POOL.length

                            )

                        ]

                },

                {

                    name:

                        SYMBOL_POOL[

                            Math.floor(

                                Math.random() *

                                SYMBOL_POOL.length

                            )

                        ]

                },

                {

                    name:

                        SYMBOL_POOL[

                            Math.floor(

                                Math.random() *

                                SYMBOL_POOL.length

                            )

                        ]

                }

            ]);

        }, 70);

        const timeout = setTimeout(() => {

            clearInterval(

                interval

            );

            setDisplay(

                symbols

            );

        }, 1200 + reelIndex * 350);

        return () => {

            clearInterval(

                interval

            );

            clearTimeout(

                timeout

            );

        };

    }, [

        spinning,

        symbols,

        reelIndex

    ]);

    return (

        <div

            className="
              w-32
              rounded-3xl
              overflow-hidden
              bg-[#111]
              border-2
              border-[#555]
              shadow-inner
              shadow-black
              "

        >

            {

                display.map(

                    (

                        symbol,

                        index

                    ) => (

                        <Symbol

                            key={index}

                            symbol={

                                SYMBOL_MAP[

                                    symbol.name

                                ] ||

                                symbol.name

                            }

                        />

                    )

                )

            }

        </div>

    );

};

export default Reel;