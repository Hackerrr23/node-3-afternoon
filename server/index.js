require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

// Middleware
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require( './controllers/auth_controller');
const search_controller = require( './controllers/search_controller');


app.use( bodyParser.json() );
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use( checkForSession );
app.use( express.static( `${__dirname}/../build` ) );

const port = process.env.SERVER_PORT || 3000;

// Swag
app.get( '/api/swag', swag_controller.read );
app.get( '/api/search', search_controller.search );

// Auth
app.post( '/api/login', auth_controller.login );
app.post( '/api/register', auth_controller.register );
app.post( '/api/signout', auth_controller.signout );
app.get( '/api/user', auth_controller.getUser );

app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );