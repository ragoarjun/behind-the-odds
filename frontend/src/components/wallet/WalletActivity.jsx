const WalletActivity = ({ wallet }) => {

    return (

        <div className="mt-8 bg-[#181818] border border-[#252525] rounded-2xl p-6">

            <h2 className="text-2xl font-semibold">

                Wallet Summary

            </h2>

            <div className="grid grid-cols-2 gap-8 mt-6">

                <div>

                    <p className="text-gray-500">

                        Lifetime Wagered

                    </p>

                    <h3 className="text-3xl font-bold mt-2">

                        {wallet.totalAmountWagered} FKE

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Win Rate

                    </p>

                    <h3 className="text-3xl font-bold mt-2">

                        {wallet.winRate}%

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Total Wins

                    </p>

                    <h3 className="text-3xl font-bold mt-2">

                        {wallet.totalWins}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Total Losses

                    </p>

                    <h3 className="text-3xl font-bold mt-2">

                        {wallet.totalLosses}

                    </h3>

                </div>

            </div>

        </div>

    );

};

export default WalletActivity;