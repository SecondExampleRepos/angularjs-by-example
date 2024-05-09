import angular from 'angular';

type PreLoaderFunction = (src: string, onLoad: () => void, onError: () => void) => void;

angular.module("angular-preload-image", []);
angular.module("angular-preload-image").factory("preLoader", (): PreLoaderFunction => {
    return (src: string, onLoad: () => void, onError: () => void): void => {
        angular.element(new Image()).on("load", onLoad).on("error", onError).attr("src", src);
    };
});
angular.module("angular-preload-image").directive("preloadImage", ['preLoader', (preLoader: PreLoaderFunction) => {
    return {
        restrict: "A",
        terminal: true,
        priority: 100,
        link: (scope: angular.IScope, element: JQLite, attrs: angular.IAttributes): void => {
            const src: string = attrs.ngSrc as string;
            const defaultImage: string = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
            attrs.$set("src", defaultImage);
            preLoader(src, () => {
                attrs.$set("src", src);
            }, () => {
                if (attrs.fallbackImage !== undefined) {
                    attrs.$set("src", attrs.fallbackImage as string);
                }
            });
        }
    };
}]);
angular.module("angular-preload-image").directive("preloadBgImage", ['preLoader', (preLoader: PreLoaderFunction) => {
    return {
        restrict: "A",
        link: (scope: angular.IScope, element: JQLite, attrs: angular.IAttributes): void => {
            if (attrs.preloadBgImage !== undefined) {
                const defaultImage: string = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=";
                element.css({"background-image": `url("${defaultImage}")`});
                preLoader(attrs.preloadBgImage as string, () => {
                    element.css({"background-image": `url("${attrs.preloadBgImage}")`});
                }, () => {
                    if (attrs.fallbackImage !== undefined) {
                        element.css({"background-image": `url("${attrs.fallbackImage}")`});
                    }
                });
            }
        }
    };
}]);
```