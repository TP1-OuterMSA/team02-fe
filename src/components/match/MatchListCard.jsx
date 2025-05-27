import {useEffect} from "react";
import dayjs from "dayjs";
import {icLocate, icArrowUpBlack, icArrowDownBlack} from "@assets/index.js";
import MatchListCardItem from "@components/match/MatchListCardItem.jsx";

const MatchListCard = ({item, replyListMap, setReplyListMap}) => {
  const showDetail = replyListMap[item.id];

  useEffect(() => {
    setReplyListMap(prev => ({...prev, [item.id]: false}));
  }, [])

  return (
    <div className="pb-2">
      <div className="p-3 border-b border-stone-50">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img src={icLocate} className="w-6 h-6"/>
            <p className="text-black text-xl font-bold">{item?.name}</p>
          </div>
          <img src={showDetail ? icArrowUpBlack: icArrowDownBlack} className="w-6 h-6 cursor-pointer" onClick={() => setReplyListMap(prev => ({...prev, [item.id]: !replyListMap[item.id]}))}/>
        </div>
        <p className="pl-7 pt-0.5 text-black text-base font-normal">{dayjs(item?.schedule).format("YY년 MM월 DD일 HH시 mm분")}</p>
      </div>
      {showDetail && <div className="bg-stone-50 p-4">
        {item?.matchList.map((item, index) =>
          <MatchListCardItem
            key={index}
            content={item?.content}/>
        )}
      </div>}
    </div>
  );
};

export default MatchListCard;