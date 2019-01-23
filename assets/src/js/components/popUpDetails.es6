import React from 'react';
import ReactDOM from 'react-dom';

import ListItem from './listItem.es6';

export default class PopUpDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: <div id="title"> <p className="text"> Evenementen te </p> <p className="venue"> {this.props.venueName} </p> </div>,
            events: "loading"
        }
    }

    componentWillMount(){
        if(this.props.venueName == null || this.props.venueName < 2){
            this.setState({
                title: <div id="title"> <p className="text"> Evenementen </p> </div>
            })
        }

        fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=NL&venueId=" + this.props.venueId + "&startDateTime=" + this.props.eventStart + "T00:00:00Z" + "&endDateTime=" + this.props.eventStart + "T23:59:00Z" + "&apikey=26q7XKcgQmaXqIIBLUfvJnnop7CVEZCL")
            .then(response => response.json())
            .then(json => this._createComponentArray(json._embedded.events))
    }

    _createComponentArray(data){
        let filterStatus = data.filter((props) => {
            return props.dates.status.code == "onsale"
        });

        let componentArray = [];
        filterStatus.forEach(item => {
            let genre = "";
            if(item.classifications){
                if(item.classifications[0].subGenre.name != "Music" && item.classifications[0].subGenre.name != "Film" & item.classifications[0].subGenre.name != "Miscellaneous"){
                    genre = item.classifications[0].segment.name
                } else {
                    genre = item.classifications[0].subGenre.name
                }
            } else {
                genre=""
            }

            componentArray.push(<ListItem
                                    key={item.id}
                                    eventName={item.name}
                                    eventImg={item.images.find(obj => obj.ratio == "4_3").url}
                                    eventDateTime={item.dates.start.dateTime}
                                    eventUrl={item.url}
                                    eventType={genre}
                                />);
        })
        this.setState({
            events: componentArray
        })
    }

    render(){
        return(
            <div id="overlay">
                <div id="popUp">
                    <div id="header">
                        {this.state.title}
                        <div id="close" onClick={() => {this.props.closePopUp()}}> </div>
                    </div>
                    <ul>
                        {this.state.events}
                    </ul>
                </div>
            </div>
        )
    };
};
