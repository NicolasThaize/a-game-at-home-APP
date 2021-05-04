import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router,Route } from 'react-router-dom';


//Importing components
import Footer from './components/footerComponents/Footer';
import Navbar from './components/navbarComponents/Navbar';
import Home from "./components/homeComponent/Home";
import LoginRegisterButton from "./components/authComponents/LoginRegisterButton";
import Presentation from "./components/presentationComponents/Presentation";

// Importing css for global css in the app
import './assets/css/default.min.css';
//Importing the variables of bulma to make custom variables work
import './variable.scss';



class App extends Component {
  state = {
    logged_in: localStorage.getItem('token') ? true : false
  }
  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log('appjs res', json)
          this.setState({ username: json.username });
        });
    }
  }

  render(){
    return (
      <Router>
        <main>
          <Helmet>
            {/*Tab Infos*/}
            <title>At Home A Game</title>
            <link rel="icon" href="/favicon.ico"/>

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
            <Route exact path="/Presentation" component={Presentation} />
            <Footer/>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
