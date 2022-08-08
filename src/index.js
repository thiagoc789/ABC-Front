/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Evento from "views/Evento.js";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Login from "views/Login";
import AdminLayout from '../src/layouts/Admin';
import ClientRegister from 'views/ClientRegister';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/*<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/admin/dashboard" />*/}
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      {/*<Redirect to="/admin/dashboard" />*/}
      <Route exact path='/' render={() => <Login />} />
      <Route exact path='/registrar' render={() => <ClientRegister />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
