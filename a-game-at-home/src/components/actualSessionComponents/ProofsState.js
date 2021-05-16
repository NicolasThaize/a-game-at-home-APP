import React from "react";

class ProofsState extends React.Component{
  state = {
    proofs: this.props.proofs
  }

  /**
   * Is executed when props changes
   * @param props
   * @param state
   */
  static getDerivedStateFromProps(props, state) {
    return state.proofs = props.proofs
  }

  render() {
    const { proofs } = this.state;
    return (
      <div>
        <h3 className='title is-3'>Preuves soumises</h3>
        {proofs.map(proof => {
          const challenge = proof.challenge[0];
          let isValidated;
          switch (proof.validated){
            case 0:
              isValidated = {
                text: "Non validé",
                class: 'has-text-danger'
              };
              break;
            case 1:
              isValidated = {
                text: "Validé",
                class: 'has-text-success'
              };
              break;
            case 3:
              isValidated = {
                text: "Pas encore évalué",
                class: 'has-text-warning'
              };
              break;
            default:
              isValidated = {
                text: "Erreur",
                class: 'has-text-warning'
              };
              break;
          }
          return (
            <div key={challenge.id} className='box'>
              <h6 className='title is-6'>{challenge.name}</h6>
              <p>{challenge.description}</p>
              <p className={isValidated.class}>{isValidated.text}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ProofsState;
