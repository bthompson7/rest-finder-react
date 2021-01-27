
//using hooks

import React, {useState, useEffect} from 'react';
import RestaurantMap from './map.js';
import ScrollUpButton from "react-scroll-up-button";

import { convert_military_time } from "../utils/time_convert";


function DisplayRestaurantDetails(props) {
    const [rest_details, setRest_details] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showImagesToUser, setShowImagesToUser] = useState(false);
    const [showImagesBtn, setShowImagesBtn] = useState("Show Images");

    //new api format:
    //http://localhost:8080/api/v1/getSingleRestaurant?id=BwJnhjN-ogCmvYY864Lkww
   useEffect(() => {

        fetch('http://localhost:8080/api/v1/getSingleRestaurant?id=' + props.match.params.id, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        }).then(response => response.json())
        .then(function(response){


            setRest_details(response)
            setDataLoaded(true)
            document.title = response['name'];  
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
    if(rest_details['is_open_now']){
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
        <div class="loading-icon"></div>
        </div>
    )

}else{

   var open_time = convert_military_time(rest_details['open_time']);
   var close_time = convert_military_time(rest_details['close_time']);

    return(
        <div>
        <ScrollUpButton />

        <h1>{rest_details['name']}</h1>
        <hr/>
        {is_open(close_time)}
        <h3>Phone: {rest_details['phone']}</h3>
        <h3>{rest_details['overall_rating']}</h3>
        <h3>Price: {rest_details['price']}</h3>
        <h3>Location: {rest_details['location'] + " " + rest_details['city'] + "," + rest_details['state']}</h3>
        <h3>Hours: {open_time} until {close_time}</h3>

        <button class="button" onClick={() => {
          

      if(showImagesToUser){
        setShowImagesToUser(false)
        setShowImagesBtn("Show Images")
      }else if(!showImagesToUser){
        setShowImagesToUser(true)
        setShowImagesBtn("Hide Images")
      }

        }}>{showImagesBtn}</button>

        
        {displayImages(rest_details['photos'])}

        <RestaurantMap details={rest_details}/>
        </div>
        )
}  

}

export default DisplayRestaurantDetails;