import { useState, useEffect } from "react";
import eventServices from "services/eventServices";
import { useParams} from 'react-router-dom';
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

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';



const AddMovie = ({ onAdd }) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [movies, setMovies] = useState([]);

  const { id }= useParams();
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);


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

  const onUpdate = (id) => {
    let item = { id: id };
    API.patch(`/${id}/`, item).then((res) => refreshMovies());
  };

  const onDelete = (id) => {
    eventServices.getSingleUser()
    .then((res) => {
      console.log(res.data);
    })
    .catch(console.error);
  };


  return (
    <div className="content">
      <p class="h2 text-center">Lista De Eventos</p>
      <div class="col-md-11 bg-light text-right">
              <a class="btn" href="nuevoEvento">Nuevo Evento</a>
        </div>
        <Row  md={3} className="g-4">
        {Array.from(movies).map((movie, index) => {
          
        return (
          <div class="row text-center">
              <Card style={{ width: '40rem' }}>
              <Card.Text>
                    {movie.id}
                  </Card.Text>
                <Card.Img  variant="top" src={movie.image} />
                <Card.Body >
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    {movie.content}
                  </Card.Text>
                  <Card.Text>
                    {movie.created_at}
                  </Card.Text>
                  <Button  variant="primary">Detalles</Button>
                  <button type="button" class="btn btn-info">Editar</button>
                  <button onClick={onDelete} type="button" class="btn btn-danger">Eliminar</button>
                </Card.Body>
              </Card> 
              </div>
                  
        );
        
      })}
      
</Row>

    </div>
  );
};

export default AddMovie;
