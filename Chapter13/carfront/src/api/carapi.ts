import axios from "axios";
import { CarRepsonse } from "../Types";

export const getCars = async (): Promise<CarRepsonse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cars`);
    return response.data._embedded.cars;
}
