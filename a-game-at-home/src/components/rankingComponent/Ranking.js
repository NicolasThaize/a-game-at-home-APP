import React from "react";
import "../../assets/css/ranking.min.css";
import axiosInstance from "../../axiosApi";
import Select from "react-select";


class Ranking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sessions : [],
            options : [],
            selectedSession : 1,
        };
        this.selectSession = this.selectSession.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
    }
    async componentDidMount(e) {
      await axiosInstance.get('/sessions/').then(response => {
            this.setState({sessions: response.data})
        })
    }

    displayOptions(session){
        let optionRow = {
            value : session.name,
            label : session.name
        }
        return <option key={session.id} value={optionRow.value}>{optionRow.label}</option>;
    }

    selectSession(e){
        this.setState({selectedSession: e.target.value});
        console.log(this.state.sessions[this.state.selectedSession].teams)
    }

    render() {
        return (
            <div className="Ranking">
                <h1>Classement des sessions</h1>
                <div className="SessionSelector">
                    <select className="sessionOptions" onChange={this.selectSession}>
                        {this.state.sessions.map(session => {
                            return this.displayOptions(session);
                        })}
                    </select>
                </div>

                <table className="RankingTable">
                    <thead>
                        <tr>
                            <th>Équipe</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Ranking;