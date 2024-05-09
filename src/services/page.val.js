'use strict';
angular
    .module('app.core')
    .value('PageValues', {
        title: null as string | null,
        description: null as string | null,
        loading: false as boolean
    });