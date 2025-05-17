import {Map, MapMarker} from "react-kakao-maps-sdk";
import {toast} from "react-toastify";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {ko} from "date-fns/locale";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import dayjs from "dayjs";

import {icMap, icMealGood,icAlarm,icCalRegister,icBack, imgMark, imgMarkUnSelect} from "@assets/index.js";

import googleService from "@apis/external/googleService.js";
import matchService from "@apis/match/matchService.js";

import SearchItem from "@components/match/SearchItem.jsx";
import PlaceCard from "@components/match/PlaceCard.jsx";
import ArticleCard from "@components/match/ArticleCard.jsx";
import LoadingSpinner from "@components/common/LoadingSpinner.jsx";
import CustomInput from "@components/common/CustomInput.jsx";
import LongButton from "@components/common/LongButton.jsx";

const Match = () => {
  const [addressX, setAddressX] = useState(0);
  const [addressY, setAddressY] = useState(0);
  const [isFoucs, setIsFoucs] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState('명지대학교 인문캠퍼스');
  const [debounce, setDebounce] = useState(searchKeyWord);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [searchList, setSearchList] = useState([]);
  const [markedList, setMarkedList] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [openingHours, setOpeningHours] = useState({});
  const [placeImage, setPlaceImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({selectedDate: dayjs(), selectedTime: '00:00', content:""});

  const {kakao} = window;

  // 키워드로 장소 검색하기
  const handleSearch = (keyword, type) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, function (data, status) {
      if (status === 'OK') {
        if (type === 1) {
          setSearchList(data);
          setSelectedPlace(data[0]);
        } else {
          setMarkedList(data);
        }
      } else {
        if(debounce === "") return;
        toast.error("해당 검색어에 맞는 장소가 없습니다")
      }
    })
  }

  // 주소로 x,y 좌표 알아내기
  const handleSearchByPlace = () => {
    const gecoder = new kakao.maps.services.Geocoder();
    gecoder.addressSearch(selectedPlace?.address_name, function (result, status) {
      if (status === 'OK') {
        const {x, y} = selectedPlace;
        setAddressX(x);
        setAddressY(y);
      } else {
        console.error("주소 변환 실패!");
      }
    })
  }

  // google API로 장소에 대한 id를 가져오기
  const getPlaceId = async () => {
    try {
      setIsLoading(true)
      const data = await googleService.getGooglePlaceInfo(selectedPlace?.place_name);
      getPlaceImageUrl(data?.results[0]?.place_id);
    } catch (error) {
      console.error(error);
    }

  }

  // google API로 id에 대한 이미지 및 기타 정보 가져오기
  const getPlaceImageUrl = async (place_id) => {
    try{
      const data = await googleService.getGooglePlaceImage(place_id);
      const photo_reference = data?.result?.photos[0].photo_reference;
      setOpeningHours(data?.result?.opening_hours);
      setPlaceImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${import.meta.env.VITE_APP_GOOGLE_API_KEY}`);
    } catch (error){
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleMealPlace = () => {
    handleSearch("명지대학교 인문캠퍼스 맛집", 2)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchKeyWord, 1);
    }
  }

  const handleSearchItem = (item) => {
    setSelectedPlace(item);
    setSearchKeyWord(item.place_name);
    setShowDetail(true);
  }

  // 마커 클릭 이벤트
  const handleMarkList = (item) => {
    setSelectedPlace(item);
    setSearchKeyWord(item?.place_name);
    setShowDetail(true);

    if (mapInstance) {
      const lating = new kakao.maps.LatLng(item.y, item.x);
      mapInstance.panTo(lating);
    }
  }

  const handleSaveMealPost = () => {
    const mealPost = {
      "latitude": selectedPlace.y,
      "longitude": selectedPlace.x,
      "address": selectedPlace.address_name,
      "name": selectedPlace.place_name,
      "schedule": registerInfo.selectedDate.format("YYYY-MM-DD") + 'T' + registerInfo.selectedTime + ":00",
      "content": registerInfo.content,
    }
    handleMealPost(mealPost);
  }


  const handleMealPost = async (mealPost) => {
    const data = matchService.saveMealPost(mealPost);
    console.log(data);
  }


  // debounce에 따라 검색결과 보여주기
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounce(searchKeyWord);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchKeyWord])

  // 키워드로 장소 검색하기
  useEffect(() => {
    handleSearch(debounce, 1);
    getPlaceId();
  }, [debounce])

  // 장소로 좌표(x,y) 검색하기
  useEffect(() => {
    handleSearchByPlace();
  }, [selectedPlace]);


  return (
    <div className="w-full h-full relative pl-0.5">
      <Map
        center={{lat: addressY, lng: addressX}}
        onCreate={setMapInstance}
        className={"w-[100%] h-[90vh] relative z-1"}
        level={3}>
        <MapMarker
          image={{
            src: imgMark,
            size: {
              width: '42',
              height: '50',
            },
          }}
          position={{lat: addressY, lng: addressX}}
        />
        {markedList && markedList?.map((item, index) => (
          <MapMarker
            key={index}
            onClick={() => handleMarkList(item)}
            image={{
              src: `${selectedPlace.address_name === item.address_name ? imgMark : imgMarkUnSelect}`,
              size: {
                width: `${selectedPlace.address_name === item.address_name ? 42 : 30}`,
                height: `${selectedPlace.address_name === item.address_name ? 50 : 30}`,
              },
            }}
            style={{cursor: 'pointer'}}
            position={{lat: item.y, lng: item.x}}
          />)
        )}

        <div className="absolute top-5 left-5 z-10">
          <div className="flex gap-3 items-start">
            <div
              className={clsx("w-80 bg-white rounded-[10px] shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] border", isFoucs ? "border-2 border-(--primary)" : "border-zinc-300")}>
              <div className="flex w-full h-full items-center gap-2 p-4">
                <img src={icMap} alt="map" className="w-6 h-6"/>
                <input
                  type="search"
                  value={searchKeyWord}
                  onChange={(e) => setSearchKeyWord(e.target.value)}
                  onKeyUp={handleKeyUp}
                  onFocus={() => setIsFoucs(true)}
                  onBlur={() => {
                    setTimeout(() => setIsFoucs(false), 200);
                  }}
                  className="w-full h-full outline-none"
                />
              </div>
              {!isFoucs && showDetail && <div>
                <div className="w-full h-45">
                  {!isLoading && (
                    placeImage ? (
                      <img src={placeImage} alt="place" className="w-full h-full object-cover"/>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        이미지 없음
                      </div>
                    )
                  )}
                  {isLoading &&
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      <LoadingSpinner size={40}/>
                    </div>
                  }
                </div>
                <div className="p-4">
                  <p className="text-black text-xl font-extrabold mt-2">{selectedPlace.place_name}</p>
                  <p className="text-black text-base font-normal mt-1">{selectedPlace.address_name}</p>
                  <div className="flex mt-2 items-center gap-2">
                    <img src={icAlarm} alt="alarm" className="w-5 h-5"/>
                    <p>{openingHours?.open_now ? "영업중" : "영업종료"}</p>
                  </div>
                  <div
                    className="flex bg-white rounded-[10px] border border-zinc-300 p-3 gap-2 items-center justify-center mt-3 cursor-pointer" onClick={() => setShowPost(true)}>
                    <img src={icCalRegister} alt="cal" className="w-5 h-5"/>
                    <p className="text-blue-800 text-sm font-bold ">식사메이트 등록하기</p>
                  </div>
                  {/*<div className="w-full h-[1px] bg-gray-100 mt-5 mb-5"/>*/}
                  {/*<div>*/}
                  {/*  <p className="text-black text-sm font-bold mb-5">총 5명</p>*/}
                  {/*  <div className="max-h-[30vh] overflow-x-auto">*/}
                  {/*    <ArticleCard/>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>}
              {showPost && <div
                className="absolute w-80 bg-white top-0  rounded-[10px] shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] p-5">
                <div className="flex gap-1 items-center">
                  <img src={icBack} alt="back" className="w-5 h-5 cursor-pointer" onClick={() => setShowPost(false)}/>
                  <p className="text-black text-xl font-bold">{selectedPlace.place_name}</p>
                </div>
                <p className="text-black text-lg font-bold mt-6 mb-5">날짜를 선택해주세요</p>
                <DayPicker
                  animate
                  locale={ko}
                  mode="single"
                  defaultMonth={new Date()}
                  navLayout="around"
                  selected={registerInfo.selectedDate}
                  onSelect={(date) => {
                    setRegisterInfo({...registerInfo, selectedDate: dayjs(date)})
                  }}
                  classNames={{
                    today: 'text-black',
                    chevron: 'black',
                    selected: 'bg-blue-800 text-white',
                  }}
                />
                <p className="text-black text-lg font-bold mt-6 mb-3">시간을 입력해주세요</p>
                <input
                  type="time"
                  onChange={(e) => setRegisterInfo({...registerInfo, selectedTime: e.target.value})}
                  className="p-3 w-full bg-white rounded-lg outline-zinc-300 outline outline-1 focus:outline-2 focus:outline-(--primary)"
                />
                <p className="text-black text-lg font-bold mt-6 mb-3">한줄글을 작성해주세요</p>
                <textarea
                  value={registerInfo.content}
                  onChange={(e) => setRegisterInfo({...registerInfo, content: e.target.value})}
                  className="p-3 mb-2 w-full bg-white rounded-lg outline-zinc-300 outline outline-1 focus:outline-2 focus:outline-(--primary)"
                  rows={2}
                />
                <LongButton text={"작성완료"} onClick={handleSaveMealPost}/>
              </div>}
            </div>
            <div
              className="flex gap-2 bg-white w-22 h-10 mt-2 items-center justify-center p-3 rounded-full shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] cursor-pointer"
              onClick={handleMealPlace}>
              <img src={icMealGood} alt="meal" className="w-5 h-5"/>
              <p className="text-black text-sm font-bold text-center">맛집</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4  max-w-[98%] z-10 flex gap-3 overflow-x-auto">
          {/*<PlaceCard/>*/}
        </div>

        {isFoucs && <div
          className="absolute overflow-y-auto top-21 left-5 z-10 w-80 h-120 bg-white rounded-[10px] shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] border border-zinc-300"
          style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {searchList.map((item, index) => (
            <SearchItem
              key={index}
              {...item}
              onClick={() => handleSearchItem(item)}
            />
          ))}
        </div>}
      </Map>
    </div>
  );
};

export default Match;