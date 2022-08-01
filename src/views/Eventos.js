import { useState, useEffect } from "react";

import API from "./api";
import {
  UncontrolledAlert,
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";



const AddMovie = ({ onAdd }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    API.get("/")
      .then((res) => {
        setMovies(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { id: id, title: title, content: content, image: image };
    API.post("/", item).then(() => refreshMovies());
  };

  const onUpdate = (id) => {
    let item = { id: id };
    API.patch(`/${id}/`, item).then((res) => refreshMovies());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshMovies());
  };

  function selectMovie(id) {
    let item = movies.filter((movie) => movie.id === id)[0];
    setId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image);
  }

  return (
    <div className="content">
                    <Row>
              <div class="col-md-12 bg-light text-center">
              <a class="btn" href="nuevoEvento">Nuevo Evento</a>
              </div>
              <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
          {movies.map((movie, index) => {
                return (
                  <tr key="">
                    <th scope="row">{movie.id}</th>
                    <td> {movie.title}</td>
                    <td>{movie.content}</td>
                    <img src={movie.image} alt='image' width='100%'/>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectMovie(movie.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(movie.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
         
          </Table>
              </CardBody>
            </Card>
          </Col>

          </Row>
    </div>
  );
};

export default AddMovie;
