import axios from "axios";

const checkAuth = () => {
  /* Getting token value stored in local storage, 
  if token is not present then open login page */
  const TOKEN = localStorage.getItem("access-token");
  const PUBLIC_ROUTES = [
    "/login",
    "/login/admin",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

    return TOKEN;
  }
};

export default checkAuth;
