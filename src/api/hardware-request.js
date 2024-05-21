const apiUrl = import.meta.env.VITE_BASE_URL;

function getHardwareList(token) {
  return {
    url: apiUrl + "hardware",
    config: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  };
}

function getHardwareDetail(hardwareId, token) {
  return {
    url: apiUrl + `node/hardware/${hardwareId}`,
    config: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    },
  };
}

function createHardware(token, hardwareBody) {
  return {
    url: apiUrl + "hardware",
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(hardwareBody),
    },
    credentials: "include",
  };
}

export { getHardwareList, getHardwareDetail, createHardware };
