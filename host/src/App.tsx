import { Outlet } from "react-router-dom";
import {NavBar} from "./components/NavBar";

export function Layout() {
  return (
    <div className="min-h-screen bg-surface text-foreground items-center ">
      <NavBar />
      <Outlet />
    </div>
  );
}
