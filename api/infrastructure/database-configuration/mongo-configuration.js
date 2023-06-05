const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const dbUri = process.env.REMOTE_CONNECTION_STRING || process.env.LOCAL_CONNECTION_STRING;
const secret = process.env.SESSION_SECRET;

const sessionConfig = {
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
        mongoUrl: dbUri
    }),
};

function configureMongoDb(){
    mongoose
        .connect(dbUri)
        .then(console.log("Database connected!"))
        .catch((err) => console.log(err));
};

module.exports.sessionConfig = sessionConfig;
module.exports.configureMongoDb = configureMongoDb;
