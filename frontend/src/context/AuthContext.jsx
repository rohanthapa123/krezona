import { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data?.token) {
            if (data?.result?.role) {
                setRole(data.result.role);
                setIsLoggedIn(true);
            }
        }
        setLoading(false);
    }, []);

    
    const logout = () => {
        localStorage.removeItem("data"); 
        setIsLoggedIn(false);
        setRole(null);
    };

    
    const authContextValue = {
        isLoggedIn,
        role,
        loading,
        logout,
        setRole,   
        setIsLoggedIn 
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};
