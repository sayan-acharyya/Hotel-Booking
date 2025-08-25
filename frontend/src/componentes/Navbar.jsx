//  import React, { useContext, useEffect, useRef, useState } from "react";
// import { assets } from "../assets/assets.js";
// import { Link } from "react-router-dom";
// import { AppContext } from "../context/AppContext.jsx";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { navigate, user, setUser,currentUser } = useContext(AppContext);

//   // ✅ Load user from localStorage (for refresh persistence)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [setUser]);

//   const LogoutHandler = async () => {
//     try {
//       await fetch("/api/user/logout", {
//         method: "GET",
//         credentials: "include",
//       });
//       localStorage.removeItem("user");
//       setUser(false);
      
//       toast.success("Logged out successfully");
//       navigate("/login");
//       setTimeout(() => {
//       window.location.reload();
//     }, 1000);
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Hotels", path: "/hotels" },
//     { name: "Rooms", path: "/rooms" },
//     { name: "About", path: "/about" },
//   ];

//   const [openDesktop, setOpenDesktop] = useState(false);
//   const desktopRef = useRef(null);

//   const [openMobile, setOpenMobile] = useState(false);
//   const mobileRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (desktopRef.current && !desktopRef.current.contains(e.target)) {
//         setOpenDesktop(false);
//       }
//       if (mobileRef.current && !mobileRef.current.contains(e.target)) {
//         setOpenMobile(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
//       ${
//         isScrolled
//           ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
//           : "bg-[#FF6347] py-4 md:py-6"
//       }`}
//     >
//       {/* Logo */}
//       <Link to={"/"}>
//         <img src={assets.logo} alt="logo" className="h-9" />
//       </Link>

//       {/* Desktop Nav */}
//       <div className="hidden md:flex items-center gap-4 lg:gap-8">
//         {navLinks.map((link, i) => (
//           <Link
//             key={i}
//             to={link.path}
//             className={`group flex flex-col gap-0.5 ${
//               isScrolled ? "text-gray-700" : "text-white"
//             }`}
//           >
//             {link.name}
//             <div
//               className={`${
//                 isScrolled ? "bg-gray-700" : "bg-white"
//               } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
//             />
//           </Link>
//         ))}

//         {/* ✅ Owner button (only if owner logged in) */}
//         {currentUser && currentUser.role === "owner" && (
//           <Link
//             to={"/owner"}
//             className={`cursor-pointer px-4 py-1.5 rounded-full transition-all duration-500 ${
//               isScrolled ? "border border-black text-black" : "border border-white text-white"
//             }`}
//           >
//             Dashboard
//           </Link>
//         )}
//       </div>

//       {/* Desktop Right */}
//       <div className="hidden md:flex items-center gap-4">
//         {currentUser ? (
//           <>
//             {/* ✅ User logged in (show profile) */}
//             {currentUser.role === "user" && (
//               <div className="relative inline-block" ref={desktopRef}>
//                 <img
//                   src={assets.profile_icon}
//                   alt=""
//                   className="w-12 h-12 rounded-full cursor-pointer"
//                   onClick={() => setOpenDesktop(!openDesktop)}
//                 />
//                 {openDesktop && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md transition duration-300 z-50">
//                     <ul className="py-2">
//                       <li>
//                         <Link
//                           to={"/my-bookings"}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={() => setOpenDesktop(false)}
//                         >
//                           My Bookings
//                         </Link>
//                       </li>
//                       <li>
//                         <button
//                           onClick={() => {
//                             LogoutHandler();
//                             setOpenDesktop(false);
//                           }}
//                           className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           LogOut
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ✅ Owner logged in (only logout button) */}
//             {currentUser.role === "owner" && (
//               <button
//                 onClick={LogoutHandler}
//                 className={`cursor-pointer px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
//                   isScrolled ? "text-white bg-black" : "bg-white text-black"
//                 }`}
//               >
//                 Logout
//               </button>
//             )}
//           </>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className={`cursor-pointer px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
//               isScrolled ? "text-white bg-black" : "bg-white text-black"
//             }`}
//           >
//             Login
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="flex items-center gap-3 md:hidden">
//         <svg
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//         >
//           <line x1="4" y1="6" x2="20" y2="6" />
//           <line x1="4" y1="12" x2="20" y2="12" />
//           <line x1="4" y1="18" x2="20" y2="18" />
//         </svg>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <button
//           className="absolute top-4 right-4"
//           onClick={() => setIsMenuOpen(false)}
//         >
//           <svg
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         </button>

