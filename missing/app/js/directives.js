'use strict';

/* Directives */

angular.module('missingapp.directives', [])
  .directive("feedurl", function() { // Directive interacts with the DOM, this one runs off of the attribute "feedurl" on any dom elements
    return { 
      restrict: "A", // only apply to attributes, not classes, elements, or comments
      link: function(scope, element, attrs) {

        scope.loadMissingCases(attrs.feedurl); // initialize loadMissingCases() and send it the "feedurl" attribute value, in this case it's a URL for missing cases
        
        // This watch directive functions the same as the .then() part of the jsonp response. I dont know which one is better than the other, but I commented this out out becuase it made more sense to SEE the plugin initialization in the controller than in a separate file...
        // Who knows, maybe this way is better. I'll never know probably. 
        
        // scope.$watch("caselist", function(value){
        //   var val = value || null;            
        //   if (val) {
        //     console.log("FIRES!");
        //     setTimeout(function(){
        //       $('.missing-person-ul').listnav({
        //         filterSelector: ".last-name",
        //         includeNums: false
        //       });
        //     },100);
        //   }
        // });
      }
    };
  });
