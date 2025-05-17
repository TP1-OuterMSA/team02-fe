import {useEffect, useRef, useState} from "react";

const NaverMap = () => {
  const mapRef = useRef(null);
  const [search, setSearch] = useState("명지대학교 인문캠퍼스")
  const [AddressX, setAddressX] = useState(37.5666103);
  const [AddressY, setAddressY] = useState(126.9783882);
  const {naver} = window;

  // Dynamic Map 가져와 띄우기
  useEffect(() => {
    const mapOptions = {
      // 지도의 초기 중심 좌표
      center: new naver.maps.LatLng(AddressX, AddressY),
      logoControl: false, // 네이버 로고 표시 X
      mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
      scaleControl: true, // 지도 축척 컨트롤의 표시 여부
      tileDuration: 1000, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
      zoom: 15, // 지도의 초기 줌 레벨
      zoomControl: false, // 줌 컨트롤 표시
    };
    mapRef.current = new naver.maps.Map(
      'map',
      mapOptions
    );
  }, []);

  // 지도 주소로 검색
  useEffect(() => {
    if(search !== ""){
      naver.maps.Service.geocode(
        {query: search},
        function (status, res){
          if(res.v2.addresses.length === 0){
            console.log("불러오는데 실패함");
          } else{
            console.log(res.v2.addresses[0]);
          }
        }
      );
    }
  }, [search])
  return
    <div id="map" className="w-[100%] h-[90vh]"></div>
  );
};

export default NaverMap;