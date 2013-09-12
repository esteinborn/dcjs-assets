(function(jwplayer){

  var template = function(player, div, config) {
    
    var assets = {
        download: '/images/interface/download-2.png',
		hover: '/images/interface/download-2-hover.png'
    };

    var goDownload = function() {
        var item = player.getPlaylistItem();
        if (item['download.link']) {
            document.location = item['downloadlink'];
        } else if (config.link) { 
            document.location = config.link;
        } else {
            document.location = item.file;
        }
    };
    
    function _setup(evt) {
        player.getPlugin("dock").setButton(
            'downloadButton',
            goDownload,
            assets.download,
			assets.hover
        );
    };
    player.onReady(_setup);
    
    this.resize = function(width, height) {};
  };

  jwplayer().registerPlugin('jwplayer.download', template);

})(jwplayer);