import React from "react";
import Carousel from "react-elastic-carousel";
import "../../assets/css/carousel.min.css";

class HomeCarousel extends React.Component {
    state = {
        items: [
            {id: 1, title: 'item #1', image: process.env.PUBLIC_URL + "/compressed_img/carousel1.jpg"},
            {id: 2, title: 'item #2', image: process.env.PUBLIC_URL + "/compressed_img/carousel2.jpg"},
            {id: 3, title: 'item #3', image: process.env.PUBLIC_URL + "/compressed_img/carousel3.jpg"}
        ]
    }

    render() {
        const {items} = this.state;
        return (
            <Carousel enableAutoPlay={true} autoPlaySpeed={10000}>
                {items.map(item => (
                    <div key={item.id} className="carouselContainer" style={{backgroundImage: `url(${item.image})`}}>
                        <p className="is-size-2-tablet">{item.title}</p>
                    </div>
                ))}
            </Carousel>
        )
    }
}

export default HomeCarousel;
