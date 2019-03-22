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
            callback(
                undefined,
                "Summary: " +
                    body.currently.summary +
                    "\n" +
                    "Temperature: " +
                    body.currently.temperature +
                    "°" +
                    "\n" +
                    "Precipitation type: " +
                    body.currently.precipType +
                    "\n" +
                    "Probability: " +
                    body.currently.precipProbability +
                    "\n" +
                    "Humidity: " +
                    body.current.humidity +
                    "\n" +
                    "Wind speed: " +
                    body.currently.windSpeed +
                    "\n"

                // body.currently.summary +
                //     " throughout the day. " +
                //     "\n" +
                //     "It is currently " +
                //     body.currently.temperature +
                //     " degrees out." +
                //     "\n" +
                //     "There is a " +
                //     body.currently.precipProbability +
                //     "% chance of rain."
            );
        }
    });
};

module.exports = forecast;
