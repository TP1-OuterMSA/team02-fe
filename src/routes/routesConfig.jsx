import {pagePath} from "@/routes/pagePath.js";

import RootLayout from "@layout/RootLayout.jsx";

import Home from "@pages/Home.jsx";
import Diet from "@pages/Diet.jsx";
import Nutrition from "@pages/Nutrition.jsx";
import Community from "@pages/Community.jsx";
import CommunityDetail from "@pages/CommunityDetail.jsx";
import CommunityPost from "@pages/CommunityPost.jsx";
import Match from "@pages/Match.jsx";

const routesConfig = [{
  path: pagePath.ROOT,
  element: <RootLayout />,
  children: [
    {index:true, element: <Home />},
    {path: pagePath.DIET, element: <Diet />},
    {path: pagePath.NUTRITION, element: <Nutrition />},
    {path: pagePath.COMMUNITY, element: <Community />},
    {path: pagePath.COMMUNITYDETAIL, element: <CommunityDetail />},
    {path: pagePath.POST, element: <CommunityPost />},
    {path: pagePath.MATCH, element: <Match />},
  ]
}];

export default routesConfig;