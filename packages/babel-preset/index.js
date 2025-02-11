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
    setUseClient = false,
    customClientImports,
  } = {},
) => ({
  presets: [
    [
      'babel-preset-env-modules',
      {
        modules,
        ignoreBrowserslistConfig: true,
        targets: {
          browsers: browserlist,
        },
      },
    ],
    ['@babel/preset-react', { development: dev, runtime: 'automatic' }],
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-export-namespace-from',
    ['@babel/plugin-transform-runtime', { useESModules: !modules }],
    'babel-plugin-dev-expression',
    modules && 'babel-plugin-add-module-exports',
    removePropTypes && [
      'babel-plugin-transform-react-remove-prop-types',
      {
        removeImport: true,
        additionalLibraries: ['prop-types-extra'],
      },
    ],
    setUseClient && [
      'babel-plugin-transform-next-use-client',
      {
        customClientImports,
      },
    ],
  ].filter(Boolean),
});
