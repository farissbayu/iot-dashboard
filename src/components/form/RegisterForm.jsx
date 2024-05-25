/* eslint-disable react/prop-types */
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm({ onSubmit, loading }) {
  return (
    <form
      method="post"
      id="register-form"
      className="w-5/6 flex flex-col justify-around space-y-4"
      onSubmit={onSubmit}
    >
      <Input id="username" name="username" placeholder="user" type="text">
        Username
      </Input>
      <Input id="email" name="email" placeholder="qwerty@email.com" type="text">
        Email
      </Input>
      <Input
        id="password"
        name="password"
        placeholder="********"
        type="password"
      >
        Password
      </Input>
      <Button
        customStyles="w-full mt-8 bg-primary"
        type="submit"
        buttonType="primary"
      >
        {loading ? "Loading..." : "Register"}
      </Button>
    </form>
  );
}
