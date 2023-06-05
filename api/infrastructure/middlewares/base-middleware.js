const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { sessionConfig } = require("../database-configuration/mongo-configuration");
const { configurePassportAuthentication } = require("./passport-configuration");

function configureMiddlewares(app){
    // configure logger for development mode
    app.use(logger("dev"));

    // cors configuration
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    );

    // body parser configuration for http request
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // session and cookie parser configuration
    app.use(session(sessionConfig));
    app.use(cookieParser());

    // Passport config
    configurePassportAuthentication(app);
};

module.exports.configureMiddlewares = configureMiddlewares;
