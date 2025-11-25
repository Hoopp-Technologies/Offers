import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient.ts";
import AuthContextProvider from "./context/authContext.tsx";
import { WishlistContextProvider } from "./context/WishlistContext.tsx";
import { CartContextProvider } from "./context/CartContext.tsx";
import PreferencesContextProvider from "./context/PreferencesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <PreferencesContextProvider>
          <WishlistContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </WishlistContextProvider>
        </PreferencesContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
