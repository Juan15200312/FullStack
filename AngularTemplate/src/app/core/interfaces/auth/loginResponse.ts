import {UserResponse} from "../user/userResponse";

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: UserResponse;
        access_token: string;
        refresh_token: string;
    }
}