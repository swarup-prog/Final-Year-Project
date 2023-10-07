import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextInput, CustomButton, ThemeSwitchButton } from "../components";

import "../App.css";
import bgimg from "../assets/bgimg.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLogoGoogle } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    return;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ThemeSwitchButton />

      <section
        className=" hidden flex flex-1 bg-secondary min-h-screen lg:block"
        style={{
          background: `url(${bgimg})`,
          backgroundPosition: "center",
          backdropFilter: "blur(100px)",
        }}
      ></section>
      <section className="flex flex-col justify-center items-center gap-10 min-w-full min-h-screen bg-secondary lg:flex-1 lg:min-w-0 ">
        <span className="text-2xl text-primaryT font-bold">LOGIN</span>
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
          <CustomButton type="submit" title="Login" />
        </form>
        <div className="text-primary hover:underline cursor-pointer">
          Forgot Password?
        </div>
        <div className="flex gap-2 text-primaryT">
          Don't have an acount?
          <span
            className="text-primary font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
        <div className="text-primaryT">OR</div>
        <CustomButton
          title="Sign in with Google"
          icon={<BiLogoGoogle size={25} />}
        />
      </section>
    </div>
  );
};

export default Login;
