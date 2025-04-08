import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {icMain, icNotify, imgMainProfile} from "@assets/index.js";
import {pagePath} from "@/routes/pagePath.js";

const Header = () => {
  const {navigateTo} = useCustomNavigation();

  return (
      <div className="w-full h-24 flex justify-between pl-7 pr-7 border-b border-neutral-200">
        <img src={icMain} className="w-40 cursor-pointer" onClick={()=>navigateTo(pagePath.ROOT)}/>
        <div className="flex items-center gap-5">
          <img src={icNotify} className="w-7 h-7 cursor-pointer"/>
          <img src={imgMainProfile} className="w-11 h-11 cursor-pointer"/>
        </div>
      </div>
  );
};

export default Header;