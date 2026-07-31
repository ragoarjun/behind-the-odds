import MineTile from "./MineTile";

const MineBoard = ({

    board,

    revealedTiles,

    gameOver,

    onReveal

}) => {

    return (

        <div
            className="
                bg-[#181818]
                border
                border-[#2B2B2B]
                rounded-3xl
                p-10
                shadow-xl
                flex
                justify-center
                items-center
            "
        >

            <div
                className="
                    grid
                    grid-cols-5
                    gap-4
                "
            >

                {

                    board.map(

                        (value, index) => (

                            <MineTile

                                key={index}

                                value={value}

                                disabled={
                                    revealedTiles.includes(index) ||
                                    gameOver
                                }

                                onClick={() =>
                                    onReveal(index)
                                }

                            />

                        )

                    )

                }

            </div>

        </div>

    );

};

export default MineBoard;