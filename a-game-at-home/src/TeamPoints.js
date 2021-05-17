import axiosInstance from "./axiosApi";

class TeamPoints {
   async getTeamPointFromId(id){
     let tp;
    await axiosInstance.get(`/team_points/${id}/`).then(r => {
      tp = r.data
    }).catch(() => {
      throw Object.assign(new Error("No TeamPoint with this id."));
    })
     return tp;
  }

  async getTeamPointFromSessionAndTeamId(sessionId, teamId){
       teamId = parseInt(teamId);
       sessionId = parseInt(sessionId);
    let tp;
    await axiosInstance.get(`/team_points/`).then(r => {
        tp = r.data
    }).catch(() => {
      throw Object.assign(new Error("No TeamPoint with this id."));
    })

    for (let point of tp){
      if (point.teams[0] === teamId && point.sessions[0] === sessionId){
        return point
      }
    }
    return tp;
  }

  getTeamPointsFromSessionId(id){

  }
}

export default TeamPoints;
