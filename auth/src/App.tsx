import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "./routes";
import { store } from "./store";

const router = createBrowserRouter(authRoutes);

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-surface text-foreground">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}
