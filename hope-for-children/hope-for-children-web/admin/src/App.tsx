import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { setUpAxiosIntercept } from "./api/request";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state: any) => state.auth);
  const router = createBrowserRouter([...PrivateRoutes()]);

  useEffect(() => {
    if (user) {
      setUpAxiosIntercept(user);
    }
    return () => {};
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
