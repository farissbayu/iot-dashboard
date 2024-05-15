const apiUrl = import.meta.env.VITE_BASE_URL;

export function getUserDetail(token, id) {
  return {
    url: apiUrl + `user/detail/${id}`,
    config: {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
  };
}

export function changePassword(id, body) {
  return {
    url: apiUrl + `user/${id}`,
    config: {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
