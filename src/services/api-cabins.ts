import { FieldValues } from "react-hook-form";
import supabase from "./supabase";
import { supabaseUrl } from "./url";

const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
};

const createCabin = async (cabinData: FieldValues) => {
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin/${cabinData.image.name}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }])
    .select();
  if (error) {
    throw new Error("Cabins could not be created");
  }
  return data;
};

const editCabin = async (cabinData: FieldValues, id: number) => {
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin/${cabinData.image.name}`;

  const { id: cabinId, created_at, ...editCabinData } = cabinData;
  const newCabinData = { ...editCabinData, image: imagePath };

  console.log(cabinId, created_at);

  const { data, error } = await supabase
    .from("cabins")
    .update(newCabinData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  // console.log(data);
  return data;
};
// Upload file using standard upload
const uploadCabinImage = async (file: Blob) => {
  const { data, error: storageError } = await supabase.storage
    .from("cabin")
    .upload(file.name, file);

  if (storageError) {
    throw new Error(storageError.message);
  }
  return data;
};

export { getCabins, deleteCabin, createCabin, uploadCabinImage, editCabin };
