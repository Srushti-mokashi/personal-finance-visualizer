import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./Auth/AuthContext";
import { FinanceProvider } from "./Context/FinanceContext";
import { CurrencyProvider } from "./Context/CurrencyContext";
import { LendingProvider } from "./Context/LendingContext";
import { BorrowingProvider } from "./Context/BorrowingContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="329148237742-gbrq5ckjcbnfisimn8n17fg983s892ga.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <FinanceProvider>
              <LendingProvider>
                <BorrowingProvider>
                  <App />
                </BorrowingProvider>
              </LendingProvider>
            </FinanceProvider>
          </CurrencyProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
