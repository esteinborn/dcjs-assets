/*
 * UnoSlider
 * This script is a plugin for jQuery
 * Version: 1.0.3
 * Author: Nelson Polanco
 * http://unoslider.npmedia.net
 */

(function ($) {
  $.fn.unoSlider = function(options) {
    // support multiple elements
    if (this.length > 1){
      this.each(function() { $(this).unoSlider(options); });
      return this;
    }

    // setup options
    var defaults = {
      //default options go here.
      animSpeed: 250,
      speed: 5,   //seconds
      auto: true,
      easing: 'swing',
      next: false,
      prev: false,
      transition: 'slide',
      pause: false,
      bullets: false,
      selector: 'li',
      callback: function(){},
      width: 300
    };

    options = $.extend({}, defaults, options);

    // SETUP private variabls;
    var s = this;
    s.$views = $( s.find(options.selector) ).addClass('sliderView');
    s.$views.css({ width: options.width });
    s.$nav = $( s.find('.unoSliderNav') );
    s.navItems = [];
    s.viewWidth = s.width();
    s.animTimer = options.animSpeed;
    s.timerSpeed = options.speed*1000;
    s.easing = options.easing;
    s.transition = options.transition;

    //Set the current Slide
    s.current = s.$views[0];
    s.addClass('unoSlider');

    var bulletClick = function(){
      navClick($(this));
    };

    //Loop through each view
    for(var i=0; i < s.$views.length; i++){
      var $view = $(s.$views[i]);
      var $bullet = $('<span>&bull;</span>');     //Create a bullet

      //Create a jQuery object out of the view
      s.$views[i] = $view;

      //Add the index as data to each view and bullet
      $view.add($bullet).data('idx', i);

      //Add bullets to nav and collect them in an array
      s.$nav.append($bullet);
      s.navItems[i]= $bullet;

      //Bullet Click events
      $bullet.bind('click', bulletClick);
    }//For each views

    //Bullets click Handler
    var navClick = function($b){
      var next = $b.data('idx'); //Current Bullet's index
      var prev = s.current.data('idx');

      initSlide(prev, next); //pass in previous index
      s.resetTimer();
    };   //Bullets Click

    //Set Current
    var setCurrent = function(idx){
      //remove the "current" class from all elements
      s.$views.add(s.navItems).each(function(){
        this.removeClass('current');
      });

      //Add "current" class to the items with the index that was passe in
      $(s.$views[idx]).add($(s.navItems[idx])).addClass('current');
      //Set current
      s.current = s.$views[idx];
    }; //Set Current

    var initSlide = function(prev, next){
      //If this is the last view, set next as the first view so that it loops around
      if(next >= s.$views.length){
        next = 0;
      }else if( next < 0  ){
        next = s.$views.length-1;
      }

      if( prev < next ){
        animateForward(prev, next);
      } else if (prev > next){
        animateBackwards(prev,next);
      } //if else prev >next

      if (typeof options.callback === 'function') { // make sure the callback is a function
         options.callback.call(next); // passback the current index
      }

      setCurrent(next);
    };   //initSlide

    if(options.next){
      $(options.next).live('click', function(e) {
        // Live handler called.
        e.preventDefault();
        s.goForward();
        s.resetTimer();
      });
    }

    if(options.prev){
      $(options.prev).live('click', function(e) {
        // Live handler called.
        e.preventDefault();
        s.goBack();
        s.resetTimer();
      });
    }

    /***********************************
    Functions
    ***********************************/
    function animateForward(sl1, sl2){
      //Animate Prev out
      s.$views[sl1].stop().animate({
          //'left': (s.viewWidth*-1)/4+'px',
          'opacity': '0'
        },s.animTimer, s.easing ,function(){
          //s.$views[sl1].css({'left':s.viewWidth+'px'});
      });

      //Animate next in
      s.$views[sl2]
      //.css({'left':s.viewWidth/4+'px'})
      .stop().animate({
          // 'left':'0',
          'opacity':'1'
        },s.animTimer, s.easing, function(){
      });

    }

    function animateBackwards(sl1, sl2){
      //Animate prev out
      s.$views[sl1].stop().animate({
          //'left':s.viewWidth/4+'px',
          'opacity':'0'
        },s.animTimer, s.easing, function(){
          //s.$views[sl1].css({'left': s.viewWidth/4+'px'});
      });

      //Animate Next in
      s.$views[sl2]
      //.css({'left': (s.viewWidth*-1)/4+'px'})
      .stop().animate({
          // 'left':'0',
          'opacity': '1'
        },s.animTimer, s.easing, function(){
          //setCurrent(next);
      });
    }


    /***************************************
    Public Functions
    ***************************************/
    s.initialize = function() {
      //first run? set the current as the first item
      if(this.length > 0){
        setCurrent(0);
        s.startTimer();
      }
      return this;
    };

    s.startTimer = function(){
      if(options.auto){
        s.t = window.setInterval(function(){

            s.goForward();

        }, s.timerSpeed);
      }
    };

    s.killTimer = function(){
      window.clearInterval(s.t);
    };

    s.resetTimer = function(){
      s.killTimer();
      s.startTimer();
    };

    s.goForward = function(){
      //go forward one view forward
      var prev = s.current.data('idx'),
          next = prev+1; //Current Bullet's index

      initSlide(prev, next);
    };

    s.goBack = function(){
      //go back one view forward
      var prev = s.current.data('idx'),
      next = prev-1; //Current Bullet's index

      initSlide(prev, next);
    };

    s.goTo = function(i /*num*/){
      //go specific view
      var prev = s.current.data('idx'),
          next = i-1; //Current Bullet's index

      initSlide(prev, next);
    };

    return this.initialize();
  };  //End namespace $.fn.unoSlider

})(jQuery);

