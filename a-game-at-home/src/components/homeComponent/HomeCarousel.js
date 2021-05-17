import React from "react";
import Carousel from "react-elastic-carousel";
import "../../assets/css/carousel.min.css";

class HomeCarousel extends React.Component {
    state = {
        items: [
            {id: 1, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare, enim metus sollicitudin enim, ac aliquet mauris tellus quis mi. ', image: process.env.PUBLIC_URL + "/img/carousel1.jpg"},
            {id: 2, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare, enim metus sollicitudin enim, ac aliquet mauris tellus quis mi. ', image: process.env.PUBLIC_URL + "/img/carousel2.jpg"},
            {id: 3, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare, enim metus sollicitudin enim, ac aliquet mauris tellus quis mi. ', image: process.env.PUBLIC_URL + "/img/carousel3.jpg"}
        ]
    }

    render() {
        const {items} = this.state;
        return (
            <Carousel enableAutoPlay={true} autoPlaySpeed={10000}>
                {items.map(item => (
                    <div key={item.id} className="carouselContainer" style={{backgroundImage: `url(${item.image})`}}>
                        <img src='/img/logo.png' alt="logo"/>
                    </div>
                ))}
            </Carousel>
        )
    }
}

export default HomeCarousel;
