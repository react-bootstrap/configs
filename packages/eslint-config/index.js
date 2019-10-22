const restrictedGlobals = require('./globals');

module.exports = {
  extends: ['eslint-config-airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
  },
  globals: {
    __DEV__: false,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks'],
  rules: {
    'max-len': 'off',
    'no-plusplus': 'off',
    'prefer-const': 'off',
    'one-var': 'off',
    'no-param-reassign': 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'class-methods-use-this': 'off',
    'no-restricted-globals': ['error', ...restrictedGlobals],
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'no-restricted-syntax': [
      'error',
      'ForOfStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],

    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['!src/**/*.js'] },
    ],

    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': [
      'error',
      { required: { some: ['nesting', 'id'] } },
    ],
    'react/static-property-placement': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-did-update-set-state': 'off',
    'react/no-multi-comp': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/no-find-dom-node': 'off',
    'react/no-array-index-key': 'off',
    'react/no-string-refs': 'off',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js'],
      },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['children', 'className', 'style'],
      },
    ],
    'react/require-default-props': 'off',
  },
  overrides: [
    {
      files: ['tools/*'],
      env: {
        node: true,
        browser: false,
      },
      rules: {
        'global-require': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['test/*'],
      rules: {
        'global-require': 'off',
        'max-classes-per-file': 'off',
        'no-console': 'off',
        'no-return-assign': 'off',
        'import/first': 'off',
        'jsx-a11y/aria-role': 'off',
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/tabindex-no-positive': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/no-render-return-value': 'off',
      },
    },
  ],
};
