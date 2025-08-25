import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Warehouse, CalendarArrowDown } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { House } from 'lucide-react';


const OwnerLayout = () => {
    const location = useLocation();

    const dashboardicon = (
        <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
            />
        </svg>
    );

    const { owner, setOwner, navigate,axios,setCurrentUser } = useContext(AppContext);
    const sidebarLinks = [
        { name: 'Dashboard', path: '/owner', icon: dashboardicon },
        { name: 'Rooms', path: '/owner/rooms', icon: <Warehouse /> },
        { name: 'Bookings', path: '/owner/bookings', icon: <CalendarArrowDown /> },
    ];
    // const logout = async () => {
    //      setOwner(false)
    //      toast.success("Logout sucessfull");
    //      navigate("/")

    // }

    const LogoutHandler = async () => {
        try {
            // Call backend logout API
            await fetch("/api/user/logout", {
                method: "GET",
                credentials: "include", // so cookies clear
            });

            // Clear localStorage
            localStorage.removeItem("owner");

            // Reset state
            setOwner(false);
             setCurrentUser(null)
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed");
        }
    };



    return (
        <div className="flex">
            {/* Topbar */}
            <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white z-10">
                <Link to="/owner">
                    <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                   <Link to="/"><p><House /></p></Link> 
                    <button
                        onClick={LogoutHandler}
                        className="border rounded-full text-sm px-4 py-1">Logout</button>
                </div>
            </div>

            {/* Sidebar */}
            <div className="mt-16 md:w-64 w-16 border-r h-[calc(100vh-64px)] text-base border-gray-300 pt-4 flex flex-col">
                {sidebarLinks.map((item, index) => {
                    const isActive =
                        location.pathname === item.path ||
                        (item.path !== '/owner' && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            to={item.path}
                            key={index}
                            className={`flex items-center py-3 px-4 gap-3 transition-colors
                ${isActive
                                    ? 'border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500'
                                    : 'hover:bg-gray-100/90 border-white text-gray-700'
                                }`}
                        >
                            {item.icon}
                            <p className="md:block hidden text-center">{item.name}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Page Content */}
            <div className="flex-1 mt-16 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerLayout;
