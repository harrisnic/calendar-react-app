import APIClient from "../services/APIClient.ts";
import type {APIResponse} from "../services/APIClient.ts";
import type {CalendarEvent, CalendarEventResponse} from "../types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<CalendarEventResponse>;

const useGetEvents = () => {

    const { data, error, isLoading } = useQuery<APIResponse<CalendarEvent>>({
        queryKey: ['events'],
        queryFn: apiClient.getAll,
        staleTime: 5 * 60 * 1000, // 5-minute caching
    })

    return {
        data: data?.value || [],
        error: error?.message,
        isLoading
    };
};


export default useGetEvents;
