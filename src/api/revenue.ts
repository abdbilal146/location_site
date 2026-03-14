import axios from "axios";
import { supabase } from "../supabase/supabase";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMonthlyRevenue = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const { data } = await axios.get(`${BASE_URL}/api/admin/revenue/monthly`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};
