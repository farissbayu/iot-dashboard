import { useEffect } from "react";
import { Form, useNavigate, redirect, useParams } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log(params);
  },[])

  return (
    <div className="bg-pageBackground h-screen flex">
      <div className="w-full mt-8 mx-8 flex flex-col">
        <Button
          customStyles="w-1/12 py-1"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <div className="w-2/3 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-12 px-8 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Change Password</h1>
          <Form
            method="post"
            id="change-password-form"
            className="w-3/4 flex flex-col justify-around space-y-4"
          >
            <Input
              id="current-password"
              name="currentPassword"
              placeholder="********"
              type="password"
            >
              Current password
            </Input>
            <Input
              id="new-password"
              name="newPassword"
              placeholder="********"
              type="password"
            >
              New password
            </Input>
            <Button customStyles="w-full text-base mt-4" type="submit" buttonType="primary">
              Change password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const passwordBody = {
    currentPassword: data.get("currentPassword"),
    newPassword: data.get("newPassword"),
  };

  console.log(passwordBody);
  return redirect("/profile/:username");
};
