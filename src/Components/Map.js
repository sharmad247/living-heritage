import React, { Component } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker} from '@react-google-maps/api'
import Data from '../Assets/MockData'
import FAB from '../Components/FAB'
import {Link} from 'react-router-dom'

let mapHeight = window.innerHeight - 112

class Map extends Component {
  render() {
      console.log(mapHeight)
     return (
         <div>
             <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyBcgesjU679eYckA_hjskGYKfqmhK3gMuI"
            >
                <GoogleMap
                    id="marker-example"
                    mapContainerStyle={{
                    height: mapHeight,
                    width: "100%"
                    }}
                    zoom={5}
                    center={{lat: -28.024, lng: 140.887}}
                    options={{
                        disableDefaultUI: true,
                        gestureHandling: 'greedy'
                    }}
                >
                    <MarkerClusterer
                        options={{imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"}}
                        >
                        {
                            (clusterer) => Data.map((item) => (
                                <Marker
                                    key={item.id}
                                    position={item.position}
                                    clusterer={clusterer}
                                />
                            ))
                        }
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
            <Link to="/add">
                <FAB />
            </Link>
         </div>
     )
  }
}

export default Map