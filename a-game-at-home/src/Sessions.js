import axiosInstance from "./axiosApi";
import Teams from "./Teams";

class SessionsFuncs {

  /**
   * Return a session on /sessions/:id
   * @param id
   * @returns {Promise<*>}
   */
  async getSessionById(id){
    let result;
    await axiosInstance.get(`/sessions/${id}/`).then(response => {
      result = response;
    }).catch(() => {
      throw Object.assign(
        new Error("No session with this id.")
      );
    })
    return result;
  }

  /**
   * Makes a request to teams to get sessions id of all teams,
   * then make a get request on /sessions/:id to get sessions infos
   * @param id
   * @returns {Promise<*[]>}
   */
  async getSessionsByUserId(id){
    let sessions = [];
    await Teams.prototype.getTeamsFromUserId(id).then(async response => {
      for (const team of response) {
        for (const sessionId of team.session){
          await this.getSessionById(sessionId).then(response => {
            sessions.push(response.data)
          }).catch(() => {throw Object.assign(new Error("No session with this id."));})
        }
      }
    }).catch(() => {throw Object.assign(new Error("No teams with this userid."));})
    return sessions;
  }
}

export default SessionsFuncs;
