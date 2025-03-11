"use client"

import React, { createContext, useState, useEffect, ReactNode, useContext, use } from 'react';
import AuthScreen from '@/auth/Auth';
import { getUserData } from '@/api/user';
import { LoadingScreen } from '@/components/LoadingScreen';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  userData: UserDataProps | null,
  token: string | null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface UserDataProps {
  id: string,
  email: string,
  username: string,
  sex: string,
  avatar: string,
  status: string,
  followers: string[] | null,
  followings: string[] | null
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [rememberAccount, setRememberAccount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const rememberValue = localStorage.getItem('rememberAccount');
  
    if (rememberValue === 'y' && storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      logout(); // Upewnij się, że stan jest spójny
    }
  }, []);

  

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try{
          const data = await getUserData(token);  // Poczekaj na wynik fetch
          setUserData(data);  // Teraz ustaw wynik w stanie
        } catch(error){
          logout();
          console.log(error);
        }

      } else {
        setUserData(null);  // W przeciwnym razie ustaw null
      }
    }
  
    fetchData();  // Wywołanie funkcji asynchronicznej
  }, [isAuthenticated]);

  useEffect(() => {
    const rememberValue = localStorage.getItem("rememberAccount");
    if(rememberValue == "y"){
      setRememberAccount(true)
    } else {
      setRememberAccount(false);
    }
  },[])

  useEffect(() => {
    if(userData) console.log("userData: \n", userData);
  },[userData])

  const login = (token: string, rememberMe: boolean) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('rememberAccount', rememberMe ? 'y' : 'n');
    setToken(token);
    setRememberAccount(rememberMe);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rememberAccount');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData, token }}>
      {!isAuthenticated ? <AuthScreen login={login} isAuthenticated={isAuthenticated}/> : children }

    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
export { AuthContext, AuthProvider };
