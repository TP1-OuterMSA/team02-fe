import {icMain, icNotify, imgMainProfile} from "@assets/index.js";
const NewHeader = () => {
  return (
      <div className="w-full h-24 flex justify-between pl-5 pr-5">
        <img src={icMain} className="w-40 cursor-pointer"/>
        <div className="flex items-center gap-5">
          <img src={icNotify} className="w-7 h-7 cursor-pointer"/>
          <img src={imgMainProfile} className="w-11 h-11 cursor-pointer"/>
        </div>
      </div>
  );
};

export default NewHeader;