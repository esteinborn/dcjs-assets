var dcjs = {
        theURL : window.parent.location.href,
        docElement : document.documentElement
    };

    dcjs.isFacebook = dcjs.theURL.search(/\/nsor\/facebook\//i);
    dcjs.isSOMS = dcjs.theURL.search(/SomsSUBDirectory/i);


dcjs.docElement.className = dcjs.docElement.className.replace(/\bno-js\b/, '') + ' js '; // Stolen from Modernizr

if ( dcjs.isSOMS > 1 ) {

    dcjs.docElement.className+=' soms ';

} else {

    dcjs.docElement.className+=' notSoms ';

}

if ( dcjs.isFacebook > 1 ) {

    dcjs.docElement.className+=' facebook ';

} else {

    dcjs.docElement.className+=' notFacebook ';

    // Load Google Custom Search Engine
    (function() {
        var cx = '011643406602484492273:0ve_hsnevmc',
            gcse = document.createElement('script');

        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
            '//www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
    })();
}
