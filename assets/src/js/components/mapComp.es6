import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapsApi from './GoogleMapsApi.es6';
import PopUpDetails from './popUpDetails.es6';

export default class MapComp extends React.Component{
    constructor(){
        super();

        this.state = {
            map: "",
            list: ""
        }

        this.gmapApi = new GoogleMapsApi();
        this.gmapApi.load().then(() => {
            this._fetchData();
        });
    }

    _fetchData(){
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        let month = today.getMonth() + 1;
        let day = today.getDate();
        if(today.getMonth() < 10){
            month = "0" + (today.getMonth() + 1);
        }
        if(today.getDate() < 10){
            day = "0" + today.getDate();
        }

        let dateTime = today.getFullYear() + "-" + month + "-" + day;

        fetch("https://app.ticketmaster.com/discovery/v2/events.json?&size=200&countryCode=NL" + "&classificationName=music" + "&startDateTime=" + dateTime + "T00:00:00Z" + "&endDateTime=" + dateTime + "T23:59:00Z" + "&apikey=26q7XKcgQmaXqIIBLUfvJnnop7CVEZCL")
            .then(response => response.json())
            .then(json => this._createMap(json, dateTime));
    }

    _createMap(data, start){
        this.setState({
          map: <div id="map"> </div>
        });

        let map = new google.maps.Map(document.querySelector('#map'), {
            zoom: 9,
            center: {lat: 52.092876, lng: 5.104480}
        });

        if(data._embedded){
            let filterStatus = data._embedded.events.filter((props) => {
                return props.dates.status.code == "onsale"
            });

            filterStatus.forEach(item => {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item._embedded.venues[0].location.latitude, item._embedded.venues[0].location.longitude),
                    map: map,
                    title: item._embedded.venues[0].name
                });

                marker.addListener('click', () => {
                    this.setState({
                        list:
                            <PopUpDetails closePopUp={() => this._closePopUp()} venueId={item._embedded.venues[0].id} venueName={item._embedded.venues[0].name} eventStart={start} />
                    })
                })
            })
        } else{
            console.log("request mislukt")
        }
    }

    _closePopUp(){
        this.setState({
            list: ""
        })
    }

    render(){
        return(
            <div id="main">
                {this.state.map}
                {this.state.list}
            </div>
        )
    };
};
