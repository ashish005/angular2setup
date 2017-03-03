var path = require('path');

var paths = {
  outputName: 'portal.min.js',
  output: 'dist/',
  demo: 'app/**/*',
  releases: 'deployment/releases/'
}

paths.apiPortalBuilt = path.join(paths.output, paths.outputName);

module.exports = paths;
