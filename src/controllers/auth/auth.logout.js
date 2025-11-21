const logoutUser = (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
};

export default logoutUser;