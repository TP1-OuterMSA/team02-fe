import './App.css'
import { useRoutes } from "react-router-dom";
import RoutesConfig from "@/routes/routesConfig.jsx";
import {ToastContainer} from "react-toastify";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {useEffect} from "react";
import {pagePath} from "@/routes/pagePath.js";

function App() {
  const router = useRoutes(RoutesConfig);
  const {navigateTo} = useCustomNavigation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      navigateTo(pagePath.ROOT)
    } else{
      navigateTo(pagePath.LOGIN)
    }
  }, []);
  return (
    <div>
      {router}
      <ToastContainer/>
    </div>
  )
}

export default App
