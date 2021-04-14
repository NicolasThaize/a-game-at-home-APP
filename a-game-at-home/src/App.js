import React, {Component} from 'react'
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <Router>
        <main>
          <Helmet>
            {/*Tab Infos*/}
            <title>Catalogue de services</title>
            <link rel="icon" href="/favicons/favicon-16x16.png"/>

            {/* SEO */}
            <meta name="keywords" content="HTML, CSS, JavaScript, React, Sass, Gulp"/>
            <meta name="description" content="Faites vos demandes de noms de domaine rapidement"/>
            <meta name="author" content="Leo MASSEGLIA"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </Helmet>
          <div className="App">

          </div>
        </main>
      </Router>
    );
  }
}

export default App;
