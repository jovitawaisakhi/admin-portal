import axiosClient from "@/lib/axios-client";
import { StaffResponse } from "@/types/staff";

export const StaffService = {
    getAllStaff: async (): Promise<StaffResponse[]> => {
        const response = await axiosClient.get<StaffResponse[]>(
            "/users",
            {}
        )
        return response.data
    },
}