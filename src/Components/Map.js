import React, { PureComponent } from 'react'
import Data from '../Assets/MockData'
import FAB from './FAB'
import TreeInfoBox from './TreeInfoBox'
import cMarker from '../Assets/tree.png'
import GpsFixed from '@material-ui/icons/GpsFixed';
import Fab from '@material-ui/core/Fab';
import AddTreeBox from './AddTreeBox';


let mapHeight = window.innerHeight - 112
let map, marker, markers, GeoMarker


class Map extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            showBox: false,
            currentTreeData: null,
            initialPosition: {
                lat: 15.72,
                lng: 72.89
            }
        }
    }


    handleClick = (treeData) => {
        if (this.state.showBox === false || treeData.id === this.state.currentTreeData.id)
            this.setState({
                showBox: !this.state.showBox,
                currentTreeData: treeData,
            })
        this.setState({
            currentTreeData: treeData,
        })
        if (this.state.showBox)
            map.panTo({ lat: this.state.currentTreeData.data.coordinates._latitude, lng: this.state.currentTreeData.data.coordinates._longitude })
    }

    componentDidMount() {
        this.renderMap()
    }

    renderMap() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 15.42, lng: 73.82 },
            zoom: 12,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
            clickableIcons: false 
        });


        // Add some markers to the map.
        markers = Data.docs.map((item) => {
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
                    { ...item },
                    item.id,
                    {
                        lat: item.data.coordinates._latitude,
                        lng: item.data.coordinates._longitude
                    },
                    item.data.info.genericName
                )
            }
            );
            return marker
        });

        map.addListener('click', () => {
            this.setState({ showBox: false })
        });


        // Add a marker clusterer to manage the markers.
        new window.MarkerClusterer(map, markers,
            {
                minimumClusterSize: 10,
                imagePath: '/cluster/m'
            })

        GeoMarker = new window.GeolocationMarker(map);
        GeoMarker.setCircleOptions({ fillColor: '#8db5f8', strokeColor: '#4285F4' });
    }

    handleCentre = () => {
        map.panTo(GeoMarker.getPosition())
    }

    handleAdd = () => {
        this.clearMarkers()
        this.setState({ showAddBox: true })
    }

    setMapOnAll = (map) => {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    clearMarkers = () => {
        this.setMapOnAll(null);
    }

    handleCancel = () => {
        this.setState({
            showAddBox: false,
        })
    }


    render() {
        return (
            <div >
                <div id="map" style={{ height: mapHeight }}>
                    {(this.state.showBox) ? <TreeInfoBox {...this.state.currentTreeData} /> : null}
                </div>
                <Fab color="secondary" aria-label="Center" size="small" className="GpsFix" onClick={this.handleCentre}>
                    <GpsFixed />
                </Fab>

                {(!this.state.showBox && !this.state.showAddBox) ? <FAB onClick={this.handleAdd} /> : null}
                {(!this.state.showBox && this.state.showAddBox) ? <AddTreeBox map={map} handleCancel={this.handleCancel} /> : null}
            </div>
        )
    }
}

export default Map