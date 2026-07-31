import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";

const COLORS = [
    "#22C55E",
    "#EF4444"
];

const WinLossChart = ({ data }) => {

    const totalGames = data.reduce(
        (sum, item) => sum + item.value,
        0
    );

    return (

        <ResponsiveContainer
            width="100%"
            height="100%"
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="42%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    animationDuration={1200}
                >

                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index]}
                        />

                    ))}

                </Pie>

                <text
                    x="50%"
                    y="40%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize="28"
                    fontWeight="bold"
                >

                    {totalGames}

                </text>

                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#777"
                    fontSize="14"
                >

                    Total Games

                </text>

                <Tooltip
                    contentStyle={{
                        background: "#181818",
                        border: "1px solid #333",
                        borderRadius: "12px",
                        color: "#fff"
                    }}
                />

            </PieChart>

        </ResponsiveContainer>

    );

};

export default WinLossChart;