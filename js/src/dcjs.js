(function($) {
	var searchSwitcher = $("#nygov-SearchSwitcher"),
		uagent,
		quickbarNav = $("#quickbarNav"),
		isBB = false,
		isMobile = false,
		dialog = "",
		hasPhotosRun = 0;

	//**************************
	// Detects if the current browser is a BlackBerry of some sort.
	function DetectBlackBerry() {
		if (uagent.search(deviceBB) > -1) {
			return true;
		} else {
			return false;
		}
	}

	if (searchSwitcher.css("display") === "none") { // Lets check to see if we're on a mobile device by checking to see if the search switcher is hidden (a media query CSS style)

		isMobile = true;
	}


	if (dcjs.isSOMS > 0) {

		/* SOR SEARCH DOWNTIME MESSAGE */
		//$("#offenderSearch").prepend("<h3><em><b>PLEASE NOTE:</b> The Sex Offender Registry Subdirectory on the DCJS website will be unavailable from <b>7 a.m. to 8 a.m. on Thursday, Sept. 19</b>. During this time, you may call 1-800-262-3257 to learn whether an individual is a registered sex offender in New York State.</em></h3>");


		if (dcjs.isFacebook < 0) {
			/* SOMS fixes: for client-side template changes needed for the times in-between deployments only for NON facebook */

			$("table").find('p a[href^="../nsor/recipient.htm"]').find("img").addClass("viewMap");
			// Fixes the view on map button for mobile/desktop users

			$("#quickbar").find(".flagLink").remove().end().find(".qbFacebook").parent().remove();
			// Removes translate and find us on facebook buttons from the quickbar

			$(".leftnav").find("li:first").find("a:last").text("Re-entry Initiatives");
			// Rename to "Re-entry initiatives"
		}

		var dialogW = 600,
			dialogH = 500;

		if (isMobile) {

			dialogW = "90%";

		}

		// show a spinner or something via css
		dialog = $('<div style="display:none;" class="loading offenderPhotoDialog" title="Additional Offender Photos"></div>').appendTo('body');

		// open the dialog
		dialog.dialog({
			autoOpen: false,
			// add a close listener to prevent adding multiple divs to the document
			close: function(event, ui) {
				// remove div with all data and events
				// dialog.remove();
			},
			width: dialogW,
			height: dialogH,
			resizable: true,
			autoResize: true,
			modal: true
		});

		$("#showPhotos").click(function(e){

			if (hasPhotosRun < 1) {

				var url = this.href;

				// load remote content
				dialog.load(
					url,
					{}, // omit this param object to issue a GET request instead a POST request, otherwise you may provide post parameters within the object
					function (responseText, textStatus, XMLHttpRequest) {
						// remove the loading class
						dialog.removeClass('loading');
					}
				).dialog("open");

				hasPhotosRun = 1;
			}
			else {

				dialog.dialog("open");
			}

			//prevent the browser to follow the link
			e.preventDefault();
		});

	}

	if (dcjs.isFacebook < 0 ) { // If we're NOT in facebook.
		// Never want isMobile to run if you're on Facebook.
		if (isMobile) {

			var nav = $("#navigation"),
				wrapper = $("#wrapper, #page"),
				quickbarHTML = "<li><a href='http://www.criminaljustice.ny.gov/SomsSUBDirectory/search_index.jsp' class='button'>Sex Offender Search</a></li><li><a href='http://www.criminaljustice.ny.gov/missing/index.htm' class='button'>Missing Persons</a></li>",
				mobileHeader = $("#mobileHeader"),
				mobileNav = $("#mobileNav"),
				leftNav = $("ul.leftnav"),
				subNav = $("#subnav"),
				localNav = $("#localnav"),
				mobileToggler = $(".mobileToggler"),
				mobileTogglee = $(".mobileTogglee"),
				deviceBB = "blackberry";

			// Init our user agent string to lower case.
			uagent = navigator.userAgent.toLowerCase();

			isBB = DetectBlackBerry();

			if (isBB) {

				$(".nonBB").css("display", "none");

			}

			// check to make sure we're on a page with navigation on it
			if (nav.length) {

				quickbarNav.addClass("inline-block").html(quickbarHTML).appendTo(mobileHeader);

				nav.insertAfter(mobileNav);

				wrapper.toggleClass("outer-wrapper-wo-active-nav");
				nav.toggleClass("inner-wrapper-w-active-nav");
				leftNav.toggleClass("active-nav");

				mobileNav.bind("click", function(e){
					e.preventDefault();
					localNav.hide();
					subNav.hide();
					wrapper.toggleClass("outer-wrapper-wo-active-nav outer-wrapper-w-active-nav");
				});

				$("#main, #footer").bind("touchstart", function(){
					if ( mobileNav.hasClass("clicked") ) {
						mobileNav.toggleClass("clicked");
						wrapper.toggleClass("outer-wrapper-wo-active-nav outer-wrapper-w-active-nav");
						return false;
					}

				});

			} else {

				mobileNav.addClass("hidden");

				mobileHeader.css("height", "3em");

			} // End Navigation Changes

			$("head").append("<link rel='apple-touch-icon' href='http://www.criminaljustice.ny.gov/apple-touch-icon.png'>");

			$(".button").live("click", function(){$(this).toggleClass("clicked");});

			if (subNav.length) {

				var subNavTitle = subNav.find("p").text();

				$("<a />", {
					"class": "button",
					"href": "#",
					"id": "subNavButton",
					text: subNavTitle + " Menu",
					click: function(e) {
						e.preventDefault();
						localNav.hide();

						if (!isBB) {

							subNav.fadeToggle();

						} else {

							subNav.toggle();

						}
					}
				}).insertBefore(subNav).wrap("<p class='subNavButtonWrap' />");

				if (localNav.length) {

					var localNavTitle = localNav.find("p").text();

					$("<a />", {
						"class": "button",
						"href": "#",
						"id": "localNavButton",
						text: localNavTitle,
						click: function(e) {
							e.preventDefault();
							subNav.hide();

							if (!isBB) {

								localNav.fadeToggle();

							} else {

								localNav.toggle();

							}
						}
					}).insertAfter("#subNavButton");
				} // end if localNav
			} // End if subNav

			if (mobileToggler.length && !isBB) { // Moblie Toggler Setup

				mobileToggler.each(function(){ // Append the H5 text from each of the What's new headings to their child containers

					var $this = $(this),
						h5 = "<p><strong>" + $this.text() + "</strong></p>";

					$this.next(mobileTogglee).prepend(h5);

				});

				mobileToggler.click(function(){
					var $this = $(this);
					$this.toggleClass("onToggled").next(mobileTogglee).slideToggle();
				});

			} else { // Make BB's not have the toggle functionality cause BB's suck at the internet.
				mobileTogglee.css("display", "inherit");

			} // END MobileToggler
		//End if isMobile = true
		} else {

			searchSwitcher.click(function(e){

				e.preventDefault();
				$(this).addClass("invisible");
				$("#nygov-sw_searchbox").removeClass("invisible").addClass("isVisible");

			});
		} // End if isMobile = false
	}//End if isFacebook = true

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// Event Tracker Instructions *******************/
// add to link: <a class="gaEventTracker" data-ga='{"evtCategory": "Category", "evtAction": "Event Type", "evtLabel": "Event Name"}'>
// Example:     <a class="gaEventTracker" data-ga='{"evtCategory": "Videos", "evtAction": "Press", "evtLabel": "Child Sexual Predators HQ"}'>
// Allows you to leave out an option if you dont want one. You WILL need to provide at least the evtCategory For proper google tracking

$.fn.gaEventTracker = function(options) {

	return this.each(function(){

		var $this = $(this),
			opts,
			defaults = {
				evtCategory: "Category Not Defined",
				evtAction: "",
				evtLabel: ""
			};

		if ($this.data("ga")) {

			var ga = $this.data("ga");

			defaults = {
				evtCategory: ga.evtCategory || "Category Not Defined",
				evtAction: ga.evtAction || "",
				evtLabel: ga.evtLabel || ""
			};

		}

		opts = $.extend({}, defaults, options);
		$this.attr('onClick', "_gaq.push(['_trackEvent', '" + opts.evtCategory + "', '" + opts.evtAction + "', '" + opts.evtLabel + "']);");
	});
};
$("#mainContent a.gaEventTracker").gaEventTracker();

$("#mainContent a[href$='.pdf'], #mainContent a[href$='.doc'], #mainContent a[href$='.docx'], #mainContent a[href$='.ppt'], #mainContent a[href$='.pptx'], #mainContent a[href$='.xls'], #mainContent a[href$='.xlsx']").each(gaDocumentTrack);


/*****************************
** gaDocumentTrack Overview
**
** Checks to make sure there isn't a gaEventTracker Init'd yet, and then checks HREF value of the link
** and compares it to the window.location.pathname and inserts appropriate directory names into the google event tracker.
** Full support for External Documents categorized as: "External Document"
**
** Eric Steinborn 4/2011
*******************************/

function gaDocumentTrack() {

	var $this = $(this);

	if (!$this.data("ga")) {  // Only run if no data-ga has been declared previously, you dont want to overwrite the specific stuff.

		var	category = "Documents",
			action = "",
			label = $this.attr("href"),
			i = 0, z = 0, numSlashes = 0,
			oURL = window.location.pathname,
			splitURL = oURL.split("/");

			splitURL.remove(0); // removes first blank entry in the Array
			splitURL.remove(-1); // removes filename

		if (label.match(/(\.\.\/)/gi)) { // check for "../" in HREF attr

			numSlashes = label.match(/(\.\.\/)/gi).length; // how many slashes
			label = label.replace(/(\.\.\/)/gi, ""); // replace slashes with ""

			if (numSlashes === splitURL.length) { // if the number of slashes equals directories in splitURL

				action = "/" + label;

			} else {  // If numSlashes !=== splitURL.length (meat and potatoes)

				for (i; i < numSlashes; i++) {

					splitURL.remove(-1); // removes the last item in the array until numslashes are removed

				}

				for (z; z < splitURL.length; z++) {

					if (action === "") { // runs once at beginning

						splitURL.reverse(); // reverse the split to reassemble URL

						action = "/" + splitURL[z] + "/" + label; // /splitURL[0]/label

					} else { // runs until numSlashes has been fulfilled

						action = "/" + splitURL[z] + action; // /splitURL[z]/splitURL[0]/label
					}

				}

			}

		} else { // run if there are NO ../'s

			if (label.match("http://") && !oURL.match("/search")) { // External && not search!

				category = "External Documents";
				action = label;

			} else if (oURL.match("/search")) { // If Search, make it pretty.

				action = label.replace(/(http:\/\/www.criminaljustice.ny.gov)/gi, "");

			} else if (splitURL.length < 1) { // if not External && isRoot

				action = "/" + label;

			} else { // If not root and not external

				action = "/" + splitURL.join("/") + "/" + label;

			}

		}

		oURL = oURL.replace("/index.htm", "/").replace("/index.html", "/"); // index URL's = "/"

		$this.gaEventTracker({
			"evtCategory": category,
			"evtAction": action,
			"evtLabel": oURL
		});
	}
}
	// var thisURL = window.parent.location.href, // only use for outside agencies
	var isState = dcjs.theURL.search(/.state.ny.us/i),
		isWWW = dcjs.theURL.search(/www./i),
		newDomainLink = "";

	if (isState > 0){
		newDomainLink = dcjs.theURL.replace("state.ny.us", "ny.gov");
		if (isWWW < 0 ) {
			newDomainLink = newDomainLink.replace("http://", "http://www.");
		}
		$("body").prepend('<div class="newDomainReminder"><div class="centerer"><p>Our website has moved.<br />Access our new site by clicking the link below and remember to update your bookmarks.</p><p><a href="' + newDomainLink + '">' + newDomainLink + '</a><span class="domainCloser"><a href="#">X</a></span></p></div></div>');
		setTimeout(function(){$(".newDomainReminder").animate({"top": 0});}, 1500);

		$(".domainCloser a").live("click", function(e){e.preventDefault(); $(".newDomainReminder").animate({"top": "-160px"});});
	}

})(jQuery);
var _gaq = [['_setAccount', 'UA-15068527-1'], ['_trackPageview']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=('https:'===location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s);}(document,'script'));
