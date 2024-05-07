import { useState } from "react";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = async function sendRequest(url, config = {}) {
    setLoading(true);
    try {
      const response = await sendHttpRequest(url, config);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, sendRequest };
}

async function sendHttpRequest(url, config) {
  let response = {};
  try {
    response = await fetch(url, config);
    return response;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
