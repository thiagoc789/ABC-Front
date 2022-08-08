const production = false;
const HOST_API_DEV = process.env.REACT_APP_HOST_API_DEV;
const HOST_API_PRODUCTION =
  process.env.REACT_APP_HOST_API_PRODUCTION;

const DNS = {
  host: production ? HOST_API_PRODUCTION : HOST_API_DEV,
};

const ROUTES = {
  USER: `${DNS.host}/User`,
  EVENTS: `${DNS.host}/Events`
  
};
export default ROUTES;