"use client"

import React, { useState } from 'react';
import { login } from '../api/user';
import { Button } from "@heroui/button";
import { inputIconSize } from '@/config/sizes';
import {Input} from "@heroui/input";
import {Visibility, VisibilityOff, Mail, Key} from "@mui/icons-material";

interface User {
  Email: string;
  Password: string;
}

interface LoginProps {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  login: (token: string, rememberMe: boolean) => void
}

export const LoginForm: React.FC<LoginProps> = ({ setScreen, login: setToken }) => {

    const [values, setValues] = useState<User>({
      Email: '',
      Password: ''
    });

    const [isVisible, setIsVisible] = useState<boolean>();
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(event.target.checked);
    };

    const onValueChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: "Email" | "Password"
    ) => {
      const valueCopy = {...values};
      valueCopy[`${type}`] = e.target.value;
      setValues(valueCopy);
    }
  
    const handleSubmit = async (values: User) => {
      const { ...userData } = values;
      console.log(userData, "userData login attempt");
    
      try {
        const token = await login(userData);
        console.log(token, "returned token from login attempt");
        if (token) {
          setToken(token, rememberMe);
          console.log('Dane do wysłania:', userData, "token ", token);
        } else {
          console.error("Login failed. Token not returned.");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    

    return (
      <form className='form' onSubmit={
        (e)=>{
          e.preventDefault();
          handleSubmit(values)
        }}>
        <p className='login-label'>
          Hello again!
        </p>
        <p className='login-text'>
          Join groups that ignite your passion!
        </p>
        <Input 
          startContent={<Mail className="text-default-400 pointer-events-none" style={{width: inputIconSize}}/>}
          isClearable
          onChange={(e) => onValueChange(e, "Email")}
          placeholder='E-mail'
          type="email"
          variant="bordered"
          size='md'
        />
        <Input 
          startContent={<Key className="text-default-400 pointer-events-none" style={{width: inputIconSize}}/>}
          type={isVisible ? "text" : "password"}
          onChange={(e) => onValueChange(e, "Password")}
          placeholder='Password'
          variant="bordered"
          size='md'
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Visibility className="text-default-400 pointer-events-none" style={{width: inputIconSize}}/>
              ) : (
                <VisibilityOff className="text-sm text-default-400 pointer-events-none" style={{width: inputIconSize}}/>
              )}
            </button>
          }
        />
        <div className='flex flex-row w-full justify-start items-center gap-2'>
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <p className='text-xs text-slate-500'>Stay logged in.</p>
        </div>
        <button
          type='submit'
          className='submit-button button'
        >Log in</button>
        <button 
          type='button'
          className='switch-button button'
          onClick={() => setScreen("register")}
        >
          Register
        </button>
        <button className='forgot-password-btn'>Forgot your password?</button>
      </form>
    )
}