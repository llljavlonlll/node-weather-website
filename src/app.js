const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup a static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Javlon Butabaev"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Javlon Butabaev"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }

            forecast(
                latitude,
                longitude,
                (
                    error,
                    {
                        summary,
                        temperature,
                        precipType,
                        precipProbability,
                        humidity,
                        windSpeed
                    }
                ) => {
                    if (error) {
                        return res.send({
                            error: error
                        });
                    }
                    res.send({
                        location,
                        summary,
                        temperature,
                        precipType,
                        precipProbability,
                        humidity,
                        windSpeed,
                        address: req.query.address
                    });
                }
            );
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: '<a href="www.911.gov">911</a>',
        title: "Help",
        name: "Javlonbek Butabaev"
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        error: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Javlon Butabaev",
        error: "Page not found"
    });
});
// app.com
// app.com/help
// app.com/ about

app.listen(port, () => {
    console.log("Server is up on 127.0.0.1:" + port);
});
