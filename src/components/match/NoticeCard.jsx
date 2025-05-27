import {icArrowUp, icArrowDown, icNoticeWhite, icCloseWhite} from "@assets/index.js";
import {constant} from "@utils/constant.js";
const NoticeCard = ({title, date, onClick, isShowUp}) => {
  return (
    <div className="w-full h-13 bg-black/60 rounded-[30px] border border-zinc-300 flex items-center justify-between pl-5 pr-5">
      <div className="flex items-center gap-2">
        <img src={icNoticeWhite} className="w-6 h-6"/>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-white text-xs">{date}</p>
      </div>
      <div className="flex items-center gap-1.5">
        {isShowUp && <img src={icArrowUp} className="w-6 h-6 cursor-pointer" onClick={() => onClick(constant.UP)}/>}
        <img src={icArrowDown} className="w-6 h-6 cursor-pointer" onClick={() => onClick(constant.DOWN)}/>
        <img src={icCloseWhite} className="w-5 h-5 cursor-pointer" onClick={() => onClick(constant.CANCEL)}/>
      </div>
    </div>
  );
};

export default NoticeCard;