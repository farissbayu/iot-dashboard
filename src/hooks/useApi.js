import { useState } from "react";

export default function useApi(initialData) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);

  const sendRequest = async function sendRequest(url, config = {}) {
    setLoading(true);
    try {
      const res = await sendHttpRequest(url, config);
      const data = res;
      setData(data);
    } catch (error) {
      setError("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, sendRequest };
}

async function sendHttpRequest(url, config) {
  try {
    const response = await fetch(url, config);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || "Something went wrong.");
    }
    return json;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
