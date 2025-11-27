import logo from "../../../assets/pet-market4.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <footer>
                <div className="container px-6 py-8 mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <a href="#">
                            <img
                                className="w-40 h-14"
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
                                href="/pet-listing"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="Pet Listing"
                            >
                                Pet Listing
                            </a>

                            <a
                                href="/donation-campaign"
                                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-[#F07C3D]"
                                aria-label="Donation Campaigns"
                            >
                                Donation Campaigns
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