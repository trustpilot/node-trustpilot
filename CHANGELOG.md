# [4.0.0](https://github.com/trustpilot/node-trustpilot/compare/v3.4.0...v4.0.0) (2024-04-17)


### Bug Fixes

* explicitly set github token as well ([337fcb9](https://github.com/trustpilot/node-trustpilot/commit/337fcb9d4ccd06eb2acc3af6d0bf955e3988aeec))
* explicitly set the npm token ([25f45ec](https://github.com/trustpilot/node-trustpilot/commit/25f45ecf6eef1fdb3682b2f4c2cb88f4cf16caea))
* remove oidc permission ([23a38f3](https://github.com/trustpilot/node-trustpilot/commit/23a38f30a0b9b27e1c7ce3cf23bf15d5836cdd9d))
* switch to GHA ([ac94570](https://github.com/trustpilot/node-trustpilot/commit/ac945701b81ad3ffaf1c9a945da74666785d939a))
* update semantic release ([880e074](https://github.com/trustpilot/node-trustpilot/commit/880e074569fadc5904ad0815104773edebc48990))
* use correct token ([8530eb2](https://github.com/trustpilot/node-trustpilot/commit/8530eb2566a7bb4578ff651e9dd586a22ae25c2e))


### Features

* refactor lib to use axios ([16d7acf](https://github.com/trustpilot/node-trustpilot/commit/16d7acf8ec4a41ed30f4b1086c4888b890258db6))


### BREAKING CHANGES

* replaces request-promise with axios

# [3.4.0](https://github.com/trustpilot/node-trustpilot/compare/v3.3.0...v3.4.0) (2022-10-13)


### New

* Select OAuth grant type for authentication ([03b6d5a](https://github.com/trustpilot/node-trustpilot/commit/03b6d5ababcb200a40bef6bc685cd0efa0ac6c6a))

### Upgrade

* Bump handlebars from 4.7.6 to 4.7.7 ([2029977](https://github.com/trustpilot/node-trustpilot/commit/202997720447303b8d9af7630cc72574da54c859))

# [3.3.0](https://github.com/trustpilot/node-trustpilot/compare/v3.2.0...v3.3.0) (2021-03-23)


### Build

* Attempting to fix build by disabling node_modules caching ([73dd483](https://github.com/trustpilot/node-trustpilot/commit/73dd4835256b7c40a11517da47febc00af9670ec))

### Chore

* Close vulnerabilities ([4046da2](https://github.com/trustpilot/node-trustpilot/commit/4046da29423154ef12349b277d1b817ea01274df))

### New

* Opportunity to provide custom connection management agent for the client ([884004c](https://github.com/trustpilot/node-trustpilot/commit/884004c5a18111df464339be8ad0083844e59a29))

### Upgrade

* Upgrade dependencies and fix vulnerabilities ([c36bfe2](https://github.com/trustpilot/node-trustpilot/commit/c36bfe22890952579aa813b1a5fec1c9bf1037dc))
* Upgrade dependencies and fix vulnerabilities ([71817c4](https://github.com/trustpilot/node-trustpilot/commit/71817c4ce07ae348c87df2247d9051717064cb57))

# [3.2.0](https://github.com/trustpilot/node-trustpilot/compare/v3.1.2...v3.2.0) (2019-06-19)

### Chore

- Npm audit fix ([5134c77129dbbed8d57350bc1ed195187e56cd3b](https://github.com/trustpilot/node-trustpilot/commit/5134c77129dbbed8d57350bc1ed195187e56cd3b))
- Npm audit fix with npm 6.9 ([99e11cbf42ef1f7e1c0e771e5f4f330e61836e30](https://github.com/trustpilot/node-trustpilot/commit/99e11cbf42ef1f7e1c0e771e5f4f330e61836e30))

### Update

- Added possibility to provide default request headers ([3785bd3114ae6a4402828f9a86d478551317dec4](https://github.com/trustpilot/node-trustpilot/commit/3785bd3114ae6a4402828f9a86d478551317dec4))

## [3.1.2](https://github.com/trustpilot/node-trustpilot/compare/v3.1.1...v3.1.2) (2019-05-01)

### Build

- Improve travis configuration ([5fd487b7153fa406c083adbe6227f5b8b7578c1d](https://github.com/trustpilot/node-trustpilot/commit/5fd487b7153fa406c083adbe6227f5b8b7578c1d))

### Fix

- Move @types as dependencies ([a27df71cd3147363a2c829bbc6aee58793bf0751](https://github.com/trustpilot/node-trustpilot/commit/a27df71cd3147363a2c829bbc6aee58793bf0751))

### Upgrade

- Update dependencies and fix vulnerabilities ([5e9c37b6ff6f2f0254c5d482b52682d7d64cf56b](https://github.com/trustpilot/node-trustpilot/commit/5e9c37b6ff6f2f0254c5d482b52682d7d64cf56b))

## [3.1.1](https://github.com/trustpilot/node-trustpilot/compare/v3.1.0...v3.1.1) (2019-01-21)

### Fix

- Relaxing some linting rules ([ddd716b1fcd9c83053e635988c1b6ca131ecb0ad](https://github.com/trustpilot/node-trustpilot/commit/ddd716b1fcd9c83053e635988c1b6ca131ecb0ad))

# [3.1.0](https://github.com/trustpilot/node-trustpilot/compare/v3.0.0...v3.1.0) (2018-12-04)

### Docs

- Update code examples ([4b40a21eb18ffd00f60f91615520714af5d72975](https://github.com/trustpilot/node-trustpilot/commit/4b40a21eb18ffd00f60f91615520714af5d72975))

### New

- Added types to npm package ([9c7693a30befcfb9e3fdfd26eeb1810a7f39e200](https://github.com/trustpilot/node-trustpilot/commit/9c7693a30befcfb9e3fdfd26eeb1810a7f39e200))

# [3.0.0](https://github.com/trustpilot/node-trustpilot/compare/v2.2.0...v3.0.0) (2018-12-03)

### Breaking

- Converted to Typescript ([60c6c95a9b93a194aed56c864b1569e55461506d](https://github.com/trustpilot/node-trustpilot/commit/60c6c95a9b93a194aed56c864b1569e55461506d))

### Build

- Force new major version ([9d908147c0efa789de1025454fe7f7414e895d12](https://github.com/trustpilot/node-trustpilot/commit/9d908147c0efa789de1025454fe7f7414e895d12))
