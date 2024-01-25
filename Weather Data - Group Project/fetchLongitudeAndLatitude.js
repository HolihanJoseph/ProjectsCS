/*
    Arthur(s):
    Victor (Yupu) Cao: Most of the main function and extra tests
    Joseph Holihan: additional lines (line 23 - 27)
*/

import { URL } from "node:url"; // Import the URL class from the url library
import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+
import path, { parse } from "node:path"; // Node.js standard library for resolving arbitrary paths (like those in a url)
function makeSearchURL(query) {
  // Construct a new URL object using the resource URL
  const searchURL = new URL("https://geocode-cache.herokuapp.com/search");
  //University+of+Massachusetts+Boston
  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add a new "q" parameter with the value of the functions input
  searchURL.searchParams.append("q", query);

  return searchURL.toString(); // Return the resulting complete URL
}
export function fetchLongitudeAndLatitude(query) {
  function makeSearchURL(query) {
    const forecastURL = new URL("https://geocode-cache.herokuapp.com/search");
    forecastURL.search = "?q=" + query;
    return forecastURL.href;
  }
  console.log(makeSearchURL(query));
  return fetch(makeSearchURL(query))
    .then((response) => response.json()) // parse the result to a json
    .then(
      (json) =>
        Array.isArray(json) && json.length > 0 // This API returns an object with a "results" field as an array of objects
          ? Promise.resolve({
              lat: parseFloat(json[0].lat),
              lon: parseFloat(json[0].lon),
            }) // Resolve with the first object if present, an object with a url, name, and id
          : Promise.reject(new Error("No results found for query.")) // Reject if nothing is present
    );
}

/*export function fetchLongitudeAndLatitude(query) {
  function makeSearchURL(query) {
    const forecastURL = new URL('https://geocode-cache.herokuapp.com/search');
    forecastURL.search = '?q='+query
    return forecastURL.href
  }
    console.log(makeSearchURL(query));
    return fetch(makeSearchURL(query)) // fetch the /instructions resource with a "search" parameter
    .then(response => response.json()) // parse the result to a json
    .then(
       json => console.log(json[0]))
    }
    fetchLongitudeAndLatitude("University of Massachusetts")
    */
