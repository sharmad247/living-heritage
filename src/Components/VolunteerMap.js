import React, { PureComponent } from 'react'
import { trackPromise } from 'react-promise-tracker';
import VolTreeInfoBox from './VolTreeInfoBox'
import cMarker from '../Assets/tree.png'
import cMarkerYellow from '../Assets/tree_yellow.png'
import cMarkerOrange from '../Assets/tree_orange.png'
import cMarkerRed from '../Assets/tree_red.png'
import GpsFixed from '@material-ui/icons/GpsFixed';
import Fab from '@material-ui/core/Fab';
import Spinner from '../Components/LoadingSpinner';
import SimpleStorage from 'react-simple-storage'
import ReactGA from 'react-ga'

let mapHeight = window.innerHeight - 112
let map, marker, markers, GeoMarker, Data, fetchAll = null


class Volunteer extends PureComponent {

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
    if (!fetchAll) {
      console.log("Fetching Data")
      let firebaseDb = this.props.firebaseApp.firestore()
      fetchAll = firebaseDb.collection('trees_index').doc('mapload')
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

    console.log(new Date()) //Thu Jul 18 2019 09:14:49 GMT+0530 (India Standard Time)
    // Add some markers to the map.
    markers = Data.map((item) => {
      let markerPin

      if(item.updated);

      //console.log(new Date(item.updated))

      const date1 = new Date(item.updated);
      const date2 = new Date();
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if(diffDays > 160)
        markerPin = cMarkerRed
      else if (diffDays > 120 && diffDays < 160)
        markerPin = cMarkerOrange
      else if(diffDays > 70 && diffDays < 120)
        markerPin = cMarkerYellow
      else
        markerPin = cMarker

      marker = new window.google.maps.Marker({
        position: {
          lat: item.pos.lat,
          lng: item.pos.long
        },
        id: item.id,
        icon: markerPin
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
    {
      ReactGA.event({
        category: 'User',
        action: 'Volunteer'
      })
    }
    return (
      <div>
        <SimpleStorage parent={this} blacklist={["showBox", "currentTreeData"]} />
        <Spinner area="map" />
        <div id="map" style={{ height: mapHeight }}>
          {(this.state.showBox) ? <VolTreeInfoBox key={this.state.currentTreeData.id} id={this.state.currentTreeData.id} firebaseApp={this.props.firebaseApp} /> : null}
        </div>
        <Fab color="secondary" aria-label="Center" size="small" className="GpsFix" onClick={this.handleCentre}>
          <GpsFixed />
        </Fab>
      </div>
    )
  }
}

export default Volunteer