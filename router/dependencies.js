const CheckAuth = require('./use-cases/check-auth');

const checkAuth = new CheckAuth({
  allowedGroups: process.env.ALLOWED_GROUPS.split(',')
});

module.exports = { checkAuth };
