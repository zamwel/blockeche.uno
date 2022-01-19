const path = require('path')

module.exports = [
  {
    mode: 'production',
    entry: './src/account.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/account.js'
    },
    watch: true
  },
  {
    mode: 'production',
    entry: './src/auth.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/auth.js'
    },
    watch: true
  },
  {
    mode: 'production',
    entry: './src/buy.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/buy.js'
    },
    watch: true
  },{
    mode: 'production',
    entry: './src/config.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/config.js'
    },
    watch: true
  },
  {
    mode: 'production',
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/main.js'
    },
    watch: true
  },
  {
    mode: 'production',
    entry: './src/support.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/support.js'
    },
    watch: true
  }
]
