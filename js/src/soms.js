$(function(){
  if (dcjs.isSOMS > 0 && dcjs.isFacebook < 0) {
    var dialogW = 600,
        dialogH = 500;

    if (isMobile) {

      dialogW = "90%";
      dialogH = "320";

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
});