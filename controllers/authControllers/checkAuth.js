const checkAuth = async (req, res) => {
  //Checks if the user has an active session
    if (req.session.accessToken) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
  };

  module.exports = checkAuth;