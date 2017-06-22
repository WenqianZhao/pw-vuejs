var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_ENV: '"http://34.208.161.140:1337/"',
  PORT: 80
})
