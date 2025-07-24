"use client";

import React, { useEffect } from "react";
import { useAuthQuery } from "@/queries/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import AuthScreen from "@/auth/Auth";
import { LoadingScreen } from "@/components/LoadingScreen";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { userQuery } = useAuthQuery(); // Pobieranie danych użytkownika
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        userQuery.refetch();
      }
    }
  }, [token, userQuery.refetch]);

  // 🔹 Obsługa stanów ładowania / błędu
  if (userQuery.isLoading) return <LoadingScreen />;
  if (!token) return <AuthScreen />;

  return <>{children}</>;
};

export default AuthWrapper;
