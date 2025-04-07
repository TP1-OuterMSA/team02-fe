import './App.css'
import { useRoutes } from "react-router-dom";
import RoutesConfig from "@/routes/routesConfig.jsx";
import {ToastContainer} from "react-toastify";

function App() {
  const router = useRoutes(RoutesConfig);

  return (
    <div>
      {router}
      <ToastContainer/>
    </div>
  )
}

export default App
