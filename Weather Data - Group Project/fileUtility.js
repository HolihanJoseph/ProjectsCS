/*
    Arthur(s):
    Victor (Yupu) Cao: writeToJSONFile
    Joseph Holihan & Nipun Kisari: readFromJSONFile
*/

import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {     
  
  const promise = writeFile(path, JSON.stringify(data));
  return promise;
}

export function readFromJSONFile(path) {    

  const prom = readFile(path, "utf8").then((response) => JSON.parse(response));
  return prom;
}
