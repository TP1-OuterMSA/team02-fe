import {useState, useEffect, useRef} from "react";
import {useInView} from "react-intersection-observer";
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
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";

const AddDiet = ({onClose, onClickToday}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [pageNo, setPageNo] = useState(5);
  const [foodName, setFoodName] = useState("");
  const [debounce, setDebounce] = useState(foodName);
  const [input, setInput] = useState(0);
  const [tabMenu, setTabMenu] = useState(string.GRAM);
  const [gram, setGram] = useState(100);
  const [number, setNumber] = useState(1);
  const [activeFood, setActiveFood] = useState({});
  const [dietPickList, setDietPickList] = useState([]);
  const [originKcal, setOriginKcal] = useState(0);
  
  const perGram = originKcal && gram ? originKcal / gram : 0;
  const {ref, inView} = useInView({
    threshold: 0,
  })
  const isFetchingRef = useRef(false);

  // debounce 적용
  useEffect(() => {
    if (debounce !== "") {
      patchFoodsData();
    }
  }, [debounce]);

  // debounce 적용
  useEffect(() => {
    const delaydebounceTimer = setTimeout(() => {
      setPageNo(5); // 페이지 초기화
      setFoodData([]); // 기존 데이터 초기화
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

  // tabMenu가 변경될 때마다 activeFood.kcal 초기화
  useEffect(() => {
    setActiveFood((prev) => ({
      ...prev,
      kcal: originKcal,
    }));
  }, [tabMenu]);

  // input값 변경에 따른 kcal 처리
  useEffect(() => {
    if (input === '' || isNaN(input)) return;

    const updatedKcal =
        tabMenu === string.GRAM
            ? Number(input) * perGram
            : Number(input) * originKcal;

    setActiveFood((prevFood) => ({
      ...prevFood,
      kcal: Math.round(updatedKcal),
      foodWeight: tabMenu === string.GRAM ? input : input * gram
    }));
  }, [input, tabMenu, originKcal, perGram]);


  useEffect(() => {
    if (pageNo > 1 || debounce !== "") {
      patchFoodsData();
    }
  }, [pageNo]);

  useEffect(()=> {
    if(inView && !isFetchingRef.current){
      isFetchingRef.current = true;
      setPageNo((prev) => prev + 5);
    }
  }, [inView]);

  const patchFoodsData = async () => {
    if(isFetching) return;
    setIsFetching(true);

    try{
      const data = await dietService.getFoods({count: pageNo, foodName});
      if(data.length > 0){
        setFoodData((prev) => [...prev, ...data]);
      }
    } catch(error){
      console.error(error)
    } finally {
      setIsFetching(false);
      isFetchingRef.current = false; // 다시 false로 돌려놓기
    }
  }

  const handlePlusMinus = (type) => {
    if (tabMenu === string.GRAM) {
      setInput((prev) => {
        const newInput = type === constant.PLUS ? prev + 5 : Math.max(prev - 5, 0);
        setActiveFood((prev) => {
          const kcalChange = perGram * 5;
          const newKcal = type === constant.PLUS
              ? prev.kcal + kcalChange
              : Math.max(prev.kcal - kcalChange, 0);
          return { ...prev, kcal: newKcal, foodWeight: newInput };
        });
        return newInput;
      });


    } else if (tabMenu === string.NUMBER) {
      setInput((prev) => {
        const newInput = type === constant.PLUS ? prev + 1 : Math.max(prev - 1, 1);
        setActiveFood((prevFood) => ({
          ...prevFood,
          kcal: originKcal * newInput,
        }));
        return newInput;
      });
    }
  };


  const handleDietItem = (data) => {
    setActiveFood(data);
    setGram(data.foodWeight);
    setOriginKcal(data.kcal);
    setTabMenu(string.GRAM);
    setInput(data.foodWeight);
  }

  const handleAddDietItem = () => {
    if(activeFood?.kcal === 0 || !activeFood) return;
    setDietPickList((prev) =>{
      const isExist = prev.some(item => item.foodName === activeFood.foodName);

      if(isExist){
        toast.warn("이미 추가된 음식입니다.");
        return prev;
      }

      return [...prev, {...activeFood, originKcal, gram}];
    });
    setActiveFood("");
  }

  const handlePickDietList = (index) => {
    setDietPickList((prev) => prev.filter((item,idx) => idx !== index));
  }

  const handleOnKeyUp = (e) => {

    if(e.key === 'Enter'){
      setDebounce(foodName); // 검색어 즉시 반영
      patchFoodsData();
    }
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
            <SearchBar placeholder={string.PH_SEARCH} onKeyUp={handleOnKeyUp} value={foodName} setValue={(item) => setFoodName(item)}/>
            <button className="bg-(--primary) cursor-pointer flex w-full rounded-xl p-3 gap-1 items-center justify-center mt-4" onClick={onClickToday}>
              <img src={imgRice} className="w-5 h-5"/>
              <p className="text-white text-base font-bold">이날 먹은 학식 불러오기</p>
            </button>
            <div className="overflow-y-auto h-[44vh] mt-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {foodData?.map((item, index)=> (
                <AddDietItem
                  key={index}
                  foodName={item?.foodName}
                  foodWeight={item?.foodWeight}
                  kcal={item?.kcal}
                  active={item?.foodName === activeFood?.foodName}
                  onClick={() => handleDietItem(item)}
                />
              ))}
              {foodData.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                  <img src={imgNoodle} className="w-28 h-28"/>
                  <p className="text-stone-400 text-base font-bold">오늘 어떤 음식을 먹었나요?</p>
                </div>
              )}
              <div className="w-full h-10 mt-3 flex justify-center" ref={ref}>
                {isFetching && <ClipLoader/>}
              </div>
            </div>
          </div>
          <div className="w-180 flex flex-col gap-4">
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-4 h-72 ">
              <p className="text-black text-sm font-bold mb-3">내가 추가한 식사</p>
              <div className="h-56 overflow-y-auto">
                {dietPickList.length > 0 && dietPickList.map((item, index) => (
                    <AddDietReuslt key={index} {...item} onClick={() => {handlePickDietList(index)}}/>
                ))}
              </div>
            </div>
            <div className="w-full bg-white rounded-2xl border border-neutral-200 p-4 h-54 flex flex-col items-center">
              <TabMenu leftItem={string.GRAM} rightItem={string.NUMBER} setActive={setTabMenu}/>
              <div className="flex gap-2 mt-8 ">
                <OvalLineButton src={icMinus} size={5} onClick={() => {handlePlusMinus(constant.MINUS)}}/>
                <input
                  type="number"
                  value={Math.round(input)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInput(val === '' ? '' : Number(val));
                  }}
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-20 text-center text-black text-xl font-bold appearance-none"/>
                {tabMenu === string.GRAM && (
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-sm">g</span>
                )}
                <OvalLineButton src={icPlus} size={5} onClick={() => {handlePlusMinus(constant.PLUS)}}/>
              </div>
              {activeFood && <div className="pl-3 pr-3 pt-2 pb-2 bg-stone-100 rounded-md mt-5">
                <p className="text-black text-base font-bold">{Math.round(activeFood?.kcal)}Kcal</p>
              </div>}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button text={string.SAVEANDCLOSE} style="bg-neutral-500" onClick={() => onClose(dietPickList)}/>
          <Button text={string.ADD} onClick={handleAddDietItem}/>
        </div>

      </div>
    </div>
  );
};

export default AddDiet;