import axios, { AxiosRequestConfig } from "axios";
import { Car, CarEntry, CarResponse } from "../Types";

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };
};

export const addCar = async (car: Car): Promise<CarResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cars`, car, getAxiosConfig());

    return response.data;
}

export const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cars`, getAxiosConfig());
    return response.data._embedded.cars;
}

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
    const response = await axios.put(carEntry.url, carEntry.car, getAxiosConfig());

    return response.data;
}

export const deleteCar = async (link: string): Promise<CarResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data;
}
