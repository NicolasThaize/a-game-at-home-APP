import axiosInstance from "./axiosApi";

class TeamsFuncs {
  async addPlayerToTeam(team, userId){
    let result;
    await axiosInstance.post(`/user_team_authorized/`, {users: [userId], teams: [team.id]}).then(r => {
      result = r.data
    });

    return result;
  }

  async getTeamsFromUserId(id) {
    let teamsId;
    let teams = [];
    await axiosInstance.get(`/users/${id}/`).then(response => {
      teamsId = response.data.team
    }).catch(() => {throw Object.assign(new Error("No user with this id."));})
    for (const teamId of teamsId) {
      await axiosInstance.get(`/teams/${teamId}/`).then(response => {
        teams.push(response.data);
      }).catch(() => {throw Object.assign(new Error("No team with this id."));})
    }
    return teams;
  }

  async getTeamsFromSessionId(id) {
    let teamsId;
    let teams = [];

    await axiosInstance.get(`/sessions/${id}/`).then(response => {
      teamsId = response.data.teams
    }).catch(() => {throw Object.assign(new Error("No session with this id."));})

    for (const teamId of teamsId) {
      await axiosInstance.get(`/teams/${teamId}/`).then(response => {
        teams.push(response.data);
      }).catch(() => {throw Object.assign(new Error("No team with this id."));})
    }
    return teams;
  }

  async getTeamFromId(id) {
    console.log(id)
    let team;
    await axiosInstance.get(`/teams/${id}/`).then(response => {
      team = response.data
    }).catch(() => {throw Object.assign(new Error("No team with this id: " + id));})
    return team;
  }

  async leaveTeam(team, user){
    let teamId = team.id;
    let teamUsers = [];
    let response;
    await this.getTeamFromId(teamId).then(r => {
      teamUsers = r.users;
    })
    let newUsers = teamUsers.filter(function(value){
      return value.id !== user.id;
    });
    console.log(teamUsers, newUsers)
    newUsers = newUsers.map(function (i) {
      return i.id
    });
    await axiosInstance.patch(`/teams/${teamId}/`,{users: newUsers}).then(r => {
      response = r.data;
    }).catch(() => {throw Object.assign(new Error("Error while patching data."));})
    return response;
  }

  async getTeamFromUserTeamAuthorizedId(id){
    let teamId, result;
    await axiosInstance.get(`/user_team_authorized/${id}`).then(r => {
      teamId = r.data.teams[0];
    });
    await TeamsFuncs.prototype.getTeamFromId(teamId).then(r => {
      result = r;
    })
    return result;
  }

  async getTeamPointsFromTeamPointAndSessionId(pointsIds, sessionId){
    let points = [];
    for (const pointsId of pointsIds){
      await axiosInstance.get(`/team_points/${pointsId}`).then(r => {
        points.push(r.data)
      }).catch(() => {throw Object.assign(new Error("No points with this id: " + pointsId));})
    }

    for (const point of points){
      if (point.sessions[0] === sessionId){
        return point
      }
    }
    return {}
  }
}

export default TeamsFuncs;
