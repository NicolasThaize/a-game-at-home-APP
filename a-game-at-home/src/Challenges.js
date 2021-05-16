import axiosInstance from "./axiosApi";

class ChallengesFuncs {
  async getAllChallenges() {
    let result;
    axiosInstance.get("/challenges/").then(r => {
      result = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing the challenges."));})
  }
}

export default ChallengesFuncs;
