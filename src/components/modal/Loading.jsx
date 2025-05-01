import React from 'react';
import LoadingSpinner from "@components/common/LoadingSpinner.jsx";
import {imgEating} from "@assets/index.js";
import {string} from "@utils/string.js";

const Loading = () => {
  return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
        <div className="bg-white w-260 p-10 z-20 rounded-2xl flex flex-col items-center pt-34 pb-34">
          <LoadingSpinner
            img={imgEating}
          />
          <p className="text-black text-4xl font-semibold mt-10">{string.MEAL}</p>
          <p className="text-neutral-400 text-xl font-normal mt-4">{string.WAIT}</p>
        </div>

      </div>
  );
};

export default Loading;