import axios from "axios"
import { supabase } from "../supabase/supabase";


const BASE_URL = import.meta.env.VITE_BASE_URL



export const addNewCar = async (newCar: {
    imageUrl: string,
    registrationNumber: string,
    brand: string,
    model: string,
    transmission: string,
    fuel: string,
    numberOfSeats: number,
    rentPrice: string,
    category: string,
    status: boolean
}) => {

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }


    const { data } = await axios.post(
        `${BASE_URL}/api/admin/cars/add`,
        newCar,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

    )

    return data;

}


export const getAllCars = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }


    const { data } = await axios.get(
        `${BASE_URL}/api/admin/cars`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )

    return data;
}


// this function to call api to delete a resource ( car)

export const deleteCarById = async (id: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const { data } = await axios.delete(
        `${BASE_URL}/api/admin/cars/${id}`
    )

    return data;
}