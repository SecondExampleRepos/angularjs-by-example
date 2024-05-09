angular
    .module('app.core')
    .directive('ngEnter', ngEnter);
type NgEnterScope = {
    $apply: (action: () => void) => void;
    $eval: (expression: string) => void;
};
interface NgEnterAttributes extends angular.IAttributes {
    ngEnter: string;
}
function ngEnter(): angular.IDirective {
    return {
        link: function(scope: NgEnterScope, element: JQLite, attrs: NgEnterAttributes) {
            element.bind("keydown keypress", function(event: JQueryKeyEventObject) {
                if(event.which === 13) {
                    scope.$apply(() => {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    };
}