import { Form } from "react-router-dom";
import InputForm from "./InputForm";
import ButtonPrimary from "./ButtonPrimary";

export default function ForgetPasswordForm() {
  return (
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
  );
}
