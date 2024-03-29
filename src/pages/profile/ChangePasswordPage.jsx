import React, { useEffect } from "react";
import { Form, useNavigate, redirect, useParams } from "react-router-dom";

import ButtonSecondary from "../../components/ButtonSecondary";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputForm from "../../components/InputForm";

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log(params);
  },[])

  return (
    <div className="bg-pageBackground h-screen flex">
      <div className="w-full mt-8 mx-8 flex flex-col">
        <ButtonSecondary
          customStyles="w-1/12 py-1"
          onClick={() => navigate(-1)}
        >
          {"<"} Back
        </ButtonSecondary>
        <div className="w-2/3 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-12 px-8 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Change Password</h1>
          <Form
            method="post"
            id="change-password-form"
            className="w-3/4 flex flex-col justify-around space-y-4"
          >
            <InputForm
              id="current-password"
              name="currentPassword"
              placeholderText="********"
              type="password"
            >
              Current password
            </InputForm>
            <InputForm
              id="new-password"
              name="newPassword"
              placeholderText="********"
              type="password"
            >
              New password
            </InputForm>
            <ButtonPrimary customStyles="w-full text-base mt-4" type="submit">
              Change password
            </ButtonPrimary>
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
