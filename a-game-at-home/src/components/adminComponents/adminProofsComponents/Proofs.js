import React from "react";
import ProofsFuncs from "../../../Proofs";
import ProofsShowModal from "./ProofsShowModal";

class Proofs extends React.Component{
  state = {
    proofs: [],
    selectedProof: '',
    isShowActive: false
  }

  componentDidMount() {
    ProofsFuncs.prototype.getAllProofs().then(r => {
      this.setState({proofs: r})
    })
  }

  showProof = (selectedProof) => {
    this.setState({selectedProof: selectedProof})
    this.triggerShowModal();
  }
  triggerShowModal = () => {
    this.setState({isShowActive: !this.state.isShowActive})
  }

  render() {
    const { proofs, isShowActive, selectedProof } = this.state;
    return (
      <div>
        <div className='columns is-hidden-mobile'>
          <div className='column'>
            <p><strong>Id de la preuve</strong></p>
          </div>
          <div className='column'>
            <p><strong>Nom du défi: Description du défi</strong></p>
          </div>
          <div className='column'>
            <p><strong>Statut de la preuve</strong></p>
          </div>
          <div className='column'>
          </div>
        </div>
        {proofs.map(proof => {
          let isValidated;
          switch (proof.validated){
            case 0:
              isValidated = {text: "Non validé", class: 'has-text-danger'};
              break;
            case 1:
              isValidated = {text: "Validé", class: 'has-text-success'};
              break;
            case 3:
              isValidated = {text: "Pas encore évalué", class: 'has-text-warning'};
              break;
            default:
              isValidated = {text: "Erreur", class: 'has-text-warning'};
              break;
          }
          const challenge = proof.challenge[0]
          return (
            <div key={proof.id} className='box columns'>
              <div className='column'>
                <p className='is-hidden-tablet'><strong>Id de la preuve</strong></p>
                <p># {proof.id}</p>
              </div>
              <div className='column'>
                <p className='is-hidden-tablet'><strong>Nom du défi: Description du défi</strong></p>
                <p>{challenge.name}: {challenge.description}</p>
              </div>
              <div className='column'>
                <p className='is-hidden-tablet'><strong>Statut de la preuve</strong></p>
                <p className={isValidated.class}>{isValidated.text}</p>
              </div>
              <div className='column'>
                <button className='button has-text-primary' onClick={() => this.showProof(proof)}>Voir plus</button>
              </div>
            </div>
          )
        })}
        {isShowActive ? <ProofsShowModal proof={selectedProof} triggerModal={this.triggerShowModal}/> : undefined}
      </div>
    );
  }
}

export default Proofs;
