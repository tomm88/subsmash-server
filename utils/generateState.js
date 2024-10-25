const crypto = require('crypto');

const generateState = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

module.exports = generateState;
