// URL and endpoint constants

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false,
    userObject: {},
  },
  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem("token");
    this.user.authenticated = false;
  },

  checkAuth() {
    var jwt = localStorage.getItem("token");
    if (jwt) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    let header = "Bearer " + localStorage.getItem("token");
    return header;
  },
};
