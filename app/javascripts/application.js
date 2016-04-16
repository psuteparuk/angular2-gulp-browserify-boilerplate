require('angular');

var templates = angular.module('templates', []);
var app = angular.module('project8', ['templates']);

require('./controllers');
require('./directives');
require('./services');
