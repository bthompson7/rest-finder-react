import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import DetailsRoute from './route';

export default class home extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchDataFromYelp = this.fetchDataFromYelp.bind(this);

        this.state = {

          rest_list:[],
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




fetchDataFromYelp(){

    fetch("http://localhost:3001" + '/getData', {
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
  this.setState({dataLoaded:false})

 // alert("Changing meal type" + meal)
  fetch("http://localhost:3001" + '/getData', {
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


changeMealType2(meal){
 console.log("meal"+ meal)

  
}



    render() {

      if(!this.state.dataLoaded){
        return (
          <div>
          <h1>Finding Nearby Restaurants...</h1>
          <div class="loader"></div>

          </div>
        )
      }else{
        return(
  
          <div class="main">        
          
           <div class="page-header">
          <h1>Restaurant Finder</h1>
          <hr/>

          <button class="button" onClick={() => { this.changeMealType('breakfast') }}>Breakfast</button>
          <button class="button" onClick={() => { this.changeMealType('lunch')}}>Lunch</button>
          <button class="button" onClick={() => { this.changeMealType('dinner') }}>Dinner</button>
          <h3>Currently displaying restaurants that serve {this.state.currentMealType}</h3>

          </div>

          {this.state.rest_list.map(rest =>
                  (
                  <div class="restaurant-list">
                  <h3>{rest['name']}</h3>
                  <h3>{rest['location']['address1']} {rest['location']['city']},{rest['location']['state']}</h3>
  
                  <h3>This restaurant is {Math.round(rest['distance'] / 1609)} miles away</h3>
                      
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