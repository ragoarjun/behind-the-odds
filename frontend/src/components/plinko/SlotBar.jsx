const SlotBar = ({

    multipliers,

    activeSlot

}) => {

    return (

        <div
            className="
                grid
                grid-cols-11
                gap-2
                mt-8
            "
        >

            {

                multipliers.map(

                    (

                        multiplier,

                        index

                    ) => (

                        <div

                            key={index}

                            className={`

                                h-10

                                rounded-xl

                                flex

                                items-center

                                justify-center

                                font-semibold text-sm

                                transition-all

                                duration-300

                                ${
                                    activeSlot === index

                                    ?

                                    "bg-[#FA233B] scale-110 shadow-[0_0_20px_rgba(250,35,59,0.7)]"

                                    :

                                    "bg-[#242424] border border-[#333]"

                                }

                            `}

                        >

                            {multiplier}x

                        </div>

                    )

                )

            }

        </div>

    );

};

export default SlotBar;