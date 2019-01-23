import React from 'react';
import { render } from 'react-dom';

export default class FilterComp extends React.Component{

    render(){
        return (
            <section>
                <h1> Legenda </h1>
                <ul>
                    <li  onClick={() => this.props.say("music")}> <div id="icon" className="music" /> <div id="title"> Muziek </div> </li>
                    <li> <div id="icon" className="film" /> <div id="title"> Film </div> </li>
                    <li> <div id="icon" className="art" /> <div id="title"> Kunst en Theater </div> </li>
                    <li> <div id="icon" className="misc" /> <div id="title"> Overige </div> </li>
                </ul>
            </section>
        );
    };
}
