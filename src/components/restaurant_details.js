
//using hooks

import React, {useState, useEffect} from 'react';
import RestaurantMap from './map.js';
import ScrollUpButton from "react-scroll-up-button";

import { convert_military_time } from "../utils/time_convert";


function DisplayRestaurantDetails(props) {
    const [rest_details, updateRestDetails] = useState([]);
    const [dataLoaded, hasDataLoaded] = useState(false);
    const [showImagesToUser, shouldImagesBeShown] = useState(false);
    const [showImagesBtn, changeImagesButtonText] = useState("Show Images");

   useEffect(() => {

        fetch('/restaurant/' + props.match.params.id, {
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


  const is_open = (close_time) =>{
    if(rest_details['hours'][0]['is_open_now']){
      return(
        <div class="is-open">
          <h3>Open until {close_time}</h3>
        </div>
      )
    }else{
      return(
        <div class="is-closed">
          <h3>This restaurant is currently closed</h3>
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

   var open_time = convert_military_time(rest_details['hours'][0]['open'][0]['start']);
   var close_time = convert_military_time(rest_details['hours'][0]['open'][0]['end']);

    return(
        <div>
        <ScrollUpButton />

        <h1>{rest_details['name']}</h1>
        <hr/>
        {is_open(close_time)}
        <h3>Phone: {rest_details['display_phone']}</h3>
        <h3>{rest_details['rating']} / 5 based on {rest_details['review_count']} reviews</h3>
        <h3>Price: {rest_details['price']}</h3>
        <h3>Location: {rest_details['location']['display_address'][0]} {rest_details['location']['display_address'][1]} {rest_details['location']['display_address'][2]}</h3>
        <h3>Hours: {open_time} until {close_time}</h3>

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