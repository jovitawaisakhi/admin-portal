import { useQuery } from "@tanstack/react-query"
import { StaffService } from "../service/staff-service"
import { StaffResponse } from "@/types/staff"

export const useAllStaffQuery = () => {
    return useQuery<StaffResponse[]>({
        queryKey: ["allStaff"],
        queryFn: StaffService.getAllStaff,
        meta: {
            ERROR_MESSAGE: "Failed to fetch all staff data!"
        }
    })
}