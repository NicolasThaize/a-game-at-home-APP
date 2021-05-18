import jwt from 'jwt-decode';
import axiosInstance from "./axiosApi";
import TeamsFuncs from "./Teams";
import UserTeamAuthorized from "./components/UserTeamAuthorized";

class User {
  getUserData() {
    try {
      const decoded = jwt(localStorage.getItem('access_token'));
      if (!!decoded){
        return ({
          email: decoded.email,
          first_name: decoded.first_name,
          id: decoded.id,
          last_name: decoded.last_name,
          username: decoded.username,
          birth_date: decoded.birth_date,
          admin: decoded.admin
        });
      }
    } catch (e) {
      return ({
        email: undefined,
        first_name: undefined,
        id: undefined,
        last_name: undefined,
        username: undefined,
        birth_date: undefined,
        admin: false
      });
    }
  }

  async getUserDataFromId(id) {
    let user;
    await axiosInstance.get(`/users/${id}/`).then(r => {
      user = r.data;
    }).catch(() => {throw Object.assign(new Error("No user with this id."));})
    return user;
  }

  async getAllUsersUsernames() {
    let users = {
      usernames: [],
      ids: []
    };
    await axiosInstance.get('/users/').then(r => {
      for (const user of r.data){
        users.usernames.push(user.username)
        users.ids.push(user.id)
      }
    }).catch(() => {throw Object.assign(new Error("Error while getting users."));})
    return users.ids.map(function (value, index){
      return {id: value, username: users.usernames[index]}
    });
  }

  async getJoinableTeamsByUserId(id) {
    let joinableUserTeamsIds = [];
    await this.getUserDataFromId(id).then(r => {
      joinableUserTeamsIds = r.authorized_team;
    })
    let teams = [];
    for (const userTeamAuthorizedId of joinableUserTeamsIds){
      await TeamsFuncs.prototype.getTeamFromUserTeamAuthorizedId(userTeamAuthorizedId).then(r => {
        teams.push(r)
      })
    }
    return teams;
  }

  async addUserToTeamByUserId(userId, team){
    const teamUsers = team.users.map(user => {
      return user.id
    })
    teamUsers.push(userId);

    let idToDelete;
    for (const id of team.authorized_user){
      let test = [];
      await UserTeamAuthorized.prototype.getUserTeamAuthorizedById(id).then(r => {
        test = r;
      });
      if (team.id === test.teams[0] && userId === test.users[0]){
        idToDelete = test.id;
      }
    }
    let response;
    await axiosInstance.patch(`/teams/${team.id}/`, {users: teamUsers})
      .then(r => {
      response = r.data;
      }).catch(() => {throw Object.assign(new Error("Error while adding an user to a team."));})
    await axiosInstance.delete(`/user_team_authorized/${idToDelete}/`).then(r => {
    }).catch(() => {throw Object.assign(new Error("Error while deleting an user team authorized."));})
    return response;
  }
}

export default User;
