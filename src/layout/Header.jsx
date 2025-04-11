import {icNotify, imgMainProfile} from "@assets/index.js";

const Header = () => {

  return (
      <div className="w-full h-24 justify-between flex pl-7 pr-7 sticky right-0">
        <div></div>
        <div className="flex items-center gap-5">
          <img src={icNotify} className="w-7 h-7 cursor-pointer"/>
          <img src={imgMainProfile} className="w-11 h-11 cursor-pointer"/>
        </div>
      </div>
  );
};

export default Header;