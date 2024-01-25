/*
    Arthur(s):
    Nipun Kisari: The entire function
    Victor Cao: Extra test
*/

import fetch from "node-fetch";
export function fetchUniversities(query) {
  // TODO
  function makeURL() {
    const uniURL = new URL("https://university-web-api.herokuapp.com/search");

    uniURL.searchParams.append("name", query);

    return uniURL.href;
  }

  let data = makeURL();

  return fetch(data)
    .then((response) =>
      !response.ok
        ? Promise.reject(new Error("Response is not ok"))
        : response.json()
    )
    .then((json) => json.map((x) => x.name))
    .then((names) =>
      Array.isArray(names) && names.every((x) => typeof x === "string")
        ? Promise.resolve(names)
        : Promise.reject(new Error("JSON is not an array"))
    );
}
