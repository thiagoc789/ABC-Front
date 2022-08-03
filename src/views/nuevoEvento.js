import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import eventServices from 'services/eventServices';



const App = () => {

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
    form_data.append('title', tutorial.title);
    form_data.append('content', tutorial.content);
    form_data.append('image', url);
    console.log(url)
    eventServices.createUser(form_data)
    window.location = "eventos"
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

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <Container component="main" maxWidth="xs">
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
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

  )
}
export default App;