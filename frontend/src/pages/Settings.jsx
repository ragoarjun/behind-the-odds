import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

const Settings = () => {

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";

    };

    return (

        <DashboardLayout>

            <PageHeader
                title="Settings"
                subtitle="Manage your account."
            />

            <div className="space-y-6 mt-8">

                <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">

                        About

                    </h2>

                    <p className="text-gray-400 mt-4">

                        <strong>Behind The Odds</strong>

                    </p>

                    <p className="text-gray-400 mt-2">

                        Version 1.0

                    </p>

                    <p className="text-gray-400 mt-4 leading-7">

                        Behind The Odds is a responsible gambling awareness platform built with the MERN stack. Using virtual currency, the platform demonstrates casino game mechanics while encouraging responsible gambling through recovery tools, cooldown periods, and voluntary breaks.

                    </p>

                </div>

                <button

                    onClick={handleLogout}

                    className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold transition"

                >

                    Log Out

                </button>

            </div>

        </DashboardLayout>

    );

};

export default Settings;