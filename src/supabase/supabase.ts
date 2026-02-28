import { createClient } from "@supabase/supabase-js"


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: {
            getItem: (key) => {
                if (window.sessionStorage.getItem(key)) {
                    return window.sessionStorage.getItem(key);
                }
                return window.localStorage.getItem(key);
            },
            setItem: (key, value) => {
                const rememberMe = window.localStorage.getItem('rememberMe') === 'true';
                if (rememberMe) {
                    window.localStorage.setItem(key, value);
                    window.sessionStorage.removeItem(key);
                } else {
                    window.sessionStorage.setItem(key, value);
                    window.localStorage.removeItem(key);
                }
            },
            removeItem: (key) => {
                window.localStorage.removeItem(key);
                window.sessionStorage.removeItem(key);
            }
        },
        persistSession: true
    }
})




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