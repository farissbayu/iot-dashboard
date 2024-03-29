import InputForm from "./InputForm";
import ButtonPrimary from "./ButtonPrimary";

export default function LoginForm({ onSubmit }) {
  return (
    <form id="login-form" className="w-full space-y-4" onSubmit={onSubmit}>
      <InputForm
        id="username"
        name="username"
        placeholder="John Doe"
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
      <ButtonPrimary customStyles="w-full" type="submit">
        Login
      </ButtonPrimary>
    </form>
  );
}
