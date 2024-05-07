import InputForm from "./ui/Input";
import Button from "./ui/Button";

export default function LoginForm({ onSubmit, loading }) {
  return (
    <form id="login-form" className="w-full space-y-4" onSubmit={onSubmit}>
      <InputForm
        id="username"
        name="username"
        placeholder="John Doe"
        type="text"
      >
        Username
      </InputForm>
      <InputForm
        id="password"
        name="password"
        placeholder="********"
        type="password"
      >
        Password
      </InputForm>
      <Button customStyles="w-full" type="submit" buttonType="primary">
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
