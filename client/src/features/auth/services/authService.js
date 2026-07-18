import api from "../../../api/axios.js";


export const registerUser = async (userData)=>{

const response =
await api.post(
"/auth/register",
userData
);

return response.data;
};


export const loginUser = async(userData)=>{
const response = await api.post("/auth/login",userData);
return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};