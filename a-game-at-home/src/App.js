import React, {Component} from 'react'
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router, Route } from 'react-router-dom';

//Importing components
import Footer from './components/footerComponents/Footer';
import Navbar from './components/navbarComponents/Navbar';
import Home from "./components/homeComponent/Home";
import LoginRegisterButton from "./components/authComponents/LoginRegisterButton";
import Presentation from "./components/presentationComponents/Presentation";
import Articles from "./components/articleComponents/Articles";
import AddPlayerToTeam from "./components/myAccountComponents/AddTeamComponents/AddPlayerToTeam";
import JoinTeam from "./components/myAccountComponents/JoinTeamComponents/JoinTeam";
import CreateTeam from "./components/myAccountComponents/createTeamComponents/CreateTeam";
import Admin from "./components/adminComponents/Admin";
import JoinSession from "./components/joinSessionComponents/JoinSession";
import JoinSessionValidation from "./components/joinSessionComponents/JoinSessionValidation";
import ActualSession from "./components/actualSessionComponents/ActualSession";
import MyAccount from "./components/myAccountComponents/MyAccount";
import NotFound from "./components/notFoundComponents/NotFound";
// Importing css for global css in the app
import './assets/css/default.min.css';
//Importing the variables of bulma to make custom variables work
import './variable.scss';

import User from "./User";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import {Redirect} from "react-router";




class App extends Component {
  state = {
    isLogged: !!localStorage.getItem("refresh_token"),
    isAdmin: User.prototype.getUserData().admin
  }

  /**
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   * checks if the value admin in the token is true and set isAdmin belonging to this value
   */
  updateLogin = async () => {
    this.setState({isLogged: true} , () => {
      if (this.state.isLogged){
        const user = User.prototype.getUserData();
        this.setState({isAdmin: user.admin})
      }
    });
  }
  /**
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   */
  updateLogout = () => {
    this.setState({isLogged: false, isAdmin: false});
  }

  /**
   * If the user is logged when comming on app sets isLogged if token is stored
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   */
  componentDidMount() {
    const isLogged = !!localStorage.getItem("refresh_token");
    this.setState({isLogged: isLogged} , () => {
      if (this.state.isLogged){
        const user = User.prototype.getUserData();
        this.setState({isAdmin: user.admin})
      }
    });
  }

  render(){
    const { isLogged, isAdmin } = this.state;
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
              <Navbar isLogged={isLogged} isAdmin={isAdmin}/>
              <Route exact path="/" component={Home} />
              <Route exact path="/Presentation" component={Presentation} />
              <Route exact path="/Articles" component={Articles} />

              <Route exact path="/Login"  render={() => <LoginRegisterButton updateLogin={this.updateLogin} />} />
              <Route exact path="/Register" component={LoginRegisterButton} />

              <PrivateRoute authed={this.state.isLogged}>
                <Route exact path="/Profile" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
                <Route exact path="/Profile/modify" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
                <Route exact path="/Profile/sessions" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
                <Route exact path="/Profile/teams" render={() => <MyAccount updateLogout={this.updateLogout} />}/>
                <Route exact path="/Profile/teams/:id" component={AddPlayerToTeam}/>
                <Route exact path="/Profile/join/team" component={JoinTeam}/>
                <Route exact path="/Profile/create/team" component={CreateTeam}/>

                <Route exact path="/join/session" component={JoinSession}/>
                <Route exact path="/join/session/validation" render={(props) => <JoinSessionValidation {...props}/>}/>

                <Route exact path="/session/actual" component={ActualSession}/>

                <AdminRoute authed={this.state.isAdmin}>
                  <Route exact path="/Admin" component={Admin}/>
                  <Route exact path="/Admin/sessions" component={Admin}/>
                  <Route exact path="/Admin/challenges" component={Admin}/>
                  <Route exact path="/Admin/proofs" component={Admin}/>
                  <Route exact path="/Admin/notValidated" component={Admin}/>
                </AdminRoute>
              </PrivateRoute>
              <Route path='/notfound' component={NotFound}/>
                <Route path='/*' exact>
                  <Redirect to='/notfound'/>
                </Route>
              <Footer/>
            </div>
          </main>
        </HelmetProvider>
      </Router>
    );
  }
}

export default App;
