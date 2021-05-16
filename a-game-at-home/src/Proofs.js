import axiosInstance from "./axiosApi";

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
}

export default ProofsFuncs;
