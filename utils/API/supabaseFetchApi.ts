import { supabase } from "./supabase";

export const getData = async (table: string) => {
  try {
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      console.error(`Error fetching data from ${table}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
    return null;
  }
};

export const getSumTransaction = async (table: string) => {
  const { data, error } = await supabase.from(table).select("*");

  if (error) {
    console.error(`Error fetching data from ${table}:`, error.message);
    return null;
  }

  return data;
};

export const postData = async <T>(
  table: string,
  payload: T
): Promise<{ data: T[] | null; error: any }> => {
  const { data, error } = await supabase.from(table).insert(payload).select();
  return { data, error };
};
