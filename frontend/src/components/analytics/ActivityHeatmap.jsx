import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

import { getActivity } from "../../services/analyticsService";

import "./ActivityHeatmap.css";

const ActivityHeatmap = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchActivity();

    }, []);

    const fetchActivity = async () => {

        try {

            const activity = await getActivity();

            const activityMap = new Map();

            activity.forEach(day => {

                activityMap.set(day.date, day);

            });

            const today = new Date();

            const formatted = [];

            for (let i = 364; i >= 0; i--) {

                const date = new Date(today);

                date.setDate(today.getDate() - i);

                const dateString =
                    date.toISOString().split("T")[0];

                const existing =
                    activityMap.get(dateString);

                const count =
                    existing
                        ? existing.count
                        : 0;

                formatted.push({

                    date: dateString,

                    count,

                    level:
                        count === 0
                            ? 0
                            : count <= 2
                            ? 1
                            : count <= 4
                            ? 2
                            : count <= 7
                            ? 3
                            : 4

                });

            }

            setData(formatted);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="bg-[#181818] border border-[#252525] rounded-2xl p-8">

                <h2 className="text-3xl font-semibold text-white">

                    Gambling Activity

                </h2>

                <p className="text-gray-500 mt-2">

                    Loading activity...

                </p>

            </div>

        );

    }

    return (

        <div className="bg-[#181818] border border-[#252525] rounded-2xl p-8">

            <div className="mb-8">

                <h2 className="text-3xl font-semibold text-white">

                    Gambling Activity

                </h2>

                <p className="text-gray-500 mt-2">

                    Daily gambling activity over the last year.

                </p>

            </div>

            <div className="overflow-x-auto heatmap-wrapper flex justify-center">

                <ActivityCalendar

                    data={data}

                    weekStart={1}

                    blockSize={16}

                    blockMargin={3}

                    fontSize={12}

                    hideColorLegend

                    hideTotalCount

                    theme={{

                        light: [

                            "#323232",
                            "#4A0F1B",
                            "#7A1626",
                            "#C41F37",
                            "#FA233B"

                        ],

                        dark: [

                            "#323232",
                            "#4A0F1B",
                            "#7A1626",
                            "#C41F37",
                            "#FA233B"

                        ]

                    }}

                />

            </div>

            <div className="flex justify-end items-center gap-2 mt-8 text-sm text-gray-500">

                <span>

                    Less

                </span>

                <div className="w-4 h-4 rounded bg-[#323232]" />

                <div className="w-4 h-4 rounded bg-[#4A0F1B]" />

                <div className="w-4 h-4 rounded bg-[#7A1626]" />

                <div className="w-4 h-4 rounded bg-[#C41F37]" />

                <div className="w-4 h-4 rounded bg-[#FA233B]" />

                <span>

                    More

                </span>

            </div>

        </div>

    );

};

export default ActivityHeatmap;