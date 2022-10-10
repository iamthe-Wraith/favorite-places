module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'unused-imports'
  ],
  root: true,
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    indent: 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    '@typescript-eslint/no-floating-promises': 'off',
    'react/jsx-curly-spacing': [2, {
      when: 'always',
      allowMultiline: true,
      children: true,
      spacing: {objectLiterals: 'always'}
    }],
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'always'],
    'unused-imports/no-unused-imports': ['error'],
  },
};