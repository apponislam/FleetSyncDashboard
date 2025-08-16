
import { createBrowserRouter, Route } from "react-router-dom";
import Error from "../Components/Shared/Error";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";



import App from "../App";

import UserDetailsPage from "../pages/Dashboard/UserDetailsPage/UserDetailsPage";
import UserDetails from "../pages/Dashboard/UserDetailsPage/UserDetails";
import Connections from "../pages/Dashboard/connections/Connection";
import Subscription from "../pages/Dashboard/subscription/Subscription";




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
      },
      {
        path:"/connections",
        element:<div><Connections/></div>
      },
      {
        path:"/subscription",
        element:<div><Subscription/></div>

      }
 
   
    ]
  }

]);

export default router;