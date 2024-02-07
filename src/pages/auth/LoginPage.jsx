import InputForm from "../../components/InputForm";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import { NavLink, Form, redirect } from "react-router-dom";

export default function LoginPage() { 
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
          <Form method="post" id="login-form" className="w-full space-y-4">
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
            <ButtonPrimary customStyles="w-full" type="submit">
              Login
            </ButtonPrimary>
          </Form>
          <div
            id="divider"
            className="my-4 border-t border-formColor w-full"
          ></div>
          <NavLink to="/register">
            <ButtonSecondary type="button">Register</ButtonSecondary>
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

export const action = async ({ request }) => {
  const data = await request.formData();

  const loginBody = {
    email: data.get("email"),
    password: data.get("password"),
  };

  console.log(loginBody);
  return redirect("/");
};