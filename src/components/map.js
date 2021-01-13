import React, { Component, useState, useEffect } from 'react';


export default class ShowMap extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
           dataLoaded : false
       };

       


    }

    componentDidMount() {

        
    }


    render() {
     
        
        return(
            <div id="map"></div>
        )
        
        }
        
        
}

