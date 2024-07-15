import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <NavLink to="/" className="text-sm text-blue-700">
        <p>Back to home page</p>
      </NavLink>
    </div>
  );
}
