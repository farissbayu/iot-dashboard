import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/form/ForgotPasswordForm";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { forgotPassword } from "../../api/auth-request";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { loading, data, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });
  const [requestPasswordSuccess, setRequestPasswordSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const forgetPasswordBody = {
      username: formData.get("username"),
      email: formData.get("email"),
    };

    const { url, config } = forgotPassword(forgetPasswordBody);

    try {
      await sendRequest(url, config);
    } catch (error) {
      console.log(error.message || "Failed to request new password.");
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data && data.code === 200) {
      setRequestPasswordSuccess(true);
    }
  });

  let content = (
    <>
      <h1 className="text-darkFont font-bold text-3xl mb-2 md:text-5xl mb-4">
        Forget Password
      </h1>
      <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
      {(error || data.code === 400) && !loading && (
        <p className="my-2 text-red-500">
          {data.message || "Forgot password failed. Please try again"}
        </p>
      )}
    </>
  );

  if (requestPasswordSuccess) {
    content = (
      <>
        <h3 className="text-darkFont font-bold text-2xl mb-1 md:text-3xl mb-2">
          Forgot password success.
        </h3>
        <h4 className="text-darkFont text-md mb-2">
          Here is your new password: {data.data.newPassword || ""}
        </h4>
        <button
          className="text-primary text-sm my-4 hover:underline"
          onClick={() => navigate("/login", { replace: true })}
        >
          Back to login page.
        </button>
      </>
    );
  }

  return (
    <div className="bg-pageBackground flex items-center justify-center h-screen">
      {/* Container */}
      <div className="container bg-white w-5/6 h-4/6 rounded-2xl shadow-md flex flex-col justify-center items-center md:w-3/6 md:h-1/2">
        {content}
      </div>
    </div>
  );
}
