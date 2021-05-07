const presetReact = require('@babel/preset-react');
const classProperties = require('@babel/plugin-proposal-class-properties');
const exportDefaultFrom = require('@babel/plugin-proposal-export-default-from');
const exportNamespaceFrom = require('@babel/plugin-proposal-export-namespace-from');
const runtime = require('@babel/plugin-transform-runtime');
const rmPropTypes = require('babel-plugin-transform-react-remove-prop-types');
const devExpression = require('babel-plugin-dev-expression');
const addExports = require('babel-plugin-add-module-exports');
// https://github.com/twbs/bootstrap/blob/main/.browserslistrc
const browserlist = [
  '>= 0.5%',
  'last 2 major versions',
  'not dead',
  'Chrome >= 60',
  'Firefox >= 60',
  'Firefox ESR',
  'iOS >= 12',
  'Safari >= 12',
  'not Explorer <= 11',
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
      'babel-preset-env-modules',
      {
        modules,
        ignoreBrowserslistConfig: true,
        targets: {
          esmodules: true,
          browsers: browserlist,
        },
      },
    ],
    [presetReact, { development: dev, runtime: 'automatic' }],
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
