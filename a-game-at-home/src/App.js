import React, { Component } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router,Route } from 'react-router-dom';

//Importing components
import Footer from './components/footerComponents/Footer';
import Navbar from './components/navbarComponents/Navbar';
import Home from "./components/homeComponent/Home";
import LoginRegisterButton from "./components/authComponents/LoginRegisterButton";
import Presentation from "./components/presentationComponents/Presentation";
import Articles from "./components/articleComponents/Articles";
import AddPlayerToTeam from "./components/myAccountComponents/AddTeam/AddPlayerToTeam";
import JoinTeam from "./components/myAccountComponents/JoinTeamComponents/JoinTeam";


// Importing css for global css in the app
import './assets/css/default.min.css';
//Importing the variables of bulma to make custom variables work
import './variable.scss';
import MyAccount from "./components/myAccountComponents/MyAccount";



class App extends Component {
  state = {
    isLogged: false
  }

  /**
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   */
  updateLogin = async () => {
    this.setState({isLogged: true});
  }
  /**
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   */
  updateLogout = () => {
    this.setState({isLogged: false});
  }

  /**
   * If the user is logged when comming on app sets isLogged if token is stored
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   */
  componentDidMount() {
    const isLogged = !!localStorage.getItem("refresh_token");
    this.setState({isLogged: isLogged});
  }

  render(){
    const { isLogged } = this.state;
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
              <Navbar isLogged={isLogged}/>

              <Route exact path="/" component={Home} />

              <Route exact path="/Login"  render={() => <LoginRegisterButton updateLogin={this.updateLogin} />} />
              <Route exact path="/Register" component={LoginRegisterButton} />

              <Route exact path="/Profile" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
              <Route exact path="/Profile/modify" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
              <Route exact path="/Profile/sessions" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
              <Route exact path="/Profile/teams" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
              <Route exact path="/Profile/teams/:id" component={AddPlayerToTeam}/>
              <Route exact path="/Profile/join/team" component={JoinTeam}/>

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
