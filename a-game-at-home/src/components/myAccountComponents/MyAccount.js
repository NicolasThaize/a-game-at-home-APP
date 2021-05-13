import React from "react";
import User from "../../User";
import {Link} from "react-router-dom";
import Profile from "./Profile";
import Modify from "./Modify";
import Sessions from "./Sessions";
import Teams from "./Teams";
import Logout from "../authComponents/Logout";


class MyAccount extends React.Component {
    state = {
        user: User.prototype.getUserData(),
        currentActive: 1,
        updateLogout: this.props.updateLogout,
        tabList: [
            {
                id: 1,
                name: 'Informations du profil',
                link: '/',
            },
            {
                id: 2,
                name: 'Modifier les informations du profil',
                link: '/',
            },
            {
                id: 3,
                name: 'Sessions en cours',
                link: '/',
            },
            {
                id: 4,
                name: 'Equipes',
                link: '/',
            },
        ],
    }

    handleClick = (id) => {
        this.setState({currentActive: id});
    }

    render() {
        const {user, tabList, currentActive, updateLogout} = this.state;
        return (
            <div className="m-6">
                <div className="tabs">
                    <ul>
                        {tabList.map(tab =>
                            <li
                                className={tab.id === currentActive ? "is-active" : ""}
                                key={tab.id} onClick={() => this.handleClick(tab.id)}
                            >
                                <Link>{tab.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                {currentActive === 1 ? <Profile user={user}/> : undefined}
                {currentActive === 2 ? <Modify user={user}/> : undefined}
                {currentActive === 3 ? <Sessions/> : undefined}
                {currentActive === 4 ? <Teams/> : undefined}
                <Logout updateLogout={updateLogout}/>
            </div>
        )
    }
}

export default MyAccount;
