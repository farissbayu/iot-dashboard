import ButtonSecondary from "../../components/ButtonSecondary";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginBody = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const message = await auth.login(loginBody);
      console.log(message);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.message || "Failed to login.");
    }
  }

  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-7/8 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-8 lg:justify-around lg:flex-row lg:h-5/6">
        {/* Icon container */}
        <div id="icon-container">
          <h1 className="text-darkFont font-bold text-3xl text-center mt-4 lg:mt-0 lg:text-4xl">
            IoT Dashboard
          </h1>
          <img
            src="../public/logo-ipb.png"
            className="w-1/3 mx-auto mt-4 lg:w-[240px] lg:h-[240px]"
          />
        </div>

        {/* Form container */}
        <div
          id="form-container"
          className="w-5/6 items-center flex flex-col lg:w-[500px]"
        >
          <h1 className="text-darkFont font-bold text-3xl lg:text-5xl mb-2">
            Login
          </h1>
          <LoginForm onSubmit={handleSubmit} />

          <hr id="divider" className="my-4 border-t border-formColor w-full" />

          {/* TODO: Ubah ke button biasa, tanpa navlink */}
          <NavLink to="/register">
            <ButtonSecondary type="button" customStyles="px-16">
              Register
            </ButtonSecondary>
          </NavLink>
          <NavLink
            to="/forget-password"
            className="text-primary text-sm my-4 hover:underline"
          >
            forget password?
          </NavLink>
        </div>
      </div>
    </div>
  );
}
