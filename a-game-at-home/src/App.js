import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Footer from './components/footerComponents/Footer';
import Navbar from './components/navbarComponents/Navbar';

//Importing components
import Home from "./components/homeComponent/Home";
import Login from "./components/authComponents/loginComponents/Login";
import Register from "./components/authComponents/registerComponents/Register";

// Importing css for global css in the app
import './assets/css/default.min.css';
//Importing the variables of bulma to make custom variables work
import './variable.scss';
import LoginRegisterButton from "./components/authComponents/LoginRegisterButton";

class App extends Component {
  render(){
    return (
      <Router>
        <main>
          <Helmet>
            {/*Tab Infos*/}
            <title>At Home A Game</title>
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>

            {/* SEO */}
            <meta name="keywords" content="HTML, CSS, JavaScript, React, Sass, Gulp"/>
            <meta name="description" content="Faites vos demandes de noms de domaine rapidement"/>
            <meta name="author" content="Leo MASSEGLIA, Nicolas THAIZE"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </Helmet>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={LoginRegisterButton} />
            <Route exact path="/Register" component={LoginRegisterButton} />
            <Footer/>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
