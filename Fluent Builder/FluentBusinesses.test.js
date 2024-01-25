const assert = require("assert");
const FluentBusinesses  = require("./FluentBusinesses");

const testData = [
  {
    name: "Applebee's",
    city: "Charlotte",
    state: "NC",
    stars: 4,
    review_count: 6,
    categories: ["food", "beer", "sports"],
    hours: {
      Monday: "9:0 - 10:0"
    },
    attributes:{
      Ambience:{
        "divey": true,
      }
    }
  },
  {
    name: "China Garden",
    state: "NC",
    city: "Charlotte",
    stars: 4,
    review_count: 10,
    categories: ["food"],
    hours: {
      Monday: "9:0 - 10:0",
      Tuesday: "9:0 - 10:0"
    },
    attributes:{
      Ambience:{
        "divey": false,
      }
    }
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    city: "Phoenix",
    stars: 3,
    review_count: 30,
    categories: ["food", "beer"],
    hours:{
      Wednesday: "9:0 - 10:0",
      Thursday: "9:0 - 10:0"
    },
    attributes:{
      Ambience:{
        "romantic": true,
        "divey": true,
      }
    }
  },
  {
    name: "Alpaul Automobile Wash",
    city: "Charlotte",
    state: "NC",
    stars: 2,
    review_count: 30,
    categories: ["cleaning"],
    hours:{
      Friday: "9:0 - 10:0"
    }
  },
];

test("fromCityInState filters correctly", () => {
  const list = new FluentBusinesses(testData).fromCityInState(
    "Charlotte",
    "NC"
  ).data;
  assert(list.length === 3);
  assert(list[0].name === "Applebee's");
  assert(list[1].name === "China Garden");
  assert(list[2].name === "Alpaul Automobile Wash");
});

test("bestPlace tie-breaking", () => {
  const best = new FluentBusinesses(testData)
    .fromCityInState("Charlotte", "NC")
    .bestPlace();
  assert(best.name === "China Garden");
});

test("hasStarsGeq filters correctly",()=>{
  const list = new FluentBusinesses(testData).hasStarsGeq(3).data;
  assert(list.length === 3);
  assert(list[0].stars === 4);
  assert(list[1].stars === 4);
  assert(list[2].stars === 3);
});

test("in Category filters correctly",() => {
  const list = new FluentBusinesses(testData).inCategory("sports").data;
  assert(list.length === 1);
  assert(list[0].categories.some(c => c === "sports"));
});

test("inOpenOnDays filters correctly",() =>{
  let days = ["Monday", "Tuesday"];
  const list = new FluentBusinesses(testData).isOpenOnDays(days).data;
  assert(list.length === 1);
  assert(list[0].name === "China Garden");
});

test("hasAmbience filters correctly",() =>{
  let a = "divey";
  const list = new FluentBusinesses(testData).hasAmbience(a).data;
  console.log(list.length);
  assert(list.length === 2); 
});