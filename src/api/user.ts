import axios from "axios";
import { supabase } from "../supabase/supabase";


const BASE_URL = import.meta.env.VITE_BASE_URL

export const createUser = async (newUser: {
    name: string,
    familyName: string,
    phoneNumber: string
}) => {
    // Récupérer le JWT
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }

    // Envoyer le token dans Authorization header
    const { data } = await axios.post(
        `${BASE_URL}/api/user`,
        newUser,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return data;
};

export const getUserRole = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const { data } = await axios.post(
        `${BASE_URL}/api/user/role`,
        "",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )
    return data;
}