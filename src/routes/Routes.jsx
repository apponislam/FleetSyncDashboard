
import { createBrowserRouter, Route } from "react-router-dom";
import Error from "../Components/Shared/Error";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";



import App from "../App";

import UserDetailsPage from "../pages/Dashboard/UserDetailsPage/UserDetailsPage";
import UserDetails from "../pages/Dashboard/UserDetailsPage/UserDetails";
import Connections from "../pages/Dashboard/connections/Connection";
import Subscription from "../pages/Dashboard/subscription/Subscription";
import Verifications from "../pages/Dashboard/verifications/Verifications";
import Promotional from "../pages/Dashboard/promotional/Promotional";
import Settings from "../pages/Dashboard/settings/Settings";
import Profile from "../pages/Dashboard/settings/profile/Profile";
import ChangePassword from "../pages/Dashboard/settings/changePassword/ChangePassword";
import { SupportRequest } from "../pages/Dashboard/settings/supportRequest/SupportRequest";
import { About } from "../pages/Dashboard/settings/About";
import { PrivatePolicy } from "../pages/Dashboard/settings/PrivatePolicy";
import Terms from "../pages/Dashboard/settings/Terms";
import Promotion from "../pages/Dashboard/promotion/Promotion";




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

      },
      {
        path:"/verifications",
        element:<div><Verifications/></div>
      },
      {
        path:"/promotional",
        element:<div><Promotional/></div>
      },
      {
        path:"/promotion",
        element:<div><Promotion/></div>
      },
      {
        path:"/settings",
        element:<div><Settings/></div>
      },
      {
        path:"/settings/profile",
        element:<div><Profile/></div>
      },
      {
        path:"/settings/change-password",
        element:<div><ChangePassword/></div>
      },
      {
        path:"/settings/support-request",
        element:<div><SupportRequest/></div>
      },
      {
        path:"/settings/about",
        element:<div><About/></div>
      },
      {
        path:"/settings/privacy",
        element:<div><PrivatePolicy/></div>
      },
      {
        path:"/settings/terms",
        element:<div><Terms/></div>
      },
     
   
    ]
  }

]);

export default router;