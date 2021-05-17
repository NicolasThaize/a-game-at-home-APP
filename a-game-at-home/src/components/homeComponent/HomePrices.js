import React from "react";
import 'bulma-pricingtable/dist/css/bulma-pricingtable.min.css';
import '../../assets/css/prices.min.css';
import '../../assets/css/home.min.css';

class HomePrices extends React.Component {
    state = {
        prices: [
            {
                prix: 40,
                titre: "",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare, enim metus sollicitudin enim, ac aliquet mauris tellus quis mi. Donec egestas consequat cursus. Nam feugiat nec tortor ac convallis. Cras mattis dolor at facilisis laoreet. Maecenas sit amet rutrum sem. Ut ut mi v elit. Sed vel libero sed lacus dapibus ornare. Praesent euismod magna urna, nec aliquet arcu vehicula ac.",
            },
        ]
    }

    render() {
        const {prices} = this.state
        return (
            <div className="pricing-table ml-6 mr-6 mb-6 is-justify-content-center">
                {prices.map(price => (
                    <div className={`pricing-plan  shadowed`} key={price.titre}>
                        <div className="plan-price">
                            <span className="plan-price-amount">{price.prix}</span><span
                            className="plan-price-currency">€</span>
                        </div>
                        <div className="plan-items">
                            <div className="plan-item">{price.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default HomePrices;
