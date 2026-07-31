const TransactionFilters = ({
    gameFilter,
    resultFilter,
    onGameChange,
    onResultChange
}) => {

    return (

        <div className="flex gap-4">

            <select
                value={gameFilter}
                onChange={onGameChange}
                className="
                    bg-[#181818]
                    border
                    border-[#2A2A2A]
                    rounded-xl
                    px-4
                    py-3
                    text-gray-300
                    outline-none
                "
            >

                <option value="All">
                    All Games
                </option>

                <option value="Mines">
                    Mines
                </option>

                <option value="Crash">
                    Crash
                </option>

                <option value="Plinko">
                    Plinko
                </option>

                <option value="Slots">
                    Slots
                </option>

                <option value="Mystery Box">
                    Mystery Box
                </option>

            </select>

            <select
                value={resultFilter}
                onChange={onResultChange}
                className="
                    bg-[#181818]
                    border
                    border-[#2A2A2A]
                    rounded-xl
                    px-4
                    py-3
                    text-gray-300
                    outline-none
                "
            >

                <option value="All">
                    All Results
                </option>

                <option value="WIN">
                    WIN
                </option>

                <option value="LOSS">
                    LOSS
                </option>

            </select>

        </div>

    );

};

export default TransactionFilters;