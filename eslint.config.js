import antfu from '@antfu/eslint-config'
import reactDom from 'eslint-plugin-react-dom'
import reactX from 'eslint-plugin-react-x'

export default antfu(
  // Base configuration options for @antfu/eslint-config
  {
    typescript: true,
    react: true,
    formatters: true,
    // ignores: ["dist/**"],
  },
  {
    ignores: ['dist'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json', 'tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      'react-x': reactX,
      'react-dom': reactDom,
    },

    rules: {
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
