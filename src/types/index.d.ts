export interface Rover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol?: number;
    max_date?: string;
    total_photos?: number;
    cameras?: Camera[];
}

interface Camera {
    id?: number;
    name: string;
    rover_id?: number;
    full_name: string;
}

export interface Photo {
    id: number;
    sol: number;
    camera: Camera
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface BotResponse {
    answer: string;
}

export interface Manifest {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
}

export interface FetchResponse<T> {
    success: boolean;
    message: string;
    results: T[];
}
