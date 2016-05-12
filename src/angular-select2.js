(function(){
	angular.module('ui', []).directive('angularSelect2', function($http){
		return {
			scope: {
				angularSelect2: '=',
				ngModel: '='
			},
			restrict: 'A',
			link: {
				pre: function(scope, element, attrs, controllers) {
//					console.log("pre");
					var select2, data;
					
					if(scope.angularSelect2 instanceof Array){
						// 传递数组
						data = scope.angularSelect2;
					}else if(scope.angularSelect2 instanceof Object){
						// 传递select2配置选项
						data = scope.angularSelect2.data;
					}else {
						// 传递url
						$http.get(attrs.url).success(function(res){
							data = res;
							init();
						});
					}

					scope.$watch('angularSelect2', function(newValue, oldValue, scope) {
						if(newValue){
							init();
						};
					});
					
					// 监听Model的变化
					scope.$watch('ngModel', function(newValue, oldValue, scope) {
						console.log('ngModel', newValue, oldValue)
						// 当model为时，设置默认值
						if (!scope.ngModel) {
							// 是否允许清空选项
							if(!attrs.allowClear){
								scope.ngModel = data && data[0] && data[0].id;	
							}
						}
						var firstOption = element.children().first();
//						console.log(firstOption.val());
						if(firstOption && firstOption.val() && firstOption.val().indexOf('?') >= 0){
							element.children().first().remove();
						}
						select2 && select2.val(scope.ngModel).trigger('change.select2');
						
					});
					
					/**
					 * 初始化select2
					 */
					function init() {
						element.html(attrs.allowClear ? '<option></option>' : '');
						if (scope.angularSelect2 instanceof Array) {
							select2 = element.select2({
								data: scope.angularSelect2
							});
						} else if(scope.angularSelect2 instanceof Object){
							select2 = element.select2(scope.angularSelect2);
						}else {
							select2 = element.select2({
								data: data
							});
						}
						select2.val(scope.ngModel).trigger('change.select2');
					}
				
				},
				post: function(scope, element, attrs, controllers) {
					
				}
		    },
		};
	});
})();
