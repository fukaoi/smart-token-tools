import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "./components/parts/Header";
import backImage from "./assets/background-image.svg";
import { Box } from "@mui/system";
import AppWalletProvider from "./components/provider/AppWalletProvider";

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
        <AppWalletProvider>
          <Box
            sx={{
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
            }}
          >
            <Header />
            {children}
          </Box>
        </AppWalletProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
