import { redirect } from "react-router-dom";
import ForgetPasswordForm from "../../components/ForgetPasswordForm";

export default function ForgetPasswordPage() {
  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-1/2">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Forget Password
        </h1>
        <ForgetPasswordForm />
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const registerBody = {
    username: data.get("username"),
    email: data.get("email"),
  };

  console.log(registerBody);
  return redirect("/login");
};
