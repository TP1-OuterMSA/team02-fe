import {Outlet} from "react-router-dom";
import Header from "@layout/Header.jsx";
import SideBar from "@layout/SideBar.jsx";

const RootLayout = () => {
  return (
    <div className="w-full">
      <Header/>
      <div className="flex w-full">
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;