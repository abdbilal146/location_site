import axios from "axios"
import { supabase } from "../supabase/supabase";


const BASE_URL = import.meta.env.VITE_BASE_URL


export const addReservation = async (
    newReservation: {
        clientId: number,
        carId: number,
        startDate: string,
        endDate: string,
        reservationStatus: string
    }
) => {

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const { data } = await axios.post(
        `${BASE_URL}/api/admin/reservation/add/${newReservation.clientId}/${newReservation.carId}`,
        {
            startDate: newReservation.startDate,
            endDate: newReservation.endDate,
            reservationStatus: newReservation.reservationStatus
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )

    return data;
}