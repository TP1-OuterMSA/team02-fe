import {imgProfile} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";
import {constant} from "@utils/constant.js";


const MatchListCardItem = ({content, matchState, onClickRequest, onClickRefuse}) => {
  console.log(matchState);
  return (
    <div>
      <div className="flex gap-3">
        <img src={imgProfile} className="w-8 h-8 rounded-full"/>
        <div>
          <p className="text-black text-base font-bold">익명</p>
          <p className="text-black text-sm font-normal ">{content}</p>
        </div>
      </div>
      {matchState === constant.WAITING &&
        <div className="flex gap-2 items-center pl-9 pt-2">
        <SmallButton text={"수락"} style={"w-27 text-center"} onClick={onClickRequest}/>
        <SmallButton text={"거절"} style={"w-27 text-center bg-neutral-700"} onClick={onClickRefuse}/>
      </div>}
      {matchState === constant.ACCEPT &&
        <SmallButton text={"쪽지 보내기"} style={"text-center mt-3 ml-9 mr-5"}/>
      }
    </div>
  );
};

export default MatchListCardItem;