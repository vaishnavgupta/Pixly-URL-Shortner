import axios from "axios";

export const fetchTotalClicks = async (token, startDate, endDate) => {

  const backend_url = import.meta.env.VITE_BACKEND_SB_URL;

  try {
    const response = await axios.get(
      `${backend_url}/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data; // [{clickDate, count}, ...]
  } catch (error) {
    console.error("Error fetching total clicks:", error);
    throw error;
  }
};
