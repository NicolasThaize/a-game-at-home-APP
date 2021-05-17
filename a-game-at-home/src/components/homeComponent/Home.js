import React from "react";
import HomeCarousel from "./HomeCarousel";
import "../../assets/css/home.min.css";
import HomePrices from "./HomePrices";

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeCarousel/>
                <p className="pl-3 pr-3 container mt-6 mb-6 has-text-justified">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                    enim
                    metus sollicitudin enim, ac aliquet mauris tellus quis mi. Donec egestas consequat cursus. Nam
                    feugiat
                    nec tortor ac convallis. Cras mattis dolor at facilisis laoreet. Maecenas sit amet rutrum sem. Ut ut
                    mi v
                    elit. Sed vel libero sed lacus dapibus ornare. Praesent euismod magna urna, nec aliquet arcu
                    vehicula ac.
                    Curabitur leo dolor, suscipit eleifend viverra sed, venenatis dictum dui. Etiam felis eros, rhoncus
                    a ips
                    um sit amet, dapibus fermentum urna. Nullam fermentum dictum nibh id elementum. Nullam ultrices
                    tortor ut
                    gravida lacinia. Suspendisse eu mauris luctus, consequat purus vitae, tristique ante. Donec in
                    vulputate n
                    ibh. Integer est turpis, tristique tincidunt elementum vitae, pretium eu tellus.
                </p>
                <div className="divider mt-6 mb-6"/>
                <h2 className="title has-text-centered has-text-primary is-uppercase">Le tarif d'une session</h2>
                <HomePrices/>
            </div>
        )
    }
}

export default Home;
