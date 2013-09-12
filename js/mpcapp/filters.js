'use strict';

/* Filters */

angular.module('missingapp.filters', [])
.filter('orderObjectByAlpha', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
      var alc = a[attribute].toLowerCase(), blc = b[attribute].toLowerCase();
      return alc > blc ? 1 : alc < blc ? -1 : 0;
    });
    return array;
 };
})
.filter('orderObjectByNum', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 };
});
