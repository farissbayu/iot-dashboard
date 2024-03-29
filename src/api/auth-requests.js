const apiUrl = 'http://localhost:8080/api/v1/';

export async function forgetPassword(forgetPasswordBody) {
  const response = await fetch(apiUrl + "user/forgot-password", {
    method: "POST",
    body: JSON.stringify(forgetPasswordBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to request new password.');
  }

  return {message: "Success request new password. Check your email!"};
}

export async function register(registerBody) {
  const response = await fetch(apiUrl + "user/register?send_email=true", {
    method: "POST",
    body: JSON.stringify(registerBody),
    headers: {
      "Content-Type": "application/json",
    }
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to register.');
  }

  return {message: "Register successfull. Check your email to activate your account."};
}