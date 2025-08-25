//  import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { hotelsData, roomsData } from "../assets/assets";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//     const navigate = useNavigate();

//     // Initialize state from localStorage if available
//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem("user");
//         return savedUser ? JSON.parse(savedUser) : null;
//     });

//     const [currentUser, setCurrentUser] = useState(null);

//     const [owner, setOwner] = useState(() => {
//         const savedOwner = localStorage.getItem("owner");
//         return savedOwner ? JSON.parse(savedOwner) : null;
//     });

//     const [hotelData, setHotelData] = useState([]);
//     const [roomData, setRoomData] = useState([]);

//     // Sync state → localStorage when changes
//     useEffect(() => {
//         if (user) {
//             localStorage.setItem("user", JSON.stringify(user));
//         } else {
//             localStorage.removeItem("user");
//         }
//     }, [user]);

//     useEffect(() => {
//         if (owner) {
//             localStorage.setItem("owner", JSON.stringify(owner));
//         } else {
//             localStorage.removeItem("owner");
//         }
//     }, [owner]);

//     // Static data (mock hotels/rooms)
//     const fetchHotelsData = () => setHotelData(hotelsData);
//     const fetchRoomsData = () => setRoomData(roomsData);

//     useEffect(() => {
//         fetchHotelsData();
//         fetchRoomsData();
//     }, []);

//     const logout = () => {
//         setUser(null);
//         setOwner(null);
//         localStorage.removeItem("user");
//         localStorage.removeItem("owner");
//         navigate("/login");
//     };

//     const value = {
//         navigate,
//         user,
//         setUser,
//         owner,
//         setOwner,
//         hotelData,
//         roomData,
//         axios,
//         logout,
//         currentUser,
//         setCurrentUser,
//     };

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     );
// };

// export default AppContextProvider;
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hotelsData, roomsData } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [currentUser, setCurrentUser] = useState(null);

    const [owner, setOwner] = useState(() => {
        const savedOwner = localStorage.getItem("owner");
        return savedOwner ? JSON.parse(savedOwner) : null;
    });

    const [hotelData, setHotelData] = useState([]);
    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    useEffect(() => {
        if (owner) localStorage.setItem("owner", JSON.stringify(owner));
        else localStorage.removeItem("owner");
    }, [owner]);

    const fetchHotelsData = async () => {
        try {
            const { data } = await axios.get("/api/hotel/get-all");
            if (data.success) {
                setHotelData(data.hotels);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch hotels");
        }
    }
    const fetchRoomsData = async () => {
        try {
            const { data } = await axios.get("/api/room/get-all");
            if (data.success) {
                setRoomData(data.rooms);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetchHotelsData();
        fetchRoomsData();
    }, []);

    // ✅ Fetch current user from /is-auth to persist login
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get("/api/user/is-auth");
                if (data.success && data.user) {
                    setCurrentUser(data.user);
                    if (data.user.role === "user") setUser(data.user);
                    if (data.user.role === "owner") setOwner(data.user);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setCurrentUser(null);
            }
        };
        checkAuth();
    }, []);

    const logout = () => {
        setUser(null);
        setOwner(null);
        setCurrentUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("owner");
        toast.success("logout Successfull")
        navigate("/login");
    };

    const value = {
        navigate,
        user,
        setUser,
        owner,
        setOwner,
        hotelData,
        roomData,
        axios,
        logout,
        currentUser,
        setCurrentUser,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
