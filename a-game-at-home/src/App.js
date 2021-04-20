import React, {Component} from 'react'
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Footer from './components/footerComponents/Footer'

// Importing css for global css in the app
import './assets/css/default.min.css';
//Importing the variables of bulma to make custom variables work
import './assets/scss/variable.scss';

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
            <Footer></Footer>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
