import './App.css'
import { useRoutes } from "react-router-dom";
import RoutesConfig from "@/routes/routesConfig.jsx";
import userService from "@apis/user/userService.js";
import {ToastContainer} from "react-toastify";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {useCustomWindowNavigation} from "@hooks/useCustomWindowNavigation.js";
import {useEffect, useState} from "react";
import {pagePath} from "@/routes/pagePath.js";

function App() {
  const router = useRoutes(RoutesConfig);
  const {navigateTo} = useCustomNavigation();
  const {navigateToWindow} = useCustomWindowNavigation();


  const patchUserId = async () => {
    const data =  await userService.getMyUserId();
    localStorage.setItem('userId', data);
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      navigateTo(pagePath.ROOT)
      patchUserId();
    } else{
      navigateTo(pagePath.LOGIN)
      // navigateToWindow("/team6/login")
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
