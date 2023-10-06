import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLight, CiDark } from "react-icons/ci";

import { TextInput, CustomButton } from "../components";

import "../App.css";

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
    <div className="flex">
      <div className="absolute right-10 top-5">
        <CiLight size={25} />
      </div>
      <section className="flex flex-1 bg-gray-100 min-h-screen">Right</section>
      <section className="flex flex-col flex-1 justify-center items-center gap-10">
        <span className="text-2xl font-bold">LOGIN</span>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="usename"
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

        <div className="flex gap-2">
          Don't have an acount?
          <span
            className="text-red-500 font-bold"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      </section>
    </div>
  );
};

export default Login;
