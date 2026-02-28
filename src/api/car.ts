import axios from "axios"
import { supabase } from "../supabase/supabase";



const CAR_API_URL: string = "http://localhost:8080/api/admin/cars/add"
const CARS_API_URL: string = "http://localhost:8080/api/admin/cars"


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
        CAR_API_URL,
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
        CARS_API_URL,
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
        `${CARS_API_URL}/${id}`
    )

    return data;
}