import Ball from "./Ball";
import SlotBar from "./SlotBar";

import {

    PEGS,
    BOARD_WIDTH,
    ROWS,
    ROW_SPACING,
    TOP_PADDING

} from "../../utils/plinkoBoard";

const MULTIPLIERS = [

    10,
    4,
    1.5,
    0.8,
    0.4,
    0.2,
    0.4,
    0.8,
    1.5,
    4,
    10

];

const PlinkoBoard = ({

    path,

    dropping,

    landedSlot,

    onAnimationComplete

}) => {

    const boardHeight =

        TOP_PADDING +

        ROWS * ROW_SPACING +

        60;

    return (

        <div
            className="
                bg-[#181818]
                border
                border-[#2B2B2B]
                rounded-3xl
                p-8
            "
        >

            <div

                className="relative mx-auto"

                style={{

                    width: BOARD_WIDTH,

                    height: boardHeight

                }}

            >

                {

                    PEGS.map((peg)=>(

                        <div

                            key={peg.id}

                            style={{

                                left: peg.x - 7,

                                top: peg.y - 7

                            }}

                            className="
                                absolute
                                w-3
                                h-3
                                rounded-full
                                bg-white
                            "

                        />

                    ))

                }

                <Ball

                    path={path}

                    dropping={dropping}

                    onComplete={

                        onAnimationComplete

                    }

                />

                <div

                    className="absolute bottom-0 w-full"

                >

                    <SlotBar

                        multipliers={MULTIPLIERS}

                        activeSlot={landedSlot}

                    />

                </div>

            </div>

        </div>

    );

};

export default PlinkoBoard;