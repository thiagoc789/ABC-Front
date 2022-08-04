import { useState, useEffect } from "react";
import eventServices from "services/eventServices";
import {Card} from "react-bootstrap";

import {
  Row,

} from "reactstrap";



const AddMovie = ({ onAdd }) => {

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

  const onDelete = (id) => {
    eventServices.deleteUser(id).then((res) => refreshMovies());
  };

  const selectMovie = async (id) => {
    eventServices.getSingleUser(id).then((res) => window.location.href = `/evento/${id}`);
  }

  const updateMovie = async (id) => {
    eventServices.getSingleUser(id).then((res) => window.location.href = `/actualizarEvento/${id}`);
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
                    <button onClick={() => selectMovie(movie.id)} type="button" class="btn btn-info">Detalles</button>
                    <button onClick={() => updateMovie(movie.id)} type="button" class="btn btn-info">Editar</button>
                    <button onClick={() => onDelete(movie.id)} type="button" class="btn btn-danger">Eliminar</button>
                  </Card.Body>
                </Card>
              </div>

            );

          })}

        </Row>

      </div>


  </div>
      
    
  );
};

export default AddMovie;
