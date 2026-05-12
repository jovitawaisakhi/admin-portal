import axiosClient from "@/lib/axios-client";
import { TodoResponse } from "@/types/todo";

export const ToDoService = {
    getTodo: async (): Promise<TodoResponse[]> => {
        const response = await axiosClient.get<TodoResponse[]>(
            "/todos",
            {}
        )
        return response.data
    },
}