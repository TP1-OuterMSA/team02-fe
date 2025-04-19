import {useState} from "react";

export const useCustomCalcKcal = () => {
  const [kcal, setKcal] = useState();

  const gramToKcal = (gram, kcal) => {
    const perGram = kcal/gram;
    return perGram;
  }


  return {gramToKcal}
}