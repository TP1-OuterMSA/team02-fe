import {useEffect} from "react";
import {icClose, imgRice, icPlus, icMinus} from "@assets/index.js";
import {string} from "@utils/string.js";
import SearchBar from "@components/common/SearchBar.jsx";
import AddDietItem from "@components/diet/AddDietItem.jsx";
import AddDietReuslt from "@components/diet/AddDietReuslt.jsx";
import Button from "@components/common/Button.jsx";
import TabMenu from "@components/common/TabMenu.jsx";
import OvalLineButton from "@components/diet/OvalLineButton.jsx";
import dietService from "@apis/diet/dietService.js";

const AddDiet = ({type, onClose}) => {

  useEffect(() => {
    patchFoodsDate();
  }, [])

  const patchFoodsDate = async () => {
    const datas = await dietService.getFoods();
    console.log(datas);
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
      <div className="bg-white w-260 p-10 z-20 rounded-2xl flex flex-col items-center">
        <div className="flex justify-between w-full">
          <p className="text-black text-2xl font-bold">{string.T_DIET}</p>
          <img src={icClose} className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        <div className="w-full flex justify-between gap-5 mt-10 mb-5">
          <div className="w-full">
            <SearchBar placeholder={string.PH_SEARCH}/>
            <button
              className="bg-(--primary) cursor-pointer flex w-full rounded-xl p-3 gap-1 items-center justify-center mt-4">
              <img src={imgRice} className="w-5 h-5"/>
              <p className="text-white text-base font-bold">오늘 먹은 학식 불러오기</p>
            </button>
            <div className="overflow-y-auto h-[44vh] mt-2">
              <AddDietItem/>
            </div>
          </div>
          <div className="w-180 flex flex-col gap-4">
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-4 h-72 ">
              <p className="text-black text-sm font-bold mb-3">내가 추가한 식사</p>
              <div className="h-56 overflow-y-auto">
                <AddDietReuslt/>
              </div>
            </div>
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-4 h-54 flex flex-col items-center">
              <TabMenu leftItem="gram" rightItem="개수"/>
              <div className="flex gap-2 mt-8">
                <OvalLineButton src={icMinus}/>
                <input type="number" className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-20 text-center text-black text-xl font-bold appearance-none"/>
                <OvalLineButton src={icPlus}/>
              </div>
            </div>
          </div>
        </div>
        <Button text={string.SAVE}/>
      </div>
    </div>
  );
};

export default AddDiet;