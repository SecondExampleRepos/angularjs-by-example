'use strict';

import type { PageValuesType } from './page.val-js.types';

angular
    .module('app.core')
    .value<PageValuesType>('PageValues', {
        title: null,
        description: null,
        loading: false
    });
