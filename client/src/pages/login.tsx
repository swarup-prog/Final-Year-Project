import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    return
  }

  return (
    <div className="flex">
      <section className="flex flex-1 bg-gray-100 min-h-screen">Right</section>
      <section className="flex flex-1">
        <h1> LOGIN</h1>
        <form style={styles.form} onSubmit={submitHandler}>
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={changeHandler}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={changeHandler}
          />
          <PrimaryButton type="submit" name="Login" />
        </form>

        <div style={{ display: "flex", gap: 8 }}>
          Don't have an acoount?
          <span style={styles.span} onClick={() => navigate("/signup")}>
            Signup
          </span>
        </div>
      </section>
    </div>
  );
};

export default Login;
