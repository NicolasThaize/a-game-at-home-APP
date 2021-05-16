import axiosInstance from "./axiosApi";

class ChallengesFuncs {
  async getAllChallenges() {
    let result;
    await axiosInstance.get("/challenges/").then(r => {
      result = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing the challenges."));})
    return result;
  }

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
}

export default ChallengesFuncs;
