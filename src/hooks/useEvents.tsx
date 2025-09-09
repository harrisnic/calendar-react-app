import APIClient from "../services/APIClient.ts";
import type {FetchResponse} from "../types";
import type {EventResponse} from "../types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<EventResponse>('');

const useEvents = () => {

    const { data, error, isLoading } = useQuery<FetchResponse<EventResponse>>({
        queryKey: ['events'],
        queryFn: apiClient.getAll,
        staleTime: 5 * 60 * 1000, // 5-minute caching
    })

    return {
        data: data?.results || [],
        error: error?.message,
        loading: isLoading
    };
};

export default useEvents();
