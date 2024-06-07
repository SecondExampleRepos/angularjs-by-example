import { IComponentOptions, IController } from 'angular';
import { ShowService } from './show.service';
interface IShowScope extends ng.IScope {
    show: { id: number };
    genres: string[];
}
class ShowController implements IController {
    static $inject = ['$scope', 'ShowService'];
    constructor(private $scope: IShowScope, private ShowService: ShowService) {
        this.$scope.genres = [];
        this.ShowService.get(this.$scope.show.id).then((response: { genres: string[] }) => {
            this.$scope.genres = response.genres;
        });
    }
}
const showDirective: IComponentOptions = {
    controller: ShowController,
    templateUrl: 'components/show/show.tpl.html',
    restrict: 'E',
    scope: {
        show: '='
    }
};
angular
    .module('app.core')
    .component('show', showDirective);