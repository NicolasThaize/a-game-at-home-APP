import React from "react";
import SessionsFuncs from "../../../Sessions";
import '../../../assets/css/adminSessions.min.css';
import ShowSession from "./ShowSession";
import ModifySession from "./ModifySession";
import DeleteSession from "./DeleteSession";
import CreateSession from "./CreateSession";

class Sessions extends React.Component{
  state = {
    isLoading: true,
    sessions: [],
    showedSession: '',
    isShowActive: false,
    isModifyActive: false,
    isDeleteActive: false,
    isCreateActive: false
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

  deleteSession = (session) => {
    this.setState({showedSession:session})
    this.triggerDeleteModal();
  }
  triggerDeleteModal = () => {
    this.setState({isDeleteActive: !this.state.isDeleteActive})
  }

  createSession = () => {
    this.triggerCreateModal();
  }
  triggerCreateModal = () => {
    this.setState({isCreateActive: !this.state.isCreateActive})
  }

  /**
   * Get all sessions
   */
  refreshSessions = () => {
    SessionsFuncs.prototype.getAllSessions().then(r => {
      this.setState({sessions: r, isLoading: false})
    }).catch(e => this.setState({error: e}));
  }

  render() {
    const { isLoading, sessions, isShowActive, showedSession, isModifyActive, isDeleteActive, isCreateActive} = this.state;
    return (
      <div className="">
        <button className='button is-primary' onClick={this.createSession}>Créer une session</button>
        {isLoading ? "Loading" : undefined}
        {sessions.map(session => (
          <div className="columns mb-3 mt-3 sessionsContainer is-align-items-center" key={session.id}>
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
              <button className='button is-danger' onClick={() => this.deleteSession(session)}>Supprimer</button>
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
        {isDeleteActive ?
          <DeleteSession
            session={showedSession}
            triggerModal={this.triggerDeleteModal}
            refreshSessions={this.refreshSessions}
          /> : undefined}
        {isCreateActive ?
          <CreateSession
            triggerModal={this.triggerCreateModal}
            refreshSessions={this.refreshSessions}
          /> : undefined}

      </div>
    );
  }
}

export default Sessions;
