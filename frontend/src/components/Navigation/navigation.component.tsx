import joinArgs from "@utils/joinArgs";
import { Link, useNavigate } from "react-router-dom";
import { accountServices } from "@views/Account";

//icons + styling + motion
import { styles } from "./navigation.styles";
import { LogoutIcon, ViewBoardsIcon } from "@heroicons/react/outline";
import { CogIcon, MoonIcon, HomeIcon } from "@heroicons/react/solid";

interface INavigation {
  isAuthenticated: boolean;
}

const { Wrapper, Items } = styles;

function Navigation({ isAuthenticated }: INavigation) {
  const navigate = useNavigate();
  const logout = () => {
    accountServices.logoutUser();
    localStorage.removeItem("access");
    navigate("/");
  };
  return (
    <div>
      <nav className={joinArgs(Wrapper)}>
        <div className={joinArgs(Items)}>
          <Link to="/">
            <HomeIcon width={24} height={24} />
          </Link>
          <Link to="">
            <MoonIcon width={24} height={24} />
          </Link>
          {isAuthenticated && (
            <Link to="dashboard">
              <ViewBoardsIcon width={24} height={24} />
            </Link>
          )}
          <Link to="auth">
            <CogIcon width={24} height={24} />
          </Link>{" "}
          {isAuthenticated && (
            <Link to="" onClick={logout}>
              <LogoutIcon width={24} height={24} />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
