import { Staff } from "@/types/staff"
import { useQuery } from "@tanstack/react-query"
import { StaffService } from "../service/staff-service"

export const useAllStaffQuery = () => {
    return useQuery<Staff[]>({
        queryKey: ["allStaff"],
        queryFn: StaffService.getAllStaff,
        meta: {
            ERROR_MESSAGE: "Failed to fetch all staff data!"
        }
    })
}