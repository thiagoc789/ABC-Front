import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const CreateEditUser = ({ title, buttonText, action, infoEdit }) => {
  const UserSchema = Yup.object().shape({
    username: Yup.string().required("Campo requerido"),
    first_name: Yup.string().required("Campo requerido"),
    last_name: Yup.string().required("Campo requerido"),
    email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .max(8, "No debe superar los 8 caracteres")
      .required("Campo requerido"),
    confirm_password: Yup.string()
      .max(8, "No debe superar los 8 caracteres")
      .required("Campo requerido"),
    role: Yup.string().required("Campo requerido"),
    identification: Yup.number()
      .typeError("Solo números")
      .max(9999999999)
      .min(0)
      .required("Campo requerido"),
    adress: Yup.string().required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      username: infoEdit ? infoEdit.username : "",
      first_name: infoEdit ? infoEdit.first_name : "",
      last_name: infoEdit ? infoEdit.last_name : "",
      email: infoEdit ? infoEdit.email : "",
      password: infoEdit ? infoEdit.password : "",
      confirm_password: infoEdit ? infoEdit.confirm_password : "",
      role: infoEdit ? infoEdit.role : "Administrador",
      identification: infoEdit ? infoEdit.identification : "",
      adress: infoEdit ? infoEdit.adress : "",
    },
    enableReinitialize: infoEdit ? true : false,
    validationSchema: UserSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-unused-vars
      const {password, confirm_password, ...rest } = values;
      if(password===confirm_password) {
        const {confirm_password, ...rest } = values;
        action(rest);
      } else {
        toast.success("Contraseñas no coinciden", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
  });
  return (
    <>
      <div className="content">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">{title}</CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Nombres</label>
                    <Input
                      placeholder="Nombres"
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.first_name && formik.errors.first_name
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.first_name && !!formik.errors.first_name
                      }
                    />
                    <FormFeedback>{formik.errors.first_name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="4">
                  <FormGroup>
                    <label>Apellidos</label>
                    <Input
                      placeholder="Apellidos"
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.last_name && formik.errors.last_name
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.last_name && !!formik.errors.last_name
                      }
                    />
                    <FormFeedback>{formik.errors.last_name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="4">
                  <FormGroup>
                    <label>Nombre de usuario</label>
                    <Input
                      placeholder="Nombre de usuario"
                      type="text"
                      id="username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.username && formik.errors.username
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.username && !!formik.errors.username
                      }
                    />
                    <FormFeedback>{formik.errors.username}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">
                      Correo electrónico
                    </label>
                    <Input
                      placeholder="Correo Electrónico"
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.email && !!formik.errors.email}
                    />
                    <FormFeedback>{formik.errors.email}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="4">
                  <FormGroup>
                    <label>Contraseña</label>
                    <Input
                      placeholder="*************************"
                      type="password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.password && !!formik.errors.password
                      }
                    />
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col className="px-1" md="4">
                  <FormGroup>
                    <label>Confirmar contraseña</label>
                    <Input
                      placeholder="*************************"
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.confirm_password &&
                        formik.errors.confirm_password
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.confirm_password &&
                        !!formik.errors.confirm_password
                      }
                    />
                    <FormFeedback>
                      {formik.errors.confirm_password}
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label>Número de identificación</label>
                    <Input
                      placeholder="C.C."
                      type="text"
                      id="identification"
                      name="identification"
                      value={formik.values.identification}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.identification &&
                        formik.errors.identification
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.identification &&
                        !!formik.errors.identification
                      }
                    />
                    <FormFeedback>{formik.errors.identification}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Cargo</label>
                    <Input
                      placeholder="Cargo"
                      type="select"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.role && formik.errors.role
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.role && !!formik.errors.role}
                    >
                      <option>Administrador</option>
                      <option>Usuario</option>
                    </Input>
                    <FormFeedback>{formik.errors.role}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Dirección</label>
                    <Input
                      placeholder="Calle 12 # 3 - 4, Cali"
                      type="text"
                      id="adress"
                      name="adress"
                      value={formik.values.adress}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.adress && formik.errors.adress
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.adress && !!formik.errors.adress}
                    />
                    <FormFeedback>{formik.errors.adress}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <div className="update">
                  <Link to="/admin/usuarios">
                    <Button className="btn-round" color="primary">
                      <i className="nc-icon nc-minimal-left" />
                      &nbsp; Regresar
                    </Button>
                  </Link>
                </div>
                <div className="update ">
                  <Button className="btn-round" color="primary" type="submit">
                    {buttonText}
                  </Button>
                </div>
              </Row>
            </form>
            <Button className="btn-round" color="primary" onClick={() => console.log(infoEdit)}>
              <i className="nc-icon nc-minimal-left" />
              &nbsp; Regresar
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
