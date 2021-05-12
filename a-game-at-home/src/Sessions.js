import axiosInstance from "./axiosApi";
import Teams from "./Teams";

class SessionsFuncs {
  async getSessionById(id){
    let result;
    await axiosInstance.get(`/sessions/${id}/`).then(response => {
      result = response;
    }).catch(error => {
      throw Object.assign(
        new Error("No session with this id.")
      );
    })
    return result;
  }

  async getSessionsByUserId(id){
    Teams.prototype.getTeamsFromUserId(id).then(response => {
      let sessions = [];
      for (const team of response) {
        for (const sessionId of team.session){
          this.getSessionById(sessionId).then(response => {
            console.log(response.data)
          })
        }
      }
    })
  }
}

export default SessionsFuncs;
