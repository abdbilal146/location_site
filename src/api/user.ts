import axios from "axios";
import { supabase } from "../supabase/supabase";


const USER_API_URL: string = 'http://localhost:8080/api/user';
const USER_API_ROLE_URL: string = 'http://localhost:8080/api/user/role'

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
        USER_API_URL,
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
        USER_API_ROLE_URL,
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