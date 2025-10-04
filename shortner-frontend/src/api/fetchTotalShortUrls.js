import axios from "axios";

export const fetchTotalShortUrls = async (token) => {
  const backend_url = import.meta.env.VITE_BACKEND_SB_URL;
  try {
    const response = await axios.get(
      `${backend_url}/api/urls/myurls`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data; // [originalUrl,shortUrl,clickCount,createdAt,username,tester]
  } catch (error) {
    console.error("Error fetching total urls:", error);
    throw error;
  }
};
