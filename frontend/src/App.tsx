//native
import { useEffect, useState } from "react";

//state and fetching
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";
import { useVerifyAuthToken } from "@hooks/useVerifyAuthToken";
import { Navigation } from "@components/Navigation";

function App() {
  const token = useVerifyAuthToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token.isSuccess && token?.data !== "undefined") {
      localStorage.setItem("access", token?.data?.access);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("access");
      setIsAuthenticated(false);
    }
  }, [token]);

  //todo = how to read info of a JWT?
  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} />
      <Outlet />
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
