const express = require("express");
const app = express();
const mongoose = require("mongoose");

const sass = require("node-sass-middleware");
const path = require("path");

const dbSource = "mongodb://localhost:27017/";
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

app.use(
    sass({
        src : __dirname + "/public",
        dest : __dirname + "/public",
        debug : true

    })
);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res) {
    res.sendfile("index.html");
});

app.get("/imagesearch/latest", function(req, res) {

});

app.get("/imagesearch/get/*", function(req, res) {
    
});

    