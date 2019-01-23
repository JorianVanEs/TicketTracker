import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.es6';
import Aside from './components/aside.es6';
import Footer from './components/footer.es6';
import MapComp from './components/mapComp.es6';

class App extends React.Component{

    render(){
        return(
            <div id="page">
                <Header  />
                <Aside />
                <MapComp />
                <Footer />
            </div>
        )
    };
};

ReactDOM.render(<App />, document.getElementById('app'));
