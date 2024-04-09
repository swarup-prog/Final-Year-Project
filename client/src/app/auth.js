import axios from "axios";
import { getUserRole } from "../services";

const checkAuth = () => {
  /* Getting token value stored in local storage, 
  if token is not present then open login page */
  const TOKEN = localStorage.getItem("session-token");
  const PUBLIC_ROUTES = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return { TOKEN: "", route: "" };
  } else if (TOKEN) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
    const role = getUserRole(TOKEN);

    return TOKEN;
  }
};

export default checkAuth;