//         {navLinks.map((link, i) => (
//           <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
//             {link.name}
//           </Link>
//         ))}

//         {/* ✅ Owner button for mobile */}
//         {currentUser && currentUser.role === "owner" && (
//           <Link
//             to={"/owner/dashboard"}
//             onClick={() => setIsMenuOpen(false)}
//             className="cursor-pointer px-6 py-2.5 rounded-full bg-black text-white"
//           >
//             Owner
//           </Link>
//         )}

//         {/* ✅ User menu for mobile */}
//         <div className="flex md:hidden items-center gap-4" ref={mobileRef}>
//           {currentUser ? (
//             <>
//               {currentUser.role === "user" && (
//                 <div className="relative inline-block">
//                   <img
//                     src={assets.profile_icon}
//                     alt=""
//                     className="w-12 h-12 rounded-full cursor-pointer"
//                     onClick={() => setOpenMobile(!openMobile)}
//                   />
//                   {openMobile && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md transition duration-300 z-50">
//                       <ul className="py-2">
//                         <li>
//                           <Link
//                             to={"/my-bookings"}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => {
//                               setOpenMobile(false);
//                               setIsMenuOpen(false);
//                             }}
//                           >
//                             My Bookings
//                           </Link>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => {
//                               LogoutHandler();
//                               setOpenMobile(false);
//                               setIsMenuOpen(false);
//                             }}
//                             className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             LogOut
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {currentUser.role === "owner" && (
//                 <button
//                   onClick={() => {
//                     LogoutHandler();
//                     setIsMenuOpen(false);
//                   }}
//                   className="cursor-pointer px-8 py-2.5 rounded-full bg-black text-white"
//                 >
//                   Logout
//                 </button>
//               )}
//             </>
//           ) : (
//             <button
//               onClick={() => {
//                 navigate("/login");
//                 setIsMenuOpen(false);
//               }}
//               className="cursor-pointer px-8 py-2.5 rounded-full bg-black text-white"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, currentUser, logout } = useContext(AppContext);

  const [openDesktop, setOpenDesktop] = useState(false);
  const desktopRef = useRef(null);

  const [openMobile, setOpenMobile] = useState(false);
  const mobileRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (desktopRef.current && !desktopRef.current.contains(e.target)) setOpenDesktop(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target)) setOpenMobile(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Rooms", path: "/rooms" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "bg-[#FF6347] py-4 md:py-6"
      }`}
    >
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" className="h-9" />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
            {link.name}
            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </Link>
        ))}

        {/* Owner dashboard button */}
        {currentUser && currentUser.role === "owner" && (
          <Link
            to={"/owner"}
            className={`cursor-pointer px-4 py-1.5 rounded-full transition-all duration-500 ${
              isScrolled ? "border border-black text-black" : "border border-white text-white"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Desktop right */}
      <div className="hidden md:flex items-center gap-4">
        {currentUser ? (
          <>
            {currentUser.role === "user" && (
              <div className="relative inline-block" ref={desktopRef}>
                <img
                  src={assets.profile_icon}
                  alt=""
                  className="w-12 h-12 rounded-full cursor-pointer"
                  onClick={() => setOpenDesktop(!openDesktop)}
                />
                {openDesktop && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md transition duration-300 z-50">
                    <ul className="py-2">
                      <li>
                        <Link to={"/my-bookings"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenDesktop(false)}>
                          My Bookings
                        </Link>
                      </li>
                      <li>
                        <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          LogOut
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {currentUser.role === "owner" && (
              <button onClick={logout} className={`cursor-pointer px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                Logout
              </button>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/login")} className={`cursor-pointer px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
            Login
          </button>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}

        {currentUser && currentUser.role === "owner" && (
          <Link to={"/owner/dashboard"} onClick={() => setIsMenuOpen(false)} className="cursor-pointer px-6 py-2.5 rounded-full bg-black text-white">
            Owner
          </Link>
        )}

        {currentUser && currentUser.role === "user" && (
          <div className="flex md:hidden items-center gap-4" ref={mobileRef}>
            <img src={assets.profile_icon} alt="" className="w-12 h-12 rounded-full cursor-pointer" onClick={() => setOpenMobile(!openMobile)} />
            {openMobile && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md transition duration-300 z-50">
                <ul className="py-2">
                  <li>
                    <Link to={"/my-bookings"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {!currentUser && (
          <button onClick={() => { navigate("/login"); setIsMenuOpen(false); }} className="cursor-pointer px-8 py-2.5 rounded-full bg-black text-white">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
