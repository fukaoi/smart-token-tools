import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "./components/parts/Header";
import backImage from "./assets/background-image.svg";
import AppWalletProvider from "./components/provider/AppWalletProvider";
import { hydrateRoot } from "react-dom/client";
import { Box } from "@mui/material";
import { useLocation } from "@remix-run/react";
import logoImage from "~/assets/smt-logo.svg";

const styles = {
  box: {
    letterSpacing: "3px",
    fontSize: "17px",
    display: "inline-block",
    marginLeft: "20px",
    marginRight: "10px",
    width: "140px",
    backgroundColor: "rgba(3,3,3, 0.5)",
    marginBottom: "12px",
    borderRadius: "1px",
    paddingTop: "10px",
    boxShadow: "0 10px 25px 0 rgba(0, 0, 0, .5)",
    paddingBottom: "10px",
    "&:hover": {
      backgroundColor: "rgb(1, 130, 105, 0.5)",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Box
          style={{
            position: "relative" as const,
            textAlign: "center" as const,
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backImage})`,
            backgroundPosition: "center",
            minHeight: "100vh",
            maxHeight: "100%",
            width: "100%",
            alignItems: "center",
            fontSize: "calc(10px + 2vmin)",
            color: "white",
          }}
        >
          <Header />
          <AppWalletProvider>{children}</AppWalletProvider>
          <ScrollRestoration />
          <Scripts />
        </Box>
      </body>
    </html>
  );
};

export const HydrateFallback = () => {
  return <p>Loading...</p>;
};

const App = () => {
  return <Outlet />;
};

export default App;
