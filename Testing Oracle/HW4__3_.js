// Returns a random int i where min <= i < max
function randomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}

function generateInput(n){
  let a = [];
  let i = 0;
  while(i < n){
    a.push(generatePrefs(n));
    ++i;
  }
  return a;
}

function generatePrefs(n){
  let b = [];
  let i = 0;
  while(i < n){
    let val = randomInt(0,n);
    if(b.includes(val)) {continue;}
    b.push(val);
    ++i;
  }
  return b;
}

function oracle(f) {
  let numTests = 10; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 4; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = f(companies, candidates);
    console.log(hires);
    test('Hires length is correct', function() {
      assert(companies.length === hires.length);
      }); // Write more tests like this one
    test('No two companies have the same hire', function(){
      for(let i = 0; i < hires.length - 1; ++i){
        for(let j = i + 1; j < hires.length; ++j){
          assert(hires[i].candidate !== hires[j].candidate);
        }
      }
    });
    test('No two candidates have the same company', function(){
      for(let i = 0; i < hires.length - 1; ++i){
        for(let j = i + 1; j < hires.length; ++j){
          assert(hires[i].company !== hires[j].company);
        }
      }
    });
    test('Every company receives a candidate', function(){
      for(let i = 0; i < hires.length; ++i){
        assert(hires.some(x => x.candidate === i));
      }
    });
    test('Every candidate receives a company', function(){
      for(let i = 0; i < hires.length; ++i){
        assert(hires.some(x => x.company === i));
      }
    });
    test('Stable Matching', function(){
      for(let i = 0; i < hires.length; ++i){
        let currComp = hires[i].company;
        let compPref = companies[currComp];
        for(let j = 0; j < hires.length; ++j){
          let currCand = hires[j].candidate;
          let candPref = candidates[currCand];
          assert( (compPref.indexOf(currCand) >= compPref.indexOf(hires[i].candidate)) ||
                  (candPref.indexOf(currComp) >= candPref.indexOf(hires[j].company)) );
        }
      }
    });

  }
}

oracle(chaff1);


