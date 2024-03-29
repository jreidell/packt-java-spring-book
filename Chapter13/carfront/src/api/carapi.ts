import axios from "axios";
import { Car, CarRepsonse } from "../Types";

export const addCar = async (car: Car): Promise<CarRepsonse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cars`, car, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getCars = async (): Promise<CarRepsonse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cars`);
    return response.data._embedded.cars;
}

export const deleteCar = async (link: string): Promise<CarRepsonse> => {
    const response = await axios.delete(link);
    return response.data;
}
