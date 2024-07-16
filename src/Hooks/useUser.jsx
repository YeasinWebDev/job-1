import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/ContextProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: userdata = [], isLoading: isUserLoading,refetch } = useQuery({
        queryKey: ['user',user?.email],
        queryFn: async () => {
            if(user === null) return []
            const response = await axiosSecure.get(`/user`, { params: { email: user?.email} });
            return response.data;
        }
    });
    return [userdata,refetch, isUserLoading]
}

export default useUser;