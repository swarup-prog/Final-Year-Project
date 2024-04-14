import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { theme, customTheme } from "./utils/theme.js";

const myTheme = extendTheme(customTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ChakraProvider theme={myTheme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
