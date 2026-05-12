import axiosClient from "@/lib/axios-client";
import { PostResponse } from "@/types/post";

export const PostService = {
    getPost: async (): Promise<PostResponse[]> => {
        const response = await axiosClient.get<PostResponse[]>(
            "/posts",
            {}
        )
        return response.data
    },
}