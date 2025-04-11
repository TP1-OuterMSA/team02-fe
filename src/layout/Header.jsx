import {icNotify, imgMainProfile, icMain} from "@assets/index.js";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {pagePath} from "@/routes/pagePath.js";

const Header = () => {
  const {navigateTo} = useCustomNavigation();
  return (
      <div className="w-full h-24 justify-between flex pl-7 pr-7 sticky top-0 bg-white">
        <img src={icMain} className="w-40 cursor-pointer min-md:w-0" onClick={() => navigateTo(pagePath.ROOT)}/>
        <div className="flex items-center gap-5">
          <img src={icNotify} className="w-7 h-7 cursor-pointer"/>
          <img src={imgMainProfile} className="w-11 h-11 cursor-pointer"/>
        </div>
      </div>
  );
};

export default Header;