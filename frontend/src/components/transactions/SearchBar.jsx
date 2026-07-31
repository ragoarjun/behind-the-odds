import { MdSearch } from "react-icons/md";

const SearchBar = ({ value, onChange }) => {

    return (

        <div className="relative w-full">

            <MdSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={22}
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search by game..."
                className="
                    w-full
                    bg-[#181818]
                    border
                    border-[#2A2A2A]
                    rounded-xl
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    text-white
                    placeholder:text-gray-500
                    focus:border-red-500
                    transition
                "
            />

        </div>

    );

};

export default SearchBar;