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
    alert("id is  " + this.props.match.params.id)
    }




    render() {

            
        return(
        <h1>Restaurant Details</h1>
        )

        
        }

        
}

