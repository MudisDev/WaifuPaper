import { API_URL } from "../../url";

export const adaptarUrlImagen = (url: string): string => {
    if (url.includes("localhost")) {
        return url.replace("http://localhost", API_URL);
    }

    return url;
};