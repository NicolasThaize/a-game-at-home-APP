import React from "react";
import ProofsFuncs from "../../../Proofs";
import ProofValidateModal from "./ProofValidateModal";

class NotValidatedProofs extends React.Component{
  state = {
    proofs: [],
    isValidatective: false,
    selectedProof: ''
  }

  async componentDidMount() {
    await ProofsFuncs.prototype.getProofsNotValidated().then(r => {
      this.setState({proofs: r})
    });
  }

  validateProof = (selectedProof) => {
    this.setState({selectedProof: selectedProof})
    this.triggerValidateModal();
  }
  triggerValidateModal = () => {
    this.setState({isValidatective: !this.state.isValidatective})
  }

  render() {
    const {proofs, selectedProof, isValidatective} = this.state;
    return (
      <div>
        {proofs.length === 0 ? <p>Aucune preuve pas encore évaluée</p> : undefined}
        {proofs.map(proof => {
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
              </div>
              <div className='column'>
                <button className='button has-text-primary' onClick={() => this.validateProof(proof)}>Noter la preuve</button>
              </div>
            </div>
          )
        })}
        {isValidatective ?
          <ProofValidateModal
            proof={selectedProof}
            triggerModal={this.triggerValidateModal}
          /> : undefined}
      </div>
    );
  }
}

export default NotValidatedProofs;
