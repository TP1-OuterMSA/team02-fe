import {useNavigate, useLocation} from "react-router-dom";

import {icMain, icMenu} from "@assets/index.js";
import {pagePath} from "@/routes/pagePath.js";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleMenu = (destinaition) => {
    navigate(destinaition);
  }

  return (
    <div className="w-full h-24 mt-4 flex justify-between items-center pl-3 pr-5">
      <img src={icMain} className="w-40 cursor-pointer" onClick={() => navigate("/")} />
      <img src={icMenu} className="w-[31px] h-[31px] min-md:hidden cursor-pointer"/>
      <div className="max-md:hidden">
        <ul className="flex text-lg font-semibold text-black">
          <li className={`${location === pagePath.NUTRITION ? "lnb_menu lnb_menu_active" : "lnb_menu"}`} onClick={() => handleMenu(pagePath.NUTRITION)}>식단분석</li>
          <li className={`${location === pagePath.COMMUNITY ? "lnb_menu lnb_menu_active" : "lnb_menu"}`} onClick={() => handleMenu(pagePath.COMMUNITY)}>커뮤니티</li>
          <li className={`${location === pagePath.MATCH ? "lnb_menu lnb_menu_active" : "lnb_menu"}`} onClick={() => handleMenu(pagePath.MATCH)}>식사매칭</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;