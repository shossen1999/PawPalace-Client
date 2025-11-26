import { useContext, useEffect, useState } from "react";
import logo from '../../../assets/pet-market4.png'
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../../Provider/AuthProvider";
import Dropdown from "./Dropdown";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const navLinks = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-lg mr-4 font-semi-bold border-b-2 border-[#F07C3D] text-[#F07C3D]" : "text-lg mr-4 font-semi-bold text-gray-700 hover:text-[#F07C3D]"}>Home</NavLink>
        <NavLink to="/pet-listing" className={({ isActive }) => isActive ? "text-lg mr-4 font-semi-bold border-b-2 border-[#F07C3D] text-[#F07C3D]" : "text-lg mr-4 font-semi-bold text-gray-700 hover:text-[#F07C3D]"}>Pet Listing</NavLink>
        <NavLink to="/donation-campaign" className={({ isActive }) => isActive ? "text-lg mr-4 font-semi-bold border-b-2 border-[#F07C3D] text-[#F07C3D]" : "text-lg mr-4 font-semi-bold text-gray-700 hover:text-[#F07C3D]"}>Donation Campaigns</NavLink>
        <button onClick={handleTheme} className="mr-3 bg-slate-500 text-white px-2 rounded-full">
            {theme==="dark"? "Light": "Dark"}
        </button>
    </>

    return (
        <div>
            <nav className="relative">
                <div className=" px-10 py-4 md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between w-36">
                        <img className="w-full" src={logo} alt="" />

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-[#F07C3D] hover:text-[#F07C3D] focus:outline-none focus:text-[#F07C3D]"
                                aria-label="toggle menu"
                            >
                                <svg
                                    className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>

                                <svg
                                    className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row md:mx-6 lg:space-x-10 space-y-2 lg:space-y-0">
                            {navLinks}

                            {
                                !user && <Link to="/login">
                                    <button className="border border-[#F07C3D] px-4 w-32 lg:w-auto py-1 rounded-sm text-[#F07C3D] hover:bg-[#F07C3D] hover:text-white ease-in duration-100 ">Login</button>
                                </Link>
                            }
                        </div>
                        {
                            user && <div className="flex justify-center md:block">
                                <Dropdown></Dropdown>
                            </div>
                        }


                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;