var featureSlideshow = $("#featureSlideshow"),
    currentCount = 0,
    maxCount = 0,
    isChildAlert = 0,
    isCollegeAlert = 0,
    isAdultAlert = 0,
    isAmberAlert = 0,
    numAlert = 0,
    linkAlert = "",
    amberAlertPanel,
    missingChildAlertPanel,
    missingCollegeStudentAlertPanel,
    missingAdultAlertPanel,
    missingType = [],
    missingLink = [],
    voltron = "",
    isKilled = false;

function afterCount() {

  if ( !isKilled ) {
    if ( currentCount < ( maxCount - 1 ) ) {
      currentCount++;
    } else {
      unoSlider.killTimer();
      isKilled = true;
    }
  }
}

function is_empty( obj ) {

  // null and undefined are empty
  if ( obj == null ) {return true;}
  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if ( obj.length && obj.length > 0 ) {return false;}
  if ( obj.length === 0 ) {return true;}

  for ( var key in obj ) {
    if ( Object.prototype.hasOwnProperty.call( obj, key ) ) {return false;}
  }

  return true;
}

var createAlertPanels = function( numAlert, alertLink ) {
  if ( numAlert > 1 ) {
    // Set all panel links to the overview page if there are multiple alerts active at one time
    alertLink = "http://missing.criminaljustice.ny.gov/alerts";
  } if ( !isAmberAlert ) {
    // Will need to change this for the Angular App.
    alertLink = "http://missing.criminaljustice.ny.gov" + alertLink;
  }

  panel_Amber = "<li class='panel'><div class='panel-wrapper'><a href='" + alertLink + "' rel='nofollow'><img src='images/missing-alert-images/amber-450x300.jpg' alt='Amber Alert' width='450' height='300'></a><span class='panel-info-bg'></span><div class='panel-info'><h2 class='title'><a href='" + alertLink + "' rel='nofollow'>View the current AMBER Alert &raquo;</a></h2></div></div></li>";
  panel_Child = "<li class='panel'><div class='panel-wrapper'><a href='" + alertLink + "' rel='nofollow'><img src='images/missing-alert-images/missing-child-alert-active.jpg' alt='Missing Child Alert!' width='450' height='300'></a><span class='panel-info-bg'></span><div class='panel-info'><h2 class='title'><a href='" + alertLink + "' rel='nofollow'>View Missing Child Alert &raquo;</a></h2></div></div></li>";
  panel_College = "<li class='panel'><div class='panel-wrapper'><a href='" + alertLink + "' rel='nofollow'><img src='images/missing-alert-images/missing-college-alert-active.jpg' alt='Missing College Student Alert!' width='450' height='300'></a><span class='panel-info-bg'></span><div class='panel-info'><h2 class='title'><a href='" + alertLink + "' rel='nofollow'>View Missing College Student Alert &raquo;</a></h2></div></div></li>";
  panel_Adult = "<li class='panel'><div class='panel-wrapper'><a href='" + alertLink + "' rel='nofollow'><img src='images/missing-alert-images/missing-va-alert-active.jpg' alt='Missing Adult Alert!' width='450' height='300'></a><span class='panel-info-bg'></span><div class='panel-info'><h2 class='title'><a href='" + alertLink + "' rel='nofollow'>View Missing Vulnerable Adult Alert &raquo;</a></h2></div></div></li>";

  if ( isAmberAlert ) {
    voltron += panel_Amber;
  }

  if ( isChildAlert ) {
    voltron += panel_Child;
  }

  if ( isCollegeAlert ) {
    voltron += panel_College;
  }

  if ( isAdultAlert ) {
    voltron += panel_Adult;
  }

  featureSlideshow.html( voltron );

};

var requestAlerts = $.ajax({
  // url : "http://nydcjsdev.devcloud.acquia-sites.com/alertlist",
  url : "http://missing.criminaljustice.ny.gov/alertlist",
  dataType : "jsonp",
  jsonpCallback: "alertList",
  contentType : "text/javascript",
  // Set a timeout to fire if you get a 404. needed for JSONP 404 responses
  timeout: 5000
});

requestAlerts.done(function( data ) {
  // Run the alert list through the display function.
  displayAlerts( data );
});

requestAlerts.always(function() {
  // We still need to run the slideshow even if the ajax req fails.
  runSlideShow();
});

var displayAlerts = function( data ) {
  var i = 0,
      cases = data.missingPerson;

  if ( !is_empty( cases[0] ) ) {
    for( i in cases ) {
      if ( cases.hasOwnProperty( i ) ) {
        numAlert++;

        linkAlert = cases[i].link;

        switch( cases[i].type ) {
          case "Missing Child Alert":
            isChildAlert++;
            break;
          case "Missing College Student Alert":
            isCollegeAlert++;
            break;
          case "Missing Vulnerable Adult Alert":
            isAdultAlert++;
            break;
          case "AMBER Alert":
            isAmberAlert++;
            break;
        }
      }
    }
    createAlertPanels( numAlert, linkAlert );
  }
};

var runSlideShow = function() {
  featureSlideshow.find(".loading").remove();

  maxCount = $(".panel").length * 2;

  if ( maxCount > 3 ) {
    window.unoSlider = featureSlideshow.unoSlider({
      animSpeed: 500,
      width: 450,
      next:"#next",
      prev:"#prev",
      speed: 6,
      callback: afterCount
    });
  }
};