import { Outlet } from "react-router-dom";
// import SideBar from "../../pages/SideBar/SideBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SideBar from "../pages/SideBar/SideBar";

const Dashboard = () => {
    return (
        <div className="flex flex-col xl:flex-row font-cinezal">
            <div className="w-full z-20 xl:w-1/4 lg:fixed lg:top-0 xl:h-full">
               <SideBar/>
            </div>
            <div className="w-full xl:w-3/4 xl:ml-[25%] py-4 md:py-20">
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;