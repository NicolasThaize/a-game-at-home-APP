import React from "react";
import '../../../assets/css/adminSessions.min.css';
import ShowChallenge from "./ShowChallenge";
import ModifyChallenge from "./ModifyChallenge";
import DeleteChallenge from "./DeleteChallenge";
import CreateChallenge from "./CreateChallenge";
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

  async componentDidMount() {
    await this.refreshChallenges();
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

  refreshChallenges =  async () => {
    await ChallengesFuncs.prototype.getAllChallenges().then(r => {
      this.setState({challenges: r, isLoading: false})
    }).catch(e => this.setState({error: e}));
  }

  render() {
    const { isLoading, challenges, isShowActive, showedChallenge, isModifyActive, isDeleteActive, isCreateActive} = this.state;
    return (
      <div className="">
        <button className='button is-primary' onClick={this.createChallenge}>Créer un défi</button>
        {isLoading ? "Loading" : undefined}
        {challenges.map(challenge => (
          <div className="columns mb-3 mt-3 sessionsContainer is-align-items-center" key={challenge.id}>
            <div className="column">
              <p>#{challenge.id}</p>
            </div>
            <div className="column">
              <p>{challenge.name}</p>
            </div>
            <div className="column">
              <button className='button' onClick={() => this.showChallenge(challenge)}>Voir</button>
              <button className='button is-warning' onClick={() => this.modifyChallenge(challenge)}>Modifier</button>
              <button className='button is-danger' onClick={() => this.deleteChallenge(challenge)}>Supprimer</button>
            </div>
          </div>
        ))}
        {isShowActive ? <ShowChallenge challenge={showedChallenge} triggerModal={this.triggerShowModal}/> : undefined}
        {isModifyActive ?
          <ModifyChallenge
            challenge={showedChallenge}
            triggerModal={this.triggerModifyModal}
            refreshChallenges={this.refreshChallenges}
          /> : undefined}
        {isDeleteActive ?
          <DeleteChallenge
            challenge={showedChallenge}
            triggerModal={this.triggerDeleteModal}
            refreshChallenges={this.refreshChallenges}
          /> : undefined}
        {isCreateActive ?
          <CreateChallenge
            triggerModal={this.triggerCreateModal}
            refreshChallenges={this.refreshChallenges}
          /> : undefined}

      </div>
    );
  }
}

export default Challenges;
