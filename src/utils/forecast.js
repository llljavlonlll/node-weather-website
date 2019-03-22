const request = require("request");

const forecast = (lat, lon, callback) => {
    const url =
        "https://api.darksky.net/forecast/6b380445a5e9fecf5d57f571c3e4b701/" +
        lat +
        "," +
        lon +
        "?units=si";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather service", undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipType: body.currently.precipType,
                precipProbability: body.currently.precipProbability,
                humidity: body.currently.humidity,
                windSpeed: body.currently.windSpeed
            });
        }
    });
};

module.exports = forecast;
