import { User } from "../models/user/User";

export const getUserInfo = async (req, res) => {
  const token = req.headers("Authorization");
  res.status(200).send(token);
};
