const express = require("express");
const app = express();
const mongoose = require("mongoose");
const request = require("request");

const sass = require("node-sass-middleware");
const path = require("path");

const dbSource = "mongodb://localhost:27017/";
const port = process.env.PORT || 3000;

const cseKey = "012873232026098180354:ajkmq-qxxye";
const apiKey = "AIzaSyBazuf9rGCUMlhK5KSM14W6V_ywPgmL-F4";

app.use(
    sass({
        src : __dirname + "/public",
        dest : __dirname + "/public",
        debug : true

    })
);

/****** ROUTING ******/
app.get("/imagesearch", function(req, res) {
    res.sendFile("index.html", {root : __dirname + "/public"});
});

app.get("/imagesearch/latest", getLatestSearches);

app.get("/imagesearch/get/:searchTerms", searchImages);

app.listen(port, function() {
    console.log("URL Shortener running on port " + port);;
});
    
/****** FUNCTIONALITY ******/
function getLatestSearches(req, res) {
    console.log(req);
}

function searchImages(req, response) {
    const offset = req.query.hasOwnProperty("offset") ? req.query.offset : 1;
    const searchString = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx="+ cseKey + 
        "&q=" + req.params.searchTerms + "&searchType=image" + "&start=" + offset;

    request(searchString, function(err, res, body) {
        if (!err && res.statusCode === 200) {
            const searchResults = JSON.parse(res.body).items.map(function(imageInfo) {
                return {
                    "url" : imageInfo.link, 
                    "description" : imageInfo.title, 
                    "thumbnail" : imageInfo.image.thumbnailLink, 
                    "context" : imageInfo.image.contextLink
                }    
            });
            response.send(searchResults);
        }
    });

}





