import { lazy, type ReactNode, useState, useMemo } from "react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import ClientStyleContext from "./ClientStyleContext";
import createEmotionCache from "./createEmotionCache";
import { theme } from "./utils/colorTheme";
import { StrictMode } from "react";
const AppWalletProvider = lazy(
  () => import("./components/provider/AppWalletProvider")
);
interface ClientCacheProviderProps {
  children: ReactNode;
}

const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    []
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
};

startTransition(() => {
  hydrateRoot(
    document,
    <ClientCacheProvider>
      <ThemeProvider theme={theme}>
        <AppWalletProvider>
          <RemixBrowser />
        </AppWalletProvider>
      </ThemeProvider>
    </ClientCacheProvider>
  );
});
