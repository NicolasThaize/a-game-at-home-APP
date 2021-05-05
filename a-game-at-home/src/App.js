import React, { Component } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import axiosInstance from "./axiosApi";


//Importing components
import Footer from './components/footerComponents/Footer';
import Navbar from './components/navbarComponents/Navbar';
import Home from "./components/homeComponent/Home";
import LoginRegisterButton from "./components/authComponents/LoginRegisterButton";
import Presentation from "./components/presentationComponents/Presentation";
import Articles from "./components/articleComponents/Articles";

// Importing css for global css in the app
import './assets/css/default.min.css';
//Importing the variables of bulma to make custom variables work
import './variable.scss';



class App extends Component {
  handleLogout = async() => {
    try {
      const response = await axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      return response;
    }
    catch (e) {
      throw e;
    }
  };

  render(){
    return (
      <Router>
        <HelmetProvider>
          <main>
            <Helmet>
              {/*Tab Infos*/}
              <title>At Home A Game</title>
              <link rel="icon" href={process.env.PUBLIC_URL + "/img/favicon.ico"}/>

              {/* SEO */}
              <meta name="keywords" content="HTML, CSS, JavaScript, React, Sass, Gulp"/>
              <meta name="description" content="Faites vos demandes de noms de domaine rapidement"/>
              <meta name="author" content="Leo MASSEGLIA, Nicolas THAIZE"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <div className="App">
              <button type='button' onClick={this.handleLogout}>Logout</button>
              <Navbar/>
              <Route exact path="/" component={Home} />
              <Route exact path="/Login" component={LoginRegisterButton} />
              <Route exact path="/Register" component={LoginRegisterButton} />
              <Route exact path="/Presentation" component={Presentation} />
              <Route exact path="/Articles" component={Articles} />
              <Footer/>
            </div>
          </main>
        </HelmetProvider>
      </Router>
    );
  }
}

export default App;
