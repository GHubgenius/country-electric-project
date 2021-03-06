'use strict'

const utils = require('./utils')
const config = require('../config')

const isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
  preserveWhitespace: false,
  loaders: utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
