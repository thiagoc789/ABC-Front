/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Eventos from "views/Eventos.js";
import NuevoEvento from "views/nuevoEvento.js";
import NuevaActividad from "views/nuevaActividad.js";
import Noticias from "views/news/Noticias.js"
import crearNoticia from "views/news/crearNoticia"
import editarNoticia from "views/news/editarNoticia"
import VerNoticias from "views/news/mostrarNoticia.js"
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import Usuarios from "views/Usuarios/Usuarios";
import CrearUsuario from "views/Usuarios/CrearUsuario";
import EditarUsuario from "views/Usuarios/EditarUsuario";
import UpgradeToPro from "views/Upgrade.js";
import Calendario from "views/Calendario";
import Participantes from "views/Participantes"
var routes = [
  {
    path: "/dashboard",
    name: "Reportes",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
    layout: "/admin",
  },


  {
    path: "/nuevoEvento",
    name: "nuevo Evento",
    icon: "nc-icon nc-badge",
    component: NuevoEvento,
    layout: "/admin",
  },
  
  {
    path: "/eventos",
    name: "Eventos",
    icon: "nc-icon nc-tap-01",
    component: Eventos,
    layout: "/admin",
  },


  {
    path: "/actividades",
    name: "Actividades",
    icon: "nc-icon nc-bullet-list-67",
    component: NuevaActividad,
    layout: "/admin",
  },

  {
    path: "/registroActividad",
    name: "Registro de Act",
    icon: "nc-icon nc-paper",
    component: Noticias,
    layout: "/admin",
  },

  {
    path: "/participantes",
    name: "Participantes",
    icon: "nc-icon nc-circle-10",
    component: Participantes,
    layout: "/admin",
  },

  {
    path: "/preinscripción",
    name: "Preinscripción",
    icon: "nc-icon nc-user-run",
    component: Noticias,
    layout: "/admin",
  },

  {
    path: "/calendario",
    name: "Calendario",
    icon: "nc-icon nc-calendar-60",
    component: Calendario,
    layout: "/admin",
  },

  {
    name: "Noticias",
    path: "/noticias",
    icon: "nc-icon nc-single-copy-04",
    component: VerNoticias,
    layout: "/admin",
    subroutes: [
      {
        path: "/noticias/crearNoticia",
        component: crearNoticia,
        layout: "/admin",
      },
      {
        path: "/noticias/editarNoticia",
        component: editarNoticia,
        layout: "/admin",
      },
    ],
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    icon: "nc-icon nc-single-02",
    component: Usuarios,
    layout: "/admin",
    subroutes: [
      {
        path: "/usuarios/crear-usuario",
        component: CrearUsuario,
        layout: "/admin",
      },
      {
        path: "/usuarios/editar-usuario/:id",
        component: EditarUsuario,
        layout: "/admin",
      },
    ],
  },
];
export default routes;
