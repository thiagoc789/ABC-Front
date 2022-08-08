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
import { useEffect, useState } from "react";
import { ModalAlert } from "../modals/modalAlert";
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
const EventRegisterForm = (props) => {
  const [url, setUrl] = useState("");
  const [imagen, setImagen] = useState("");
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
      Details: "",
      State: "",
      Space: "",
      Cost: "",
      Media_file: "",
    },
    validationSchema: Yup.object().shape({
      Title: Yup.string().required("Porfavor ingrese un título").max(500),
      Details: Yup.string().required("Requerido"),
      State: Yup.string().required("Requerido"),
      Space: Yup.string().required("Porfavor ingrese el lugar"),
      Cost: Yup.string().required("Porfavor ingrese el costo"),
      //Media_file: Yup.mixed(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
  }, []);

  const postNews = async () => {

    const date = new Date();
    const data = {
      Details: formik.values.Details,
      Start_date:
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
      Media_file: formik.values.Media_file,
      State: "Activo",
      Cost: formik.values.Cost,
      Space: formik.values.Space,
      Title: formik.values.Title,
    };
    try {
      await axios.post(`http://abc-app-univalle.herokuapp.com/Events/`, data);
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
      history.push('/admin/eventos');
    } catch (e) {
      console.log(e);

    }
  };

  const uploadImage = () => {
    const data = new FormData()
    data.append("file", imagen)
    data.append("upload_preset", "wansxszh")
    data.append("cloud_name", "Structum")
    fetch("https://api.cloudinary.com/v1_1/Structum/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        setUrl(data.url)
        console.log(url)
      })
      .catch(err => console.log(err))

  }


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="content">
        <Row>
          <Card sx={{ width: "1100", margin: "auto", marginTop: "70px" }}>
            <Box
              sx={{ m: 1, gap: "12px", display: "flex", alignContent: "center" }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                Registrar Evento
              </Typography>

              <Link href="/admin/noticias">
                <Button color="success" variant="contained">
                  Eventos
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

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Detalles"
                    id="Details"
                    name="Details"
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                    error={Boolean(
                      formik.touched.Details && formik.errors.Details
                    )}
                    helperText={formik.touched.Details && formik.errors.Details}
                    value={formik.values.Details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Estado"
                    id="State"
                    name="State"
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                    error={Boolean(
                      formik.touched.State && formik.errors.State
                    )}
                    helperText={formik.touched.State && formik.errors.State}
                    value={formik.values.State}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Lugar"
                    id="Space"
                    name="Space"
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                    error={Boolean(
                      formik.touched.Space && formik.errors.Space
                    )}
                    helperText={formik.touched.Space && formik.errors.Space}
                    value={formik.values.Space}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Costo"
                    id="Cost"
                    name="Cost"
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                    error={Boolean(
                      formik.touched.Cost && formik.errors.Cost
                    )}
                    helperText={formik.touched.Cost && formik.errors.Cost}
                    value={formik.values.Cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                <div >
                  <label><b>Subir imagen</b></label>
                  <div class="input-group">
                    <input type="file" class="form-control" required onChange={(e) => setImagen(e.target.files[0])} />
                    <div class="input-group-btn">
                      <button style={{ color: "#212120" }} className="btn btn-success" onClick={uploadImage}>
                        <b>Upload</b>
                      </button>
                    </div>
                  </div>
                </div>
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label={url}
                    id="Media_file"
                    name="Media_file"
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                    error={Boolean(
                      formik.touched.Media_file && formik.errors.Media_file
                    )}
                    helperText={formik.touched.Media_file && formik.errors.Media_file}
                    value={formik.values.Media_file}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
export default EventRegisterForm;