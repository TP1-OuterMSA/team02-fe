export const useCustomWindowNavigation = () => {

  const navigateToWindow = (url = "") => {
    const targetUrl = import.meta.env.VITE_APP_TARGET_URL + url;
    window.location.href = targetUrl;
  }

  return {navigateToWindow}

}