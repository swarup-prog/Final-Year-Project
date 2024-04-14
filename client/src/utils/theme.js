import { extendTheme } from "@chakra-ui/react";

const themeColor = localStorage.getItem("chakra-ui-color-mode") || "light";

const config = {
  initialColorMode: themeColor,
  useSystemColorMode: false,
};

// Define your colors here without using hooks
const colors = {
  light: {
    primary: "#ffffff",
    secondary: "#384252",
    ternary: "#e5e7eb",
    accent: "#ef4343",
  },
  dark: {
    primary: "#030711",
    secondary: "#e5e7eb",
    ternary: "#384252",
    accent: "#ef4343",
  },
};

export const customTheme = {
  colors,
};

export const theme = extendTheme({ config, colors });
