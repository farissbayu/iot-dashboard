import InputForm from "../../components/InputForm";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
  function handleSubmit(e) {
    const navigate = useNavigate();
    
    navigate("/home");
  }
  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="bg-white w-5/6 h-5/6 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-8 md:justify-around md:flex-row">
        {/* Icon container */}
        <div id="icon-container">
          <h1 className="text-darkFont font-bold text-3xl md:text-4xl">
            IoT Dashboard
          </h1>
          <img
            src="../public/logo-ipb.png"
            className="w-[200px] h-[200px] mx-auto mt-4 md:w-[240px] md:h-[240px]"
          />
        </div>

        {/* Form container */}
        <div
          id="form-container"
          className="w-5/6 items-center flex flex-col md:w-[500px]"
        >
          <h1 className="text-darkFont font-bold text-3xl md:text-5xl mb-2">
            Login
          </h1>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <InputForm
              id="email"
              name="email"
              placeholderText="qwerty@email.com"
              type="text"
            >
              Email
            </InputForm>
            <InputForm
              id="password"
              name="password"
              placeholderText="********"
              type="password"
            >
              Password
            </InputForm>
            <NavLink
              to="/forget-password"
              className="text-primary hover:underline text-sm flex justify-end"
            >
              forget password?
            </NavLink>
            <ButtonPrimary customStyles="w-full" type="submit">Login</ButtonPrimary>
          </form>
          <div
            id="divider"
            className="my-4 border-t border-formColor w-full"
          ></div>
          <NavLink to="/register">
            <ButtonSecondary>Register</ButtonSecondary>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
