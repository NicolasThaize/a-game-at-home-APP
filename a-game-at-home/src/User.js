import jwt from 'jwt-decode';
import axiosInstance from "./axiosApi";

class User {
  getUserData() {
    const decoded = jwt(localStorage.getItem('access_token'));
    if (!!decoded){
      return ({
        email: decoded.email,
        first_name: decoded.first_name,
        id: decoded.id,
        last_name: decoded.last_name,
        username: decoded.username,
        birth_date: decoded.birth_date
      });
    } else {
      throw Object.assign(
        new Error("No valid token stored in localStorage")
      );
    }
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
    })
    return users.ids.map(function (value, index){
      return {id: value, username: users.usernames[index]}
    });
  }
}

export default User;
