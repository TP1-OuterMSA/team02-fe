import {imgProfile} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";

const ArticleCard = () => {
  return (
    <div className="mt-3">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={imgProfile} className="w-full h-full object-cover"/>
        </div>
        <div>
          <p className="text-black text-base font-bold items-center flex">안녕<span className="ml-1 text-zinc-400 text-xs font-bold">25.06.17</span></p>
          <p className="text-black text-xs font-normal">2025년 5월 16일 (금) 오후 1시</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-black text-sm font-normal">같이 밥드실분?</p>
        <SmallButton text={"신청하기"}/>
      </div>
    </div>
  );
};

export default ArticleCard;