/*
    Arthur(s):
    Joseph Holihan: Most of the entire function
    Nipun Kisari: function builder
    Victor Cao: function fetchUMassWeather & fetchUCalWeather

*/


import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

export async function fetchUniversityWeather(query) {
  function getAvg(nums) {
    let n = 0;
    let sum = 0;
    for (let i = 0; i < nums.length; ++i) {
      sum += nums[i];
      n++;
    }
    return sum / n;
  }
  function builder(avgs, unis) {
    let o = {};
    o.totalAverage = getAvg(avgs);
    for (let i = 0; i < unis.length; ++i) {
      o[unis[i]] = avgs[i];
    }
    return o;
  }
  let unis = await fetchUniversities(query);
  return unis.length === 0
    ? Promise.reject(new Error("No results found for query"))
    : Promise.all(
        unis.map((uni) =>
          fetchLongitudeAndLatitude(uni)
            .then((locData) => fetchCurrentWeather(locData.lon, locData.lat))
            .then((weather) => getAvg(weather.temperature_2m))
        )
      ).then((avgs) => builder(avgs, unis));
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
}
