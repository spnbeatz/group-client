"use client"

import React, { useState, useEffect } from "react";

import "./index.css";
import "@/styles/globals.css";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { LoadingScreen } from "@/components/LoadingScreen";

interface AuthProps {
    login: (token: string, rememberMe: boolean) => void,
    isAuthenticated: boolean
}
const AuthScreen: React.FC<AuthProps> = ({login, isAuthenticated}) => {

    const [ screen, setScreen ] = useState<string>("login");
/* 
    if(!isAuthenticated) return <LoadingScreen /> */

    return (
        <div className='containerl'>
          <div className='box w-full sm:w-1/2 md:w-1/2 lg:w-1/3 2xl:w-1/4'>
            <div className='side-box'>
                { screen == 'login' ? <LoginForm setScreen={setScreen} login={login} /> : <RegisterForm setScreen={setScreen} login={login}/> }
            </div>
  
          </div>
        </div>
  
      );
}

export default AuthScreen;