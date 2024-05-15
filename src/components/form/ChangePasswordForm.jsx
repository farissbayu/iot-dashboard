import Button from "../ui/Button";
import Input from "../ui/Input";

export default function ChangePasswordForm({ onSubmit, loading }) {
  return (
    <form
      method="post"
      id="change-password-form"
      className="w-3/4 flex flex-col justify-around space-y-4"
      onSubmit={onSubmit}
    >
      <Input
        id="currentPassword"
        name="currentPassword"
        placeholder="********"
        type="password"
      >
        Current password
      </Input>
      <Input
        id="newPassword"
        name="newPassword"
        placeholder="********"
        type="password"
      >
        New password
      </Input>
      <Button
        customStyles="w-full text-base mt-4 bg-primary"
        type="submit"
        buttonType="primary"
      >
        {loading ? "Loading..." : "Change password"}
      </Button>
    </form>
  );
}
