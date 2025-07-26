import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI, getUserData, register } from "@/api/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { login, logout, setUserData } from "@/state/reducers/authSlice";
import { useEffect } from "react";

interface RegisterDataProps {
  email: string,
  username: string,
  password: string,
  sex: string,
}

export const useAuthQuery = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);

  // 🔹 Logowanie - useMutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const token = await loginAPI(credentials);
      return token;
    },
    onSuccess: (token) => {
      dispatch(login({ token }));
      localStorage.setItem("token", token); // Zapis tokena do localStorage
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Odświeżenie danych użytkownika
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (registerData: RegisterDataProps) => {
      const response = await register(registerData);

      if (response.status === "success") {
        loginMutation.mutate({ email: registerData.email, password: registerData.password });
      } else {
        throw new Error(response.message || "Registration failed");
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });


  const userQuery = useQuery({
    queryKey: ["user", token],
    queryFn: async () => {
      if (!token) throw new Error("Brak tokena");
      const data = await getUserData(token);
      dispatch(setUserData(data)); // Aktualizacja Redux Store
      return data;
    },
    enabled: !!token, // Zapytanie tylko jeśli mamy token
    retry: false,
  });

  useEffect(() => {
    if (userQuery.error) {
      dispatch(logout());
      localStorage.removeItem("token"); // Czyszczenie tokena w razie błędu
    }
  }, [userQuery.error, dispatch]);

  return { loginMutation, userQuery, registerMutation };
};