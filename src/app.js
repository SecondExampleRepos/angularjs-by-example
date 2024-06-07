'use strict';
import * as angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-moment';
import 'angular-preload-image';
import 'truncate';
import './app.routes';
import './app.core';
import './app.services';
import './app.config';
angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'angularMoment',
  'angular-preload-image',
  'truncate',
  'app.routes',
  'app.core',
  'app.services',
  'app.config'
]);