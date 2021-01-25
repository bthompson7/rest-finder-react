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
          searchRegex:"[a-zA-Z[ ]*[0-9]*]+",
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
    this.state.search_list = [];
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

    fetch('/getData', {
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

  fetch('/getData', {
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


const show_num_of_searches = () => {
          
  //no searches were found
  if(this.state.search_list.length == 0){
      return(
        <h3>Currently displaying {this.state.rest_list.length} restaurants that serve {this.state.currentMealType}</h3>
          ) 

  //oh, look some searches
  }else{
    return(
      <h3>Currently displaying {this.state.search_list.length} restaurants that serve {this.state.currentMealType}</h3>
    )
  }
    
}


const show_restaurant_list = () => {
          
  //no searches were found
  if(this.state.search_list.length == 0){
      return(

        this.state.rest_list.map(rest =>
          (
          <div class="box">
          <h3>{rest['name']}</h3>
          <h3>{rest['location']['address1']} {rest['location']['address2']} {rest['location']['address3']} {rest['location']['city']},{rest['location']['state']}</h3>
          <h3>{rest['rating']} / 5 based on {rest['review_count']} reviews</h3>

          <BrowserRouter>
              <Link target="_blank" to={"/details/" + rest['id']}>View More Details</Link>
           </BrowserRouter>

           </div>))
  
          
          ) 

  //oh, look some searches
  }else{
    return(
      this.state.search_list.map(rest =>
        (
        <div class="box">
        <h3>{rest['name']}</h3>
        <h3>{rest['location']['address1']} {rest['location']['address2']} {rest['location']['address3']} {rest['location']['city']},{rest['location']['state']}</h3>
        <h3>{rest['rating']} / 5 based on {rest['review_count']} reviews</h3>

        <BrowserRouter>
            <Link target="_blank" to={"/details/" + rest['id']}>View More Details</Link>
         </BrowserRouter>

         </div>))  
    )
  }
    
}

      if(!this.state.dataLoaded){
        return (
          <div>
          <h1>Finding Nearby Restaurants...</h1>
          <div class="loading-icon"></div>
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

          {show_num_of_searches()}

          <input class="search-element" onChange={event => this.setState({searchString:event.target.value})} pattern={this.state.searchRegex} id="searchInputElement" placeholder="Search"></input>
          <button class="button" onClick={() => { this.search()}}>Search</button>

          </div>

           {show_restaurant_list()}
          </div>
        )
      }
      
    }

  }