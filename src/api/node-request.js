const apiUrl = import.meta.env.VITE_BASE_URL;

export function getNodeList(token) {
  return {
    url: apiUrl + "node?limit=1",
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

export function getNodeDetail(token, nodeId) {
  return {
    url: apiUrl + `node/by/${nodeId}?limit=1`,
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
