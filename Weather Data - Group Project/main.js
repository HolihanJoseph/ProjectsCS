/*
    Arthur(s):
    Nipun Kisari: Typed the entire function as well as making most of the changes
    Joseph Holihan & Victor (Yupu) Cao: Provided ideas on why certain tests are failing, possible reasons include incorrect 
                                        implementation of .then() chains and fetch, incorrect importation of functions, etc. 

*/

import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import {
  fetchUniversityWeather,
  fetchUCalWeather,
  fetchUMassWeather,
} from "./universityWeather.js";

fetchUMassWeather()
  .then((value) => value.totalAverage)
  .then((Pvalue) =>
    fetchUCalWeather()
      .then((value) => value.totalAverage)
      .then((Qvalue) => {
        if (Pvalue > Qvalue) {
          console.log(
            "The average of temperature of UMass schools is greater than that of UCal schools."
          );
        } else if (Qvalue > Pvalue) {
          console.log(
            "The average of temperature of UCal schools is greater than that of UMass schools."
          );
        } else {
          console.log(
            "The average of temperature of UMass schools is equal to that of UCal schools."
          );
        }
      })
  );

fetchLongitudeAndLatitude("University of Massachusetts Amherst")
  .then((value) => value.lon)
  .then((Pvalue) =>
    fetchLongitudeAndLatitude("University of California Berkeley")
      .then((value) => value.lon)
      .then((Qvalue) => {
        if (Pvalue > Qvalue) {
          console.log(
            "The longitude of UMass Amherst is greater than that of UCal Berkeley"
          );
        } else if (Qvalue > Pvalue) {
          console.log(
            "The longitude of UCal Berkeley is greater than that of UMass Amherst"
          );
        } else {
          console.log(
            "The longitude of UMass Amherst is equal to that of UCal Berkeley"
          );
        }
      })
  );
  fetchLongitudeAndLatitude("University of Massachusetts Amherst")
  .then((value) => value.lat)
  .then((Pvalue) =>
    fetchLongitudeAndLatitude("University of California Berkeley")
      .then((value) => value.lat)
      .then((Qvalue) => {
        if (Pvalue > Qvalue) {
          console.log(
            "The latitude of UMass Amherst is greater than that of UCal Berkeley"
          );
        } else if (Qvalue > Pvalue) {
          console.log(
            "The latitude of UCal Berkeley is greater than that of UMass Amherst"
          );
        } else {
          console.log(
            "The latitude of UMass Amherst is equal to that of UCal Berkeley"
          );
        }
      })
  );