import axios from "axios";
import { supabase } from "../supabase/supabase";


const CLIENT_API_URL: string = "http://localhost:8080/api/admin/client/add"
const CLIENTS_API_URL: string = "http://localhost:8080/api/admin/client"



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
        CLIENT_API_URL,
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
        CLIENTS_API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )


    return data;
}