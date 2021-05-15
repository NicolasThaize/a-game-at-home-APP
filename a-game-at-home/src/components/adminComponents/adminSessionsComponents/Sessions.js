import React from "react";
import SessionsFuncs from "../../../Sessions";
import '../../../assets/css/adminSessions.min.css';
import ShowSession from "./ShowSession";
import ModifySession from "./ModifySession";

class Sessions extends React.Component{
  state = {
    isLoading: true,
    sessions: [],
    showedSession: '',
    isShowActive: false,
    isModifyActive: false
  }

  componentDidMount() {
    this.refreshSessions();
  }

  showSession = (session) => {
    this.setState({showedSession:session})
    this.triggerShowModal();
  }

  triggerShowModal = () => {
    this.setState({isShowActive: !this.state.isShowActive})
  }

  modifySession = (session) => {
    this.setState({showedSession:session})
    this.triggerModifyModal();
  }

  triggerModifyModal = () => {
    this.setState({isModifyActive: !this.state.isModifyActive})
  }

  refreshSessions = () => {
    SessionsFuncs.prototype.getAllSessions().then(r => {
      this.setState({sessions: r, isLoading: false})
    }).catch(e => this.setState({error: e}));
  }

  render() {
    const { isLoading, sessions, isShowActive, showedSession, isModifyActive} = this.state;
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
              <button className='button is-warning' onClick={() => this.modifySession(session)}>Modifier</button>
              <button className='button is-danger'>Supprimer</button>
            </div>
          </div>
        ))}
        {isShowActive ? <ShowSession session={showedSession} triggerModal={this.triggerShowModal}/> : undefined}
        {isModifyActive ?
          <ModifySession
          session={showedSession}
          triggerModal={this.triggerModifyModal}
          refreshSessions={this.refreshSessions}
          /> : undefined}
      </div>
    );
  }
}

export default Sessions;