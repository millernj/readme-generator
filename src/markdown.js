export default function renderMardown({ 
  user: { 
    name,
    email,
    githubUrl,
    avatarUrl,
    projectUrl
  },
  shield,
  username,
  project,
  description,
  license,
  install,
  test,
  usage,
  contributing 
}) {
  return `
# ${project}
[![GitHub license](${shield})](${projectUrl})

## Description

${description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install the necessary dependencies, run the following command:

\`\`\`
${install}
\`\`\`

## Usage

${usage}

## License

This project is licensed under the ${license} license.

## Contributing

${contributing}

## Tests

To run tests, run the following command:

\`\`\`
${test}
\`\`\`

## Questions

<img src="${avatarUrl}" alt="avatar" style="border-radius: 16px" width="30"/>

If you have any questions about the repo, open an issue or contact ${name} ([${username}](${githubUrl})) directly${email ? ` at ${email}.` : '.'}
`
}
