import axiosInstance from "./axiosApi";

class ChallengesFuncs {
  async getAllChallenges() {
    let result;
    await axiosInstance.get("/challenges/").then(r => {
      result = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing the challenges."));})
    return result;
  }

  async getChallengeFromId(id) {
    let result;
    await axiosInstance.get("/challenges/" + id + "/").then(r => {
      result = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing the challenge."));})
    return result;
  }

  /**
   * Makes requests to return all challenges of a session
   * @param id
   * @returns {Promise<*[]>}
   */
  async getChallengesFromSessionId(id) {
    let challengesId;
    let challenges = [];

    await axiosInstance.get(`/sessions/${id}/`).then(response => {
      challengesId = response.data.challenges
    }).catch(() => {throw Object.assign(new Error("No challenge with this id."));})

    for (const challengeId of challengesId) {
      await axiosInstance.get(`/challenges/${challengeId}/`).then(response => {
        challenges.push(response.data);
      }).catch(() => {throw Object.assign(new Error("No challenge with this id."));})
    }
    return challenges;
  }

  async getNotCompletedChallenges(sessionId, proofs){
    let challenges = [];
    let proofsIds = [];

    for (const proof of proofs){
      proofsIds.push(proof.challenge[0].id)
    }

    await this.getChallengesFromSessionId(sessionId).then(r => {
      challenges = r
    }).catch(() => {throw Object.assign(new Error("No challenge with this id."));})

    for (const challenge of challenges){
      let found = proofsIds.find(el => el === challenge.id)
      if (found !== undefined){
        challenges = challenges.filter(el => el.id !== found)
      }
    }
    return challenges;
  }
}

export default ChallengesFuncs;
