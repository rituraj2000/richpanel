import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    authorization: `Brearer ${localStorage.getItem("token")}`,
  },
});
