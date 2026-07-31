import StatCard from "../StatCard";

import {

    MdAccountBalanceWallet,

    MdTrendingDown,

    MdEmojiEvents,

    MdMoneyOff

} from "react-icons/md";

const WalletOverview = ({ wallet }) => {

    return (

        <div className="grid grid-cols-2 gap-6">

            <StatCard

                icon={<MdAccountBalanceWallet size={28} />}

                title="Current Balance"

                value={`${Number(wallet.currentBalance).toFixed(2)} FKE`}

                subtitle="Available Balance"

            />

            <StatCard

                icon={<MdTrendingDown size={28} />}

                title="Net Profit"

                value={`${Number(wallet.netProfitLoss).toFixed(2)} FKE`}

                subtitle={wallet.profitStatus}

            />

            <StatCard

                icon={<MdEmojiEvents size={28} />}

                title="Biggest Win"

                value={`${wallet.biggestWin} FKE`}

                subtitle="Highest Win"

            />

            <StatCard

                icon={<MdMoneyOff size={28} />}

                title="Biggest Loss"

                value={`${wallet.biggestLoss} FKE`}

                subtitle="Highest Loss"

            />

        </div>

    );

};

export default WalletOverview;