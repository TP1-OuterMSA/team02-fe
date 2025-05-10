import TodayMealItem from "@components/diet/TodayMealItem.jsx";
import Button from "@components/common/Button.jsx";
import {string} from "@utils/string.js";
import {constant} from "@utils/constant.js";

const TodayMeal = ({data, handleCancel, handleAdd, handlePlusMinus, handleChangeValue, onClickCancel}) => {
  return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
        <div className="bg-white w-260 p-10 z-20 rounded-2xl flex flex-col items-center pt-20">
          <p className="text-black text-4xl font-bold">내가 먹은 학식정보</p>
          <p className=" text-zinc-400 text-lg font-normal mt-2">1인분을 기준으로 g을 계산했어요</p>
          <div className="mt-10 flex flex-col gap-4 h-110 overflow-hidden overflow-y-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {data?.map((item, index) => (
                <TodayMealItem
                    key={index}
                    item={item}
                    handleChangeValue={handleChangeValue}
                    onClickPlus={() => handlePlusMinus(constant.PLUS, item)}
                    onClickMinus={() => handlePlusMinus(constant.MINUS, item)}
                    onClickCancel={() => onClickCancel(item)}
                />
            ))}
          </div>
          <div className="flex mt-8 gap-3">
            <Button text={string.CANCEL} style={"bg-neutral-500"} onClick={handleCancel} />
            <Button text={string.ADD} onClick={handleAdd}/>
          </div>
        </div>
      </div>
  );
};

export default TodayMeal;