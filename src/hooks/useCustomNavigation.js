import {useNavigate} from "react-router-dom";

export const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (destination) => {
    navigate(destination);
  }

  const navigateBack = () => {
    navigate(-1);
  }

  return {navigateTo, navigateBack}
}