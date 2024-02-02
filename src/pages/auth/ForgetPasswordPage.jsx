import { Form, redirect } from "react-router-dom";
import InputForm from "../../components/InputForm";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function ForgetPasswordPage() {
  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-1/2">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Forget Password
        </h1>
        <Form
          method="post"
          id="forget-password-form"
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
          <ButtonPrimary customStyles="w-full mt-8" type="submit">
            Request
          </ButtonPrimary>
        </Form>
      </div>
    </div>
  );
}

export const forgetPasswordAction = async ({ request }) => {
  const data = await request.formData();

  const registerBody = {
    username: data.get("username"),
    email: data.get("email"),
  };

  console.log(registerBody);
  return redirect("/login");
};
