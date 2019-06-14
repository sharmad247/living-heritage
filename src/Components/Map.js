import React, { PureComponent } from 'react'
import { trackPromise } from 'react-promise-tracker';
import FAB from './FAB'
import TreeInfoBox from './TreeInfoBox'
import cMarker from '../Assets/tree.png'
import GpsFixed from '@material-ui/icons/GpsFixed';
import Fab from '@material-ui/core/Fab';
import AddTreeBox from './AddTreeBox';
import Spinner from './LoadingSpinner';
import SimpleStorage from 'react-simple-storage'


let mapHeight = window.innerHeight - 112
let map, marker, markers, GeoMarker, Data, fetchAll=null


class Map extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            showBox: false,
            currentTreeData: null,
            centre: {
                lat: 15.72,
                lng: 73.89
            },
            zoom: 8
        }
    }


    handleClick = (treeData) => {
        if (this.state.showBox === false || treeData.id === this.state.currentTreeData.id)
            this.setState({
                showBox: !this.state.showBox,
                currentTreeData: treeData,
                centre: { lat: treeData.pos.lat, lng: treeData.pos.long },
                zoom: map.getZoom()
            })
        this.setState({
            currentTreeData: treeData,
            centre: { lat: treeData.pos.lat, lng: treeData.pos.long },
            zoom: map.getZoom()
        })
        map.panTo({ lat: treeData.pos.lat, lng: treeData.pos.long })
    }

    componentDidMount() {
        if(!fetchAll) {
            console.log("Fetching Data")
            let firebaseDb = this.props.firebaseApp.firestore()
            fetchAll = firebaseDb.collection('index').doc('mapload')
        }
        trackPromise(
            fetchAll.get().then(doc => {
                Data = doc.data().data
                this.renderMap()
            }), 'map'
        )
    }

    renderMap() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.state.centre,
            zoom: this.state.zoom,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
            clickableIcons: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: ['hybrid', 'roadmap', 'satellite'],
                style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        });

        // Add some markers to the map.
        markers = Data.map((item) => {
            marker = new window.google.maps.Marker({
                position: {
                    lat: item.pos.lat,
                    lng: item.pos.long
                },
                id: item.id,
                icon: cMarker
            });
            marker.addListener('click', () => {
                this.handleClick(
                    { ...item }
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
        map.setZoom(14)
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
            <div>
                <SimpleStorage parent={this} blacklist={["showBox", "currentTreeData"]} />
                <Spinner area="map"/>
                <div id="map" style={{ height: mapHeight }}>
                    {(this.state.showBox) ? <TreeInfoBox key={this.state.currentTreeData.id} id={this.state.currentTreeData.id} firebaseApp={this.props.firebaseApp}/> : null}
                </div>
                <Fab color="secondary" aria-label="Center" size="small" className="GpsFix" onClick={this.handleCentre}>
                    <GpsFixed />
                </Fab>

                {(!this.state.showBox && !this.state.showAddBox) ? <FAB onClick={this.handleAdd} /> : null}
                {(!this.state.showBox && this.state.showAddBox) ? <AddTreeBox map={map} handleCancel={this.handleCancel} firebaseApp={this.props.firebaseApp} /> : null}

            </div>
        )
    }
}

export default Map