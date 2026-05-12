import axiosClient from "@/lib/axios-client";
import { Staff } from "@/types/staff";

export const StaffService = {
    getAllStaff: async (): Promise<Staff[]> => {
        const response = await axiosClient.get<Staff[]>(
            "/users",
            {}
        )
        return response.data
    },
}