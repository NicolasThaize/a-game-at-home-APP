import React from 'react';
import SessionsFuncs from "../../Sessions";
import TeamsFuncs from "../../Teams";
import axiosInstance from "../../axiosApi";
import {Redirect} from "react-router";

class JoinSessionValidation extends React.Component {
  state = {
    session: [],
    team: "",
    isLoading: true,
    sessionFound: false,
    teamFound: false,
    error: '',
    secureSvg: process.env.PUBLIC_URL + "/img/svgSecure.svg",
    hasPayed: false,
    redirect: false,
    sessionId: '',
    teamId: '',
    isSuccess: false
  }

  async componentDidMount() {
    await this.setState({
      sessionId: this.props.location.state.sessionId,
      teamId: this.props.location.state.teamId
    }, async () => {
      await SessionsFuncs.prototype.getSessionById(this.state.sessionId).then(r => {
        this.setState({session: r.data, sessionFound: true});
      }).catch(e => this.setState({error: e}));

      await TeamsFuncs.prototype.getTeamFromId(this.state.teamId).then(r => {
        this.setState({team: r, isLoading: false, teamFound: true});
      }).catch(e => this.setState({error: e}));
    })
  }

  /**
   * Lauches the stripe page and wait for payment confirmation
   */
  handlePay = () => {
    this.setState({hasPayed: true}, async () => {
      let newTeams = this.state.session.teams;
      newTeams.push(this.state.sessionId)
      let values = {
        teams: newTeams
      }
      await axiosInstance.patch(`/sessions/${this.state.sessionId}/`, values).then(async () => {
        await axiosInstance.post('/team_points/', {
          teams: [this.state.teamId],
          sessions: [this.state.sessionId]
        }).then(() => {
          this.setState({isSuccess: true})
          setTimeout(() => {
            this.setState({redirect: true});
          }, 3000);
        }).catch(() => this.setState({error: "Erreur lors de la création des points"}))
      }).catch(() => this.setState({error: "Erreur lors de l'ajout de l'équipe"}))
    });
  }

  render() {
    const { session, hasPayed, isLoading, error, secureSvg, team, redirect} = this.state;
    return (
      <div className="section">
        {redirect ? <Redirect to="/"/> : undefined}
        <h2 className="title is-2">Validation de l'inscription à la session</h2>
        { hasPayed ?  (
          <div className="notification is-primary">
            Merci pour votre achat ! Vous allez être redirigé vers la page d'acceuil.
          </div>) : undefined}
        <div className="columns">
          <div className="column">
            <h3 className="title is-3">Récapitulatif: </h3>
            <p><strong>Nom de la session:</strong></p>
            <p>{session.name}</p>
            <p><strong>Description de la session:</strong></p>
            <p>{session.description}</p>
            <p><strong>Dates de la session:</strong></p>
            <p>Du {session.start_date} au {session.end_date}</p>
          </div>
          <div className="column">
            <p><strong>Nom de l'équipe inscrite:</strong></p>
            <p>{team.name}</p>
          </div>

          <div className="column">
            <h3 className="title is-3">Paiement</h3>
            <p><span className='title is-4'>Sous Total: </span>33,33 € Hors taxes</p>
            <p><span className='title is-4'>Total: </span>40 € TTC</p>
            <button className="button mt-5 is-primary" onClick={this.handlePay}>Payer</button>
              <h2 className="subtitle is-italic is-align-items-center columns mt-4">
                Paiement sécurisé
                <img src={secureSvg} alt="logo securisé" className="is-16x16"/>
              </h2>
          </div>
        </div>
        {isLoading ? <p>loading</p> : undefined}
        {error ? <p className="has-text-weight-bold has-text-danger">{error}</p> : undefined}
      </div>
    );
  }
}

export default JoinSessionValidation;
