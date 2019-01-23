import React from 'react';
import ReactDOM from 'react-dom';

export default class ListItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            timeString: "",
            date: ""
        };

        this.date = new Date(this.props.eventDateTime);

        this.type = this.props.eventType;

        if(this.type == "Arts & Theatre"){
            this.type = "Arts"
        }
    };

    componentWillMount(){
        const weekdays = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
        const months = ["JAN", "FEB", "MAA", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"];

        let day = this.date.getDate();
        if(this.date.getDate() < 10){
            day = "0" + this.date.getDate();
        }

        this.setState({
            date:
                <div id="date">
                    <div id="month"> {months[this.date.getMonth()]} </div>
                    <div id="day"> {day} </div>
                    <div id="year"> {this.date.getFullYear()} </div>
                </div>
        });

        let time = weekdays[this.date.getDay()] + ", " + this.date.getHours() + ":" + this.date.getMinutes();
        if(this.date.getMinutes() < 10){
            time = weekdays[this.date.getDay()] + ", " + this.date.getHours() + ":" + this.date.getMinutes() + "0";
        } else if(isNaN(this.date)){
            time = "Geen starttijd";
            this.setState({
                date: <div id="date"> </div>
            })
        }

        this.setState({
            timeString: time
        })
    };

    render(){
        return(
            <li>
                <img src={this.props.eventImg} />
                {this.state.date}
                <div id="details">
                    <div id="info"> {this.state.timeString} </div>
                    <h1> {this.props.eventName} </h1>
                </div>
                <div id="control">
                    <div id="genre" className={this.type} />
                    <a href={this.props.eventUrl}> <div id="button"> Bestel </div> </a>
                </div>
            </li>
        )
    };
};
