import axiosInstance from "./axiosApi";

class ChallengesFuncs {
  async getAllChallenges() {
    let result;
    await axiosInstance.get("/challenges/").then(r => {
      result = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing the challenges."));})
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
    let result = [];
    let proofsIds = [];

    for (const proof of proofs){
      proofsIds.push(proof.challenge[0].id)
    }

    await this.getChallengesFromSessionId(sessionId).then(r => {
      challenges = r
    }).catch(() => {throw Object.assign(new Error("No challenge with this id."));})

    for (const challenge of challenges){
      for (const challengeId of proofsIds){
        if (challenge.id !== challengeId){
          result.push(challenge);
        }
      }
    }
    return result;
  }
}

export default ChallengesFuncs;
