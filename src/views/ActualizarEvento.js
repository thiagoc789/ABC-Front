import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import eventServices from "services/eventServices";
import Container from '@material-ui/core/Container';
import routes from "routes.js";
import { useParams } from 'react-router-dom';
import axios from 'axios';


var ps;

function Dashboard(props) {
 

  const { id } = useParams();

  const initialTutorialState = {
    Title: "",
    Details: "",
    Space: "",
    Cost: ""
  };

  const [imagen, setImagen] = useState("");
  const [url, setUrl] = useState("");
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };


  const saveTutorial = () => {
    let form_data = new FormData();
    form_data.append('Title:', tutorial.Title);
    form_data.append('Details:', tutorial.Details);
    form_data.append('State:', tutorial.Details);
    form_data.append('Space:', tutorial.Space);
    form_data.append('Cost:', tutorial.Cost);
    console.log(form_data)
    axios.put(`http://abc-app-univalle.herokuapp.com/Events/${id}/`, form_data);
    window.location.href = `/admin/evento/${id}`
    
  };

  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    axios.get(`http://abc-app-univalle.herokuapp.com/Events/${id}/`)
      .then((res) => {
        setTutorial(res.data);
        
      })
      .catch(console.error);
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
      })
      .catch(err => console.log(err))

  }

  return (

    <div className="wrapper">
      <div className="caja"> <h1 style={{ color: "#F4F3EF" }}> /n </h1></div>
      <p class="h2 text-center">Actualizar Evento {id}</p>
      <div class="col-md-30 bg-light text-center">
        <body class="m-0 row justify-content-center">
          <div class="col-md-30 bg-light text-center">
          <Container component="main" maxWidth="xs">
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" >
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.Title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Detalles</label>
            <input
              type="text"
              className="form-control"
              id="Details"
              required
              value={tutorial.Details}
              onChange={handleInputChange}
              name="content"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Estado</label>
            <input
              type="text"
              className="form-control"
              id="State"
              required
              value={tutorial.Details}
              onChange={handleInputChange}
              name="content"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Ubicacion</label>
            <input
              type="text"
              className="form-control"
              id="Space"
              required
              value={tutorial.Space}
              onChange={handleInputChange}
              name="content"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Costo</label>
            <input
              type="text"
              className="form-control"
              id="Cost"
              required
              value={tutorial.Cost}
              onChange={handleInputChange}
              name="content"
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="content">Subir imagen</label>
            <input
              type="file"
              className="form-control"
              required
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </div>
          <div class="input-group-btn">
                  <button style={{ color: "#212120" }} className="btn btn-success" onClick={uploadImage}>
                    <b>Upload</b>
                  </button>
                </div>

        <img src={url} />
        {url.length>0 && <p>{url}</p>}
          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
    </Container>
          </div>
        </body>
      </div>
    </div>

  );
}

export default Dashboard;
