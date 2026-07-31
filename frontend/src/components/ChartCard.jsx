const ChartCard = ({
    title,
    subtitle,
    children
}) => {

    return (

        <div
            className="
                bg-[#181818]
                border
                border-gray-800
                rounded-xl
                p-5
                transition-all
                duration-300
                hover:border-gray-700
                hover:bg-[#1C1C1C]
                hover:shadow-xl
                hover:shadow-black/30
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-semibold text-white">

                        {title}

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        {subtitle}

                    </p>

                </div>

                <span className="text-xs text-gray-500 bg-[#222] px-3 py-1 rounded-full">

                    Live

                </span>

            </div>

            <div className="h-80 mt-5">

                {children}

            </div>

            <div className="border-t border-gray-800 pt-4 mt-5 flex justify-between text-xs text-gray-500">

                <span>Updated Just Now</span>

                <span>Behind The Odds</span>

            </div>

        </div>

    );

};

export default ChartCard;