import { createTheme, NextUIProvider } from "@nextui-org/react";
import "antd/dist/antd.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/scss/index.scss";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

const mainApp = (
  <HelmetProvider>
    <CookiesProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <React.StrictMode>
          <NextUIProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NextUIProvider>
        </React.StrictMode>
      </NextThemesProvider>
    </CookiesProvider>
  </HelmetProvider>
);

root.render(mainApp);
