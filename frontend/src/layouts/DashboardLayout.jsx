import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="flex h-screen bg-[#0F0F0F] text-white">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 overflow-y-auto p-6 pr-4">

                    {children}

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;