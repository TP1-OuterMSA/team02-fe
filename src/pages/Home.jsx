import React from 'react';
import {icHome} from "@assets/index.js";
import {string} from "@utils/string.js";
import Button from "@components/common/Button.jsx";
import {pagePath} from "@/routes/pagePath.js";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";

const Home = () => {
  const {navigateTo} = useCustomNavigation();

  const handleUse = () => {
    navigateTo(pagePath.COMMUNITY);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 mt-40">
      <img src={icHome} alt="Home" className="w-52 h-52 max-md:w-40 max-md:h-40"/>
      <p className="text-black text-3xl font-semibold mt-5 max-md:text-2xl">{string.WELCOME}</p>
      <Button text={string.USE} onClick={handleUse} />
    </div>
  );
};

export default Home;