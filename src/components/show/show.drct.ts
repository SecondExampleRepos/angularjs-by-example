angular
    .module('app.core')
    .directive('show', show);
function show(ShowService: ShowService) {
    var directive: angular.IDirective = {
        controller: controller,
        templateUrl: 'components/show/show.tpl.html',
        restrict: 'E',
        scope: {
            show: '='
        }
    };
    return directive;
    function controller($scope: any) {
        $scope.genres = [];
        ShowService.get($scope.show.id).then(function(response: { genres: string[] }){
            $scope.genres = response.genres;
        });
    }
}