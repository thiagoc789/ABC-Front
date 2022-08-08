import React from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import eventServices from "services/eventServices";

import routes from "routes.js";
import { Card, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";
import Geocode from "react-geocode";
import Container from '@material-ui/core/Container';




var ps;

const MapWrapper = () => {
    Geocode.setApiKey("AIzaSyCEzk_CRJKjrINp-2z_2CnrxPbfFj_P48U");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        refreshMovies();
    }, []);

    const refreshMovies = () => {
        axios.get(`http://abc-app-univalle.herokuapp.com/Events/${id}/`)
            .then((res) => {
                setMovies(res.data);
                console.log(movies);
            })
            .catch(console.error);
    };

    Geocode.fromAddress(movies.Space).then(
        (response) => {
            let{ lat, lng } = response.results[0].geometry.location;
            console.log(movies.Space)
            console.log(lat, lng);
        },
        (error) => {
            console.error(error);
        }
    );

    const location = {
        address: movies.Space,
        lat: 3.43722,
        lng: -76.5225,
    }

    return (

        <Container component="main" maxWidth="m">
            <div className="caja"> <h1 style={{ color: "#F4F3EF" }}> /n </h1></div>
        <div className="wrapper">
            <p class="h2 text-center">Lista De Eventos</p>
            <div class="col-md-30 bg-light text-center">
                <body class="m-0 row justify-content-center">
                    <div class="col-md-30 bg-light text-center">
                        <Card style={{ width: '20rem' }}>
                            <Card.Text>
                                Evento Numero:  
                                {movies.id}
                            </Card.Text>
                            <Card.Img variant="top" src={movies.Media_file} />
                            <Card.Body >
                                <Card.Title>{movies.Title}</Card.Title>
                                <Card.Text>
                                    {movies.details}
                                </Card.Text>
                                <Card.Text>
                                    Costo:    
                                    {movies.Cost}
                                </Card.Text>
                                <Card.Text>
                                    Inicia:   
                                    {movies.Start_date}
                                </Card.Text>
                                <Card.Text>
                                    Finaliza:   
                                    {movies.Finish_date}
                                </Card.Text>
                                <Card.Text>
                                    {movies.created_at}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                </body>
                <div class="col-md-12 bg-light text-center">
                <Map location={location} zoomLevel={10} />
                </div>
            </div>
            

        </div>
        </Container>
    );
}

export default MapWrapper;