import type { Show } from './show.drct-js.types';
import { ShowService } from '~/services/show.service';

angular
  .module('app.core')
  .directive('show', show);

function show(ShowService: ShowService): angular.IDirective {
  const directive: angular.IDirective = {
    controller: controller,
    templateUrl: 'components/show/show.tpl.html',
    restrict: 'E',
    scope: {
      show: '='
    }
  };
  return directive;

  function controller($scope: angular.IScope & { show: Show, genres: string[] }): void {
    $scope.genres = [];
    ShowService.get($scope.show.id).then((response: { genres: string[] }) => {
      $scope.genres = response.genres;
    });
  }
}
