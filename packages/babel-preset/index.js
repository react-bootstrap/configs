const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const classProperties = require('@babel/plugin-proposal-class-properties');
const exportDefaultFrom = require('@babel/plugin-proposal-export-default-from');
const exportNamespaceFrom = require('@babel/plugin-proposal-export-namespace-from');
const runtime = require('@babel/plugin-transform-runtime');
const rmPropTypes = require('babel-plugin-transform-react-remove-prop-types');
const devExpression = require('babel-plugin-dev-expression');
const addExports = require('babel-plugin-add-module-exports');
// https://github.com/twbs/bootstrap/blob/6cf8700fd9fd096855d6510ceef9c1ff225f8e40/.browserslistrc
const browserlist = [
  '>= 1%',
  'last 1 major version',
  'not dead',
  'Chrome >= 45',
  'Firefox >= 38',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30',
];

module.exports = (
  _,
  {
    dev = false,
    removePropTypes = !dev,
    modules = _.env() === 'esm' ? false : 'commonjs',
  } = {},
) => ({
  presets: [
    [
      presetEnv,
      {
        modules,
        loose: true,
        ignoreBrowserslistConfig: true,
        shippedProposals: true,
        include: ['proposal-object-rest-spread'],
        targets: {
          browsers: browserlist,
        },
      },
    ],
    [presetReact, { development: dev }],
  ],
  plugins: [
    [classProperties, { loose: true }],
    exportDefaultFrom,
    exportNamespaceFrom,
    [runtime, { useESModules: !modules }],
    devExpression,
    modules && addExports,
    removePropTypes && [
      rmPropTypes,
      {
        removeImport: true,
        additionalLibraries: ['prop-types-extra'],
      },
    ],
  ].filter(Boolean),
});
