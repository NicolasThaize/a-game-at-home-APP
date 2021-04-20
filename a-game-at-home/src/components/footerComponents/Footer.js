import React from "react";
import "../../assets/css/footer.min.css"
import {Link} from "react-router-dom";


class Footer extends React.Component {
  state = {
    svgFb: process.env.PUBLIC_URL + "/img/svgFb.svg",
    svgTwt: process.env.PUBLIC_URL + "/img/svgTwt.svg",
    svgInsta: process.env.PUBLIC_URL + "/img/svgInsta.svg"
  }
  render() {
    const { svgFb, svgTwt, svgInsta} = this.state;
    return(
      <footer className="footer has-text-centered">
        <p className="is-size-3 mb-6">Suivez nous sur les <b>réseaux</b></p>
        <div className="columns has-text-centered is-centered mb-6">
          <a href="https://www.google.com" target="_blank" rel="noreferrer" className="column is-one-fifth footerNetworks">
            <img src={svgFb} alt="logo facebook" className="navDropSvg"/>
            <p>Facebook</p>
          </a>
          <a href="https://www.google.com" target="_blank" rel="noreferrer" className="column is-one-fifth footerNetworks">
            <img src={svgTwt} alt="logo twitter" className="navDropSvg"/>
            <p>Twitter</p>
          </a>
          <a href="https://www.google.com" target="_blank" rel="noreferrer" className="column is-one-fifth footerNetworks">
            <img src={svgInsta} alt="logo twitter" className="navDropSvg"/>
            <p>Instagram</p>
          </a>
        </div>
        <div className="content">
          <p className="columns is-centered is-vcentered">
           © 2021&nbsp;<b>At Home a Game</b>.&nbsp;<Link to="/">Conditions générales d'utilisation</Link>,
            &nbsp;<Link to="link" className="button is-primary">Nous contacter</Link>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;
