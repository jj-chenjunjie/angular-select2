(function () {
	var ANGULAR_SELECT_OPTION_REGEXP = new RegExp(/^\?\s\S*\s\?$/);
	
	var mSelect2 = angular.module('select2', []);
	
	mSelect2.directive('select2', function () {

		return {
			scope: {
				select2: '=',
				ngModel: '='
			}, // {} = isolate, true = child, false/undefined = no change
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			link: function($scope, iElm, iAttrs, controller) {
				
				var $select2;	// select2 jquery 对象
				init();
				// 监听Model的变化
				$scope.$watch('ngModel', function(newValue) {
//					console.log('ngModel', newValue);
					// angular 重新定义了select指令，会为select添加一个option，这里删除它
					if(ANGULAR_SELECT_OPTION_REGEXP.test(iElm.children().first().val())) {
						iElm .children().first().remove();						
					}
					// 若有model有值，更新select2
					if (newValue) {
						$select2 && $select2.val(newValue).trigger('change.select2');
					}
				});
				
				
				// 监听Model的变化, 重新实例化
				$scope.$watch('select2', function() {
					init();
				});

				/**
				 * 初始化select2
				 */
				function init() {
					// 当有allow-clear属性时，需要手动为select添加一个占位的option
					iElm.html(iAttrs.allowClear ? '<option value=""></option>' : '');
					$select2 = iElm.select2($scope.select2);	
					if (!iAttrs.allowClear) {
						try{
							$scope.ngModel = $scope.ngModel || $scope.select2.data[0].id;	
						}catch(e){
							
						}
						 
					}
					
				}
				
			}
			
		}
	})
})();