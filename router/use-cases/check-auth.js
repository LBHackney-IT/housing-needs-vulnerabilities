const jwt = require('jsonwebtoken');

class CheckAuth {
  constructor({ allowedGroups }) {
    this.allowedGroups = allowedGroups;
  }

  execute({ token }) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return (
        Boolean(payload) &&
        Boolean(payload.groups) &&
        payload.groups.some(g => this.allowedGroups.includes(g))
      );
    } catch (err) {
      return false;
    }
  }
}
module.exports = CheckAuth;
