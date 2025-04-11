import {Outlet} from "react-router-dom";
import Header from "@layout/Header.jsx";
import SideBar from "@layout/SideBar.jsx";

const RootLayout = () => {
  return (
    <div className="w-full flex">
      <SideBar/>
      <div className="w-full">
        <Header/>
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;