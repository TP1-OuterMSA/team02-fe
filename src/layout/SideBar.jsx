import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { icNutrition, icNutritionFill, icCommunity, icCommunityFill, icMatch, icMatchFill } from "@assets/index.js";
import { pagePath } from "@/routes/pagePath.js";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [hoveredMenu, setHoveredMenu] = useState(null); // hover 상태 추가

  const handleMenu = (destination) => {
    navigate(destination);
  };

  const handleMenuFocus = (pageName) => {
    return location === pageName;
  };

  const getIcon = (pageName, icon, iconFill) => {
    if (handleMenuFocus(pageName) || hoveredMenu === pageName) {
      return iconFill;
    }
    return icon;
  };

  return (
    <div className="flex flex-col gap-2 p-2.5 min-w-75 border-r border-neutral-200">
      <div
        className={`sidebar_menu ${handleMenuFocus(pagePath.NUTRITION) ? "sidebar_menu_active" : ""}`}
        onClick={() => handleMenu(pagePath.NUTRITION)}
        onMouseEnter={() => setHoveredMenu(pagePath.NUTRITION)}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <img src={getIcon(pagePath.NUTRITION, icNutrition, icNutritionFill)} alt="icNutrition" className="w-6 h-6" />
        <p className="sidebar_text">식단분석</p>
      </div>

      <div
        className={`sidebar_menu ${handleMenuFocus(pagePath.COMMUNITY) ? "sidebar_menu_active" : ""}`}
        onClick={() => handleMenu(pagePath.COMMUNITY)}
        onMouseEnter={() => setHoveredMenu(pagePath.COMMUNITY)}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <img src={getIcon(pagePath.COMMUNITY, icCommunity, icCommunityFill)} alt="icCommunity" className="w-6 h-6" />
        <p className="sidebar_text">커뮤니티</p>
      </div>

      <div
        className={`sidebar_menu ${handleMenuFocus(pagePath.MATCH) ? "sidebar_menu_active" : ""}`}
        onClick={() => handleMenu(pagePath.MATCH)}
        onMouseEnter={() => setHoveredMenu(pagePath.MATCH)}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <img src={getIcon(pagePath.MATCH, icMatch, icMatchFill)} alt="icMatch" className="w-6 h-6" />
        <p className="sidebar_text">식사 메이트</p>
      </div>
    </div>
  );
};

export default SideBar;
