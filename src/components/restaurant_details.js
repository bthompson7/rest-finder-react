
//using hooks

import React, {useState, useEffect} from 'react';
import RestaurantMap from './map.js';
import ScrollUpButton from "react-scroll-up-button";


function DisplayRestaurantDetails(props) {
    const [rest_details, updateRestDetails] = useState([]);
    const [dataLoaded, hasDataLoaded] = useState(false);
    const [showImagesToUser, shouldImagesBeShown] = useState(false);
    const [showImagesBtn, changeImagesButtonText] = useState("Show Images");

   useEffect(() => {

        fetch('http://localhost:3001/restaurant/' + props.match.params.id, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({lat: null,lng: null, type:"rest", meal_type:"lunch"}),
        }).then(response => response.json())
        .then(function(response){
            updateRestDetails(response)
            hasDataLoaded(true)
  
            document.title = response['name'] + " Details";  

        });

    }, []);
      
    const displayImages = (photosArray) => {
          
        if(showImagesToUser){
            return(
                <div class="images-container">
                <img alt="" src={photosArray[0]}></img>
                <img alt="" src={photosArray[1]}></img>
                <img alt="" src={photosArray[2]}></img>
                </div>
                ) 
        }
          
  }

  if(!dataLoaded){
    return (
        <div>
        <h1>Loading Restaurant Information...</h1>
        <div class="loader"></div>
        </div>

    )
}else{

    return(
        <div>
        <ScrollUpButton />

        <h1>{rest_details['name']}</h1>
        <hr/>
        <h3>Phone: {rest_details['display_phone']}</h3>
        <h3>{rest_details['rating']} / 5 based on {rest_details['review_count']} reviews</h3>
        <h3>Price: {rest_details['price']}</h3>
        <h3>Location: {rest_details['location']['display_address'][0]} {rest_details['location']['display_address'][1]}</h3>
        <h3>Hours: {rest_details['hours'][0]['open'][0]['start']} until {rest_details['hours'][0]['open'][0]['end']}</h3>

        <button class="button" onClick={() => {
          

      if(showImagesToUser){
        shouldImagesBeShown(false)
        changeImagesButtonText("Show Images")
      }else if(!showImagesToUser){
        shouldImagesBeShown(true)
        changeImagesButtonText("Hide Images")
      }

        }}>{showImagesBtn}</button>

        
        {displayImages(rest_details['photos'])}

        <RestaurantMap details={rest_details}/>
        </div>
        )
}  

}

export default DisplayRestaurantDetails;