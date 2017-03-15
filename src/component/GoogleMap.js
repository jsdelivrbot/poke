/* global google */
import React,{Component} from 'react'
import { connect } from 'react-redux';
import { createMove } from '../actions/index';
import {
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";


const AccessingArgumentsExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={4}
        defaultCenter={props.center}
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, index) =>
            <Marker position={marker.position} key={index} />
        )}
    </GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class AccessingArgumentsExample extends Component {
    //
    // componentDidMount(){
    //     console.log('props',this.props);
    //     const {latitude,longitude} = this.props;
    //     if(latitude === null && longitude === null){
    //         console.log('grg')
    //     }
    //     else {
    //         this.setState({
    //             center: new google.maps.LatLng(latitude,longitude),
    //             markers: [
    //                 ...this.state.markers,
    //                 { position: new google.maps.LatLng(latitude,longitude)},
    //             ],
    //         });
    //     }
    // }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            console.log('props',this.props,nextProps)
            console.log('lat',nextProps.latitude)
            console.log('f',nextProps.latitude)
            const newLatLng = new google.maps.LatLng(nextProps.latitude,nextProps.longitude);
            this.setState({
                center: newLatLng,
                markers: [
                    ...this.state.markers,
                    {position: newLatLng},
                ],
            });
        }
    }
    state = {
        markers: [],
        center: new google.maps.LatLng(-25.363882, 131.044922),
    };

    handleMapClick = this.handleMapClick.bind(this);
    
    handleMapClick(event) {
        console.log('oskffsefjawpesfjprso')
        console.log(this.state.center.lat())
        console.log(this.state.center.lng())
        let lat = this.state.center.lat();
        let lng = this.state.center.lng();
        this.props.createMove(lat,lng);
        this.setState({
            center: event.latLng,
            markers: [
                ...this.state.markers,
                { position: event.latLng },
            ],
        });
    }

    render() {
        console.log(this.props);
        console.log('state',this.state.center.lat());
        return (
            <AccessingArgumentsExampleGoogleMap
                containerElement={
                    <div className="google-map" />
                }
                mapElement={
                    <div  className="google-map" />
                }
                onMapClick={this.handleMapClick}
                center={this.state.center}
                markers={this.state.markers}
            />
        );
    }
}

export default connect(null,{ createMove }) (AccessingArgumentsExample);