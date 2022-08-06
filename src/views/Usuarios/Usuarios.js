import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  Tooltip,
} from "reactstrap";
import userServices from "services/userServices";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

function Usuarios() {
  const [users, setUsers] = useState("");
  const [tooltipEditOpen, setTooltipEditOpen] = useState(false);
  const [tooltipDeleteOpen, setTooltipDeleteOpen] = useState(false);

  function handleClickTooltipEditOpen(id) {
    setTooltipEditOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }
  function handleClickTooltipDeleteOpen(id) {
    setTooltipDeleteOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }
  const deleteUser = async (id) => {
    try {
      await userServices.deleteUser(id);
      toast.error("Usuario eliminado", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getUsers();
    }catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await userServices.getUsers();
    console.log(res.data)
    setUsers(res.data.users);
  };
  return (
    <>
      <div className="content">
        <Card className="card-user">
          <CardHeader>
            <Row>
              <Col md="6">
                <CardTitle tag="h5">Usuarios</CardTitle>
              </Col>
              <Col md="6">
                <Row className="flex-column align-items-end align-align-self-end mr-2 mb-2">
                  <Link to="/admin/usuarios/crear-usuario">
                    <Button color="success">Agregar nuevo usuario</Button>
                  </Link>
                </Row>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="12">
                <Card className="card-plain">
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Nombre</th>
                          <th>Correo electrónico</th>
                          <th>Dirección</th>
                          <th>Núm. identificación</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 &&
                          users?.map((element) => (
                            <tr key={element.id}>
                              <td>
                                {element.first_name} {element.last_name}
                              </td>
                              <td>{element.email}</td>
                              <td>{element.adress}</td>
                              <td>{element.identification}</td>
                              <td>
                                <Link to={`/admin/usuarios/editar-usuario/${element.id}`}>
                                <Button
                                  id={`TooltipEdit${element.id}`}
                                  outline
                                  style={{ backgroundColor: "white" }}
                                >
                                  <AiFillEdit size="20px" color="#6bd098"/>
                                </Button>
                                </Link>
                                <Tooltip
                                  isOpen={tooltipEditOpen[element.id]}
                                  placement="top"
                                  target={`TooltipEdit${element.id}`}
                                  toggle={() =>
                                    handleClickTooltipEditOpen(element.id)
                                  }
                                >
                                  Editar
                                </Tooltip>
                                <Button
                                  id={`TooltipDelete${element.id}`}
                                  outline
                                  style={{ backgroundColor: "white", "&:hover":{backgroundColor: 'red'}}}
                                  onClick={() => deleteUser(element.id)}
                                >
                                  <AiFillDelete size="20px" color="#Ff4245"/>
                                </Button>
                                <Tooltip
                                  isOpen={tooltipDeleteOpen[element.id]}
                                  placement="top"
                                  target={`TooltipDelete${element.id}`}
                                  toggle={() =>
                                    handleClickTooltipDeleteOpen(element.id)
                                  }
                                >
                                  Eliminar
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Usuarios;
