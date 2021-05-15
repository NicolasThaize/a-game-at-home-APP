import axiosInstance from "./axiosApi";

class TeamsFuncs {
  async addPlayerToTeam(team, userId){
    const id = team.authorized_user[0];
    let result;
    await axiosInstance.get(`/user_team_authorized/${id}/`).then(async r => {
      const users = r.data.users;
      users.push(userId);
      await axiosInstance.patch(`/user_team_authorized/${id}/`, {users: users}).then(r => {
        result = r.data
      })
    }).catch(() => {throw Object.assign(new Error("No team authorized user table with this id."));})
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
    let team;
    await axiosInstance.get(`/teams/${id}/`).then(response => {
      team = response.data
    }).catch(() => {throw Object.assign(new Error("No team with this id."));})
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
}

export default TeamsFuncs;
