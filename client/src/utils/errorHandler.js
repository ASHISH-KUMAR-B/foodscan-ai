import toast from "react-hot-toast";

export const handleApiError = (error) => {
  const message = error?.response?.data?.message || "Something went wrong.";

  toast.error(message);
  console.error(error);
};