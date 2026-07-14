import { Link } from "react-router-dom";
import { logoutApi, dashboardPath } from "shared-auth";
import { APP_ROUTES } from "shared-config";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearUser, toggleTheme } from "../store";

export function NavBar() {
  const user = useAppSelector((s) => s.auth.user);
  const theme = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();

  async function onLogout() {
    try {
      await logoutApi();
    } catch {
      console.log("Failed to logout");
    }
    dispatch(clearUser());
  }

  return (
    <nav className="flex items-center gap-4 border-b border-border bg-surface px-6 py-3 text-sm">
      <Link to={APP_ROUTES.home} className="font-medium text-foreground">
        Interview Platform
      </Link>
      {!user && ( 
        
        <div>
        <Link to={APP_ROUTES.login} className="text-muted hover:text-foreground">
        Login
      </Link>
      <Link to={APP_ROUTES.signup} className="text-muted hover:text-foreground">
        Signup
      </Link> 
      </div>
      )}
      {user && (
        <Link
          to={dashboardPath(user.role)}
          className="text-muted hover:text-foreground"
        >
          Dashboard
        </Link>
      )}
      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="rounded border border-border px-3 py-1 text-foreground"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
        {user && (
          <>
            <span className="text-muted">
              {user.name} - {user.role}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded cursor-pointer bg-primary px-3 py-1 text-primary-fg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
