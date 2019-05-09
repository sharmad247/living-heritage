import React, { PureComponent } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import Data from '../Assets/MockData'
import FAB from '../Components/FAB'
import { Link } from 'react-router-dom'
import TreeInfoBox from '../Components/TreeInfoBox'

let mapHeight = window.innerHeight - 112

class Map extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showBox: false,
            treeData: {},
            currentTreeID: 0,
            currentTreePosition: {
                lat: 15.72,
                lng: 72.89
            },
            initialPosition: {
                lat: 15.72,
                lng: 72.89
            },
            currentTreeName: "Default"
        }
    }


    handleClick = (id, position, name) => {
        if(id === this.state.currentTreeID || this.state.showBox === false)
            this.setState({showBox: !this.state.showBox})
        this.setState({currentTreeID: id})
        this.setState({currentTreePosition: position})
        this.setState({currentTreeName: name})
    }

    render() {
        console.log(mapHeight)
        console.log(this.state.showBox)
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
                        zoom={4}
                        center={this.state.currentTreePosition}
                        options={{
                            disableDefaultUI: true,
                            gestureHandling: 'greedy',
                        }}
                    >
                        <MarkerClusterer
                            options={{ imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" }}
                        >
                            {
                                (clusterer) => Data.docs.map((item) => (
                                    <Marker
                                        key={item.id}
                                        position= {
                                            {
                                                lat: item.data.coordinates._latitude,
                                                lng: item.data.coordinates._longitude
                                            }                  
                                        }
                                        clusterer={clusterer}
                                        onClick={()=> {this.handleClick(
                                            item.id,
                                            {
                                                lat: item.data.coordinates._latitude,
                                                lng: item.data.coordinates._longitude
                                            },
                                            item.data.info.genericName
                                        )}}
                                    />
                                ))
                            }
                        </MarkerClusterer>
                    </GoogleMap>
                </LoadScript>
                <Link to="/add">
                    <FAB />
                </Link>
                {(this.state.showBox) ? <TreeInfoBox name={this.state.currentTreeName}/> : null}
            </div>
        )
    }
}

export default Map