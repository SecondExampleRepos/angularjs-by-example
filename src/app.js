'use strict';

import angular from 'angular';
import type { AppRoutes, AppCore, AppServices, AppConfig } from './app-js.types';

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
