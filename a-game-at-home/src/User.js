import jwt from 'jwt-decode';

class User {
  getUserData() {
    const decoded = jwt(localStorage.getItem('access_token'));
    if (!!decoded){
      return ({
        email: decoded.email,
        first_name: decoded.first_name,
        id: decoded.id,
        last_name: decoded.last_name,
        username: decoded.username
      });
    } else {
      throw new Error("No user token stored in localStorage");
    }
  }
}

export default User;
