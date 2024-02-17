import { redirect } from "react-router-dom";

import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-4/6">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Register
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const registerBody = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
  };

  console.log(registerBody);
  return redirect("/login");
};
