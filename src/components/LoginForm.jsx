import { Form } from "react-router-dom";
import InputForm from "./InputForm";
import ButtonPrimary from "./ButtonPrimary";

export default function LoginForm() {
  return (
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
  );
}
