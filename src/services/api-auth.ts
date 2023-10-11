import { supabaseADMIN, supabaseUSER, supabaseUrl } from "./supabase";

import { NO_OF_USERS_PER_PAGE } from "../utils/constants/page-size";
import { FieldValues } from "react-hook-form";

("./supabase");

export const Login = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabaseUSER.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabaseUSER.auth.getSession();
  if (!session.session) return null;

  const {
    data: { user }
  } = await supabaseUSER.auth.getUser();
  return user;
};
export const getAllUsers = async () => {
  const {
    data: { users },
    error
  } = await supabaseADMIN.auth.admin.listUsers({
    page: 1,
    perPage: NO_OF_USERS_PER_PAGE
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return users;
};

export const logoutUser = async () => {
  const { error } = await supabaseUSER.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const signUpUser = async (userSignUpData: FieldValues) => {
  const hasImagePath = userSignUpData.image?.startsWith?.(supabaseUrl);

  const avatarPath = hasImagePath
    ? userSignUpData.image
    : `${supabaseUrl}/storage/v1/object/public/users/${userSignUpData.avatar.name}`;

  const { data: userData, error } = await supabaseUSER.auth.signUp({
    email: userSignUpData.email,
    password: userSignUpData.password,
    options: {
      data: {
        fullName: userSignUpData.fullName,
        avatar: avatarPath,
        phone: userSignUpData.phone
      }
    }
  });
  console.log(userData);
  if (error) {
    throw new Error(error.message);
  }
  return userData;
};
export const updateUserMetaData = async (userMetaData: {
  fullName: string;
  avatar: string | Blob;
}) => {
  let hasImagePath;
  let avatarPath;
  if (typeof userMetaData.avatar === "string") {
    hasImagePath = userMetaData.avatar?.startsWith?.(supabaseUrl);
  } else {
    avatarPath = hasImagePath
      ? userMetaData.avatar
      : `${supabaseUrl}/storage/v1/object/public/users/${userMetaData.avatar.name}`;
  }

  const { data: metaData, error } = await supabaseUSER.auth.updateUser({
    data: {
      fullName: userMetaData.fullName,
      avatar: avatarPath
    }
  });

  console.log(metaData);
  if (error) {
    throw new Error(error.message);
  }
  return metaData;
};
export const uploadUserImage = async (file: Blob) => {
  const { data, error: storageError } = await supabaseUSER.storage
    .from("users")
    .upload(file.name, file);

  if (storageError) {
    throw new Error(storageError.message);
  }
  return data;
};
