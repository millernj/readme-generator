const axios = require('axios');

module.exports = {
  getShield: (license) => {
    return `https://img.shields.io/badge/license-${license}-blue`
  },
  getUser: async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const { avatar_url, name, email } = response.data;
      return { avatar_url, name, email };
    } catch (error) {
      throw `Error getting Github user: ${error.message}`;
    }
  }
}