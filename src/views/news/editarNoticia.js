import * as Yup from 'yup';
import axios from 'axios';
import { newsDataAll, newsDataComplete, eventSelected, updateNewsData } from '../../utils/newsAxios';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
//import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, Link, CircularProgress, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { NewsDropdown } from './news-dropdown';
import { ModalAlert } from '../../modals/modalAlert';
import newsServices from 'services/newsServices';
import eventServices from 'services/eventServices';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie';

/** 
 * @param {{}} props  
 * @returns React component.
 */
const NewsUpdateForm = (props) => {
  const [data, setData] = useState(false);
  const [newsName, setNewsName] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [newsTitle, setNewsTitle] = useState(false);
  const [newsDescription, setNewsDescription] = useState(false);
  const [newsSummary, setNewsSummary] = useState(false);
  const [newsState, setNewsState] = useState(false);
  const [nameEvent, setNameEvent] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [eventsDataState, setEventsDataState] = useState();
  const states = ['Activo', 'Inactivo']
  const history = useHistory();
  const cookies = new Cookies();
  const ID_user = cookies.get("token");
  const date = new Date()

  useEffect(() => {
    console.log(newsDataComplete);
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
  },[])

  const validationSchema = Yup.object({
    title: Yup
      .string().required('Porfavor ingrese un título').max(500),
    description: Yup
      .string().required('Requerido'),
    ID_event: Yup
      .string().required('Requerido'),
    summary: Yup
      .string().required('Es necesario escribir un resumen'),
    state: Yup
      .string().required("Requerido"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Title: newsDataComplete.Title,
      Description: newsDataComplete.Description,
      Summary: newsDataComplete.Summary,
      State: newsDataComplete.State,
      ID_event: newsDataComplete.ID_event,
    },
    validationSchema: validationSchema,
  });
  /**
   * This function executes petition to get the data of the news that user wants to update
   * and set state to display form.
   */
  const executeFunction = async () => {
    try {
      await newsDataAll(newsName)
      setDisplayForm(true)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    /**
    * We get the events registered in database
    * @param {} 
    */
    

    /**
     * This function verifies all validations and insert a news to database
     * @returns 
     */
    const onSubmit = async () => {
      if (!data) return;
      try {
        if (formik.isValid) {
          await updateNewsData(formik)
          setModal(true)
          formik.resetForm()
        }
        setData(false);
        setLoading(false)
        setModal(!modal)
        setDisplayForm(false);
        setLoadingSearch(false)
        setNewsName('')
      }
      catch (error) {
        console.log(error)
        setModalError(true)
        setLoading(false)
        setData(false)
      }
    }
    onSubmit();
  }, [data])


  /**
* This function validates fields
* @param {} e
*/
  const markErrors = async (e) => {
    const [resp] = await Promise.all([formik.validateForm]);

    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }
    formik.setErrors(resp);
    setData(true);
  }

  const updateNews = async () => {
    if (
      (formik.values.Description !== "" &&
        formik.values.ID_event !== "" &&
        formik.values.Title !== "",
      formik.values.Summary !== "")
    ) {
      console.log(formik.values);
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
        State: formik.values.State,
        Summary: formik.values.Summary,
        Title: formik.values.Title,
      };
      try{
        await newsServices.updateNews(newsDataComplete.id, data);
        toast.success("Noticia actualizada", {
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

  return (
    <form
      autoComplete="off"
      {...props}>
        <ToastContainer />
      <Card sx={{ width: 'auto', margin: 'auto', marginTop: '70px' }}>

        <Box sx={{ m: 1, gap: '12px', display: 'flex', alignContent: 'left' }}>

          <Typography sx={{ m: 1 }} variant="h4">
            Registrar Noticias
          </Typography>

          <Link href="/admin/noticias">
            <Button color="success" variant="contained">Noticias actuales</Button>
          </Link>

          <Link href="/admin/noticias/crearNoticia">
            <Button color="success" variant="contained">Registrar noticias</Button>
          </Link>

        </Box>

        <Divider />
        {!displayForm ?
          <CardContent>
            <Grid container spacing={3} >
              <NewsDropdown newsNameState={newsName} setNewsNameState={setNewsName}></NewsDropdown>
              <Grid item md={12} xs={12} >
                <LoadingButton
                  loading={loadingSearch}
                  color="success"
                  variant="contained"
                  disabled={newsName === ''}
                  onClick={() => executeFunction() && setLoadingSearch(!loadingSearch)}>
                  Buscar
                </LoadingButton>
              </Grid>
            </Grid>
          </CardContent> :
          <div>
            <CardContent>
              <Grid container spacing={3} >
                <Grid item md={12} xs={12} >
                  <TextField
                    sx={{ marginTop: '0.9rem' }}
                    fullWidth
                    error={Boolean(formik.touched.Title && formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                    label="Título"
                    name="Title"
                    onBlur={formik.handleBlur}
                    onChange={(event) => { formik.setFieldValue("Title", event.target.value) && setNewsTitle(true) }}
                    required
                    value={!newsTitle ? newsDataComplete.Title : formik.values.Title}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12} >
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
                    {eventsDataState ?
                      eventsDataState.map((option, key) => (<MenuItem value={option.id} key={key}>{option.Title}</MenuItem>)) :
                      <MenuItem disabled value="default" key="default"><CircularProgress sx={{ margin: 'auto' }}></CircularProgress> </MenuItem>
                    }
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12} >
                  <TextField
                    fullWidth
                    label="Resumen"
                    name="Summary"
                    id='Summary'
                    required
                    variant="outlined"
                    error={Boolean(formik.touched.Summary && formik.errors.Summary)}
                    helperText={formik.touched.Summary && formik.errors.Summary}
                    value={!newsSummary ? newsDataComplete.Summary : formik.values.Summary}
                    onChange={(event) => formik.setFieldValue("Summary", event.target.value) && setNewsSummary(true)}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item md={6} xs={12} >
                  <TextField
                    fullWidth
                    id="State"
                    name="State"
                    label="Seleccione el estado *"
                    select
                    error={Boolean(formik.touched.State && formik.errors.State)}
                    helperText={formik.touched.State && formik.errors.State}
                    value={!newsState ? newsDataComplete.State : formik.values.State}
                    onChange={(event) => formik.setFieldValue("State", event.target.value) && setNewsState(true)}
                    variant="outlined"
                  >
                    {states.map((option, key) => (
                      <MenuItem value={option} key={key}>{option}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={12} xs={12} sx={{ float: 'left', width: '50%' }}>
                  <TextareaAutosize
                    id="Description"
                    maxRows={10000}
                    style={formik.errors.description && formik.touched.description ? {
                      height: '9.3rem',
                      padding: '0.75rem',
                      borderRadius: '0.6rem',
                      width: '100%',
                      maxWidth: '100%',
                      maxHeight: '17rem',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '16px',
                      lineHeight: '24px',
                      border: '0.8px solid #e76063',
                      overflow: 'auto',
                      resize: 'vertical',
                      background: 'transparent'
                    } :
                      {
                        height: '9.3rem',
                        padding: '0.75rem',
                        border: '0.8px solid #E3E3E3',
                        borderRadius: '0.6rem',
                        width: '100%',
                        maxWidth: '100%',
                        maxHeight: '17rem',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '24px',
                        resize: 'vertical',
                        overflow: 'auto',
                        background: 'transparent'
                      }}
                    aria-label="Descripcion"
                    name="Description"
                    placeholder='Detalles *'
                    onChange={(event) => formik.setFieldValue("description", event.target.value) && setNewsDescription(true)}
                    onBlur={formik.handleBlur}
                    required
                    value={!newsDescription ? newsDataComplete.Description : formik.values.description}
                    variant="outlined"
                  />
                  {formik.errors.description && formik.touched.description ?
                    <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.description}</div>
                    : null}
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                <Link target="_blank" href={"https://res.cloudinary.com/dxx9kwg6t/" + newsDataComplete.Media_file}>
                  <>{"Imagen o video cargado"}
                  </></Link>
              </Grid>
            </CardContent>
            <Divider></Divider>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: '0.75rem', alignItems: 'center' }} >
              <div>
                <input
                  style={{ display: 'none' }}
                  id="Media_file"
                  type="file"
                  accept='.png, .jpg, jpeg, .mp4, .mkv'
                  name="Media_file"
                  required
                  onChange={(event) => formik.setFieldValue("media_file", event.target.files[0])}
                >
                </input>
                {formik.errors.Media_file && formik.touched.Media_file ?
                  <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.media_file}</div>
                  : null}
              </div>
              <LoadingButton
                loading={loading}
                color="success"
                variant="contained"
                onClick={() => { updateNews()}}>
                Actualizar Noticia
              </LoadingButton>
            </Box>
          </div>}
      </Card>
      {(modal == true) ? <ModalAlert
        title={"Noticia actualizada"}
        message={"La noticia fue actualizada exitosamente!"} modalState={modal}
        modalSuccess={true}
        routeURL={"/Noticias"}
        setModalState={setModal} /> : null
      }
      {(modalError == true) ?
        <ModalAlert
          title={"Noticia NO actualizada"}
          message={"La noticia NO se pudo actualizar!"} modalState={modalError}
          modalSuccess={false}
          setModalState={setModalError} /> : null
      }
    </form>
  )
}

export default NewsUpdateForm

