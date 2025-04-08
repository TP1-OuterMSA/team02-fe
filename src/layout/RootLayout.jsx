import {Outlet} from "react-router-dom";
import Header from "@layout/Header.jsx";

const RootLayout = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto relative">
        <Header/>
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;