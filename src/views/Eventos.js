import { useState, useEffect } from "react";
import eventServices from "services/eventServices";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import API from "./api";
import {
  UncontrolledAlert,
  Alert,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

import CardGroup from 'react-bootstrap/CardGroup';



const AddMovie = ({ onAdd }) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    eventServices.getUsers()
      .then((res) => {
        setMovies(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { title, content, image };
    eventServices.createUser(item).then(() => refreshMovies());
  };

  const onUpdate = (id) => {
    let item = { title };
    eventServices.updateUser(id, item).then((res) => refreshMovies());
  };

  const onDelete = (id) => {
    eventServices.deleteUser(id).then((res) => refreshMovies());
  };

  function selectMovie(id) {
    let item = movies.filter((movie) => movie.id === id)[0];
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image);
    setId(item.id);
    console.log(item)
  }



  return (
    <div className="content">
      <p class="h2 text-center">Lista De Eventos</p>
      <div class="col-md-11 bg-light text-right">
        <a class="btn" href="nuevoEvento">Nuevo Evento</a>
        <Row md={3} className="g-4">
          {Array.from(movies).map((movie, index) => {

            return (
              <div class="row text-center">
                <Card style={{ width: '40rem' }}>
                  <Card.Text>
                    {movie.id}
                  </Card.Text>
                  <Card.Img variant="top" src={movie.image} />
                  <Card.Body >
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      {movie.content}
                    </Card.Text>
                    <Card.Text>
                      {movie.created_at}
                    </Card.Text>
                    <Button variant="primary">Detalles</Button>
                    <button onClick={() => selectMovie(movie.id)} type="button" class="btn btn-info">Editar</button>
                    <button onClick={() => onDelete(movie.id)} type="button" class="btn btn-danger">Eliminar</button>
                  </Card.Body>
                </Card>
              </div>

            );

          })}

        </Row>
        <Button
          variant="primary"
          type="button"
          onClick={() => onUpdate(id)}
          className="mx-2"
        >
          Update
        </Button>
      </div>


  </div>
      
    
  );
};

export default AddMovie;
