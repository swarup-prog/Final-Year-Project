import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextInput, CustomButton, ThemeSwitchButton } from "../../components";

import "../../App.css";
import bgimg from "../../assets/bgimg.jpg";
import { BiLogoGoogle } from "react-icons/bi";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostRequest } from "../../services/httpRequest";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostRequest("/auth/login", formData);
      if (response.status === 200) {
        toastSuccess(response.data.message);
        localStorage.setItem("session-token", response.data.token);
        navigate("/home");
      }
      console.log("response", response);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section
        className=" hidden  flex-1 bg-secondary min-h-screen lg:flex"
        style={{
          background: `url(${bgimg})`,
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
        }}
      ></section>
      <section className="flex flex-col justify-center items-center gap-10 min-w-full min-h-screen bg-primary lg:flex-1 lg:min-w-0 p-5 lg:ml-[50%] ">
        <ThemeSwitchButton />
        <span className="text-2xl text-secondary font-bold">LOGIN</span>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <CustomButton
            // isDisabled={isLoading ? true : false}
            type="submit"
            title="Login"
          />
        </form>
        <div className="text-accent hover:underline cursor-pointer">
          Forgot Password?
        </div>
        <div className="flex gap-2 text-secondary">
          Don't have an acount?
          <span
            className="text-accent font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
        <div className="text-secondary divider divider-accent px-40">OR</div>
        <CustomButton
          title="Sign in with Google"
          icon={<BiLogoGoogle size={25} />}
        />
      </section>
    </div>
  );
};

export default Login;