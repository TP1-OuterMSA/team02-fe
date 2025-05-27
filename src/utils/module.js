import { constant } from "@utils/constant.js";

const calcNutrition = (type, totalKcal, current) => {
  let kcalPerGram = 0;

  switch (type) {
    case constant.CARB:
    case constant.PROTEIN:
      kcalPerGram = 4;
      break;
    case constant.FAT:
      kcalPerGram = 9;
      break;
    default:
      kcalPerGram = 0; // 비타민, 칼슘 등은 칼로리 없음
  }

  const percentage = totalKcal > 0 ? ((current * kcalPerGram) / totalKcal) * 100 : 0;
  console.log(percentage)
  return percentage;
};

const module = {
  calcNutrition,
};

export default module;
