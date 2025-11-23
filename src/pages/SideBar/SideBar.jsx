import { FaBars, FaHouse } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import './sidebar.css'


import logo from '../../assets/logo2.jpg'

import { FaUser } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";




const SideBar = () => {

    const [isAdmin] = useAdmin()

    const sideLinks = <>

        {
            isAdmin ?
                <>
                    <li className="text-white"><NavLink to="/dashboard/users"><FaUser className="text-2xl" /> All Users</NavLink></li>
                    <li className="text-white"><NavLink to="/dashboard/allPets"><FaUser className="text-2xl" /> All Pets</NavLink></li>
                    <li className="text-white"><NavLink to="/dashboard/allDonations"><FaUser className="text-2xl" /> All Donations</NavLink></li>
                    <div className="divider "></div>
                    <li className="text-white"><NavLink to={'/'}><FaHouse className="text-2xl" /> Home</NavLink></li>

                </>
                :
                <>
                    <li className="text-white"><NavLink to="/dashboard/addPet"><FaUser className="text-2xl" /> Add A Pet</NavLink></li>
                    <li className="text-white"><NavLink to="/dashboard/myPets"><FaUser className="text-2xl" /> My Added Pet</NavLink></li>
                    <li className="text-white"><NavLink to="/dashboard/adoptionRequests"><FaUser className="text-2xl" /> Adoption Requests</NavLink></li>
                    <li className="text-white"><NavLink to="/dashboard/createCampaign"><FaUser className="text-2xl" /> Create Donation Campaign</NavLink></li>
                    <li className="text-white"><NavLink to="/dashboard/myDonationCampaigns" ><FaUser className="text-2xl" /> My Donation Campaigns</NavLink></li>
                    <div className="divider "></div>
                    <li className="text-white"><NavLink to={'/'}><FaHouse className="text-2xl" /> Home</NavLink></li>

                </>

        }




    </>

    return (
        <div className="drawer xl:drawer-open z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col xl:hidden ">
                <label htmlFor="my-drawer-2" className="btn bg-[#1E293B] text-white w-fit drawer-button xl:hidden"><FaBars /></label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#7b7b7b] space-y-2">
                    <div className="flex flex-col items-start p-4 text-start">
                        <img className="h-10" src={logo} alt="" />

                    </div>

                    {sideLinks}
                </ul>

            </div>
        </div>
    );
};



export default SideBar;