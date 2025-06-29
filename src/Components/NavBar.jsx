import { AiFillHome } from "react-icons/ai";

function NavBar() {
    return (
        <nav className="bg-transparent text-white  w-full  font-sans  sticky top-0  h-[80px] ">
            <div className="max-w-7xl mx-auto flex items-center justify-evenly px-6 h-full">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="Shyampari Education" className="h-14 w-auto object-contain rounded-sm" />
                </div>

                {/* Navigation Links */}
                <ul className="flex gap-8 items-center text-xl text-shadow-sm font-bold">
                    <li className="flex items-center gap-1 hover:text-[#F39C12] transition-colors duration-200 cursor-pointer">
                        <AiFillHome size={20} />
                        HOME
                    </li>
                    <li className="hover:text-[#F39C12] transition-colors duration-200 cursor-pointer">
                        SERVICES
                    </li>
                    <li className="hover:text-[#F39C12] transition-colors duration-200 cursor-pointer">
                        ABOUT US
                    </li>
                    <li className="hover:text-[#F39C12] transition-colors duration-200 cursor-pointer">
                        BLOG
                    </li>
                    <li className="hover:text-[#F39C12] transition-colors duration-200 cursor-pointer">
                        CONTACT US
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
