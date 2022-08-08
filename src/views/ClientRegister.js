import { ClientRegisterForm } from "components/Users/ClientRegisterForm";
import React from "react";
import { Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    FormGroup,
    Input,
    Row,
    FormFeedback, } from 'reactstrap';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import userServices from "services/userServices";

function ClientRegister() {

  const history = useHistory();
  const postUser = async (values) => {
    try {
      await userServices.createUser(values);
      toast.success("Usuario creado", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push('/')
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      style={{
        height: "100%",
        maxWidth: "100%",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
        <Row className="flex-column align-items-center align-self-center justify-content-center">
    <ClientRegisterForm
      title={'Registro de usuario'}
      buttonText={'Registrar'}
      action={postUser}
    />
    </Row>
    </Container>
  );
}

export default ClientRegister;