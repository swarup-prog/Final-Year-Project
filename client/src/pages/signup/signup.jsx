import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextInput, CustomButton, ThemeSwitchButton } from "../../components";

import "../../App.css";
import bgimg from "../../assets/bgimg.jpg";
import { BiLogoGoogle } from "react-icons/bi";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostRequest } from "../../services/httpRequest";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPasswordMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      toastError("Password did not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const { confirmPassword, ...formDataRequest } = formData;
    if (checkPasswordMatch()) {
      try {
        const response = await PostRequest("/auth/register", formDataRequest);
        if (response.status === 201) {
          toastSuccess(response.data.message);
          navigate("/login");
        }
        console.log("response", response);
      } catch (error) {
        toastError(error.response.data.message);
      }

      // setIsLoading(false);
    }
  };

  const handleGogoleAuth = () => {
    let res = window.open(
      `${import.meta.env.VITE_API_URL}/auth/google/callback`,
      "_self"
    );
    console.log(res);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section
        className=" hidden  flex-1 bg-primary min-h-screen lg:flex"
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
      <section className="flex flex-col justify-center items-center gap-10 min-w-full min-h-screen bg-primary lg:flex-1 p-5 lg:min-w-0 lg:ml-[50%] ">
        <ThemeSwitchButton />
        <span className="text-2xl text-secondary font-bold">SIGNUP</span>
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
            // isDisabled={isLoading ? true : false}
            type="submit"
            title="Signup"
          />
        </form>

        <div className="flex gap-2 text-secondary">
          Already have an acount?
          <span
            className="text-accent font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
        <div className="text-secondary divider divider-accent px-40">OR</div>
        <CustomButton
          onClick={handleGogoleAuth}
          title="Sign in with Google"
          icon={<BiLogoGoogle size={25} />}
        />
      </section>
    </div>
  );
};

export default Signup;
