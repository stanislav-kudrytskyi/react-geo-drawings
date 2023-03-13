module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-filename-extension': [2, {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }],
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        }],
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'max-len': ['error', {
            code: 120,
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/function-component-definition': [2, {
            namedComponents: 'arrow-function',
        }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: true,
        }],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    globals: {
        JSX: true,
        google: true,
    },
};
