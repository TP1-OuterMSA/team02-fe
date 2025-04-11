import {icRight, icLeft} from "@assets/index.js";
import LineButton from "@components/common/LineButton.jsx";

const Diet = () => {
  return (
    <div className="pl-7 pr-7">
      <div>
        <div>
          <p className="text-black text-2xl font-extrabold">2025.04.15 ~ 05.15</p>
          <LineButton img={icLeft}/>
          <LineButton img={icRight}/>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Diet;