import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import authRoutes from "authApp/routes";
import dashboardRoutes from "dashboardApp/routes";
import { getMe } from "shared-auth";
import { APP_ROUTES } from "shared-config";
import { Layout } from "./App";
import LandingPage from "./pages/LandingPage";
import { setUser, store } from "./store";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: APP_ROUTES.home, element: <LandingPage /> },
      ...authRoutes,
      ...dashboardRoutes,
    ],
  },
]);

async function start() {
  try {
    const res = await getMe();
    if (res.data.user) {
      store.dispatch(setUser(res.data.user));
    }
  } catch {
    // not logged in
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}

start();
