import {Outlet} from "react-router-dom";
import Header from "@layout/Header.jsx";
import SideBar from "@layout/SideBar.jsx";

const RootLayout = () => {
  return (
    <div className="relative w-full">
      <SideBar/>
      <div className="pl-77 max-md:pl-0">
        <Header/>
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;