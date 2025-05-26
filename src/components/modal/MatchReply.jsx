import {imgPromise} from "@assets/index.js";
import CustomInput from "@components/common/CustomInput.jsx";
import LongButton from "@components/common/LongButton.jsx";
const MatchReply = ({value, setValue, onClickBtn, onClickCancel}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
      <div className="bg-white w-120 p-10 z-20 rounded-2xl flex flex-col items-center">
        <img src={imgPromise} className="w-44 h-36"/>
        <p className="text-black text-xl font-bold mt-5">손가네 빈대떡</p>
        <p className="text-black text-lg font-normal mt-1">2025년 5월 16일 12시 05분</p>
        <div className="flex flex-col gap-3 w-full items-center mt-9">
          <CustomInput text={"간단한 메시지를 작성해보세요"} value={value} setText={setValue}/>
          <LongButton text={"신청하기"} onClick={onClickBtn}/>
          <p className="cursor-pointer" onClick={onClickCancel}>취소하기</p>
        </div>

      </div>
    </div>
  );
};

export default MatchReply;