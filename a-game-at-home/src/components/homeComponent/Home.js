import React from "react";
import HomeCarousel from "./HomeCarousel";
import "../../assets/css/home.min.css";
import HomeSessions from "./HomeSessions";
import HomePrices from "./HomePrices";

class Home extends React.Component {
  state = {
    isParagraphFull: false
  }

  /**
   * Toggles true/false
   */
  toggleParagraph = () => {
    this.setState(prevState => ({
      isParagraphFull: !prevState.isParagraphFull
    }))
  }

  render() {
    const { isParagraphFull } = this.state;
    return(
      <div>
        <HomeCarousel/>
        <h2 className="title has-text-centered has-text-primary mt-6 is-uppercase">Présentation</h2>
        <p className="pl-3 pr-3 container mt-6 has-text-justified">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare, enim
          metus sollicitudin enim, ac aliquet mauris tellus quis mi. Donec egestas consequat cursus. Nam feugiat
          nec tortor ac conval<span className={`${isParagraphFull ? "is-hidden" : "" }`}>...</span>
          <span className={`${isParagraphFull ? "" : "is-hidden" }`}>
          lis. Cras mattis dolor at facilisis laoreet. Maecenas sit amet rutrum sem. Ut ut mi v
          elit. Sed vel libero sed lacus dapibus ornare. Praesent euismod magna urna, nec aliquet arcu vehicula ac.
          Curabitur leo dolor, suscipit eleifend viverra sed, venenatis dictum dui. Etiam felis eros, rhoncus a ips
          um sit amet, dapibus fermentum urna. Nullam fermentum dictum nibh id elementum. Nullam ultrices tortor ut
          gravida lacinia. Suspendisse eu mauris luctus, consequat purus vitae, tristique ante. Donec in vulputate n
          ibh. Integer est turpis, tristique tincidunt elementum vitae, pretium eu tellus.
          </span>
        </p>
        <p className={`has-text-primary readMoreLink mb-6 pl-3`} onClick={this.toggleParagraph}>
          Voir {isParagraphFull ? "moins." : "plus."}
        </p>
        <div className="divider mt-6 mb-6"/>
        <h2 className="title has-text-centered has-text-primary is-uppercase">L'historique des sessions</h2>
        <HomeSessions/>
        <div className="divider mt-6 mb-6"/>
        <h2 className="title has-text-centered has-text-primary is-uppercase">Les tarifs des sessions</h2>
        <HomePrices/>
      </div>
    )
  }
}

export default Home;
