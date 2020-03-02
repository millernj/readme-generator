module.exports = {
  renderMarkdown: ({user: { avatar_url, name, email }, username, project, description, license, install, test, usage, contributing}) => {
    return `
    # ${project}
    `
  }
}