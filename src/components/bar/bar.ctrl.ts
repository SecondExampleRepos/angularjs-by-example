'use strict';

import type { PageValuesType } from './bar.ctrl-js.types';

angular
    .module('app.core')
    .controller('BarController', function($scope: ng.IScope, PageValues: PageValuesType) {
        // Setup the view model object
        const vm: { data: PageValuesType } = this;
        vm.data = PageValues;
    });
