  import React, { useState } from 'react'
  import Container from '@material-ui/core/Container';
  import eventServices from 'services/eventServices';
  import {
  Card,
                            CardHeader,
                            CardBody,
                            CardTitle,
                            Table,
                            Row,
                            Col,
                          } from "reactstrap";


                          const App = () => {

                            const initialTutorialState = {
                              title: "",
                              content: ""
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
                              <Container  component="main" maxWidth="xs">
                              <div className="caja"> <h1 style={{ color:"#F4F3EF" }}> /n </h1></div>
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
                                      <label htmlFor="title"><b>Nombre de la Actividad</b></label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="Title"
                                        required
                                        value={tutorial.title}
                                        onChange={handleInputChange}
                                        name="title"
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="content"><b>Descripción</b></label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="Details"
                                        required
                                        value={tutorial.content}
                                        onChange={handleInputChange}
                                        name="content"
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="content"><b>Fecha comienzo</b></label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="comienzo"
                                        required
                                        value={tutorial.content}
                                        onChange={handleInputChange}
                                        name="content"
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="content"><b>Fecha fin</b></label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="fin"
                                        required
                                        value={tutorial.content}
                                        onChange={handleInputChange}
                                        name="content"
                                      />
                                    </div>

                                    
                                    <button style={{ color:"#212120" }} className="btn btn-succes">
                                      Crear nueva actividad 
                                    </button>
                                  </div>
                                )}
                              </div>
                              </Container>
                            )
                          }
                          export default App;