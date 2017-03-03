#!/usr/bin/env node
'use strict';
require('shelljs/global');

var paths = require('./paths');
var path = require('path');

set('-e');
set('-v');

// build
exec('npm run build-dist');
mkdir('-p', 'deployment');
cd('deployment');
cp('-R', '../app/index-gh.html', '../deployment/index.html');
cp('-R', '../app/api-portal.css', '../deployment/api-portal.css');
cp('-R', '../app/swagger.yaml', '../deployment/swagger.yaml');
mkdir('-p', 'assets');
cp('-R', '../app/assets/*', '../deployment/assets/');
mkdir('-p', 'dist');
cp('-R', '../dist/*', 'dist/');
cd('..');

var version = 'v' + require(path.join(__dirname, '../package.json')).version + '/';
var versionDir = path.join(paths.releases, version);
var latestDir = path.join(paths.releases, 'latest/');
var v1Dir = path.join(paths.releases, 'v1.x.x/');
mkdir('-p', versionDir)
mkdir('-p', latestDir);
mkdir('-p', v1Dir);
cp(paths.apiPortalBuilt, versionDir);
cp(paths.apiPortalBuilt, latestDir);
cp(paths.apiPortalBuilt, v1Dir);
