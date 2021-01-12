import React, { Component } from 'react';

export default class Restaurant extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
           rest_details:{}
       };


    }


  
    componentDidMount(){
    console.log("Fetching restaurant details");


    fetch("http://localhost:3001" + '/restaurant/' + this.props.match.params.id, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lat: this.state.lat,lng: this.state.lng, type:"rest", meal_type:"lunch"}),
      }).then(response => response.json())
      .then(function(response){
          this.setState({rest_details : response});
          console.log(this.state.rest_details);
      }.bind(this));
    }




    render() {

            
        return(


        <div>


            <div>
             <h1>Restaurant Details for {this.state.rest_details['name']}</h1>

            </div>


        <h3>{this.state.rest_details['display_phone']}</h3>
        <h3>{this.state.rest_details['rating']} / 5 based on {this.state.rest_details['review_count']} reviews</h3>


        </div>
        )

        
        }

        
}

