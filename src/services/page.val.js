'use strict';
angular
    .module('app.core')
    .value('PageValues', {
        'title': null,
        'description': null,
        'loading': false
    });
interface PageValues {
    title: string | null;
    description: string | null;
    loading: boolean;
}
const appCoreModule = angular.module('app.core');
appCoreModule.value('PageValues', {
    title: null,
    description: null,
    loading: false
} as PageValues);