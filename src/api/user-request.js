const apiUrl = import.meta.env.VITE_BASE_URL;

function getUserDetail(token, id) {
  return {
    url: apiUrl + `user/detail/${id}`,
    config: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
  };
}

function changePassword(id, body, token) {
  return {
    url: apiUrl + `user/${id}`,
    config: {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

function getListUser(token) {
  return {
    url: apiUrl + "user",
    config: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
  };
}

export { getUserDetail, changePassword, getListUser };
