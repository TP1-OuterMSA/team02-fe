import {imgWelcome} from "@assets/index.js";
import SelectBox from "@components/common/SelectBox.jsx";
import CustomInput from "@components/common/CustomInput.jsx";
import LongButton from "@components/common/LongButton.jsx";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {pagePath} from "@/routes/pagePath.js";

const RecommendCalorie = () => {
  const boxItems = ["남자", "여자"];
  const{navigateTo} = useCustomNavigation()
  return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
        <div className="bg-white w-130 p-10 z-20 rounded-2xl  flex flex-col items-center">
          <img src={imgWelcome} alt="" className="w-60 h-44"/>
          <p className="text-black text-3xl font-extrabold mt-5">식단작성에 오신걸 환영합니다</p>
          <p className="text-neutral-400 text-base font-normal mt-1">서비스 이용을 위해 아래 내용 입력이 필요합니다. </p>
          <div className="w-full pl-12 pr-12 mt-5">
            <div className="w-full flex gap-3">
              <SelectBox placholder={"성별"} items={boxItems} />
              <CustomInput text={"나이(만)"}/>
            </div>
            <CustomInput text={"키(cm)"} style={"mt-4"}/>
            <CustomInput text={"몸무게(kg)"} style={"mt-4 mb-6"}/>
            <LongButton text={"작성완료"}/>
            <p className="text-center mt-3 cursor-pointer" onClick={() => navigateTo(pagePath.COMMUNITY)}>다른 서비스 이용하기</p>
          </div>

        </div>
      </div>
  );
};

export default RecommendCalorie;