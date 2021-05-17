import axiosInstance from "./axiosApi";

class TeamPoints {
   async getTeamPointFromId(id){
     let tp;
    await axiosInstance.get(`/team_points/${id}/`).then(r => {
      tp = r.data
    }).catch(() => {throw Object.assign(new Error("No TeamPoint with this id."));})
     return tp;
  }

  async getTeamPointFromSessionAndTeamId(sessionId, teamId){
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
    return undefined;
  }

  async addPoints(id, points){
       let field;
       let result;
       await this.getTeamPointFromId(id).then(r => {
         field = r
       }).catch(() => {throw Object.assign(new Error("No TeamPoint with this id."));})
       let newPoints = field.points + points;
        console.log(field)
        console.log(newPoints)
       await axiosInstance.patch(`/team_points/${id}/`, {points: newPoints}).then(r => {
         result = r.data
       }).catch(() => {throw Object.assign(new Error("Error while adding points."));})
       return result
  }
}

export default TeamPoints;
