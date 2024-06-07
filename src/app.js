'use strict';
import * as angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-moment';
import 'angular-preload-image';
import 'truncate';
import { appRoutes } from './app.routes';
import { appCore } from './app.core';
import { appServices } from './app.services';
import { appConfig } from './app.config';
angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'angularMoment',
  'angular-preload-image',
  'truncate',
  appRoutes,
  appCore,
  appServices,
  appConfig
]);