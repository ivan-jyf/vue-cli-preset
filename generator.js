module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        'dependencies': {
            'axios': '^0.19.0',
            'lodash': '^4.17.15',
            'normalize.css': '^8.0.1',
        },
        'devDependencies': {
            '@babel/plugin-proposal-optional-chaining': '^7.9.0',
            '@commitlint/cli': '^8.3.5',
            '@commitlint/config-conventional': '^8.3.4',
            '@leo-tools/eslint-config-vue': '^0.0.9',
            '@vue/eslint-config-standard': '^5.1.2',
            'babel-plugin-lodash': '^3.3.4',
            'commitizen': '^4.0.4',
            'compression-webpack-plugin': '^3.1.0',
            'cross-env': '^7.0.2',
            'cz-conventional-changelog': '^3.1.0',
            'lodash-webpack-plugin': '^0.11.5',
            'vue-cli-plugin-webpack-bundle-analyzer': '~2.0.0',
            'vue-svg-loader': '^0.16.0',
        },
        'scripts': {
            'build:dev': 'vue-cli-service build --mode development',
            'build:prod': 'vue-cli-service build --mode production',
            'test:unit': 'cross-env NODE_ENV=test vue-cli-service test:unit',
            'test:e2e': 'cross-env NODE_ENV=test vue-cli-service test:e2e',
            'lint': 'vue-cli-service lint src/**/*.{js,vue} tests/**/*.js --fix'
        },
        'config': {
            'commitizen': {
                'path': 'node_modules/cz-conventional-changelog'
            }
        },
        'gitHooks': {
            'pre-commit': 'lint-staged',
            'commit-msg': 'commitlint -e $GIT_PARAMS'
        },
        'lint-staged': {
            'src/**/*.{js,jsx,vue}': [
                'vue-cli-service lint --fix',
                'git add'
            ],
            'tests/**/*.js': [
                'vue-cli-service lint --fix',
                'git add'
            ]
        }
    })

    api.render('./template')
}
