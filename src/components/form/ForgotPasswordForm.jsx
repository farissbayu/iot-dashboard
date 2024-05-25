/* eslint-disable react/prop-types */
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ForgotPasswordForm({ onSubmit, loading }) {
  return (
    <form
      method="post"
      id="forget-password-form"
      className="w-5/6 flex flex-col justify-around space-y-4"
      onSubmit={onSubmit}
    >
      <Input id="username" name="username" placeholder="John doe" type="text">
        Username
      </Input>
      <Input id="email" name="email" placeholder="qwerty@email.com" type="text">
        Email
      </Input>
      <Button
        customStyles="w-full mt-8 bg-primary"
        type="submit"
        buttonType="primary"
      >
        {loading ? "Loading..." : "Request"}
      </Button>
    </form>
  );
}
