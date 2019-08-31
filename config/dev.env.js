'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  //后端入口地址
  BASE_API: '"http://192.168.3.8:4000"'
  //BASE_API: '"http://localhost/api"'
  // BASE_API: '"http://192.168.159.2:8848"'
})
