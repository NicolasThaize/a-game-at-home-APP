import React from "react";
import SendProofModal from "./SendProofModal";

class AvailableChallenges extends React.Component{
  state = {
    challenges: this.props.challenges,
    isSendProofActive: false,
    activeChallenge: ''
  }

  /**
   * Is executed when props changes
   * @param props
   * @param state
   */
  static getDerivedStateFromProps(props, state) {
    return state.challenges = props.challenges
  }

  sendProof = (challenge) => {
    this.triggerSendProofModal(challenge);
  }
  triggerSendProofModal = (challenge) => {
    this.setState({isSendProofActive: !this.state.isSendProofActive, activeChallenge: challenge})
  }

  render() {
    const {challenges ,isSendProofActive, activeChallenge} = this.state;
    return (
      <div>
        <h3 className="title is-3">Challenges restants</h3>
        {challenges.map(challenge => {
          return (
            <div key={challenge.id} className='box'>
              <div className='columns is-vcentered'>
                <div className='column'>
                  <h6 className='title is-6'>{challenge.name}</h6>
                  <p>{challenge.description}</p>
                </div>
                <div className='column'>
                  <button className="button is-primary" onClick={() => this.sendProof(challenge)}>Soumettre une preuve</button>
                </div>
              </div>
            </div>
          )
        })}
        {isSendProofActive ?
          <SendProofModal
            triggerModal={this.triggerSendProofModal}
            challenge={activeChallenge}
          /> : undefined}
      </div>
    );
  }
}

export default AvailableChallenges;
