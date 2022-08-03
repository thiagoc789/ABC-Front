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
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        refreshMovies();
    }, []);

    const refreshMovies = () => {
        eventServices.getSingleUser(id)
            .then((res) => {
                setMovies(res.data);
                console.log(movies);
            })
            .catch(console.error);
    };
    const onDelete = (id) => {
        eventServices.deleteUser(id).then((res) => refreshMovies());
    };
    const selectMovie = (id) => {
        eventServices.getSingleUser(id).then((res) => console.log(res.data));
    }


    return (

        <div className="wrapper">
            <p class="h2 text-center">Lista De Eventos</p>
            <div class="col-md-30 bg-light text-center">
                <a class="btn" href="nuevoEvento">Nuevo Evento</a>
                <body class="m-0 row justify-content-center">
                    <div class="col-md-30 bg-light text-center">
                        <Card style={{ width: '20rem' }}>
                            <Card.Text>
                                {movies.id}
                            </Card.Text>
                            <Card.Img variant="top" src={movies.image} />
                            <Card.Body >
                                <Card.Title>{movies.title}</Card.Title>
                                <Card.Text>
                                    {movies.content}
                                </Card.Text>
                                <Card.Text>
                                    {movies.created_at}
                                </Card.Text>
                                <Button variant="primary">Detalles</Button>
                                <button onClick={() => selectMovie(movies.id)} type="button" class="btn btn-info">Editar</button>
                                <button onClick={() => onDelete(movies.id)} type="button" class="btn btn-danger">Eliminar</button>
                            </Card.Body>
                        </Card>
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
