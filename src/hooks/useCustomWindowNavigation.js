export const useCustomWindowNavigation = () => {

  const navigateToWindow = (url = "") => {
    const targetUrl = import.meta.env.VITE_ABSOLUTE_URL + url;
    window.location.href = targetUrl;
  }

  return {navigateToWindow}

}