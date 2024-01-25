/*
    Arthur(s):
    Joseph Holihan: The entire function
*/

import { URL } from "node:url";
import fetch from "node-fetch";

export function fetchCurrentWeather(longitude, latitude) {
  function makeForcastUrl() {
    const forecastURL = new URL("https://api.open-meteo.com/v1/forecast");
    forecastURL.search =
      "?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&hourly=temperature_2m&temperature_unit=fahrenheit";
    return forecastURL.href;
  }
  let data = makeForcastUrl();
  return fetch(data)
    .then((response) =>
      !response.ok
        ? Promise.reject(new Error("Response is not ok"))
        : response.json()
    )
    .then((json) => Promise.resolve(json.hourly))
    .catch((message) => console.log("Could not get weather: " + message));
}
