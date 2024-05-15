const apiUrl = import.meta.env.VITE_BASE_URL;

export function getHardwareList(token) {
  return {
    url: apiUrl + "hardware",
    config: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    },
  };
}

export function getHardwareDetail(hardwareId, token) {
  return {
    url: apiUrl + `node/hardware/${hardwareId}`,
    config: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      credentials: "include"
    },
  };
}