import { CustomButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Error = ({ error }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData);
  const userRole = user ? user.data.role : null;

  return (
    <div className="flex justify-center items-center h-screen px-4 bg-white place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-ternary">
          {error ? error : "We can't find that page."}
        </p>

        <CustomButton
          title={
            userRole === "user"
              ? "Go To Feed"
              : userRole === "admin"
              ? "Go To Dashboard"
              : "Go To Login"
          }
          className="mt-6"
          onClick={() =>
            navigate(
              userRole === "user"
                ? "/home"
                : userRole === "admin"
                ? "/dahboard"
                : "/login"
            )
          }
        />
      </div>
    </div>
  );
};

export default Error;
