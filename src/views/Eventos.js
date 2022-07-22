
import React, { Component, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import {
  Card,
  CardHeader,
  CardBody,
  Table,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import userServices from "services/userServices";


const Users = () => {
  const [movies, setMovies] = useState([])
  useEffect (() => {
    setMovies([
      {
        name:'Billions',
        genre: 'Drama',
        starring: 'Damian Lewis, Paul Giamatt',
      },
      {
        name:'Sarafina',
        genre: 'drama',
        starring: 'Leleti Khumalo',
      },
    
    ])
  }, [])
  return (
    <div className="App">
      {/* const {movies} = movies */}
      {movies.map((movie, index) => {
        return(
          <div className="movies">
            <h2>{movie.name}</h2>
            <h3>{movie.genre}</h3>
            <h4>{movie.starring}</h4>
          </div>
        )
      }
      )}
    </div>
  );  
}





export default Users;
