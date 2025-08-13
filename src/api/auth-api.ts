import axiosInstance from "@/lib/axios-instance";
import type { SignUpFormType } from "@/lib/types";
import axios from "axios";

export default async function signUp(formData: SignUpFormType) {
//   make an api call
  const options = {
    method: "post",
    baseURL: "/",
    headers: {
      "content-type": "application/json"
    },
    url: "/register",
    data: formData,
  };
//   const {data} = await axios.request(options);
  const {data} = await axiosInstance.post('register', formData)
  return data

// const authToken = 'seifToken4454'
// return  authToken

}
