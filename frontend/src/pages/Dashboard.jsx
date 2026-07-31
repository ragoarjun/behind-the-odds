import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import BalanceChart from "../components/charts/BalanceChart";
import WinLossChart from "../components/charts/WinLossChart";
import GamesChart from "../components/charts/GamesChart";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import {
    MdAccountBalanceWallet,
    MdTrendingDown,
    MdWarning,
    MdPercent,
    MdFavorite,
    MdSportsEsports
} from "react-icons/md";

const Dashboard = () => {

    const [stats, setStats] = useState(null);

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    if (!stats) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-full">

                    <p className="text-gray-400">

                        Loading Dashboard...

                    </p>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold">

                Welcome Back 👋

            </h1>

            <p className="text-gray-400 mt-2">

                Gambling Behaviour Analytics Dashboard

            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">

                <StatCard
                    icon={<MdAccountBalanceWallet size={28} />}
                    title="Current Balance"
                    value={`${Number(stats.currentBalance).toFixed(2)} FKE`}
                    subtitle="Available Balance"
                />

                <StatCard
                    icon={<MdTrendingDown size={28} />}
                    title="Profit / Loss"
                    value={`${Number(stats.netProfitLoss).toFixed(2)} FKE`}
                    subtitle="Overall Performance"
                />

                <StatCard
                    icon={<MdWarning size={28} />}
                    title="Risk Score"
                    value={Number(stats.riskScore).toFixed(2)}
                    subtitle="Medium Risk"
                />

                <StatCard
                    icon={<MdPercent size={28} />}
                    title="Win Rate"
                    value={`${Number(stats.winRate).toFixed(2)}%`}
                    subtitle="Overall Win Rate"
                />

                <StatCard
                    icon={<MdFavorite size={28} />}
                    title="Favorite Game"
                    value={stats.favoriteGame}
                    subtitle="Most Played"
                />

                <StatCard
                    icon={<MdSportsEsports size={28} />}
                    title="Total Bets"
                    value={stats.totalBets}
                    subtitle="Games Played"
                />

            </div>

            <div className="mt-8">

                <ChartCard
                    title="Balance History"
                    subtitle="Track your wallet balance over time"
                >

                    <div className="flex justify-center items-center h-full text-gray-500">

                        <BalanceChart data={stats.balanceHistory} />

                    </div>

                </ChartCard>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <ChartCard
                    title="Win vs Loss"
                    subtitle="Overall performance"
                >

                    <div className="flex justify-center items-center h-full text-gray-500">

                        <WinLossChart data={stats.winLossData} />

                    </div>

                </ChartCard>

                <ChartCard
                    title="Games Played"
                    subtitle="Most played games"
                >

                    <div className="flex justify-center items-center h-full text-gray-500">

                        <GamesChart data={stats.gamesPlayedData} />

                    </div>

                </ChartCard>

            </div>

            <div className="mt-8">

                <RecentTransactions
                    transactions={stats.recentTransactions}
                />

            </div>

        </DashboardLayout>

    );

};

export default Dashboard;