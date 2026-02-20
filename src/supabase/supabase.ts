import { createClient } from "@supabase/supabase-js"


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)




export const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) return

    return data.user?.id ?? null;
}


export const getUserData = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) return

    return data.user ?? null
}