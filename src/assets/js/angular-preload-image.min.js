import * as angular from 'angular';
type PreLoaderCallback = () => void;
interface IAttributes extends angular.IAttributes {
  ngSrc?: string;
  defaultImage?: string;
  fallbackImage?: string;
  preloadBgImage?: string;
}
angular.module("angular-preload-image", []);
angular.module("angular-preload-image").factory("preLoader", function() {
  return function(src: string, onLoad: PreLoaderCallback, onError: PreLoaderCallback) {
    angular.element(new Image())
      .bind("load", function() {
        onLoad();
      })
      .bind("error", function() {
        onError();
      })
      .attr("src", src);
  };
});
angular.module("angular-preload-image").directive("preloadImage", ["preLoader", function(preLoader: (src: string, onLoad: PreLoaderCallback, onError: PreLoaderCallback) => void) {
  return {
    restrict: "A",
    terminal: true,
    priority: 100,
    link: function(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: IAttributes) {
      const src = attrs.ngSrc;
      scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
      attrs.$set("src", scope.default);
      preLoader(src, function() {
        attrs.$set("src", src);
      }, function() {
        if (attrs.fallbackImage !== undefined) {
          attrs.$set("src", attrs.fallbackImage);
        }
      });
    }
  };
}]);
angular.module("angular-preload-image").directive("preloadBgImage", ["preLoader", function(preLoader: (src: string, onLoad: PreLoaderCallback, onError: PreLoaderCallback) => void) {
  return {
    restrict: "A",
    link: function(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: IAttributes) {
      if (attrs.preloadBgImage !== undefined) {
        scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
        element.css({"background-image": 'url("' + scope.default + '")'});
        preLoader(attrs.preloadBgImage, function() {
          element.css({"background-image": 'url("' + attrs.preloadBgImage + '")'});
        }, function() {
          if (attrs.fallbackImage !== undefined) {
            element.css({"background-image": 'url("' + attrs.fallbackImage + '")'});
          }
        });
      }
    }
  };
}]);