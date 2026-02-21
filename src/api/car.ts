import axios from "axios"
import { supabase } from "../supabase/supabase";



const CAR_API_URL: string = "http://localhost:8080/api/admin/cars/add"


export const addNewCar = async (newCar: { imageUrl: string, registrationNumber: string, brand: string, model: string, transmission: string, fuel: string, numberOfSeats: number, rentPrice: string }) => {

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