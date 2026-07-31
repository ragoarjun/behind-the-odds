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

const RecentTransactions = ({ transactions }) => {

    if (!transactions.length) {

        return (

            <div className="bg-[#181818] border border-[#252525] rounded-2xl p-8">

                <h2 className="text-xl font-semibold">

                    Recent Activity

                </h2>

                <p className="text-gray-500 mt-4">

                    No games played yet.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-[#181818] border border-[#252525] rounded-2xl p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-xl font-semibold">

                        Recent Activity

                    </h2>

                    <p className="text-gray-500 text-sm">

                        Your latest games

                    </p>

                </div>

            </div>

            <div className="space-y-4">

                {transactions.map(transaction => (

                    <div
                        key={transaction._id}
                        className="flex justify-between items-center bg-[#141414] rounded-xl px-5 py-4 border border-[#232323]"
                    >

                        <div className="flex items-center gap-4">

                            <div className="text-3xl">

                                {gameIcons[transaction.game]}

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    {transaction.game}

                                </h3>

                                <p className="text-gray-500 text-sm">

                                    {new Date(
                                        transaction.createdAt
                                    ).toLocaleString()}

                                </p>

                            </div>

                        </div>

                        <div className="text-right">

                            <div
                                className={`flex items-center gap-2 justify-end ${
                                    transaction.result === "WIN"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >

                                {transaction.result === "WIN"
                                    ? <MdTrendingUp />
                                    : <MdTrendingDown />
                                }

                                {transaction.result}

                            </div>

                            <p className="font-bold mt-1">

                                {transaction.result === "WIN"
                                    ? `+${transaction.payout}`
                                    : `-${transaction.betAmount}`}{" "}
                                FKE

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RecentTransactions;