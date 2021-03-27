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
import React from "react";
import ReactDOM from "react-dom";
import Login from './views/Login';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/light-bootstrap-dashboard-react.css";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "./layouts/Admin.js";
import ViewerLayout from "./layouts/viewer";
import BrunchAdminLayout from "./layouts/BrunchAdmin";
import BrunchMemberLayout from "./layouts/BrunchMember";
import Print from "./layouts/Print";
import Export from "./layouts/Export";
import PDF from "./layouts/PDF";
import StatementPrint from "./layouts/StatementPrint";

ReactDOM.render(
  <BrowserRouter>
    <Switch>


        <Route path="/helper/print" >
            <Print />
        </Route>
        <Route path="/helper/statement/print" >
            <StatementPrint />
        </Route>
        <Route path="/helper/Export" >
            <Export />
        </Route>
        <Route path="/helper/PDF" >
            <PDF />
        </Route>

      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/viewer" render={(props) => <ViewerLayout {...props} />} />
      <Route path="/BrunchAdmin" render={(props) => <BrunchAdminLayout {...props} />} />
      <Route path="/BrunchMember" render={(props) => <BrunchMemberLayout {...props} />} />
        <Route path="/Login"  >
            <Login />
        </Route>
      <Redirect from="/" to="/Login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
