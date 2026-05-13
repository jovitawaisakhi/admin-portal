import { useQuery } from "@tanstack/react-query"
import { Todo, TodoResponse } from "@/types/todo"
import { ToDoService } from "../service/todo-service"

export const useToDoQuery = () => {
    return useQuery<TodoResponse[], Error, Todo[]>({
        queryKey: ["todoList"],
        queryFn: ToDoService.getTodo,
        select: (data: TodoResponse[]) => {
        return data.map(
            (res): Todo => ({
            id: res.id,
            userId: res.userId,
            title: res.title,
            status: res.completed === false ? "Pending" : "Completed",
            })
        );
        },
        meta: {
            ERROR_MESSAGE: "Failed to fetch todo list!"
        }
    })
}