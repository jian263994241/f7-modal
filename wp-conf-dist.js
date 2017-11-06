const path = require('path');

module.exports = {
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'f7-modal.js',
    libraryExport: "default" ,
    libraryTarget: "umd"
  },

  module: {
    rules: [
      webpack.preset.cssRule({modules: true, sourceMap: false, hmr: false}),
      webpack.preset.babelRule()
    ]
  },
  externals: ['react', 'react-dom', 'prop-types', 'rc-mounter', 'classnames'],
  plugins:[
    new webpack.CleanWebpackPlugin(['dist'])
  ]
}
