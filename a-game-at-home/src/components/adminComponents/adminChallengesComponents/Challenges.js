import React from "react";
import '../../../assets/css/adminSessions.min.css';
import ShowSession from "./ShowChallenge";
import ModifySession from "./ModifyChallenge";
import DeleteSession from "./DeleteChallenge";
import CreateSession from "./CreateChallenge";
import ChallengesFuncs from "../../../Challenges";

class Challenges extends React.Component{
  state = {
    isLoading: true,
    challenges: [],
    showedChallenge: '',
    isShowActive: false,
    isModifyActive: false,
    isDeleteActive: false,
    isCreateActive: false
  }

  componentDidMount() {
    this.refreshChallenges();
  }

  showChallenge = (session) => {
    this.setState({showedSession:session})
    this.triggerShowModal();
  }

  triggerShowModal = () => {
    this.setState({isShowActive: !this.state.isShowActive})
  }

  modifyChallenge = (Challenge) => {
    this.setState({showedChallenge:Challenge})
    this.triggerModifyModal();
  }

  triggerModifyModal = () => {
    this.setState({isModifyActive: !this.state.isModifyActive})
  }

  deleteChallenge = (Challenge) => {
    this.setState({showedChallenge:Challenge})
    this.triggerDeleteModal();
  }

  triggerDeleteModal = () => {
    this.setState({isDeleteActive: !this.state.isDeleteActive})
  }

  createChallenge = () => {
    this.triggerCreateModal();
  }

  triggerCreateModal = () => {
    this.setState({isCreateActive: !this.state.isCreateActive})
  }

  refreshChallenges = () => {
    ChallengesFuncs.prototype.getAllChallenges().then(r => {
      console.log(r)
      this.setState({challenges: r, isLoading: false})
    }).catch(e => this.setState({error: e}));
  }

  render() {
    const { isLoading, challenges, isShowActive, showedChallenge, isModifyActive, isDeleteActive, isCreateActive} = this.state;
    return (
      <div className="">
        <button className='button is-primary' onClick={this.createChallenge}>Créer un défi</button>
        {isLoading ? "Loading" : undefined}
        {challenges.map(session => (
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
        {isShowActive ? <ShowSession session={showedChallenge} triggerModal={this.triggerShowModal}/> : undefined}
        {isModifyActive ?
          <ModifySession
            session={showedChallenge}
            triggerModal={this.triggerModifyModal}
            refreshChallenges={this.refreshChallenges}
          /> : undefined}
        {isDeleteActive ?
          <DeleteSession
            session={showedChallenge}
            triggerModal={this.triggerDeleteModal}
            refreshChallenges={this.refreshChallenges}
          /> : undefined}
        {isCreateActive ?
          <CreateSession
            triggerModal={this.triggerCreateModal}
            refreshChallenges={this.refreshChallenges}
          /> : undefined}

      </div>
    );
  }
}

export default Challenges;
