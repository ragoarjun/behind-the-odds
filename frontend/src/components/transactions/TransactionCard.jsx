import {
    MdTrendingUp,
    MdTrendingDown
} from "react-icons/md";

const gameIcons = {
    Mines: "💣",
    Crash: "📈",
    Plinko: "🎯",
    Slots: "🎰",
    "Mystery Box": "🎁"
};

const TransactionCard = ({ transaction }) => {

    const isWin = transaction.result === "WIN";

    return (

        <div className="
            bg-[#181818]
            border border-[#252525]
            rounded-2xl
            p-5
            hover:border-red-500
            transition-all
            duration-300
        ">

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">

                    <div className="text-4xl">

                        {gameIcons[transaction.game]}

                    </div>

                    <div>

                        <h3 className="text-lg font-semibold">

                            {transaction.game}

                        </h3>

                        <p className="text-sm text-gray-500">

                            {new Date(
                                transaction.createdAt
                            ).toLocaleString()}

                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <div
                        className={`flex items-center justify-end gap-2 font-semibold ${
                            isWin
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >

                        {

                            isWin

                                ? <MdTrendingUp />

                                : <MdTrendingDown />

                        }

                        {transaction.result}

                    </div>

                    <p className="text-xl font-bold mt-2">

                        {

                            isWin

                                ? `+${transaction.payout}`

                                : `-${transaction.betAmount}`

                        } FKE

                    </p>

                </div>

            </div>

            <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex justify-between text-sm text-gray-400">

                <span>

                    Bet

                    <span className="ml-2 text-white">

                        {transaction.betAmount} FKE

                    </span>

                </span>

                <span>

                    Payout

                    <span className="ml-2 text-white">

                        {transaction.payout} FKE

                    </span>

                </span>

            </div>

        </div>

    );

};

export default TransactionCard;