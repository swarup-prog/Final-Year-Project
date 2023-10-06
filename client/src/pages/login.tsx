import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, CustomButton } from "../components";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      <section className="flex flex-1 bg-gray-100 min-h-screen">Right</section>
      <section className="flex flex-col flex-1 justify-center items-center gap-10">
        <h1> LOGIN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={formData.email}
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
          Don't have an acoount?
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
