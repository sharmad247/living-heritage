import React, { PureComponent } from 'react'
import Data from '../Assets/MockData'
import FAB from '../Components/FAB'
import { Link } from 'react-router-dom'
import TreeInfoBox from '../Components/TreeInfoBox'
import cMarker from '../Assets/tree.png'


let mapHeight = window.innerHeight - 112
let map, marker

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
        if(this.state.showBox)
            map.panTo(this.state.currentTreePosition)
    }


    componentDidMount() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 15.42, lng: 73.82 },
            zoom: 12,
            disableDefaultUI: true,
            gestureHandling: 'greedy'
        });


        // Add some markers to the map.
        var markers = Data.docs.map((item) => {
            //console.log(item)
            marker = new window.google.maps.Marker({
                position: {
                    lat: item.data.coordinates._latitude,
                    lng: item.data.coordinates._longitude
                },
                id: item.data.id,
                icon: cMarker
            });
            marker.addListener('click', () => {
                this.handleClick(
                    item.id,
                    {
                        lat: item.data.coordinates._latitude,
                        lng: item.data.coordinates._longitude
                    },
                    item.data.info.genericName
                )}
            );
            return marker
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new window.MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })

        var GeoMarker = new window.GeolocationMarker(map);
        GeoMarker.setCircleOptions({fillColor: '#8db5f8', strokeColor: '#4285F4'});
    }


    render() {
        return (
            <div>
                <div id="map" style={{ height: mapHeight }}>
                    {(this.state.showBox) ? <TreeInfoBox name={this.state.currentTreeName}/> : null}
                </div>
                <Link to="/add">
                    {(!this.state.showBox) ? <FAB /> : null}
                </Link>
            </div>
        )
    }
}

export default Map