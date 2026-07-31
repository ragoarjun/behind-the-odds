import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <header className="h-16 border-b border-gray-800 bg-[#181818] flex justify-end items-center px-8">

            <div className="flex items-center gap-8">

                <div className="text-base font-semibold">

                    💰 Wallet

                </div>

                <FaUserCircle
                    size={32}
                    className="cursor-pointer hover:text-red-500 transition"
                    onClick={handleLogout}
                    title="Logout"
                />

            </div>

        </header>

    );

};

export default Navbar;