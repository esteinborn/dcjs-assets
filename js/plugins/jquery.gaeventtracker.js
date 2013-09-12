// Event Tracker Instructions!
// add to link: <a class="gaEventTracker" data-ga='{"evtCategory" : "Category", "evtLabel" : "Event Type", "evtTitle" : "Event Name"}'>
// Example:     <a class="gaEventTracker" data-ga='{"evtCategory" : "Videos", "evtLabel" : "Open Meetings", "evtTitle" : "Commission Meeting"}'>
// Single quote and Double quote structure MUST BE KEPT INTACT! or else jQuery will just return undefined.

(function($) {

$.fn.gaEventTracker = function() { 
	var defaults = {
		evtCategory: '',
		evtAction: '',
		evtLabel: ''
	};
	return this.each(function(){
		var $this = $(this),
		opts = {
			evtCategory: $this.data("ga").evtCategory,
			evtAction: $this.data("ga").evtAction,
			evtLabel: $this.data("ga").evtLabel
		},
		opts = $.extend({}, defaults, opts),
		returnedValue = "_gaq.push(['_trackEvent', '" + opts.evtCategory + "', '" + opts.evtAction + "', '" + opts.evtLabel + "']);";
		$(this).attr('onClick', returnedValue);
	});
};
})(jQuery);
