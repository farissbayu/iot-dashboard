import ForgetPasswordForm from "../../components/ForgetPasswordForm";
import { forgetPassword } from "../../api/auth-requests";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const forgetPasswordBody = {
      username: formData.get('username'),
      email: formData.get('email'),
    }

    try {
      const message = await forgetPassword(forgetPasswordBody);
      console.log(message);
      navigate('/login', {replace: true});
    } catch (error) {
      console.log(error.message || "Failed to request new password.");
    }
  }

  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-1/2">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Forget Password
        </h1>
        <ForgetPasswordForm onSubmit={handleSubmit}/>
      </div>
    </div>
  );
}
