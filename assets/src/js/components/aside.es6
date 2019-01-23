import React from 'react';
import { render } from 'react-dom';

import FilterComp from './filterComp.es6';

export default class Aside extends React.Component{
    _logging(string){
        console.log(string)
    }

    render(){
        return (
            <aside>
                <section>
                    <h1> Welkom </h1>
                    <p>
                        Welkom op de website van Ticketmapper. De tool om evenementen bij jou in de buurt te vinden. Klik een icoon op de map om erachter te komen wat er te doen is.
                    </p>
                </section>
                <FilterComp say={(string) => this._logging(string)} />
            </aside>
        );
    };
}
