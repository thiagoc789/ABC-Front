import { useState, useEffect } from "react";
import eventServices from "services/eventServices";
import { Card } from "react-bootstrap";
import axios from 'axios';
import React from "react";

import {
  Row,

} from "reactstrap";



const AddMovie = ({ onAdd }) => {

  const [movies, setMovies] = useState([]);


  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    axios.get("http://abc-app-univalle.herokuapp.com/Events/")
      .then((res) => {
        setMovies(res.data);
      })
      .catch(console.error);
  };

  const onDelete = (id) => {
    axios.delete(`http://abc-app-univalle.herokuapp.com/Events/${id}/`).then((res) => refreshMovies());
  };

  const selectMovie = async (id) => {
    axios.get(`http://abc-app-univalle.herokuapp.com/Events/${id}/`).then((res) => window.location.href = `/admin/evento/${id}`);

  }

  const updateMovie = async (id) => {
    axios.get(`http://abc-app-univalle.herokuapp.com/Events/${id}/`).then((res) => window.location.href = `/admin/actualizar/${id}`);
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
                  <Card.Img variant="top" src={movie.Media_file} />
                  <Card.Body >
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>
                      {movie.Details}
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
