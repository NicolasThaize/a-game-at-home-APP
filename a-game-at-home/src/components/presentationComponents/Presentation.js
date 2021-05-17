import React from "react";
import "../../assets/css/presentation.min.css"

class Presentation extends React.Component {
    render() {
        return (
            <div className="Presentation">
                <h1>Presentation du concept</h1>
                <hr/>
                <blockquote>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                    enim
                    metus sollicitudin enim, ac aliquet mauris tellus quis mi.<i>- Karim Binon</i>
                </blockquote>
                <div className="tile is-ancestor section">
                    <div className="tile is-vertical is-8">
                        <div className="tile">
                            <div className="tile is-parent is-vertical"  style={{
                                backgroundImage: "url('/img/presentation4.jpg')",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                margin: 10 + 'px'
                            }}>
                                <article className="tile is-child artificialHeight">
                                    <p className="title has-text-white">Lorem ipsum</p>
                                    <p className="subtitle has-text-white">sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                                        enim</p>
                                    <div className='artificialHeight'/>
                                </article>
                            </div>
                            <div className="tile is-parent" style={{
                                backgroundImage: "url('/img/presentation3.jpg')",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                margin: 10 + 'px'
                            }}>
                                <article className="tile is-child">
                                    <p className="title has-text-white">Lorem ipsum</p>
                                    <p className="subtitle has-text-white">sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                                        enim</p>
                                </article>
                                <article className="tile is-child">
                                    <p className="title has-text-white">Lorem ipsum</p>
                                    <p className="subtitle has-text-white">sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                                        enim</p>
                                </article>
                            </div>
                        </div>
                        <div className="tile is-parent" style={{
                            backgroundImage: "url('/img/presentation4.jpg')",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            margin: 10 + 'px'
                        }}>
                            <article className="tile is-child">
                                <p className="title has-text-white">Lorem ipsum</p>
                                <p className="subtitle has-text-white">sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                                    enim</p>
                                <div className="content">

                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent" style={{
                        backgroundImage: "url('/img/presentation5.jpg')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        margin: 10 + 'px'
                    }}>
                        <article className="tile is-child">
                            <div className="content">
                                <p className="title has-text-white">Lorem ipsum</p>
                                <p className="subtitle has-text-white">sit amet, consectetur adipiscing elit. Mauris aliquam, lacus quis commodo ornare,
                                    enim</p>
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
