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

  /**
   * Makes a requesto to get all sessions
   * @returns {Promise<*[]>}
   */
  async getAllSessions(){
    let sessions = [];
    await axiosInstance.get("/sessions/").then(r => {
      sessions = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing sessions."));})
    return sessions;
  }

  /**
   * Makes a request on /sessions/ and return all sessions not started
   * @returns {Promise<*[]>}
   */
  async getSessionsNotStartedYet(){
    let sessions = [];
    let result = [];

    await this.getAllSessions().then(r => {
      sessions = r
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing sessions."));})

    const dateObj = new Date();
    const today = new Date(dateObj.getMonth()  + '/'+ String(dateObj.getDate()).padStart(2, '0')  + '/' + dateObj.getFullYear());
    for (const session of sessions) {
      const sessionDate = new Date(session.start_date)
      if(sessionDate > today){
        result.push(session);
      }
    }
    return result;
  }

  /**
   * G
   * @returns {Promise<void>}
   * @constructor
   */
  async AddTeamToSessionByIds(teamId, sessionId) {

  }
}

export default SessionsFuncs;
