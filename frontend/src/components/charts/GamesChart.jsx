import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444"
];

const GamesChart = ({ data }) => {

    return (

        <ResponsiveContainer
            width="100%"
            height="100%"
        >

            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 10,
                    right: 25,
                    left: 30,
                    bottom: 10
                }}
                barCategoryGap={18}
            >

                <CartesianGrid
                    horizontal={true}
                    vertical={false}
                    stroke="#242424"
                />

                <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                    stroke="#666"
                />

                <YAxis
                    type="category"
                    dataKey="game"
                    tickLine={false}
                    axisLine={false}
                    stroke="#AAA"
                    width={110}
                />

                <Tooltip
                    cursor={{
                        fill: "#181818"
                    }}
                    contentStyle={{
                        background: "#181818",
                        border: "1px solid #333",
                        borderRadius: "12px",
                        color: "#fff"
                    }}
                    formatter={(value) => [
                        `${value} Plays`,
                        "Activity"
                    ]}
                />

                <Bar
                    dataKey="plays"
                    radius={[0, 12, 12, 0]}
                    animationDuration={1200}
                >

                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={
                                COLORS[
                                    index % COLORS.length
                                ]
                            }
                        />

                    ))}

                </Bar>

            </BarChart>

        </ResponsiveContainer>

    );

};

export default GamesChart;