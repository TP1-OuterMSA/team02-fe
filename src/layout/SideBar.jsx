import {icNutrition, icNutritionFill, icCommunity, icCommunityFill, icMatch, icMatchFill} from "@assets/index.js";

const SideBar = () => {
  return (
      <div className="flex flex-col gap-1 pl-3">
        <div className="flex gap-2 p-4">
          <img src={icNutrition} alt="icNutrition"/>
          <p className="text-black text-xl font-bold">식단분석</p>
        </div>
        <div className="flex gap-2 p-4">
          <img src={icCommunity} alt="icCommunity"/>
          <p className="text-black text-xl font-bold">커뮤니티</p>
        </div>
        <div className="flex gap-2 p-4">
          <img src={icMatch} alt="icMatch"/>
          <p className="text-black text-xl font-bold">식사매칭</p>
        </div>
      </div>
  );
};

export default SideBar;