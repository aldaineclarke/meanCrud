const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const server = express();
const apiV1 = require("./api/api_v1/api_v1");
const {DB_URI, PORT} = process.env;

// enables cross origin resource sharing, however it is open to all connections with this setting
server.use(cors());
// allows the server to use the urlencoding from the querystring library.
server.use(express.urlencoded({extended:false}));
// allows the server to parse json data. Allows us to read the body of a request. 
server.use(express.json());

server.use("/api/v1", apiV1);

// Sets up connection on the port specified in the environment.
try{
    server.listen(PORT, (error)=>{

        // suppress deprecation warning for strictQuery being true
        mongoose.set('strictQuery', true);

        // connects to the database;
        mongoose.connect(DB_URI)
        .then(()=>{console.log("Database connected successfully")});

        console.log("Server is connected on port", PORT);
    })
}catch(error){
    // should maybe do something here to notify user that there is an error
    console.log(error);
}
