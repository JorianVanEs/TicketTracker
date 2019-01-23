import React from 'react';
import { render } from 'react-dom';

export default class Footer extends React.Component{

    render(){
        return (
            <footer>
                <p> Copyright © {new Date().getFullYear()} Jorian van Es </p>
                <p> Powered by Ticketmaster Discovery API V2 </p>
            </footer>
        );
    };
}
