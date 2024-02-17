import { Form } from "react-router-dom";
import InputForm from "./InputForm";
import ButtonPrimary from "./ButtonPrimary";

export default function RegisterForm() {
  return (
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
  );
}
