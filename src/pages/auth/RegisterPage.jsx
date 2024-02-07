import { Form, redirect } from "react-router-dom";
import InputForm from "../../components/InputForm";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function RegisterPage() {
  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-4/6">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Register
        </h1>
        <Form
          method="post"
          id="register-form"
          className="w-5/6 flex flex-col justify-around"
        >
          <InputForm
            id="username"
            name="username"
            placeholderText="user"
            type="text"
          >
            Username
          </InputForm>
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
          <ButtonPrimary customStyles="w-full mt-8" type="submit">
            Register
          </ButtonPrimary>
        </Form>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const registerBody = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
  };

  console.log(registerBody);
  return redirect("/login");
};
