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

function getUserList(token) {
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

function deleteUser(token, userId) {
  return {
    url: apiUrl + `user/${userId}`,
    config: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    },
  };
}

export { getUserDetail, changePassword, getUserList, deleteUser };
