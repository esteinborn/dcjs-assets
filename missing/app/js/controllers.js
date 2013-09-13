'use strict';

/* Controllers */

var isIE;

if(navigator.appVersion.indexOf("MSIE 7.")!=-1 || navigator.appVersion.indexOf("MSIE 6.")!=-1) {
  isIE = 1; //NProgress isn't compatible with IE7
}

Object.keys = Object.keys || (function () {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
      DontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      DontEnumsLength = DontEnums.length;

  return function (o) {
    if (typeof o != "object" && typeof o != "function" || o === null)
      throw new TypeError("Object.keys called on a non-object");
 
    var result = [];
    for (var name in o) {
      if (hasOwnProperty.call(o, name))
        result.push(name);
    }
 
    if (hasDontEnumBug) {
      for (var i = 0; i < DontEnumsLength; i++) {
        if (hasOwnProperty.call(o, DontEnums[i]))
          result.push(DontEnums[i]);
      }   
    }
 
    return result;
  };
})();

function MissingCtrl($scope, $routeParams, $http, $sanitize) {

  var baseUrl;    

  $scope.loadMissingCases = function(baseUrl) {
  
    if ( $('.node-type-missing-person').length > 0 ) {
      $('body').addClass('hide-sub-nav');
    } else {
      $('body').removeClass('hide-sub-nav');
    }
      
    if (!isIE) {NProgress.start();}
   
    if ($routeParams.name) {
      baseUrl = baseUrl + "/" + $routeParams.name + '?jsonp=JSON_CALLBACK';
    } else {
      baseUrl = baseUrl + '?jsonp=JSON_CALLBACK';
    }

    $http
    .jsonp(baseUrl)
    .then(function(response) {

      $scope.applyMissingCases(response.data);

      return $scope;
    }).then(function($scope) {
      
      $(".loading").addClass("hidden"); // remove the loading message, since it's loaded now.
      
      if ($scope.person 
          && $scope.person.type !== "Missing Child Alert"
          && $scope.person.type !== "Missing College Student Alert"
          && $scope.person.type !== "Missing Vulnerable Adult Alert"
          && $scope.person.type !== "AMBER Alert") {

        setTimeout(function(){
          $('.missing-person-ul').listnav({
            filterSelector: ".last-name",
            removeDisabled: true,
            includeNums: false
          });
        }, 1);
      }
    }).then(function() {

      if (!isIE) {NProgress.done();}

      $(".ng-fade").fadeIn(); // remove the loading message, since it's loaded now.
    });
  };

  $scope.applyMissingCases = function(data) {

    $scope.caselist = data.missingPerson;

    $scope.caselistlength = Object.keys($scope.caselist).length;

    $scope.person = data.missingPerson[0];

  };  
}

MissingCtrl.$inject = ['$scope', '$routeParams', '$http', '$sanitize'];
