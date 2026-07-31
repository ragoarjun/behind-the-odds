import { useNavigate } from "react-router-dom";

import {
    GiMineExplosion,
    GiRollingBomb,
    GiPokerHand,
    GiPerspectiveDiceSixFacesRandom
} from "react-icons/gi";

import { FaCoins } from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";

const games = [

    {
        title: "Mines",
        description: "Reveal gems and avoid hidden mines.",
        icon: <GiMineExplosion size={40} />,
        color: "from-red-500 to-red-700",
        path: "/mines",
        available: true
    },

    {
        title: "Crash",
        description: "Cash out before the multiplier crashes.",
        icon: <GiRollingBomb size={40} />,
        color: "from-orange-500 to-red-500",
        path: "/crash",
        available: true
    },

    {
        title: "Plinko",
        description: "Drop the ball and land on huge multipliers.",
        icon: <FaCoins size={36} />,
        color: "from-yellow-500 to-orange-500",
        path: "/plinko",
        available: true
    },

    {
        title: "Slots",
        description: "Spin the reels and chase the jackpot.",
        icon: <GiPokerHand size={40} />,
        color: "from-pink-500 to-purple-600",
        path: "/slots",
        available: true
    },

    {
        title: "Mystery Box",
        description: "Open a mystery box for random rewards.",
        icon: <GiPerspectiveDiceSixFacesRandom size={40} />,
        color: "from-cyan-500 to-blue-600",
        path: "/mystery",
        available: true
    }

];

const Games = () => {

    const navigate = useNavigate();

    return (

        <DashboardLayout>

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Games

                </h1>

                <p className="text-gray-400 mt-2">

                    Choose a game and test your luck.

                </p>

            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                {

                    games.map(game => (

                        <div

                            key={game.title}

                            onClick={() => {

                                if (game.available) {

                                    navigate(game.path);

                                }

                            }}

                            className={`
                                bg-[#181818]
                                border
                                border-[#2B2B2B]
                                rounded-3xl
                                p-8
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:border-[#FA233B]
                                hover:shadow-[0_0_30px_rgba(250,35,59,0.15)]
                                ${game.available
                                    ? "cursor-pointer"
                                    : "opacity-60 cursor-not-allowed"}
                            `}

                        >

                            <div className={`
                                w-16
                                h-16
                                rounded-2xl
                                bg-linear-to-br
                                ${game.color}
                                flex
                                items-center
                                justify-center
                                text-white
                            `}>

                                {game.icon}

                            </div>

                            <h2 className="text-2xl font-bold mt-6">

                                {game.title}

                            </h2>

                            <p className="text-gray-400 mt-3 leading-relaxed">

                                {game.description}

                            </p>

                            <div className="mt-8">

                                {

                                    game.available ? (

                                        <span className="text-[#FA233B] font-semibold">

                                            Play →

                                        </span>

                                    ) : (

                                        <span className="text-gray-500">

                                            Coming Soon

                                        </span>

                                    )

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

        </DashboardLayout>

    );

};

export default Games;