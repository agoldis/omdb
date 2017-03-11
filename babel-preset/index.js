const preact = require('./preact')
module.exports = exports = {
  presets: [preact],
  plugins: [
    [
      require('babel-plugin-transform-object-rest-spread'),
      { useBuiltIns: true }
    ],
    require('babel-plugin-transform-class-properties')
  ]
}