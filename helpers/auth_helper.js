const jwt = require('jsonwebtoken');

const User = require('../models/user');

const notAuthenticated = res => res.status(401).json({ error: 'You have to be authenticated to access this resource.' });

const notAuthorized = res => res.status(403).json({ error: 'You are not authorized to access this resource.' });

module.exports = {
  authenticate: (req, res, next) => {
    if (req.headers.authorization) {
      const fragments = req.headers.authorization.split(' ');
      if (fragments[0].toLowerCase() === 'bearer') {
        jwt.verify(fragments[1], process.env.JWT_KEY, (err, payload) => {
          if (err) notAuthenticated(res);
          else {
            User.findById(payload.id).then((user) => {
              if (user) {
                req.user = payload;
                next();
              } else {
                notAuthenticated(res);
              }
            });
          }
        });
      } else {
        notAuthenticated(res);
      }
    } else {
      notAuthenticated(res);
    }
  },

  authorize: roles => (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      notAuthorized(res);
    }
  },
};
