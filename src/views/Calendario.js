import Iframe from 'react-iframe'

const Calendario = (props) => {

    return (
      <div>
        <div className="caja"> <h1 style={{ color:"#F4F3EF" }}> /n </h1></div>
        <Iframe url="https://calendar.google.com/calendar/embed?src=c_uq32cq4evbgfte2c7o5j73kesg%40group.calendar.google.com&ctz=America%2FBogota"
        width="100%"
        height="500px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
      </div>
      );  
 }
 export default Calendario;