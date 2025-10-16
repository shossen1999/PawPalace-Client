import logo from "../../../assets/logo.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <footer>
                <div className="container px-6 py-8 mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <a href="#">
                            <img
                                className="w-36 h-10"
                                src={logo}
                                alt=""
                            />
                        </a>

                        <div className="flex flex-wrap justify-center mt-6 -mx-4">
                            <a
                                href="#"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="Home"
                            >
                                Home
                            </a>

                            <a
                                href="#"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="About"
                            >
                                About
                            </a>

                            <a
                                href="#"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="Teams"
                            >
                                Teams
                            </a>

                            <a
                                href="#"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="Privacy"
                            >
                                Privacy
                            </a>

                            <a
                                href="#"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="Cookies"
                            >
                                Cookies
                            </a>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200 md:my-10" />

                    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                        <p className="text-sm text-gray-500">
                            © Copyright 2024. All Rights Reserved.
                        </p>

                        <div className="flex -mx-2">
                            <FaFacebook className='text-2xl mr-4 text-gray-700'></FaFacebook>
                            <FaInstagram className='text-2xl mr-4 text-gray-700'></FaInstagram>
                            <FaTwitter className='text-2xl mr-4 text-gray-700'></FaTwitter>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;