import React from "react";


class FooterSvg extends React.Component{
  state = {
    svgs: [
      {
        name: "Facebook",
        img: process.env.PUBLIC_URL + "/img/svgFb.svg"
      },
      {
        name: "Twitter",
        img: process.env.PUBLIC_URL + "/img/svgTwt.svg"
      },
      {
        name: "Instagram",
        img: process.env.PUBLIC_URL + "/img/svgInsta.svg"
      }
    ]

  }
  render() {
    const { svgs } = this.state;
    return (
      <div className="columns has-text-centered is-centered mb-6 is-align-items-center">
        { svgs.map(svg => (
          <a href="https://www.google.com" target="_blank" rel="noreferrer" className="column is-one-fifth" key={svg.name}>
            <img src={svg.img} alt="logo facebook" className="footerSvg"/>
            <p>{svg.name}</p>
          </a>
        ))}
      </div>
    )
  }
}

export default FooterSvg;
