const path = require('path')
const execa = require('execa')
const npmName = require('npm-name')
const originUrl = require('git-remote-origin-url')

const templatePath = path.join(__dirname, './templates')

module.exports = plop => {
  plop.setGenerator('npm package', {
    description: 'create a new package',
    prompts: [
      {
        name: 'location',
        type: 'input',
        message: 'package location',
        filter: location =>
          path.isAbsolute(location) ? location : path.resolve(location),
      },
      {
        name: 'name',
        type: 'input',
        message: 'package name',
        validate: async name =>
          (await npmName(name)) ? true : 'Name already taken',

        default: _ => `@react-bootstrap/${path.basename(_.location)}`,
      },
      {
        name: 'author',
        type: 'input',
        message: 'author',
      },
      {
        name: 'repository',
        type: 'input',
        message: 'repository',
        default: () => originUrl().catch(() => ''),
      },
    ],
    actions({ location }) {
      return [
        {
          type: 'add',
          path: '{{location}}/package.json',
          templateFile: `${templatePath}/package.json.hbs`,
        },
        {
          type: 'add',
          path: '{{location}}/.gitignore',
          templateFile: `${templatePath}/gitignore`,
          skipIfExists: true,
        },
        {
          type: 'add',
          path: `{{location}}/LICENSE`,
          templateFile: `${templatePath}/LICENSE.hbs`,
          skipIfExists: true,
        },
        () => execa('yarn', ['install'], { cwd: location, stdio: 'inherit' }),
        () =>
          execa('yarn', ['upgrade-interactive', '--latest'], {
            cwd: location,
            stdio: 'inherit',
          }),
      ]
    },
  })
}
