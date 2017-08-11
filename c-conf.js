
fis.project.setProjectRoot('./src');

fis.match('**.js',{
  parser: fis.plugin('babeljs')
});

fis.match('styles/index.less',{
  parser: fis.plugin('css'),
  rExt: '.js'
});
