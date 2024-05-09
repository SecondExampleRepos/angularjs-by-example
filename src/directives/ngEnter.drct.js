angular
    .module('app.core')
    .directive('ngEnter', ngEnter);
function ngEnter(): angular.IDirective {
    return function(scope: angular.IScope, element: JQLite, attrs: angular.IAttributes) {
        element.bind("keydown keypress", function(event: KeyboardEvent) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter as string);
                });
                event.preventDefault();
            }
        });
    };
}