import { Link } from "react-router-dom";
import { APP_ROUTES } from "shared-config";



export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Interview Platform</h1>
      <Link to={APP_ROUTES.login}>Login</Link>  
      <Link to={APP_ROUTES.signup}>Signup</Link>
    </div>
  );
}