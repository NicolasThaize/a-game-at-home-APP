import React from "react";
import "../../assets/css/ranking.min.css";
import axiosInstance from "../../axiosApi";
import TeamsFuncs from "../../Teams";
import TeamPoints from "../../TeamPoints";
import {Helmet} from "react-helmet-async";

class Ranking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sessions : [],
            teams : [],
            options : [],
            test : [],
            teamPoints : [],
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
            value : session.id,
            label : session.name
        }
        return <option key={session.id} value={optionRow.value}>{optionRow.label}</option>;
    }


    async selectSession(e){
        await TeamsFuncs.prototype.getTeamsFromSessionId(e.target.value).then(response => {
            this.setState({teams : response})
            return this.state.teams;
        })


        let values = [];
        for (let team of this.state.teams){
            let temptest = {teamId : undefined, teamName: "", teamUsers: [] ,teamScore : 0}
            await TeamPoints.prototype.getTeamPointFromSessionAndTeamId(e.target.value, team.id).then(response =>{
                temptest.teamId = team.id;
                temptest.teamName = team.name;
                let usernames = [];
                for(let user in team.users){
                    usernames.push(team.users[user].username + " ")
                }
                temptest.teamUsers = usernames;
                temptest.teamScore = response.points;
                values.push(temptest)
                this.setState({test:values})
            })
        }
        return this.state.test;
    }
    render() {
        let teamRow = [];
        teamRow.pop();
        for (let team of this.state.test) {
            teamRow.push(
                <tr key={team.teamId}>
                    <td>{team.teamName}</td>
                    <td>{team.teamUsers}</td>
                    <td >{team.teamScore ? team.teamScore : 0}</td>
                </tr>
            );
        }

        return (
            <div className="Ranking">
                <Helmet>
                    <title>Classements - At Home A Game</title>
                </Helmet>
                <h1>Classement des sessions</h1>
                <div className="SessionSelector">
                    <select className="sessionOptions" onChange={this.selectSession}>
                        {this.state.sessions.map(session => {
                            return this.displayOptions(session);
                        })}
                    </select>
                </div>

                <div className = "table-wrapper">
                    <table className="RankingTable">
                        <thead>
                            <tr>
                                <th className="has-background-primary">Équipe</th>
                                <th className="has-background-primary">Utilisateurs</th>
                                <th className="has-background-primary">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamRow}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Ranking;
