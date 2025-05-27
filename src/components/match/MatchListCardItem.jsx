import {imgProfile} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";


const MatchListCardItem = ({content}) => {
  return (
    <div>
      <div className="flex gap-3">
        <img src={imgProfile} className="w-8 h-8 rounded-full"/>
        <div>
          <p className="text-black text-base font-bold">익명</p>
          <p className="text-black text-sm font-normal ">{content}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center pl-9 pt-2">
        <SmallButton text={"수락"} style={"w-27 text-center"}/>
        <SmallButton text={"거절"} style={"w-27 text-center bg-neutral-700"}/>
      </div>
    </div>
  );
};

export default MatchListCardItem;