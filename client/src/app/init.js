import axios from "axios";

const initializeApp = () => {
  // Setting base URL for all API requests via axios
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  if (!import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === "development") {
    console.log("Running in development mode");
  } else {
    // Production build code

    // Removing console.log from production build
    console.log = () => {};
  }
};

export default initializeApp;
