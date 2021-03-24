/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./views/Super_user/Dashboard.js";
import TableList from "./views/Super_user/TableList.js";
import BrunchesList from "./views/Super_user/BrunchesList.js";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/members",
    name: "members",
    icon: "nc-icon nc-single-02",
    component: TableList,
    layout: "/admin",
  },

     {
    path: "/brunches",
    name: "brunches",
    icon: "nc-icon nc-chart",
    component: BrunchesList,
    layout: "/admin",
  },


];

export default dashboardRoutes;
