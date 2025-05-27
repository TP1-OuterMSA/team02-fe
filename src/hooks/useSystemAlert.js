export const useSystemAlert = () => {

  const basicAlert = (message) => {
    alert(message);
  }

  const confirmAlert = (message) => {
    return confirm(message);
  }

  return {basicAlert, confirmAlert}
}