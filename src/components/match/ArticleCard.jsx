import {useState} from "react";

import {icKebab,icDate, imgProfile} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";
import DropDown from "@components/common/DropDown.jsx";

const ArticleCard = ({nick , createdAt , schedule, content, isMine, onClickEdit}) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleMenuClick = () => {
    setIsEdit(!isEdit);
  }
  return (
    <div className="mt-3">
      <div className="flex gap-3">
        <div className="w-12 h-10 rounded-full overflow-hidden">
          <img src={imgProfile} className="w-full h-full object-cover"/>
        </div>
        <div className="w-full">
          <div className="flex justify-between w-ful">
            <p className="text-black text-base font-bold items-center flex">{nick}<span className="ml-1 text-zinc-400 text-xs font-bold">{createdAt}</span></p>
            {isMine && <img src={icKebab} className="w-6 h-6" onClick={handleMenuClick}/>}
            {isEdit &&
              <div className="absolute right-10">
              <DropDown
                isShow={isMine}
              />
              </div>
              }
          </div>
          <div className="flex gap-1 mt-1">
            <img src={icDate} className="w-4 h-4"/>
            <p className="text-black text-xs font-normal">{schedule}</p>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-black text-sm font-normal">{content}</p>
        {!isMine && <SmallButton text={"신청하기"}/>}
      </div>
    </div>
  );
};

export default ArticleCard;