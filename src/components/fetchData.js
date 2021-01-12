


//slap a cors proxy on the front of this
//See: https://github.com/Yelp/yelp-fusion/issues/386#issuecomment-373824685
function fetchDataFromYelp(lat,lng){
    console.log("Fetching data...");


   fetch(API_URL + "latitude="+lat + "&longitude="+lng, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + API_KEY },
      }).then(response => response.json())
      .then(function(response){         


        return response;
    }.bind(this));

  }


export default fetchDataFromYelp;