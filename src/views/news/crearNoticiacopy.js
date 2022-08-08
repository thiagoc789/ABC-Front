//import axios from 'axios'
import * as Yup from 'yup';
import Container from '@material-ui/core/Container';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { createNews } from '../../utils/newsAxios';
import { useEffect, useState } from 'react';
import { ModalAlert } from '../../modals/modalAlert';
import BackButton from '../../BackButton';
import { Row } from 'reactstrap';


/** 
 * @param {{}} props  
 * @returns React component.
 */
const NewsRegisterForm = (props) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [eventsDataState, setEventsDataState] = useState('')
  const date = new Date()
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      summary: '',
      //When user creates a news default state is active
      state: 'Activo',
      event_name: '',
      media_file: null,
      edition_date: date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + "-" + date.getDate(),
      finish_date: new Date()
    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Porfavor ingrese un título').max(500),
      description: Yup
        .string().required('Requerido'),
      event_name: Yup
        .string().required('Requerido'),
      summary: Yup
        .string().required('Porfavor ingrese el resumen'),
      media_file: Yup
        .mixed().required('Porfavor seleccione un archivo (jpg,jpeg,mp4,mkv)'),
      state: Yup
        .string().required("Requerido"),
      finish_date: Yup
        .string().required("Requerido")
    })
  });



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
    setLoading(!loading)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Container component="main" maxWidth="xs">
        <div className="caja"> <h1 style={{ color: "#F4F3EF" }}> /n </h1></div>
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title"><b>Título</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="Space"
                  error={Boolean(formik.touched.title && formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  label="Título"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.title}
                  variant="outlined"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content"><b>Seleccione Evento</b></label>
                <select
                  fullWidth
                  id="event_name"
                  name="event_name"
                  label="Seleccione el evento *"
                  select
                  error={Boolean(formik.touched.event_name && formik.errors.event_name)}
                  helperText={formik.touched.event_name && formik.errors.event_name}
                  value={formik.values.event_name}
                  onChange={formik.handleChange}
                  variant="outlined"
                />
                <option value = 
                {eventsDataState ?
                  eventsDataState.map((option, key) => (<MenuItem value={option.Title} key={key}>{option.Title}</MenuItem>)) :
                  <MenuItem disabled value="default" key="default"><CircularProgress sx={{ margin: 'auto' }}></CircularProgress> </MenuItem>
                }></option>
              </div>

              <div className="form-group">
                <label htmlFor="content"><b>Resumen</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="Space"
                  fullWidth
                  label="Resumen"
                  name="summary"
                  required
                  variant="outlined"
                  SelectProps={{ native: true }}
                  error={Boolean(formik.touched.summary && formik.errors.summary)}
                  helperText={formik.touched.summary && formik.errors.summary}
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="form-group">
                <input
                  className='text_area_news'
                  id="description"
                  maxRows={10000}
                  style={formik.errors.description && formik.touched.description ? {
                    height: '17rem',
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
                    background: 'transparent',
                    border: '0.8px solid #e76063',
                    overflow: 'auto',
                    resize: 'vertical'
                  } :
                    {
                      height: '17rem',
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
                      background: 'transparent',
                      resize: 'vertical',
                      overflow: 'auto'
                    }}
                  aria-label="Descripcion"
                  name="description"
                  placeholder='Detalles *'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.description}
                  variant="outlined"
                />
                {formik.errors.description && formik.touched.description ?
                  <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.description}</div>
                  : null}
              </div>

              <div className="form-group">
                <label htmlFor="content"><b>Subir imagen</b></label>
                <input
                  id="media_file"
                  type="file"
                  accept='.png, .jpg, jpeg, .mp4, .mkv'
                  name="media_file"
                  required
                  onChange={(event) => formik.setFieldValue("media_file", event.target.files[0])}
                >
                </input>
                {formik.errors.media_file && formik.touched.media_file ?
                  <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.media_file}</div>
                  : null}
              </div>

              <button
                loading={loading}
                color="primary"
                variant="contained"
                onClick={(e) => { markErrors(e) && setLoading(!loading) }}>
                Registrar Noticia
              </button>
            </div>
          )}
        </div>
      </Container>
    </form>
  );
}
export default NewsRegisterForm;