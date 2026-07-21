import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppState } from "shared-auth/types";
import { dashboardPath } from "shared-auth/utils";
import { APP_ROUTES } from "shared-config";



export default function LandingPage() {

    const user = useSelector((state: AppState) => state.auth.user);

  if (user) {
    return <Navigate to={dashboardPath(user.role)} replace />;
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Interview Platform</h1>
      <Link to={APP_ROUTES.login}>Login</Link>  
      <Link to={APP_ROUTES.signup}>Signup</Link>
    </div>
  );
}