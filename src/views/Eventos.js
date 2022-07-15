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
import React, { Component, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
// react plugin used to create charts
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import userServices from "services/userServices";


const Eventos = () => {
  const [users, setUsers] = useState([]);
  const getEventos = async () => {
    const res = await userServices.getUsers();
    setUsers(res.data.users);
  }

  useEffect(()=> {
    getEventos();
  },[users])


  return (
    <div className="content">
      

              <Row>
              <div class="col-md-12 bg-light text-center">
              <a class="btn" href="nuevoEvento">Nuevo Evento</a>
              </div>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th className="text-right">Salary</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.adress}</td>
                  

                </tr>
              ))}
          </tbody>
          </Table>
              </CardBody>
            </Card>
          </Col>

          </Row>
    </div>
  )
}




export default Eventos;
