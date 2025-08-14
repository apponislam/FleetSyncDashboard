
import { createBrowserRouter, Route } from "react-router-dom";
import Error from "../Components/Shared/Error";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";



import App from "../App";



const router = createBrowserRouter([
      
  {
    path:"/",
    element:<App></App>,
    errorElement:<div> <Error/> </div>  ,
    children:[
      {
        path:"",
        element:<div><Dashboard/></div>
      },
 
   
    ]
  }

]);

export default router;