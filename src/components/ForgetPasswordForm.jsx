import { Form } from "react-router-dom";
import InputForm from "./InputForm";
import ButtonPrimary from "./ButtonPrimary";

export default function ForgetPasswordForm({onSubmit}) {
  return (
    <form
      method="post"
      id="forget-password-form"
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
      <ButtonPrimary customStyles="w-full mt-8" type="submit">
        Request
      </ButtonPrimary>
    </form>
  );
}
