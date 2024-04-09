import { jwtDecode } from "jwt-decode";

export const getUserRole = (token) => {
  const decoded = jwtDecode(token);
  return decoded.role;
};
