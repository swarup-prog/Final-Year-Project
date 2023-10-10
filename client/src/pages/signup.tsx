import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextInput, CustomButton, ThemeSwitchButton } from "../components";

import "../App.css";
import bgimg from "../assets/bgimg.jpg";
import { BiLogoGoogle } from "react-icons/bi";
import { toastError, toastLoading, toastSuccess } from "../utils/toast";

const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    toastLoading("Loading");
    toastError("Error");
    toastSuccess("Success");
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
      <section className="flex flex-col justify-center items-center gap-10 min-w-full min-h-screen bg-secondary lg:flex-1 p-5 lg:min-w-0 lg:ml-[50%] ">
        <ThemeSwitchButton />
        <span className="text-2xl text-primaryT font-bold">SIGNUP</span>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
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
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <CustomButton
            isDisabled={isLoading ? true : false}
            type="submit"
            title="Signup"
          />
        </form>

        <div className="flex gap-2 text-primaryT">
          Already have an acount?
          <span
            className="text-primary font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
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

export default Signup;
