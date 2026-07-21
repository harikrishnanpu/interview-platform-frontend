import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import authRoutes from "authApp/routes";
import dashboardRoutes from "dashboardApp/routes";
import { getMe } from "shared-auth";
import { APP_ROUTES } from "shared-config";
import LandingPage from "./pages/LandingPage";
import { NavBar } from "./components/NavBar";
import { store, setUser } from "./store";
import { useAppDispatch } from "./hooks";

function Layout() {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <NavBar />
      <Outlet />
    </div>
  );
}

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

function SessionLoader({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => {
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        }
      })
      .catch(() => {
        console.log("no cookie ,,logged in");
      })
      .finally(() => setReady(true));
  }, [dispatch]);

  if (!ready) {
    return <p className="p-6 text-sm text-muted">Loading...</p>;
  }

  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <SessionLoader>
        <RouterProvider router={router} />
      </SessionLoader>
    </Provider>
  );
}
