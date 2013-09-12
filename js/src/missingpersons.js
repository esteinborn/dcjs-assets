var myApp = angular.module('myApp', []), // Name of app is myApp
    theUrl = "";

myApp.controller('MissingPersonsCtrl', ['$scope', function($scope) { // initialize the Controller
  var MissingPersons = {}; // MissingPersons needs to be created before we can write to it.

  //loadMissingCases function will grab a JSONP file and populate MissingPersons for use in the template file
  $scope.loadMissingCases = function(theUrl) {

      // Load the missing feed URL    
    $.ajax({
      url : theUrl, // theUrl is passed in from the function initializer
      dataType : 'jsonp', // Must be JSONP for Drupal, may need to change for Portal
      jsonpCallback: 'missingFeed', // callback for JSONP on Drupal, may need to change for Portal
      contentType : 'application/json', // for Drupal may need to change for Portal
      success: function(data) { // Run this function after a successful AJAX request
        MissingPersons = data.missingPerson; // data.missingPerson is an array that contains all missing cases each as objects
        $scope.$apply(function(){ // push the current code back into the scope of the application (PUSH TO HTML)
          $scope.missing = MissingPersons; // scope.missing is what the HTMl app looks for and will use to populate the information on the screen.
          $(".loading").remove(); // remove the loading message, since it's loaded now.
        });
      },
      complete: function() { // run this function after the success function has run
        $('.missing-person-ul').listnav({ // apply jQuery listNav plugin
          filterSelector: ".last-name",
          includeNums: false
        });
        
      }
    });
  };
  // TODO: set up a template engine that populates the cases automatically
}] );

myApp.directive("feedurl", function() { // Directive interacts with the DOM, this one runs off of the attribute "feedurl" on any dom elements
  return { 
    restrict: "A", // only apply to attributes, not classes, elements, or comments
    link: function(scope, element, attrs) {
      scope.loadMissingCases(attrs.feedurl); // initialize loadMissingCases() and send it the "feedurl" attribute value, in this case it's a URL for missing cases
    }
  };
});
