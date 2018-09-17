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
      require('@babel/preset-env'),
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
    [require('@babel/preset-react'), { development: dev }],
  ],
  plugins: [
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-export-namespace-from'),
    [require('@babel/plugin-transform-runtime'), { useESModules: !modules }],
    require('babel-plugin-dev-expression'),
    modules && require('babel-plugin-add-module-exports'),
    removePropTypes && [
      require('babel-plugin-transform-react-remove-prop-types'),
      {
        removeImport: true,
        additionalLibraries: ['prop-types-extra'],
      },
    ],
  ].filter(Boolean),
});
