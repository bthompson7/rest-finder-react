import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import ScrollUpButton from "react-scroll-up-button";

export default class home extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchDataFromYelp = this.fetchDataFromYelp.bind(this);

        this.state = {

          rest_list:[],
          search_list:[],
          searchString:"",
          lat:"",
          lng:"",
          dataLoaded:false,
          currentMealType:""
 
        };
    }

    //get geolocation from user
    componentDidMount(){
      var lat = this.state.lat;
      var lng = this.state.lng;


      if(navigator.geolocation) {
        console.log("navigator.geolocation is available");
        navigator.geolocation.getCurrentPosition(function(position) {
        console.log("current position acquired");


        if(lat !== position.coords.latitude && lng !== position.coords.longitude){
        
        this.setState({lat:position.coords.latitude})
        this.setState({lng:position.coords.longitude})
        console.log(position.coords.latitude + " " + position.coords.longitude);
        this.fetchDataFromYelp();

      }

        }.bind(this));  
     }else{
       alert("Unable to get geolocation!");
     }
    }



search(){



  if(this.state.search_list.length > 0){
    this.setState({search_list:[]})
  }

  for(var i=0; i < this.state.rest_list.length; i++){

    var currentRest = this.state.rest_list[i];

    if(currentRest['name'].toLowerCase().includes(this.state.searchString.toLowerCase())){
      this.state.search_list.push(currentRest);
      console.log(this.state.search_list.length);
    }else if(currentRest['location']['city'].toLowerCase().includes(this.state.searchString.toLowerCase())){
      this.state.search_list.push(currentRest);
      console.log(this.state.search_list.length);
    }
  
    //force the page to render with the new search results
    this.forceUpdate();
  }


}

fetchDataFromYelp(){

    fetch('http://localhost:3001/getData', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lat: this.state.lat,lng: this.state.lng, type:"rest", meal_type:"lunch"}),
    }).then(response => response.json())
    .then(function(response){
        this.setState({rest_list : response});
        this.setState({dataLoaded:true})
        this.setState({currentMealType:"lunch"});


    }.bind(this));

}

changeMealType(meal){

  if(this.state.search_list.length > 0){
    this.setState({search_list:[]})
  }
  
  this.setState({dataLoaded:false})

  fetch('http://localhost:3001/getData', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({lat: this.state.lat,lng: this.state.lng, type:"rest", meal_type:meal}),
  }).then(response => response.json())
  .then(function(response){
      this.setState({rest_list : response});
      this.setState({dataLoaded:true});
      this.setState({currentMealType:meal});

  }.bind(this));
}

render() {

  
      if(!this.state.dataLoaded){
        return (
          <div>
          <h1>Finding Nearby Restaurants...</h1>
          <div class="loader"></div>

          </div>
        )
      }else if(this.state.search_list.length == 0){
        return(
  
          <div class="main">        
          <ScrollUpButton />

           <div class="page-header">
          <h1>Restaurant Finder</h1>
          <hr/>


          <button class="button" onClick={() => { this.changeMealType('breakfast') }}>Breakfast</button>
          <button class="button" onClick={() => { this.changeMealType('lunch')}}>Lunch</button>
          <button class="button" onClick={() => { this.changeMealType('dinner') }}>Dinner</button>
          <h3>Currently displaying {this.state.rest_list.length} restaurants that serve {this.state.currentMealType}</h3>


          <input onChange={event => this.setState({searchString:event.target.value})} id="searchInputElement" pattern="[a-zA-Z]+" placeholder="Search for a location or restaurant"></input>
          <button class="button" onClick={() => { this.search()}}>Search</button>


          </div>

          {this.state.rest_list.map(rest =>
                  (
                  <div class="restaurant-list">
                  <h3>{rest['name']}</h3>
                  <h3>{rest['location']['address1']} {rest['location']['city']},{rest['location']['state']}</h3>

                  <BrowserRouter>
                      <Link target="_blank" to={"/details/" + rest['id']}>View Details</Link>
                   </BrowserRouter>
  
                   </div>))
          
                   }  
          </div>
        )
      }else{
        return(
  
          <div class="main">        
          <ScrollUpButton />

           <div class="page-header">
          <h1>Restaurant Finder</h1>
          <hr/>


          <button class="button" onClick={() => { this.changeMealType('breakfast') }}>Breakfast</button>
          <button class="button" onClick={() => { this.changeMealType('lunch')}}>Lunch</button>
          <button class="button" onClick={() => { this.changeMealType('dinner') }}>Dinner</button>
          <h3>Currently displaying {this.state.search_list.length} restaurants that serve {this.state.currentMealType}</h3>


          <input onChange={event => this.setState({searchString:event.target.value})} id="searchInputElement" pattern="[a-zA-Z]+" placeholder="Search for a location or restaurant"></input>
          <button class="button" onClick={() => { this.search()}}>Search</button>


          </div>

          {this.state.search_list.map(rest =>
                  (
                  <div class="restaurant-list">
                  <h3>{rest['name']}</h3>
                  <h3>{rest['location']['address1']} {rest['location']['city']},{rest['location']['state']}</h3>

                  <BrowserRouter>
                      <Link target="_blank" to={"/details/" + rest['id']}>View Details</Link>
                   </BrowserRouter>
  
                   </div>))
          
                   }  
          </div>
        )
      }
      
    }

  }