/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth-request";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import RegisterForm from "../../components/form/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loading, data, sendRequest } = useApi();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registerBody = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      status: false,
    };

    const { url, config } = register(registerBody);

    try {
      await sendRequest(url, config);
    } catch (error) {
      console.log(error.message || "Failed to register.");
    }
  }

  useEffect(() => {
    if (data && data.status === "OK") {
      setRegisterSuccess(true);
    }
  });

  if (registerSuccess) {
    return (
      <div className="bg-pageBackground flex items-center justify-center h-screen">
        {/* Container */}
        <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-4/6">
          <h3 className="text-darkFont font-bold text-2xl mb-1 md:text-3xl mb-1">
            Register success.
          </h3>
          <h4 className="text-darkFont font-bold text-md mb-2">
            Check your email for activation!
          </h4>
          <button
            className="text-primary text-sm my-4 hover:underline"
            onClick={() => navigate("/login", { replace: true })}
          >
            Back to login page.
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-4/6">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Register
        </h1>
        <RegisterForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
