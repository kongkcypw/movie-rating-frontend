// UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { axiosInstance } from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface User {
    userId: string;
    username: string;
    email: string;
    role: string;
    permissionLevel: number;
}

interface UserContextProps {
    user: User | null;
    fetchUserInfo: () => void;
    isFetchLoading: boolean | null;
    logout: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [isFetchLoading, setIsFetchLoading] = useState<boolean | null>(null)

    const fetchUserInfo = async () => {
        try {
            setIsFetchLoading(true)
            const response = await axiosInstance.get('/api/profile/get-info', {
                withCredentials: true, 
            });
            if (response.status === 200) {
                setUser(response.data);
                setIsFetchLoading(false)
            } else {
                setUser(null);
                setIsFetchLoading(false)
            }
        } catch (error) {
            setUser(null);
            setIsFetchLoading(false)
        }
    };

    const logout = async () => {
        try{
            const response = await axiosInstance.get('/api/auth/logout', {
                withCredentials: true, 
            });
            if (response.status === 200) {
                navigate("/");
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        user, 
        fetchUserInfo,
        isFetchLoading,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
