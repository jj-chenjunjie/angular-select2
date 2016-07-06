require.config({
    baseUrl: "../../",    
    paths: {
        'angular': 'bower_components/angular/angular.min',
        'angular-route': 'bower_components//angular-route.min',
        'angularAMD': '.../angularAMD.min'
    },
    shim: { 'angularAMD': ['angular'], 'angular-route': ['angular'] },
    deps: ['app']
});