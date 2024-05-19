const apiUrl = import.meta.env.VITE_BASE_URL;

function getNodeList(token) {
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

function getNodeDetail(token, nodeId) {
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

function createNode(token, nodeBody) {
  return {
    url: apiUrl + "node",
    config: {
      method: "POST",
      body: JSON.stringify(nodeBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      credentials: "include",
    },
  };
}

function deleteNode(token, nodeId) {
  return {
    url: apiUrl + `node/${nodeId}`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      credentials: "include",
    },
  };
}

export { getNodeDetail, getNodeList, createNode, deleteNode };
