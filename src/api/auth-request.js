const apiUrl = import.meta.env.VITE_BASE_URL;

export function login(body) {
  return {
    url: apiUrl + "user/login",
    config: {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function register(body) {
  return {
    url: apiUrl + "user/register?send_email=true",
    config: {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function forgotPassword(body) {
  return {
    url: apiUrl + "user/forgot-password",
    config: {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}
