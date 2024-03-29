import { Form } from "react-router-dom";
import InputForm from "./InputForm";
import ButtonPrimary from "./ButtonPrimary";

export default function RegisterForm({onSubmit}) {
  return (
    <form
      method="post"
      id="register-form"
      className="w-5/6 flex flex-col justify-around space-y-4"
      onSubmit={onSubmit}
    >
      <InputForm
        id="username"
        name="username"
        placeholder="user"
        type="text"
      >
        Username
      </InputForm>
      <InputForm
        id="email"
        name="email"
        placeholder="qwerty@email.com"
        type="text"
      >
        Email
      </InputForm>
      <InputForm
        id="password"
        name="password"
        placeholder="********"
        type="password"
      >
        Password
      </InputForm>
      <ButtonPrimary customStyles="w-full mt-8" type="submit">
        Register
      </ButtonPrimary>
    </form>
  );
}
