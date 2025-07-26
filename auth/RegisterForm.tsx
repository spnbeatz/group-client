"use client"

import React, { useEffect, useState } from 'react';
import { Input } from "@heroui/input";
import { Visibility, VisibilityOff, Person, Mail, Key, Wc } from "@mui/icons-material";
import { inputIconSize } from '@/config/sizes';
import { Select, SelectItem } from "@heroui/select";
import { useAuthQuery } from '@/queries/useAuth';

interface User {
  email: string;
  username: string;
  password: string;
  sex: string;
  confirmPassword: string;
}

interface RegisterProps {
  setScreen: React.Dispatch<React.SetStateAction<string>>;

}


export const RegisterForm: React.FC<RegisterProps> = ({ setScreen }) => {

  const { loginMutation, registerMutation } = useAuthQuery();

  const [values, setValues] = useState<User>({
    email: '',
    username: '',
    password: '',
    sex: '',
    confirmPassword: ''
  });

  useEffect(() => {
    console.log(values, "values");
  }, [values])

  const [isVisible, setIsVisible] = useState<boolean>();

  const sexValues = [
    { key: "Man", value: "Man" },
    { key: "Woman", value: "Woman" },
    { key: "Other", value: "Other" },
  ]

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    type: "email" | "username" | "password" | "sex" | 'confirmPassword'
  ) => {
    const valueCopy = { ...values };
    valueCopy[`${type}`] = e.target.value;
    setValues(valueCopy);
  }

  const handleSubmit = async (values: User) => {
    try {
      const { confirmPassword, ...userData } = values;
      registerMutation.mutate(userData);
    } catch (error) {
      console.error("Error during registration or login:", error);
    }
  };


  const validate = (type: string, value: string) => {
    switch (type) {
      case "email":
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
      default:
        return null;
    }
  }

  return (
    <form className='form' onSubmit={async (e) => {
      e.preventDefault();
      await handleSubmit(values)
    }}>
      <p className='login-label'>
        Create Account
      </p>
      <p className='login-text'>
        Join groups that ignite your passion!
      </p>
      <Input
        isClearable
        startContent={<Mail className="text-default-400 pointer-events-none" style={{ width: inputIconSize }} />}
        onChange={(e) => onValueChange(e, "email")}
        placeholder='E-mail'
        type="email"
        variant="bordered"
        size='md'
        isInvalid={values.email === "" ? false : validate("email", values.email) ? false : true}
        errorMessage="Please enter a valid email"
      />
      <Input
        isClearable
        startContent={<Person className="text-default-400 pointer-events-none" style={{ width: inputIconSize }} />}
        onChange={(e) => onValueChange(e, "username")}
        placeholder='Username'
        type="text"
        variant="bordered"
        size='md'
      />

      <Input
        startContent={<Key className="text-default-400 pointer-events-none" style={{ width: inputIconSize }} />}
        type={isVisible ? "text" : "password"}
        onChange={(e) => onValueChange(e, "password")}
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
              <Visibility className="text-default-400 pointer-events-none" style={{ width: inputIconSize }} />
            ) : (
              <VisibilityOff className="text-sm text-default-400 pointer-events-none" style={{ width: inputIconSize }} />
            )}
          </button>
        }
      />
      <Input
        startContent={<Key className="text-default-400 pointer-events-none" style={{ width: inputIconSize }} />}
        type={isVisible ? "text" : "password"}
        onChange={(e) => onValueChange(e, "confirmPassword")}
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
              <Visibility className="text-default-400 pointer-events-none" style={{ width: '18px' }} />
            ) : (
              <VisibilityOff className="text-sm text-default-400 pointer-events-none" style={{ width: '18px' }} />
            )}
          </button>
        }
      />
      <Select
        variant='bordered'
        size='md'
        label="Select your sex"
        onChange={(e) => onValueChange(e, "sex")}
        startContent={<Wc className='text-default-400 pointer-events-none' style={{ width: inputIconSize }} />}
      >
        {sexValues.map((sex) => (
          <SelectItem key={sex.key}>{sex.value}</SelectItem>
        ))}
      </Select>
      <button
        type='submit'
        className='submit-button button'
      >Register</button>
      <button
        type='button'
        className='switch-button button'
        onClick={() => setScreen("login")}
      >
        Login
      </button>
    </form>
  )
}