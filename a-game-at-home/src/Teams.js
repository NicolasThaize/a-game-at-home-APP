import axiosInstance from "./axiosApi";

class Teams {
  async getTeamsFromUserId(id) {
    let teamsId;
    let teams = [];

    await axiosInstance.get(`/users/${id}/`).then(response => {
      teamsId = response.data.team
    }).catch(error => {
      throw Object.assign(new Error("No user with this id."));
    })
    for (const teamId of teamsId) {
      await axiosInstance.get(`/teams/${teamId}/`).then(response => {
        teams.push(response.data);
      }).catch(error => {
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
    }).catch(error => {
      throw Object.assign(new Error("No session with this id."));
    })

    for (const teamId of teamsId) {
      await axiosInstance.get(`/teams/${teamId}/`).then(response => {
        teams.push(response.data);
      }).catch(error => {
        throw Object.assign(new Error("No team with this id."));
      })
    }
    return teams;
  }
}

export default Teams;
