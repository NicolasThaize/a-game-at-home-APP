import React from "react";
import "../../assets/css/presentation.min.css"

class Presentation extends React.Component{
    render(){
        return(
            <div className="Presentation">
                <h1>Presentation du concept</h1>
                <hr/>
                <blockquote>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare, enim
                    metus sollicitudin enim, ac aliquet mauris tellus quis mi.<i>- Karim Binon</i>
                </blockquote>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <article className="tile is-child notification is-primary">
                                    <p className="title">Vertical...</p>
                                    <p className="subtitle">Top tile</p>
                                </article>
                                <article className="tile is-child notification is-warning">
                                    <p className="title">...tiles</p>
                                    <p className="subtitle">Bottom tile</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <figure className="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/640x480.png" alt="sample"/>
                                </figure>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-danger">
                                <p className="title">Wide tile</p>
                                <p className="subtitle">Aligned with the right tile</p>
                                <div className="content">

                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent" style={{backgroundImage:"url('/img/mountain-png.png')",backgroundPosition:"center",backgroundSize:"cover"}}>
                        <article className="tile is-child">
                            <div className="content">
                                <p className="title">Tall tile</p>
                                <p className="subtitle">With even more content</p>
                                <div className="content">
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

export default Presentation;