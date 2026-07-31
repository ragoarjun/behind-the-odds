import { useEffect, useRef, useState } from "react";

import { getPegById } from "../../utils/plinkoBoard";

const START_POSITION = {

    x: 240,

    y: 0

};

const Ball = ({

    path,

    dropping,

    onComplete

}) => {

    const [

        currentPeg,

        setCurrentPeg

    ] = useState(0);

    const [

        position,

        setPosition

    ] = useState(

        START_POSITION

    );

    const animating = useRef(false);

    useEffect(() => {

        if (

            !dropping ||

            !path ||

            path.length === 0

        ) {

            setPosition(

                START_POSITION

            );

            setCurrentPeg(0);

            animating.current = false;

            return;

        }

        const peg =

            getPegById(

                path[0]

            );

        if (peg) {

            animating.current = true;

            setCurrentPeg(0);

            setPosition({

                x: peg.x,

                y: peg.y

            });

        }

    }, [

        dropping,

        path

    ]);

    const handleTransitionEnd = () => {

        if (

            !animating.current

        ) {

            return;

        }

        const next =

            currentPeg + 1;

        if (

            next >= path.length

        ) {

            animating.current = false;

            onComplete?.();

            return;

        }

        const peg =

            getPegById(

                path[next]

            );

        if (!peg) {

            return;

        }

        setCurrentPeg(

            next

        );

        setPosition({

            x: peg.x,

            y: peg.y

        });

    };

    return (

        <div

            onTransitionEnd={

                handleTransitionEnd

            }

            style={{

                left:

                    position.x - 8,

                top:

                    position.y - 8

            }}

            className="

                absolute

                w-4

                h-4

                rounded-full

                bg-purple-500

                transition-all

                duration-150

                ease-in-out

                z-50

            "

        />

    );

};

export default Ball;