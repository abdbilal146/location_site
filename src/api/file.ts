import axios from "axios";
import { supabase } from "../supabase/supabase";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addNewIdentityFile = async (file: {
  clientId: number;
  originalName: string;
  contentType: string;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const { data } = await axios.post(
    `${BASE_URL}/api/admin/identity/add`,
    file,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return data;
};
