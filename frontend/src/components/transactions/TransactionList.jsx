import TransactionCard from "./TransactionCard";

const TransactionList = ({ transactions }) => {

    if (!transactions.length) {

        return (

            <div className="
                bg-[#181818]
                border
                border-[#252525]
                rounded-2xl
                p-10
                text-center
            ">

                <h2 className="text-2xl font-semibold">

                    No Transactions Found

                </h2>

                <p className="text-gray-500 mt-3">

                    Start playing games to build your history.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {

                transactions.map(transaction => (

                    <TransactionCard

                        key={transaction._id}

                        transaction={transaction}

                    />

                ))

            }

        </div>

    );

};

export default TransactionList;