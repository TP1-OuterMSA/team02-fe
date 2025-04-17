import {useEffect, useState} from "react";
import clsx from "clsx";

const TabMenu = ({leftItem, rightItem, setActive}) => {
  const [activeMenu, setActiveMenu] = useState(leftItem);

  return (
    <div className="w-full h-12 bg-neutral-100 rounded-3xl flex items-center">
      <div data-property-1={activeMenu === leftItem? "on": "off"} className={clsx("cursor-pointer w-1/2 h-10 px-16 py-3 rounded-3xl inline-flex justify-center items-center gap-2.5", `${activeMenu === leftItem ? "bg-blue-800":"bg-neutral-100"}`)} onClick={() => setActiveMenu(leftItem)}>
        <div className={clsx("justify-start text-sm font-bold", `${activeMenu === leftItem ? "text-white": "text-black"}`)}>{leftItem}</div>
      </div>
      <div data-property-1={activeMenu === rightItem? "on": "off"} className={clsx("cursor-pointer w-1/2 h-10 px-16 py-3 rounded-3xl inline-flex justify-center items-center gap-2.5", `${activeMenu === rightItem ? "bg-blue-800":"bg-neutral-100"}`)} onClick={() => setActiveMenu(rightItem)}>
        <div className={clsx("justify-start text-sm font-bold", `${activeMenu === rightItem ? "text-white": "text-black"}`)}>{rightItem}</div>
      </div>
    </div>
  );
};

export default TabMenu;