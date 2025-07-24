"use client"

import React, { useState, useEffect } from "react";

import "./index.css";
import "@/styles/globals.css";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const AuthScreen = () => {

    const [ screen, setScreen ] = useState<string>("login");

    return (
        <div className='containerl'>
          <div className='box w-full sm:w-1/2 md:w-1/2 lg:w-1/3 2xl:w-1/4'>
            <div className='side-box'>
                { screen == 'login' ? <LoginForm setScreen={setScreen}/> : <RegisterForm setScreen={setScreen}/> }
            </div>
  
          </div>
        </div>
  
      );
}

export default AuthScreen;