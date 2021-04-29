import React from "react";
import "../../assets/css/footer.min.css"
import {Link} from "react-router-dom";
import FooterSvg from './FooterSvg'


class Footer extends React.Component {
  render() {
    return(
      <footer className="footer has-text-centered">
        <p className="is-size-3 mb-6">Suivez nous sur les <b>réseaux</b></p>
        <FooterSvg/>
        <div className="content">
          <p className="columns is-centered is-vcentered">
           © 2021&nbsp;<b>At Home a Game</b>.&nbsp;<Link to="/" className="noWrap">Conditions générales d'utilisation</Link>,
            &nbsp;<Link to="link" className="button is-primary">Nous contacter</Link>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;
