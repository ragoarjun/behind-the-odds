import { useEffect, useState } from "react";

import { FaGift } from "react-icons/fa6";

const MysteryBox = ({

    opening,

    multiplier,

    payout

}) => {

    const [

        revealed,

        setRevealed

    ] = useState(false);

    useEffect(() => {

        if (

            opening

        ) {

            setRevealed(false);

            return;

        }

        if (

            multiplier !== null

        ) {

            setRevealed(true);

        }

    }, [

        opening,

        multiplier

    ]);

    return (

        <div
            className="
                bg-[#181818]
                border
                border-[#2B2B2B]
                rounded-3xl
                h-full
                flex
                flex-col
                items-center
                justify-center
                p-12
            "
        >

            <div

                className={`

                    text-[120px]

                    transition-all

                    duration-300

                    ${opening ? "animate-bounce scale-110 rotate-6" : ""}

                `}

            >

                <FaGift />

            </div>

            {

                opening ?

                (

                    <>

                        <p

                            className="

                                mt-8

                                text-xl

                                text-gray-400

                            "

                        >

                            Opening...

                        </p>

                    </>

                )

                :

                revealed ?

                (

                    <>

                        <h1

                            className="

                                mt-8

                                text-7xl

                                font-black

                                text-[#FA233B]

                            "

                        >

                            {multiplier}x

                        </h1>

                        <p

                            className="

                                mt-4

                                text-3xl

                                font-bold

                                text-green-400

                            "

                        >

                            +{payout.toFixed(2)} FKE

                        </p>

                    </>

                )

                :

                (

                    <>

                        <h2

                            className="

                                mt-8

                                text-3xl

                                font-bold

                            "

                        >

                            Mystery Box

                        </h2>

                        <p

                            className="

                                mt-4

                                text-gray-500

                            "

                        >

                            Open the box and reveal your multiplier.

                        </p>

                    </>

                )

            }

        </div>

    );

};

export default MysteryBox;