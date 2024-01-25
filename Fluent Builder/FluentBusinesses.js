class FluentBusinesses {
  // constructor(data: object[])
  constructor(data) {
    this.data = data;
  }

  fromCityInState(city, state){
    return new FluentBusinesses(this.data.filter(b => b.city === city && b.state === state));
  }

  hasStarsGeq(stars){
    return new FluentBusinesses(this.data.filter(b => b.stars >= stars));
  }

  inCategory(category){
    function categoryHelp(b){
      if("categories" in b){
        return b.categories.some(c => c === category);
      }
      else { return false; }
    }
    return new FluentBusinesses(this.data.filter(b => categoryHelp(b)));
  }

  isOpenOnDays(days){
    function openHelp(b){
      if("hours" in b){
        return days.every(d => d in b.hours);
      }
      else { return false;}
    }
    return new FluentBusinesses(this.data.filter(b => openHelp(b)));
  }

  hasAmbience(ambience){
    function ambienceHelp(b){
     if("attributes" in b){
      if("Ambience" in b.attributes){
        if(ambience in b.attributes.Ambience){
          console.log(b.attributes.Ambience[ambience]);
          return b.attributes.Ambience[ambience];
        }
        else{return false;}
      }
      else{ return false;}
     }
     else{ return false; }
    }
    return new FluentBusinesses(this.data.filter(b => ambienceHelp(b)));
  }

  bestPlace(){
    function bestHelp(b){
      if(b.stars > bestRating){
        a = [b];
        bestRating = b.stars;
      }
      else if(b.stars === bestRating){
        a.push(b);
      }
    }
    let a = [];
    let bestRating = 0;
    this.data.forEach(b => bestHelp(b));

    if(a.length > 1){
      function reviewHelp(b){
        if(b.review_count > mostRevs){
          c = [b];
          mostRevs = b.review_count;
        }
        else if(b.review_count === mostRevs){
          c.push(b)
        }
      }
      let c = [];
      let mostRevs = 0;
      a.forEach(o => reviewHelp(o));
      return c[0];
    }
    else{ return a[0]; }
  }

  mostReviews(){
    function reviewHelp(b){
      if(b.review_count > mostRevs){
        c = [b];
        mostRevs = b.review_count;
      }
      else if(b.review_count === mostRevs){
        c.push(b)
      }
    }
    let c = [];
    let mostRevs = 0;
    this.data.forEach(b => reviewHelp(b));

    if(c.length > 1){
      function bestHelp(b){
        if(b.stars > bestRating){
          a = [b];
          bestRating = b.stars;
        }
        else if(b.stars === bestRating){
          a.push(b);
        }
      }
      let a = [];
      let bestRating = 0;
      c.forEach(b => bestHelp(b));
      return a[0];
    }
    else{return c[0]};
  }
}

module.exports = FluentBusinesses;



