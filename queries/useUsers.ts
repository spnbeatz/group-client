import { useQuery } from "@tanstack/react-query";
import { getMinUserData } from "@/api/user";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export const userBasicQuery = (userId: string) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return useQuery({
        queryKey: ["user-basic", userId],
        queryFn: async () => {
            if (!token) throw new Error("Brak tokena");
            const user = await getMinUserData(userId, token);
            return user || null;
        }
    })
}