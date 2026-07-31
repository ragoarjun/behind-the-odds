import {
    MdDashboard,
    MdSportsEsports,
    MdAccountBalanceWallet,
    MdReceiptLong,
    MdAnalytics,
    MdSettings
} from "react-icons/md";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menu = [

        {
            name: "Dashboard",
            icon: <MdDashboard size={22} />,
            path: "/dashboard"
        },

        {
            name: "Games",
            icon: <MdSportsEsports size={22} />,
            path: "/games"
        },

        {
            name: "Wallet",
            icon: <MdAccountBalanceWallet size={22} />,
            path: "/wallet"
        },

        {
            name: "Transactions",
            icon: <MdReceiptLong size={22} />,
            path: "/transactions"
        },

        {
            name: "Recovery",
            icon: <MdAnalytics size={22} />,
            path: "/recovery"
        },

        {
            name: "Settings",
            icon: <MdSettings size={22} />,
            path: "/settings"
        }

    ];

    return (

        <aside className="w-64 bg-[#181818] border-r border-gray-800 p-6">

            <h1 className="text-2xl font-bold text-red-500 mb-10">

                Behind The Odds

            </h1>

            <nav className="space-y-2">

                {

                    menu.map(item => (

                        <NavLink

                            key={item.name}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all

                                ${

                                    isActive

                                    ? "bg-red-500 text-white"

                                    : "hover:bg-[#242424] text-gray-300"

                                }`

                            }

                        >

                            {item.icon}

                            {item.name}

                        </NavLink>

                    ))

                }

            </nav>

        </aside>

    );

};

export default Sidebar;