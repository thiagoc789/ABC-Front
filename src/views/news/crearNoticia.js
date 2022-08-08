import axios from "axios";
import * as Yup from "yup";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  MenuItem,
  CircularProgress,
  Typography,
  Button,
  Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { createNews } from "../../utils/newsAxios";
import { useEffect, useState } from "react";
import { ModalAlert } from "../../modals/modalAlert";
import { Row } from "reactstrap";
import eventServices from "services/eventServices";
import newsServices from "services/newsServices";
import Cookies from "universal-cookie/es6";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";

/**
 * @param {{}} props
 * @returns React component.
 */
const NewsRegisterForm = (props) => {
  const history = useHistory();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [eventsDataState, setEventsDataState] = useState("");
  const cookies = new Cookies();
  const date = new Date();
  const ID_user = cookies.get("token");
  const formik = useFormik({
    initialValues: {
      Title: "",
      Description: "",
      Summary: "",
      ID_event: "",
      Media_file: null,
    },
    validationSchema: Yup.object().shape({
      Title: Yup.string().required("Porfavor ingrese un título").max(500),
      Description: Yup.string().required("Requerido"),
      ID_Event: Yup.string().required("Requerido"),
      Summary: Yup.string().required("Porfavor ingrese el resumen"),
      //Media_file: Yup.mixed(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    console.log(ID_user);
    const eventsData = async () => {
      try {
        const eventsRequest = await eventServices.getEvents();
        console.log(eventsRequest.data);
        setEventsDataState(eventsRequest.data);
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    };
    eventsData();
  }, []);

  const postNews = async () => {
    if (
      (formik.values.Description !== "" &&
        formik.values.ID_event !== "" &&
        formik.values.Title !== "",
      formik.values.Summary !== "")
    ) {
      const date = new Date();
      const data = {
        Description: formik.values.Description,
        Edition_date:
          date.getFullYear() +
          "-" +
          parseInt(date.getMonth() + 1) +
          "-" +
          date.getDate(),
        Finish_date:
          date.getFullYear() +
          "-" +
          parseInt(date.getMonth() + 1) +
          "-" +
          date.getDate(),
        ID_event: formik.values.ID_event,
        ID_user: ID_user,
        Media_file: "",
        State: "Activo",
        Summary: formik.values.Summary,
        Title: formik.values.Title,
      };
      try{
        await newsServices.createNews(data);
        toast.success("Noticia creada", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history.push('/admin/noticias');
      }catch(e) {
        console.log(e);
      }
    }
  };

  /**
   * This function validates fields
   * @param {} e
   */
  /*const markErrors = async (e) => {
    const [resp] = await Promise.all([formik.validateForm]);
    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }
    formik.setErrors(resp);
    setData(true);
    setLoading(!loading)
  }*/

  /*useEffect(() => {
    /**
    * We get the events registered in database
    * @param {} 
    */
  /*
    const eventsData = async () => {
      try {
        const eventsRequest = await eventServices.getEvents();
        setEventsDataState(eventsRequest.data)
      }
      catch (error) {
        console.log(error)
        return [null, error]
      }
    }
    /**
     * This function verifies all validations and insert a news to database
     * @returns 
     */
  /*
    const onSubmit = async () => {
      if (!data) return;
      try {
        if (!(formik.values.Title === "" || formik.values.Media_file === null ||
          formik.values.Description === "" || formik.values.Summary === "" ||
          formik.values.State === "" || formik.values.ID_event === "" ||
          formik.values.Finish_date === "")) {
          if (formik.isValid) {
            //await createNews(formik)
            setModal(true)
            formik.resetForm()
          }
          setLoading(false)
          setData(false)
        }
        else {
          setModalError(true);
        }
        setLoading(false)
        setData(false)
      }
      catch (error) {
        console.log(error)
        setModalError(true)
        setLoading(false)
        setData(false)
      }
    }
    onSubmit();
    
    eventsData();
  }, [data])*/

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="content">
        <Row>
          <Card sx={{ width: "1100", margin: "auto", marginTop: "70px" }}>
            <Box
              sx={{ m: 1, gap: "12px", display: "flex", alignContent: "left" }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                Registrar Noticias
              </Typography>

              <Link href="/admin/noticias">
                <Button color="success" variant="contained">
                  Noticias actuales
                </Button>
              </Link>

              <Link href="/admin/noticias/editarNoticia">
                <Button color="success" variant="contained">
                  Editar Noticia
                </Button>
              </Link>
            </Box>
            <ToastContainer />
            <Divider />

            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(formik.touched.Title && formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                    id="Title"
                    label="Título"
                    name="Title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.Title}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="ID_event"
                    name="ID_event"
                    label="Seleccione el evento *"
                    select
                    error={Boolean(
                      formik.touched.ID_event && formik.errors.ID_event
                    )}
                    helperText={
                      formik.touched.ID_event && formik.errors.ID_event
                    }
                    value={formik.values.ID_event}
                    onChange={formik.handleChange}
                    variant="outlined"
                  >
                    {eventsDataState ? (
                      eventsDataState.map((option, key) => (
                        <MenuItem value={option.id} key={key}>
                          {option.Title}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="default" key="default">
                        <CircularProgress
                          sx={{ margin: "auto" }}
                        ></CircularProgress>{" "}
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}></Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Resumen"
                    id="Summary"
                    name="Summary"
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                    error={Boolean(
                      formik.touched.Summary && formik.errors.Summary
                    )}
                    helperText={formik.touched.Summary && formik.errors.Summary}
                    value={formik.values.Summary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item md={12} xs={12} sx={{ float: "left", width: "50%" }}>
                  <TextareaAutosize
                    className="text_area_news"
                    id="Description"
                    maxRows={10000}
                    style={
                      formik.errors.Description && formik.touched.Description
                        ? {
                            height: "17rem",
                            padding: "0.75rem",
                            borderRadius: "0.6rem",
                            width: "100%",
                            maxWidth: "100%",
                            maxHeight: "17rem",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "24px",
                            border: "0.8px solid #e76063",
                            overflow: "auto",
                            resize: "vertical",
                            background: "transparent",
                            border: "0.8px solid #e76063",
                            overflow: "auto",
                            resize: "vertical",
                          }
                        : {
                            height: "17rem",
                            padding: "0.75rem",
                            border: "0.8px solid #E3E3E3",
                            borderRadius: "0.6rem",
                            width: "100%",
                            maxWidth: "100%",
                            maxHeight: "17rem",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "24px",
                            resize: "vertical",
                            overflow: "auto",
                            background: "transparent",
                            resize: "vertical",
                            overflow: "auto",
                          }
                    }
                    aria-label="Descripcion"
                    name="Description"
                    placeholder="Detalles *"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    value={formik.values.Description}
                    variant="outlined"
                  />
                  {formik.errors.Description && formik.touched.Description ? (
                    <div style={{ color: "#e76063", fontSize: "0.75rem" }}>
                      {formik.errors.Description}
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  id="Media_file"
                  type="file"
                  accept=".png, .jpg, jpeg, .mp4, .mkv"
                  name="Media_file"
                  onChange={(event) =>
                    formik.setFieldValue("Media_file", event.target.files[0])
                  }
                ></input>
                {formik.errors.Media_file && formik.touched.Media_file ? (
                  <div style={{ color: "#e76063", fontSize: "0.75rem" }}>
                    {formik.errors.Media_file}
                  </div>
                ) : null}
              </div>
              <LoadingButton
                loading={loading}
                color="success"
                variant="contained"
                type="submit"
                onClick={() => postNews()}
              >
                Registrar Noticia
              </LoadingButton>
            </Box>
          </Card>
        </Row>
      </div>
      {modal == true ? (
        <ModalAlert
          title={"Noticia registrada"}
          message={"La noticia fue registrada exitosamente!"}
          modalState={modal}
          modalSuccess={true}
          routeURL={"/Noticias"}
          setModalState={setModal}
        />
      ) : null}
      {modalError == true ? (
        <ModalAlert
          title={"Noticia NO registrada"}
          message={"La noticia NO se pudo registrar, complete todos los campos"}
          modalState={modalError}
          modalSuccess={false}
          setModalState={setModalError}
        />
      ) : null}
    </form>
  );
};
export default NewsRegisterForm;
