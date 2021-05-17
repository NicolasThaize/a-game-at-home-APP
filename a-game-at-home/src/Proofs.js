import axiosInstance from "./axiosApi";
import TeamPoints from "./TeamPoints";
import ChallengesFuncs from "./Challenges";

class ProofsFuncs {

  /**
   * Make a request then return all proofs of every teams
   * @returns {Promise<*[]>}
   */
  async getAllProofs(){
    let response = [];
    await axiosInstance.get('/proofs/').then(r => {
      response = r.data
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing all proofs."));})
    return response
  }

  /**
   * Make a request then return the corresponding proof
   * @param id
   * @returns {Promise<*>}
   */
  async getProofFromId(id){
    let response;
    await axiosInstance.get(`/proofs/${id}/`).then(r => {
      response = r.data
    }).catch(() => {throw Object.assign(new Error("No proof with this id: "+id));})
    return response
  }


  async getProofsFromSessionAndTeam(sessionId, team){
    let proofs = [];
    let result = [];
    for (const proofId of team.session_proofs){
      await this.getProofFromId(proofId).then(r => {
        proofs.push(r)
      }).catch(() => {throw Object.assign(new Error("No proof with this id: "+proofId));})
    }
    for (const proof of proofs){
      for (const session of proof.session){
        if (session.id === sessionId){
          result.push(proof);
        }
      }
    }
    return result;
  }


  /**
   * Makes a request to get all proofs and make a filter to get only the ones who has never been validated
   * @returns {Promise<*[]>}
   */
  async getProofsNotValidated(){
    let proofs = []
    let result = []
    await this.getAllProofs().then(r => {
      proofs = r;
    }).catch(() => {throw Object.assign(new Error("Error while retreviewing all proofs."));})
    for (const proof of proofs){
      if (proof.validated === 3){
        result.push(proof)
      }
    }
    return result;
  }

  /**
   * Makes a patch request on /proofs/:id and set validated to 1 (Validated)
   * @param id
   * @returns {Promise<void>}
   */
  async validateProofByProofId(id){
    let values;
    await axiosInstance.patch(`/proofs/${id}/`, {validated: 1}).then(r => {
      values = r.data
    }).catch(() => {throw Object.assign(new Error("Error while patching proof."));})

    let challenge;
    await ChallengesFuncs.prototype.getChallengeFromId(values.challenge[0]).then(r => {
      challenge = r;
    })

    await TeamPoints.prototype.getTeamPointFromSessionAndTeamId(values.session[0], values.team[0]).then(async r => {
      await TeamPoints.prototype.addPoints(r.id, challenge.points).then(r => {
        return r;
      })
    }).catch(() => {throw Object.assign(new Error("Error while adding points."));})
  }

  /**
   * Makes a patch request on /proofs/:id and set validated to 0 (failed)
   * @param id
   * @returns {Promise<void>}
   */
  async failedProofByProofId(id){
    await axiosInstance.patch(`/proofs/${id}/`, {validated: 0}).then(r => {
      return r.data
    }).catch(() => {throw Object.assign(new Error("Error while patching proof."));})
  }
}

export default ProofsFuncs;
