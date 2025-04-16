import {imgWelcome} from "@assets/index.js";

const RecommendCalorie = () => {
  return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
        <div className="bg-white w-130 p-10 z-20 rounded-2xl  flex flex-col items-center">
          <img src={imgWelcome} alt="" className="w-60 h-44"/>
          <p className="text-black text-3xl font-bold">식단작성에 오신걸 환영합니다</p>
          <p className="text-neutral-400 text-base font-normal ">서비스 이용을 위해 아래 내용 입력이 필요합니다. </p>
        </div>
      </div>
  );
};

export default RecommendCalorie;