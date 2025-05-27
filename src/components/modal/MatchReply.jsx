import dayjs from "dayjs";
import {imgPromise} from "@assets/index.js";
import CustomInput from "@components/common/CustomInput.jsx";
import LongButton from "@components/common/LongButton.jsx";
const MatchReply = ({data, value, setValue, onClickBtn, onClickCancel}) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
      <div className="bg-white w-120 p-10 z-20 rounded-2xl flex flex-col items-center">
        <img src={imgPromise} className="w-44 h-36"/>
        <p className="text-black text-xl font-bold mt-5">{data?.place.place_name}</p>
        <p className="text-black text-lg font-normal mt-1">{dayjs(data?.schedule).format("YYYY년 MM월 DD일 HH시 mm분")}</p>
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