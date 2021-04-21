import React from "react";
import {Link} from "react-router-dom";
import '../../assets/css/home.min.css';

class Session extends React.Component {
  state = {
    ...this.props.session,
    formattedStartDate: "",
    formattedEndDate: "",
    now: new Date().getTime() / 1000,
    isFinished: true
  }

  /**
   * Format start and end dates, defines if the session is finished or not
   */
  componentDidMount() {
    this.setState(prevState => ({
      formattedStartDate: this.formatDate(prevState.start_date),
      formattedEndDate: this.formatDate(prevState.end_date),
      isFinished: Date.parse(prevState.end_date) < this.state.now
    }))
  }

  /**
   * Returns date string with format dd/mm/yyyy
   * @param date
   * @returns {string}
   */
  formatDate(date){
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  }

  render() {
    const { id, name, description, start_date, end_date, formattedStartDate, formattedEndDate, isFinished} = this.state;
    return(
      <Link to={isFinished? "/": "/"} className="card column m-2 is-bordered shadowed">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{name}</p>
              <p className="subtitle is-6">{`Session du: ${formattedStartDate} au ${formattedEndDate}`}</p>
            </div>
          </div>

          <div className="content">
            <p>
              {description}
            </p>
          </div>
        </div>
        <footer className="card-footer">
          { isFinished ?
            <Link href="#" className="card-footer-item">Voir plus</Link> :
            <Link href="#" className="card-footer-item">Voir les résultats</Link>
          }
        </footer>
      </Link>
    )
  }
}

export default Session;
