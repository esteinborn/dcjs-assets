/*
*
* jQuery listnav plugin
* Copyright (c) 2009 iHwy, Inc.
* Author: Jack Killpatrick
*
* Version 2.1 (08/09/2009)
* Requires jQuery 1.3.2, jquery 1.2.6 or jquery 1.2.x plus the jquery dimensions plugin
*
* Visit http://www.ihwy.com/labs/jquery-listnav-plugin.aspx for more information.
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*
* Version 2.2 (08/03/10)
* Author: Eric Steinborn
* Compatiblity:
* jQuery 1.4.x, Seems to be compatible with 1.3.2 as well as 1.2.6 with dimensions plugin.
*/
(function(a){a.fn.listnav=function(b){var c=a.extend({},a.fn.listnav.defaults,b),d=["_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-"],e=!1;return c.prefixes=a.map(c.prefixes,function(a){return a.toLowerCase()}),this.each(function(){function p(){b.append(x()),g=a(".ln-letters",b).slice(0,1),c.showCounts&&(h=a(".ln-letter-count",b).slice(0,1)),r(),u(),c.flagDisabled&&t(),w(),c.includeAll||j.show(),c.includeAll||a(".all",g).remove(),c.includeNums||a("._",g).remove(),c.includeOther||a(".-",g).remove(),a(":last",g).addClass("ln-last");if(a.cookie&&c.cookieName!==null){var f=a.cookie(c.cookieName);f!==null&&(c.initLetter=f)}if(c.initLetter!=="")e=!0,a("."+c.initLetter.toLowerCase(),g).slice(0,1).click();else if(c.includeAll)a(".all",g).addClass("ln-selected");else for(var i=c.includeNums?0:1;i<d.length;i++)if(k[d[i]]>0){e=!0,a("."+d[i],g).slice(0,1).click();break}}function q(){h.css({top:a(".a",g).slice(0,1).position().top-a(".ln-letter-count").outerHeight({margin:!0})})}function r(){var b,d,e,f,g,h=c.prefixes.length>0;a(j).children().each(function(){g=a(this),d="",b=a.trim(g.text()).toLowerCase(),b!==""&&(h&&(f=b.split(" "),f.length>1&&a.inArray(f[0],c.prefixes)>-1&&(d=f[1].charAt(0),s(d,g,!0))),d=b.charAt(0),s(d,g))})}function s(a,b,c){/\W/.test(a)&&(a="-"),isNaN(a)||(a="_"),b.addClass("ln-"+a),k[a]===undefined&&(k[a]=0),k[a]++,c||l++}function t(){for(var b=0;b<d.length;b++)k[d[b]]===undefined&&a("."+d[b],g).addClass("ln-disabled")}function u(){j.append('<li class="ln-no-match" style="display:none">'+c.noMatchText+"</li>")}function v(b){if(a(b).hasClass("all"))return l;var c=k[a(b).attr("class").split(" ")[0]];return c!==undefined?c:0}function w(){c.showCounts&&b.mouseover(function(){q()}),c.showCounts&&a(".ln-letters a").mouseover(function(){var b=a(this).position().left,c=a(this).outerWidth({margin:!0})-1+"px",d=v(this);h.css({left:b,width:c}).text(d).show()}).mouseout(function(){h.hide()}),a("a",g).bind("click touchend",function(b){b.preventDefault(),a("a.ln-selected",g).removeClass("ln-selected");var d=a(this).attr("class").split(" ")[0];if(d==="all")j.children().show(),j.children(".ln-no-match").hide(),m=!0;else{m?(j.children().hide(),m=!1):o!==""&&j.children(".ln-"+o).hide();var f=v(this);f>0?(j.children(".ln-no-match").hide(),j.children(".ln-"+d).show()):j.children(".ln-no-match").show(),o=d}a.cookie&&c.cookieName!==null&&a.cookie(c.cookieName,d,{expires:999}),a(this).addClass("ln-selected"),a(this).blur(),!e&&c.onClick!==null?c.onClick(d):e=!1})}function x(){var a=[];for(var b=1;b<d.length;b++)a.length===0&&a.push('<a class="all" href="#">ALL</a><a class="_" href="#">0-9</a>'),a.push('<a class="'+d[b]+'" href="#">'+(d[b]==="-"?"...":d[b].toUpperCase())+"</a>");return'<div class="ln-letters">'+a.join("")+"</div>"+(c.showCounts?'<div class="ln-letter-count" style="display:none; position:absolute; top:0; left:0; width:20px;">0</div>':"")}var b,f,g,h,i=this.id,j=a(this);a("#"+i+"-nav").length||a('<div id="'+i+'-nav"/>').insertBefore(j),b=a("#"+i+"-nav");var k={},l=0,m=!0,n=0,o="";p()})},a.fn.listnav.defaults={initLetter:"",includeAll:!0,incudeOther:!1,includeNums:!0,flagDisabled:!0,noMatchText:"No matching entries",showCounts:!0,cookieName:null,onClick:null,prefixes:[]}})(jQuery)
/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(e,b,a){if(arguments.length>1&&(b===null||typeof b!=="object")){a=jQuery.extend({},a);if(b===null)a.expires=-1;if(typeof a.expires==="number"){var d=a.expires,c=a.expires=new Date;c.setDate(c.getDate()+d)}return document.cookie=[encodeURIComponent(e),"=",a.raw?String(b):encodeURIComponent(String(b)),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b||{};c=a.raw?function(f){return f}: decodeURIComponent;return(d=RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)").exec(document.cookie))?c(d[1]):null};
