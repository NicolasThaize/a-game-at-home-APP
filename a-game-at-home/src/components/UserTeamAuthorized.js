import axiosInstance from "../axiosApi";

class UserTeamAuthorized{
  async getUserTeamAuthorizedById(id){
    let response;
    await axiosInstance.get(`/user_team_authorized/${id}`).then(r => {
      response = r.data;
    }).catch(() => {throw Object.assign(new Error("No user team authorized with this id."));})
    return response;
  }
}

export default UserTeamAuthorized;
