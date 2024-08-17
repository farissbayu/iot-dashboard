import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../store/AuthProvider";
import { login } from "../../api/auth-request";

import LoginForm from "../../components/form/LoginForm";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { loading, data, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const loginBody = { username, password };
    const { url, config } = login(loginBody);

    try {
      await sendRequest(url, config);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function handleNavigate(type) {
    switch (type) {
      case "register":
        navigate("/register");
        break;
      case "forgot-password":
        navigate("/forgot-password");
        break;
    }
  }

  useEffect(() => {
    if (data.code === 200) {
      const { token, username, id_user, is_admin } = data.data;
      const userData = {
        username,
        userId: id_user,
        isAdmin: is_admin,
      };
      auth.setUserData(token, userData);
      navigate("/", { replace: true });
    }
  }, [auth, data, navigate]);

  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      <div className="container bg-white w-5/6 h-7/8 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-8 lg:justify-around lg:flex-row lg:h-5/6">
        <div id="icon-container">
          <h1 className="text-darkFont font-bold text-3xl text-center mt-4 lg:mt-0 lg:text-4xl">
            IoT Dashboard
          </h1>
          <img
            src="/logo-ipb.png"
            className="w-1/3 mx-auto mt-4 lg:w-[240px] lg:h-[240px]"
          />
        </div>
        <div
          id="form-container"
          className="w-5/6 items-center flex flex-col lg:w-[500px]"
        >
          <h1 className="text-darkFont font-bold text-3xl lg:text-5xl mb-2">
            Login
          </h1>
          <LoginForm onSubmit={handleSubmit} loading={loading} />
          {(error || (data.code === 400 && !loading)) && (
            <p className="my-2 text-red-500">
              {data.message || "Login failed. Please try again"}
            </p>
          )}
          <hr id="divider" className="my-4 border-t border-formColor w-full" />
          <Button
            type="button"
            customStyles="px-16 border-secondary"
            buttonType="secondary"
            onClick={() => handleNavigate("register")}
          >
            Register
          </Button>
          <button
            className="text-primary text-sm my-4 hover:underline"
            onClick={() => handleNavigate("forgot-password")}
          >
            forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
