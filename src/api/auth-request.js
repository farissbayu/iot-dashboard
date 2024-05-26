const apiUrl = import.meta.env.VITE_BASE_URL;

function login(body) {
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

function register(body) {
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

function forgotPassword(body) {
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

export { login, register, forgotPassword };
