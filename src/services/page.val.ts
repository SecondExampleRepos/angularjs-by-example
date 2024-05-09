'use strict';
type PageValuesType = {
    title: string | null;
    description: string | null;
    loading: boolean;
};
angular
    .module('app.core')
    .value('PageValues', {
        'title': null,
        'description': null,
        'loading': false
    } as PageValuesType);