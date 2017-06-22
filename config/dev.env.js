var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // SERVER_ENV: '"http://www.wenqianzhao.com:1337/"',
  SERVER_ENV: '"http://localhost:1337/"',
  PORT: 8080
})
