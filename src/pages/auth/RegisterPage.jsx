import { redirect, useNavigate } from "react-router-dom";

import RegisterForm from "../../components/RegisterForm";
import { register } from "../../api/auth-requests";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registerBody = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      status: false
    };

    try {
      const message = await register(registerBody)
      console.log(message);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error.message || "Failed to register.");
    }
  }

  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-4/6">
        <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
          Register
        </h1>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
