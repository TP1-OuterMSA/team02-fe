import {icRight, icLeft, imgMainCharcter} from "@assets/index.js";
import LineButton from "@components/common/LineButton.jsx";
import {string} from "@utils/string.js";
import Graph from "@components/diet/Graph.jsx";

const Diet = () => {
  return (
    <div className="pl-7 pr-7 flex gap-5">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-black text-2xl font-extrabold">2025.04.15 ~ 05.15</p>
          <div className="flex gap-2">
            <LineButton><img src={icLeft} alt="icon" className="w-6 h-6"/></LineButton>
            <LineButton><img src={icRight} alt="icon" className="w-6 h-6"/></LineButton>
            <LineButton><span className="text-black text-xl font-bold ml-1 mr-1">오늘</span></LineButton>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 h-96 bg-white rounded-2xl border border-neutral-200 flex flex-col items-center">
          <p className="text-zinc-500 text-base font-bold mt-10">{string.CALORIE}</p>
          <p className="text-black text-2xl font-extrabold"><span className="text-blue-800 text-3xl font-extrabold">1999</span>/2000{string.M_CALORIE}</p>
          <img src={imgMainCharcter} className="w-28 h-28 mt-10"/>
          <div className="mt-5 flex gap-5 w-full justify-center">
            <Graph title={string.CARBOHYDRATE} percentage={20}/>
            <Graph title={string.PROTEIN} percentage={20}/>
            <Graph title={string.PROVINCE} percentage={20}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;