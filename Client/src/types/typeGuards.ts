import { CustomErrorResponse } from "../components/error/ErrorPage";

export function isCustomErrorResponse (obj: unknown): obj is CustomErrorResponse{
    if (obj) {
        return (
            typeof obj === 'object' &&
            'status' in obj && typeof obj.status === 'number' &&
            'statusText' in obj && typeof obj.statusText === 'string'
        );
    } else {
        return false
    }
}