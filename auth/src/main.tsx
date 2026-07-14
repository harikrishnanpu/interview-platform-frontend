import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import AuthRoutes from "./routes";
import "./index.css";

// tiny store so this remote can run alone while developing
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null as null | { id: string; name: string; email: string } },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
