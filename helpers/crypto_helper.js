const crypto = require('crypto');

const generateRandomString = length => crypto.randomBytes(Math.ceil(length / 2)).toString('hex');

const hashString = (value, salt) => crypto
  .createHmac('md5', salt)
  .update(value)
  .digest('hex');

const hashWithSalt = (value) => {
  const salt = generateRandomString(10);
  return {
    salt,
    hash: hashString(value, salt),
  };
};

module.exports = {
  hashString,
  hashWithSalt,
};
