const StatCard = ({
    icon,
    title,
    value,
    subtitle
}) => {

    return (

        <div
            className="
                bg-[#181818]
                border
                border-gray-800
                rounded-2xl
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gray-700
              hover:bg-[#1C1C1C]
                hover:shadow-xl
                hover:shadow-black/30
            "
        >

            <div className="flex justify-between items-center">

                <p className="text-sm text-gray-400">

                    {title}

                </p>

                <div
                    className="
                        text-red-500
                        bg-red-500/10
                        rounded-lg
                        p-2.5
                    "
                >

                    {icon}

                </div>

            </div>

            <h2 className="text-2xl font-bold mt-5">

                {value}

            </h2>

            <p className="text-sm text-gray-500 mt-2">

                {subtitle}

            </p>

        </div>

    );

};

export default StatCard;