const axios = require('axios');

module.exports = {
  getShield: (license) => {
    return `https://img.shields.io/badge/license-${license}-blue.svg`
  },
  getUser: async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const { name, email, avatar_url: avatarUrl, html_url: githubUrl } = response.data;
      return { name, email, githubUrl, avatarUrl };
    } catch (error) {
      throw `Error getting Github user: ${error.message}`;
    }
  },
  checkProjectUrl: async (githubUrl, project) => {
    try {
      if (!project) {
        throw { message: 'No Project Entered' };
      }
      const projectUrl = githubUrl + `/${project}`;
      const response = await axios.get(projectUrl);
      return projectUrl;
    } catch (error) {
      throw `Error getting Project: ${error.message}`;
    }
  }
}