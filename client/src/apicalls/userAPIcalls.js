import { axiosInstance } from "./axiosInst";

export const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post("https://richpanel-backend-zy7p.onrender.com/api/users/login", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterUser = async (user) => {
  try {
    const response = await axiosInstance.post("https://richpanel-backend-zy7p.onrender.com/api/users/register", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("https://richpanel-backend-zy7p.onrender.com/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
