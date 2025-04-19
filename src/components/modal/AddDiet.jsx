import {useState, useEffect} from "react";
import {icClose, imgRice, icPlus, icMinus, imgNoodle} from "@assets/index.js";
import {string} from "@utils/string.js";
import {constant} from "@utils/constant.js";
import SearchBar from "@components/common/SearchBar.jsx";
import AddDietItem from "@components/diet/AddDietItem.jsx";
import AddDietReuslt from "@components/diet/AddDietReuslt.jsx";
import Button from "@components/common/Button.jsx";
import TabMenu from "@components/common/TabMenu.jsx";
import OvalLineButton from "@components/diet/OvalLineButton.jsx";
import dietService from "@apis/diet/dietService.js";
import {useCustomCalcKcal} from "@hooks/useCustomCalcKcal.js";
import {ClipLoader} from "react-spinners";

const dummyData = [{foodCode: "D011002", foodGroupName:"쌀밥", foodName:"쌀밥", foodWeight: 210, kcal: 307}, {foodCode: "D012096", foodGroupName:"잡곡밥류", foodName:"현미찹쌀밥", foodWeight: 100, kcal: 105}];

const AddDiet = ({type, onClose}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [foodName, setFoodName] = useState("");
  const [debounce, setDebounce] = useState(foodName);
  const [input, setInput] = useState(0);
  const [tabMenu, setTabMenu] = useState();
  const [gram, setGram] = useState(100);
  const [number, setNumber] = useState(1);
  const [activeFood, setActiveFood] = useState();
  const [dietPickList, setDietPickList] = useState([]);

  const {gramToKcal} = useCustomCalcKcal();

  useEffect(()=> {
    setFoodData(dummyData);
  }, [])

  // debounce 적용
  useEffect(() => {
    if (debounce !== "") {
      patchFoodsData();
    }
  }, [debounce]);

  // debounce 적용
  useEffect(() => {
    const delaydebounceTimer = setTimeout(() => {
      setDebounce(foodName);
    }, 1000);

    return () => clearTimeout(delaydebounceTimer);
  }, [foodName]);

  // tabmenu 변경에 따른 input 값 처리
  useEffect(() => {
    if(tabMenu === string.GRAM){
      setInput(gram)
    } else{
      setInput(number)
    }
  }, [tabMenu, gram]);

  const patchFoodsData = async () => {
    setIsFetching(true);
    try{
      const data = await dietService.getFoods({pageNo, pageSize, foodName});
      if(data.length > 0){
        setFoodData(data);
      }
    } catch(error){
      console.error(error)
    } finally {
      setIsFetching(false);
    }
  }

  const handlePlusMinus = (type) => {
    const perGram = gramToKcal(activeFood.foodWeight, activeFood.kcal);
    console.log(perGram);
    if(tabMenu === string.GRAM){
      setInput((prev) =>type === constant.PLUS ? prev+5 : prev === 0 ? prev=0 : prev-5);

      setActiveFood((prev) => type === constant.PLUS ? prev.kcal = prev.kcal + perGram * 5: prev.kcal - perGram * 5)
    } else if(tabMenu === string.NUMBER){
      setInput((prev) =>type === constant.PLUS ? prev+1 : prev === 0 ? prev=0 : prev-1);
    }
  }

  const handleDietItem = (data) => {
    setActiveFood(data);
    setGram(data.foodWeight);
    console.log(data);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
      <div className="bg-white w-260 p-10 z-20 rounded-2xl flex flex-col items-center">
        <div className="flex justify-between w-full">
          <p className="text-black text-2xl font-bold">{string.T_DIET}</p>
          <img src={icClose} className="w-6 h-6 cursor-pointer hidden" onClick={onClose} />
        </div>
        <div className="w-full flex justify-between gap-5 mt-10 mb-5">
          <div className="w-full">
            <SearchBar placeholder={string.PH_SEARCH} value={foodName} setValue={(item) => setFoodName(item)}/>
            <button
              className="bg-(--primary) cursor-pointer flex w-full rounded-xl p-3 gap-1 items-center justify-center mt-4">
              <img src={imgRice} className="w-5 h-5"/>
              <p className="text-white text-base font-bold">오늘 먹은 학식 불러오기</p>
            </button>
            <div className="overflow-y-auto h-[44vh] mt-2">
              {foodData?.map((item, index)=> (
                <AddDietItem
                  key={index}
                  foodName={item?.foodName}
                  foodWeight={item?.foodWeight}
                  kcal={item?.kcal}
                  active={item?.foodCode === activeFood?.foodCode}
                  onClick={() => handleDietItem(item)}
                />
              ))}
              {foodData.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                  <img src={imgNoodle} className="w-28 h-28"/>
                  <p className="text-stone-400 text-base font-bold">오늘 어떤 음식을 먹었나요?</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-180 flex flex-col gap-4">
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-4 h-72 ">
              <p className="text-black text-sm font-bold mb-3">내가 추가한 식사</p>
              <div className="h-56 overflow-y-auto">
              </div>
            </div>
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-4 h-54 flex flex-col items-center">
              <TabMenu leftItem={string.GRAM} rightItem={string.NUMBER} setActive={setTabMenu}/>
              <div className="flex gap-2 mt-8">
                <OvalLineButton src={icMinus} onClick={() => {handlePlusMinus(constant.MINUS)}}/>
                <input
                  type="number"
                  value={input}
                  onChange={(e) => {setInput(e.target.value)}}
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-20 text-center text-black text-xl font-bold appearance-none"/>
                <OvalLineButton src={icPlus} onClick={() => {handlePlusMinus(constant.PLUS)}}/>
              </div>
              {activeFood && <div className="pl-3 pr-3 pt-2 pb-2 bg-stone-100 rounded-md mt-5">
                <p className="text-black text-base font-bold">{Math.round(activeFood?.kcal)} Kcal</p>
              </div>}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button text={string.SAVEANDCLOSE} style="bg-neutral-500" onClick={onClose}/>
          <Button text={string.ADD}/>
        </div>

      </div>
    </div>
  );
};

export default AddDiet;