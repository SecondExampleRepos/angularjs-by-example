import type { NgEnterAttributes } from './ngEnter.drct-js.types';

angular
  .module('app.core')
  .directive('ngEnter', ngEnter);

function ngEnter(): angular.IDirective {
  return {
    restrict: 'A',
    link: function(scope: angular.IScope, element: JQLite, attrs: NgEnterAttributes) {
      element.bind("keydown keypress", function(event: KeyboardEvent) {
        if (event.which === 13) {
          scope.$apply(() => {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    }
  };
}
