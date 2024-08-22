import * as React from "react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import ClientStyleContext from "./ClientStyleContext";
import createEmotionCache from "./createEmotionCache";
import { theme } from "./utils/colorTheme";
import { StrictMode } from "react";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const [cache, setCache] = React.useState(createEmotionCache());

  const clientStyleContextValue = React.useMemo(
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
        <RemixBrowser />
      </ThemeProvider>
    </ClientCacheProvider>
  );
});
