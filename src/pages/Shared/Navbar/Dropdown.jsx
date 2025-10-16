import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful");
        navigate('/login'); // or '/' as you prefer
      })
      .catch((error) => {
        toast.error("Logout Failed");
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <div className="relative inline-block">
          {/* Dropdown toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 block p-2 text-gray-700 border border-transparent rounded-md"
          >
            <img
              className="object-cover w-12 h-12 rounded-full ring ring-gray-300"
              src={user?.photoURL}
              alt=""
              title={user?.displayName}
            />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl"
              onBlur={() => setIsOpen(false)}
            >
              <Link to="/dashboard/addPet">
                <button
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 w-full"
                >
                  Dashboard
                </button>
              </Link>

              <button
                onClick={handleLogout}  // updated here
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
