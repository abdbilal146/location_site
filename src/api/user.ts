import axios from "axios";
import { supabase } from "../supabase/supabase";


const USER_API_URL: string = 'http://localhost:8080/api/user';

export const createUser = async (newUser: {
    uid: string,
    name: string,
    familyName: string,
    email: string,
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