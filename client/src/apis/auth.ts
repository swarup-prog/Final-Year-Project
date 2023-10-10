import { UserData } from "../types";

export const register = async({username, password}: UserData) => {
  const port = import.meta.env.VITE_API_URL
  console.log(port)
  console.log(port);
  console.log({ username, password});
};

export const login = async({username, password}: UserData) => {
  console.log({username, password})
};