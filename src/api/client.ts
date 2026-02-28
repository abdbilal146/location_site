import axios from "axios";
import { supabase } from "../supabase/supabase";


const BASE_URL = import.meta.env.VITE_BASE_URL


export const addNewClient = async (newClient: {
    fullName: string,
    email: string,
    phoneNumber: string,
    address: {
        address: string,
        city: string,
        postalCode: string
    },
    accountStatus: boolean
}) => {

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }


    const { data } = await axios.post(
        `${BASE_URL}api/admin/client/add`,
        newClient,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )

    return data;
}


export const getAllClients = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }


    const { data } = await axios.get(
        `${BASE_URL}api/admin/client`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )


    return data;
}