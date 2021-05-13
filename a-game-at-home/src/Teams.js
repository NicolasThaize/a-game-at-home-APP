import axiosInstance from "./axiosApi";

class TeamsFuncs {
  async getTeamsFromUserId(id) {
    let teamsId;
    let teams = [];

    await axiosInstance.get(`/users/${id}/`).then(response => {
      teamsId = response.data.team
    }).catch(() => {
      throw Object.assign(new Error("No user with this id."));
    })
    for (const teamId of teamsId) {
      await axiosInstance.get(`/teams/${teamId}/`).then(response => {
        teams.push(response.data);
      }).catch(() => {
        throw Object.assign(new Error("No team with this id."));
      })
    }
    return teams;
  }

  async getTeamsFromSessionId(id) {
    let teamsId;
    let teams = [];

    await axiosInstance.get(`/sessions/${id}/`).then(response => {
      teamsId = response.data.teams
    }).catch(() => {
      throw Object.assign(new Error("No session with this id."));
    })

    for (const teamId of teamsId) {
      await axiosInstance.get(`/teams/${teamId}/`).then(response => {
        teams.push(response.data);
      }).catch(() => {
        throw Object.assign(new Error("No team with this id."));
      })
    }
    return teams;
  }

  async getTeamFromId(id) {
    let team;
    await axiosInstance.get(`/teams/${id}/`).then(response => {
      team = response.data
    }).catch(() => {
      throw Object.assign(new Error("No team with this id."));
    })
    return team;
  }
}

export default TeamsFuncs;
