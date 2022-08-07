import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import userServices from "services/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie/es6";

const Login = () => {
  const [stateButton, setStateButton] = useState(true);
  const captcha = useRef(null);
  const cookies = new Cookies();

  const onChangeButton = () => {
    if (captcha.current.getValue() !== null) {
      setStateButton(false);
      console.log(captcha.current.getValue());
    }
  };

  const LoginSchema = Yup.object().shape({
    user_id: Yup.string(),
    email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, "Contraseña debe de tener al menos 6 caracteres")
      .required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      user_id: "",
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      getLogin(values);
    },
  });

  const getLogin = async (values) => {
    try {
      const res = await userServices.login(values);
      console.log(res.data);

      toast.success('Inicio de sesión exitoso', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      cookies.set("token", res.data, { path: "/" });
      if(res.data.role === 'admin') {
        window.location.href = "/admin/dashboard";
      }
      if(res.data.role === 'user') {
        window.location.href = "/admin/eventos";
      }
      
      //window.location.href = "/admin/dashboard";
    } catch (e) {
      console.log(e);
      toast.error('Correo electrónico o contraseña incorrectos', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return <Redirect to={"/admin/dashboard"} />;
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("token")) {
      window.location.assign("./admin/dashboard");
    }
  }, []);

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
        <Col>
          <Card
            className="card-user mx-auto my-auto"
            style={{ height: "auto", width: "320px" }}
          >
            <CardHeader>
              <CardTitle tag="h4">Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Correo electrónico</label>
                      <Input
                        id="user_id"
                        name="user_id"
                        value={formik.values.user_id}

                        onChange={formik.handleChange}
                        type="email"
                        placeholder="email@example.com"
                        className={`form-control ${
                          formik.touched.user_id && formik.errors.user_id
                            ? "is-invalid"
                            : ""
                        }`}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.user_id && !!formik.errors.user_id}
                      />
                      <FormFeedback>{formik.errors.user_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Contraseña</label>
                      <Input
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type="password"
                        placeholder="**********"
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
                </Row>
                <Row>
                  <div
                    style={{ marginBottom: "10px" }}
                    className="update ml-auto mr-auto"
                  >
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6Lcil6AgAAAAAAN34dcXxzNfvz_jCfg-6Bkfqz-4"
                      onChange={onChangeButton}
                    />
                  </div>
                </Row>
                <Row>
                  <div
                    style={{ marginBottom: "10px" }}
                    className="update ml-auto mr-auto"
                  >
                    <Button
                      className="btn-round"
                      color="success"
                      type="submit"
                      disabled={stateButton}
                    >
                      Iniciar sesion
                    </Button>
                    <ToastContainer />
                  </div>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
