import React from 'react';
import RestaurantMap from './map.js';
import ScrollUpButton from "react-scroll-up-button";


export default class Restaurant extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
           rest_details:{},
           dataLoaded : false,
           showImages: false,
           showImagesButton:"Show Images"
       };

       
       this.showPhotos = this.showPhotos.bind(this);


    }



    componentDidMount(){

    console.log("Fetching restaurant details");


    fetch('http://localhost:3001/restaurant/' + this.props.match.params.id, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lat: this.state.lat,lng: this.state.lng, type:"rest", meal_type:"lunch"}),
      }).then(response => response.json())
      .then(function(response){

          this.setState({rest_details : response});
          console.log(this.state.rest_details);
          document.title = this.state.rest_details['name'] + " Details";  
          this.setState({dataLoaded:true})

      }.bind(this));
    }


    showPhotos(){

        if(!this.state.showImages){
            this.setState({showImages:true})
            this.setState({showImagesButton:"Hide Images"})
        }else if(this.state.showImages){
            this.setState({showImages:false})
            this.setState({showImagesButton:"Show Images"})


        }

    }

    render() {



            
        const displayImages = (photosArray) => {
          
            if(this.state.showImages){
                return(
                    <div class="images-container">
                    <img src={photosArray[0]}></img>
                    <img src={photosArray[1]}></img>
                    <img src={photosArray[2]}></img>
                    </div>
                    ) 
            }
              
      }
        
        if(!this.state.dataLoaded){
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

                <h1>{this.state.rest_details['name']}</h1>
                <hr/>
                <h3>Phone: {this.state.rest_details['display_phone']}</h3>
                <h3>{this.state.rest_details['rating']} / 5 based on {this.state.rest_details['review_count']} reviews</h3>
                <h3>Price: {this.state.rest_details['price']}</h3>
                <h3>Location: {this.state.rest_details['location']['display_address'][0]} {this.state.rest_details['location']['display_address'][1]}</h3>
                <h3>Hours: {this.state.rest_details['hours'][0]['open'][0]['start']} until {this.state.rest_details['hours'][0]['open'][0]['end']}</h3>
                <button class="button" onClick={() => { this.showPhotos() }}>{this.state.showImagesButton}</button>

                
                {displayImages(this.state.rest_details['photos'])}

                <RestaurantMap details={this.state.rest_details}/>
                </div>
                )
        }    
        }
}

