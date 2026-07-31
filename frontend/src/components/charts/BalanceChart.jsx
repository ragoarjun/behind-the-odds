import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

const BalanceChart = ({ data }) => {

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0
                }}
            >

                <defs>

                    <linearGradient
                        id="balanceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >

                        <stop
                            offset="0%"
                            stopColor="#FA233B"
                            stopOpacity={0.45}
                        />

                        <stop
                            offset="100%"
                            stopColor="#FA233B"
                            stopOpacity={0}
                        />

                    </linearGradient>

                </defs>

                <XAxis
                    hide
                />

                <YAxis
                    hide
                />

                <Tooltip

                    cursor={false}

                    contentStyle={{

                        background: "#181818",

                        border: "1px solid #333",

                        borderRadius: "12px",

                        color: "#fff"

                    }}

                    formatter={(value) => [

                        Number(value).toFixed(2) + " FKE",

                        "Balance"

                    ]}

                    labelFormatter={() => ""}

                />

                <Area

                    type="monotone"

                    dataKey="balance"

                    stroke="#FA233B"

                    strokeWidth={4}

                    fill="url(#balanceGradient)"

                    dot={false}

                    activeDot={{

                        r: 6,

                        fill: "#FA233B",

                        stroke: "#fff",

                        strokeWidth: 2

                    }}

                    animationDuration={1000}

                />

            </AreaChart>

        </ResponsiveContainer>

    );

};

export default BalanceChart;