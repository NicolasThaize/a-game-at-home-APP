import React from "react";
import SessionsFuncs from "../../../Sessions";
import '../../../assets/css/adminSessions.min.css';
import ShowSession from "./ShowSession";

class Sessions extends React.Component{
  state = {
    isLoading: true,
    sessions: [],
    showedSession: '',
    isModalActive: false
  }

  componentDidMount() {
    SessionsFuncs.prototype.getAllSessions().then(r => {
      this.setState({sessions: r, isLoading: false})
    }).catch(e => this.setState({error: e}));
  }

  showSession = (session) => {
    this.setState({showedSession:session})
    this.triggerModal();
  }

  triggerModal = () => {
    this.setState({isModalActive: !this.state.isModalActive})
  }

  render() {
    const { isLoading, sessions, isModalActive, showedSession} = this.state;
    return (
      <div className="">
        {isLoading ? "Loading" : undefined}
        {sessions.map(session => (
          <div className="columns mb-3 sessionsContainer is-align-items-center" key={session.id}>
            <div className="column">
              <p>#{session.id}</p>
            </div>
            <div className="column">
              <p>{session.name}</p>
            </div>
            <div className="column">
              <p>du {session.start_date} au {session.end_date}</p>
            </div>
            <div className="column">
              <button className='button' onClick={() => this.showSession(session)}>Voir</button>
              <button className='button is-warning'>Modifier</button>
              <button className='button is-danger'>Supprimer</button>
            </div>
          </div>
        ))}
        {isModalActive ? <ShowSession session={showedSession} triggerModal={this.triggerModal}/> : undefined}
      </div>
    );
  }
}

export default Sessions;
