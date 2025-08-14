
import { createBrowserRouter, Route } from "react-router-dom";
import Error from "../Components/Shared/Error";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";



import App from "../App";

import UserDetailsPage from "../pages/Dashboard/UserDetailsPage/UserDetailsPage";
import UserDetails from "../pages/Dashboard/UserDetailsPage/UserDetails";



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
      {
        path:"/user-details-page",
        element:<div><UserDetailsPage/></div>

      },
      {
        path:"/user-details/:id",
        element:<div><UserDetails/></div>
      }
 
   
    ]
  }

]);

export default router;