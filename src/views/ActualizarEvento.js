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


var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  const { id } = useParams();

  const initialTutorialState = {
    title: "",
    content: "",
    image: ""
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
    form_data.append('title:', tutorial.title);
    form_data.append('content:', tutorial.content);
    form_data.append('image:', tutorial.image);
    console.log(form_data)
    eventServices.updateUser(id, form_data);
    
  };

  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    eventServices.getSingleUser(id)
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
      <p class="h2 text-center">Actualizar Evento</p>
      <div class="col-md-30 bg-light text-center">
        <a class="btn" href="nuevoEvento">{id}</a>
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <input
              type="text"
              className="form-control"
              id="content"
              required
              value={tutorial.content}
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

        <button onClick={uploadImage}>Upload</button> 

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

      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}

      />
    </div>

  );
}

export default Dashboard;
