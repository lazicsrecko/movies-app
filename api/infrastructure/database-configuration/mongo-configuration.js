const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const dbUri = "mongodb+srv://admin:v9jxFgbJSUK3H5G@cluster0.znu9f.mongodb.net/moviesDB?retryWrites=true&w=majority";

const sessionConfig = {
    secret: "secret",
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
