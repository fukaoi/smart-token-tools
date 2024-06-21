import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/Header";
import backImage from "./assets/background-image.jpg";
import { Box } from "@mui/system";

const styles = {
  root: {
    position: "relative" as const,
    textAlign: "center" as const,
    backgroundSize: "cover",
    backgroundImage:
      `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backImage})`,
    backgroundPosition: "center",
    minHeight: "100vh",
    maxHeight: "100%",
    width: "100%",
    alignItems: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Box sx={styles.root}>
          <Header />
          {children}
        </Box>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
