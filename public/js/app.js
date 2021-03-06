const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From Javascript";

weatherForm.addEventListener("submit", e => {
    e.preventDefault();
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch("/weather?address=" + search.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.innerHTML =
                    "Summary: " +
                    data.summary +
                    "<br>" +
                    "Temperature: " +
                    data.temperature +
                    "°" +
                    "<br>" +
                    "Precipitation type: " +
                    data.precipType +
                    "<br>" +
                    "Probability: " +
                    data.precipProbability +
                    "<br>" +
                    "Humidity: " +
                    data.humidity +
                    "<br>" +
                    "Wind speed: " +
                    data.windSpeed +
                    "<br>";
            }
        });
    });

    const location = search.value;

    console.log(location);
});
