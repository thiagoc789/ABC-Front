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

export const ClientRegisterForm = ({ title, buttonText, action }) => {
  const UserSchema = Yup.object().shape({
    Name: Yup.string().required("Campo requerido"),
    Last_name: Yup.string().required("Campo requerido"),
    Email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .required("Campo requerido"),
    Password: Yup.string()
      .max(8, "No debe superar los 8 caracteres")
      .required("Campo requerido"),
    confirm_password: Yup.string()
      .max(8, "No debe superar los 8 caracteres")
      .required("Campo requerido"),
    Phone: Yup.number()
      .typeError("Solo números")
      .max(9999999999)
      .min(0)
      .required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Last_name: "",
      Email: "",
      Password: "",
      confirm_password: "",
      Phone: "",
    },
    validationSchema: UserSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-unused-vars
      console.log(values);
      const {Password, confirm_password, ...rest } = values;
      if(Password===confirm_password) {
        const {confirm_password, ...rest } = values;
        const final_data = {State: true, Role: 'Cliente', ...rest}
        action(final_data);
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
                <Col md="6">
                  <FormGroup>
                    <label>Nombres</label>
                    <Input
                      placeholder="Nombres"
                      type="text"
                      id="Name"
                      name="Name"
                      value={formik.values.Name}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.Name && formik.errors.Name
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.Name && !!formik.errors.Name
                      }
                    />
                    <FormFeedback>{formik.errors.Name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Apellidos</label>
                    <Input
                      placeholder="Apellidos"
                      type="text"
                      id="Last_name"
                      name="Last_name"
                      value={formik.values.Last_name}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.Last_name && formik.errors.Last_name
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.Last_name && !!formik.errors.Last_name
                      }
                    />
                    <FormFeedback>{formik.errors.Last_name}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">
                      Correo electrónico
                    </label>
                    <Input
                      placeholder="Correo Electrónico"
                      type="Email"
                      id="Email"
                      name="Email"
                      value={formik.values.Email}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.Email && formik.errors.Email
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.Email && !!formik.errors.Email}
                    />
                    <FormFeedback>{formik.errors.Email}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Contraseña</label>
                    <Input
                      placeholder="*************************"
                      type="password"
                      id="Password"
                      name="Password"
                      value={formik.values.Password}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.Password && formik.errors.Password
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.Password && !!formik.errors.Password
                      }
                    />
                    <FormFeedback>{formik.errors.Password}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="4">
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
                <Col md="6">
                  <FormGroup>
                    <label>Número de teléfono</label>
                    <Input
                      placeholder="Teléfono"
                      type="text"
                      id="Phone"
                      name="Phone"
                      value={formik.values.Phone}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.Phone &&
                        formik.errors.Phone
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.Phone &&
                        !!formik.errors.Phone
                      }
                    />
                    <FormFeedback>{formik.errors.Phone}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <div className="update">
                  <Link to="/">
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
          </CardBody>
        </Card>
      </div>
    </>
  );
};
