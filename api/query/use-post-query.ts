import { useQuery } from "@tanstack/react-query"
import { PostResponse } from "@/types/post"
import { PostService } from "../service/post-service"

export const usePostQuery = () => {
    return useQuery<PostResponse[]>({
        queryKey: ["post"],
        queryFn: PostService.getPost,
        meta: {
            ERROR_MESSAGE: "Failed to fetch post data!"
        }
    })
}