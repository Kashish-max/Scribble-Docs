import axios from "axios";

export async function fetchData(url, config) {
  try {
    const response = await axios.get(url, config)
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

export const Logout = async () => {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`, { withCredentials: true })
    .catch((err) => {
      console.log("Failed to Logout ", err);
    });

  if (response && response.data) {
    console.log("data: ", response.data);
  }
}