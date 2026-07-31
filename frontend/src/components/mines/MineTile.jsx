import { FaGem } from "react-icons/fa";

import { GiMineExplosion } from "react-icons/gi";

const MineTile = ({

    value,

    disabled,

    onClick

}) => {

    const getContent = () => {

        if (value === "gem") {

            return (

                <FaGem
                    className="
                        text-sky-400
                        text-2xl
                        drop-shadow-[0_0_10px_#38bdf8]
                    "
                />

            );

        }

        if (value === "mine") {

            return (

                <GiMineExplosion
                    className="
                        text-[#FA233B]
                        text-3xl
                        drop-shadow-[0_0_10px_#FA233B]
                    "
                />

            );

        }

        return null;

    };

    return (

        <button

            onClick={onClick}

            disabled={disabled}

            className={`

                w-20

                h-20

                rounded-2xl

                border

                transition-all

                duration-200

                flex

                items-center

                justify-center

                ${

                    value

                        ? "bg-[#262626] border-[#444] scale-95"

                        : "bg-[#1D1D1D] border-[#333] hover:border-[#FA233B] hover:scale-105"

                }

            `}

        >

            {getContent()}

        </button>

    );

};

export default MineTile;