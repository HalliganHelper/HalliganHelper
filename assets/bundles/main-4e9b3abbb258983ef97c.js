/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var SchoolView = __webpack_require__(9);

	var app = typeof app !== "undefined" ? app : {};

	function show_notification(msg) {
	    var options = {
	        'body': msg,
	        'icon': '/static/tas/imgs/HH_Logo.jpg'
	    };
	    var notification = new Notification("Halligan Helper", options);
	}

	function setupWebsocket() {
	    
	    var websocketProtocol = location.protocol === "http:" ? "ws:" : "wss:"; 
	    var websocketURI = websocketProtocol + "//" + location.host + "/ws/ta?subscribe-broadcast";

	    var ws4redis = WS4Redis({
	        uri: websocketURI,
	        heartbeat_msg: '--heartbeat--',
	        receive_message: function(msg) {
	            try {
	                var data = JSON.parse(msg);
	                app.currentCourse.handleUpdate( data );
	            } catch( err ) {
	                return;
	            }
	        }
	    });
	}

	function ajaxSetup() {
	   var csrftoken = $.cookie('csrftoken'); 

	    function csrfSafeMethod(method) {
	        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	    }

	    $.ajaxSetup({
	        beforeSend: function(xhr, settings) {
	            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	                xhr.setRequestHeader("X-CSRFToken", csrftoken);
	            }
	        }
	    });
	}

	sv = new SchoolView();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/resolve-url-loader/index.js!./../../node_modules/sass-loader/index.js?sourceMap!./extend_foundation.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/resolve-url-loader/index.js!./../../node_modules/sass-loader/index.js?sourceMap!./extend_foundation.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/**\n * Foundation for Sites by ZURB\n * Version 6.1.1\n * foundation.zurb.com\n * Licensed under MIT Open Source\n */\n\n/* \n * Foundation Icons v 3.0\n * Made by ZURB 2013 http://zurb.com/playground/foundation-icon-fonts-3\n * MIT License\n */\n\n@font-face {\n  font-family: \"foundation-icons\";\n  src: url(" + __webpack_require__(4) + ");\n  src: url(" + __webpack_require__(4) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(5) + ") format(\"woff\"), url(" + __webpack_require__(6) + ") format(\"truetype\"), url(" + __webpack_require__(7) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n/*\n@font-face {\n  font-family: \"foundation-icons\";\n  src: url(\"foundation-icons.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n*/\n\n.fi-address-book:before,\n.fi-alert:before,\n.fi-align-center:before,\n.fi-align-justify:before,\n.fi-align-left:before,\n.fi-align-right:before,\n.fi-anchor:before,\n.fi-annotate:before,\n.fi-archive:before,\n.fi-arrow-down:before,\n.fi-arrow-left:before,\n.fi-arrow-right:before,\n.fi-arrow-up:before,\n.fi-arrows-compress:before,\n.fi-arrows-expand:before,\n.fi-arrows-in:before,\n.fi-arrows-out:before,\n.fi-asl:before,\n.fi-asterisk:before,\n.fi-at-sign:before,\n.fi-background-color:before,\n.fi-battery-empty:before,\n.fi-battery-full:before,\n.fi-battery-half:before,\n.fi-bitcoin-circle:before,\n.fi-bitcoin:before,\n.fi-blind:before,\n.fi-bluetooth:before,\n.fi-bold:before,\n.fi-book-bookmark:before,\n.fi-book:before,\n.fi-bookmark:before,\n.fi-braille:before,\n.fi-burst-new:before,\n.fi-burst-sale:before,\n.fi-burst:before,\n.fi-calendar:before,\n.fi-camera:before,\n.fi-check:before,\n.fi-checkbox:before,\n.fi-clipboard-notes:before,\n.fi-clipboard-pencil:before,\n.fi-clipboard:before,\n.fi-clock:before,\n.fi-closed-caption:before,\n.fi-cloud:before,\n.fi-comment-minus:before,\n.fi-comment-quotes:before,\n.fi-comment-video:before,\n.fi-comment:before,\n.fi-comments:before,\n.fi-compass:before,\n.fi-contrast:before,\n.fi-credit-card:before,\n.fi-crop:before,\n.fi-crown:before,\n.fi-css3:before,\n.fi-database:before,\n.fi-die-five:before,\n.fi-die-four:before,\n.fi-die-one:before,\n.fi-die-six:before,\n.fi-die-three:before,\n.fi-die-two:before,\n.fi-dislike:before,\n.fi-dollar-bill:before,\n.fi-dollar:before,\n.fi-download:before,\n.fi-eject:before,\n.fi-elevator:before,\n.fi-euro:before,\n.fi-eye:before,\n.fi-fast-forward:before,\n.fi-female-symbol:before,\n.fi-female:before,\n.fi-filter:before,\n.fi-first-aid:before,\n.fi-flag:before,\n.fi-folder-add:before,\n.fi-folder-lock:before,\n.fi-folder:before,\n.fi-foot:before,\n.fi-foundation:before,\n.fi-graph-bar:before,\n.fi-graph-horizontal:before,\n.fi-graph-pie:before,\n.fi-graph-trend:before,\n.fi-guide-dog:before,\n.fi-hearing-aid:before,\n.fi-heart:before,\n.fi-home:before,\n.fi-html5:before,\n.fi-indent-less:before,\n.fi-indent-more:before,\n.fi-info:before,\n.fi-italic:before,\n.fi-key:before,\n.fi-laptop:before,\n.fi-layout:before,\n.fi-lightbulb:before,\n.fi-like:before,\n.fi-link:before,\n.fi-list-bullet:before,\n.fi-list-number:before,\n.fi-list-thumbnails:before,\n.fi-list:before,\n.fi-lock:before,\n.fi-loop:before,\n.fi-magnifying-glass:before,\n.fi-mail:before,\n.fi-male-female:before,\n.fi-male-symbol:before,\n.fi-male:before,\n.fi-map:before,\n.fi-marker:before,\n.fi-megaphone:before,\n.fi-microphone:before,\n.fi-minus-circle:before,\n.fi-minus:before,\n.fi-mobile-signal:before,\n.fi-mobile:before,\n.fi-monitor:before,\n.fi-mountains:before,\n.fi-music:before,\n.fi-next:before,\n.fi-no-dogs:before,\n.fi-no-smoking:before,\n.fi-page-add:before,\n.fi-page-copy:before,\n.fi-page-csv:before,\n.fi-page-delete:before,\n.fi-page-doc:before,\n.fi-page-edit:before,\n.fi-page-export-csv:before,\n.fi-page-export-doc:before,\n.fi-page-export-pdf:before,\n.fi-page-export:before,\n.fi-page-filled:before,\n.fi-page-multiple:before,\n.fi-page-pdf:before,\n.fi-page-remove:before,\n.fi-page-search:before,\n.fi-page:before,\n.fi-paint-bucket:before,\n.fi-paperclip:before,\n.fi-pause:before,\n.fi-paw:before,\n.fi-paypal:before,\n.fi-pencil:before,\n.fi-photo:before,\n.fi-play-circle:before,\n.fi-play-video:before,\n.fi-play:before,\n.fi-plus:before,\n.fi-pound:before,\n.fi-power:before,\n.fi-previous:before,\n.fi-price-tag:before,\n.fi-pricetag-multiple:before,\n.fi-print:before,\n.fi-prohibited:before,\n.fi-projection-screen:before,\n.fi-puzzle:before,\n.fi-quote:before,\n.fi-record:before,\n.fi-refresh:before,\n.fi-results-demographics:before,\n.fi-results:before,\n.fi-rewind-ten:before,\n.fi-rewind:before,\n.fi-rss:before,\n.fi-safety-cone:before,\n.fi-save:before,\n.fi-share:before,\n.fi-sheriff-badge:before,\n.fi-shield:before,\n.fi-shopping-bag:before,\n.fi-shopping-cart:before,\n.fi-shuffle:before,\n.fi-skull:before,\n.fi-social-500px:before,\n.fi-social-adobe:before,\n.fi-social-amazon:before,\n.fi-social-android:before,\n.fi-social-apple:before,\n.fi-social-behance:before,\n.fi-social-bing:before,\n.fi-social-blogger:before,\n.fi-social-delicious:before,\n.fi-social-designer-news:before,\n.fi-social-deviant-art:before,\n.fi-social-digg:before,\n.fi-social-dribbble:before,\n.fi-social-drive:before,\n.fi-social-dropbox:before,\n.fi-social-evernote:before,\n.fi-social-facebook:before,\n.fi-social-flickr:before,\n.fi-social-forrst:before,\n.fi-social-foursquare:before,\n.fi-social-game-center:before,\n.fi-social-github:before,\n.fi-social-google-plus:before,\n.fi-social-hacker-news:before,\n.fi-social-hi5:before,\n.fi-social-instagram:before,\n.fi-social-joomla:before,\n.fi-social-lastfm:before,\n.fi-social-linkedin:before,\n.fi-social-medium:before,\n.fi-social-myspace:before,\n.fi-social-orkut:before,\n.fi-social-path:before,\n.fi-social-picasa:before,\n.fi-social-pinterest:before,\n.fi-social-rdio:before,\n.fi-social-reddit:before,\n.fi-social-skillshare:before,\n.fi-social-skype:before,\n.fi-social-smashing-mag:before,\n.fi-social-snapchat:before,\n.fi-social-spotify:before,\n.fi-social-squidoo:before,\n.fi-social-stack-overflow:before,\n.fi-social-steam:before,\n.fi-social-stumbleupon:before,\n.fi-social-treehouse:before,\n.fi-social-tumblr:before,\n.fi-social-twitter:before,\n.fi-social-vimeo:before,\n.fi-social-windows:before,\n.fi-social-xbox:before,\n.fi-social-yahoo:before,\n.fi-social-yelp:before,\n.fi-social-youtube:before,\n.fi-social-zerply:before,\n.fi-social-zurb:before,\n.fi-sound:before,\n.fi-star:before,\n.fi-stop:before,\n.fi-strikethrough:before,\n.fi-subscript:before,\n.fi-superscript:before,\n.fi-tablet-landscape:before,\n.fi-tablet-portrait:before,\n.fi-target-two:before,\n.fi-target:before,\n.fi-telephone-accessible:before,\n.fi-telephone:before,\n.fi-text-color:before,\n.fi-thumbnails:before,\n.fi-ticket:before,\n.fi-torso-business:before,\n.fi-torso-female:before,\n.fi-torso:before,\n.fi-torsos-all-female:before,\n.fi-torsos-all:before,\n.fi-torsos-female-male:before,\n.fi-torsos-male-female:before,\n.fi-torsos:before,\n.fi-trash:before,\n.fi-trees:before,\n.fi-trophy:before,\n.fi-underline:before,\n.fi-universal-access:before,\n.fi-unlink:before,\n.fi-unlock:before,\n.fi-upload-cloud:before,\n.fi-upload:before,\n.fi-usb:before,\n.fi-video:before,\n.fi-volume-none:before,\n.fi-volume-strike:before,\n.fi-volume:before,\n.fi-web:before,\n.fi-wheelchair:before,\n.fi-widget:before,\n.fi-wrench:before,\n.fi-x-circle:before,\n.fi-x:before,\n.fi-yen:before,\n.fi-zoom-in:before,\n.fi-zoom-out:before {\n  font-family: \"foundation-icons\";\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  display: inline-block;\n  text-decoration: inherit;\n}\n\n.fi-address-book:before {\n  content: \"\\F100\";\n}\n\n.fi-alert:before {\n  content: \"\\F101\";\n}\n\n.fi-align-center:before {\n  content: \"\\F102\";\n}\n\n.fi-align-justify:before {\n  content: \"\\F103\";\n}\n\n.fi-align-left:before {\n  content: \"\\F104\";\n}\n\n.fi-align-right:before {\n  content: \"\\F105\";\n}\n\n.fi-anchor:before {\n  content: \"\\F106\";\n}\n\n.fi-annotate:before {\n  content: \"\\F107\";\n}\n\n.fi-archive:before {\n  content: \"\\F108\";\n}\n\n.fi-arrow-down:before {\n  content: \"\\F109\";\n}\n\n.fi-arrow-left:before {\n  content: \"\\F10A\";\n}\n\n.fi-arrow-right:before {\n  content: \"\\F10B\";\n}\n\n.fi-arrow-up:before {\n  content: \"\\F10C\";\n}\n\n.fi-arrows-compress:before {\n  content: \"\\F10D\";\n}\n\n.fi-arrows-expand:before {\n  content: \"\\F10E\";\n}\n\n.fi-arrows-in:before {\n  content: \"\\F10F\";\n}\n\n.fi-arrows-out:before {\n  content: \"\\F110\";\n}\n\n.fi-asl:before {\n  content: \"\\F111\";\n}\n\n.fi-asterisk:before {\n  content: \"\\F112\";\n}\n\n.fi-at-sign:before {\n  content: \"\\F113\";\n}\n\n.fi-background-color:before {\n  content: \"\\F114\";\n}\n\n.fi-battery-empty:before {\n  content: \"\\F115\";\n}\n\n.fi-battery-full:before {\n  content: \"\\F116\";\n}\n\n.fi-battery-half:before {\n  content: \"\\F117\";\n}\n\n.fi-bitcoin-circle:before {\n  content: \"\\F118\";\n}\n\n.fi-bitcoin:before {\n  content: \"\\F119\";\n}\n\n.fi-blind:before {\n  content: \"\\F11A\";\n}\n\n.fi-bluetooth:before {\n  content: \"\\F11B\";\n}\n\n.fi-bold:before {\n  content: \"\\F11C\";\n}\n\n.fi-book-bookmark:before {\n  content: \"\\F11D\";\n}\n\n.fi-book:before {\n  content: \"\\F11E\";\n}\n\n.fi-bookmark:before {\n  content: \"\\F11F\";\n}\n\n.fi-braille:before {\n  content: \"\\F120\";\n}\n\n.fi-burst-new:before {\n  content: \"\\F121\";\n}\n\n.fi-burst-sale:before {\n  content: \"\\F122\";\n}\n\n.fi-burst:before {\n  content: \"\\F123\";\n}\n\n.fi-calendar:before {\n  content: \"\\F124\";\n}\n\n.fi-camera:before {\n  content: \"\\F125\";\n}\n\n.fi-check:before {\n  content: \"\\F126\";\n}\n\n.fi-checkbox:before {\n  content: \"\\F127\";\n}\n\n.fi-clipboard-notes:before {\n  content: \"\\F128\";\n}\n\n.fi-clipboard-pencil:before {\n  content: \"\\F129\";\n}\n\n.fi-clipboard:before {\n  content: \"\\F12A\";\n}\n\n.fi-clock:before {\n  content: \"\\F12B\";\n}\n\n.fi-closed-caption:before {\n  content: \"\\F12C\";\n}\n\n.fi-cloud:before {\n  content: \"\\F12D\";\n}\n\n.fi-comment-minus:before {\n  content: \"\\F12E\";\n}\n\n.fi-comment-quotes:before {\n  content: \"\\F12F\";\n}\n\n.fi-comment-video:before {\n  content: \"\\F130\";\n}\n\n.fi-comment:before {\n  content: \"\\F131\";\n}\n\n.fi-comments:before {\n  content: \"\\F132\";\n}\n\n.fi-compass:before {\n  content: \"\\F133\";\n}\n\n.fi-contrast:before {\n  content: \"\\F134\";\n}\n\n.fi-credit-card:before {\n  content: \"\\F135\";\n}\n\n.fi-crop:before {\n  content: \"\\F136\";\n}\n\n.fi-crown:before {\n  content: \"\\F137\";\n}\n\n.fi-css3:before {\n  content: \"\\F138\";\n}\n\n.fi-database:before {\n  content: \"\\F139\";\n}\n\n.fi-die-five:before {\n  content: \"\\F13A\";\n}\n\n.fi-die-four:before {\n  content: \"\\F13B\";\n}\n\n.fi-die-one:before {\n  content: \"\\F13C\";\n}\n\n.fi-die-six:before {\n  content: \"\\F13D\";\n}\n\n.fi-die-three:before {\n  content: \"\\F13E\";\n}\n\n.fi-die-two:before {\n  content: \"\\F13F\";\n}\n\n.fi-dislike:before {\n  content: \"\\F140\";\n}\n\n.fi-dollar-bill:before {\n  content: \"\\F141\";\n}\n\n.fi-dollar:before {\n  content: \"\\F142\";\n}\n\n.fi-download:before {\n  content: \"\\F143\";\n}\n\n.fi-eject:before {\n  content: \"\\F144\";\n}\n\n.fi-elevator:before {\n  content: \"\\F145\";\n}\n\n.fi-euro:before {\n  content: \"\\F146\";\n}\n\n.fi-eye:before {\n  content: \"\\F147\";\n}\n\n.fi-fast-forward:before {\n  content: \"\\F148\";\n}\n\n.fi-female-symbol:before {\n  content: \"\\F149\";\n}\n\n.fi-female:before {\n  content: \"\\F14A\";\n}\n\n.fi-filter:before {\n  content: \"\\F14B\";\n}\n\n.fi-first-aid:before {\n  content: \"\\F14C\";\n}\n\n.fi-flag:before {\n  content: \"\\F14D\";\n}\n\n.fi-folder-add:before {\n  content: \"\\F14E\";\n}\n\n.fi-folder-lock:before {\n  content: \"\\F14F\";\n}\n\n.fi-folder:before {\n  content: \"\\F150\";\n}\n\n.fi-foot:before {\n  content: \"\\F151\";\n}\n\n.fi-foundation:before {\n  content: \"\\F152\";\n}\n\n.fi-graph-bar:before {\n  content: \"\\F153\";\n}\n\n.fi-graph-horizontal:before {\n  content: \"\\F154\";\n}\n\n.fi-graph-pie:before {\n  content: \"\\F155\";\n}\n\n.fi-graph-trend:before {\n  content: \"\\F156\";\n}\n\n.fi-guide-dog:before {\n  content: \"\\F157\";\n}\n\n.fi-hearing-aid:before {\n  content: \"\\F158\";\n}\n\n.fi-heart:before {\n  content: \"\\F159\";\n}\n\n.fi-home:before {\n  content: \"\\F15A\";\n}\n\n.fi-html5:before {\n  content: \"\\F15B\";\n}\n\n.fi-indent-less:before {\n  content: \"\\F15C\";\n}\n\n.fi-indent-more:before {\n  content: \"\\F15D\";\n}\n\n.fi-info:before {\n  content: \"\\F15E\";\n}\n\n.fi-italic:before {\n  content: \"\\F15F\";\n}\n\n.fi-key:before {\n  content: \"\\F160\";\n}\n\n.fi-laptop:before {\n  content: \"\\F161\";\n}\n\n.fi-layout:before {\n  content: \"\\F162\";\n}\n\n.fi-lightbulb:before {\n  content: \"\\F163\";\n}\n\n.fi-like:before {\n  content: \"\\F164\";\n}\n\n.fi-link:before {\n  content: \"\\F165\";\n}\n\n.fi-list-bullet:before {\n  content: \"\\F166\";\n}\n\n.fi-list-number:before {\n  content: \"\\F167\";\n}\n\n.fi-list-thumbnails:before {\n  content: \"\\F168\";\n}\n\n.fi-list:before {\n  content: \"\\F169\";\n}\n\n.fi-lock:before {\n  content: \"\\F16A\";\n}\n\n.fi-loop:before {\n  content: \"\\F16B\";\n}\n\n.fi-magnifying-glass:before {\n  content: \"\\F16C\";\n}\n\n.fi-mail:before {\n  content: \"\\F16D\";\n}\n\n.fi-male-female:before {\n  content: \"\\F16E\";\n}\n\n.fi-male-symbol:before {\n  content: \"\\F16F\";\n}\n\n.fi-male:before {\n  content: \"\\F170\";\n}\n\n.fi-map:before {\n  content: \"\\F171\";\n}\n\n.fi-marker:before {\n  content: \"\\F172\";\n}\n\n.fi-megaphone:before {\n  content: \"\\F173\";\n}\n\n.fi-microphone:before {\n  content: \"\\F174\";\n}\n\n.fi-minus-circle:before {\n  content: \"\\F175\";\n}\n\n.fi-minus:before {\n  content: \"\\F176\";\n}\n\n.fi-mobile-signal:before {\n  content: \"\\F177\";\n}\n\n.fi-mobile:before {\n  content: \"\\F178\";\n}\n\n.fi-monitor:before {\n  content: \"\\F179\";\n}\n\n.fi-mountains:before {\n  content: \"\\F17A\";\n}\n\n.fi-music:before {\n  content: \"\\F17B\";\n}\n\n.fi-next:before {\n  content: \"\\F17C\";\n}\n\n.fi-no-dogs:before {\n  content: \"\\F17D\";\n}\n\n.fi-no-smoking:before {\n  content: \"\\F17E\";\n}\n\n.fi-page-add:before {\n  content: \"\\F17F\";\n}\n\n.fi-page-copy:before {\n  content: \"\\F180\";\n}\n\n.fi-page-csv:before {\n  content: \"\\F181\";\n}\n\n.fi-page-delete:before {\n  content: \"\\F182\";\n}\n\n.fi-page-doc:before {\n  content: \"\\F183\";\n}\n\n.fi-page-edit:before {\n  content: \"\\F184\";\n}\n\n.fi-page-export-csv:before {\n  content: \"\\F185\";\n}\n\n.fi-page-export-doc:before {\n  content: \"\\F186\";\n}\n\n.fi-page-export-pdf:before {\n  content: \"\\F187\";\n}\n\n.fi-page-export:before {\n  content: \"\\F188\";\n}\n\n.fi-page-filled:before {\n  content: \"\\F189\";\n}\n\n.fi-page-multiple:before {\n  content: \"\\F18A\";\n}\n\n.fi-page-pdf:before {\n  content: \"\\F18B\";\n}\n\n.fi-page-remove:before {\n  content: \"\\F18C\";\n}\n\n.fi-page-search:before {\n  content: \"\\F18D\";\n}\n\n.fi-page:before {\n  content: \"\\F18E\";\n}\n\n.fi-paint-bucket:before {\n  content: \"\\F18F\";\n}\n\n.fi-paperclip:before {\n  content: \"\\F190\";\n}\n\n.fi-pause:before {\n  content: \"\\F191\";\n}\n\n.fi-paw:before {\n  content: \"\\F192\";\n}\n\n.fi-paypal:before {\n  content: \"\\F193\";\n}\n\n.fi-pencil:before {\n  content: \"\\F194\";\n}\n\n.fi-photo:before {\n  content: \"\\F195\";\n}\n\n.fi-play-circle:before {\n  content: \"\\F196\";\n}\n\n.fi-play-video:before {\n  content: \"\\F197\";\n}\n\n.fi-play:before {\n  content: \"\\F198\";\n}\n\n.fi-plus:before {\n  content: \"\\F199\";\n}\n\n.fi-pound:before {\n  content: \"\\F19A\";\n}\n\n.fi-power:before {\n  content: \"\\F19B\";\n}\n\n.fi-previous:before {\n  content: \"\\F19C\";\n}\n\n.fi-price-tag:before {\n  content: \"\\F19D\";\n}\n\n.fi-pricetag-multiple:before {\n  content: \"\\F19E\";\n}\n\n.fi-print:before {\n  content: \"\\F19F\";\n}\n\n.fi-prohibited:before {\n  content: \"\\F1A0\";\n}\n\n.fi-projection-screen:before {\n  content: \"\\F1A1\";\n}\n\n.fi-puzzle:before {\n  content: \"\\F1A2\";\n}\n\n.fi-quote:before {\n  content: \"\\F1A3\";\n}\n\n.fi-record:before {\n  content: \"\\F1A4\";\n}\n\n.fi-refresh:before {\n  content: \"\\F1A5\";\n}\n\n.fi-results-demographics:before {\n  content: \"\\F1A6\";\n}\n\n.fi-results:before {\n  content: \"\\F1A7\";\n}\n\n.fi-rewind-ten:before {\n  content: \"\\F1A8\";\n}\n\n.fi-rewind:before {\n  content: \"\\F1A9\";\n}\n\n.fi-rss:before {\n  content: \"\\F1AA\";\n}\n\n.fi-safety-cone:before {\n  content: \"\\F1AB\";\n}\n\n.fi-save:before {\n  content: \"\\F1AC\";\n}\n\n.fi-share:before {\n  content: \"\\F1AD\";\n}\n\n.fi-sheriff-badge:before {\n  content: \"\\F1AE\";\n}\n\n.fi-shield:before {\n  content: \"\\F1AF\";\n}\n\n.fi-shopping-bag:before {\n  content: \"\\F1B0\";\n}\n\n.fi-shopping-cart:before {\n  content: \"\\F1B1\";\n}\n\n.fi-shuffle:before {\n  content: \"\\F1B2\";\n}\n\n.fi-skull:before {\n  content: \"\\F1B3\";\n}\n\n.fi-social-500px:before {\n  content: \"\\F1B4\";\n}\n\n.fi-social-adobe:before {\n  content: \"\\F1B5\";\n}\n\n.fi-social-amazon:before {\n  content: \"\\F1B6\";\n}\n\n.fi-social-android:before {\n  content: \"\\F1B7\";\n}\n\n.fi-social-apple:before {\n  content: \"\\F1B8\";\n}\n\n.fi-social-behance:before {\n  content: \"\\F1B9\";\n}\n\n.fi-social-bing:before {\n  content: \"\\F1BA\";\n}\n\n.fi-social-blogger:before {\n  content: \"\\F1BB\";\n}\n\n.fi-social-delicious:before {\n  content: \"\\F1BC\";\n}\n\n.fi-social-designer-news:before {\n  content: \"\\F1BD\";\n}\n\n.fi-social-deviant-art:before {\n  content: \"\\F1BE\";\n}\n\n.fi-social-digg:before {\n  content: \"\\F1BF\";\n}\n\n.fi-social-dribbble:before {\n  content: \"\\F1C0\";\n}\n\n.fi-social-drive:before {\n  content: \"\\F1C1\";\n}\n\n.fi-social-dropbox:before {\n  content: \"\\F1C2\";\n}\n\n.fi-social-evernote:before {\n  content: \"\\F1C3\";\n}\n\n.fi-social-facebook:before {\n  content: \"\\F1C4\";\n}\n\n.fi-social-flickr:before {\n  content: \"\\F1C5\";\n}\n\n.fi-social-forrst:before {\n  content: \"\\F1C6\";\n}\n\n.fi-social-foursquare:before {\n  content: \"\\F1C7\";\n}\n\n.fi-social-game-center:before {\n  content: \"\\F1C8\";\n}\n\n.fi-social-github:before {\n  content: \"\\F1C9\";\n}\n\n.fi-social-google-plus:before {\n  content: \"\\F1CA\";\n}\n\n.fi-social-hacker-news:before {\n  content: \"\\F1CB\";\n}\n\n.fi-social-hi5:before {\n  content: \"\\F1CC\";\n}\n\n.fi-social-instagram:before {\n  content: \"\\F1CD\";\n}\n\n.fi-social-joomla:before {\n  content: \"\\F1CE\";\n}\n\n.fi-social-lastfm:before {\n  content: \"\\F1CF\";\n}\n\n.fi-social-linkedin:before {\n  content: \"\\F1D0\";\n}\n\n.fi-social-medium:before {\n  content: \"\\F1D1\";\n}\n\n.fi-social-myspace:before {\n  content: \"\\F1D2\";\n}\n\n.fi-social-orkut:before {\n  content: \"\\F1D3\";\n}\n\n.fi-social-path:before {\n  content: \"\\F1D4\";\n}\n\n.fi-social-picasa:before {\n  content: \"\\F1D5\";\n}\n\n.fi-social-pinterest:before {\n  content: \"\\F1D6\";\n}\n\n.fi-social-rdio:before {\n  content: \"\\F1D7\";\n}\n\n.fi-social-reddit:before {\n  content: \"\\F1D8\";\n}\n\n.fi-social-skillshare:before {\n  content: \"\\F1D9\";\n}\n\n.fi-social-skype:before {\n  content: \"\\F1DA\";\n}\n\n.fi-social-smashing-mag:before {\n  content: \"\\F1DB\";\n}\n\n.fi-social-snapchat:before {\n  content: \"\\F1DC\";\n}\n\n.fi-social-spotify:before {\n  content: \"\\F1DD\";\n}\n\n.fi-social-squidoo:before {\n  content: \"\\F1DE\";\n}\n\n.fi-social-stack-overflow:before {\n  content: \"\\F1DF\";\n}\n\n.fi-social-steam:before {\n  content: \"\\F1E0\";\n}\n\n.fi-social-stumbleupon:before {\n  content: \"\\F1E1\";\n}\n\n.fi-social-treehouse:before {\n  content: \"\\F1E2\";\n}\n\n.fi-social-tumblr:before {\n  content: \"\\F1E3\";\n}\n\n.fi-social-twitter:before {\n  content: \"\\F1E4\";\n}\n\n.fi-social-vimeo:before {\n  content: \"\\F1E5\";\n}\n\n.fi-social-windows:before {\n  content: \"\\F1E6\";\n}\n\n.fi-social-xbox:before {\n  content: \"\\F1E7\";\n}\n\n.fi-social-yahoo:before {\n  content: \"\\F1E8\";\n}\n\n.fi-social-yelp:before {\n  content: \"\\F1E9\";\n}\n\n.fi-social-youtube:before {\n  content: \"\\F1EA\";\n}\n\n.fi-social-zerply:before {\n  content: \"\\F1EB\";\n}\n\n.fi-social-zurb:before {\n  content: \"\\F1EC\";\n}\n\n.fi-sound:before {\n  content: \"\\F1ED\";\n}\n\n.fi-star:before {\n  content: \"\\F1EE\";\n}\n\n.fi-stop:before {\n  content: \"\\F1EF\";\n}\n\n.fi-strikethrough:before {\n  content: \"\\F1F0\";\n}\n\n.fi-subscript:before {\n  content: \"\\F1F1\";\n}\n\n.fi-superscript:before {\n  content: \"\\F1F2\";\n}\n\n.fi-tablet-landscape:before {\n  content: \"\\F1F3\";\n}\n\n.fi-tablet-portrait:before {\n  content: \"\\F1F4\";\n}\n\n.fi-target-two:before {\n  content: \"\\F1F5\";\n}\n\n.fi-target:before {\n  content: \"\\F1F6\";\n}\n\n.fi-telephone-accessible:before {\n  content: \"\\F1F7\";\n}\n\n.fi-telephone:before {\n  content: \"\\F1F8\";\n}\n\n.fi-text-color:before {\n  content: \"\\F1F9\";\n}\n\n.fi-thumbnails:before {\n  content: \"\\F1FA\";\n}\n\n.fi-ticket:before {\n  content: \"\\F1FB\";\n}\n\n.fi-torso-business:before {\n  content: \"\\F1FC\";\n}\n\n.fi-torso-female:before {\n  content: \"\\F1FD\";\n}\n\n.fi-torso:before {\n  content: \"\\F1FE\";\n}\n\n.fi-torsos-all-female:before {\n  content: \"\\F1FF\";\n}\n\n.fi-torsos-all:before {\n  content: \"\\F200\";\n}\n\n.fi-torsos-female-male:before {\n  content: \"\\F201\";\n}\n\n.fi-torsos-male-female:before {\n  content: \"\\F202\";\n}\n\n.fi-torsos:before {\n  content: \"\\F203\";\n}\n\n.fi-trash:before {\n  content: \"\\F204\";\n}\n\n.fi-trees:before {\n  content: \"\\F205\";\n}\n\n.fi-trophy:before {\n  content: \"\\F206\";\n}\n\n.fi-underline:before {\n  content: \"\\F207\";\n}\n\n.fi-universal-access:before {\n  content: \"\\F208\";\n}\n\n.fi-unlink:before {\n  content: \"\\F209\";\n}\n\n.fi-unlock:before {\n  content: \"\\F20A\";\n}\n\n.fi-upload-cloud:before {\n  content: \"\\F20B\";\n}\n\n.fi-upload:before {\n  content: \"\\F20C\";\n}\n\n.fi-usb:before {\n  content: \"\\F20D\";\n}\n\n.fi-video:before {\n  content: \"\\F20E\";\n}\n\n.fi-volume-none:before {\n  content: \"\\F20F\";\n}\n\n.fi-volume-strike:before {\n  content: \"\\F210\";\n}\n\n.fi-volume:before {\n  content: \"\\F211\";\n}\n\n.fi-web:before {\n  content: \"\\F212\";\n}\n\n.fi-wheelchair:before {\n  content: \"\\F213\";\n}\n\n.fi-widget:before {\n  content: \"\\F214\";\n}\n\n.fi-wrench:before {\n  content: \"\\F215\";\n}\n\n.fi-x-circle:before {\n  content: \"\\F216\";\n}\n\n.fi-x:before {\n  content: \"\\F217\";\n}\n\n.fi-yen:before {\n  content: \"\\F218\";\n}\n\n.fi-zoom-in:before {\n  content: \"\\F219\";\n}\n\n.fi-zoom-out:before {\n  content: \"\\F21A\";\n}\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n   * 1. Set default font family to sans-serif.\n   * 2. Prevent iOS and IE text size adjust after device orientation change,\n   *    without disabling user zoom.\n   */\n\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/**\n   * Remove default margin.\n   */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n     ========================================================================== */\n\n/**\n   * Correct `block` display not defined for any HTML5 element in IE 8/9.\n   * Correct `block` display not defined for `details` or `summary` in IE 10/11\n   * and Firefox.\n   * Correct `block` display not defined for `main` in IE 11.\n   */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n   * 1. Correct `inline-block` display not defined in IE 8/9.\n   * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n   */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n   * Prevent modern browsers from displaying `audio` without controls.\n   * Remove excess height in iOS 5 devices.\n   */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n   * Address `[hidden]` styling not present in IE 8/9/10.\n   * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n   */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n     ========================================================================== */\n\n/**\n   * Remove the gray background color from active links in IE 10.\n   */\n\na {\n  background-color: transparent;\n}\n\n/**\n   * Improve readability of focused elements when they are also in an\n   * active/hover state.\n   */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n     ========================================================================== */\n\n/**\n   * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n   */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n   * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n   */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n   * Address styling not present in Safari and Chrome.\n   */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n   * Address variable `h1` font-size and margin within `section` and `article`\n   * contexts in Firefox 4+, Safari, and Chrome.\n   */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n   * Address styling not present in IE 8/9.\n   */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n   * Address inconsistent and variable font size in all browsers.\n   */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n   * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n   */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n     ========================================================================== */\n\n/**\n   * Remove border when inside `a` element in IE 8/9/10.\n   */\n\nimg {\n  border: 0;\n}\n\n/**\n   * Correct overflow not hidden in IE 9/10/11.\n   */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n     ========================================================================== */\n\n/**\n   * Address margin not present in IE 8/9 and Safari.\n   */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n   * Address differences between Firefox and other browsers.\n   */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n   * Contain overflow in all browsers.\n   */\n\npre {\n  overflow: auto;\n}\n\n/**\n   * Address odd `em`-unit font size rendering in all browsers.\n   */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n     ========================================================================== */\n\n/**\n   * Known limitation: by default, Chrome and Safari on OS X allow very limited\n   * styling of `select`, unless a `border` property is set.\n   */\n\n/**\n   * 1. Correct color not being inherited.\n   *    Known issue: affects color of disabled elements.\n   * 2. Correct font properties not being inherited.\n   * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n   */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\n\n/**\n   * Address `overflow` set to `hidden` in IE 8/9/10/11.\n   */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n   * Address inconsistent `text-transform` inheritance for `button` and `select`.\n   * All other form control elements do not inherit `text-transform` values.\n   * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n   * Correct `select` style inheritance in Firefox.\n   */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n   * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n   *    and `video` controls.\n   * 2. Correct inability to style clickable `input` types in iOS.\n   * 3. Improve usability and consistency of cursor style between image-type\n   *    `input` and others.\n   */\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\n\n/**\n   * Re-set default cursor for disabled elements.\n   */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n   * Remove inner padding and border in Firefox 4+.\n   */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n   * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n   * the UA stylesheet.\n   */\n\ninput {\n  line-height: normal;\n}\n\n/**\n   * It's recommended that you don't attempt to style these elements.\n   * Firefox's implementation doesn't respect box-sizing, padding, or width.\n   *\n   * 1. Address box sizing set to `content-box` in IE 8/9/10.\n   * 2. Remove excess padding in IE 8/9/10.\n   */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n   * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n   * `font-size` values of the `input`, it causes the cursor style of the\n   * decrement button to change from `default` to `text`.\n   */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n   * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n   * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n   */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  box-sizing: content-box;\n  /* 2 */\n}\n\n/**\n   * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n   * Safari (but not Chrome) clips the cancel button when the search input has\n   * padding (and `textfield` appearance).\n   */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n   * Define consistent border, margin, and padding.\n   */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n   * 1. Correct `color` not being inherited in IE 8/9/10/11.\n   * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n   */\n\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n   * Remove default vertical scrollbar in IE 8/9/10/11.\n   */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n   * Don't inherit the `font-weight` (applied by a rule above).\n   * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n   */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n     ========================================================================== */\n\n/**\n   * Remove most spacing between table cells.\n   */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n.foundation-mq {\n  font-family: \"small=0em&medium=40em&large=64em&xlarge=75em&xxlarge=90em\";\n}\n\nhtml {\n  font-size: 100%;\n  box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  font-family: \"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #0a0a0a;\n  background: #fefefe;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n  -ms-interpolation-mode: bicubic;\n  display: inline-block;\n  vertical-align: middle;\n}\n\ntextarea {\n  height: auto;\n  min-height: 50px;\n  border-radius: 0;\n}\n\nselect {\n  width: 100%;\n  border-radius: 0;\n}\n\n#map_canvas img,\n#map_canvas embed,\n#map_canvas object,\n.map_canvas img,\n.map_canvas embed,\n.map_canvas object,\n.mqa-display img,\n.mqa-display embed,\n.mqa-display object {\n  max-width: none !important;\n}\n\nbutton {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  background: transparent;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  line-height: 1;\n}\n\n.row {\n  max-width: 75rem;\n  margin-left: auto;\n  margin-right: auto;\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.row .row,\n.column-row .row {\n  margin-left: -0.625rem;\n  margin-right: -0.625rem;\n}\n\n@media screen and (min-width: 40em) {\n  .row .row,\n  .column-row .row {\n    margin-left: -0.9375rem;\n    margin-right: -0.9375rem;\n  }\n}\n\n.row.expanded {\n  max-width: none;\n}\n\n.row.collapse > .column,\n.row.collapse > .columns {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.column,\n.columns {\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n  flex: 1 1 0px;\n}\n\n@media screen and (min-width: 40em) {\n  .column,\n  .columns {\n    padding-left: 0.9375rem;\n    padding-right: 0.9375rem;\n  }\n}\n\n.small-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%;\n}\n\n.small-offset-0 {\n  margin-left: 0%;\n}\n\n.small-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%;\n}\n\n.small-offset-1 {\n  margin-left: 8.33333%;\n}\n\n.small-3 {\n  flex: 0 0 25%;\n  max-width: 25%;\n}\n\n.small-offset-2 {\n  margin-left: 16.66667%;\n}\n\n.small-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%;\n}\n\n.small-offset-3 {\n  margin-left: 25%;\n}\n\n.small-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%;\n}\n\n.small-offset-4 {\n  margin-left: 33.33333%;\n}\n\n.small-6 {\n  flex: 0 0 50%;\n  max-width: 50%;\n}\n\n.small-offset-5 {\n  margin-left: 41.66667%;\n}\n\n.small-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%;\n}\n\n.small-offset-6 {\n  margin-left: 50%;\n}\n\n.small-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%;\n}\n\n.small-offset-7 {\n  margin-left: 58.33333%;\n}\n\n.small-9 {\n  flex: 0 0 75%;\n  max-width: 75%;\n}\n\n.small-offset-8 {\n  margin-left: 66.66667%;\n}\n\n.small-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%;\n}\n\n.small-offset-9 {\n  margin-left: 75%;\n}\n\n.small-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%;\n}\n\n.small-offset-10 {\n  margin-left: 83.33333%;\n}\n\n.small-12 {\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n\n.small-offset-11 {\n  margin-left: 91.66667%;\n}\n\n.small-order-1 {\n  order: 1;\n}\n\n.small-order-2 {\n  order: 2;\n}\n\n.small-order-3 {\n  order: 3;\n}\n\n.small-order-4 {\n  order: 4;\n}\n\n.small-order-5 {\n  order: 5;\n}\n\n.small-order-6 {\n  order: 6;\n}\n\n.small-collapse > .column,\n.small-collapse > .columns {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.small-uncollapse > .column,\n.small-uncollapse > .columns {\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n}\n\n@media screen and (min-width: 40em) {\n  .medium-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .medium-offset-0 {\n    margin-left: 0%;\n  }\n\n  .medium-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .medium-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .medium-3 {\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n\n  .medium-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .medium-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .medium-offset-3 {\n    margin-left: 25%;\n  }\n\n  .medium-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .medium-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .medium-6 {\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n\n  .medium-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .medium-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .medium-offset-6 {\n    margin-left: 50%;\n  }\n\n  .medium-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .medium-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .medium-9 {\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n\n  .medium-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .medium-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .medium-offset-9 {\n    margin-left: 75%;\n  }\n\n  .medium-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .medium-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .medium-12 {\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n\n  .medium-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .medium-order-1 {\n    order: 1;\n  }\n\n  .medium-order-2 {\n    order: 2;\n  }\n\n  .medium-order-3 {\n    order: 3;\n  }\n\n  .medium-order-4 {\n    order: 4;\n  }\n\n  .medium-order-5 {\n    order: 5;\n  }\n\n  .medium-order-6 {\n    order: 6;\n  }\n}\n\n@media screen and (min-width: 40em) and (min-width: 40em) {\n  .medium-expand {\n    flex: 1 1 0px;\n  }\n}\n\n.row.medium-unstack .column,\n.row.medium-unstack .columns {\n  flex: 0 0 100%;\n}\n\n@media screen and (min-width: 40em) {\n  .row.medium-unstack .column,\n  .row.medium-unstack .columns {\n    flex: 1 1 0px;\n  }\n}\n\n@media screen and (min-width: 40em) {\n  .medium-collapse > .column,\n  .medium-collapse > .columns {\n    padding-left: 0;\n    padding-right: 0;\n  }\n\n  .medium-uncollapse > .column,\n  .medium-uncollapse > .columns {\n    padding-left: 0.9375rem;\n    padding-right: 0.9375rem;\n  }\n}\n\n@media screen and (min-width: 64em) {\n  .large-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .large-offset-0 {\n    margin-left: 0%;\n  }\n\n  .large-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .large-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .large-3 {\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n\n  .large-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .large-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .large-offset-3 {\n    margin-left: 25%;\n  }\n\n  .large-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .large-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .large-6 {\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n\n  .large-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .large-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .large-offset-6 {\n    margin-left: 50%;\n  }\n\n  .large-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .large-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .large-9 {\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n\n  .large-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .large-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .large-offset-9 {\n    margin-left: 75%;\n  }\n\n  .large-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .large-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .large-12 {\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n\n  .large-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .large-order-1 {\n    order: 1;\n  }\n\n  .large-order-2 {\n    order: 2;\n  }\n\n  .large-order-3 {\n    order: 3;\n  }\n\n  .large-order-4 {\n    order: 4;\n  }\n\n  .large-order-5 {\n    order: 5;\n  }\n\n  .large-order-6 {\n    order: 6;\n  }\n}\n\n@media screen and (min-width: 64em) and (min-width: 64em) {\n  .large-expand {\n    flex: 1 1 0px;\n  }\n}\n\n.row.large-unstack .column,\n.row.large-unstack .columns {\n  flex: 0 0 100%;\n}\n\n@media screen and (min-width: 64em) {\n  .row.large-unstack .column,\n  .row.large-unstack .columns {\n    flex: 1 1 0px;\n  }\n}\n\n@media screen and (min-width: 64em) {\n  .large-collapse > .column,\n  .large-collapse > .columns {\n    padding-left: 0;\n    padding-right: 0;\n  }\n\n  .large-uncollapse > .column,\n  .large-uncollapse > .columns {\n    padding-left: 0.9375rem;\n    padding-right: 0.9375rem;\n  }\n}\n\n.shrink {\n  flex: 0 0 auto;\n}\n\n.row.align-right {\n  justify-content: flex-end;\n}\n\n.row.align-center {\n  justify-content: center;\n}\n\n.row.align-justify {\n  justify-content: space-between;\n}\n\n.row.align-spaced {\n  justify-content: space-around;\n}\n\n.row.align-top {\n  align-items: flex-start;\n}\n\n.column.align-top,\n.align-top.columns {\n  align-self: flex-start;\n}\n\n.row.align-bottom {\n  align-items: flex-end;\n}\n\n.column.align-bottom,\n.align-bottom.columns {\n  align-self: flex-end;\n}\n\n.row.align-middle {\n  align-items: center;\n}\n\n.column.align-middle,\n.align-middle.columns {\n  align-self: center;\n}\n\n.row.align-stretch {\n  align-items: stretch;\n}\n\n.column.align-stretch,\n.align-stretch.columns {\n  align-self: stretch;\n}\n\ndiv,\ndl,\ndt,\ndd,\nul,\nol,\nli,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\npre,\nform,\np,\nblockquote,\nth,\ntd {\n  margin: 0;\n  padding: 0;\n}\n\np {\n  font-size: inherit;\n  line-height: 1.6;\n  margin-bottom: 1rem;\n  text-rendering: optimizeLegibility;\n}\n\nem,\ni {\n  font-style: italic;\n  line-height: inherit;\n}\n\nstrong,\nb {\n  font-weight: bold;\n  line-height: inherit;\n}\n\nsmall {\n  font-size: 80%;\n  line-height: inherit;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: \"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif;\n  font-weight: normal;\n  font-style: normal;\n  color: inherit;\n  text-rendering: optimizeLegibility;\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  line-height: 1.4;\n}\n\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small {\n  color: #cacaca;\n  line-height: 0;\n}\n\nh1 {\n  font-size: 1.5rem;\n}\n\nh2 {\n  font-size: 1.25rem;\n}\n\nh3 {\n  font-size: 1.1875rem;\n}\n\nh4 {\n  font-size: 1.125rem;\n}\n\nh5 {\n  font-size: 1.0625rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n@media screen and (min-width: 40em) {\n  h1 {\n    font-size: 3rem;\n  }\n\n  h2 {\n    font-size: 2.5rem;\n  }\n\n  h3 {\n    font-size: 1.9375rem;\n  }\n\n  h4 {\n    font-size: 1.5625rem;\n  }\n\n  h5 {\n    font-size: 1.25rem;\n  }\n\n  h6 {\n    font-size: 1rem;\n  }\n}\n\na {\n  color: #2199e8;\n  text-decoration: none;\n  line-height: inherit;\n  cursor: pointer;\n}\n\na:hover,\na:focus {\n  color: #1585cf;\n}\n\na img {\n  border: 0;\n}\n\nhr {\n  max-width: 75rem;\n  height: 0;\n  border-right: 0;\n  border-top: 0;\n  border-bottom: 1px solid #cacaca;\n  border-left: 0;\n  margin: 1.25rem auto;\n  clear: both;\n}\n\nul,\nol,\ndl {\n  line-height: 1.6;\n  margin-bottom: 1rem;\n  list-style-position: outside;\n}\n\nli {\n  font-size: inherit;\n}\n\nul {\n  list-style-type: disc;\n  margin-left: 1.25rem;\n}\n\nol {\n  margin-left: 1.25rem;\n}\n\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-left: 1.25rem;\n  margin-bottom: 0;\n}\n\ndl {\n  margin-bottom: 1rem;\n}\n\ndl dt {\n  margin-bottom: 0.3rem;\n  font-weight: bold;\n}\n\nblockquote {\n  margin: 0 0 1rem;\n  padding: 0.5625rem 1.25rem 0 1.1875rem;\n  border-left: 1px solid #cacaca;\n}\n\nblockquote,\nblockquote p {\n  line-height: 1.6;\n  color: #8a8a8a;\n}\n\ncite {\n  display: block;\n  font-size: 0.8125rem;\n  color: #8a8a8a;\n}\n\ncite:before {\n  content: '\\2014    ';\n}\n\nabbr {\n  color: #0a0a0a;\n  cursor: help;\n  border-bottom: 1px dotted #0a0a0a;\n}\n\ncode {\n  font-family: Consolas, \"Liberation Mono\", Courier, monospace;\n  font-weight: normal;\n  color: #0a0a0a;\n  background-color: #e6e6e6;\n  border: 1px solid #cacaca;\n  padding: 0.125rem 0.3125rem 0.0625rem;\n}\n\nkbd {\n  padding: 0.125rem 0.25rem 0;\n  margin: 0;\n  background-color: #e6e6e6;\n  color: #0a0a0a;\n  font-family: Consolas, \"Liberation Mono\", Courier, monospace;\n}\n\n.subheader {\n  margin-top: 0.2rem;\n  margin-bottom: 0.5rem;\n  font-weight: normal;\n  line-height: 1.4;\n  color: #8a8a8a;\n}\n\n.lead {\n  font-size: 125%;\n  line-height: 1.6;\n}\n\n.stat {\n  font-size: 2.5rem;\n  line-height: 1;\n}\n\np + .stat {\n  margin-top: -1rem;\n}\n\n.no-bullet {\n  margin-left: 0;\n  list-style: none;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n@media screen and (min-width: 40em) {\n  .medium-text-left {\n    text-align: left;\n  }\n\n  .medium-text-right {\n    text-align: right;\n  }\n\n  .medium-text-center {\n    text-align: center;\n  }\n\n  .medium-text-justify {\n    text-align: justify;\n  }\n}\n\n@media screen and (min-width: 64em) {\n  .large-text-left {\n    text-align: left;\n  }\n\n  .large-text-right {\n    text-align: right;\n  }\n\n  .large-text-center {\n    text-align: center;\n  }\n\n  .large-text-justify {\n    text-align: justify;\n  }\n}\n\n.show-for-print {\n  display: none !important;\n}\n\n@media print {\n  * {\n    background: transparent !important;\n    color: black !important;\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  .show-for-print {\n    display: block !important;\n  }\n\n  .hide-for-print {\n    display: none !important;\n  }\n\n  table.show-for-print {\n    display: table !important;\n  }\n\n  thead.show-for-print {\n    display: table-header-group !important;\n  }\n\n  tbody.show-for-print {\n    display: table-row-group !important;\n  }\n\n  tr.show-for-print {\n    display: table-row !important;\n  }\n\n  td.show-for-print {\n    display: table-cell !important;\n  }\n\n  th.show-for-print {\n    display: table-cell !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  .ir a:after,\n  a[href^='javascript:']:after,\n  a[href^='#']:after {\n    content: '';\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n@page {\n    margin: 0.5cm;\n}\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n\n.button {\n  display: inline-block;\n  text-align: center;\n  line-height: 1;\n  cursor: pointer;\n  -webkit-appearance: none;\n  transition: background-color 0.25s ease-out, color 0.25s ease-out;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  border-radius: 0;\n  padding: 0.85em 1em;\n  margin: 0 0 1rem 0;\n  font-size: 0.9rem;\n  background-color: #2199e8;\n  color: #fff;\n}\n\n[data-whatinput='mouse'] .button {\n  outline: 0;\n}\n\n.button:hover,\n.button:focus {\n  background-color: #1583cc;\n  color: #fff;\n}\n\n.button.tiny {\n  font-size: 0.6rem;\n}\n\n.button.small {\n  font-size: 0.75rem;\n}\n\n.button.large {\n  font-size: 1.25rem;\n}\n\n.button.expanded {\n  display: block;\n  width: 100%;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.button.primary {\n  background-color: #2199e8;\n  color: #fff;\n}\n\n.button.primary:hover,\n.button.primary:focus {\n  background-color: #147cc0;\n  color: #fff;\n}\n\n.button.secondary {\n  background-color: #777;\n  color: #fff;\n}\n\n.button.secondary:hover,\n.button.secondary:focus {\n  background-color: #5f5f5f;\n  color: #fff;\n}\n\n.button.success {\n  background-color: #3adb76;\n  color: #fff;\n}\n\n.button.success:hover,\n.button.success:focus {\n  background-color: #22bb5b;\n  color: #fff;\n}\n\n.button.alert {\n  background-color: #ec5840;\n  color: #fff;\n}\n\n.button.alert:hover,\n.button.alert:focus {\n  background-color: #da3116;\n  color: #fff;\n}\n\n.button.warning {\n  background-color: #ffae00;\n  color: #fff;\n}\n\n.button.warning:hover,\n.button.warning:focus {\n  background-color: #cc8b00;\n  color: #fff;\n}\n\n.button.hollow {\n  border: 1px solid #2199e8;\n  color: #2199e8;\n}\n\n.button.hollow,\n.button.hollow:hover,\n.button.hollow:focus {\n  background-color: transparent;\n}\n\n.button.hollow:hover,\n.button.hollow:focus {\n  border-color: #0c4d78;\n  color: #0c4d78;\n}\n\n.button.hollow.primary {\n  border: 1px solid #2199e8;\n  color: #2199e8;\n}\n\n.button.hollow.primary:hover,\n.button.hollow.primary:focus {\n  border-color: #0c4d78;\n  color: #0c4d78;\n}\n\n.button.hollow.secondary {\n  border: 1px solid #777;\n  color: #777;\n}\n\n.button.hollow.secondary:hover,\n.button.hollow.secondary:focus {\n  border-color: #3c3c3c;\n  color: #3c3c3c;\n}\n\n.button.hollow.success {\n  border: 1px solid #3adb76;\n  color: #3adb76;\n}\n\n.button.hollow.success:hover,\n.button.hollow.success:focus {\n  border-color: #157539;\n  color: #157539;\n}\n\n.button.hollow.alert {\n  border: 1px solid #ec5840;\n  color: #ec5840;\n}\n\n.button.hollow.alert:hover,\n.button.hollow.alert:focus {\n  border-color: #881f0e;\n  color: #881f0e;\n}\n\n.button.hollow.warning {\n  border: 1px solid #ffae00;\n  color: #ffae00;\n}\n\n.button.hollow.warning:hover,\n.button.hollow.warning:focus {\n  border-color: #805700;\n  color: #805700;\n}\n\n.button.disabled,\n.button[disabled] {\n  opacity: 0.25;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.button.dropdown::after {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 0.4em;\n  border-color: #fefefe transparent transparent;\n  border-top-style: solid;\n  position: relative;\n  top: 0.4em;\n  float: right;\n  margin-left: 1em;\n  display: inline-block;\n}\n\n.button.arrow-only::after {\n  margin-left: 0;\n  float: none;\n  top: 0.2em;\n}\n\n[type='text'],\n[type='password'],\n[type='date'],\n[type='datetime'],\n[type='datetime-local'],\n[type='month'],\n[type='week'],\n[type='email'],\n[type='number'],\n[type='search'],\n[type='tel'],\n[type='time'],\n[type='url'],\n[type='color'],\ntextarea {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  height: 2.4375rem;\n  padding: 0.5rem;\n  border: 1px solid #cacaca;\n  margin: 0 0 1rem;\n  font-family: inherit;\n  font-size: 1rem;\n  color: #0a0a0a;\n  background-color: #fefefe;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  border-radius: 0;\n  transition: box-shadow 0.5s, border-color 0.25s ease-in-out;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n\n[type='text']:focus,\n[type='password']:focus,\n[type='date']:focus,\n[type='datetime']:focus,\n[type='datetime-local']:focus,\n[type='month']:focus,\n[type='week']:focus,\n[type='email']:focus,\n[type='number']:focus,\n[type='search']:focus,\n[type='tel']:focus,\n[type='time']:focus,\n[type='url']:focus,\n[type='color']:focus,\ntextarea:focus {\n  border: 1px solid #8a8a8a;\n  background-color: #fefefe;\n  outline: none;\n  box-shadow: 0 0 5px #cacaca;\n  transition: box-shadow 0.5s, border-color 0.25s ease-in-out;\n}\n\ntextarea {\n  max-width: 100%;\n}\n\ntextarea[rows] {\n  height: auto;\n}\n\ninput:disabled,\ninput[readonly],\ntextarea:disabled,\ntextarea[readonly] {\n  background-color: #e6e6e6;\n  cursor: default;\n}\n\n[type='submit'],\n[type='button'] {\n  border-radius: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n\ninput[type='search'] {\n  box-sizing: border-box;\n}\n\n[type='file'],\n[type='checkbox'],\n[type='radio'] {\n  margin: 0 0 1rem;\n}\n\n[type='checkbox'] + label,\n[type='radio'] + label {\n  display: inline-block;\n  margin-left: 0.5rem;\n  margin-right: 1rem;\n  margin-bottom: 0;\n  vertical-align: baseline;\n}\n\nlabel > [type='checkbox'],\nlabel > [type='label'] {\n  margin-right: 0.5rem;\n}\n\n[type='file'] {\n  width: 100%;\n}\n\nlabel {\n  display: block;\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: normal;\n  line-height: 1.8;\n  color: #0a0a0a;\n}\n\nlabel.middle {\n  margin: 0 0 1rem;\n  padding: 0.5625rem 0;\n}\n\n.help-text {\n  margin-top: -0.5rem;\n  font-size: 0.8125rem;\n  font-style: italic;\n  color: #333;\n}\n\n.input-group {\n  display: table;\n  width: 100%;\n  margin-bottom: 1rem;\n}\n\n.input-group > :first-child {\n  border-radius: 0 0 0 0;\n}\n\n.input-group > :last-child > * {\n  border-radius: 0 0 0 0;\n}\n\n.input-group-label,\n.input-group-field,\n.input-group-button {\n  display: table-cell;\n  margin: 0;\n  vertical-align: middle;\n}\n\n.input-group-label {\n  text-align: center;\n  width: 1%;\n  height: 100%;\n  padding: 0 1rem;\n  background: #e6e6e6;\n  color: #0a0a0a;\n  border: 1px solid #cacaca;\n}\n\n.input-group-label:first-child {\n  border-right: 0;\n}\n\n.input-group-label:last-child {\n  border-left: 0;\n}\n\n.input-group-field {\n  border-radius: 0;\n  height: 2.5rem;\n}\n\n.input-group-button {\n  height: 100%;\n  padding-top: 0;\n  padding-bottom: 0;\n  text-align: center;\n  width: 1%;\n}\n\n.input-group-button a,\n.input-group-button input,\n.input-group-button button {\n  margin: 0;\n}\n\nfieldset {\n  border: 0;\n  padding: 0;\n  margin: 0;\n}\n\nlegend {\n  margin-bottom: 0.5rem;\n}\n\n.fieldset {\n  border: 1px solid #cacaca;\n  padding: 1.25rem;\n  margin: 1.125rem 0;\n}\n\n.fieldset legend {\n  background: #fefefe;\n  padding: 0 0.1875rem;\n  margin: 0;\n  margin-left: -0.1875rem;\n}\n\nselect {\n  height: 2.4375rem;\n  padding: 0.5rem;\n  border: 1px solid #cacaca;\n  margin: 0 0 1rem;\n  font-size: 1rem;\n  font-family: inherit;\n  line-height: normal;\n  color: #0a0a0a;\n  background-color: #fefefe;\n  border-radius: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"32\" height=\"24\" viewBox=\"0 0 32 24\"><polygon points=\"0,0 32,0 16,24\" style=\"fill: rgb%2851, 51, 51%29\"></polygon></svg>');\n  background-size: 9px 6px;\n  background-position: right 0.5rem center;\n  background-repeat: no-repeat;\n}\n\n@media screen and (min-width: 0\\0) {\n  select {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIpJREFUeNrEkckNgDAMBBfRkEt0ObRBBdsGXUDgmQfK4XhH2m8czQAAy27R3tsw4Qfe2x8uOO6oYLb6GlOor3GF+swURAOmUJ+RwtEJs9WvTGEYxBXqI1MQAZhCfUQKRzDMVj+TwrAIV6jvSUEkYAr1LSkcyTBb/V+KYfX7xAeusq3sLDtGH3kEGACPWIflNZfhRQAAAABJRU5ErkJggg==\");\n  }\n}\n\nselect:disabled {\n  background-color: #e6e6e6;\n  cursor: default;\n}\n\nselect::-ms-expand {\n  display: none;\n}\n\nselect[multiple] {\n  height: auto;\n}\n\n.is-invalid-input:not(:focus) {\n  background-color: rgba(236, 88, 64, 0.1);\n  border-color: #ec5840;\n}\n\n.is-invalid-label {\n  color: #ec5840;\n}\n\n.form-error {\n  display: none;\n  margin-top: -0.5rem;\n  margin-bottom: 1rem;\n  font-size: 0.75rem;\n  font-weight: bold;\n  color: #ec5840;\n}\n\n.form-error.is-visible {\n  display: block;\n}\n\n.hide {\n  display: none !important;\n}\n\n.invisible {\n  visibility: hidden;\n}\n\n@media screen and (min-width: 0em) and (max-width: 39.9375em) {\n  .hide-for-small-only {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 0em), screen and (min-width: 40em) {\n  .show-for-small-only {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 40em) {\n  .hide-for-medium {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 39.9375em) {\n  .show-for-medium {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 40em) and (max-width: 63.9375em) {\n  .hide-for-medium-only {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 39.9375em), screen and (min-width: 64em) {\n  .show-for-medium-only {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 64em) {\n  .hide-for-large {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 63.9375em) {\n  .show-for-large {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 64em) and (max-width: 74.9375em) {\n  .hide-for-large-only {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 63.9375em), screen and (min-width: 75em) {\n  .show-for-large-only {\n    display: none !important;\n  }\n}\n\n.show-for-sr,\n.show-on-focus {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n}\n\n.show-on-focus:active,\n.show-on-focus:focus {\n  position: static !important;\n  height: auto;\n  width: auto;\n  overflow: visible;\n  clip: auto;\n}\n\n.show-for-landscape,\n.hide-for-portrait {\n  display: block !important;\n}\n\n@media screen and (orientation: landscape) {\n  .show-for-landscape,\n  .hide-for-portrait {\n    display: block !important;\n  }\n}\n\n@media screen and (orientation: portrait) {\n  .show-for-landscape,\n  .hide-for-portrait {\n    display: none !important;\n  }\n}\n\n.hide-for-landscape,\n.show-for-portrait {\n  display: none !important;\n}\n\n@media screen and (orientation: landscape) {\n  .hide-for-landscape,\n  .show-for-portrait {\n    display: none !important;\n  }\n}\n\n@media screen and (orientation: portrait) {\n  .hide-for-landscape,\n  .show-for-portrait {\n    display: block !important;\n  }\n}\n\n.float-left {\n  float: left !important;\n}\n\n.float-right {\n  float: right !important;\n}\n\n.float-center {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.clearfix::before,\n.clearfix::after {\n  content: ' ';\n  display: table;\n}\n\n.clearfix::after {\n  clear: both;\n}\n\n.badge {\n  display: inline-block;\n  padding: 0.3em;\n  min-width: 2.1em;\n  font-size: 0.6rem;\n  text-align: center;\n  border-radius: 50%;\n  background: #2199e8;\n  color: #fefefe;\n}\n\n.badge.secondary {\n  background: #777;\n  color: #fefefe;\n}\n\n.badge.success {\n  background: #3adb76;\n  color: #fefefe;\n}\n\n.badge.alert {\n  background: #ec5840;\n  color: #fefefe;\n}\n\n.badge.warning {\n  background: #ffae00;\n  color: #fefefe;\n}\n\n.dropdown-pane {\n  background-color: #fefefe;\n  border: 1px solid #cacaca;\n  display: block;\n  padding: 1rem;\n  position: absolute;\n  visibility: hidden;\n  width: 300px;\n  z-index: 10;\n  border-radius: 0;\n}\n\n.dropdown-pane.is-open {\n  visibility: visible;\n}\n\n.dropdown-pane.tiny {\n  width: 100px;\n}\n\n.dropdown-pane.small {\n  width: 200px;\n}\n\n.dropdown-pane.large {\n  width: 400px;\n}\n\n.label {\n  display: inline-block;\n  padding: 0.33333rem 0.5rem;\n  font-size: 0.8rem;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: default;\n  border-radius: 0;\n  background: #2199e8;\n  color: #fefefe;\n}\n\n.label.secondary {\n  background: #777;\n  color: #fefefe;\n}\n\n.label.success {\n  background: #3adb76;\n  color: #fefefe;\n}\n\n.label.alert {\n  background: #ec5840;\n  color: #fefefe;\n}\n\n.label.warning {\n  background: #ffae00;\n  color: #fefefe;\n}\n\n.menu {\n  margin: 0;\n  list-style-type: none;\n}\n\n.menu > li {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n[data-whatinput='mouse'] .menu > li {\n  outline: 0;\n}\n\n.menu > li:not(.menu-text) > a {\n  display: block;\n  padding: 0.7rem 1rem;\n  line-height: 1;\n}\n\n.menu input,\n.menu a,\n.menu button {\n  margin-bottom: 0;\n}\n\n.menu > li > a > img,\n.menu > li > a > i {\n  vertical-align: middle;\n}\n\n.menu > li > a > span {\n  vertical-align: middle;\n}\n\n.menu > li > a > img,\n.menu > li > a > i {\n  display: inline-block;\n  margin-right: 0.25rem;\n}\n\n.menu > li {\n  display: table-cell;\n}\n\n.menu.vertical > li {\n  display: block;\n}\n\n@media screen and (min-width: 40em) {\n  .menu.medium-horizontal > li {\n    display: table-cell;\n  }\n\n  .menu.medium-vertical > li {\n    display: block;\n  }\n}\n\n@media screen and (min-width: 64em) {\n  .menu.large-horizontal > li {\n    display: table-cell;\n  }\n\n  .menu.large-vertical > li {\n    display: block;\n  }\n}\n\n.menu.simple a {\n  padding: 0;\n  margin-right: 1rem;\n}\n\n.menu.align-right > li {\n  float: right;\n}\n\n.menu.expanded {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n\n.menu.expanded > li:first-child:last-child {\n  width: 100%;\n}\n\n.menu.icon-top > li > a {\n  text-align: center;\n}\n\n.menu.icon-top > li > a > img,\n.menu.icon-top > li > a > i {\n  display: block;\n  margin: 0 auto 0.25rem;\n}\n\n.menu.nested {\n  margin-left: 1rem;\n}\n\n.menu-text {\n  font-weight: bold;\n  color: inherit;\n  line-height: 1;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding: 0.7rem 1rem;\n}\n\n.no-js [data-responsive-menu] ul {\n  display: none;\n}\n\n.sticky-container {\n  position: relative;\n}\n\n.sticky {\n  position: absolute;\n  z-index: 0;\n  transform: translate3d(0, 0, 0);\n}\n\n.sticky.is-stuck {\n  position: fixed;\n  z-index: 5;\n}\n\n.sticky.is-stuck.is-at-top {\n  top: 0;\n}\n\n.sticky.is-stuck.is-at-bottom {\n  bottom: 0;\n}\n\n.sticky.is-anchored {\n  position: absolute;\n  left: auto;\n  right: auto;\n}\n\n.sticky.is-anchored.is-at-bottom {\n  bottom: 0;\n}\n\n.thumbnail {\n  border: solid 4px #fefefe;\n  box-shadow: 0 0 0 1px rgba(10, 10, 10, 0.2);\n  display: inline-block;\n  line-height: 0;\n  max-width: 100%;\n  transition: box-shadow 200ms ease-out;\n  border-radius: 0;\n  margin-bottom: 1rem;\n}\n\n.thumbnail:hover,\n.thumbnail:focus {\n  box-shadow: 0 0 6px 1px rgba(33, 153, 232, 0.5);\n}\n\n.title-bar {\n  background: #0a0a0a;\n  color: #fefefe;\n  padding: 0.5rem;\n}\n\n.title-bar::before,\n.title-bar::after {\n  content: ' ';\n  display: table;\n}\n\n.title-bar::after {\n  clear: both;\n}\n\n.title-bar .menu-icon {\n  margin-left: 0.25rem;\n  margin-right: 0.5rem;\n}\n\n.title-bar-left {\n  float: left;\n}\n\n.title-bar-right {\n  float: right;\n  text-align: right;\n}\n\n.title-bar-title {\n  font-weight: bold;\n  vertical-align: middle;\n  display: inline-block;\n}\n\n.menu-icon {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  cursor: pointer;\n  width: 20px;\n  height: 16px;\n}\n\n.menu-icon::after {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 2px;\n  background: #fefefe;\n  top: 0;\n  left: 0;\n  box-shadow: 0 7px 0 #fefefe, 0 14px 0 #fefefe;\n}\n\n.menu-icon:hover::after {\n  background: #cacaca;\n  box-shadow: 0 7px 0 #cacaca, 0 14px 0 #cacaca;\n}\n\n.has-tip {\n  border-bottom: dotted 1px #8a8a8a;\n  font-weight: bold;\n  position: relative;\n  display: inline-block;\n  cursor: help;\n}\n\n.tooltip {\n  background-color: #0a0a0a;\n  color: #fefefe;\n  font-size: 80%;\n  padding: 0.75rem;\n  position: absolute;\n  z-index: 10;\n  top: calc(100% + 0.6495rem);\n  max-width: 10rem !important;\n  border-radius: 0;\n}\n\n.tooltip::before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 0.75rem;\n  border-color: transparent transparent #0a0a0a;\n  border-bottom-style: solid;\n  bottom: 100%;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.tooltip.top::before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 0.75rem;\n  border-color: #0a0a0a transparent transparent;\n  border-top-style: solid;\n  top: 100%;\n  bottom: auto;\n}\n\n.tooltip.left::before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 0.75rem;\n  border-color: transparent transparent transparent #0a0a0a;\n  border-left-style: solid;\n  bottom: auto;\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.tooltip.right::before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 0.75rem;\n  border-color: transparent #0a0a0a transparent transparent;\n  border-right-style: solid;\n  bottom: auto;\n  left: auto;\n  right: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.top-bar {\n  padding: 0.5rem;\n}\n\n.top-bar::before,\n.top-bar::after {\n  content: ' ';\n  display: table;\n}\n\n.top-bar::after {\n  clear: both;\n}\n\n.top-bar,\n.top-bar ul {\n  background-color: #e6e6e6;\n}\n\n.top-bar a {\n  color: #2199e8;\n}\n\n.top-bar input {\n  width: 200px;\n  margin-right: 1rem;\n}\n\n.top-bar input.button {\n  width: auto;\n}\n\n@media screen and (max-width: 39.9375em) {\n  .stacked-for-small .top-bar-right {\n    width: 100%;\n  }\n\n  .stacked-for-small .top-bar-left {\n    width: 100%;\n  }\n}\n\n@media screen and (max-width: 63.9375em) {\n  .stacked-for-medium .top-bar-right {\n    width: 100%;\n  }\n\n  .stacked-for-medium .top-bar-left {\n    width: 100%;\n  }\n}\n\n@media screen and (max-width: 74.9375em) {\n  .stacked-for-large .top-bar-right {\n    width: 100%;\n  }\n\n  .stacked-for-large .top-bar-left {\n    width: 100%;\n  }\n}\n\n@media screen and (min-width: 0em) and (max-width: 39.9375em) {\n  .top-bar-right {\n    width: 100%;\n  }\n\n  .top-bar-left {\n    width: 100%;\n  }\n}\n\n.top-bar-left {\n  float: left;\n}\n\n.top-bar-right {\n  float: right;\n}\n\n.side-nav {\n  box-shadow: 0 1px 2px #aaa;\n  background: white;\n  border-radius: 3px;\n  overflow-y: scroll;\n  margin-left: 0px;\n  margin-top: 1vh;\n  padding: 10px 15px 5px 15px;\n}\n\n.side-nav .side-nav-header {\n  text-align: center;\n}\n\n.side-nav .side-nav-header #side-nav-logo {\n  text-align: center;\n  margin-bottom: 1vh;\n}\n\n.side-nav .menu .menu-heading {\n  font-weight: bold;\n}\n\n.side-nav .menu .menu-heading > a {\n  color: red;\n}\n\n.side-nav .menu ul {\n  margin-left: 0px;\n}\n\n.side-nav .menu ul > li {\n  font-weight: normal;\n  list-style-type: none;\n  margin-left: 1vw;\n  margin-bottom: 1vw;\n}\n\n.course-title {\n  box-shadow: 0 1px 2px #aaa;\n  background: white;\n  border-radius: 3px;\n  text-align: center;\n  padding: 2px 0px;\n  color: white;\n  background-color: #2199e8;\n}\n\n.course-title span {\n  position: relative;\n  margin-left: 15px;\n  top: 2px;\n  transition-property: color;\n  transition-duration: .2s;\n}\n\n.course-title span:hover {\n  color: #C1D2DE;\n  cursor: pointer;\n}\n\n.requests-container {\n  margin-top: 5px;\n}\n\n.request-listing {\n  margin-top: 5px;\n}\n\n.request-listing.cancelled {\n  transition: all .75s ease;\n  margin-left: 200px;\n  margin-right: -200px;\n  opacity: 0;\n}\n\n.request-listing .row {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.request-listing .request-information {\n  box-shadow: 0 1px 2px #aaa;\n  background: white;\n  border-radius: 3px;\n  padding-top: 5px;\n  padding-right: 0px;\n  padding-bottom: 10px;\n  padding-left: 0px;\n}\n\n.request-listing .request-information.editable {\n  padding-bottom: 30px;\n}\n\n.request-listing .request-information .columns:nth-of-type(2) {\n  padding-left: 0px;\n}\n\n.request-listing .request-action-bar {\n  margin-right: 1vw;\n  position: relative;\n  top: -25px;\n  margin-bottom: -25px;\n}\n\n.request-listing .request-action-bar .columns {\n  box-shadow: 0 1px 2px #aaa;\n  background: white;\n  border-radius: 3px;\n  padding-right: 0px;\n  padding-left: 0px;\n}\n\n.request-listing .request-action-bar button {\n  padding: .2em 1em .4em 1em;\n  margin-bottom: 0px;\n  font-size: larger;\n}\n\n.request-listing .request-action-bar button:focus {\n  outline: none;\n}\n\n.request-listing .request-action-bar .primary.button {\n  float: right;\n}\n\n.request-listing:first-of-type {\n  margin-top: 0px;\n}\n\n.request-listing img {\n  border-radius: 50%;\n  position: relative;\n  top: 3px;\n}\n\n.request-listing .request-name {\n  font-weight: bold;\n}\n\n.request-listing .request-location {\n  color: grey;\n  font-size: small;\n}\n\n.request-listing .request-bottom-row {\n  margin-top: 2px;\n  word-break: break-word;\n}\n\n.make-request-container {\n  box-shadow: 0 1px 2px #aaa;\n  background: white;\n  border-radius: 3px;\n  margin-top: 5px;\n  background-color: #C0C0C0;\n  padding: 10px;\n}\n\n.make-request-container input {\n  margin-bottom: 0px;\n}\n\n.make-request-container button {\n  margin-bottom: 0px;\n  margin-right: 10px;\n  font-size: medium;\n}\n\n.make-request-container .input-footer {\n  position: relative;\n  top: -2px;\n  font-size: smaller;\n}\n\n.make-request-container .character-count {\n  float: right;\n  margin-right: 4px;\n}\n\n.make-request-container .make-request-error-message {\n  float: left;\n  margin-left: 4px;\n  display: none;\n}\n\n.make-request-container .row.error label {\n  color: darkred;\n}\n\n.make-request-container .row.error input {\n  border-color: darkred;\n}\n\n.make-request-container .row.error .make-request-error-message {\n  display: inherit;\n}\n\nbody {\n  background-color: #FAFAFA;\n  margin-top: 10px;\n}\n\n.main-content {\n  margin-top: 5px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9hc3NldHMvc2Nzcy9leHRlbmRfZm91bmRhdGlvbi5zY3NzIiwic291cmNlcyI6WyIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL2Fzc2V0cy9zY3NzL2V4dGVuZF9mb3VuZGF0aW9uLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm91bmRhdGlvbi5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL3V0aWwvX3V0aWwuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy91dGlsL191bml0LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvdXRpbC9fdmFsdWUuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy91dGlsL19jb2xvci5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL3V0aWwvX3NlbGVjdG9yLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvdXRpbC9fYnJlYWtwb2ludC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL3V0aWwvX21peGlucy5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL19nbG9iYWwuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9ncmlkL19ncmlkLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZ3JpZC9fcm93LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZ3JpZC9fY29sdW1uLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZ3JpZC9fc2l6ZS5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2dyaWQvX3Bvc2l0aW9uLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZ3JpZC9fZ3V0dGVyLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZ3JpZC9fY2xhc3Nlcy5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2dyaWQvX2xheW91dC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2dyaWQvX2ZsZXgtZ3JpZC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL3R5cG9ncmFwaHkvX3R5cG9ncmFwaHkuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy90eXBvZ3JhcGh5L19iYXNlLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvdHlwb2dyYXBoeS9faGVscGVycy5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL3R5cG9ncmFwaHkvX2FsaWdubWVudC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL3R5cG9ncmFwaHkvX3ByaW50LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm9ybXMvX2Zvcm1zLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm9ybXMvX3RleHQuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9mb3Jtcy9fY2hlY2tib3guc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9mb3Jtcy9fbGFiZWwuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9mb3Jtcy9faGVscC10ZXh0LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm9ybXMvX2lucHV0LWdyb3VwLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm9ybXMvX2ZpZWxkc2V0LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm9ybXMvX3NlbGVjdC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2Zvcm1zL19lcnJvci5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3Zpc2liaWxpdHkuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19mbG9hdC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX2J1dHRvbi5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX2J1dHRvbi1ncm91cC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX2FjY29yZGlvbi1tZW51LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fYWNjb3JkaW9uLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fYmFkZ2Uuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19icmVhZGNydW1icy5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX2NhbGxvdXQuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19jbG9zZS1idXR0b24uc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19kcmlsbGRvd24uc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19kcm9wZG93bi1tZW51LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fZHJvcGRvd24uc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19mbGV4LXZpZGVvLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fbGFiZWwuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19tZWRpYS1vYmplY3Quc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL19tZW51LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fb2ZmLWNhbnZhcy5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX29yYml0LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fcGFnaW5hdGlvbi5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3Byb2dyZXNzLWJhci5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3JldmVhbC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3NsaWRlci5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3N0aWNreS5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3N3aXRjaC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3RhYmxlLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL3Njc3MvY29tcG9uZW50cy9fdGFicy5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3RpdGxlLWJhci5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9zY3NzL2NvbXBvbmVudHMvX3RvcC1iYXIuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL190aHVtYm5haWwuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvc2Nzcy9jb21wb25lbnRzL190b29sdGlwLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL2Fzc2V0cy9zY3NzL2ZvbnRzL19mb3VuZGF0aW9uLWljb25zLnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL2Fzc2V0cy9zY3NzL2NvbXBvbmVudHMvX3NpZGUtbmF2LnNjc3MiLCIvVXNlcnMvdHlsZXIvRG9jdW1lbnRzL0RldmVsb3BtZW50L0hIL2Fzc2V0cy9zY3NzL21peGlucy9fY2FyZC5zY3NzIiwiL1VzZXJzL3R5bGVyL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ISC9hc3NldHMvc2Nzcy9jb21wb25lbnRzL19jb3Vyc2UtdGl0bGUuc2NzcyIsIi9Vc2Vycy90eWxlci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSEgvYXNzZXRzL3Njc3MvY29tcG9uZW50cy9fcmVxdWVzdC1saXN0aW5nLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIn5mb3VuZGF0aW9uLXNpdGVzL3Njc3MvZm91bmRhdGlvblwiO1xuXG4vL0BpbmNsdWRlIGZvdW5kYXRpb24tZXZlcnl0aGluZyh0cnVlKTtcblxuQGltcG9ydCBcImZvbnRzL2ZvdW5kYXRpb24taWNvbnNcIjtcblxuQGluY2x1ZGUgZm91bmRhdGlvbi1nbG9iYWwtc3R5bGVzO1xuQGluY2x1ZGUgZm91bmRhdGlvbi1mbGV4LWdyaWQ7XG5AaW5jbHVkZSBmb3VuZGF0aW9uLXR5cG9ncmFwaHk7XG5AaW5jbHVkZSBmb3VuZGF0aW9uLWJ1dHRvbjtcbkBpbmNsdWRlIGZvdW5kYXRpb24tZm9ybXM7XG5AaW5jbHVkZSBmb3VuZGF0aW9uLXZpc2liaWxpdHktY2xhc3NlcztcbkBpbmNsdWRlIGZvdW5kYXRpb24tZmxvYXQtY2xhc3NlcztcbkBpbmNsdWRlIGZvdW5kYXRpb24tYmFkZ2U7XG5AaW5jbHVkZSBmb3VuZGF0aW9uLWRyb3Bkb3duO1xuQGluY2x1ZGUgZm91bmRhdGlvbi1sYWJlbDtcbkBpbmNsdWRlIGZvdW5kYXRpb24tbWVudTtcbkBpbmNsdWRlIGZvdW5kYXRpb24tc3RpY2t5O1xuQGluY2x1ZGUgZm91bmRhdGlvbi10aHVtYm5haWw7XG5AaW5jbHVkZSBmb3VuZGF0aW9uLXRpdGxlLWJhcjtcbkBpbmNsdWRlIGZvdW5kYXRpb24tdG9vbHRpcDtcbkBpbmNsdWRlIGZvdW5kYXRpb24tdG9wLWJhcjtcblxuQGltcG9ydCBcImNvbXBvbmVudHMvc2lkZS1uYXZcIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2NvdXJzZS10aXRsZVwiO1xuQGltcG9ydCBcImNvbXBvbmVudHMvcmVxdWVzdC1saXN0aW5nXCI7XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGQUZBRkE7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLm1haW4tY29udGVudCB7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4iLCIvKipcbiAqIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbiAqIFZlcnNpb24gNi4xLjFcbiAqIGZvdW5kYXRpb24uenVyYi5jb21cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuICovXG5cbi8vIFNhc3MgdXRpbGl0aWVzXG5AaW1wb3J0ICd1dGlsL3V0aWwnO1xuXG4vLyBHbG9iYWwgdmFyaWFibGVzIGFuZCBzdHlsZXNcbkBpbXBvcnQgJ2dsb2JhbCc7XG5cbi8vIENvbXBvbmVudHNcbkBpbXBvcnQgJ2dyaWQvZ3JpZCc7XG5AaW1wb3J0ICd0eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQGltcG9ydCAnZm9ybXMvZm9ybXMnO1xuQGltcG9ydCAnY29tcG9uZW50cy92aXNpYmlsaXR5JztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvZmxvYXQnO1xuQGltcG9ydCAnY29tcG9uZW50cy9idXR0b24nO1xuQGltcG9ydCAnY29tcG9uZW50cy9idXR0b24tZ3JvdXAnO1xuQGltcG9ydCAnY29tcG9uZW50cy9hY2NvcmRpb24tbWVudSc7XG5AaW1wb3J0ICdjb21wb25lbnRzL2FjY29yZGlvbic7XG5AaW1wb3J0ICdjb21wb25lbnRzL2JhZGdlJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvYnJlYWRjcnVtYnMnO1xuQGltcG9ydCAnY29tcG9uZW50cy9jYWxsb3V0JztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvY2xvc2UtYnV0dG9uJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvZHJpbGxkb3duJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvZHJvcGRvd24tbWVudSc7XG5AaW1wb3J0ICdjb21wb25lbnRzL2Ryb3Bkb3duJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvZmxleC12aWRlbyc7XG5AaW1wb3J0ICdjb21wb25lbnRzL2xhYmVsJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvbWVkaWEtb2JqZWN0JztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvbWVudSc7XG5AaW1wb3J0ICdjb21wb25lbnRzL29mZi1jYW52YXMnO1xuQGltcG9ydCAnY29tcG9uZW50cy9vcmJpdCc7XG5AaW1wb3J0ICdjb21wb25lbnRzL3BhZ2luYXRpb24nO1xuQGltcG9ydCAnY29tcG9uZW50cy9wcm9ncmVzcy1iYXInO1xuQGltcG9ydCAnY29tcG9uZW50cy9yZXZlYWwnO1xuQGltcG9ydCAnY29tcG9uZW50cy9zbGlkZXInO1xuQGltcG9ydCAnY29tcG9uZW50cy9zdGlja3knO1xuQGltcG9ydCAnY29tcG9uZW50cy9zd2l0Y2gnO1xuQGltcG9ydCAnY29tcG9uZW50cy90YWJsZSc7XG5AaW1wb3J0ICdjb21wb25lbnRzL3RhYnMnO1xuQGltcG9ydCAnY29tcG9uZW50cy90aXRsZS1iYXInO1xuQGltcG9ydCAnY29tcG9uZW50cy90b3AtYmFyJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvdGh1bWJuYWlsJztcbkBpbXBvcnQgJ2NvbXBvbmVudHMvdG9vbHRpcCc7XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWV2ZXJ5dGhpbmcoJGZsZXg6IGZhbHNlKSB7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZ2xvYmFsLXN0eWxlcztcbiAgQGlmIG5vdCAkZmxleCB7XG4gICAgQGluY2x1ZGUgZm91bmRhdGlvbi1ncmlkO1xuICB9XG4gIEBlbHNlIHtcbiAgICBAaW5jbHVkZSBmb3VuZGF0aW9uLWZsZXgtZ3JpZDtcbiAgfVxuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXR5cG9ncmFwaHk7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tYnV0dG9uO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLWZvcm1zO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXZpc2liaWxpdHktY2xhc3NlcztcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1mbG9hdC1jbGFzc2VzO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLWFjY29yZGlvbjtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1hY2NvcmRpb24tbWVudTtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1iYWRnZTtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1icmVhZGNydW1icztcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1idXR0b24tZ3JvdXA7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tY2FsbG91dDtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1jbG9zZS1idXR0b247XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZHJpbGxkb3duLW1lbnU7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZHJvcGRvd247XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZHJvcGRvd24tbWVudTtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1mbGV4LXZpZGVvO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLWxhYmVsO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLW1lZGlhLW9iamVjdDtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1tZW51O1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLW9mZi1jYW52YXM7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tb3JiaXQ7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tcGFnaW5hdGlvbjtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1wcm9ncmVzcy1iYXI7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tc2xpZGVyO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXN0aWNreTtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1yZXZlYWw7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tc3dpdGNoO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXRhYmxlO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXRhYnM7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tdGh1bWJuYWlsO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXRpdGxlLWJhcjtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi10b29sdGlwO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXRvcC1iYXI7XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8gVXRpbGl0aWVzXG5AaW1wb3J0ICd1bml0JztcbkBpbXBvcnQgJ3ZhbHVlJztcbkBpbXBvcnQgJ2NvbG9yJztcbkBpbXBvcnQgJ3NlbGVjdG9yJztcblxuLy8gTGlicmFyaWVzXG5AaW1wb3J0ICdicmVha3BvaW50JztcblxuLy8gTWl4aW5zXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZnVuY3Rpb25zXG4vLy8vXG5cbiRnbG9iYWwtZm9udC1zaXplOiAxMDAlICFkZWZhdWx0O1xuXG4vLyBzY3NzLWxpbnQ6ZGlzYWJsZSBaZXJvVW5pdFxuXG4vLy8gUmVtb3ZlcyB0aGUgdW5pdCAoZS5nLiBweCwgZW0sIHJlbSkgZnJvbSBhIHZhbHVlLCByZXR1cm5pbmcgdGhlIG51bWJlciBvbmx5LlxuLy8vXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRudW0gLSBOdW1iZXIgdG8gc3RyaXAgdW5pdCBmcm9tLlxuLy8vXG4vLy8gQHJldHVybnMge051bWJlcn0gVGhlIHNhbWUgbnVtYmVyLCBzYW5zIHVuaXQuXG5AZnVuY3Rpb24gc3RyaXAtdW5pdCgkbnVtKSB7XG4gIEByZXR1cm4gJG51bSAvICgkbnVtICogMCArIDEpO1xufVxuXG4vLy8gQ29udmVydHMgb25lIG9yIG1vcmUgcGl4ZWwgdmFsdWVzIGludG8gbWF0Y2hpbmcgcmVtIHZhbHVlcy5cbi8vL1xuLy8vIEBwYXJhbSB7TnVtYmVyfExpc3R9ICR2YWx1ZXMgLSBPbmUgb3IgbW9yZSB2YWx1ZXMgdG8gY29udmVydC4gQmUgc3VyZSB0byBzZXBhcmF0ZSB0aGVtIHdpdGggc3BhY2VzIGFuZCBub3QgY29tbWFzLiBJZiB5b3UgbmVlZCB0byBjb252ZXJ0IGEgY29tbWEtc2VwYXJhdGVkIGxpc3QsIHdyYXAgdGhlIGxpc3QgaW4gcGFyZW50aGVzZXMuXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRiYXNlIFtudWxsXSAtIFRoZSBiYXNlIHZhbHVlIHRvIHVzZSB3aGVuIGNhbGN1bGF0aW5nIHRoZSBgcmVtYC4gSWYgeW91J3JlIHVzaW5nIEZvdW5kYXRpb24gb3V0IG9mIHRoZSBib3gsIHRoaXMgaXMgMTZweC4gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgYG51bGxgLCB0aGUgZnVuY3Rpb24gd2lsbCByZWZlcmVuY2UgdGhlIGAkYmFzZS1mb250LXNpemVgIHZhcmlhYmxlIGFzIHRoZSBiYXNlLlxuLy8vXG4vLy8gQHJldHVybnMge0xpc3R9IEEgbGlzdCBvZiBjb252ZXJ0ZWQgdmFsdWVzLlxuQGZ1bmN0aW9uIHJlbS1jYWxjKCR2YWx1ZXMsICRiYXNlOiBudWxsKSB7XG4gICRyZW0tdmFsdWVzOiAoKTtcbiAgJGNvdW50OiBsZW5ndGgoJHZhbHVlcyk7XG5cbiAgLy8gSWYgbm8gYmFzZSBpcyBkZWZpbmVkLCBkZWZlciB0byB0aGUgZ2xvYmFsIGZvbnQgc2l6ZVxuICBAaWYgJGJhc2UgPT0gbnVsbCB7XG4gICAgJGJhc2U6ICRnbG9iYWwtZm9udC1zaXplO1xuICB9XG5cbiAgLy8gSWYgdGhlIGJhc2UgZm9udCBzaXplIGlzIGEgJSwgdGhlbiBtdWx0aXBseSBpdCBieSAxNnB4XG4gIC8vIFRoaXMgaXMgYmVjYXVzZSAxMDAlIGZvbnQgc2l6ZSA9IDE2cHggaW4gbW9zdCBhbGwgYnJvd3NlcnNcbiAgQGlmIHVuaXQoJGJhc2UpID09ICclJyB7XG4gICAgJGJhc2U6ICgkYmFzZSAvIDEwMCUpICogMTZweDtcbiAgfVxuXG4gIEBpZiAkY291bnQgPT0gMSB7XG4gICAgQHJldHVybiAtemYtdG8tcmVtKCR2YWx1ZXMsICRiYXNlKTtcbiAgfVxuXG4gIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggJGNvdW50IHtcbiAgICAkcmVtLXZhbHVlczogYXBwZW5kKCRyZW0tdmFsdWVzLCAtemYtdG8tcmVtKG50aCgkdmFsdWVzLCAkaSksICRiYXNlKSk7XG4gIH1cblxuICBAcmV0dXJuICRyZW0tdmFsdWVzO1xufVxuXG4vLyBDb252ZXJ0cyBhIHVuaXRsZXNzLCBwaXhlbCwgb3IgcmVtIHZhbHVlIHRvIGVtLCBmb3IgdXNlIGluIGJyZWFrcG9pbnRzLlxuQGZ1bmN0aW9uIC16Zi1icC10by1lbSgkdmFsdWUpIHtcbiAgLy8gUGl4ZWwgYW5kIHVuaXRsZXNzIHZhbHVlcyBhcmUgY29udmVydGVkIHRvIHJlbXNcbiAgQGlmIHVuaXQoJHZhbHVlKSA9PSAncHgnIG9yIHVuaXRsZXNzKCR2YWx1ZSkge1xuICAgICR2YWx1ZTogcmVtLWNhbGMoJHZhbHVlLCAkYmFzZTogMTZweCk7XG4gIH1cblxuICAvLyBUaGVuIHRoZSB2YWx1ZSBpcyBjb252ZXJ0ZWQgdG8gZW1zXG4gIEByZXR1cm4gc3RyaXAtdW5pdCgkdmFsdWUpICogMWVtO1xufVxuXG4vLy8gQ29udmVydHMgYSBwaXhlbCB2YWx1ZSB0byBtYXRjaGluZyByZW0gdmFsdWUuICpBbnkqIHZhbHVlIHBhc3NlZCwgcmVnYXJkbGVzcyBvZiB1bml0LCBpcyBhc3N1bWVkIHRvIGJlIGEgcGl4ZWwgdmFsdWUuIEJ5IGRlZmF1bHQsIHRoZSBiYXNlIHBpeGVsIHZhbHVlIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSByZW0gdmFsdWUgaXMgdGFrZW4gZnJvbSB0aGUgYCRnbG9iYWwtZm9udC1zaXplYCB2YXJpYWJsZS5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vL1xuLy8vIEBwYXJhbSB7TnVtYmVyfSAkdmFsdWUgLSBQaXhlbCB2YWx1ZSB0byBjb252ZXJ0LlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkYmFzZSBbbnVsbF0gLSBCYXNlIGZvciBwaXhlbCBjb252ZXJzaW9uLlxuLy8vXG4vLy8gQHJldHVybnMge051bWJlcn0gQSBudW1iZXIgaW4gcmVtcywgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZ2l2ZW4gdmFsdWUgYW5kIHRoZSBiYXNlIHBpeGVsIHZhbHVlLiByZW0gdmFsdWVzIGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBpcy5cbkBmdW5jdGlvbiAtemYtdG8tcmVtKCR2YWx1ZSwgJGJhc2U6IG51bGwpIHtcbiAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyXG4gIEBpZiB0eXBlLW9mKCR2YWx1ZSkgIT0gJ251bWJlcicge1xuICAgIEB3YXJuIGluc3BlY3QoJHZhbHVlKSArICcgd2FzIHBhc3NlZCB0byByZW0tY2FsYygpLCB3aGljaCBpcyBub3QgYSBudW1iZXIuJztcbiAgICBAcmV0dXJuICR2YWx1ZTtcbiAgfVxuICBcbiAgLy8gQ2FsY3VsYXRlIHJlbSBpZiB1bml0cyBmb3IgJHZhbHVlIGlzIG5vdCByZW1cbiAgQGlmIHVuaXQoJHZhbHVlKSAhPSAncmVtJyB7XG4gICAgJHZhbHVlOiBzdHJpcC11bml0KCR2YWx1ZSkgLyBzdHJpcC11bml0KCRiYXNlKSAqIDFyZW07XG4gIH1cblxuICAvLyBUdXJuIDByZW0gaW50byAwXG4gIEBpZiAkdmFsdWUgPT0gMHJlbSB7XG4gICAgJHZhbHVlOiAwO1xuICB9XG5cbiAgQHJldHVybiAkdmFsdWU7XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmdW5jdGlvbnNcbi8vLy9cblxuLy8vIERldGVybWluZSBpZiBhIHZhbHVlIGlzIG5vdCBmYWxzZXksIGluIENTUyB0ZXJtcy4gRmFsc2V5IHZhbHVlcyBhcmUgYG51bGxgLCBgbm9uZWAsIGAwYCB3aXRoIGFueSB1bml0LCBvciBhbiBlbXB0eSBsaXN0LlxuLy8vXG4vLy8gQHBhcmFtIHtNaXhlZH0gJHZhbCAtIFZhbHVlIHRvIGNoZWNrLlxuLy8vXG4vLy8gQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiBgJHZhbGAgaXMgbm90IGZhbHNleS5cbkBmdW5jdGlvbiBoYXMtdmFsdWUoJHZhbCkge1xuICBAaWYgJHZhbCA9PSBudWxsIG9yICR2YWwgPT0gbm9uZSB7XG4gICAgQHJldHVybiBmYWxzZTtcbiAgfVxuICBAaWYgdHlwZS1vZigkdmFsKSA9PSAnbnVtYmVyJyBhbmQgc3RyaXAtdW5pdCgkdmFsKSA9PSAwIHtcbiAgICBAcmV0dXJuIGZhbHNlO1xuICB9XG4gIEBpZiB0eXBlLW9mKCR2YWwpID09ICdsaXN0JyBhbmQgbGVuZ3RoKCR2YWwpID09IDAge1xuICAgIEByZXR1cm4gZmFsc2U7XG4gIH1cbiAgQHJldHVybiB0cnVlO1xufVxuXG4vLy8gRGV0ZXJtaW5lIGEgdG9wL3JpZ2h0L2JvdHRvbS9yaWdodCB2YWx1ZSBvbiBhIHBhZGRpbmcsIG1hcmdpbiwgZXRjLiBwcm9wZXJ0eSwgbm8gbWF0dGVyIGhvdyBtYW55IHZhbHVlcyB3ZXJlIHBhc3NlZCBpbi4gVXNlIHRoaXMgZnVuY3Rpb24gaWYgeW91IG5lZWQgdG8ga25vdyB0aGUgc3BlY2lmaWMgc2lkZSBvZiBhIHZhbHVlLCBidXQgZG9uJ3Qga25vdyBpZiB0aGUgdmFsdWUgaXMgdXNpbmcgYSBzaG9ydGhhbmQgZm9ybWF0LlxuLy8vXG4vLy8gQHBhcmFtIHtMaXN0fE51bWJlcn0gJHZhbCAtIFZhbHVlIHRvIGFuYWx5emUuIFNob3VsZCBiZSBhIHNob3J0aGFuZCBzaXppbmcgcHJvcGVydHksIGUuZy4gXCIxZW0gMmVtIDFlbVwiXG4vLy8gQHBhcmFtIHtLZXl3b3JkfSAkc2lkZSAtIFNpZGUgdG8gcmV0dXJuLiBTaG91bGQgYmUgYHRvcGAsIGByaWdodGAsIGBib3R0b21gLCBvciBgbGVmdGAuXG4vLy9cbi8vLyBAcmV0dXJucyB7TnVtYmVyfSBBIHNpbmdsZSB2YWx1ZSBiYXNlZCBvbiBgJHZhbGAgYW5kIGAkc2lkZWAuXG5AZnVuY3Rpb24gZ2V0LXNpZGUoJHZhbCwgJHNpZGUpIHtcbiAgJGxlbmd0aDogbGVuZ3RoKCR2YWwpO1xuXG4gIEBpZiAkbGVuZ3RoID09IDEge1xuICAgIEByZXR1cm4gJHZhbDtcbiAgfVxuICBAaWYgJGxlbmd0aCA9PSAyIHtcbiAgICBAcmV0dXJuIG1hcC1nZXQoKFxuICAgICAgdG9wOiBudGgoJHZhbCwgMSksXG4gICAgICBib3R0b206IG50aCgkdmFsLCAxKSxcbiAgICAgIGxlZnQ6IG50aCgkdmFsLCAyKSxcbiAgICAgIHJpZ2h0OiBudGgoJHZhbCwgMiksXG4gICAgKSwgJHNpZGUpO1xuICB9XG4gIEBpZiAkbGVuZ3RoID09IDMge1xuICAgIEByZXR1cm4gbWFwLWdldCgoXG4gICAgICB0b3A6IG50aCgkdmFsLCAxKSxcbiAgICAgIGxlZnQ6IG50aCgkdmFsLCAyKSxcbiAgICAgIHJpZ2h0OiBudGgoJHZhbCwgMiksXG4gICAgICBib3R0b206IG50aCgkdmFsLCAzKSxcbiAgICApLCAkc2lkZSk7XG4gIH1cbiAgQGlmICRsZW5ndGggPT0gNCB7XG4gICAgQHJldHVybiBtYXAtZ2V0KChcbiAgICAgIHRvcDogbnRoKCR2YWwsIDEpLFxuICAgICAgcmlnaHQ6IG50aCgkdmFsLCAyKSxcbiAgICAgIGJvdHRvbTogbnRoKCR2YWwsIDMpLFxuICAgICAgbGVmdDogbnRoKCR2YWwsIDQpLFxuICAgICksICRzaWRlKTtcbiAgfVxufVxuXG4vLy8gR2l2ZW4gYm9yZGVyICR2YWwsIGZpbmQgYSBzcGVjaWZpYyBlbGVtZW50IG9mIHRoZSBib3JkZXIsIHdoaWNoIGlzICRlbGVtLiBUaGUgcG9zc2libGUgdmFsdWVzIGZvciAkZWxlbSBhcmUgd2lkdGgsIHN0eWxlLCBhbmQgY29sb3IuXG4vLy9cbi8vLyBAcGFyYW0ge0xpc3R9ICR2YWwgLSBCb3JkZXIgdmFsdWUgdG8gZmluZCBhIHZhbHVlIGluLlxuLy8vIEBwYXJhbSB7S2V5d29yZH0gJGVsZW0gLSBCb3JkZXIgY29tcG9uZW50IHRvIGV4dHJhY3QuXG4vLy9cbi8vLyBAcmV0dXJucyB7TWl4ZWR9IElmIHRoZSB2YWx1ZSBleGlzdHMsIHJldHVybnMgdGhlIHZhbHVlLiBJZiB0aGUgdmFsdWUgaXMgbm90IGluIHRoZSBib3JkZXIgZGVmaW5pdGlvbiwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGEgMHB4IHdpZHRoLCBzb2xpZCBzdHlsZSwgb3IgYmxhY2sgYm9yZGVyLlxuQGZ1bmN0aW9uIGdldC1ib3JkZXItdmFsdWUoJHZhbCwgJGVsZW0pIHtcbiAgLy8gRmluZCB0aGUgd2lkdGgsIHN0eWxlLCBvciBjb2xvciBhbmQgcmV0dXJuIGl0XG4gIEBlYWNoICR2IGluICR2YWwge1xuICAgICR0eXBlOiB0eXBlLW9mKCR2KTtcbiAgICBAaWYgJGVsZW0gPT0gd2lkdGggYW5kICR0eXBlID09ICdudW1iZXInIHtcbiAgICAgIEByZXR1cm4gJHY7XG4gICAgfVxuICAgIEBpZiAkZWxlbSA9PSBzdHlsZSBhbmQgJHR5cGUgPT0gJ3N0cmluZycge1xuICAgICAgQHJldHVybiAkdjtcbiAgICB9XG4gICAgQGlmICRlbGVtID09IGNvbG9yIGFuZCAkdHlwZSA9PSAnY29sb3InIHtcbiAgICAgIEByZXR1cm4gJHY7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVmYXVsdHNcbiAgJGRlZmF1bHRzOiAoXG4gICAgd2lkdGg6IDAsXG4gICAgc3R5bGU6IHNvbGlkLFxuICAgIGNvbG9yOiAjMDAwLFxuICApO1xuICBAcmV0dXJuIG1hcC1nZXQoJGRlZmF1bHRzLCAkZWxlbSk7XG59XG5cbi8vLyBDYWxjdWxhdGVzIHheeSwgd2hlcmUgeCBpcyBgJGJhc2VgIGFuZCB5IGlzIGAkcG93ZXJgLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRiYXNlIC0gQmFzZSBudW1iZXIgKHgpLlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkcG93ZXIgLSBFeHBvbmVudCAoeSkuXG5AZnVuY3Rpb24gcG93KCRiYXNlLCAkcG93ZXIpIHtcbiAgQGlmICRwb3dlciA9PSAwIHsgQHJldHVybiAxOyB9XG4gIEByZXR1cm4gJGJhc2UgKiBwb3coJGJhc2UsICRwb3dlciAtIDEpO1xufVxuXG4vLyBUT0RPOiBSZW1vdmUgdGhpcyAoaXQncyB1c2VkIGJ5IHRoZSBncmlkIGJ1dCBpcyBvdmVya2lsbClcbi8vLyBHaXZlbiBhIHVzZXItZGVmaW5lZCBsaXN0IG9mIGtleXdvcmRzIGFuZCBhIGxpc3Qgb2YgcG9zc2libGUga2V5d29yZHMsIGZpbmQgdGhlIG9uZXMgdGhhdCB3ZXJlIHBhc3NlZCBpbi5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vL1xuLy8vIEBwYXJhbSB7TGlzdH0gJG9wdHMgLSBMaXN0IG9mIHZhbHVlcyB0byBmaW5kIGtleXdvcmRzIGluLlxuLy8vIEBwYXJhbSB7TGlzdH0gJHNlZWtpbmcgLSBMaXN0IG9mIGFsbCBwb3NzaWJsZSBrZXl3b3Jkcy5cbi8vL1xuLy8vIEByZXR1cm5zIHtNYXB9IEEgbWFwIG9mIGFsbCBrZXl3b3JkcyBpbiAkc2Vla2luZy4gSWYgYSBrZXl3b3JkIHdhcyBmb3VuZCBpbiAkb3B0cywgaXRzIHZhbHVlIGlzIHRydWUsIG90aGVyd2lzZSBmYWxzZS5cbkBmdW5jdGlvbiAtemYtZ2V0LW9wdGlvbnMoJG9wdHMsICRzZWVraW5nKSB7XG4gIEBpZiB0eXBlLW9mKCRvcHRzKSAhPSAnbGlzdCcge1xuICAgICRvcHRzOiAoJG9wdHMpO1xuICB9XG5cbiAgJG1hcDogKCk7XG4gIEBlYWNoICRrZXl3b3JkIGluICRzZWVraW5nIHtcbiAgICAkdmFsOiBpZihpbmRleCgkb3B0cywgJGtleXdvcmQpICE9IG51bGwsIHRydWUsIGZhbHNlKTtcbiAgICAkaXRlbTogKCRrZXl3b3JkOiAkdmFsKTtcbiAgICAkbWFwOiBtYXAtbWVyZ2UoJG1hcCwgJGl0ZW0pO1xuICB9XG5cbiAgQHJldHVybiAkbWFwO1xufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZnVuY3Rpb25zXG4vLy8vXG5cbi8vLyBDaGVja3MgdGhlIGxpZ2h0bmVzcyBvZiBgJGNvbG9yYCwgYW5kIGlmIGl0IHBhc3NlcyB0aGUgYCR0aHJlc2hvbGRgIG9mIGxpZ2h0bmVzcywgaXQgcmV0dXJucyB0aGUgYCR5ZXNgIGNvbG9yLiBPdGhlcndpc2UsIGl0IHJldHVybnMgdGhlIGAkbm9gIGNvbG9yLiBVc2UgdGhpcyBmdW5jdGlvbiB0byBkeW5hbWljYWxseSBvdXRwdXQgYSBmb3JlZ3JvdW5kIGNvbG9yIGJhc2VkIG9uIGEgZ2l2ZW4gYmFja2dyb3VuZCBjb2xvci5cbi8vL1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciAtIENvbG9yIHRvIGNoZWNrIHRoZSBsaWdodG5lc3Mgb2YuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHllcyBbJGJsYWNrXSAtIENvbG9yIHRvIHJldHVybiBpZiBgJGNvbG9yYCBpcyBsaWdodC5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkbm8gWyR3aGl0ZV0gLSBDb2xvciB0byByZXR1cm4gaWYgYCRjb2xvcmAgaXMgZGFyay5cbi8vLyBAcGFyYW0ge1BlcmNlbnRhZ2V9ICR0aHJlc2hvbGQgWzYwJV0gLSBUaHJlc2hvbGQgb2YgbGlnaHRuZXNzIHRvIGNoZWNrIGFnYWluc3QuXG4vLy9cbi8vLyBAcmV0dXJucyB7Q29sb3J9IFRoZSAkeWVzIGNvbG9yIG9yICRubyBjb2xvci5cbkBmdW5jdGlvbiBmb3JlZ3JvdW5kKCRjb2xvciwgJHllczogJGJsYWNrLCAkbm86ICR3aGl0ZSwgJHRocmVzaG9sZDogNjAlKSB7XG4gIEBpZiAkY29sb3IgPT0gdHJhbnNwYXJlbnQge1xuICAgICRjb2xvcjogJGJvZHktYmFja2dyb3VuZDtcbiAgfVxuICBAaWYgKGxpZ2h0bmVzcygkY29sb3IpID4gJHRocmVzaG9sZCkge1xuICAgIEByZXR1cm4gJHllcztcbiAgfVxuICBAZWxzZSB7XG4gICAgQHJldHVybiAkbm87XG4gIH1cbn1cblxuLy8vIFNjYWxlcyBhIGNvbG9yIHRvIGJlIGxpZ2h0ZXIgaWYgaXQncyBsaWdodCwgb3IgZGFya2VyIGlmIGl0J3MgZGFyay4gVXNlIHRoaXMgZnVuY3Rpb24gdG8gdGludCBhIGNvbG9yIGFwcHJvcHJpYXRlIHRvIGl0cyBsaWdodG5lc3MuXG4vLy9cbi8vLyBAcGFyYW0ge0NvbG9yfSAkY29sb3IgLSBDb2xvciB0byBzY2FsZS5cbi8vLyBAcGFyYW0ge1BlcmNlbnRhZ2V9ICRzY2FsZSBbNSVdIC0gQW1vdW50IHRvIHNjYWxlIHVwIG9yIGRvd24uXG4vLy8gQHBhcmFtIHtQZXJjZW50YWdlfSAkdGhyZXNob2xkIFs0MCVdIC0gVGhyZXNob2xkIG9mIGxpZ2h0bmVzcyB0byBjaGVjayBhZ2FpbnN0LlxuLy8vXG4vLy8gQHJldHVybnMge0NvbG9yfSBBIHNjYWxlZCBjb2xvci5cbkBmdW5jdGlvbiBzbWFydC1zY2FsZSgkY29sb3IsICRzY2FsZTogNSUsICR0aHJlc2hvbGQ6IDQwJSkge1xuICBAaWYgbGlnaHRuZXNzKCRjb2xvcikgPiAkdGhyZXNob2xkIHtcbiAgICAkc2NhbGU6IC0kc2NhbGU7XG4gIH1cbiAgQHJldHVybiBzY2FsZS1jb2xvcigkY29sb3IsICRsaWdodG5lc3M6ICRzY2FsZSk7XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmdW5jdGlvbnNcbi8vLy9cblxuLy8vIEdlbmVyYXRlcyBhIHNlbGVjdG9yIHdpdGggZXZlcnkgdGV4dCBpbnB1dCB0eXBlLiBZb3UgY2FuIGFsc28gZmlsdGVyIHRoZSBsaXN0IHRvIG9ubHkgb3V0cHV0IGEgc3Vic2V0IG9mIHRob3NlIHNlbGVjdG9ycy5cbi8vL1xuLy8vIEBwYXJhbSB7TGlzdHxLZXl3b3JkfSAkdHlwZXMgWygpXSAtIEEgbGlzdCBvZiB0ZXh0IGlucHV0IHR5cGVzIHRvIHVzZS4gTGVhdmUgYmxhbmsgdG8gdXNlIGFsbCBvZiB0aGVtLlxuQGZ1bmN0aW9uIHRleHQtaW5wdXRzKCR0eXBlczogKCkpIHtcbiAgJHJldHVybjogKCk7XG5cbiAgJGFsbC10eXBlczpcbiAgICB0ZXh0XG4gICAgcGFzc3dvcmRcbiAgICBkYXRlXG4gICAgZGF0ZXRpbWVcbiAgICBkYXRldGltZS1sb2NhbFxuICAgIG1vbnRoXG4gICAgd2Vla1xuICAgIGVtYWlsXG4gICAgbnVtYmVyXG4gICAgc2VhcmNoXG4gICAgdGVsXG4gICAgdGltZVxuICAgIHVybFxuICAgIGNvbG9yO1xuXG4gIEBpZiBub3QgaGFzLXZhbHVlKCR0eXBlcykge1xuICAgICR0eXBlczogJGFsbC10eXBlcztcbiAgfVxuXG4gIEBlYWNoICR0eXBlIGluICR0eXBlcyB7XG4gICAgJHJldHVybjogYXBwZW5kKCRyZXR1cm4sIHVucXVvdGUoJ1t0eXBlPVxcJyN7JHR5cGV9XFwnXScpLCBjb21tYSk7XG4gIH1cblxuICBAcmV0dXJuICRyZXR1cm47XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBicmVha3BvaW50c1xuLy8vL1xuXG4vLyBzY3NzLWxpbnQ6ZGlzYWJsZSBaZXJvVW5pdFxuXG4vLy8gQSBsaXN0IG9mIG5hbWVkIGJyZWFrcG9pbnRzLiBZb3UgY2FuIHVzZSB0aGVzZSB3aXRoIHRoZSBgYnJlYWtwb2ludCgpYCBtaXhpbiB0byBxdWlja2x5IGNyZWF0ZSBtZWRpYSBxdWVyaWVzLlxuLy8vIEB0eXBlIE1hcFxuJGJyZWFrcG9pbnRzOiAoXG4gIHNtYWxsOiAwLFxuICBtZWRpdW06IDY0MHB4LFxuICBsYXJnZTogMTAyNHB4LFxuICB4bGFyZ2U6IDEyMDBweCxcbiAgeHhsYXJnZTogMTQ0MHB4LFxuKSAhZGVmYXVsdDtcblxuLy8vIEFsbCBvZiB0aGUgbmFtZXMgaW4gdGhpcyBsaXN0IHdpbGwgYmUgb3V0cHV0IGFzIGNsYXNzZXMgaW4geW91ciBDU1MsIGxpa2UgYC5zbWFsbC0xMmAsIGAubWVkaXVtLTZgLCBhbmQgc28gb24uIEVhY2ggdmFsdWUgaW4gdGhpcyBsaXN0IG11c3QgYWxzbyBiZSBpbiB0aGUgYCRicmVha3BvaW50c2AgbWFwLlxuLy8vIEB0eXBlIExpc3RcbiRicmVha3BvaW50LWNsYXNzZXM6IChzbWFsbCBtZWRpdW0gbGFyZ2UpICFkZWZhdWx0O1xuXG4vLy8gR2VuZXJhdGVzIGEgbWVkaWEgcXVlcnkgc3RyaW5nIG1hdGNoaW5nIHRoZSBpbnB1dCB2YWx1ZS4gUmVmZXIgdG8gdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgYnJlYWtwb2ludCgpYCBtaXhpbiB0byBzZWUgd2hhdCB0aGUgcG9zc2libGUgaW5wdXRzIGFyZS5cbi8vL1xuLy8vIEBwYXJhbSB7S2V5d29yZHxOdW1iZXJ9ICR2YWwgW3NtYWxsXSAtIEJyZWFrcG9pbnQgbmFtZSwgb3IgcHgsIHJlbSwgb3IgZW0gdmFsdWUgdG8gcHJvY2Vzcy5cbkBmdW5jdGlvbiBicmVha3BvaW50KCR2YWw6IHNtYWxsKSB7XG4gIC8vIFNpemUgb3Iga2V5d29yZFxuICAkYnA6IG50aCgkdmFsLCAxKTtcbiAgLy8gVmFsdWUgZm9yIG1heC13aWR0aCBtZWRpYSBxdWVyaWVzXG4gICRicC1tYXg6IDA7XG4gIC8vIERpcmVjdGlvbiBvZiBtZWRpYSBxdWVyeSAodXAsIGRvd24sIG9yIG9ubHkpXG4gICRkaXI6IGlmKGxlbmd0aCgkdmFsKSA+IDEsIG50aCgkdmFsLCAyKSwgdXApO1xuICAvLyBFdmVudHVhbCBvdXRwdXRcbiAgJHN0cjogJyc7XG4gIC8vIElzIGl0IGEgbmFtZWQgbWVkaWEgcXVlcnk/XG4gICRuYW1lZDogZmFsc2U7XG5cbiAgLy8gT3JpZW50YXRpb24gbWVkaWEgcXVlcmllcyBoYXZlIGEgdW5pcXVlIHN5bnRheFxuICBAaWYgJGJwID09ICdsYW5kc2NhcGUnIG9yICRicCA9PSAncG9ydHJhaXQnIHtcbiAgICBAcmV0dXJuICcob3JpZW50YXRpb246ICN7JGJwfSknO1xuICB9XG4gIEBlbHNlIGlmICRicCA9PSAncmV0aW5hJyB7XG4gICAgQHJldHVybiAnKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMiksIChtaW4tcmVzb2x1dGlvbjogMTkyZHBpKSc7XG4gIH1cblxuICAvLyBUcnkgdG8gcHVsbCBhIG5hbWVkIGJyZWFrcG9pbnQgb3V0IG9mIHRoZSAkYnJlYWtwb2ludHMgbWFwXG4gIEBpZiB0eXBlLW9mKCRicCkgPT0gJ3N0cmluZycge1xuICAgIEBpZiBtYXAtaGFzLWtleSgkYnJlYWtwb2ludHMsICRicCkge1xuICAgICAgQGlmICRkaXIgPT0gJ29ubHknIG9yICRkaXIgPT0gJ2Rvd24nIHtcbiAgICAgICAgJG5leHQtYnA6IC16Zi1tYXAtbmV4dCgkYnJlYWtwb2ludHMsICRicCk7XG5cbiAgICAgICAgQGlmICRuZXh0LWJwID09IG51bGwge1xuICAgICAgICAgICRicC1tYXg6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgQGVsc2Uge1xuICAgICAgICAgICRicC1tYXg6ICRuZXh0LWJwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICRicDogbWFwLWdldCgkYnJlYWtwb2ludHMsICRicCk7XG4gICAgICAkbmFtZWQ6IHRydWU7XG4gICAgfVxuICAgIEBlbHNlIHtcbiAgICAgICRicDogMDtcbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IGFueSBwaXhlbCwgcmVtLCBvciB1bml0bGVzcyB2YWx1ZSB0byBlbVxuICAkYnA6IC16Zi1icC10by1lbSgkYnApO1xuICBAaWYgJGJwLW1heCB7XG4gICAgJGJwLW1heDogLXpmLWJwLXRvLWVtKCRicC1tYXgpIC0gKDEvMTYpO1xuICB9XG5cbiAgLy8gU2tpcCBtZWRpYSBxdWVyeSBjcmVhdGlvbiBpZiB0aGUgaW5wdXQgaXMgXCIwIHVwXCJcbiAgQGlmICRicCA+IDBlbSBvciAkZGlyID09ICdvbmx5JyBvciAkZGlyID09ICdkb3duJyB7XG4gICAgLy8gYG9ubHlgIHJhbmdlcyB1c2UgdGhlIGZvcm1hdCBgKG1pbi13aWR0aDogbikgYW5kIChtYXgtd2lkdGg6IG4pYFxuICAgIEBpZiAkZGlyID09ICdvbmx5JyB7XG4gICAgICBAaWYgJG5hbWVkID09IHRydWUge1xuICAgICAgICAkc3RyOiAkc3RyICsgJyhtaW4td2lkdGg6ICN7JGJwfSknO1xuXG4gICAgICAgIEBpZiAkYnAtbWF4ICE9IG51bGwge1xuICAgICAgICAgICRzdHI6ICRzdHIgKyAnIGFuZCAobWF4LXdpZHRoOiAjeyRicC1tYXh9KSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgQHdhcm4gJ09ubHkgbmFtZWQgbWVkaWEgcXVlcmllcyBjYW4gaGF2ZSBhbiBgb25seWAgcmFuZ2UuJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgZG93bmAgcmFuZ2VzIHVzZSB0aGUgZm9ybWF0IGAobWF4LXdpZHRoOiBuKWBcbiAgICBAZWxzZSBpZiAkZGlyID09ICdkb3duJyB7XG4gICAgICAkbWF4OiAwO1xuXG4gICAgICAvLyBGb3IgbmFtZWQgYnJlYWtwb2ludHMsIHN1YnRyYWN0IHRoZSBicmVha3BvaW50IHZhbHVlIGJ5IG9uZSBcInBpeGVsXCIsIG9yIDEvMTZlbS5cbiAgICAgIEBpZiAkbmFtZWQge1xuICAgICAgICAkbWF4OiAkYnAtbWF4O1xuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICAkbWF4OiAkYnA7XG4gICAgICB9XG5cbiAgICAgIC8vIFNraXAgbWVkaWEgcXVlcnkgY3JlYXRpb24gaWYgaW5wdXQgdmFsdWUgaXMgZXhhY3RseSBcIjAgZG93blwiIGJ1dCBkb24ndCBcInNtYWxsIGRvd25cIlxuICAgICAgQGlmICRuYW1lZCBvciAkYnAgPiAwZW0ge1xuICAgICAgICAkc3RyOiAkc3RyICsgJyhtYXgtd2lkdGg6ICN7JG1heH0pJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgdXBgIHJhbmdlcyB1c2UgdGhlIGZvcm1hdCBgKG1pbi13aWR0aDogbilgXG4gICAgQGVsc2UgaWYgJGJwID4gMGVtIHtcbiAgICAgICRzdHI6ICRzdHIgKyAnKG1pbi13aWR0aDogI3skYnB9KSc7XG4gICAgfVxuICB9XG5cbiAgQHJldHVybiAkc3RyO1xufVxuXG4vLy8gV3JhcHMgYSBtZWRpYSBxdWVyeSBhcm91bmQgdGhlIGNvbnRlbnQgeW91IHB1dCBpbnNpZGUgdGhlIG1peGluLiBUaGlzIG1peGluIGFjY2VwdHMgYSBudW1iZXIgb2YgdmFsdWVzOlxuLy8vICAtIElmIGEgc3RyaW5nIGlzIHBhc3NlZCwgdGhlIG1peGluIHdpbGwgbG9vayBmb3IgaXQgaW4gdGhlIGAkYnJlYWtwb2ludHNgIG1hcCwgYW5kIHVzZSBhIG1lZGlhIHF1ZXJ5IHRoZXJlLlxuLy8vICAtIElmIGEgcGl4ZWwgdmFsdWUgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0byBhbiBlbSB2YWx1ZSB1c2luZyBgJHJlbS1iYXNlYC5cbi8vLyAgLSBJZiBhIHJlbSB2YWx1ZSBpcyBwYXNzZWQsIHRoZSB1bml0IHdpbGwgYmUgY2hhbmdlZCB0byBlbS5cbi8vLyAgLSBJZiBhbiBlbSB2YWx1ZSBpcyBwYXNzZWQsIHRoZSB2YWx1ZSB3aWxsIGJlIHVzZWQgYXMtaXMuXG4vLy9cbi8vLyBAcGFyYW0ge0tleXdvcmR8TnVtYmVyfSAkdmFsdWUgLSBCcmVha3BvaW50IG5hbWUsIG9yIHB4LCByZW0sIG9yIGVtIHZhbHVlIHRvIHByb2Nlc3MuXG4vLy9cbi8vLyBAb3V0cHV0IElmIHRoZSBicmVha3BvaW50IGlzIFwiMHB4IGFuZCBsYXJnZXJcIiwgb3V0cHV0cyB0aGUgY29udGVudCBhcy1pcy4gT3RoZXJ3aXNlLCBvdXRwdXRzIHRoZSBjb250ZW50IHdyYXBwZWQgaW4gYSBtZWRpYSBxdWVyeS5cbkBtaXhpbiBicmVha3BvaW50KCR2YWx1ZSkge1xuICAkc3RyOiBicmVha3BvaW50KCR2YWx1ZSk7XG5cbiAgLy8gSWYgJHN0ciBpcyBzdGlsbCBhbiBlbXB0eSBzdHJpbmcsIG5vIG1lZGlhIHF1ZXJ5IGlzIG5lZWRlZFxuICBAaWYgJHN0ciA9PSAnJyB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cblxuICAvLyBPdGhlcndpc2UsIHdyYXAgdGhlIGNvbnRlbnQgaW4gYSBtZWRpYSBxdWVyeVxuICBAZWxzZSB7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgI3skc3RyfSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cblxuLy8vIENvbnZlcnMgdGhlIGJyZWFrcG9pbnRzIG1hcCB0byBhIFVSTC1lbmNvZGVkIHN0cmluZywgbGlrZSB0aGlzOiBga2V5MT12YWx1ZTEma2V5Mj12YWx1ZTJgLiBUaGUgdmFsdWUgaXMgdGhlbiBkcm9wcGVkIGludG8gdGhlIENTUyBmb3IgYSBzcGVjaWFsIGA8bWV0YT5gIHRhZywgd2hpY2ggaXMgcmVhZCBieSB0aGUgRm91bmRhdGlvbiBKYXZhU2NyaXB0LiBUaGlzIGlzIGhvdyB3ZSB0cmFuc2ZlciB2YWx1ZXMgZnJvbSBTYXNzIHRvIEphdmFTY3JpcHQsIHNvIHRoZXkgY2FuIGJlIGRlZmluZWQgaW4gb25lIHBsYWNlLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vXG4vLy8gQHBhcmFtIHtNYXB9ICRtYXAgLSBNYXAgdG8gY29udmVydC5cbi8vL1xuLy8vIEByZXR1cm5zIHtTdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIG1hcCdzIGNvbnRlbnRzLlxuQGZ1bmN0aW9uIC16Zi1icC1zZXJpYWxpemUoJG1hcCkge1xuICAkc3RyOiAnJztcbiAgQGVhY2ggJGtleSwgJHZhbHVlIGluICRtYXAge1xuICAgICRzdHI6ICRzdHIgKyAka2V5ICsgJz0nICsgLXpmLWJwLXRvLWVtKCR2YWx1ZSkgKyAnJic7XG4gIH1cbiAgJHN0cjogc3RyLXNsaWNlKCRzdHIsIDEsIC0yKTtcblxuICBAcmV0dXJuICRzdHI7XG59XG5cbi8vLyBGaW5kIHRoZSBuZXh0IGtleSBpbiBhIG1hcC5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vL1xuLy8vIEBwYXJhbSB7TWFwfSAkbWFwIC0gTWFwIHRvIHRyYXZlcnNlLlxuLy8vIEBwYXJhbSB7TWl4ZWR9ICRrZXkgLSBLZXkgdG8gdXNlIGFzIGEgc3RhcnRpbmcgcG9pbnQuXG4vLy9cbi8vLyBAcmV0dXJucyB7TWl4ZWR9IFRoZSB2YWx1ZSBmb3IgdGhlIGtleSBhZnRlciBgJGtleWAsIGlmIGAka2V5YCB3YXMgZm91bmQuIElmIGAka2V5YCB3YXMgbm90IGZvdW5kLCBvciBgJGtleWAgd2FzIHRoZSBsYXN0IHZhbHVlIGluIHRoZSBtYXAsIHJldHVybnMgYG51bGxgLlxuQGZ1bmN0aW9uIC16Zi1tYXAtbmV4dCgkbWFwLCAka2V5KSB7XG4gIC8vIFN0b3JlIHRoZSB2YWx1ZXMgb2YgdGhlIG1hcCBhcyBhIGxpc3QsIHNvIHdlIGNhbiBhY2Nlc3MgdGhlbSB3aXRoIG50aFxuICAkdmFsdWVzOiBtYXAtdmFsdWVzKCRtYXApO1xuXG4gIC8vIEdoZXR0byBmb3IgbG9vcFxuICAkaTogMTtcbiAgJGZvdW5kOiBmYWxzZTtcbiAgQGVhY2ggJHZhbCBpbiBtYXAta2V5cygkbWFwKSB7XG4gICAgQGlmICRmb3VuZCA9PSBmYWxzZSB7XG4gICAgICBAaWYgKCRrZXkgPT0gJHZhbCkge1xuICAgICAgICAkZm91bmQ6IHRydWU7XG4gICAgICB9XG4gICAgICAkaTogJGkgKyAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZSBrZXkgZG9lc24ndCBleGlzdCwgb3IgaXQncyB0aGUgbGFzdCBrZXkgaW4gdGhlIG1hcCwgcmV0dXJuIG51bGxcbiAgQGlmICRpID4gbGVuZ3RoKCRtYXApIHtcbiAgICBAcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gdGhlIHZhbHVlXG4gIEBlbHNlIHtcbiAgICBAcmV0dXJuIG50aCgkdmFsdWVzLCAkaSk7XG4gIH1cbn1cblxuLy8vIEdldCBhIHZhbHVlIGZvciBhIGJyZWFrcG9pbnQgZnJvbSBhIHJlc3BvbnNpdmUgY29uZmlnIG1hcC4gSWYgdGhlIGNvbmZpZyBtYXAgaGFzIHRoZSBrZXkgYCR2YWx1ZWAsIHRoZSBleGFjdCBicmVha3BvaW50IHZhbHVlIGlzIHJldHVybmVkLiBJZiB0aGUgY29uZmlnIG1hcCBkb2VzICpub3QqIGhhdmUgdGhlIGJyZWFrcG9pbnQsIHRoZSB2YWx1ZSBtYXRjaGluZyB0aGUgbmV4dCBsb3dlc3QgYnJlYWtwb2ludCBpbiB0aGUgY29uZmlnIG1hcCBpcyByZXR1cm5lZC5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vL1xuLy8vIEBwYXJhbSB7TWFwfSAkbWFwIC0gSW5wdXQgY29uZmlnIG1hcC5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICR2YWx1ZSAtIEJyZWFrcG9pbnQgbmFtZSB0byB1c2UuXG4vLy9cbi8vLyBAcmV0dXJuIHtNaXhlZH0gVGhlIGNvcnJlc3BvbmRpbmcgYnJlYWtwb2ludCB2YWx1ZS5cbkBmdW5jdGlvbiAtemYtZ2V0LWJwLXZhbCgkbWFwLCAkdmFsdWUpIHtcbiAgLy8gQ2hlY2sgaWYgdGhlIGJyZWFrcG9pbnQgbmFtZSBleGlzdHMgZ2xvYmFsbHlcbiAgQGlmIG5vdCBtYXAtaGFzLWtleSgkYnJlYWtwb2ludHMsICR2YWx1ZSkge1xuICAgIEByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBDaGVjayBpZiB0aGUgYnJlYWtwb2ludCBuYW1lIGV4aXN0cyBpbiB0aGUgbG9jYWwgY29uZmlnIG1hcFxuICBAZWxzZSBpZiBtYXAtaGFzLWtleSgkbWFwLCAkdmFsdWUpIHtcbiAgICAvLyBJZiBpdCBkb2VzLCBqdXN0IHJldHVybiB0aGUgdmFsdWVcbiAgICBAcmV0dXJuIG1hcC1nZXQoJG1hcCwgJHZhbHVlKTtcbiAgfVxuICAvLyBPdGhlcndpc2UsIGZpbmQgdGhlIG5leHQgbG93ZXN0IGJyZWFrcG9pbnQgYW5kIHJldHVybiB0aGF0IHZhbHVlXG4gIEBlbHNlIHtcbiAgICAkYW5jaG9yOiBudWxsO1xuICAgICRmb3VuZDogZmFsc2U7XG5cbiAgICBAZWFjaCAka2V5LCAkdmFsIGluICRicmVha3BvaW50cyB7XG4gICAgICBAaWYgbm90ICRmb3VuZCB7XG4gICAgICAgIEBpZiBtYXAtaGFzLWtleSgkbWFwLCAka2V5KSB7XG4gICAgICAgICAgJGFuY2hvcjogJGtleTtcbiAgICAgICAgfVxuICAgICAgICBAaWYgJGtleSA9PSAkdmFsdWUge1xuICAgICAgICAgICRmb3VuZDogdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEByZXR1cm4gbWFwLWdldCgkbWFwLCAkYW5jaG9yKTtcbiAgfVxufVxuXG4vLyBMZWdhY3kgYnJlYWtwb2ludCB2YXJpYWJsZXNcbi8vIFRoZXNlIHdpbGwgYmUgcmVtb3ZlZCBpbiA2LjJcbiRzbWFsbC11cDogbnVsbDtcbiRzbWFsbC1vbmx5OiBudWxsO1xuJG1lZGl1bS11cDogbnVsbDtcbiRtZWRpdW0tb25seTogbnVsbDtcbiRsYXJnZS11cDogbnVsbDtcbiRsYXJnZS1vbmx5OiBudWxsO1xuJHhsYXJnZS11cDogbnVsbDtcbiR4bGFyZ2Utb25seTogbnVsbDtcbiR4eGxhcmdlLXVwOiBudWxsO1xuJHh4bGFyZ2Utb25seTogbnVsbDtcblxuQGlmIG1hcC1oYXMta2V5KCRicmVha3BvaW50cywgc21hbGwpIHtcbiAgJHNtYWxsLXVwOiBzY3JlZW47XG4gICRzbWFsbC1vbmx5OiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludChzbWFsbCBvbmx5KX07XG59XG5cbkBpZiBtYXAtaGFzLWtleSgkYnJlYWtwb2ludHMsIG1lZGl1bSkge1xuICAkbWVkaXVtLXVwOiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludChtZWRpdW0pfTtcbiAgJG1lZGl1bS1vbmx5OiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludChtZWRpdW0gb25seSl9O1xufVxuXG5AaWYgbWFwLWhhcy1rZXkoJGJyZWFrcG9pbnRzLCBsYXJnZSkge1xuICAkbGFyZ2UtdXA6IHNjcmVlbiBhbmQgI3ticmVha3BvaW50KGxhcmdlKX07XG4gICRsYXJnZS1vbmx5OiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludChsYXJnZSBvbmx5KX07XG59XG5cbkBpZiBtYXAtaGFzLWtleSgkYnJlYWtwb2ludHMsIHhsYXJnZSkge1xuICAkeGxhcmdlLXVwOiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludCh4bGFyZ2UpfTtcbiAgJHhsYXJnZS1vbmx5OiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludCh4bGFyZ2Ugb25seSl9O1xufVxuXG5AaWYgbWFwLWhhcy1rZXkoJGJyZWFrcG9pbnRzLCB4eGxhcmdlKSB7XG4gICR4eGxhcmdlLXVwOiBzY3JlZW4gYW5kICN7YnJlYWtwb2ludCh4eGxhcmdlKX07XG4gICR4eGxhcmdlLW9ubHk6IHNjcmVlbiBhbmQgI3ticmVha3BvaW50KHh4bGFyZ2Ugb25seSl9O1xufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZnVuY3Rpb25zXG4vLy8vXG5cbi8vLyBDcmVhdGVzIGEgQ1NTIHRyaWFuZ2xlLCB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZHJvcGRvd24gYXJyb3dzLCBkcm9wZG93biBwaXBzLCBhbmQgbW9yZS4gVXNlIHRoaXMgbWl4aW4gaW5zaWRlIGEgYCY6OmJlZm9yZWAgb3IgYCY6OmFmdGVyYCBzZWxlY3RvciwgdG8gYXR0YWNoIHRoZSB0cmlhbmdsZSB0byBhbiBleGlzdGluZyBlbGVtZW50LlxuLy8vXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICR0cmlhbmdsZS1zaXplIC0gV2lkdGggb2YgdGhlIHRyaWFuZ2xlLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICR0cmlhbmdsZS1jb2xvciAtIENvbG9yIG9mIHRoZSB0cmlhbmdsZS5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICR0cmlhbmdsZS1kaXJlY3Rpb24gLSBEaXJlY3Rpb24gdGhlIHRyaWFuZ2xlIHBvaW50cy4gQ2FuIGJlIGB1cGAsIGByaWdodGAsIGBkb3duYCwgb3IgYGxlZnRgLlxuQG1peGluIGNzcy10cmlhbmdsZShcbiAgJHRyaWFuZ2xlLXNpemUsXG4gICR0cmlhbmdsZS1jb2xvcixcbiAgJHRyaWFuZ2xlLWRpcmVjdGlvblxuKSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyOiBpbnNldCAkdHJpYW5nbGUtc2l6ZTtcblxuICBAaWYgKCR0cmlhbmdsZS1kaXJlY3Rpb24gPT0gZG93bikge1xuICAgIGJvcmRlci1jb2xvcjogJHRyaWFuZ2xlLWNvbG9yIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci10b3Atc3R5bGU6IHNvbGlkO1xuICB9XG4gIEBpZiAoJHRyaWFuZ2xlLWRpcmVjdGlvbiA9PSB1cCkge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgJHRyaWFuZ2xlLWNvbG9yO1xuICAgIGJvcmRlci1ib3R0b20tc3R5bGU6IHNvbGlkO1xuICB9XG4gIEBpZiAoJHRyaWFuZ2xlLWRpcmVjdGlvbiA9PSByaWdodCkge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgJHRyaWFuZ2xlLWNvbG9yO1xuICAgIGJvcmRlci1sZWZ0LXN0eWxlOiBzb2xpZDtcbiAgfVxuICBAaWYgKCR0cmlhbmdsZS1kaXJlY3Rpb24gPT0gbGVmdCkge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgJHRyaWFuZ2xlLWNvbG9yIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yaWdodC1zdHlsZTogc29saWQ7XG4gIH1cbn1cblxuLy8vIENyZWF0ZXMgYSBtZW51IGljb24gd2l0aCBhIHNldCB3aWR0aCwgaGVpZ2h0LCBudW1iZXIgb2YgYmFycywgYW5kIGNvbG9ycy4gVGhlIG1peGluIHVzZXMgdGhlIGhlaWdodCBvZiB0aGUgaWNvbiBhbmQgdGhlIHdlaWdodCBvZiB0aGUgYmFycyB0byBkZXRlcm1pbmUgc3BhY2luZy4gPGRpdiBjbGFzcz1cImRvY3MtZXhhbXBsZS1idXJnZXJcIj48L2Rpdj5cbi8vL1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciAtIENvbG9yIHRvIHVzZSBmb3IgdGhlIGljb24uXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yLWhvdmVyIC0gQ29sb3IgdG8gdXNlIHdoZW4gdGhlIGljb24gaXMgaG92ZXJlZCBvdmVyLlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkd2lkdGggLSBXaWR0aCBvZiB0aGUgaWNvbi5cbi8vLyBAcGFyYW0ge051bWJlcn0gJGhlaWdodCAtIEhlaWdodCBvZiB0aGUgaWNvbi5cbi8vLyBAcGFyYW0ge051bWJlcn0gJHdlaWdodCAtIEhlaWdodCBvZiBpbmRpdmlkdWFsIGJhcnMgaW4gdGhlIGljb24uXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRiYXJzIC0gTnVtYmVyIG9mIGJhcnMgaW4gdGhlIGljb24uXG5AbWl4aW4gaGFtYnVyZ2VyKFxuICAkY29sb3I6ICMwMDAsXG4gICRjb2xvci1ob3ZlcjogIzY2NixcbiAgJHdpZHRoOiAyMHB4LFxuICAkaGVpZ2h0OiAxNnB4LFxuICAkd2VpZ2h0OiAycHgsXG4gICRiYXJzOiAzXG4pIHtcbiAgLy8gYm94LXNoYWRvdyBDU1Mgb3V0cHV0XG4gICRzaGFkb3c6ICgpO1xuICAkaG92ZXItc2hhZG93OiAoKTtcblxuICAvLyBTcGFjaW5nIGJldHdlZW4gYmFycyBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSB0b3RhbCBoZWlnaHQgb2YgdGhlIGljb24gYW5kIHRoZSB3ZWlnaHQgb2YgZWFjaCBiYXJcbiAgJHNwYWNpbmc6IGZsb29yKCgkaGVpZ2h0IC0gKCR3ZWlnaHQgKiAkYmFycykpIC8gKCRiYXJzIC0gMSkpO1xuXG4gIC8vIEljb24gY29udGFpbmVyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdpZHRoOiAkd2lkdGg7XG4gIGhlaWdodDogJGhlaWdodDtcblxuICAvLyBJY29uIGJhcnNcbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6ICR3ZWlnaHQ7XG4gICAgYmFja2dyb3VuZDogJGNvbG9yO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuXG4gICAgQGZvciAkaSBmcm9tIDIgdGhyb3VnaCAkYmFycyB7XG4gICAgICAkb2Zmc2V0OiAoJHdlaWdodCArICRzcGFjaW5nKSAqICgkaSAtIDEpO1xuICAgICAgJHNoYWRvdzogYXBwZW5kKCRzaGFkb3csIDAgJG9mZnNldCAwICRjb2xvciwgY29tbWEpO1xuICAgIH1cblxuICAgIGJveC1zaGFkb3c6ICRzaGFkb3c7XG4gIH1cblxuICAvLyBIb3ZlciBzdGF0ZVxuICBAaWYgJGNvbG9yLWhvdmVyIHtcbiAgICAvLyBHZW5lcmF0ZSBDU1NcbiAgICBAZm9yICRpIGZyb20gMiB0aHJvdWdoICRiYXJzIHtcbiAgICAgICRvZmZzZXQ6ICgkd2VpZ2h0ICsgJHNwYWNpbmcpICogKCRpIC0gMSk7XG4gICAgICAkaG92ZXItc2hhZG93OiBhcHBlbmQoJGhvdmVyLXNoYWRvdywgMCAkb2Zmc2V0IDAgJGNvbG9yLWhvdmVyLCBjb21tYSk7XG4gICAgfVxuXG4gICAgJjpob3Zlcjo6YWZ0ZXIge1xuICAgICAgYmFja2dyb3VuZDogJGNvbG9yLWhvdmVyO1xuICAgICAgYm94LXNoYWRvdzogJGhvdmVyLXNoYWRvdztcbiAgICB9XG4gIH1cbn1cblxuLy8vIEFkZHMgYSBkb3dud2FyZC1mYWNpbmcgdHJpYW5nbGUgYXMgYSBiYWNrZ3JvdW5kIGltYWdlIHRvIGFuIGVsZW1lbnQuIFRoZSBpbWFnZSBpcyBmb3JtYXR0ZWQgYXMgYW4gU1ZHLCBtYWtpbmcgaXQgZWFzeSB0byBjaGFuZ2UgdGhlIGNvbG9yLiBCZWNhdXNlIEludGVybmV0IEV4cGxvcmVyIGRvZXNuJ3Qgc3VwcG9ydCBlbmNvZGVkIFNWR3MgYXMgYmFja2dyb3VuZCBpbWFnZXMsIGEgUE5HIGZhbGxiYWNrIGlzIGFsc28gaW5jbHVkZWQuXG4vLy8gVGhlcmUgYXJlIHR3byBQTkcgZmFsbGJhY2tzOiBhIGJsYWNrIHRyaWFuZ2xlIGFuZCBhIHdoaXRlIHRyaWFuZ2xlLiBUaGUgb25lIHVzZWQgZGVwZW5kcyBvbiB0aGUgbGlnaHRuZXNzIG9mIHRoZSBpbnB1dCBjb2xvci5cbi8vL1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciBbJGJsYWNrXSAtIENvbG9yIHRvIHVzZSBmb3IgdGhlIHRyaWFuZ2xlLlxuQG1peGluIGJhY2tncm91bmQtdHJpYW5nbGUoJGNvbG9yOiAkYmxhY2spIHtcbiAgJHJnYjogJ3JnYiUyOCN7cmVkKCRjb2xvcil9LCAje2dyZWVuKCRjb2xvcil9LCAje2JsdWUoJGNvbG9yKX0lMjknO1xuXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMzIgMjRcIj48cG9seWdvbiBwb2ludHM9XCIwLDAgMzIsMCAxNiwyNFwiIHN0eWxlPVwiZmlsbDogI3skcmdifVwiPjwvcG9seWdvbj48L3N2Zz4nKTtcblxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjBcXDApIHtcbiAgICBAaWYgbGlnaHRuZXNzKCRjb2xvcikgPCA1MCUge1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQVlDQVlBQUFDYlUvODBBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQUlwSlJFRlVlTnJFa2NrTmdEQU1CQmZSa0V0ME9iUkJCZHNHWFVEZ21RZks0WGhIMm04Y3pRQUF5MjdSM3RzdzRRZmUyeDh1T082b1lMYjZHbE9vcjNHRitzd1VSQU9tVUorUnd0RUpzOVd2VEdFWXhCWHFJMU1RQVpoQ2ZVUUtSekRNVmorVHdyQUlWNmp2U1VFa1lBcjFMU2tjeVRCYi9WK0tZZlg3eEFldXNxM3NMRHRHSDNrRUdBQ1BXSWZsTlpmaFJRQUFBQUJKUlU1RXJrSmdnZz09Jyk7XG4gICAgfVxuICAgIEBlbHNlIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFZQ0FZQUFBQ2JVLzgwQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFNQkpSRUZVZU5yRWxsc09oQ0FNUlZzekM5SWx6VTdLQ21WSFRKc29NV1lNVXRweXY5QmdidVhRQjVaU2RnQllZWTR5Y2dCaXZrOEtZRnNRTWZNaVRUQlA0bzNuVXpDS3pPYWJMSmJMeTIvZzMxZXZHa0FnaW5SNC9aZWdLSDVxWDNiSkNzY0EzdDB4M2tnTzV0UUZ5aGhGZjUweFJxRkxieU1VTkpRemd5akdTL3dnQ3B2S3FrUkJwdVdyRTRWOWQrMUU0ZFBVWHFJZzEwN1NRT0UvMkRSUXhNd1REeWdJSW5WREVUOVQzbENvai82ai9WQ21HalpPbDJsS3BaOEFBd0RRUDd6SWltREdGUUFBQUFCSlJVNUVya0pnZ2c9PScpO1xuICAgIH1cbiAgfVxufVxuXG4vLy8gQXBwbGllcyB0aGUgbWljcm8gY2xlYXJmaXggaGFjayBwb3B1bGFyaXplZCBieSBOaWNvbGFzIEdhbGxhZ2hlci4gSW5jbHVkZSB0aGlzIG1peGluIG9uIGEgY29udGFpbmVyIGlmIGl0cyBjaGlsZHJlbiBhcmUgYWxsIGZsb2F0ZWQsIHRvIGdpdmUgdGhlIGNvbnRhaW5lciBhIHByb3BlciBoZWlnaHQuXG4vLy8gQGxpbmsgaHR0cDovL25pY29sYXNnYWxsYWdoZXIuY29tL21pY3JvLWNsZWFyZml4LWhhY2svIE1pY3JvIENsZWFyZml4IEhhY2tcbkBtaXhpbiBjbGVhcmZpeCB7XG4gICY6OmJlZm9yZSxcbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcgJztcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgfVxuXG4gICY6OmFmdGVyIHtcbiAgICBjbGVhcjogYm90aDtcbiAgfVxufVxuXG4vLy8gQWRkcyBDU1MgZm9yIGEgXCJxdWFudGl0eSBxdWVyeVwiIHNlbGVjdG9yIHRoYXQgYXV0b21hdGljYWxseSBzaXplcyBlbGVtZW50cyBiYXNlZCBvbiBob3cgbWFueSB0aGVyZSBhcmUgaW5zaWRlIGEgY29udGFpbmVyLlxuLy8vIEBsaW5rIGh0dHA6Ly9hbGlzdGFwYXJ0LmNvbS9hcnRpY2xlL3F1YW50aXR5LXF1ZXJpZXMtZm9yLWNzcyBRdWFudGl0eSBRdWVyaWVzIGZvciBDU1Ncbi8vL1xuLy8vIEBwYXJhbSB7TnVtYmVyfSAkbWF4IC0gTWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gZGV0ZWN0LiBUaGUgaGlnaGVyIHRoaXMgbnVtYmVyIGlzLCB0aGUgbW9yZSBDU1MgdGhhdCdzIHJlcXVpcmVkIHRvIGNvdmVyIGVhY2ggbnVtYmVyIG9mIGl0ZW1zLlxuLy8vIEBwYXJhbSB7S2V5d29yZH0gJGVsZW0gW2xpXSAtIFRhZyB0byB1c2UgZm9yIHNpYmxpbmcgc2VsZWN0b3JzLlxuQG1peGluIGF1dG8td2lkdGgoJG1heCwgJGVsZW06IGxpKSB7XG4gIEBmb3IgJGkgZnJvbSAyIHRocm91Z2ggJG1heCB7XG4gICAgJjpudGgtbGFzdC1jaGlsZCgjeyRpfSk6Zmlyc3QtY2hpbGQsXG4gICAgJjpudGgtbGFzdC1jaGlsZCgjeyRpfSk6Zmlyc3QtY2hpbGQgfiAjeyRlbGVtfSB7XG4gICAgICB3aWR0aDogcGVyY2VudGFnZSgxIC8gJGkpO1xuICAgIH1cbiAgfVxufVxuXG4vLy8gUmVtb3ZlcyB0aGUgZm9jdXMgcmluZyBhcm91bmQgYW4gZWxlbWVudCB3aGVuIGEgbW91c2UgaW5wdXQgaXMgZGV0ZWN0ZWQuXG5AbWl4aW4gZGlzYWJsZS1tb3VzZS1vdXRsaW5lIHtcbiAgW2RhdGEtd2hhdGlucHV0PSdtb3VzZSddICYge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbn1cblxuLy8vIE1ha2VzIGFuIGVsZW1lbnQgdmlzdWFsbHkgaGlkZGVuLCBidXQgc3RpbGwgYWNjZXNzaWJsZSB0byBrZXlib2FyZHMgYW5kIGFzc2lzdGl2ZSBkZXZpY2VzLlxuLy8vIEBsaW5rIGh0dHA6Ly9zbm9vay5jYS9hcmNoaXZlcy9odG1sX2FuZF9jc3MvaGlkaW5nLWNvbnRlbnQtZm9yLWFjY2Vzc2liaWxpdHkgSGlkaW5nIENvbnRlbnQgZm9yIEFjY2Vzc2liaWxpdHlcbkBtaXhpbiBlbGVtZW50LWludmlzaWJsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbn1cblxuLy8vIFJldmVyc2VzIHRoZSBDU1Mgb3V0cHV0IGNyZWF0ZWQgYnkgdGhlIGBlbGVtZW50LWludmlzaWJsZSgpYCBtaXhpbi5cbkBtaXhpbiBlbGVtZW50LWludmlzaWJsZS1vZmYge1xuICBwb3NpdGlvbjogc3RhdGljICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogYXV0bztcbiAgd2lkdGg6IGF1dG87XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICBjbGlwOiBhdXRvO1xufVxuXG4vLy8gVmVydGljYWxseSBjZW50ZXJzIHRoZSBlbGVtZW50IGluc2lkZSBvZiBpdHMgZmlyc3Qgbm9uLXN0YXRpYyBwYXJlbnQsXG4vLy8gQGxpbmsgaHR0cDovL3d3dy5zaXRlcG9pbnQuY29tL2NlbnRlcmluZy13aXRoLXNhc3MvIENlbnRlcmluZyBXaXRoIFNhc3NcbkBtaXhpbiB2ZXJ0aWNhbC1jZW50ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbi8vLyBIb3Jpem9udGFsbHkgY2VudGVycyB0aGUgZWxlbWVudCBpbnNpZGUgb2YgaXRzIGZpcnN0IG5vbi1zdGF0aWMgcGFyZW50LFxuLy8vIEBsaW5rIGh0dHA6Ly93d3cuc2l0ZXBvaW50LmNvbS9jZW50ZXJpbmctd2l0aC1zYXNzLyBDZW50ZXJpbmcgV2l0aCBTYXNzXG5AbWl4aW4gaG9yaXpvbnRhbC1jZW50ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xufVxuXG4vLy8gQWJzb2x1dGVseSBjZW50ZXJzIHRoZSBlbGVtZW50IGluc2lkZSBvZiBpdHMgZmlyc3Qgbm9uLXN0YXRpYyBwYXJlbnQsXG4vLy8gQGxpbmsgaHR0cDovL3d3dy5zaXRlcG9pbnQuY29tL2NlbnRlcmluZy13aXRoLXNhc3MvIENlbnRlcmluZyBXaXRoIFNhc3NcbkBtaXhpbiBhYnNvbHV0ZS1jZW50ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xufVxuXG4vLy8gSXRlcmF0ZXMgdGhyb3VnaCBicmVha3BvaW50cyBkZWZpbmVkIGluIGAkYnJlYWtwb2ludC1jbGFzc2VzYCBhbmQgcHJpbnRzIHRoZSBDU1MgaW5zaWRlIHRoZSBtaXhpbiBhdCBlYWNoIGJyZWFrcG9pbnQncyBtZWRpYSBxdWVyeS4gVXNlIHRoaXMgd2l0aCB0aGUgZ3JpZCwgb3IgYW55IG90aGVyIGNvbXBvbmVudCB0aGF0IGhhcyByZXNwb25zaXZlIGNsYXNzZXMuXG4vLy9cbi8vLyBAcGFyYW0ge0Jvb2xlYW59ICRzbWFsbCBbdHJ1ZV0gLSBJZiBgZmFsc2VgLCB0aGUgbWl4aW4gd2lsbCBza2lwIHRoZSBgc21hbGxgIGJyZWFrcG9pbnQuIFVzZSB0aGlzIHdpdGggY29tcG9uZW50cyB0aGF0IGRvbid0IHByZWZpeCBjbGFzc2VzIHdpdGggYHNtYWxsLWAsIG9ubHkgYG1lZGl1bS1gIGFuZCB1cC5cbkBtaXhpbiAtemYtZWFjaC1icmVha3BvaW50KCRzbWFsbDogdHJ1ZSkge1xuICAkbWFwOiAkYnJlYWtwb2ludC1jbGFzc2VzO1xuXG4gIEBpZiBub3QgJHNtYWxsIHtcbiAgICAkbWFwOiBtYXAtcmVtb3ZlKCRtYXAsIHNtYWxsKTtcbiAgfVxuXG4gIEBlYWNoICRzaXplIGluICRtYXAge1xuICAgICQtemYtc2l6ZTogJHNpemUgIWdsb2JhbDtcblxuICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJHNpemUpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vIHNjc3MtbGludDpkaXNhYmxlIENvbG9yVmFyaWFibGUsIFF1YWxpZnlpbmdFbGVtZW50LCBWZW5kb3JQcmVmaXhcblxuLy8vL1xuLy8vIEBncm91cCBnbG9iYWxcbi8vLy9cblxuLy8vIEZvbnQgc2l6ZSBhdHRyaWJ1dGUgYXBwbGllZCB0byBgPGh0bWw+YCBhbmQgYDxib2R5PmAuIFdlIHVzZSAxMDAlIGJ5IGRlZmF1bHQgc28gdGhlIHZhbHVlIGlzIGluaGVyaXRlZCBmcm9tIHRoZSB1c2VyJ3MgYnJvd3NlciBzZXR0aW5ncy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRnbG9iYWwtZm9udC1zaXplOiAxMDAlICFkZWZhdWx0O1xuXG4vLy8gR2xvYmFsIHdpZHRoIG9mIHlvdXIgc2l0ZS4gVXNlZCBieSB0aGUgZ3JpZCB0byBkZXRlcm1pbmUgcm93IHdpZHRoLlxuLy8vIEB0eXBlIE51bWJlclxuJGdsb2JhbC13aWR0aDogcmVtLWNhbGMoMTIwMCkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGxpbmUgaGVpZ2h0IGZvciBhbGwgdHlwZS4gYCRnbG9iYWwtbGluZWhlaWdodGAgaXMgMjRweCB3aGlsZSBgJGdsb2JhbC1mb250LXNpemVgIGlzIDE2cHhcbi8vLyBAdHlwZSBOdW1iZXJcbiRnbG9iYWwtbGluZWhlaWdodDogMS41ICFkZWZhdWx0O1xuXG4vLy8gUHJpbWFyeSBjb2xvciBmb3IgaW50ZXJhY3RpdmUgY29tcG9uZW50cyBsaWtlIGxpbmtzIGFuZCBidXR0b25zLlxuLy8vIEB0eXBlIENvbG9yXG4kcHJpbWFyeS1jb2xvcjogIzIxOTllOCAhZGVmYXVsdDtcblxuLy8vIFNlY29uZGFyeSBjb2xvciwgdXNlZCB3aXRoIGNvbXBvbmVudHMgdGhhdCBzdXBwb3J0IHRoZSBgLnNlY29uZGFyeWAgY2xhc3MuXG4vLy8gQHR5cGUgQ29sb3JcbiRzZWNvbmRhcnktY29sb3I6ICM3NzcgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciB0byBpbmRpY2F0ZSBhIHBvc2l0aXZlIHN0YXR1cyBvciBhY3Rpb24sIHVzZWQgd2l0aCB0aGUgYC5zdWNjZXNzYCBjbGFzcy5cbi8vLyBAdHlwZSBDb2xvclxuJHN1Y2Nlc3MtY29sb3I6ICMzYWRiNzYgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciB0byBpbmRpY2F0ZSBhIGNhdXRpb24gc3RhdHVzIG9yIGFjdGlvbiwgdXNlZCB3aXRoIHRoZSBgLndhcm5pbmdgIGNsYXNzLlxuLy8vIEB0eXBlIENvbG9yXG4kd2FybmluZy1jb2xvcjogI2ZmYWUwMCAhZGVmYXVsdDtcblxuLy8vIENvbG9yIHRvIGluZGljYXRlIGEgbmVnYXRpdmUgc3RhdHVzIG9yIGFjdGlvbiwgdXNlZCB3aXRoIHRoZSBgLmFsZXJ0YCBjbGFzcy5cbi8vLyBAdHlwZSBDb2xvclxuJGFsZXJ0LWNvbG9yOiAjZWM1ODQwICFkZWZhdWx0O1xuXG4vLy8gQ29sb3IgdXNlZCBmb3IgbGlnaHQgZ3JheSBVSSBpdGVtcy5cbi8vLyBAdHlwZSBDb2xvclxuJGxpZ2h0LWdyYXk6ICNlNmU2ZTYgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciB1c2VkIGZvciBtZWRpdW0gZ3JheSBVSSBpdGVtcy5cbi8vLyBAdHlwZSBDb2xvclxuJG1lZGl1bS1ncmF5OiAjY2FjYWNhICFkZWZhdWx0O1xuXG4vLy8gQ29sb3IgdXNlZCBmb3IgZGFyayBncmF5IFVJIGl0ZW1zLlxuLy8vIEB0eXBlIENvbG9yXG4kZGFyay1ncmF5OiAjOGE4YThhICFkZWZhdWx0O1xuXG4vLy8gQ29sb3IgdXNlZCBmb3IgYmxhY2sgdWkgaXRlbXMuXG4vLy8gQHR5cGUgQ29sb3JcbiRibGFjazogIzBhMGEwYSAhZGVmYXVsdDtcblxuLy8vIENvbG9yIHVzZWQgZm9yIHdoaXRlIHVpIGl0ZW1zLlxuLy8vIEB0eXBlIENvbG9yXG4kd2hpdGU6ICNmZWZlZmUgIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBib2R5LlxuLy8vIEB0eXBlIENvbG9yXG4kYm9keS1iYWNrZ3JvdW5kOiAkd2hpdGUgIWRlZmF1bHQ7XG5cbi8vLyBUZXh0IGNvbG9yIG9mIHRoZSBib2R5LlxuLy8vIEB0eXBlIENvbG9yXG4kYm9keS1mb250LWNvbG9yOiAkYmxhY2sgIWRlZmF1bHQ7XG5cbi8vLyBGb250IHN0YWNrIG9mIHRoZSBib2R5LlxuLy8vIEB0eXBlIExpc3RcbiRib2R5LWZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIFJvYm90bywgQXJpYWwsIHNhbnMtc2VyaWYgIWRlZmF1bHQ7XG5cbi8vLyBTZXQgdG8gYHRydWVgIHRvIGVuYWJsZSBhbnRpYWxpYXNlZCB0eXBlLCB1c2luZyB0aGUgYC13ZWJraXQtZm9udC1zbW9vdGhpbmdgIGFuZCBgLW1vei1vc3gtZm9udC1zbW9vdGhpbmdgIENTUyBwcm9wZXJ0aWVzLlxuLy8vIEB0eXBlIEJvb2xlYW5cbiRib2R5LWFudGlhbGlhc2VkOiB0cnVlICFkZWZhdWx0O1xuXG4vLy8gR2xvYmFsIHZhbHVlIHVzZWQgZm9yIG1hcmdpbiBvbiBjb21wb25lbnRzLlxuLy8vIEB0eXBlIE51bWJlclxuJGdsb2JhbC1tYXJnaW46IDFyZW0gIWRlZmF1bHQ7XG5cbi8vLyBHbG9iYWwgdmFsdWUgdXNlZCBmb3IgcGFkZGluZyBvbiBjb21wb25lbnRzLlxuLy8vIEB0eXBlIE51bWJlclxuJGdsb2JhbC1wYWRkaW5nOiAxcmVtICFkZWZhdWx0O1xuXG4vLy8gR2xvYmFsIGZvbnQgd2VpZ2h0IHVzZWQgZm9yIG5vcm1hbCB0eXBlLlxuLy8vIEB0eXBlIEtleXdvcmQgfCBOdW1iZXJcbiRnbG9iYWwtd2VpZ2h0LW5vcm1hbDogbm9ybWFsICFkZWZhdWx0O1xuXG4vLy8gR2xvYmFsIGZvbnQgd2VpZ2h0IHVzZWQgZm9yIGJvbGQgdHlwZS5cbi8vLyBAdHlwZSBLZXl3b3JkIHwgTnVtYmVyXG4kZ2xvYmFsLXdlaWdodC1ib2xkOiBib2xkICFkZWZhdWx0O1xuXG4vLy8gR2xvYmFsIHZhbHVlIHVzZWQgZm9yIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgYSBib3JkZXIgcmFkaXVzLlxuLy8vIEB0eXBlIE51bWJlclxuJGdsb2JhbC1yYWRpdXM6IDAgIWRlZmF1bHQ7XG5cbi8vLyBTZXRzIHRoZSB0ZXh0IGRpcmVjdGlvbiBvZiB0aGUgQ1NTLiBDYW4gYmUgZWl0aGVyIGBsdHJgIG9yIGBydGxgLlxuJGdsb2JhbC10ZXh0LWRpcmVjdGlvbjogbHRyICFkZWZhdWx0O1xuXG4vLyBJbnRlcm5hbCB2YXJpYWJsZXMgdXNlZCBmb3IgdGV4dCBkaXJlY3Rpb25cbiRnbG9iYWwtbGVmdDogaWYoJGdsb2JhbC10ZXh0LWRpcmVjdGlvbiA9PSBydGwsIHJpZ2h0LCBsZWZ0KTtcbiRnbG9iYWwtcmlnaHQ6IGlmKCRnbG9iYWwtdGV4dC1kaXJlY3Rpb24gPT0gcnRsLCBsZWZ0LCByaWdodCk7XG5cbi8vIEludGVybmFsIG1hcCB1c2VkIHRvIGl0ZXJhdGUgdGhyb3VnaCBjb2xvcnMsIHRvIGdlbmVyYXRlIENTUyBjbGFzc2VzIHdpdGggbGVzcyBjb2RlXG4kZm91bmRhdGlvbi1jb2xvcnM6IChcbiAgcHJpbWFyeTogJHByaW1hcnktY29sb3IsXG4gIHNlY29uZGFyeTogJHNlY29uZGFyeS1jb2xvcixcbiAgc3VjY2VzczogJHN1Y2Nlc3MtY29sb3IsXG4gIGFsZXJ0OiAkYWxlcnQtY29sb3IsXG4gIHdhcm5pbmc6ICR3YXJuaW5nLWNvbG9yLFxuKSAhZGVmYXVsdDtcblxuQG1peGluIGZvdW5kYXRpb24tZ2xvYmFsLXN0eWxlcyB7XG4gIEBpbmNsdWRlIC16Zi1ub3JtYWxpemU7XG5cbiAgLy8gVGhlc2Ugc3R5bGVzIGFyZSBhcHBsaWVkIHRvIGEgPG1ldGE+IHRhZywgd2hpY2ggaXMgcmVhZCBieSB0aGUgRm91bmRhdGlvbiBKYXZhU2NyaXB0XG4gIC5mb3VuZGF0aW9uLW1xIHtcbiAgICBmb250LWZhbWlseTogJyN7LXpmLWJwLXNlcmlhbGl6ZSgkYnJlYWtwb2ludHMpfSc7XG4gIH1cblxuICBodG1sIHtcbiAgICBmb250LXNpemU6ICRnbG9iYWwtZm9udC1zaXplO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICAvLyBTZXQgYm94LXNpemluZyBnbG9iYWxseSB0byBoYW5kbGUgcGFkZGluZyBhbmQgYm9yZGVyIHdpZHRoc1xuICAqLFxuICAqOmJlZm9yZSxcbiAgKjphZnRlciB7XG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgfVxuXG4gIC8vIERlZmF1bHQgYm9keSBzdHlsZXNcbiAgYm9keSB7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1mYW1pbHk6ICRib2R5LWZvbnQtZmFtaWx5O1xuICAgIGZvbnQtd2VpZ2h0OiAkZ2xvYmFsLXdlaWdodC1ub3JtYWw7XG4gICAgbGluZS1oZWlnaHQ6ICRnbG9iYWwtbGluZWhlaWdodDtcbiAgICBjb2xvcjogJGJvZHktZm9udC1jb2xvcjtcbiAgICBiYWNrZ3JvdW5kOiAkYm9keS1iYWNrZ3JvdW5kO1xuXG4gICAgQGlmICgkYm9keS1hbnRpYWxpYXNlZCkge1xuICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICAgIH1cbiAgfVxuXG4gIGltZyB7XG4gICAgLy8gR3JpZCBkZWZhdWx0cyB0byBnZXQgaW1hZ2VzIGFuZCBlbWJlZHMgdG8gd29yayBwcm9wZXJseVxuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgLW1zLWludGVycG9sYXRpb24tbW9kZTogYmljdWJpYztcblxuICAgIC8vIEdldCByaWQgb2YgZ2FwIHVuZGVyIGltYWdlcyBieSBtYWtpbmcgdGhlbSBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGJ5IGRlZmF1bHRcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSB0YWtlcyBvbiBoZWlnaHQgYXV0b21hdGljYWxseVxuICB0ZXh0YXJlYSB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogJGdsb2JhbC1yYWRpdXM7XG4gIH1cblxuICAvLyBNYWtlIHNlbGVjdCBlbGVtZW50cyBhcmUgMTAwJSB3aWR0aCBieSBkZWZhdWx0XG4gIHNlbGVjdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogJGdsb2JhbC1yYWRpdXM7XG4gIH1cblxuICAvLyBTdHlsZXMgR29vZ2xlIE1hcHMgYW5kIE1hcFF1ZXN0IGVtYmVkcyBwcm9wZXJseVxuICAvLyBzY3NzLWxpbnQ6ZGlzYWJsZSBJZFNlbGVjdG9yXG4gICNtYXBfY2FudmFzLFxuICAubWFwX2NhbnZhcyxcbiAgLm1xYS1kaXNwbGF5IHtcbiAgICBpbWcsXG4gICAgZW1iZWQsXG4gICAgb2JqZWN0IHtcbiAgICAgIG1heC13aWR0aDogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlc2V0IDxidXR0b24+IHN0eWxlcyBjcmVhdGVkIGJ5IG1vc3QgYnJvd3NlcnNcbiAgYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuICB9XG59XG5cbi8vLyBMb2FkcyBub3JtYWxpemUuY3NzLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuQG1peGluIC16Zi1ub3JtYWxpemUge1xuICAvKiEgbm9ybWFsaXplLmNzcyB2My4wLjMgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXG5cbiAgLyoqXG4gICAqIDEuIFNldCBkZWZhdWx0IGZvbnQgZmFtaWx5IHRvIHNhbnMtc2VyaWYuXG4gICAqIDIuIFByZXZlbnQgaU9TIGFuZCBJRSB0ZXh0IHNpemUgYWRqdXN0IGFmdGVyIGRldmljZSBvcmllbnRhdGlvbiBjaGFuZ2UsXG4gICAqICAgIHdpdGhvdXQgZGlzYWJsaW5nIHVzZXIgem9vbS5cbiAgICovXG5cbiAgaHRtbCB7XG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IC8qIDEgKi9cbiAgICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xuICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBkZWZhdWx0IG1hcmdpbi5cbiAgICovXG5cbiAgYm9keSB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgLyogSFRNTDUgZGlzcGxheSBkZWZpbml0aW9uc1xuICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIC8qKlxuICAgKiBDb3JyZWN0IGBibG9ja2AgZGlzcGxheSBub3QgZGVmaW5lZCBmb3IgYW55IEhUTUw1IGVsZW1lbnQgaW4gSUUgOC85LlxuICAgKiBDb3JyZWN0IGBibG9ja2AgZGlzcGxheSBub3QgZGVmaW5lZCBmb3IgYGRldGFpbHNgIG9yIGBzdW1tYXJ5YCBpbiBJRSAxMC8xMVxuICAgKiBhbmQgRmlyZWZveC5cbiAgICogQ29ycmVjdCBgYmxvY2tgIGRpc3BsYXkgbm90IGRlZmluZWQgZm9yIGBtYWluYCBpbiBJRSAxMS5cbiAgICovXG5cbiAgYXJ0aWNsZSxcbiAgYXNpZGUsXG4gIGRldGFpbHMsXG4gIGZpZ2NhcHRpb24sXG4gIGZpZ3VyZSxcbiAgZm9vdGVyLFxuICBoZWFkZXIsXG4gIGhncm91cCxcbiAgbWFpbixcbiAgbWVudSxcbiAgbmF2LFxuICBzZWN0aW9uLFxuICBzdW1tYXJ5IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC8qKlxuICAgKiAxLiBDb3JyZWN0IGBpbmxpbmUtYmxvY2tgIGRpc3BsYXkgbm90IGRlZmluZWQgaW4gSUUgOC85LlxuICAgKiAyLiBOb3JtYWxpemUgdmVydGljYWwgYWxpZ25tZW50IG9mIGBwcm9ncmVzc2AgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gICAqL1xuXG4gIGF1ZGlvLFxuICBjYW52YXMsXG4gIHByb2dyZXNzLFxuICB2aWRlbyB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyAvKiAxICovXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXG4gIH1cblxuICAvKipcbiAgICogUHJldmVudCBtb2Rlcm4gYnJvd3NlcnMgZnJvbSBkaXNwbGF5aW5nIGBhdWRpb2Agd2l0aG91dCBjb250cm9scy5cbiAgICogUmVtb3ZlIGV4Y2VzcyBoZWlnaHQgaW4gaU9TIDUgZGV2aWNlcy5cbiAgICovXG5cbiAgYXVkaW86bm90KFtjb250cm9sc10pIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGhlaWdodDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRyZXNzIGBbaGlkZGVuXWAgc3R5bGluZyBub3QgcHJlc2VudCBpbiBJRSA4LzkvMTAuXG4gICAqIEhpZGUgdGhlIGB0ZW1wbGF0ZWAgZWxlbWVudCBpbiBJRSA4LzkvMTAvMTEsIFNhZmFyaSwgYW5kIEZpcmVmb3ggPCAyMi5cbiAgICovXG5cbiAgW2hpZGRlbl0sXG4gIHRlbXBsYXRlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLyogTGlua3NcbiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgY29sb3IgZnJvbSBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gICAqL1xuXG4gIGEge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEltcHJvdmUgcmVhZGFiaWxpdHkgb2YgZm9jdXNlZCBlbGVtZW50cyB3aGVuIHRoZXkgYXJlIGFsc28gaW4gYW5cbiAgICogYWN0aXZlL2hvdmVyIHN0YXRlLlxuICAgKi9cblxuICBhOmFjdGl2ZSxcbiAgYTpob3ZlciB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxuXG4gIC8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXG4gICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgLyoqXG4gICAqIEFkZHJlc3Mgc3R5bGluZyBub3QgcHJlc2VudCBpbiBJRSA4LzkvMTAvMTEsIFNhZmFyaSwgYW5kIENocm9tZS5cbiAgICovXG5cbiAgYWJiclt0aXRsZV0ge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcmVzcyBzdHlsZSBzZXQgdG8gYGJvbGRlcmAgaW4gRmlyZWZveCA0KywgU2FmYXJpLCBhbmQgQ2hyb21lLlxuICAgKi9cblxuICBiLFxuICBzdHJvbmcge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHJlc3Mgc3R5bGluZyBub3QgcHJlc2VudCBpbiBTYWZhcmkgYW5kIENocm9tZS5cbiAgICovXG5cbiAgZGZuIHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcmVzcyB2YXJpYWJsZSBgaDFgIGZvbnQtc2l6ZSBhbmQgbWFyZ2luIHdpdGhpbiBgc2VjdGlvbmAgYW5kIGBhcnRpY2xlYFxuICAgKiBjb250ZXh0cyBpbiBGaXJlZm94IDQrLCBTYWZhcmksIGFuZCBDaHJvbWUuXG4gICAqL1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDJlbTtcbiAgICBtYXJnaW46IDAuNjdlbSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHJlc3Mgc3R5bGluZyBub3QgcHJlc2VudCBpbiBJRSA4LzkuXG4gICAqL1xuXG4gIG1hcmsge1xuICAgIGJhY2tncm91bmQ6ICNmZjA7XG4gICAgY29sb3I6ICMwMDA7XG4gIH1cblxuICAvKipcbiAgICogQWRkcmVzcyBpbmNvbnNpc3RlbnQgYW5kIHZhcmlhYmxlIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gICAqL1xuXG4gIHNtYWxsIHtcbiAgICBmb250LXNpemU6IDgwJTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBhZmZlY3RpbmcgYGxpbmUtaGVpZ2h0YCBpbiBhbGwgYnJvd3NlcnMuXG4gICAqL1xuXG4gIHN1YixcbiAgc3VwIHtcbiAgICBmb250LXNpemU6IDc1JTtcbiAgICBsaW5lLWhlaWdodDogMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICB9XG5cbiAgc3VwIHtcbiAgICB0b3A6IC0wLjVlbTtcbiAgfVxuXG4gIHN1YiB7XG4gICAgYm90dG9tOiAtMC4yNWVtO1xuICB9XG5cbiAgLyogRW1iZWRkZWQgY29udGVudFxuICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYm9yZGVyIHdoZW4gaW5zaWRlIGBhYCBlbGVtZW50IGluIElFIDgvOS8xMC5cbiAgICovXG5cbiAgaW1nIHtcbiAgICBib3JkZXI6IDA7XG4gIH1cblxuICAvKipcbiAgICogQ29ycmVjdCBvdmVyZmxvdyBub3QgaGlkZGVuIGluIElFIDkvMTAvMTEuXG4gICAqL1xuXG4gIHN2Zzpub3QoOnJvb3QpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLyogR3JvdXBpbmcgY29udGVudFxuICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIC8qKlxuICAgKiBBZGRyZXNzIG1hcmdpbiBub3QgcHJlc2VudCBpbiBJRSA4LzkgYW5kIFNhZmFyaS5cbiAgICovXG5cbiAgZmlndXJlIHtcbiAgICBtYXJnaW46IDFlbSA0MHB4O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHJlc3MgZGlmZmVyZW5jZXMgYmV0d2VlbiBGaXJlZm94IGFuZCBvdGhlciBicm93c2Vycy5cbiAgICovXG5cbiAgaHIge1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIGhlaWdodDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb250YWluIG92ZXJmbG93IGluIGFsbCBicm93c2Vycy5cbiAgICovXG5cbiAgcHJlIHtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRyZXNzIG9kZCBgZW1gLXVuaXQgZm9udCBzaXplIHJlbmRlcmluZyBpbiBhbGwgYnJvd3NlcnMuXG4gICAqL1xuXG4gIGNvZGUsXG4gIGtiZCxcbiAgcHJlLFxuICBzYW1wIHtcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7XG4gICAgZm9udC1zaXplOiAxZW07XG4gIH1cblxuICAvKiBGb3Jtc1xuICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gIC8qKlxuICAgKiBLbm93biBsaW1pdGF0aW9uOiBieSBkZWZhdWx0LCBDaHJvbWUgYW5kIFNhZmFyaSBvbiBPUyBYIGFsbG93IHZlcnkgbGltaXRlZFxuICAgKiBzdHlsaW5nIG9mIGBzZWxlY3RgLCB1bmxlc3MgYSBgYm9yZGVyYCBwcm9wZXJ0eSBpcyBzZXQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiAxLiBDb3JyZWN0IGNvbG9yIG5vdCBiZWluZyBpbmhlcml0ZWQuXG4gICAqICAgIEtub3duIGlzc3VlOiBhZmZlY3RzIGNvbG9yIG9mIGRpc2FibGVkIGVsZW1lbnRzLlxuICAgKiAyLiBDb3JyZWN0IGZvbnQgcHJvcGVydGllcyBub3QgYmVpbmcgaW5oZXJpdGVkLlxuICAgKiAzLiBBZGRyZXNzIG1hcmdpbnMgc2V0IGRpZmZlcmVudGx5IGluIEZpcmVmb3ggNCssIFNhZmFyaSwgYW5kIENocm9tZS5cbiAgICovXG5cbiAgYnV0dG9uLFxuICBpbnB1dCxcbiAgb3B0Z3JvdXAsXG4gIHNlbGVjdCxcbiAgdGV4dGFyZWEge1xuICAgIGNvbG9yOiBpbmhlcml0OyAvKiAxICovXG4gICAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xuICAgIG1hcmdpbjogMDsgLyogMyAqL1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHJlc3MgYG92ZXJmbG93YCBzZXQgdG8gYGhpZGRlbmAgaW4gSUUgOC85LzEwLzExLlxuICAgKi9cblxuICBidXR0b24ge1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHJlc3MgaW5jb25zaXN0ZW50IGB0ZXh0LXRyYW5zZm9ybWAgaW5oZXJpdGFuY2UgZm9yIGBidXR0b25gIGFuZCBgc2VsZWN0YC5cbiAgICogQWxsIG90aGVyIGZvcm0gY29udHJvbCBlbGVtZW50cyBkbyBub3QgaW5oZXJpdCBgdGV4dC10cmFuc2Zvcm1gIHZhbHVlcy5cbiAgICogQ29ycmVjdCBgYnV0dG9uYCBzdHlsZSBpbmhlcml0YW5jZSBpbiBGaXJlZm94LCBJRSA4LzkvMTAvMTEsIGFuZCBPcGVyYS5cbiAgICogQ29ycmVjdCBgc2VsZWN0YCBzdHlsZSBpbmhlcml0YW5jZSBpbiBGaXJlZm94LlxuICAgKi9cblxuICBidXR0b24sXG4gIHNlbGVjdCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIH1cblxuICAvKipcbiAgICogMS4gQXZvaWQgdGhlIFdlYktpdCBidWcgaW4gQW5kcm9pZCA0LjAuKiB3aGVyZSAoMikgZGVzdHJveXMgbmF0aXZlIGBhdWRpb2BcbiAgICogICAgYW5kIGB2aWRlb2AgY29udHJvbHMuXG4gICAqIDIuIENvcnJlY3QgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSBgaW5wdXRgIHR5cGVzIGluIGlPUy5cbiAgICogMy4gSW1wcm92ZSB1c2FiaWxpdHkgYW5kIGNvbnNpc3RlbmN5IG9mIGN1cnNvciBzdHlsZSBiZXR3ZWVuIGltYWdlLXR5cGVcbiAgICogICAgYGlucHV0YCBhbmQgb3RoZXJzLlxuICAgKi9cblxuICBidXR0b24sXG4gIGh0bWwgaW5wdXRbdHlwZT1cImJ1dHRvblwiXSwgLyogMSAqL1xuICBpbnB1dFt0eXBlPVwicmVzZXRcIl0sXG4gIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXG4gICAgY3Vyc29yOiBwb2ludGVyOyAvKiAzICovXG4gIH1cblxuICAvKipcbiAgICogUmUtc2V0IGRlZmF1bHQgY3Vyc29yIGZvciBkaXNhYmxlZCBlbGVtZW50cy5cbiAgICovXG5cbiAgYnV0dG9uW2Rpc2FibGVkXSxcbiAgaHRtbCBpbnB1dFtkaXNhYmxlZF0ge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaW5uZXIgcGFkZGluZyBhbmQgYm9yZGVyIGluIEZpcmVmb3ggNCsuXG4gICAqL1xuXG4gIGJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcbiAgaW5wdXQ6Oi1tb3otZm9jdXMtaW5uZXIge1xuICAgIGJvcmRlcjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHJlc3MgRmlyZWZveCA0KyBzZXR0aW5nIGBsaW5lLWhlaWdodGAgb24gYGlucHV0YCB1c2luZyBgIWltcG9ydGFudGAgaW5cbiAgICogdGhlIFVBIHN0eWxlc2hlZXQuXG4gICAqL1xuXG4gIGlucHV0IHtcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0J3MgcmVjb21tZW5kZWQgdGhhdCB5b3UgZG9uJ3QgYXR0ZW1wdCB0byBzdHlsZSB0aGVzZSBlbGVtZW50cy5cbiAgICogRmlyZWZveCdzIGltcGxlbWVudGF0aW9uIGRvZXNuJ3QgcmVzcGVjdCBib3gtc2l6aW5nLCBwYWRkaW5nLCBvciB3aWR0aC5cbiAgICpcbiAgICogMS4gQWRkcmVzcyBib3ggc2l6aW5nIHNldCB0byBgY29udGVudC1ib3hgIGluIElFIDgvOS8xMC5cbiAgICogMi4gUmVtb3ZlIGV4Y2VzcyBwYWRkaW5nIGluIElFIDgvOS8xMC5cbiAgICovXG5cbiAgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLFxuICBpbnB1dFt0eXBlPVwicmFkaW9cIl0ge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgICBwYWRkaW5nOiAwOyAvKiAyICovXG4gIH1cblxuICAvKipcbiAgICogRml4IHRoZSBjdXJzb3Igc3R5bGUgZm9yIENocm9tZSdzIGluY3JlbWVudC9kZWNyZW1lbnQgYnV0dG9ucy4gRm9yIGNlcnRhaW5cbiAgICogYGZvbnQtc2l6ZWAgdmFsdWVzIG9mIHRoZSBgaW5wdXRgLCBpdCBjYXVzZXMgdGhlIGN1cnNvciBzdHlsZSBvZiB0aGVcbiAgICogZGVjcmVtZW50IGJ1dHRvbiB0byBjaGFuZ2UgZnJvbSBgZGVmYXVsdGAgdG8gYHRleHRgLlxuICAgKi9cblxuICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cblxuICAvKipcbiAgICogMS4gQWRkcmVzcyBgYXBwZWFyYW5jZWAgc2V0IHRvIGBzZWFyY2hmaWVsZGAgaW4gU2FmYXJpIGFuZCBDaHJvbWUuXG4gICAqIDIuIEFkZHJlc3MgYGJveC1zaXppbmdgIHNldCB0byBgYm9yZGVyLWJveGAgaW4gU2FmYXJpIGFuZCBDaHJvbWUuXG4gICAqL1xuXG4gIGlucHV0W3R5cGU9XCJzZWFyY2hcIl0ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDIgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaW5uZXIgcGFkZGluZyBhbmQgc2VhcmNoIGNhbmNlbCBidXR0b24gaW4gU2FmYXJpIGFuZCBDaHJvbWUgb24gT1MgWC5cbiAgICogU2FmYXJpIChidXQgbm90IENocm9tZSkgY2xpcHMgdGhlIGNhbmNlbCBidXR0b24gd2hlbiB0aGUgc2VhcmNoIGlucHV0IGhhc1xuICAgKiBwYWRkaW5nIChhbmQgYHRleHRmaWVsZGAgYXBwZWFyYW5jZSkuXG4gICAqL1xuXG4gIGlucHV0W3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24sXG4gIGlucHV0W3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgY29uc2lzdGVudCBib3JkZXIsIG1hcmdpbiwgYW5kIHBhZGRpbmcuXG4gICAqL1xuXG4gIGZpZWxkc2V0IHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzBjMGMwO1xuICAgIG1hcmdpbjogMCAycHg7XG4gICAgcGFkZGluZzogMC4zNWVtIDAuNjI1ZW0gMC43NWVtO1xuICB9XG5cbiAgLyoqXG4gICAqIDEuIENvcnJlY3QgYGNvbG9yYCBub3QgYmVpbmcgaW5oZXJpdGVkIGluIElFIDgvOS8xMC8xMS5cbiAgICogMi4gUmVtb3ZlIHBhZGRpbmcgc28gcGVvcGxlIGFyZW4ndCBjYXVnaHQgb3V0IGlmIHRoZXkgemVybyBvdXQgZmllbGRzZXRzLlxuICAgKi9cblxuICBsZWdlbmQge1xuICAgIGJvcmRlcjogMDsgLyogMSAqL1xuICAgIHBhZGRpbmc6IDA7IC8qIDIgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgOC85LzEwLzExLlxuICAgKi9cblxuICB0ZXh0YXJlYSB7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gIH1cblxuICAvKipcbiAgICogRG9uJ3QgaW5oZXJpdCB0aGUgYGZvbnQtd2VpZ2h0YCAoYXBwbGllZCBieSBhIHJ1bGUgYWJvdmUpLlxuICAgKiBOT1RFOiB0aGUgZGVmYXVsdCBjYW5ub3Qgc2FmZWx5IGJlIGNoYW5nZWQgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gT1MgWC5cbiAgICovXG5cbiAgb3B0Z3JvdXAge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgLyogVGFibGVzXG4gICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBtb3N0IHNwYWNpbmcgYmV0d2VlbiB0YWJsZSBjZWxscy5cbiAgICovXG5cbiAgdGFibGUge1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XG4gIH1cblxuICB0ZCxcbiAgdGgge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGdyaWRcbi8vLy9cblxuLy8vIFRoZSBtYXhpbXVtIHdpZHRoIG9mIGEgcm93LlxuLy8vIEB0eXBlIE51bWJlclxuJGdyaWQtcm93LXdpZHRoOiAkZ2xvYmFsLXdpZHRoICFkZWZhdWx0O1xuXG4vLy8gVGhlIGRlZmF1bHQgY29sdW1uIGNvdW50IG9mIGEgZ3JpZC4gQ2hhbmdpbmcgdGhpcyB2YWx1ZSBhZmZlY3RzIHRoZSBsb2dpYyBvZiB0aGUgZ3JpZCBtaXhpbnMsIGFuZCB0aGUgbnVtYmVyIG9mIENTUyBjbGFzc2VzIG91dHB1dC5cbi8vLyBAdHlwZSBOdW1iZXJcbiRncmlkLWNvbHVtbi1jb3VudDogMTIgIWRlZmF1bHQ7XG5cbi8vIFRoZSBhbW91bnQgb2Ygc3BhY2UgYmV0d2VlbiBjb2x1bW5zLiBSZW1vdmUgdGhpcyBpbiA2LjIuXG4vLyBAdHlwZSBOdW1iZXJcbiRncmlkLWNvbHVtbi1ndXR0ZXI6IG51bGwgIWRlZmF1bHQ7XG5cbi8vLyBUaGUgYW1vdW50IG9mIHNwYWNlIGJldHdlZW4gY29sdW1ucyBhdCBkaWZmZXJlbnQgc2NyZWVuIHNpemVzLlxuLy8vIEB0eXBlIE1hcFxuLy8vIEBzaW5jZSA2LjEuMFxuJGdyaWQtY29sdW1uLXJlc3BvbnNpdmUtZ3V0dGVyOiAoXG4gIHNtYWxsOiAyMHB4LFxuICBtZWRpdW06IDMwcHgsXG4pICFkZWZhdWx0O1xuXG4vLy8gSWYgYHRydWVgLCB0aGUgbGFzdCBjb2x1bW4gaW4gYSByb3cgd2lsbCBhbGlnbiB0byB0aGUgb3Bwb3NpdGUgZWRnZSBvZiB0aGUgcm93LlxuLy8vIEB0eXBlIEJvb2xlYW5cbiRncmlkLWNvbHVtbi1hbGlnbi1lZGdlOiB0cnVlICFkZWZhdWx0O1xuXG4vLyBJbnRlcm5hbCB2YWx1ZSB0byBzdG9yZSB0aGUgZW5kIGNvbHVtbiBmbG9hdCBkaXJlY3Rpb25cbiQtemYtZW5kLWZsb2F0OiBpZigkZ3JpZC1jb2x1bW4tYWxpZ24tZWRnZSwgJGdsb2JhbC1yaWdodCwgJGdsb2JhbC1sZWZ0KTtcblxuLy8vIFRoZSBoaWdoZXN0IG51bWJlciBvZiBgLngtdXBgIGNsYXNzZXMgYXZhaWxhYmxlIHdoZW4gdXNpbmcgdGhlIGJsb2NrIGdyaWQgQ1NTLlxuLy8vIEB0eXBlIE51bWJlclxuJGJsb2NrLWdyaWQtbWF4OiA4ICFkZWZhdWx0O1xuXG5AaW1wb3J0ICdyb3cnO1xuQGltcG9ydCAnY29sdW1uJztcbkBpbXBvcnQgJ3NpemUnO1xuQGltcG9ydCAncG9zaXRpb24nO1xuQGltcG9ydCAnZ3V0dGVyJztcbkBpbXBvcnQgJ2NsYXNzZXMnO1xuQGltcG9ydCAnbGF5b3V0JztcblxuQGltcG9ydCAnZmxleC1ncmlkJztcbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGdyaWRcbi8vLy9cblxuLy8vIENoYW5nZSB0aGUgYmVoYXZpb3Igb2YgY29sdW1ucyBkZWZpbmVkIGluc2lkZSB0aGlzIG1peGluIHRvIHVzZSBhIGRpZmZlcmVudCBjb2x1bW4gY291bnQuXG4vLy8gQGNvbnRlbnRcbi8vL1xuLy8vIEBwYXJhbSB7TnVtYmVyfSAkY29sdW1ucyAtIE51bWJlciBvZiBjb2x1bW5zIHRvIHVzZS5cbi8vLyBAcGFyYW0ge0Jvb2xlYW59ICRyb290IFtmYWxzZV1cbi8vLyAgIElmIGBmYWxzZWAsIHNlbGVjdG9ycyBpbnNpZGUgdGhpcyBtaXhpbiB3aWxsIG5lc3QgaW5zaWRlIHRoZSBwYXJlbnQgc2VsZWN0b3IuXG4vLy8gICBJZiBgdHJ1ZWAsIHNlbGVjdG9ycyB3aWxsIG5vdCBuZXN0LlxuQG1peGluIGdyaWQtY29udGV4dChcbiAgJGNvbHVtbnMsXG4gICRyb290OiBmYWxzZVxuKSB7XG4gIC8vIFN0b3JlIHRoZSBjdXJyZW50IGNvbHVtbiBjb3VudCBzbyBpdCBjYW4gYmUgcmUtc2V0IGxhdGVyXG4gICRvbGQtZ3JpZC1jb2x1bW4tY291bnQ6ICRncmlkLWNvbHVtbi1jb3VudDtcbiAgJGdyaWQtY29sdW1uLWNvdW50OiAkY29sdW1ucyAhZ2xvYmFsO1xuXG4gIEBpZiAkcm9vdCB7XG4gICAgQGF0LXJvb3QgeyBAY29udGVudDsgfVxuICB9XG4gIEBlbHNlIHtcbiAgICBAY29udGVudDtcbiAgfVxuXG4gIC8vIFJlc3RvcmUgdGhlIG9sZCBjb2x1bW4gY291bnRcbiAgJGdyaWQtY29sdW1uLWNvdW50OiAkb2xkLWdyaWQtY29sdW1uLWNvdW50O1xufVxuXG4vLy8gQ3JlYXRlcyBhIGdyaWQgcm93LlxuLy8vIEBjb250ZW50XG4vLy9cbi8vLyBAcGFyYW0ge051bWJlcn0gJGNvbHVtbnMgW251bGxdIC0gQ29sdW1uIGNvdW50IGZvciB0aGlzIHJvdy4gYG51bGxgIHdpbGwgdXNlIHRoZSBkZWZhdWx0IGNvbHVtbiBjb3VudC5cbi8vLyBAcGFyYW0ge0tleXdvcmRzfSAkYmVoYXZpb3IgW251bGxdXG4vLy8gICBNb2RpZmljYXRpb25zIHRvIHRoZSBkZWZhdWx0IGdyaWQgc3R5bGVzLiBgbmVzdGAgaW5kaWNhdGVzIHRoZSByb3cgd2lsbCBiZSBwbGFjZWQgaW5zaWRlIGFub3RoZXIgcm93LiBgY29sbGFwc2VgIGluZGljYXRlcyB0aGF0IHRoZSBjb2x1bW5zIGluc2lkZSB0aGlzIHJvdyB3aWxsIG5vdCBoYXZlIHBhZGRpbmcuIGBuZXN0IGNvbGxhcHNlYCBjb21iaW5lcyBib3RoIGJlaGF2aW9ycy5cbi8vLyBAcGFyYW0ge051bWJlcn0gJHdpZHRoIFskZ3JpZC1yb3ctd2lkdGhdIC0gTWF4aW11bSB3aWR0aCBvZiB0aGUgcm93LlxuLy8vIEBwYXJhbSB7Qm9vbGVhbn0gJGNmIFt0cnVlXSAtIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgYSBjbGVhcmZpeC5cbi8vLyBAcGFyYW0ge051bWJlcn0gJGd1dHRlciBbJGdyaWQtY29sdW1uLWd1dHRlcl0gLSBHdXR0ZXIgdG8gdXNlIHdoZW4gaW52ZXJ0aW5nIG1hcmdpbnMsIGluIGNhc2UgdGhlIHJvdyBpcyBuZXN0ZWQuXG5AbWl4aW4gZ3JpZC1yb3coXG4gICRjb2x1bW5zOiBudWxsLFxuICAkYmVoYXZpb3I6IG51bGwsXG4gICR3aWR0aDogJGdyaWQtcm93LXdpZHRoLFxuICAkY2Y6IHRydWUsXG4gICRndXR0ZXI6ICRncmlkLWNvbHVtbi1ndXR0ZXJcbikge1xuICAkYmVoYXZpb3I6IC16Zi1nZXQtb3B0aW9ucygkYmVoYXZpb3IsIG5lc3QgY29sbGFwc2UpO1xuICAkbWFyZ2luOiBhdXRvO1xuXG4gIEBpZiBtYXAtZ2V0KCRiZWhhdmlvciwgbmVzdCkge1xuICAgIEBpbmNsdWRlIGdyaWQtcm93LW5lc3QoJGd1dHRlcik7XG5cbiAgICBAaWYgbWFwLWdldCgkYmVoYXZpb3IsIGNvbGxhcHNlKSB7XG4gICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gIH1cbiAgQGVsc2Uge1xuICAgIG1heC13aWR0aDogJHdpZHRoO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxuXG4gIEBpZiAkY2Yge1xuICAgIEBpbmNsdWRlIGNsZWFyZml4O1xuICB9XG5cbiAgQGlmICRjb2x1bW5zICE9IG51bGwge1xuICAgIEBpbmNsdWRlIGdyaWQtY29udGV4dCgkY29sdW1ucykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5cbi8vLyBJbnZlcnRzIHRoZSBtYXJnaW5zIG9mIGEgcm93IHRvIG5lc3QgaXQgaW5zaWRlIG9mIGEgY29sdW1uLlxuLy8vXG4vLy8gQHBhcmFtIHtNYXB8bnVsbH0gJGd1dHRlciBbbnVsbF0gLSBHdXR0ZXIgdmFsdWUgdG8gdXNlIHdoZW4gaW52ZXJ0aW5nIHRoZSBtYXJnaW5zLiBTZXQgdG8gYG51bGxgIHRvIHJlZmVyIHRvIHRoZSByZXNwb25zaXZlIGd1dHRlciBzZXR0aW5ncy5cbkBtaXhpbiBncmlkLXJvdy1uZXN0KCRndXR0ZXI6IG51bGwpIHtcbiAgQGlmICRndXR0ZXIgIT0gbnVsbCB7XG4gICAgJG1hcmdpbjogcmVtLWNhbGMoJGd1dHRlcikgLyAyICogLTE7XG4gICAgbWFyZ2luLWxlZnQ6ICRtYXJnaW47XG4gICAgbWFyZ2luLXJpZ2h0OiAkbWFyZ2luO1xuICB9XG4gIEBlbHNlIHtcbiAgICBAZWFjaCAkYnJlYWtwb2ludCwgJHZhbHVlIGluICRncmlkLWNvbHVtbi1yZXNwb25zaXZlLWd1dHRlciB7XG4gICAgICAkbWFyZ2luOiByZW0tY2FsYygkdmFsdWUpIC8gMiAqIC0xO1xuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgkYnJlYWtwb2ludCkge1xuICAgICAgICBtYXJnaW4tbGVmdDogJG1hcmdpbjtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAkbWFyZ2luO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZ3JpZFxuLy8vL1xuXG4vLy8gQ2FsY3VsYXRlcyB0aGUgd2lkdGggb2YgYSBjb2x1bW4gYmFzZWQgb24gYSBudW1iZXIgb2YgZmFjdG9ycy5cbi8vL1xuLy8vIEBwYXJhbSB7TnVtYmVyfExpc3R9ICRjb2x1bW5zXG4vLy8gICBXaWR0aCBvZiB0aGUgY29sdW1uLiBBY2NlcHRzIG11bHRpcGxlIHZhbHVlczpcbi8vLyAgIC0gQSBwZXJjZW50YWdlIHZhbHVlIHdpbGwgbWFrZSB0aGUgY29sdW1uIHRoYXQgZXhhY3Qgc2l6ZS5cbi8vLyAgIC0gQSBzaW5nbGUgZGlnaXQgd2lsbCBtYWtlIHRoZSBjb2x1bW4gc3BhbiB0aGF0IG51bWJlciBvZiBjb2x1bW5zIHdpZGUsIHRha2luZyBpbnRvIGFjY291bnQgdGhlIGNvbHVtbiBjb3VudCBvZiB0aGUgcGFyZW50IHJvdy5cbi8vLyAgIC0gQSBzdHJpbmcgb2YgdGhlIGZvcm1hdCBcInggb2YgeVwiIHdpbGwgbWFrZSBhIGNvbHVtbiB0aGF0IGlzICp4KiBjb2x1bW5zIHdpZGUsIGFzc3VtaW5nICp5KiB0b3RhbCBjb2x1bW5zIGZvciB0aGUgcGFyZW50LlxuLy8vXG4vLy8gQHJldHVybnMge051bWJlcn0gQSBjYWxjdWxhdGVkIHBlcmNlbnRhZ2UgdmFsdWUuXG5AZnVuY3Rpb24gZ3JpZC1jb2x1bW4oJGNvbHVtbnMpIHtcbiAgJHdpZHRoOiAwJTtcblxuICAvLyBQYXJzaW5nIHBlcmNlbnRzLCBkZWNpbWFscywgYW5kIGNvbHVtbiBjb3VudHNcbiAgQGlmIHR5cGUtb2YoJGNvbHVtbnMpID09ICdudW1iZXInIHtcbiAgICBAaWYgdW5pdCgkY29sdW1ucykgPT0gJyUnIHtcbiAgICAgICR3aWR0aDogJGNvbHVtbnM7XG4gICAgfVxuICAgIEBlbHNlIGlmICRjb2x1bW5zIDwgMSB7XG4gICAgICAkd2lkdGg6IHBlcmNlbnRhZ2UoJGNvbHVtbnMpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICAkd2lkdGg6IHBlcmNlbnRhZ2UoJGNvbHVtbnMgLyAkZ3JpZC1jb2x1bW4tY291bnQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNpbmcgXCJuIG9mIG5cIiBleHByZXNzaW9uc1xuICBAZWxzZSBpZiB0eXBlLW9mKCRjb2x1bW5zKSA9PSAnbGlzdCcge1xuICAgIEBpZiBsZW5ndGgoJGNvbHVtbnMpICE9IDMge1xuICAgICAgQGVycm9yICdXcm9uZyBzeW50YXggZm9yIGdyaWQtY29sdW1uKCkuIFVzZSB0aGUgZm9ybWF0IFwibiBvZiBuXCIuJztcbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgJHdpZHRoOiBwZXJjZW50YWdlKG50aCgkY29sdW1ucywgMSkgLyBudGgoJGNvbHVtbnMsIDMpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBbnl0aGluZyBlbHNlIGlzIGluY29ycmVjdFxuICBAZWxzZSB7XG4gICAgQGVycm9yICdXcm9uZyBzeW50YXggZm9yIGdyaWQtY29sdW1uKCkuIFVzZSBhIG51bWJlciwgZGVjaW1hbCwgcGVyY2VudGFnZSwgb3IgXCJuIG9mIG5cIi4nO1xuICB9XG5cbiAgQHJldHVybiAkd2lkdGg7XG59XG5cbi8vLyBDcmVhdGVzIGEgZ3JpZCBjb2x1bW4uXG4vLy9cbi8vLyBAcGFyYW0ge01peGVkfSAkY29sdW1ucyBbJGdyaWQtY29sdW1uLWNvdW50XSAtIFdpZHRoIG9mIHRoZSBjb2x1bW4uIFJlZmVyIHRvIHRoZSBgZ3JpZC1jb2x1bW4oKWAgZnVuY3Rpb24gdG8gc2VlIHBvc3NpYmxlIHZhbHVlcy5cbi8vLyBAcGFyYW0ge051bWJlcn0gJGd1dHRlciBbJGdyaWQtY29sdW1uLWd1dHRlcl0gLSBTcGFjaW5nIGJldHdlZW4gY29sdW1ucy5cbkBtaXhpbiBncmlkLWNvbHVtbihcbiAgJGNvbHVtbnM6ICRncmlkLWNvbHVtbi1jb3VudCxcbiAgJGd1dHRlcjogJGdyaWQtY29sdW1uLWd1dHRlclxuKSB7XG4gIEBpZiAkZ3V0dGVyICE9IG51bGwge1xuICAgICRndXR0ZXI6IHJlbS1jYWxjKCRndXR0ZXIpIC8gMjtcbiAgfVxuICBAZWxzZSB7XG4gICAgQGVhY2ggJGJyZWFrcG9pbnQsICRndXR0ZXIgaW4gJGdyaWQtY29sdW1uLXJlc3BvbnNpdmUtZ3V0dGVyIHtcbiAgICAgICRwYWRkaW5nOiByZW0tY2FsYygkZ3V0dGVyKSAvIDI7XG4gICAgICBcbiAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJGJyZWFrcG9pbnQpIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAkcGFkZGluZztcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHBhZGRpbmc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGluY2x1ZGUgZ3JpZC1jb2x1bW4tc2l6ZSgkY29sdW1ucyk7XG4gIGZsb2F0OiAkZ2xvYmFsLWxlZnQ7XG4gIHBhZGRpbmctbGVmdDogJGd1dHRlcjtcbiAgcGFkZGluZy1yaWdodDogJGd1dHRlcjtcblxuICBAaWYgJGdyaWQtY29sdW1uLWFsaWduLWVkZ2Uge1xuICAgICY6bGFzdC1jaGlsZDpub3QoOmZpcnN0LWNoaWxkKSB7XG4gICAgICBmbG9hdDogJGdsb2JhbC1yaWdodDtcbiAgICB9XG4gIH1cbn1cblxuLy8vIENyZWF0ZXMgYSBncmlkIGNvbHVtbiByb3cuIFRoaXMgaXMgdGhlIGVxdWl2YWxlbnQgb2YgYWRkaW5nIGAucm93YCBhbmQgYC5jb2x1bW5gIHRvIHRoZSBzYW1lIGVsZW1lbnQuXG4vLy9cbi8vLyBAcGFyYW0ge051bWJlcn0gJGd1dHRlciBbJGdyaWQtY29sdW1uLWd1dHRlcl0gLSBXaWR0aCBvZiB0aGUgZ3V0dGVycyBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgY29sdW1uIHJvdy5cbkBtaXhpbiBncmlkLWNvbHVtbi1yb3coXG4gICRndXR0ZXI6ICRncmlkLWNvbHVtbi1ndXR0ZXJcbikge1xuICBAaW5jbHVkZSBncmlkLXJvdztcbiAgQGluY2x1ZGUgZ3JpZC1jb2x1bW4oJGd1dHRlcjogJGd1dHRlcik7XG5cbiAgJixcbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBmbG9hdDogbm9uZTtcbiAgfVxufVxuXG4vLy8gU2hvcnRoYW5kIGZvciBgZ3JpZC1jb2x1bW4oKWAuXG4vLy8gQGFsaWFzIGdyaWQtY29sdW1uXG5AZnVuY3Rpb24gZ3JpZC1jb2woXG4gICRjb2x1bW5zOiAkZ3JpZC1jb2x1bW4tY291bnRcbikge1xuICBAcmV0dXJuIGdyaWQtY29sdW1uKCRjb2x1bW5zKTtcbn1cblxuLy8vIFNob3J0aGFuZCBmb3IgYGdyaWQtY29sdW1uKClgLlxuLy8vIEBhbGlhcyBncmlkLWNvbHVtblxuQG1peGluIGdyaWQtY29sKFxuICAkY29sdW1uczogJGdyaWQtY29sdW1uLWNvdW50LFxuICAkZ3V0dGVyOiAkZ3JpZC1jb2x1bW4tZ3V0dGVyXG4pIHtcbiAgQGluY2x1ZGUgZ3JpZC1jb2x1bW4oJGNvbHVtbnMsICRndXR0ZXIpO1xufVxuXG4vLy8gU2hvcnRoYW5kIGZvciBgZ3JpZC1jb2x1bW4tcm93KClgLlxuLy8vIEBhbGlhcyBncmlkLWNvbHVtbi1yb3dcbkBtaXhpbiBncmlkLWNvbC1yb3coXG4gICRndXR0ZXI6ICRncmlkLWNvbHVtbi1ndXR0ZXJcbikge1xuICBAaW5jbHVkZSBncmlkLWNvbHVtbi1yb3coJGd1dHRlcik7XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBncmlkXG4vLy8vXG5cbi8vLyBTZXQgdGhlIHdpZHRoIG9mIGEgZ3JpZCBjb2x1bW4uXG4vLy9cbi8vLyBAcGFyYW0ge051bWJlcnxMaXN0fSAkd2lkdGggWyRncmlkLWNvbHVtbi1jb3VudF0gLSBXaWR0aCB0byBtYWtlIHRoZSBjb2x1bW4uIFlvdSBjYW4gcGFzcyBpbiBhbnkgdmFsdWUgYWNjZXB0ZWQgYnkgdGhlIGBncmlkLWNvbHVtbigpYCBmdW5jdGlvbiwgc3VjaCBhcyBgNmAsIGA1MCVgLCBvciBgMSBvZiAyYC5cbkBtaXhpbiBncmlkLWNvbHVtbi1zaXplKFxuICAkY29sdW1uczogJGdyaWQtY29sdW1uLWNvdW50XG4pIHtcbiAgd2lkdGg6IGdyaWQtY29sdW1uKCRjb2x1bW5zKTtcbn1cblxuLy8vIFNob3J0aGFuZCBmb3IgYGdyaWQtY29sdW1uLXNpemUoKWAuXG4vLy8gQGFsaWFzIGdyaWQtY29sdW1uLXNpemVcbkBtaXhpbiBncmlkLWNvbC1zaXplKFxuICAkY29sdW1uczogJGdyaWQtY29sdW1uLWNvdW50XG4pIHtcbiAgQGluY2x1ZGUgZ3JpZC1jb2x1bW4tc2l6ZSgkY29sdW1ucyk7XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBncmlkXG4vLy8vXG5cbi8vLyBSZXBvc2l0aW9uIGEgY29sdW1uLlxuLy8vXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRwb3NpdGlvbiAtIERpcmVjdGlvbiBhbmQgYW1vdW50IHRvIG1vdmUuIFRoZSBjb2x1bW4gd2lsbCBtb3ZlIGVxdWFsIHRvIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uIGNvdW50IHNwZWNpZmllZC4gQSBwb3NpdGl2ZSBudW1iZXIgd2lsbCBwdXNoIHRoZSBjb2x1bW4gdG8gdGhlIHJpZ2h0LCB3aGlsZSBhIG5lZ2F0aXZlIG51bWJlciB3aWxsIHB1bGwgaXQgdG8gdGhlIGxlZnQuXG5AbWl4aW4gZ3JpZC1jb2x1bW4tcG9zaXRpb24oJHBvc2l0aW9uKSB7XG4gIEBpZiB0eXBlLW9mKCRwb3NpdGlvbikgPT0gJ251bWJlcicge1xuICAgICRvZmZzZXQ6IHBlcmNlbnRhZ2UoJHBvc2l0aW9uIC8gJGdyaWQtY29sdW1uLWNvdW50KTtcblxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAjeyRnbG9iYWwtbGVmdH06ICRvZmZzZXQ7XG4gIH1cbiAgQGVsc2UgaWYgJHBvc2l0aW9uID09IGNlbnRlciB7XG4gICAgZmxvYXQ6IG5vbmU7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICB9XG4gIEBlbHNlIHtcbiAgICBAd2FybiAnV3Jvbmcgc3ludGF4IGZvciBncmlkLWNvbHVtbi1wb3NpdGlvbigpLiBFbnRlciBhIHBvc2l0aXZlIG9yIG5lZ2F0aXZlIG51bWJlciwgb3IgY2VudGVyLic7XG4gIH1cbn1cblxuLy8vIFJlc2V0IGEgcG9zaXRpb24gZGVmaW5pdGlvbi5cbkBtaXhpbiBncmlkLWNvbHVtbi11bnBvc2l0aW9uIHtcbiAgcG9zaXRpb246IHN0YXRpYztcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cblxuLy8vIE9mZnNldHMgYSBjb2x1bW4gdG8gdGhlIHJpZ2h0IGJ5IGAkbmAgY29sdW1ucy5cbi8vLyBAcGFyYW0ge051bWJlcnxMaXN0fSAkbiAtIFdpZHRoIHRvIG9mZnNldCBieS4gWW91IGNhbiBwYXNzIGluIGFueSB2YWx1ZSBhY2NlcHRlZCBieSB0aGUgYGdyaWQtY29sdW1uKClgIG1peGluLCBzdWNoIGFzIGA2YCwgYDUwJWAsIG9yIGAxIG9mIDJgLlxuQG1peGluIGdyaWQtY29sdW1uLW9mZnNldCgkbikge1xuICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiBncmlkLWNvbHVtbigkbik7XG59XG5cbi8vLyBEaXNhYmxlIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBsYXN0IGNvbHVtbiBpbiBhIHJvdyBhbGlnbmluZyB0byB0aGUgb3Bwb3NpdGUgZWRnZS5cbkBtaXhpbiBncmlkLWNvbHVtbi1lbmQge1xuICAvLyBUaGlzIGV4dHJhIHNwZWNpZmljaXR5IGlzIHJlcXVpcmVkIGZvciB0aGUgcHJvcGVydHkgdG8gYmUgYXBwbGllZFxuICAmOmxhc3QtY2hpbGQ6bGFzdC1jaGlsZCB7XG4gICAgZmxvYXQ6ICRnbG9iYWwtbGVmdDtcbiAgfVxufVxuXG4vLy8gU2hvcnRoYW5kIGZvciBgZ3JpZC1jb2x1bW4tcG9zaXRpb24oKWAuXG4vLy8gQGFsaWFzIGdyaWQtY29sdW1uLXBvc2l0aW9uXG5AbWl4aW4gZ3JpZC1jb2wtcG9zKCRwb3NpdGlvbikge1xuICBAaW5jbHVkZSBncmlkLWNvbHVtbi1wb3NpdGlvbigkcG9zaXRpb24pO1xufVxuXG4vLy8gU2hvcnRoYW5kIGZvciBgZ3JpZC1jb2x1bW4tdW5wb3NpdGlvbigpYC5cbi8vLyBAYWxpYXMgZ3JpZC1jb2x1bW4tdW5wb3NpdGlvblxuQG1peGluIGdyaWQtY29sLXVucG9zIHtcbiAgQGluY2x1ZGUgZ3JpZC1jb2x1bW4tdW5wb3NpdGlvbjtcbn1cblxuLy8vIFNob3J0aGFuZCBmb3IgYGdyaWQtY29sdW1uLW9mZnNldCgpYC5cbi8vLyBAYWxpYXMgZ3JpZC1jb2x1bW4tb2Zmc2V0XG5AbWl4aW4gZ3JpZC1jb2wtb2ZmKCRuKSB7XG4gIEBpbmNsdWRlIGdyaWQtY29sdW1uLW9mZnNldCgkbik7XG59XG5cbi8vLyBTaG9ydGhhbmQgZm9yIGBncmlkLWNvbHVtbi1lbmQoKWAuXG4vLy8gQGFsaWFzIGdyaWQtY29sdW1uLWVuZFxuQG1peGluIGdyaWQtY29sLWVuZCB7XG4gIEBpbmNsdWRlIGdyaWQtY29sdW1uLWVuZDtcbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGdyaWRcbi8vLy9cblxuLy8vIENvbGxhcHNlIHRoZSBndXR0ZXJzIG9uIGEgY29sdW1uIGJ5IHJlbW92aW5nIHRoZSBwYWRkaW5nLlxuQG1peGluIGdyaWQtY29sdW1uLWNvbGxhcHNlIHtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xufVxuXG4vLy8gVW4tY29sbGFwc2UgdGhlIGd1dHRlcnMgb24gYSBjb2x1bW4gYnkgcmUtYWRkaW5nIHRoZSBwYWRkaW5nLlxuLy8vXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRndXR0ZXIgWyRncmlkLWNvbHVtbi1ndXR0ZXJdIC0gU3BhY2luZyBiZXR3ZWVuIGNvbHVtbnMuXG5AbWl4aW4gZ3JpZC1jb2x1bW4tdW5jb2xsYXBzZSgkZ3V0dGVyOiAkZ3JpZC1jb2x1bW4tZ3V0dGVyKSB7XG4gICRndXR0ZXI6IHJlbS1jYWxjKCRndXR0ZXIpIC8gMjtcbiAgcGFkZGluZy1sZWZ0OiAkZ3V0dGVyO1xuICBwYWRkaW5nLXJpZ2h0OiAkZ3V0dGVyO1xufVxuXG4vLy8gU2hvcnRoYW5kIGZvciBgZ3JpZC1jb2x1bW4tY29sbGFwc2UoKWAuXG4vLy8gQGFsaWFzIGdyaWQtY29sdW1uLWNvbGxhcHNlXG5AbWl4aW4gZ3JpZC1jb2wtY29sbGFwc2Uge1xuICBAaW5jbHVkZSBncmlkLWNvbHVtbi1jb2xsYXBzZTtcbn1cblxuLy8vIFNob3J0aGFuZCBmb3IgYGdyaWQtY29sdW1uLXVuY29sbGFwc2UoKWAuXG4vLy8gQGFsaWFzIGdyaWQtY29sdW1uLXVuY29sbGFwc2VcbkBtaXhpbiBncmlkLWNvbC11bmNvbGxhcHNlKCRndXR0ZXI6ICRncmlkLWNvbHVtbi1ndXR0ZXIpIHtcbiAgQGluY2x1ZGUgZ3JpZC1jb2x1bW4tdW5jb2xsYXBzZSgkZ3V0dGVyKTtcbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGdyaWRcbi8vLy9cblxuLy8vIE91dHB1dHMgQ1NTIGNsYXNzZXMgZm9yIHRoZSBncmlkLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuQG1peGluIGZvdW5kYXRpb24tZ3JpZChcbiAgJHJvdzogJ3JvdycsXG4gICRjb2x1bW46ICdjb2x1bW4nLFxuICAkY29sdW1uLXJvdzogJ2NvbHVtbi1yb3cnLFxuICAkcHVzaDogJ3B1c2gnLFxuICAkcHVsbDogJ3B1bGwnLFxuICAkY2VudGVyOiAnY2VudGVyZWQnLFxuICAkdW5jZW50ZXI6ICd1bmNlbnRlcmVkJyxcbiAgJGNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAkdW5jb2xsYXBzZTogJ3VuY29sbGFwc2UnLFxuICAkb2Zmc2V0OiAnb2Zmc2V0JyxcbiAgJGVuZDogJ2VuZCcsXG4gICRleHBhbmRlZDogJ2V4cGFuZGVkJ1xuKSB7XG4gIC8vIFJvd1xuICAuI3skcm93fSB7XG4gICAgQGluY2x1ZGUgZ3JpZC1yb3c7XG5cbiAgICAvLyBDb2xsYXBzaW5nXG4gICAgJi4jeyRjb2xsYXBzZX0ge1xuICAgICAgPiAuI3skY29sdW1ufSB7IEBpbmNsdWRlIGdyaWQtY29sLWNvbGxhcHNlOyB9XG4gICAgfVxuXG4gICAgLy8gTmVzdGluZ1xuICAgICYgJiB7XG4gICAgICBAaWYgJGdyaWQtY29sdW1uLWd1dHRlciA9PSBudWxsIHtcbiAgICAgICAgQGVhY2ggJGJyZWFrcG9pbnQsICRndXR0ZXIgaW4gJGdyaWQtY29sdW1uLXJlc3BvbnNpdmUtZ3V0dGVyIHtcbiAgICAgICAgICBAaW5jbHVkZSBicmVha3BvaW50KCRicmVha3BvaW50KSB7XG4gICAgICAgICAgICBAaW5jbHVkZSBncmlkLXJvdy1uZXN0KCRndXR0ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICBAaW5jbHVkZSBncmlkLXJvdy1uZXN0KCRncmlkLWNvbHVtbi1ndXR0ZXIpO1xuICAgICAgfVxuXG4gICAgICAmLiN7JGNvbGxhcHNlfSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXhwYW5kZWQgKGZ1bGwtd2lkdGgpIHJvd1xuICAgICYuI3skZXhwYW5kZWR9IHtcbiAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb2x1bW5cbiAgLiN7JGNvbHVtbn0ge1xuICAgIEBpbmNsdWRlIGdyaWQtY29sO1xuXG4gICAgQGlmICRncmlkLWNvbHVtbi1hbGlnbi1lZGdlIHtcbiAgICAgICYuI3skZW5kfSB7XG4gICAgICAgIEBpbmNsdWRlIGdyaWQtY29sLWVuZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb2x1bW4gcm93XG4gIC8vIFRoZSBkb3VibGUgLnJvdyBjbGFzcyBpcyBuZWVkZWQgdG8gYnVtcCB1cCB0aGUgc3BlY2lmaWNpdHlcbiAgLiN7JGNvbHVtbn0uI3skcm93fS4jeyRyb3d9IHtcbiAgICBmbG9hdDogbm9uZTtcblxuICAgIC8vIFRvIHByb3Blcmx5IG5lc3QgYSBjb2x1bW4gcm93LCBwYWRkaW5nIGFuZCBtYXJnaW4gaXMgcmVtb3ZlZFxuICAgIC4jeyRyb3d9ICYge1xuICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgfVxuXG4gIEBpbmNsdWRlIC16Zi1lYWNoLWJyZWFrcG9pbnQge1xuICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggJGdyaWQtY29sdW1uLWNvdW50IHtcbiAgICAgIC8vIENvbHVtbiB3aWR0aFxuICAgICAgLiN7JC16Zi1zaXplfS0jeyRpfSB7XG4gICAgICAgIEBpbmNsdWRlIGdyaWQtY29sLXNpemUoJGkpO1xuICAgICAgfVxuXG4gICAgICAvLyBTb3VyY2Ugb3JkZXJpbmdcbiAgICAgIEBpZiAkaSA8ICRncmlkLWNvbHVtbi1jb3VudCB7XG4gICAgICAgIC4jeyQtemYtc2l6ZX0tI3skcHVzaH0tI3skaX0ge1xuICAgICAgICAgIEBpbmNsdWRlIGdyaWQtY29sLXBvcygkaSk7XG4gICAgICAgIH1cblxuICAgICAgICAuI3skLXpmLXNpemV9LSN7JHB1bGx9LSN7JGl9IHtcbiAgICAgICAgICBAaW5jbHVkZSBncmlkLWNvbC1wb3MoLSRpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPZmZzZXRzXG4gICAgICAkbzogJGkgLSAxO1xuXG4gICAgICAuI3skLXpmLXNpemV9LSN7JG9mZnNldH0tI3skb30ge1xuICAgICAgICBAaW5jbHVkZSBncmlkLWNvbC1vZmYoJG8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJsb2NrIGdyaWRcbiAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoICRibG9jay1ncmlkLW1heCB7XG4gICAgICAuI3skLXpmLXNpemV9LXVwLSN7JGl9IHtcbiAgICAgICAgQGluY2x1ZGUgZ3JpZC1sYXlvdXQoJGkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlc3BvbnNpdmUgY29sbGFwc2luZ1xuICAgIC4jeyQtemYtc2l6ZX0tI3skY29sbGFwc2V9IHtcbiAgICAgID4gLiN7JGNvbHVtbn0geyBAaW5jbHVkZSBncmlkLWNvbC1jb2xsYXBzZTsgfVxuICAgIH1cblxuICAgIC4jeyQtemYtc2l6ZX0tI3skdW5jb2xsYXBzZX0ge1xuICAgICAgJGd1dHRlcjogbnVsbDtcbiAgICAgIFxuICAgICAgQGlmICRncmlkLWNvbHVtbi1ndXR0ZXIge1xuICAgICAgICAkZ3V0dGVyOiAkZ3JpZC1jb2x1bW4tZ3V0dGVyO1xuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICAkZ3V0dGVyOiAtemYtZ2V0LWJwLXZhbCgkZ3JpZC1jb2x1bW4tcmVzcG9uc2l2ZS1ndXR0ZXIsICQtemYtc2l6ZSk7XG4gICAgICB9XG4gICAgICA+IC4jeyRjb2x1bW59IHsgQGluY2x1ZGUgZ3JpZC1jb2wtdW5jb2xsYXBzZSgkZ3V0dGVyKTsgfVxuICAgIH1cblxuICAgIC8vIFBvc2l0aW9uaW5nXG4gICAgLiN7JC16Zi1zaXplfS0jeyRjZW50ZXJ9IHtcbiAgICAgIEBpbmNsdWRlIGdyaWQtY29sLXBvcyhjZW50ZXIpO1xuICAgIH1cblxuICAgIC8vIEd1dHRlciBhZGp1c3RtZW50XG4gICAgLiN7JC16Zi1zaXplfS0jeyR1bmNlbnRlcn0sXG4gICAgLiN7JC16Zi1zaXplfS0jeyRwdXNofS0wLFxuICAgIC4jeyQtemYtc2l6ZX0tI3skcHVsbH0tMCB7XG4gICAgICBAaW5jbHVkZSBncmlkLWNvbC11bnBvcztcbiAgICB9XG4gIH1cblxuICBAaWYgJGNvbHVtbiA9PSAnY29sdW1uJyB7XG4gICAgLmNvbHVtbnMge1xuICAgICAgLy8gc2Nzcy1saW50OmRpc2FibGUgUGxhY2Vob2xkZXJJbkV4dGVuZFxuICAgICAgQGV4dGVuZCAuY29sdW1uO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZ3JpZFxuLy8vL1xuXG4vLy8gU2l6ZXMgY2hpbGQgZWxlbWVudHMgc28gdGhhdCBgJG5gIG51bWJlciBvZiBpdGVtcyBhcHBlYXIgb24gZWFjaCByb3cuXG4vLy9cbi8vLyBAcGFyYW0ge051bWJlcn0gJG4gLSBOdW1iZXIgb2YgZWxlbWVudHMgdG8gZGlzcGxheSBwZXIgcm93LlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkc2VsZWN0b3IgWycuY29sdW1uJ10gLSBTZWxlY3RvcihzKSB0byB1c2UgZm9yIGNoaWxkIGVsZW1lbnRzLlxuQG1peGluIGdyaWQtbGF5b3V0KFxuICAkbixcbiAgJHNlbGVjdG9yOiAnLmNvbHVtbidcbikge1xuICAmID4gI3skc2VsZWN0b3J9IHtcbiAgICB3aWR0aDogcGVyY2VudGFnZSgxLyRuKTtcbiAgICBmbG9hdDogJGdsb2JhbC1sZWZ0O1xuXG4gICAgJjpudGgtb2YtdHlwZSgxbikge1xuICAgICAgY2xlYXI6IG5vbmU7XG4gICAgfVxuXG4gICAgJjpudGgtb2YtdHlwZSgjeyRufW4rMSkge1xuICAgICAgY2xlYXI6IGJvdGg7XG4gICAgfVxuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGZsb2F0OiBsZWZ0O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZmxleC1ncmlkXG4vLy8vXG5cbiQtemYtZmxleC1qdXN0aWZ5OiAoXG4gICdsZWZ0JzogZmxleC1zdGFydCxcbiAgJ3JpZ2h0JzogZmxleC1lbmQsXG4gICdjZW50ZXInOiBjZW50ZXIsXG4gICdqdXN0aWZ5Jzogc3BhY2UtYmV0d2VlbixcbiAgJ3NwYWNlZCc6IHNwYWNlLWFyb3VuZCxcbik7XG5cbiQtemYtZmxleC1hbGlnbjogKFxuICAndG9wJzogZmxleC1zdGFydCxcbiAgJ2JvdHRvbSc6IGZsZXgtZW5kLFxuICAnbWlkZGxlJzogY2VudGVyLFxuICAnc3RyZXRjaCc6IHN0cmV0Y2gsXG4pO1xuXG4vLy8gQ3JlYXRlcyBhIGNvbnRhaW5lciBmb3IgYSBmbGV4IGdyaWQgcm93LlxuLy8vXG4vLy8gQHBhcmFtIHtLZXl3b3JkfExpc3R9ICRiZWhhdmlvciBbbnVsbF1cbi8vLyAgIE1vZGlmaWNhdGlvbnMgdG8gdGhlIGRlZmF1bHQgZ3JpZCBzdHlsZXMuIGBuZXN0YCBpbmRpY2F0ZXMgdGhlIHJvdyB3aWxsIGJlIHBsYWNlZCBpbnNpZGUgYW5vdGhlciByb3cuIGBjb2xsYXBzZWAgaW5kaWNhdGVzIHRoYXQgdGhlIGNvbHVtbnMgaW5zaWRlIHRoaXMgcm93IHdpbGwgbm90IGhhdmUgcGFkZGluZy4gYG5lc3QgY29sbGFwc2VgIGNvbWJpbmVzIGJvdGggYmVoYXZpb3JzLlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkd2lkdGggWyRncmlkLXJvdy13aWR0aF0gLSBNYXhpbXVtIHdpZHRoIG9mIHRoZSByb3cuXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRjb2x1bW5zIFtudWxsXSAtIE51bWJlciBvZiBjb2x1bW5zIHRvIHVzZSBmb3IgdGhpcyByb3cuIElmIHNldCB0byBgbnVsbGAgKHRoZSBkZWZhdWx0KSwgdGhlIGdsb2JhbCBjb2x1bW4gY291bnQgd2lsbCBiZSB1c2VkLlxuLy8vIEBwYXJhbSB7Qm9vbGVhbn0gJGJhc2UgW3RydWVdIC0gU2V0IHRvIGBmYWxzZWAgdG8gcHJldmVudCBiYXNpYyBzdHlsZXMgZnJvbSBiZWluZyBvdXRwdXQuIFVzZWZ1bCBpZiB5b3UncmUgY2FsbGluZyB0aGlzIG1peGluIG9uIHRoZSBzYW1lIGVsZW1lbnQgdHdpY2UsIGFzIGl0IHByZXZlbnRzIGR1cGxpY2F0ZSBDU1Mgb3V0cHV0LlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkZ3V0dGVyIFskZ3JpZC1jb2x1bW4tZ3V0dGVyXSAtIEd1dHRlciB0byB1c2Ugd2hlbiBpbnZlcnRpbmcgbWFyZ2lucywgaW4gY2FzZSB0aGUgcm93IGlzIG5lc3RlZC5cbkBtaXhpbiBmbGV4LWdyaWQtcm93KFxuICAkYmVoYXZpb3I6IG51bGwsXG4gICR3aWR0aDogJGdyaWQtcm93LXdpZHRoLFxuICAkY29sdW1uczogbnVsbCxcbiAgJGJhc2U6IHRydWUsXG4gICRndXR0ZXI6ICRncmlkLWNvbHVtbi1ndXR0ZXJcbikge1xuICAkYmVoYXZpb3I6IC16Zi1nZXQtb3B0aW9ucygkYmVoYXZpb3IsIG5lc3QgY29sbGFwc2UpO1xuICAkbWFyZ2luOiBhdXRvO1xuXG4gIEBpZiBtYXAtZ2V0KCRiZWhhdmlvciwgbmVzdCkge1xuICAgIEBpbmNsdWRlIGdyaWQtcm93LW5lc3QoJGd1dHRlcik7XG5cbiAgICBAaWYgbWFwLWdldCgkYmVoYXZpb3IsIGNvbGxhcHNlKSB7XG4gICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gIH1cbiAgQGVsc2Uge1xuICAgIG1heC13aWR0aDogJHdpZHRoO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxuXG4gIEBpZiAkYmFzZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICB9XG5cbiAgQGlmICRjb2x1bW5zICE9IG51bGwge1xuICAgIEBpbmNsdWRlIGdyaWQtY29udGV4dCgkY29sdW1ucywgJGJhc2UpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuXG4vLy8gQ2FsY3VsYXRlcyB0aGUgYGZsZXhgIHByb3BlcnR5IGZvciBhIGZsZXggZ3JpZCBjb2x1bW4uIEl0IGFjY2VwdHMgYWxsIG9mIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGUgYmFzaWMgYGdyaWQtY29sdW1uKClgIGZ1bmN0aW9uLCBhbG9uZyB3aXRoIHR3byBleHRyYXM6XG4vLy8gICAtIGBudWxsYCAodGhlIGRlZmF1bHQpIHdpbGwgbWFrZSB0aGUgY29sdW1uIGV4cGFuZCB0byBmaWxsIHNwYWNlLlxuLy8vICAgLSBgc2hyaW5rYCB3aWxsIG1ha2UgdGhlIGNvbHVtbiBjb250cmFjdCwgc28gaXQgb25seSB0YWtlcyB1cCB0aGUgaG9yaXpvbnRhbCBzcGFjZSBpdCBuZWVkcy5cbi8vL1xuLy8vIEBwYXJhbSB7TWl4ZWR9ICRjb2x1bW5zIFtudWxsXSAtIFdpZHRoIG9mIHRoZSBjb2x1bW4uXG5AZnVuY3Rpb24gZmxleC1ncmlkLWNvbHVtbigkY29sdW1uczogbnVsbCkge1xuICAkZmxleDogMSAxIDBweDtcblxuICBAaWYgJGNvbHVtbnMgPT0gc2hyaW5rIHtcbiAgICAkZmxleDogMCAwIGF1dG87XG4gIH1cbiAgQGVsc2UgaWYgJGNvbHVtbnMgIT0gbnVsbCB7XG4gICAgJGZsZXg6IDAgMCBncmlkLWNvbHVtbigkY29sdW1ucyk7XG4gIH1cblxuICBAcmV0dXJuICRmbGV4O1xufVxuXG4vLy8gQ3JlYXRlcyBhIGNvbHVtbiBmb3IgYSBmbGV4IGdyaWQuIEJ5IGRlZmF1bHQsIHRoZSBjb2x1bW4gd2lsbCBzdHJldGNoIHRvIHRoZSBmdWxsIHdpZHRoIG9mIGl0cyBjb250YWluZXIsIGJ1dCB0aGlzIGNhbiBiZSBvdmVycmlkZGVuIHdpdGggc2l6aW5nIGNsYXNzZXMsIG9yIGJ5IHVzaW5nIHRoZSBgdW5zdGFja2AgY2xhc3Mgb24gdGhlIHBhcmVudCBmbGV4IHJvdy5cbi8vL1xuLy8vIEBwYXJhbSB7TWl4ZWR9ICRjb2x1bW5zIFtudWxsXSAtIFdpZHRoIG9mIHRoZSBjb2x1bW4uIFJlZmVyIHRvIHRoZSBgZmxleC1ncmlkLWNvbHVtbigpYCBmdW5jdGlvbiB0byBzZWUgcG9zc2libGUgdmFsdWVzLlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkZ3V0dGVyIFskZ3JpZC1jb2x1bW4tZ3V0dGVyXSAtIFNwYWNlIGJldHdlZW4gY29sdW1ucywgYWRkZWQgYXMgYSBsZWZ0IGFuZCByaWdodCBwYWRkaW5nLlxuQG1peGluIGZsZXgtZ3JpZC1jb2x1bW4oXG4gICRjb2x1bW5zOiBudWxsLFxuICAkZ3V0dGVyOiAkZ3JpZC1jb2x1bW4tZ3V0dGVyXG4pIHtcbiAgQGlmICRndXR0ZXIgIT0gbnVsbCB7XG4gICAgJGd1dHRlcjogcmVtLWNhbGMoJGd1dHRlcikgLyAyO1xuICB9XG4gIEBlbHNlIHtcbiAgICBAZWFjaCAkYnJlYWtwb2ludCwgJGd1dHRlciBpbiAkZ3JpZC1jb2x1bW4tcmVzcG9uc2l2ZS1ndXR0ZXIge1xuICAgICAgJHBhZGRpbmc6IHJlbS1jYWxjKCRndXR0ZXIpIC8gMjtcbiAgICAgIFxuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgkYnJlYWtwb2ludCkge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6ICRwYWRkaW5nO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAkcGFkZGluZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmbGV4OiBmbGV4LWdyaWQtY29sdW1uKCRjb2x1bW5zKTtcbiAgcGFkZGluZy1sZWZ0OiAkZ3V0dGVyO1xuICBwYWRkaW5nLXJpZ2h0OiAkZ3V0dGVyO1xuXG4gIC8vIG1heC13aWR0aCBmaXhlcyBJRSAxMC8xMSBub3QgcmVzcGVjdGluZyB0aGUgZmxleC1iYXNpcyBwcm9wZXJ0eVxuICBAaWYgJGNvbHVtbnMgIT0gbnVsbCBhbmQgJGNvbHVtbnMgIT0gc2hyaW5rIHtcbiAgICBtYXgtd2lkdGg6IGdyaWQtY29sdW1uKCRjb2x1bW5zKTtcbiAgfVxufVxuXG4vLy8gQ2hhbmdlcyB0aGUgc291cmNlIG9yZGVyIG9mIGEgZmxleCBncmlkIGNvbHVtbi4gQ29sdW1ucyB3aXRoIGxvd2VyIG51bWJlcnMgYXBwZWFyIGZpcnN0IGluIHRoZSBsYXlvdXQuXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRvcmRlciBbMF0gLSBPcmRlciBudW1iZXIgdG8gYXBwbHkuXG5AbWl4aW4gZmxleC1ncmlkLW9yZGVyKCRvcmRlcjogMCkge1xuICBvcmRlcjogJG9yZGVyO1xufVxuXG4vLy8gSG9yaXpvbnRhbGx5IG9yIHZlcnRpY2FsbHkgYWxpZ25zIHRoZSBjb2x1bW5zIHdpdGhpbiBhIGZsZXggcm93LiBBcHBseSB0aGlzIG1peGluIHRvIGEgZmxleCByb3cuXG4vLy9cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICR4IFtudWxsXSAtIEhvcml6b250YWwgYWxpZ25tZW50IHRvIHVzZS4gQ2FuIGJlIGBsZWZ0YCwgYHJpZ2h0YCwgYGNlbnRlcmAsIGBqdXN0aWZ5YCwgb3IgYHNwYWNlZGAuIE9yLCBzZXQgaXQgdG8gYG51bGxgICh0aGUgZGVmYXVsdCkgdG8gbm90IHNldCBob3Jpem9udGFsIGFsaWdubWVudC5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICR5IFtudWxsXSAtIFZlcnRpY2FsIGFsaWdubWVudCB0byB1c2UuIENhbiBiZSBgdG9wYCwgYGJvdHRvbWAsIGBtaWRkbGVgLCBvciBgc3RyZXRjaGAuIE9yLCBzZXQgaXQgdG8gYG51bGxgICh0aGUgZGVmYXVsdCkgdG8gbm90IHNldCB2ZXJ0aWNhbCBhbGlnbm1lbnQuXG5AbWl4aW4gZmxleC1ncmlkLXJvdy1hbGlnbigkeDogbnVsbCwgJHk6IG51bGwpIHtcbiAgQGlmICR4IHtcbiAgICBAaWYgbWFwLWhhcy1rZXkoJC16Zi1mbGV4LWp1c3RpZnksICR4KSB7XG4gICAgICAkeDogbWFwLWdldCgkLXpmLWZsZXgtanVzdGlmeSwgJHgpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICBAd2FybiAnZmxleC1ncmlkLXJvdy1hbGlnbigpOiAjeyR4fSBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgaG9yaXpvbnRhbCBhbGlnbm1lbnQuIFVzZSBsZWZ0LCByaWdodCwgY2VudGVyLCBqdXN0aWZ5LCBvciBzcGFjZWQuJ1xuICAgIH1cbiAgfVxuXG4gIEBpZiAkeSB7XG4gICAgQGlmIG1hcC1oYXMta2V5KCQtemYtZmxleC1hbGlnbiwgJHkpIHtcbiAgICAgICR5OiBtYXAtZ2V0KCQtemYtZmxleC1hbGlnbiwgJHkpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICBAd2FybiAnZmxleC1ncmlkLXJvdy1hbGlnbigpOiAjeyR5fSBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdmVydGljYWwgYWxpZ25tZW50LiBVc2UgdG9wLCBib3R0b20sIG1pZGRsZSwgb3Igc3RyZXRjaC4nXG4gICAgfVxuICB9XG5cbiAganVzdGlmeS1jb250ZW50OiAkeDtcbiAgYWxpZ24taXRlbXM6ICR5O1xufVxuXG4vLy8gVmVydGljYWxseSBhbGlnbiBhIHNpbmdsZSBjb2x1bW4gd2l0aGluIGEgZmxleCByb3cuIEFwcGx5IHRoaXMgbWl4aW4gdG8gYSBmbGV4IGNvbHVtbi5cbi8vL1xuLy8vIEBwYXJhbSB7S2V5d29yZH0gJHkgW251bGxdIC0gVmVydGljYWwgYWxpZ25tZW50IHRvIHVzZS4gQ2FuIGJlIGB0b3BgLCBgYm90dG9tYCwgYG1pZGRsZWAsIG9yIGBzdHJldGNoYC4gT3IsIHNldCBpdCB0byBgbnVsbGAgKHRoZSBkZWZhdWx0KSB0byBub3Qgc2V0IHZlcnRpY2FsIGFsaWdubWVudC5cbkBtaXhpbiBmbGV4LWdyaWQtY29sdW1uLWFsaWduKCR5OiBudWxsKSB7XG4gIEBpZiAkeSB7XG4gICAgQGlmIG1hcC1oYXMta2V5KCQtemYtZmxleC1hbGlnbiwgJHkpIHtcbiAgICAgICR5OiBtYXAtZ2V0KCQtemYtZmxleC1hbGlnbiwgJHkpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICBAd2FybiAnZmxleC1ncmlkLWNvbHVtbi1hbGlnbigpOiAjeyR5fSBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgYWxpZ25tZW50LiBVc2UgdG9wLCBib3R0b20sIG1pZGRsZSwgb3Igc3RyZXRjaC4nXG4gICAgfVxuICB9XG5cbiAgYWxpZ24tc2VsZjogJHk7XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWZsZXgtZ3JpZCB7XG4gIC8vIFJvd1xuICAucm93IHtcbiAgICBAaW5jbHVkZSBmbGV4LWdyaWQtcm93O1xuXG4gICAgLy8gTmVzdGluZyBiZWhhdmlvclxuICAgICYgJixcbiAgICAuY29sdW1uLXJvdyAmIHtcbiAgICAgIEBpbmNsdWRlIGZsZXgtZ3JpZC1yb3cobmVzdCwgJGJhc2U6IGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBFeHBhbmRlZCByb3dcbiAgICAmLmV4cGFuZGVkIHtcbiAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICB9XG5cbiAgICAmLmNvbGxhcHNlIHtcbiAgICAgID4gLmNvbHVtbiB7IEBpbmNsdWRlIGdyaWQtY29sLWNvbGxhcHNlOyB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ29sdW1uXG4gIC5jb2x1bW4ge1xuICAgIEBpbmNsdWRlIGZsZXgtZ3JpZC1jb2x1bW47XG4gIH1cblxuICBAaW5jbHVkZSAtemYtZWFjaC1icmVha3BvaW50IHtcbiAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoICRncmlkLWNvbHVtbi1jb3VudCB7XG4gICAgICAvLyBTaXppbmcgKHBlcmNlbnRhZ2UpXG4gICAgICAuI3skLXpmLXNpemV9LSN7JGl9IHtcbiAgICAgICAgZmxleDogZmxleC1ncmlkLWNvbHVtbigkaSk7XG4gICAgICAgIG1heC13aWR0aDogZ3JpZC1jb2x1bW4oJGkpO1xuICAgICAgfVxuXG4gICAgICAvLyBPZmZzZXRzXG4gICAgICAkbzogJGkgLSAxO1xuXG4gICAgICAuI3skLXpmLXNpemV9LW9mZnNldC0jeyRvfSB7XG4gICAgICAgIEBpbmNsdWRlIGdyaWQtY29sdW1uLW9mZnNldCgkbyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCA2IHtcbiAgICAgIC8vIFNvdXJjZSBvcmRlcmluZ1xuICAgICAgLiN7JC16Zi1zaXplfS1vcmRlci0jeyRpfSB7XG4gICAgICAgIEBpbmNsdWRlIGZsZXgtZ3JpZC1vcmRlcigkaSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQGlmICQtemYtc2l6ZSAhPSBzbWFsbCB7XG4gICAgICAvLyBTaXppbmcgKGV4cGFuZClcbiAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJC16Zi1zaXplKSB7XG4gICAgICAgIC4jeyQtemYtc2l6ZX0tZXhwYW5kIHtcbiAgICAgICAgICBmbGV4OiBmbGV4LWdyaWQtY29sdW1uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQXV0by1zdGFja2luZy91bnN0YWNraW5nXG4gICAgICBAYXQtcm9vdCAod2l0aG91dDogbWVkaWEpIHtcbiAgICAgICAgLnJvdy4jeyQtemYtc2l6ZX0tdW5zdGFjayB7XG4gICAgICAgICAgLmNvbHVtbiB7XG4gICAgICAgICAgICBmbGV4OiBmbGV4LWdyaWQtY29sdW1uKDEwMCUpO1xuXG4gICAgICAgICAgICBAaW5jbHVkZSBicmVha3BvaW50KCQtemYtc2l6ZSkge1xuICAgICAgICAgICAgICBmbGV4OiBmbGV4LWdyaWQtY29sdW1uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVzcG9uc2l2ZSBjb2xsYXBzaW5nXG4gICAgLiN7JC16Zi1zaXplfS1jb2xsYXBzZSB7XG4gICAgICA+IC5jb2x1bW4geyBAaW5jbHVkZSBncmlkLWNvbC1jb2xsYXBzZTsgfVxuICAgIH1cblxuICAgIC4jeyQtemYtc2l6ZX0tdW5jb2xsYXBzZSB7XG4gICAgICBAaWYgJGdyaWQtY29sdW1uLWd1dHRlciB7XG4gICAgICAgICRndXR0ZXI6ICRncmlkLWNvbHVtbi1ndXR0ZXI7XG4gICAgICB9XG4gICAgICBAZWxzZSB7XG4gICAgICAgICRndXR0ZXI6IC16Zi1nZXQtYnAtdmFsKCRncmlkLWNvbHVtbi1yZXNwb25zaXZlLWd1dHRlciwgJC16Zi1zaXplKTtcbiAgICAgIH1cbiAgICAgID4gLmNvbHVtbiB7IEBpbmNsdWRlIGdyaWQtY29sLXVuY29sbGFwc2UoJGd1dHRlcik7IH1cbiAgICB9XG4gIH1cblxuICAvLyBTaXppbmcgKHNocmluaylcbiAgLnNocmluayB7XG4gICAgZmxleDogZmxleC1ncmlkLWNvbHVtbihzaHJpbmspO1xuICB9XG5cbiAgLy8gSG9yaXpvbnRhbCBhbGlnbm1lbnQgdXNpbmcganVzdGlmeS1jb250ZW50XG4gIEBlYWNoICRoZGlyLCAkcHJvcCBpbiBtYXAtcmVtb3ZlKCQtemYtZmxleC1qdXN0aWZ5LCBsZWZ0KSB7XG4gICAgLnJvdy5hbGlnbi0jeyRoZGlyfSB7XG4gICAgICBAaW5jbHVkZSBmbGV4LWdyaWQtcm93LWFsaWduKCR4OiAkaGRpcik7XG4gICAgfVxuICB9XG5cbiAgLy8gVmVydGljYWwgYWxpZ25tZW50IHVzaW5nIGFsaWduLWl0ZW1zIGFuZCBhbGlnbi1zZWxmXG4gIEBlYWNoICR2ZGlyLCAkcHJvcCBpbiAkLXpmLWZsZXgtYWxpZ24ge1xuICAgIC5yb3cuYWxpZ24tI3skdmRpcn0ge1xuICAgICAgQGluY2x1ZGUgZmxleC1ncmlkLXJvdy1hbGlnbigkeTogJHZkaXIpO1xuICAgIH1cblxuICAgIC5jb2x1bW4uYWxpZ24tI3skdmRpcn0ge1xuICAgICAgQGluY2x1ZGUgZmxleC1ncmlkLWNvbHVtbi1hbGlnbigkdmRpcik7XG4gICAgfVxuICB9XG5cbiAgLmNvbHVtbnMge1xuICAgIC8vIHNjc3MtbGludDpkaXNhYmxlIFBsYWNlaG9sZGVySW5FeHRlbmRcbiAgICBAZXh0ZW5kIC5jb2x1bW47XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIHR5cG9ncmFwaHlcbi8vLy9cblxuLy8gc2Nzcy1saW50OmRpc2FibGUgRGVjbGFyYXRpb25PcmRlclxuXG4vLyBCYXNlIHR5cG9ncmFwaHkgc3R5bGVzICh0YWdzIG9ubHkpXG5AaW1wb3J0ICdiYXNlJztcblxuLy8gVHlwb2dyYXBoeSBoZWxwZXIgY2xhc3NlcyAoY2xhc3NlcyBvbmx5KVxuQGltcG9ydCAnaGVscGVycyc7XG5cbi8vIFRleHQgYWxpZ25tZW50IGNsYXNzZXNcbkBpbXBvcnQgJ2FsaWdubWVudCc7XG5cbi8vIFByaW50IHN0eWxlc1xuQGltcG9ydCAncHJpbnQnO1xuXG5AbWl4aW4gZm91bmRhdGlvbi10eXBvZ3JhcGh5IHtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi10eXBvZ3JhcGh5LWJhc2U7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tdHlwb2dyYXBoeS1oZWxwZXJzO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXRleHQtYWxpZ25tZW50O1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLXByaW50LXN0eWxlcztcbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIHR5cG9ncmFwaHktYmFzZVxuLy8vL1xuXG4vLyBCYXNlIFR5cG9ncmFwaHlcbi8vIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtXG4vLyBUaGVzZSBhcmUgc3R5bGVzIGFwcGxpZWQgdG8gYmFzaWMgSFRNTCB0YWdzLCBpbmNsdWRpbmc6XG4vLyAgIC0gUGFyYWdyYXBocyA8cD5cbi8vICAgLSBCb2xkL2l0YWxpY3MgPGI+IDxzdHJvbmc+IDxpPiA8ZW0+XG4vLyAgIC0gU21hbGwgdGV4dCA8c21hbGw+XG4vLyAgIC0gSGVhZGluZ3MgPGgxPuKAlDxoNj5cbi8vICAgLSBBbmNob3JzIDxhPlxuLy8gICAtIERpdmlkZXJzIDxocj5cbi8vICAgLSBMaXN0cyA8dWw+IDxvbD4gPGRsPlxuLy8gICAtIEJsb2NrcXVvdGVzIDxibG9ja3F1b3RlPlxuLy8gICAtIENvZGUgYmxvY2tzIDxjb2RlPlxuLy8gICAtIEFiYnJldmlhdGlvbnMgPGFiYnI+XG4vLyAgIC0gQ2l0YXRpb25zIDxjaXRlPlxuLy8gICAtIEtleXN0cm9rZXMgPGtiZD5cblxuLy8vIEZvbnQgZmFtaWx5IGZvciBoZWFkZXIgZWxlbWVudHMuXG4vLy8gQHR5cGUgU3RyaW5nIHwgTGlzdFxuJGhlYWRlci1mb250LWZhbWlseTogJGJvZHktZm9udC1mYW1pbHkgIWRlZmF1bHQ7XG5cbi8vLyBGb250IHdlaWdodCBvZiBoZWFkZXJzLlxuLy8vIEB0eXBlIFN0cmluZ1xuJGhlYWRlci1mb250LXdlaWdodDogJGdsb2JhbC13ZWlnaHQtbm9ybWFsICFkZWZhdWx0O1xuXG4vLy8gRm9udCBzdHlsZSAoZS5nLiBpdGFsaWNpemVkKSBvZiBoZWFkZXJzLlxuLy8vIEB0eXBlIFN0cmluZ1xuJGhlYWRlci1mb250LXN0eWxlOiBub3JtYWwgIWRlZmF1bHQ7XG5cbi8vLyBGb250IHN0YWNrIHVzZWQgZm9yIGVsZW1lbnRzIHRoYXQgdXNlIG1vbm9zcGFjZWQgdHlwZSwgc3VjaCBhcyBjb2RlIHNhbXBsZXNcbi8vLyBAdHlwZSBTdHJpbmcgfCBMaXN0XG4kZm9udC1mYW1pbHktbW9ub3NwYWNlOiBDb25zb2xhcywgJ0xpYmVyYXRpb24gTW9ubycsIENvdXJpZXIsIG1vbm9zcGFjZSAhZGVmYXVsdDtcblxuLy8vIFNpemVzIG9mIGhlYWRpbmdzIGF0IHZhcmlvdXMgc2NyZWVuIHNpemVzLiBFYWNoIGtleSBpcyBhIGJyZWFrcG9pbnQsIGFuZCBlYWNoIHZhbHVlIGlzIGEgbWFwIG9mIGhlYWRpbmcgc2l6ZXMuXG4vLy8gQHR5cGUgTWFwXG4kaGVhZGVyLXNpemVzOiAoXG4gIHNtYWxsOiAoXG4gICAgJ2gxJzogMjQsXG4gICAgJ2gyJzogMjAsXG4gICAgJ2gzJzogMTksXG4gICAgJ2g0JzogMTgsXG4gICAgJ2g1JzogMTcsXG4gICAgJ2g2JzogMTYsXG4gICksXG4gIG1lZGl1bTogKFxuICAgICdoMSc6IDQ4LFxuICAgICdoMic6IDQwLFxuICAgICdoMyc6IDMxLFxuICAgICdoNCc6IDI1LFxuICAgICdoNSc6IDIwLFxuICAgICdoNic6IDE2LFxuICApLFxuKSAhZGVmYXVsdDtcblxuLy8vIENvbG9yIG9mIGhlYWRlcnMuXG4vLy8gQHR5cGUgQ29sb3JcbiRoZWFkZXItY29sb3I6IGluaGVyaXQgIWRlZmF1bHQ7XG5cbi8vLyBMaW5lIGhlaWdodCBvZiBoZWFkZXJzLlxuLy8vIEB0eXBlIE51bWJlclxuJGhlYWRlci1saW5laGVpZ2h0OiAxLjQgIWRlZmF1bHQ7XG5cbi8vLyBCb3R0b20gbWFyZ2luIG9mIGhlYWRlcnMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kaGVhZGVyLW1hcmdpbi1ib3R0b206IDAuNXJlbSAhZGVmYXVsdDtcblxuLy8vIFRleHQgcmVuZGVyaW5nIG1ldGhvZCBvZiBoZWFkZXJzLlxuLy8vIEB0eXBlIFN0cmluZ1xuJGhlYWRlci10ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5ICFkZWZhdWx0O1xuXG4vLy8gRm9udCBzaXplIG9mIGA8c21hbGw+YCBlbGVtZW50cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRzbWFsbC1mb250LXNpemU6IDgwJSAhZGVmYXVsdDtcblxuLy8vIENvbG9yIG9mIGA8c21hbGw+YCBlbGVtZW50cyB3aGVuIHBsYWNlZCBpbnNpZGUgaGVhZGVycy5cbi8vLyBAdHlwZSBDb2xvclxuJGhlYWRlci1zbWFsbC1mb250LWNvbG9yOiAkbWVkaXVtLWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBMaW5lIGhlaWdodCBvZiB0ZXh0IGluc2lkZSBgPHA+YCBlbGVtZW50cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRwYXJhZ3JhcGgtbGluZWhlaWdodDogMS42ICFkZWZhdWx0O1xuXG4vLy8gQm90dG9tIG1hcmdpbiBvZiBwYXJhZ3JhcGhzLlxuLy8vIEB0eXBlIE51bWJlclxuJHBhcmFncmFwaC1tYXJnaW4tYm90dG9tOiAxcmVtICFkZWZhdWx0O1xuXG4vLy8gVGV4dCByZW5kZXJpbmcgbWV0aG9kIGZvciBwYXJhZ3JhcGggdGV4dC5cbi8vLyBAdHlwZSBTdHJpbmdcbiRwYXJhZ3JhcGgtdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eSAhZGVmYXVsdDtcblxuLy8vIFRleHQgY29sb3Igb2YgY29kZSBzYW1wbGVzLlxuLy8vIEB0eXBlIENvbG9yXG4kY29kZS1jb2xvcjogJGJsYWNrICFkZWZhdWx0O1xuXG4vLy8gRm9udCBmYW1pbHkgb2YgY29kZSBzYW1wbGVzLlxuLy8vIEB0eXBlIFN0cmluZyB8IExpc3RcbiRjb2RlLWZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktbW9ub3NwYWNlICFkZWZhdWx0O1xuXG4vLy8gRm9udCB3ZWlnaHQgb2YgdGV4dCBpbiBjb2RlIHNhbXBsZXMuXG4vLy8gQHR5cGUgU3RyaW5nXG4kY29kZS1mb250LXdlaWdodDogJGdsb2JhbC13ZWlnaHQtbm9ybWFsICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBvZiBjb2RlIHNhbXBsZXMuXG4vLy8gQHR5cGUgQ29sb3JcbiRjb2RlLWJhY2tncm91bmQ6ICRsaWdodC1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gQm9yZGVyIGFyb3VuZCBjb2RlIHNhbXBsZXMuXG4vLy8gQHR5cGUgTGlzdFxuJGNvZGUtYm9yZGVyOiAxcHggc29saWQgJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gUGFkZGluZyBhcm91bmQgdGV4dCBvZiBjb2RlIHNhbXBsZXMuXG4vLy8gQHR5cGUgTnVtYmVyIHwgTGlzdFxuJGNvZGUtcGFkZGluZzogcmVtLWNhbGMoMiA1IDEpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBjb2xvciBmb3IgbGlua3MuXG4vLy8gQHR5cGUgQ29sb3JcbiRhbmNob3ItY29sb3I6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBjb2xvciBmb3IgbGlua3Mgb24gaG92ZXIuXG4vLy8gQHR5cGUgQ29sb3JcbiRhbmNob3ItY29sb3ItaG92ZXI6IHNjYWxlLWNvbG9yKCRhbmNob3ItY29sb3IsICRsaWdodG5lc3M6IC0xNCUpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCB0ZXh0IGRlb2NyYXRpb24gZm9yIGxpbmtzLlxuLy8vIEB0eXBlIFN0cmluZ1xuJGFuY2hvci10ZXh0LWRlY29yYXRpb246IG5vbmUgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHRleHQgZGVjb3JhdGlvbiBmb3IgbGlua3Mgb24gaG92ZXIuXG4vLy8gQHR5cGUgU3RyaW5nXG4kYW5jaG9yLXRleHQtZGVjb3JhdGlvbi1ob3Zlcjogbm9uZSAhZGVmYXVsdDtcblxuLy8vIE1heGltdW0gd2lkdGggb2YgYSBkaXZpZGVyLlxuLy8vIEB0eXBlIE51bWJlclxuJGhyLXdpZHRoOiAkZ2xvYmFsLXdpZHRoICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBib3JkZXIgZm9yIGEgZGl2aWRlci5cbi8vLyBAdHlwZSBMaXN0XG4kaHItYm9yZGVyOiAxcHggc29saWQgJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBtYXJnaW4gZm9yIGEgZGl2aWRlci5cbi8vLyBAdHlwZSBOdW1iZXIgfCBMaXN0XG4kaHItbWFyZ2luOiByZW0tY2FsYygyMCkgYXV0byAhZGVmYXVsdDtcblxuLy8vIExpbmUgaGVpZ2h0IGZvciBpdGVtcyBpbiBhIGxpc3QuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbGlzdC1saW5laGVpZ2h0OiAkcGFyYWdyYXBoLWxpbmVoZWlnaHQgIWRlZmF1bHQ7XG5cbi8vLyBCb3R0b20gbWFyZ2luIGZvciBpdGVtcyBpbiBhIGxpc3QuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbGlzdC1tYXJnaW4tYm90dG9tOiAkcGFyYWdyYXBoLW1hcmdpbi1ib3R0b20gIWRlZmF1bHQ7XG5cbi8vLyBCdWxsZXQgdHlwZSB0byB1c2UgZm9yIHVub3JkZXJlZCBsaXN0cyAoZS5nLiwgYHNxdWFyZWAsIGBjaXJjbGVgLCBgZGlzY2ApLlxuLy8vIEB0eXBlIFN0cmluZ1xuJGxpc3Qtc3R5bGUtdHlwZTogZGlzYyAhZGVmYXVsdDtcblxuLy8vIFBvc2l0aW9uaW5nIGZvciBidWxsZXRzIG9uIHVub3JkZXJlZCBsaXN0IGl0ZW1zLlxuLy8vIEB0eXBlIFN0cmluZ1xuJGxpc3Qtc3R5bGUtcG9zaXRpb246IG91dHNpZGUgIWRlZmF1bHQ7XG5cbi8vLyBMZWZ0IChvciByaWdodCkgbWFyZ2luIGZvciBsaXN0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRsaXN0LXNpZGUtbWFyZ2luOiAxLjI1cmVtICFkZWZhdWx0O1xuXG4vLy8gTGVmdCAob3IgcmlnaHQpIG1hcmdpbiBmb3IgYSBsaXN0IGluc2lkZSBhIGxpc3QuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbGlzdC1uZXN0ZWQtc2lkZS1tYXJnaW46IDEuMjVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBCb3R0b20gbWFyZ2luIGZvciBgPGRsPmAgZWxlbWVudHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kZGVmbmxpc3QtbWFyZ2luLWJvdHRvbTogMXJlbSAhZGVmYXVsdDtcblxuLy8vIEZvbnQgd2VpZ2h0IGZvciBgPGR0PmAgZWxlbWVudHMuXG4vLy8gQHR5cGUgU3RyaW5nXG4kZGVmbmxpc3QtdGVybS13ZWlnaHQ6ICRnbG9iYWwtd2VpZ2h0LWJvbGQgIWRlZmF1bHQ7XG5cbi8vLyBTcGFjaW5nIGJldHdlZW4gYDxkdD5gIGFuZCBgPGRkPmAgZWxlbWVudHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kZGVmbmxpc3QtdGVybS1tYXJnaW4tYm90dG9tOiAwLjNyZW0gIWRlZmF1bHQ7XG5cbi8vLyBUZXh0IGNvbG9yIG9mIGA8YmxvY2txdW90ZT5gIGVsZW1lbnRzLlxuLy8vIEB0eXBlIENvbG9yXG4kYmxvY2txdW90ZS1jb2xvcjogJGRhcmstZ3JheSAhZGVmYXVsdDtcblxuLy8vIFBhZGRpbmcgaW5zaWRlIGEgYDxibG9ja3F1b3RlPmAgZWxlbWVudC5cbi8vLyBAdHlwZSBOdW1iZXIgfCBMaXN0XG4kYmxvY2txdW90ZS1wYWRkaW5nOiByZW0tY2FsYyg5IDIwIDAgMTkpICFkZWZhdWx0O1xuXG4vLy8gU2lkZSBib3JkZXIgZm9yIGA8YmxvY2txdW90ZT5gIGVsZW1lbnRzLlxuLy8vIEB0eXBlIExpc3RcbiRibG9ja3F1b3RlLWJvcmRlcjogMXB4IHNvbGlkICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIEZvbnQgc2l6ZSBmb3IgYDxjaXRlPmAgZWxlbWVudHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kY2l0ZS1mb250LXNpemU6IHJlbS1jYWxjKDEzKSAhZGVmYXVsdDtcblxuLy8vIFRleHQgY29sb3IgZm9yIGA8Y2l0ZT5gIGVsZW1lbnRzLlxuLy8vIEB0eXBlIENvbG9yXG4kY2l0ZS1jb2xvcjogJGRhcmstZ3JheSAhZGVmYXVsdDtcblxuLy8vIEZvbnQgZmFtaWx5IGZvciBgPGtiZD5gIGVsZW1lbnRzLlxuLy8vIEB0eXBlIFN0cmluZyB8IExpc3RcbiRrZXlzdHJva2UtZm9udDogJGZvbnQtZmFtaWx5LW1vbm9zcGFjZSAhZGVmYXVsdDtcblxuLy8vIFRleHQgY29sb3IgZm9yIGA8a2JkPmAgZWxlbWVudHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRrZXlzdHJva2UtY29sb3I6ICRibGFjayAhZGVmYXVsdDtcblxuLy8vIEJhY2tncm91bmQgY29sb3IgZm9yIGA8a2JkPmAgZWxlbWVudHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRrZXlzdHJva2UtYmFja2dyb3VuZDogJGxpZ2h0LWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBQYWRkaW5nIGZvciBgPGtiZD5gIGVsZW1lbnRzLlxuLy8vIEB0eXBlIE51bWJlciB8IExpc3RcbiRrZXlzdHJva2UtcGFkZGluZzogcmVtLWNhbGMoMiA0IDApICFkZWZhdWx0O1xuXG4vLy8gQm9yZGVyIHJhZGl1cyBmb3IgYDxrYmQ+YCBlbGVtZW50cy5cbi8vLyBAdHlwZSBOdW1iZXIgfCBMaXN0XG4ka2V5c3Ryb2tlLXJhZGl1czogJGdsb2JhbC1yYWRpdXMgIWRlZmF1bHQ7XG5cbi8vLyBCb3R0b20gYm9yZGVyIHN0eWxlIGZvciBgPGFiYnI+YCBlbGVtZW50cy5cbi8vLyBAdHlwZSBMaXN0XG4kYWJici11bmRlcmxpbmU6IDFweCBkb3R0ZWQgJGJsYWNrICFkZWZhdWx0O1xuXG5AbWl4aW4gZm91bmRhdGlvbi10eXBvZ3JhcGh5LWJhc2Uge1xuICAvLyBUeXBvZ3JhcGh5IHJlc2V0c1xuICBkaXYsXG4gIGRsLFxuICBkdCxcbiAgZGQsXG4gIHVsLFxuICBvbCxcbiAgbGksXG4gIGgxLFxuICBoMixcbiAgaDMsXG4gIGg0LFxuICBoNSxcbiAgaDYsXG4gIHByZSxcbiAgZm9ybSxcbiAgcCxcbiAgYmxvY2txdW90ZSxcbiAgdGgsXG4gIHRkIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIC8vIFBhcmFncmFwaHNcbiAgcCB7XG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgIGxpbmUtaGVpZ2h0OiAkcGFyYWdyYXBoLWxpbmVoZWlnaHQ7XG4gICAgbWFyZ2luLWJvdHRvbTogJHBhcmFncmFwaC1tYXJnaW4tYm90dG9tO1xuICAgIHRleHQtcmVuZGVyaW5nOiAkcGFyYWdyYXBoLXRleHQtcmVuZGVyaW5nO1xuICB9XG5cbiAgLy8gRW1waGFzaXplZCB0ZXh0XG4gIGVtLFxuICBpIHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gIH1cblxuICAvLyBTdHJvbmcgdGV4dFxuICBzdHJvbmcsXG4gIGIge1xuICAgIGZvbnQtd2VpZ2h0OiAkZ2xvYmFsLXdlaWdodC1ib2xkO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICB9XG5cbiAgLy8gU21hbGwgdGV4dFxuICBzbWFsbCB7XG4gICAgZm9udC1zaXplOiAkc21hbGwtZm9udC1zaXplO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICB9XG5cbiAgLy8gSGVhZGluZ3NcbiAgaDEsXG4gIGgyLFxuICBoMyxcbiAgaDQsXG4gIGg1LFxuICBoNiB7XG4gICAgZm9udC1mYW1pbHk6ICRoZWFkZXItZm9udC1mYW1pbHk7XG4gICAgZm9udC13ZWlnaHQ6ICRoZWFkZXItZm9udC13ZWlnaHQ7XG4gICAgZm9udC1zdHlsZTogJGhlYWRlci1mb250LXN0eWxlO1xuICAgIGNvbG9yOiAkaGVhZGVyLWNvbG9yO1xuICAgIHRleHQtcmVuZGVyaW5nOiAkaGVhZGVyLXRleHQtcmVuZGVyaW5nO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogJGhlYWRlci1tYXJnaW4tYm90dG9tO1xuICAgIGxpbmUtaGVpZ2h0OiAkaGVhZGVyLWxpbmVoZWlnaHQ7XG5cbiAgICBzbWFsbCB7XG4gICAgICBjb2xvcjogJGhlYWRlci1zbWFsbC1mb250LWNvbG9yO1xuICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgfVxuICB9XG5cbiAgLy8gSGVhZGluZyBzaXplc1xuICBAZWFjaCAkc2l6ZSwgJGhlYWRlcnMgaW4gJGhlYWRlci1zaXplcyB7XG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludCgkc2l6ZSkge1xuICAgICAgQGVhY2ggJGhlYWRlciwgJGZvbnQtc2l6ZSBpbiAkaGVhZGVycyB7XG4gICAgICAgICN7JGhlYWRlcn0ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogcmVtLWNhbGMoJGZvbnQtc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBMaW5rc1xuICBhIHtcbiAgICBjb2xvcjogJGFuY2hvci1jb2xvcjtcbiAgICB0ZXh0LWRlY29yYXRpb246ICRhbmNob3ItdGV4dC1kZWNvcmF0aW9uO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBjb2xvcjogJGFuY2hvci1jb2xvci1ob3ZlcjtcbiAgICAgIEBpZiAkYW5jaG9yLXRleHQtZGVjb3JhdGlvbi1ob3ZlciAhPSAkYW5jaG9yLXRleHQtZGVjb3JhdGlvbiB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJGFuY2hvci10ZXh0LWRlY29yYXRpb24taG92ZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW1nIHtcbiAgICAgIGJvcmRlcjogMDtcbiAgICB9XG4gIH1cblxuICAvLyBIb3Jpem9udGFsIHJ1bGVcbiAgaHIge1xuICAgIG1heC13aWR0aDogJGhyLXdpZHRoO1xuICAgIGhlaWdodDogMDtcbiAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgYm9yZGVyLXRvcDogMDtcbiAgICBib3JkZXItYm90dG9tOiAkaHItYm9yZGVyO1xuICAgIGJvcmRlci1sZWZ0OiAwO1xuICAgIG1hcmdpbjogJGhyLW1hcmdpbjtcbiAgICBjbGVhcjogYm90aDtcbiAgfVxuXG4gIC8vIExpc3RzXG4gIHVsLFxuICBvbCxcbiAgZGwge1xuICAgIGxpbmUtaGVpZ2h0OiAkbGlzdC1saW5laGVpZ2h0O1xuICAgIG1hcmdpbi1ib3R0b206ICRsaXN0LW1hcmdpbi1ib3R0b207XG4gICAgbGlzdC1zdHlsZS1wb3NpdGlvbjogJGxpc3Qtc3R5bGUtcG9zaXRpb247XG4gIH1cblxuICAvLyBMaXN0IGl0ZW1zXG4gIGxpIHtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gIH1cblxuICAvLyBVbm9yZGVyZWQgbGlzdHNcbiAgdWwge1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogJGxpc3Qtc3R5bGUtdHlwZTtcbiAgICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiAkbGlzdC1zaWRlLW1hcmdpbjtcbiAgfVxuXG4gIC8vIE9yZGVyZWQgbGlzdHNcbiAgb2wge1xuICAgIG1hcmdpbi0jeyRnbG9iYWwtbGVmdH06ICRsaXN0LXNpZGUtbWFyZ2luO1xuICB9XG5cbiAgLy8gTmVzdGVkIHVub3JkZXJlZC9vcmRlcmVkIGxpc3RzXG4gIHVsLCBvbCB7XG4gICAgJiAmIHtcbiAgICAgIG1hcmdpbi0jeyRnbG9iYWwtbGVmdH06ICRsaXN0LW5lc3RlZC1zaWRlLW1hcmdpbjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVmaW5pdGlvbiBsaXN0c1xuICBkbCB7XG4gICAgbWFyZ2luLWJvdHRvbTogJGRlZm5saXN0LW1hcmdpbi1ib3R0b207XG5cbiAgICBkdCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAkZGVmbmxpc3QtdGVybS1tYXJnaW4tYm90dG9tO1xuICAgICAgZm9udC13ZWlnaHQ6ICRkZWZubGlzdC10ZXJtLXdlaWdodDtcbiAgICB9XG4gIH1cblxuICAvLyBCbG9ja3F1b3Rlc1xuICBibG9ja3F1b3RlIHtcbiAgICBtYXJnaW46IDAgMCAkcGFyYWdyYXBoLW1hcmdpbi1ib3R0b207XG4gICAgcGFkZGluZzogJGJsb2NrcXVvdGUtcGFkZGluZztcbiAgICBib3JkZXItI3skZ2xvYmFsLWxlZnR9OiAkYmxvY2txdW90ZS1ib3JkZXI7XG5cbiAgICAmLCBwIHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAkcGFyYWdyYXBoLWxpbmVoZWlnaHQ7XG4gICAgICBjb2xvcjogJGJsb2NrcXVvdGUtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2l0YXRpb25zXG4gIGNpdGUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogJGNpdGUtZm9udC1zaXplO1xuICAgIGNvbG9yOiAkY2l0ZS1jb2xvcjtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICdcXDIwMTQgXFwwMDIwJztcbiAgICB9XG4gIH1cblxuICAvLyBBYmJyZXZpYXRpb25zXG4gIGFiYnIge1xuICAgIGNvbG9yOiAkYm9keS1mb250LWNvbG9yO1xuICAgIGN1cnNvcjogaGVscDtcbiAgICBib3JkZXItYm90dG9tOiAkYWJici11bmRlcmxpbmU7XG4gIH1cblxuICAvLyBDb2RlXG4gIGNvZGUge1xuICAgIGZvbnQtZmFtaWx5OiAkY29kZS1mb250LWZhbWlseTtcbiAgICBmb250LXdlaWdodDogJGNvZGUtZm9udC13ZWlnaHQ7XG4gICAgY29sb3I6ICRjb2RlLWNvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2RlLWJhY2tncm91bmQ7XG4gICAgYm9yZGVyOiAkY29kZS1ib3JkZXI7XG4gICAgcGFkZGluZzogJGNvZGUtcGFkZGluZztcbiAgfVxuXG4gIC8vIEtleXN0cm9rZXNcbiAga2JkIHtcbiAgICBwYWRkaW5nOiAka2V5c3Ryb2tlLXBhZGRpbmc7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRrZXlzdHJva2UtYmFja2dyb3VuZDtcbiAgICBjb2xvcjogJGtleXN0cm9rZS1jb2xvcjtcbiAgICBmb250LWZhbWlseTogJGtleXN0cm9rZS1mb250O1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCB0eXBvZ3JhcGh5LWhlbHBlcnNcbi8vLy9cblxuLy8vIERlZmF1bHQgZm9udCBzaXplIGZvciBsZWFkIHBhcmFncmFwaHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbGVhZC1mb250LXNpemU6ICRnbG9iYWwtZm9udC1zaXplICogMS4yNSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgbGluZSBoZWlnaHQgZm9yIGxlYWQgcGFyYWdyYXBocy5cbi8vLyBAdHlwZSBTdHJpbmdcbiRsZWFkLWxpbmVoZWlnaHQ6IDEuNiAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgbGluZSBoZWlnaHQgZm9yIHN1YmhlYWRlcnMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kc3ViaGVhZGVyLWxpbmVoZWlnaHQ6IDEuNCAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZm9udCBjb2xvciBmb3Igc3ViaGVhZGVycy5cbi8vLyBAdHlwZSBDb2xvclxuJHN1YmhlYWRlci1jb2xvcjogJGRhcmstZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZm9udCB3ZWlnaHQgZm9yIHN1YmhlYWRlcnMuXG4vLy8gQHR5cGUgU3RyaW5nXG4kc3ViaGVhZGVyLWZvbnQtd2VpZ2h0OiAkZ2xvYmFsLXdlaWdodC1ub3JtYWwgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHRvcCBtYXJnaW4gZm9yIHN1YmhoZWFkZXJzLlxuLy8vIEB0eXBlIE51bWJlclxuJHN1YmhlYWRlci1tYXJnaW4tdG9wOiAwLjJyZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGJvdHRvbSBtYXJnaW4gZm9yIHN1YmhlYWRlcnMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kc3ViaGVhZGVyLW1hcmdpbi1ib3R0b206IDAuNXJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZm9udCBzaXplIGZvciBzdGF0aXN0aWMgbnVtYmVycy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRzdGF0LWZvbnQtc2l6ZTogMi41cmVtICFkZWZhdWx0O1xuXG5AbWl4aW4gZm91bmRhdGlvbi10eXBvZ3JhcGh5LWhlbHBlcnMge1xuICAvLyBVc2UgdG8gY3JlYXRlIGEgc3ViaGVhZGluZyB1bmRlciBhIG1haW4gaGVhZGVyXG4gIC8vIE1ha2Ugc3VyZSB5b3UgcGFpciB0aGUgdHdvIGVsZW1lbnRzIGluIGEgPGhlYWRlcj4gZWxlbWVudCwgbGlrZSB0aGlzOlxuICAvLyA8aGVhZGVyPlxuICAvLyAgIDxoMT5IZWFkaW5nPC9oMT5cbiAgLy8gICA8aDI+U3ViaGVhZGluZzwvaDI+XG4gIC8vIDwvaGVhZGVyPlxuICAuc3ViaGVhZGVyIHtcbiAgICBtYXJnaW4tdG9wOiAkc3ViaGVhZGVyLW1hcmdpbi10b3A7XG4gICAgbWFyZ2luLWJvdHRvbTogJHN1YmhlYWRlci1tYXJnaW4tYm90dG9tO1xuICAgIGZvbnQtd2VpZ2h0OiAkc3ViaGVhZGVyLWZvbnQtd2VpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiAkc3ViaGVhZGVyLWxpbmVoZWlnaHQ7XG4gICAgY29sb3I6ICRzdWJoZWFkZXItY29sb3I7XG4gIH1cblxuICAvLyBVc2UgdG8gc3R5bGUgYW4gaW50cm9kdWN0b3J5IGxlYWQsIGRlY2ssIGJsdXJiLCBldGMuXG4gIC5sZWFkIHtcbiAgICBmb250LXNpemU6ICRsZWFkLWZvbnQtc2l6ZTtcbiAgICBsaW5lLWhlaWdodDogJGxlYWQtbGluZWhlaWdodDtcbiAgfVxuXG4gIC8vIFVzZSB0byBzdHlsZSBhIGxhcmdlIG51bWJlciB0byBkaXNwbGF5IGEgc3RhdGlzdGljXG4gIC5zdGF0IHtcbiAgICBmb250LXNpemU6ICRzdGF0LWZvbnQtc2l6ZTtcbiAgICBsaW5lLWhlaWdodDogMTtcblxuICAgIHAgKyAmIHtcbiAgICAgIG1hcmdpbi10b3A6IC0xcmVtO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVzZSB0byByZW1vdmUgdGhlIGJ1bGxldHMgZnJvbSBhbiB1bm9yZGVyZWQgbGlzdFxuICAubm8tYnVsbGV0IHtcbiAgICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiAwO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG5AbWl4aW4gZm91bmRhdGlvbi10ZXh0LWFsaWdubWVudCB7XG4gIEBlYWNoICRzaXplIGluICRicmVha3BvaW50LWNsYXNzZXMge1xuICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJHNpemUpIHtcbiAgICAgIEBlYWNoICRhbGlnbiBpbiAobGVmdCwgcmlnaHQsIGNlbnRlciwganVzdGlmeSkge1xuICAgICAgICBAaWYgJHNpemUgIT0gJ3NtYWxsJyB7XG4gICAgICAgICAgLiN7JHNpemV9LXRleHQtI3skYWxpZ259IHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246ICRhbGlnbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQGVsc2Uge1xuICAgICAgICAgIC50ZXh0LSN7JGFsaWdufSB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiAkYWxpZ247XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCB0eXBvZ3JhcGh5XG4vLy8vXG5cbi8vIHNjc3MtbGludDpkaXNhYmxlIGFsbFxuXG5AbWl4aW4gZm91bmRhdGlvbi1wcmludC1zdHlsZXMge1xuICAuc2hvdy1mb3ItcHJpbnQgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cblxuICBAbWVkaWEgcHJpbnQge1xuICAgICoge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiBibGFjayAhaW1wb3J0YW50OyAvLyBCbGFjayBwcmludHMgZmFzdGVyOiBoNWJwLmNvbS9zXG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICB0ZXh0LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5zaG93LWZvci1wcmludCB7IGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7IH1cbiAgICAuaGlkZS1mb3ItcHJpbnQgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cblxuICAgIHRhYmxlLnNob3ctZm9yLXByaW50IHsgZGlzcGxheTogdGFibGUgIWltcG9ydGFudDsgfVxuICAgIHRoZWFkLnNob3ctZm9yLXByaW50IHsgZGlzcGxheTogdGFibGUtaGVhZGVyLWdyb3VwICFpbXBvcnRhbnQ7IH1cbiAgICB0Ym9keS5zaG93LWZvci1wcmludCB7IGRpc3BsYXk6IHRhYmxlLXJvdy1ncm91cCAhaW1wb3J0YW50OyB9XG4gICAgdHIuc2hvdy1mb3ItcHJpbnQgeyBkaXNwbGF5OiB0YWJsZS1yb3cgIWltcG9ydGFudDsgfVxuICAgIHRkLnNob3ctZm9yLXByaW50IHsgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50OyB9XG4gICAgdGguc2hvdy1mb3ItcHJpbnQgeyBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7IH1cblxuICAgIC8vIERpc3BsYXkgdGhlIFVSTCBvZiBhIGxpbmsgYWZ0ZXIgdGhlIHRleHRcbiAgICBhLFxuICAgIGE6dmlzaXRlZCB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO31cbiAgICBhW2hyZWZdOmFmdGVyIHsgY29udGVudDogJyAoJyBhdHRyKGhyZWYpICcpJzsgfVxuXG4gICAgLy8gRG9uJ3QgZGlzcGxheSB0aGUgVVJMIGZvciBpbWFnZXMgb3IgSmF2YVNjcmlwdC9pbnRlcm5hbCBsaW5rc1xuICAgIC5pciBhOmFmdGVyLFxuICAgIGFbaHJlZl49J2phdmFzY3JpcHQ6J106YWZ0ZXIsXG4gICAgYVtocmVmXj0nIyddOmFmdGVyIHsgY29udGVudDogJyc7IH1cblxuICAgIC8vIERpc3BsYXkgd2hhdCBhbiBhYmJyZXZpYXRpb24gc3RhbmRzIGZvciBhZnRlciB0aGUgdGV4dFxuICAgIGFiYnJbdGl0bGVdOmFmdGVyIHsgY29udGVudDogJyAoJyBhdHRyKHRpdGxlKSAnKSc7IH1cblxuICAgIC8vIFByZXZlbnQgcGFnZSBicmVha3MgaW4gdGhlIG1pZGRsZSBvZiBhIGJsb2NrcXVvdGUgb3IgcHJlZm9ybWF0dGVkIHRleHQgYmxvY2tcbiAgICBwcmUsXG4gICAgYmxvY2txdW90ZSB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xuICAgICAgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkO1xuICAgIH1cblxuICAgIC8vIGg1YnAuY29tL3RcbiAgICB0aGVhZCB7IGRpc3BsYXk6IHRhYmxlLWhlYWRlci1ncm91cDsgfVxuXG4gICAgdHIsXG4gICAgaW1nIHsgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkOyB9XG5cbiAgICBpbWcgeyBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxuXG4gICAgQHBhZ2UgeyBtYXJnaW46IDAuNWNtOyB9XG5cbiAgICBwLFxuICAgIGgyLFxuICAgIGgzIHtcbiAgICAgIG9ycGhhbnM6IDM7XG4gICAgICB3aWRvd3M6IDM7XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcGFnZSBicmVha3MgYWZ0ZXIgYSBoZWFkaW5nXG4gICAgaDIsXG4gICAgaDMgeyBwYWdlLWJyZWFrLWFmdGVyOiBhdm9pZDsgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmb3Jtc1xuLy8vL1xuXG4vLy8gR2xvYmFsIHNwYWNpbmcgZm9yIGZvcm0gZWxlbWVudHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kZm9ybS1zcGFjaW5nOiByZW0tY2FsYygxNikgIWRlZmF1bHQ7XG5cbkBpbXBvcnRcbiAgJ3RleHQnLFxuICAnY2hlY2tib3gnLFxuICAnbGFiZWwnLFxuICAnaGVscC10ZXh0JyxcbiAgJ2lucHV0LWdyb3VwJyxcbiAgJ2ZpZWxkc2V0JyxcbiAgJ3NlbGVjdCcsXG4gICdlcnJvcic7XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWZvcm1zIHtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1mb3JtLXRleHQ7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZm9ybS1jaGVja2JveDtcbiAgQGluY2x1ZGUgZm91bmRhdGlvbi1mb3JtLWxhYmVsO1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLWZvcm0taGVscHRleHQ7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZm9ybS1wcmVwb3N0Zml4O1xuICBAaW5jbHVkZSBmb3VuZGF0aW9uLWZvcm0tZmllbGRzZXQ7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZm9ybS1zZWxlY3Q7XG4gIEBpbmNsdWRlIGZvdW5kYXRpb24tZm9ybS1lcnJvcjtcbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGZvcm1zXG4vLy8vXG5cbi8vLyBGb250IGNvbG9yIG9mIHRleHQgaW5wdXRzLlxuLy8vIEB0eXBlIENvbG9yXG4kaW5wdXQtY29sb3I6ICRibGFjayAhZGVmYXVsdDtcblxuLy8vIEZvbnQgZmFtaWx5IG9mIHRleHQgaW5wdXRzLlxuLy8vIEB0eXBlIEZvbnRcbiRpbnB1dC1mb250LWZhbWlseTogaW5oZXJpdCAhZGVmYXVsdDtcblxuLy8vIEZvbnQgc2l6ZSBvZiB0ZXh0IGlucHV0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRpbnB1dC1mb250LXNpemU6IHJlbS1jYWxjKDE2KSAhZGVmYXVsdDtcblxuLy8vIEJhY2tncm91bmQgY29sb3Igb2YgdGV4dCBpbnB1dHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRpbnB1dC1iYWNrZ3JvdW5kOiAkd2hpdGUgIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIGZvY3VzZWQgb2YgdGV4dCBpbnB1dHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRpbnB1dC1iYWNrZ3JvdW5kLWZvY3VzOiAkd2hpdGUgIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIGRpc2FibGVkIHRleHQgaW5wdXRzLlxuLy8vIEB0eXBlIENvbG9yXG4kaW5wdXQtYmFja2dyb3VuZC1kaXNhYmxlZDogJGxpZ2h0LWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBCb3JkZXIgYXJvdW5kIHRleHQgaW5wdXRzLlxuLy8vIEB0eXBlIEJvcmRlclxuJGlucHV0LWJvcmRlcjogMXB4IHNvbGlkICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIEJvcmRlciBhcm91bmQgZm9jdXNlZCB0ZXh0IGlucHV0cy5cbi8vLyBAdHlwZSBDb2xvclxuJGlucHV0LWJvcmRlci1mb2N1czogMXB4IHNvbGlkICRkYXJrLWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBCb3ggc2hhZG93IGluc2lkZSB0ZXh0IGlucHV0cyB3aGVuIG5vdCBmb2N1c2VkLlxuLy8vIEB0eXBlIFNoYWRvd1xuJGlucHV0LXNoYWRvdzogaW5zZXQgMCAxcHggMnB4IHJnYmEoJGJsYWNrLCAwLjEpICFkZWZhdWx0O1xuXG4vLy8gQm94IHNoYWRvdyBvdXRzaWRlIHRleHQgaW5wdXRzIHdoZW4gZm9jdXNlZC5cbi8vLyBAdHlwZSBTaGFkb3dcbiRpbnB1dC1zaGFkb3ctZm9jdXM6IDAgMCA1cHggJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gQ3Vyc29yIHRvIHVzZSB3aGVuIGhvdmVyaW5nIG92ZXIgYSBkaXNhYmxlZCB0ZXh0IGlucHV0LlxuLy8vIEB0eXBlIEN1cnNvclxuJGlucHV0LWN1cnNvci1kaXNhYmxlZDogZGVmYXVsdCAhZGVmYXVsdDtcblxuLy8vIFByb3BlcnRpZXMgdG8gdHJhbnNpdGlvbiBvbiB0ZXh0IGlucHV0cy5cbi8vLyBAdHlwZSBUcmFuc2l0aW9uXG4kaW5wdXQtdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjVzLCBib3JkZXItY29sb3IgMC4yNXMgZWFzZS1pbi1vdXQgIWRlZmF1bHQ7XG5cbi8vLyBFbmFibGVzIHRoZSB1cC9kb3duIGJ1dHRvbnMgdGhhdCBDaHJvbWUgYW5kIEZpcmVmb3ggYWRkIHRvIGA8aW5wdXQgdHlwZT0nbnVtYmVyJz5gIGVsZW1lbnRzLlxuLy8vIEB0eXBlIEJvb2xlYW5cbiRpbnB1dC1udW1iZXItc3Bpbm5lcnM6IHRydWUgIWRlZmF1bHQ7XG5cbi8vLyBSYWRpdXMgZm9yIHRleHQgaW5wdXRzLlxuLy8vIEB0eXBlIEJvcmRlclxuJGlucHV0LXJhZGl1czogJGdsb2JhbC1yYWRpdXMgIWRlZmF1bHQ7XG5cbkBtaXhpbiBmb3JtLWVsZW1lbnQge1xuICAkaGVpZ2h0OiAoJGlucHV0LWZvbnQtc2l6ZSArICgkZm9ybS1zcGFjaW5nICogMS41KSAtIHJlbS1jYWxjKDEpKTtcblxuICBkaXNwbGF5OiBibG9jaztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogJGhlaWdodDtcbiAgcGFkZGluZzogJGZvcm0tc3BhY2luZyAvIDI7XG4gIGJvcmRlcjogJGlucHV0LWJvcmRlcjtcbiAgbWFyZ2luOiAwIDAgJGZvcm0tc3BhY2luZztcblxuICBmb250LWZhbWlseTogJGlucHV0LWZvbnQtZmFtaWx5O1xuICBmb250LXNpemU6ICRpbnB1dC1mb250LXNpemU7XG4gIGNvbG9yOiAkaW5wdXQtY29sb3I7XG4gIGJhY2tncm91bmQtY29sb3I6ICRpbnB1dC1iYWNrZ3JvdW5kO1xuICBib3gtc2hhZG93OiAkaW5wdXQtc2hhZG93O1xuICBib3JkZXItcmFkaXVzOiAkaW5wdXQtcmFkaXVzO1xuXG4gIEBpZiBoYXMtdmFsdWUoJGlucHV0LXRyYW5zaXRpb24pIHtcbiAgICB0cmFuc2l0aW9uOiAkaW5wdXQtdHJhbnNpdGlvbjtcbiAgfVxuXG4gIC8vIEZvY3VzIHN0YXRlXG4gICY6Zm9jdXMge1xuICAgIGJvcmRlcjogJGlucHV0LWJvcmRlci1mb2N1cztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaW5wdXQtYmFja2dyb3VuZC1mb2N1cztcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJveC1zaGFkb3c6ICRpbnB1dC1zaGFkb3ctZm9jdXM7XG5cbiAgICBAaWYgaGFzLXZhbHVlKCRpbnB1dC10cmFuc2l0aW9uKSB7XG4gICAgICB0cmFuc2l0aW9uOiAkaW5wdXQtdHJhbnNpdGlvbjtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tZm9ybS10ZXh0IHtcbiAgLy8gVGV4dCBpbnB1dHNcbiAgI3t0ZXh0LWlucHV0cygpfSxcbiAgdGV4dGFyZWEge1xuICAgIEBpbmNsdWRlIGZvcm0tZWxlbWVudDtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICB9XG5cbiAgLy8gVGV4dCBhcmVhc1xuICB0ZXh0YXJlYSB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuXG4gICAgJltyb3dzXSB7XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgfVxuICB9XG5cbiAgLy8gRGlzYWJsZWQvcmVhZG9ubHkgc3RhdGVcbiAgaW5wdXQsXG4gIHRleHRhcmVhIHtcbiAgICAmOmRpc2FibGVkLFxuICAgICZbcmVhZG9ubHldIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRpbnB1dC1iYWNrZ3JvdW5kLWRpc2FibGVkO1xuICAgICAgY3Vyc29yOiAkaW5wdXQtY3Vyc29yLWRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlc2V0IHN0eWxlcyBvbiBidXR0b24tbGlrZSBpbnB1dHNcbiAgW3R5cGU9J3N1Ym1pdCddLFxuICBbdHlwZT0nYnV0dG9uJ10ge1xuICAgIGJvcmRlci1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzO1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gIH1cblxuICAvLyBSZXNldCBOb3JtYWxpemUgc2V0dGluZyBjb250ZW50LWJveCB0byBzZWFyY2ggZWxlbWVudHNcbiAgLy8gc2Nzcy1saW50OmRpc2FibGUgUXVhbGlmeWluZ0VsZW1lbnRcbiAgaW5wdXRbdHlwZT0nc2VhcmNoJ10ge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICAvLyBOdW1iZXIgaW5wdXQgc3R5bGVzXG4gIFt0eXBlPSdudW1iZXInXSB7XG4gICAgQGlmIG5vdCAkaW5wdXQtbnVtYmVyLXNwaW5uZXJzIHtcbiAgICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuXG4gICAgICBbdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG4gICAgICBbdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGZvcm1zXG4vLy8vXG5cbkBtaXhpbiBmb3VuZGF0aW9uLWZvcm0tY2hlY2tib3gge1xuICBbdHlwZT0nZmlsZSddLFxuICBbdHlwZT0nY2hlY2tib3gnXSxcbiAgW3R5cGU9J3JhZGlvJ10ge1xuICAgIG1hcmdpbjogMCAwICRmb3JtLXNwYWNpbmc7XG4gIH1cblxuICAvLyBTdHlsZXMgZm9yIGlucHV0L2xhYmVsIHNpYmxpbmdzXG4gIFt0eXBlPSdjaGVja2JveCddICsgbGFiZWwsXG4gIFt0eXBlPSdyYWRpbyddICsgbGFiZWwge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiAkZm9ybS1zcGFjaW5nICogMC41O1xuICAgIG1hcmdpbi0jeyRnbG9iYWwtcmlnaHR9OiAkZm9ybS1zcGFjaW5nO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICB9XG5cbiAgLy8gU3R5bGVzIGZvciBpbnB1dHMgaW5zaWRlIGxhYmVsc1xuICBsYWJlbCA+IFt0eXBlPSdjaGVja2JveCddLFxuICBsYWJlbCA+IFt0eXBlPSdsYWJlbCddIHtcbiAgICBtYXJnaW4tI3skZ2xvYmFsLXJpZ2h0fTogJGZvcm0tc3BhY2luZyAqIDAuNTtcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBmaWxlIGlucHV0IHdpZHRoXG4gIFt0eXBlPSdmaWxlJ10ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmb3Jtc1xuLy8vL1xuXG4vLy8gQ29sb3IgZm9yIGZvcm0gbGFiZWxzLlxuLy8vIEB0eXBlIENvbG9yXG4kZm9ybS1sYWJlbC1jb2xvcjogJGJsYWNrICFkZWZhdWx0O1xuXG4vLy8gRm9udCBzaXplIGZvciBmb3JtIGxhYmVscy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRmb3JtLWxhYmVsLWZvbnQtc2l6ZTogcmVtLWNhbGMoMTQpICFkZWZhdWx0O1xuXG4vLy8gRm9udCB3ZWlnaHQgZm9yIGZvcm0gbGFiZWxzLlxuLy8vIEB0eXBlIEtleXdvcmRcbiRmb3JtLWxhYmVsLWZvbnQtd2VpZ2h0OiAkZ2xvYmFsLXdlaWdodC1ub3JtYWwgIWRlZmF1bHQ7XG5cbi8vLyBMaW5lIGhlaWdodCBmb3IgZm9ybSBsYWJlbHMuIFRoZSBoaWdoZXIgdGhlIG51bWJlciwgdGhlIG1vcmUgc3BhY2UgYmV0d2VlbiB0aGUgbGFiZWwgYW5kIGl0cyBpbnB1dCBmaWVsZC5cbi8vLyBAdHlwZSBOdW1iZXJcbiRmb3JtLWxhYmVsLWxpbmUtaGVpZ2h0OiAxLjggIWRlZmF1bHQ7XG5cbkBtaXhpbiBmb3JtLWxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAkZm9ybS1sYWJlbC1mb250LXNpemU7XG4gIGZvbnQtd2VpZ2h0OiAkZm9ybS1sYWJlbC1mb250LXdlaWdodDtcbiAgbGluZS1oZWlnaHQ6ICRmb3JtLWxhYmVsLWxpbmUtaGVpZ2h0O1xuICBjb2xvcjogJGZvcm0tbGFiZWwtY29sb3I7XG59XG5cbkBtaXhpbiBmb3JtLWxhYmVsLW1pZGRsZSB7XG4gICRpbnB1dC1ib3JkZXItd2lkdGg6IGdldC1ib3JkZXItdmFsdWUoJGlucHV0LWJvcmRlciwgd2lkdGgpO1xuICBtYXJnaW46IDAgMCAkZm9ybS1zcGFjaW5nO1xuICBwYWRkaW5nOiAoJGZvcm0tc3BhY2luZyAvIDIgKyByZW0tY2FsYygkaW5wdXQtYm9yZGVyLXdpZHRoKSkgMDtcbn1cblxuQG1peGluIGZvdW5kYXRpb24tZm9ybS1sYWJlbCB7XG4gIGxhYmVsIHtcbiAgICBAaW5jbHVkZSBmb3JtLWxhYmVsO1xuXG4gICAgJi5taWRkbGUge1xuICAgICAgQGluY2x1ZGUgZm9ybS1sYWJlbC1taWRkbGU7XG4gICAgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmb3Jtc1xuLy8vL1xuXG4vLy8gRGVmYXVsdCBjb2xvciBmb3IgaGVscCB0ZXh0LlxuLy8vIEB0eXBlIENvbG9yXG4kaGVscHRleHQtY29sb3I6ICMzMzMgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZvbnQgc2l6ZSBmb3IgaGVscCB0ZXh0LlxuLy8vIEB0eXBlIE51bWJlclxuJGhlbHB0ZXh0LWZvbnQtc2l6ZTogcmVtLWNhbGMoMTMpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBmb250IHN0eWxlIGZvciBoZWxwIHRleHQuXG4vLy8gQHR5cGUgS2V5d29yZFxuJGhlbHB0ZXh0LWZvbnQtc3R5bGU6IGl0YWxpYyAhZGVmYXVsdDtcblxuQG1peGluIGZvdW5kYXRpb24tZm9ybS1oZWxwdGV4dCB7XG4gIC5oZWxwLXRleHQge1xuICAgICRtYXJnaW4tdG9wOiAoJGZvcm0tc3BhY2luZyAqIDAuNSkgKiAtMTtcblxuICAgIG1hcmdpbi10b3A6ICRtYXJnaW4tdG9wO1xuICAgIGZvbnQtc2l6ZTogJGhlbHB0ZXh0LWZvbnQtc2l6ZTtcbiAgICBmb250LXN0eWxlOiAkaGVscHRleHQtZm9udC1zdHlsZTtcbiAgICBjb2xvcjogJGhlbHB0ZXh0LWNvbG9yO1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmb3Jtc1xuLy8vL1xuXG4vLy8gQ29sb3Igb2YgbGFiZWxzIHByZWZpeGVkIHRvIGFuIGlucHV0LlxuLy8vIEB0eXBlIENvbG9yXG4kaW5wdXQtcHJlZml4LWNvbG9yOiAkYmxhY2sgIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIGxhYmVscyBwcmVmaXhlZCB0byBhbiBpbnB1dC5cbi8vLyBAdHlwZSBDb2xvclxuJGlucHV0LXByZWZpeC1iYWNrZ3JvdW5kOiAkbGlnaHQtZ3JheSAhZGVmYXVsdDtcblxuLy8vIEJvcmRlciBhcm91bmQgbGFiZWxzIHByZWZpeGVkIHRvIGFuIGlucHV0LlxuLy8vIEB0eXBlIEJvcmRlclxuJGlucHV0LXByZWZpeC1ib3JkZXI6IDFweCBzb2xpZCAkbWVkaXVtLWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBMZWZ0L3JpZ2h0IHBhZGRpbmcgb2YgYW4gcHJlL3Bvc3RmaXhlZCBpbnB1dCBsYWJlbFxuJGlucHV0LXByZWZpeC1wYWRkaW5nOiAxcmVtICFkZWZhdWx0O1xuXG5AbWl4aW4gZm91bmRhdGlvbi1mb3JtLXByZXBvc3RmaXgge1xuICAkaGVpZ2h0OiAoJGlucHV0LWZvbnQtc2l6ZSArICRmb3JtLXNwYWNpbmcgKiAxLjUpO1xuXG5cbiAgLmlucHV0LWdyb3VwIHtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAkZm9ybS1zcGFjaW5nO1xuXG4gICAgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLXJhZGl1czogJGdsb2JhbC1yYWRpdXMgMCAwICRnbG9iYWwtcmFkaXVzO1xuICAgIH1cblxuICAgID4gOmxhc3QtY2hpbGQge1xuICAgICAgPiAqIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCAkZ2xvYmFsLXJhZGl1cyAkZ2xvYmFsLXJhZGl1cyAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICVpbnB1dC1ncm91cC1jaGlsZCB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICBtYXJnaW46IDA7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgfVxuXG4gIC5pbnB1dC1ncm91cC1sYWJlbCB7XG4gICAgQGV4dGVuZCAlaW5wdXQtZ3JvdXAtY2hpbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgcGFkZGluZzogMCAkaW5wdXQtcHJlZml4LXBhZGRpbmc7XG4gICAgYmFja2dyb3VuZDogJGlucHV0LXByZWZpeC1iYWNrZ3JvdW5kO1xuICAgIGNvbG9yOiAkaW5wdXQtcHJlZml4LWNvbG9yO1xuICAgIGJvcmRlcjogJGlucHV0LXByZWZpeC1ib3JkZXI7XG5cbiAgICBAaWYgaGFzLXZhbHVlKCRpbnB1dC1wcmVmaXgtYm9yZGVyKSB7XG4gICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgYm9yZGVyLSN7JGdsb2JhbC1yaWdodH06IDA7XG4gICAgICB9XG5cbiAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci0jeyRnbG9iYWwtbGVmdH06IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmlucHV0LWdyb3VwLWZpZWxkIHtcbiAgICBAZXh0ZW5kICVpbnB1dC1ncm91cC1jaGlsZDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGhlaWdodDogJGhlaWdodDtcbiAgfVxuXG4gIC5pbnB1dC1ncm91cC1idXR0b24ge1xuICAgIEBleHRlbmQgJWlucHV0LWdyb3VwLWNoaWxkO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgd2lkdGg6IDElO1xuXG4gICAgYSxcbiAgICBpbnB1dCxcbiAgICBidXR0b24ge1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZm9ybXNcbi8vLy9cblxuLy8vIERlZmF1bHQgYm9yZGVyIGFyb3VuZCBjdXN0b20gZmllbGRzZXRzLlxuLy8vIEB0eXBlIEJvcmRlclxuJGZpZWxkc2V0LWJvcmRlcjogMXB4IHNvbGlkICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcGFkZGluZyBpbnNpZGUgY3VzdG9tIGZpZWxkc2V0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRmaWVsZHNldC1wYWRkaW5nOiByZW0tY2FsYygyMCkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IG1hcmdpbiBhcm91bmQgY3VzdG9tIGZpZWxkc2V0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRmaWVsZHNldC1tYXJnaW46IHJlbS1jYWxjKDE4IDApICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBwYWRkaW5nIGJldHdlZW4gdGhlIGxlZ2VuZCB0ZXh0IGFuZCBmaWVsZHNldCBib3JkZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbGVnZW5kLXBhZGRpbmc6IHJlbS1jYWxjKDAgMykgIWRlZmF1bHQ7XG5cbkBtaXhpbiBmaWVsZHNldCB7XG4gIGJvcmRlcjogJGZpZWxkc2V0LWJvcmRlcjtcbiAgcGFkZGluZzogJGZpZWxkc2V0LXBhZGRpbmc7XG4gIG1hcmdpbjogJGZpZWxkc2V0LW1hcmdpbjtcblxuICBsZWdlbmQge1xuICAgIC8vIENvdmVycyB1cCB0aGUgZmllbGRzZXQncyBib3JkZXIgdG8gY3JlYXRlIGFydGlmaWNpYWwgcGFkZGluZ1xuICAgIGJhY2tncm91bmQ6ICRib2R5LWJhY2tncm91bmQ7XG4gICAgcGFkZGluZzogJGxlZ2VuZC1wYWRkaW5nO1xuICAgIG1hcmdpbjogMDtcbiAgICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiByZW0tY2FsYygtMyk7XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tZm9ybS1maWVsZHNldCB7XG4gIGZpZWxkc2V0IHtcbiAgICBib3JkZXI6IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICBsZWdlbmQge1xuICAgIG1hcmdpbi1ib3R0b206ICRmb3JtLXNwYWNpbmcgKiAwLjU7XG4gIH1cblxuICAuZmllbGRzZXQge1xuICAgIEBpbmNsdWRlIGZpZWxkc2V0O1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBmb3Jtc1xuLy8vL1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBmb3Igc2VsZWN0IG1lbnVzLlxuLy8vIEB0eXBlIENvbG9yXG4kc2VsZWN0LWJhY2tncm91bmQ6ICR3aGl0ZSAhZGVmYXVsdDtcblxuLy8vIENvbG9yIG9mIHRoZSBkcm9wZG93biB0cmlhbmdsZSBpbnNpZGUgc2VsZWN0IG1lbnVzLiBTZXQgdG8gYHRyYW5zcGFyZW50YCB0byByZW1vdmUgaXQgZW50aXJlbHkuXG4vLy8gQHR5cGUgQ29sb3JcbiRzZWxlY3QtdHJpYW5nbGUtY29sb3I6ICMzMzMgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHJhZGl1cyBmb3Igc2VsZWN0IG1lbnVzLlxuLy8vIEB0eXBlIENvbG9yXG4kc2VsZWN0LXJhZGl1czogJGdsb2JhbC1yYWRpdXMgIWRlZmF1bHQ7XG5cbkBtaXhpbiBmb3JtLXNlbGVjdCB7XG4gICRoZWlnaHQ6ICgkaW5wdXQtZm9udC1zaXplICsgKCRmb3JtLXNwYWNpbmcgKiAxLjUpIC0gcmVtLWNhbGMoMSkpO1xuXG4gIGhlaWdodDogJGhlaWdodDtcbiAgcGFkZGluZzogKCRmb3JtLXNwYWNpbmcgLyAyKTtcbiAgYm9yZGVyOiAkaW5wdXQtYm9yZGVyO1xuICBtYXJnaW46IDAgMCAkZm9ybS1zcGFjaW5nO1xuICBmb250LXNpemU6ICRpbnB1dC1mb250LXNpemU7XG4gIGZvbnQtZmFtaWx5OiAkaW5wdXQtZm9udC1mYW1pbHk7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIGNvbG9yOiAkaW5wdXQtY29sb3I7XG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWxlY3QtYmFja2dyb3VuZDtcbiAgYm9yZGVyLXJhZGl1czogJHNlbGVjdC1yYWRpdXM7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuXG4gIEBpZiAkc2VsZWN0LXRyaWFuZ2xlLWNvbG9yICE9IHRyYW5zcGFyZW50IHtcbiAgICBAaW5jbHVkZSBiYWNrZ3JvdW5kLXRyaWFuZ2xlKCRzZWxlY3QtdHJpYW5nbGUtY29sb3IpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogOXB4IDZweDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAkZ2xvYmFsLXJpZ2h0ICgkZm9ybS1zcGFjaW5nIC8gMikgY2VudGVyO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIH1cbiAgLy8gRGlzYWJsZWQgc3RhdGVcbiAgJjpkaXNhYmxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGlucHV0LWJhY2tncm91bmQtZGlzYWJsZWQ7XG4gICAgY3Vyc29yOiAkaW5wdXQtY3Vyc29yLWRpc2FibGVkO1xuICB9XG5cbiAgLy8gSGlkZSB0aGUgZHJvcGRvd24gYXJyb3cgc2hvd24gaW4gbmV3ZXIgSUUgdmVyc2lvbnNcbiAgJjo6LW1zLWV4cGFuZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICZbbXVsdGlwbGVdIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tZm9ybS1zZWxlY3Qge1xuICBzZWxlY3Qge1xuICAgIEBpbmNsdWRlIGZvcm0tc2VsZWN0O1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBhYmlkZVxuLy8vL1xuXG4vLy8gU2V0cyBpZiBlcnJvciBzdHlsZXMgc2hvdWxkIGJlIGFkZGVkIHRvIGlucHV0cy5cbi8vLyBAdHlwZSBCb29sZWFuXG4kYWJpZGUtaW5wdXRzOiB0cnVlICFkZWZhdWx0O1xuXG4vLy8gU2V0cyBpZiBlcnJvciBzdHlsZXMgc2hvdWxkIGJlIGFkZGVkIHRvIGxhYmVscy5cbi8vLyBAdHlwZSBCb29sZWFuXG4kYWJpZGUtbGFiZWxzOiB0cnVlICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciB0byB1c2UgZm9yIGludmFsaWQgdGV4dCBpbnB1dHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRpbnB1dC1iYWNrZ3JvdW5kLWludmFsaWQ6ICRhbGVydC1jb2xvciAhZGVmYXVsdDtcblxuLy8vIENvbG9yIHRvIHVzZSBmb3IgbGFiZWxzIG9mIGludmFsaWQgaW5wdXRzLlxuLy8vIEB0eXBlIENvbG9yXG4kZm9ybS1sYWJlbC1jb2xvci1pbnZhbGlkOiAkYWxlcnQtY29sb3IgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZvbnQgY29sb3IgZm9yIGZvcm0gZXJyb3IgdGV4dC5cbi8vLyBAdHlwZSBDb2xvclxuJGlucHV0LWVycm9yLWNvbG9yOiAkYWxlcnQtY29sb3IgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZvbnQgc2l6ZSBmb3IgZm9ybSBlcnJvciB0ZXh0LlxuLy8vIEB0eXBlIE51bWJlclxuJGlucHV0LWVycm9yLWZvbnQtc2l6ZTogcmVtLWNhbGMoMTIpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBmb250IHdlaWdodCBmb3IgZm9ybSBlcnJvciB0ZXh0LlxuLy8vIEB0eXBlIEtleXdvcmRcbiRpbnB1dC1lcnJvci1mb250LXdlaWdodDogJGdsb2JhbC13ZWlnaHQtYm9sZCAhZGVmYXVsdDtcblxuLy8vIFN0eWxlcyB0aGUgYmFja2dyb3VuZCBhbmQgYm9yZGVyIG9mIGFuIGlucHV0IGZpZWxkIHRvIGhhdmUgYW4gZXJyb3Igc3RhdGUuXG4vLy9cbi8vLyBAcGFyYW0ge0NvbG9yfSAkYmFja2dyb3VuZCBbJGFsZXJ0LWNvbG9yXSAtIENvbG9yIHRvIHVzZSBmb3IgdGhlIGJhY2tncm91bmQgYW5kIGJvcmRlci5cbkBtaXhpbiBmb3JtLWlucHV0LWVycm9yKFxuICAkYmFja2dyb3VuZDogJGFsZXJ0LWNvbG9yXG4pIHtcbiAgJjpub3QoOmZvY3VzKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkYmFja2dyb3VuZCwgMC4xKTtcbiAgICBib3JkZXItY29sb3I6ICRiYWNrZ3JvdW5kO1xuICB9XG59XG5cbi8vLyBBZGRzIGVycm9yIHN0eWxlcyB0byBhIGZvcm0gZWxlbWVudCwgdXNpbmcgdGhlIHZhbHVlcyBpbiB0aGUgc2V0dGluZ3MgZmlsZS5cbkBtaXhpbiBmb3JtLWVycm9yIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgbWFyZ2luLXRvcDogJGZvcm0tc3BhY2luZyAqIC0wLjU7XG4gIG1hcmdpbi1ib3R0b206ICRmb3JtLXNwYWNpbmc7XG4gIGZvbnQtc2l6ZTogJGlucHV0LWVycm9yLWZvbnQtc2l6ZTtcbiAgZm9udC13ZWlnaHQ6ICRpbnB1dC1lcnJvci1mb250LXdlaWdodDtcbiAgY29sb3I6ICRpbnB1dC1lcnJvci1jb2xvcjtcbn1cblxuQG1peGluIGZvdW5kYXRpb24tZm9ybS1lcnJvciB7XG4gIEBpZiAkYWJpZGUtaW5wdXRzIHtcbiAgICAvLyBFcnJvciBjbGFzcyBmb3IgaW52YWxpZCBpbnB1dHNcbiAgICAuaXMtaW52YWxpZC1pbnB1dCB7XG4gICAgICBAaW5jbHVkZSBmb3JtLWlucHV0LWVycm9yO1xuICAgIH1cbiAgfVxuXG4gIEBpZiAkYWJpZGUtbGFiZWxzIHtcbiAgICAvLyBFcnJvciBjbGFzcyBmb3IgbGFiZWxzIG9mIGludmFsaWQgb3V0cHV0c1xuICAgIC5pcy1pbnZhbGlkLWxhYmVsIHtcbiAgICAgIGNvbG9yOiAkZm9ybS1sYWJlbC1jb2xvci1pbnZhbGlkO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvcm0gZXJyb3IgZWxlbWVudFxuICAuZm9ybS1lcnJvciB7XG4gICAgQGluY2x1ZGUgZm9ybS1lcnJvcjtcblxuICAgICYuaXMtdmlzaWJsZSB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8gSGlkZSBhbiBlbGVtZW50IGJ5IGRlZmF1bHQsIG9ubHkgZGlzcGxheWluZyBpdCBhYm92ZSBhIGNlcnRhaW4gc2NyZWVuIHNpemUuXG4vLy8gQHBhcmFtIHtLZXl3b3JkfSAkc2l6ZSAtIEJyZWFrcG9pbnQgdG8gdXNlLiAqKk11c3QgYmUgYSBicmVha3BvaW50IGRlZmluZWQgaW4gYCRicmVha3BvaW50c2AuKipcbkBtaXhpbiBzaG93LWZvcigkc2l6ZSkge1xuICAkc2l6ZTogbWFwLWdldCgkYnJlYWtwb2ludHMsICRzaXplKTtcbiAgJHNpemU6IC16Zi1icC10by1lbSgkc2l6ZSkgLSAoMS8xNik7XG5cbiAgQGluY2x1ZGUgYnJlYWtwb2ludCgkc2l6ZSBkb3duKSB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICB9XG59XG5cbi8vLyBIaWRlIGFuIGVsZW1lbnQgYnkgZGVmYXVsdCwgb25seSBkaXNwbGF5aW5nIGl0IHdpdGhpbiBhIGNlcnRhaW4gYnJlYWtwb2ludC5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICRzaXplIC0gQnJlYWtwb2ludCB0byB1c2UuICoqTXVzdCBiZSBhIGJyZWFrcG9pbnQgZGVmaW5lZCBpbiBgJGJyZWFrcG9pbnRzYC4qKlxuQG1peGluIHNob3ctZm9yLW9ubHkoJHNpemUpIHtcbiAgJGxvd2VyLWJvdW5kLXNpemU6IG1hcC1nZXQoJGJyZWFrcG9pbnRzLCAkc2l6ZSk7XG4gICR1cHBlci1ib3VuZC1zaXplOiAtemYtbWFwLW5leHQoJGJyZWFrcG9pbnRzLCAkc2l6ZSk7XG5cbiAgLy8gbW9yZSBvZnRlbiB0aGFuIG5vdCB0aGlzIHdpbGwgYmUgY29ycmVjdCwganVzdCBvbmUgdGltZSByb3VuZCB0aGUgbG9vcCBpdCB3b24ndCBzbyBzZXQgaW4gc2NvcGUgaGVyZVxuICAkbG93ZXItYm91bmQ6IC16Zi1icC10by1lbSgkbG93ZXItYm91bmQtc2l6ZSkgLSAoMS8xNik7XG4gIC8vIHRlc3QgYWN0dWFsIGxvd2VyLWJvdW5kLXNpemUsIGlmIDAgc2V0IGl0IHRvIDBlbVxuICBAaWYgJGxvd2VyLWJvdW5kLXNpemUgPT0gMCB7XG4gICAgJGxvd2VyLWJvdW5kOiAtemYtYnAtdG8tZW0oJGxvd2VyLWJvdW5kLXNpemUpO1xuICB9XG5cbiAgQGlmICR1cHBlci1ib3VuZC1zaXplID09IG51bGwge1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRsb3dlci1ib3VuZCkge1xuICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuICBAZWxzZSB7XG4gICAgJHVwcGVyLWJvdW5kOiAtemYtYnAtdG8tZW0oJHVwcGVyLWJvdW5kLXNpemUpO1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRsb3dlci1ib3VuZCksIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJHVwcGVyLWJvdW5kKSB7XG4gICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG59XG5cblxuLy8vIFNob3cgYW4gZWxlbWVudCBieSBkZWZhdWx0LCBhbmQgaGlkZSBpdCBhYm92ZSBhIGNlcnRhaW4gc2NyZWVuIHNpemUuXG4vLy8gQHBhcmFtIHtLZXl3b3JkfSAkc2l6ZSAtIEJyZWFrcG9pbnQgdG8gdXNlLiAqKk11c3QgYmUgYSBicmVha3BvaW50IGRlZmluZWQgaW4gYCRicmVha3BvaW50c2AuKipcbkBtaXhpbiBoaWRlLWZvcigkc2l6ZSkge1xuICBAaW5jbHVkZSBicmVha3BvaW50KCRzaXplKSB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICB9XG59XG5cbi8vLyBTaG93IGFuIGVsZW1lbnQgYnkgZGVmYXVsdCwgYW5kIGhpZGUgaXQgYWJvdmUgYSBjZXJ0YWluIHNjcmVlbiBzaXplLlxuLy8vIEBwYXJhbSB7S2V5d29yZH0gJHNpemUgLSBCcmVha3BvaW50IHRvIHVzZS4gKipNdXN0IGJlIGEgYnJlYWtwb2ludCBkZWZpbmVkIGluIGAkYnJlYWtwb2ludHNgLioqXG5AbWl4aW4gaGlkZS1mb3Itb25seSgkc2l6ZSkge1xuICBAaW5jbHVkZSBicmVha3BvaW50KCRzaXplIG9ubHkpIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tdmlzaWJpbGl0eS1jbGFzc2VzIHtcbiAgLy8gQmFzaWMgaGlkaW5nIGNsYXNzZXNcbiAgLmhpZGUge1xuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5pbnZpc2libGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuXG4gIC8vIFJlc3BvbnNpdmUgdmlzaWJpbGl0eSBjbGFzc2VzXG4gIEBlYWNoICRzaXplIGluICRicmVha3BvaW50LWNsYXNzZXMge1xuICAgIEBpZiAkc2l6ZSAhPSBzbWFsbCB7XG4gICAgICAuaGlkZS1mb3ItI3skc2l6ZX0ge1xuICAgICAgICBAaW5jbHVkZSBoaWRlLWZvcigkc2l6ZSk7XG4gICAgICB9XG5cbiAgICAgIC5zaG93LWZvci0jeyRzaXplfSB7XG4gICAgICAgIEBpbmNsdWRlIHNob3ctZm9yKCRzaXplKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuaGlkZS1mb3ItI3skc2l6ZX0tb25seSB7XG4gICAgICBAaW5jbHVkZSBoaWRlLWZvci1vbmx5KCRzaXplKTtcbiAgICB9XG5cbiAgICAuc2hvdy1mb3ItI3skc2l6ZX0tb25seSB7XG4gICAgICBAaW5jbHVkZSBzaG93LWZvci1vbmx5KCRzaXplKTtcbiAgICB9XG4gIH1cblxuICAvLyBTY3JlZW4gcmVhZGVyIHZpc2liaWxpdHkgY2xhc3Nlc1xuICAvLyBOZWVkIGEgXCJoaWRlLWZvci1zclwiIGNsYXNzPyBBZGQgYXJpYS1oaWRkZW49J3RydWUnIHRvIHRoZSBlbGVtZW50XG4gIC5zaG93LWZvci1zcixcbiAgLnNob3ctb24tZm9jdXMge1xuICAgIEBpbmNsdWRlIGVsZW1lbnQtaW52aXNpYmxlO1xuICB9XG5cbiAgLy8gT25seSBkaXNwbGF5IHRoZSBlbGVtZW50IHdoZW4gaXQncyBmb2N1c2VkXG4gIC5zaG93LW9uLWZvY3VzIHtcbiAgICAmOmFjdGl2ZSxcbiAgICAmOmZvY3VzIHtcbiAgICAgIEBpbmNsdWRlIGVsZW1lbnQtaW52aXNpYmxlLW9mZjtcbiAgICB9XG4gIH1cblxuICAvLyBMYW5kc2NhcGUgYW5kIHBvcnRyYWl0IHZpc2liaWxpdHlcbiAgLnNob3ctZm9yLWxhbmRzY2FwZSxcbiAgLmhpZGUtZm9yLXBvcnRyYWl0IHtcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuXG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludChsYW5kc2NhcGUpIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludChwb3J0cmFpdCkge1xuICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gIC5oaWRlLWZvci1sYW5kc2NhcGUsXG4gIC5zaG93LWZvci1wb3J0cmFpdCB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludChsYW5kc2NhcGUpIHtcbiAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBicmVha3BvaW50KHBvcnRyYWl0KSB7XG4gICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZmxvYXRcbi8vLy9cblxuQG1peGluIGZvdW5kYXRpb24tZmxvYXQtY2xhc3NlcyB7XG4gIC5mbG9hdC1sZWZ0IHtcbiAgICBmbG9hdDogbGVmdCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmZsb2F0LXJpZ2h0IHtcbiAgICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5mbG9hdC1jZW50ZXIge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxuXG4gIC5jbGVhcmZpeCB7XG4gICAgQGluY2x1ZGUgY2xlYXJmaXg7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGJ1dHRvblxuLy8vL1xuXG4vLy8gUGFkZGluZyBpbnNpZGUgYnV0dG9ucy5cbi8vLyBAdHlwZSBMaXN0XG4kYnV0dG9uLXBhZGRpbmc6IDAuODVlbSAxZW0gIWRlZmF1bHQ7XG5cbi8vLyBNYXJnaW4gYXJvdW5kIGJ1dHRvbnMuXG4vLy8gQHR5cGUgTGlzdFxuJGJ1dHRvbi1tYXJnaW46IDAgMCAkZ2xvYmFsLW1hcmdpbiAwICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBmaWxsIGZvciBidXR0b25zLiBDYW4gZWl0aGVyIGJlIGBzb2xpZGAgb3IgYGhvbGxvd2AuXG4vLy8gQHR5cGUgS2V5d29yZFxuJGJ1dHRvbi1maWxsOiBzb2xpZCAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBmb3IgYnV0dG9ucy5cbi8vLyBAdHlwZSBDb2xvclxuJGJ1dHRvbi1iYWNrZ3JvdW5kOiAkcHJpbWFyeS1jb2xvciAhZGVmYXVsdDtcblxuLy8vIEJhY2tncm91bmQgY29sb3Igb24gaG92ZXIgZm9yIGJ1dHRvbnMuXG4vLy8gQHR5cGUgQ29sb3JcbiRidXR0b24tYmFja2dyb3VuZC1ob3Zlcjogc2NhbGUtY29sb3IoJGJ1dHRvbi1iYWNrZ3JvdW5kLCAkbGlnaHRuZXNzOiAtMTUlKSAhZGVmYXVsdDtcblxuLy8vIEZvbnQgY29sb3IgZm9yIGJ1dHRvbnMuXG4vLy8gQHR5cGUgTGlzdFxuJGJ1dHRvbi1jb2xvcjogI2ZmZiAhZGVmYXVsdDtcblxuLy8vIEZvbnQgY29sb3IgZm9yIGJ1dHRvbnMsIGlmIHRoZSBiYWNrZ3JvdW5kIGlzIGxpZ2h0LlxuLy8vIEB0eXBlIExpc3RcbiRidXR0b24tY29sb3ItYWx0OiAjMDAwICFkZWZhdWx0O1xuXG4vLy8gQm9yZGVyIHJhZGl1cyBmb3IgYnV0dG9ucywgZGVmYXVsdGVkIHRvIGdsb2JhbC1yYWRpdXMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kYnV0dG9uLXJhZGl1czogJGdsb2JhbC1yYWRpdXMgIWRlZmF1bHQ7XG5cbi8vLyBTaXplcyBmb3IgYnV0dG9ucy5cbi8vLyBAdHlwZSBNYXBcbiRidXR0b24tc2l6ZXM6IChcbiAgdGlueTogMC42cmVtLFxuICBzbWFsbDogMC43NXJlbSxcbiAgZGVmYXVsdDogMC45cmVtLFxuICBsYXJnZTogMS4yNXJlbSxcbikgIWRlZmF1bHQ7XG5cbi8vLyBvcGFjaXR5IGZvciBhIGRpc2FibGVkIGJ1dHRvbi5cbi8vLyBAdHlwZSBMaXN0XG4kYnV0dG9uLW9wYWNpdHktZGlzYWJsZWQ6IDAuMjUgIWRlZmF1bHQ7XG5cbi8vIEludGVybmFsOiBmbGlwIGZyb20gbWFyZ2luLXJpZ2h0IHRvIG1hcmdpbi1sZWZ0IGZvciBkZWZhdWx0c1xuQGlmICRnbG9iYWwtdGV4dC1kaXJlY3Rpb24gPT0gJ3J0bCcge1xuICAkYnV0dG9uLW1hcmdpbjogMCAwICRnbG9iYWwtbWFyZ2luICRnbG9iYWwtbWFyZ2luICFkZWZhdWx0O1xufVxuXG4vLyBUT0RPOiBEb2N1bWVudCBidXR0b24tYmFzZSgpIG1peGluXG5AbWl4aW4gYnV0dG9uLWJhc2Uge1xuICBAaW5jbHVkZSBkaXNhYmxlLW1vdXNlLW91dGxpbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4yNXMgZWFzZS1vdXQsIGNvbG9yIDAuMjVzIGVhc2Utb3V0O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogJGJ1dHRvbi1yYWRpdXM7XG4gIHBhZGRpbmc6ICRidXR0b24tcGFkZGluZztcbiAgbWFyZ2luOiAkYnV0dG9uLW1hcmdpbjtcbiAgZm9udC1zaXplOiBtYXAtZ2V0KCRidXR0b24tc2l6ZXMsIGRlZmF1bHQpO1xufVxuXG4vLy8gRXhwYW5kcyBhIGJ1dHRvbiB0byBtYWtlIGl0IGZ1bGwtd2lkdGguXG4vLy8gQHBhcmFtIHtCb29sZWFufSAkZXhwYW5kIFt0cnVlXSAtIFNldCB0byBgdHJ1ZWAgdG8gZW5hYmxlIHRoZSBleHBhbmQgYmVoYXZpb3IuIFNldCB0byBgZmFsc2VgIHRvIHJldmVyc2UgdGhpcyBiZWhhdmlvci5cbkBtaXhpbiBidXR0b24tZXhwYW5kKCRleHBhbmQ6IHRydWUpIHtcbiAgQGlmICRleHBhbmQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgfVxuICBAZWxzZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIG1hcmdpbjogJGJ1dHRvbi1tYXJnaW47XG4gIH1cbn1cblxuLy8vIFNldHMgdGhlIHZpc3VhbCBzdHlsZSBvZiBhIGJ1dHRvbi5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkYmFja2dyb3VuZCBbJGJ1dHRvbi1iYWNrZ3JvdW5kXSAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIGJ1dHRvbi5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkYmFja2dyb3VuZC1ob3ZlciBbJGJ1dHRvbi1iYWNrZ3JvdW5kLWhvdmVyXSAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIGJ1dHRvbiBvbiBob3Zlci4gU2V0IHRvIGBhdXRvYCB0byBoYXZlIHRoZSBtaXhpbiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlIGEgaG92ZXIgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yIFskYnV0dG9uLWNvbG9yXSAtIFRleHQgY29sb3Igb2YgdGhlIGJ1dHRvbi4gU2V0IHRvIGBhdXRvYCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlIGEgY29sb3IgYmFzZWQgb24gdGhlIGJhY2tncm91bmQgY29sb3IuXG5AbWl4aW4gYnV0dG9uLXN0eWxlKFxuICAkYmFja2dyb3VuZDogJGJ1dHRvbi1iYWNrZ3JvdW5kLFxuICAkYmFja2dyb3VuZC1ob3ZlcjogJGJ1dHRvbi1iYWNrZ3JvdW5kLWhvdmVyLFxuICAkY29sb3I6ICRidXR0b24tY29sb3Jcbikge1xuICBAaWYgJGNvbG9yID09IGF1dG8ge1xuICAgICRjb2xvcjogaXNpdGxpZ2h0KCRiYWNrZ3JvdW5kKTtcbiAgfVxuXG4gIEBpZiAkYmFja2dyb3VuZC1ob3ZlciA9PSBhdXRvIHtcbiAgICAkYmFja2dyb3VuZC1ob3Zlcjogc2NhbGUtY29sb3IoJGJhY2tncm91bmQsICRsaWdodG5lc3M6IC0yMCUpO1xuICB9XG5cbiAgQGlmIGxpZ2h0bmVzcygkYmFja2dyb3VuZCkgPj0gNzAlIHtcbiAgICAkY29sb3I6ICRidXR0b24tY29sb3ItYWx0O1xuICB9XG4gIEBlbHNlIHtcbiAgICAkY29sb3I6ICRidXR0b24tY29sb3I7XG4gIH1cblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZDtcbiAgY29sb3I6ICRjb2xvcjtcblxuICAmOmhvdmVyLCAmOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1ob3ZlcjtcbiAgICBjb2xvcjogJGNvbG9yO1xuICB9XG59XG5cbi8vLyBSZW1vdmVzIGJhY2tncm91bmQgZmlsbCBvbiBob3ZlciBhbmQgZm9jdXMgZm9yIGhvbGxvdyBidXR0b25zLlxuQG1peGluIGJ1dHRvbi1ob2xsb3cge1xuICAmLFxuICAmOmhvdmVyLCAmOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxufVxuXG5AbWl4aW4gYnV0dG9uLWhvbGxvdy1zdHlsZSgkY29sb3I6ICRwcmltYXJ5LWNvbG9yKSB7XG4gICRjb2xvci1ob3Zlcjogc2NhbGUtY29sb3IoJGNvbG9yLCAkbGlnaHRuZXNzOiAtNTAlKTtcblxuICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3I7XG4gIGNvbG9yOiAkY29sb3I7XG5cbiAgJjpob3ZlciwgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItaG92ZXI7XG4gICAgY29sb3I6ICRjb2xvci1ob3ZlcjtcbiAgfVxufVxuXG4vLy8gQWRkcyBkaXNhYmxlZCBzdHlsZXMgdG8gYSBidXR0b24gYnkgZmFkaW5nIHRoZSBlbGVtZW50LCByZXNldGluZyB0aGUgY3Vyc29yLCBhbmQgZGlzYWJsaW5nIHBvaW50ZXIgZXZlbnRzLlxuQG1peGluIGJ1dHRvbi1kaXNhYmxlZCB7XG4gIG9wYWNpdHk6ICRidXR0b24tb3BhY2l0eS1kaXNhYmxlZDtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi8vLyBBZGRzIGEgZHJvcGRvd24gYXJyb3cgdG8gYSBidXR0b24uXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRzaXplIFswLjRlbV0gLSBTaXplIG9mIHRoZSBhcnJvdy4gV2UgcmVjb21tZW5kIHVzaW5nIGFuIGBlbWAgdmFsdWUgc28gdGhlIHRyaWFuZ2xlIHNjYWxlcyB3aGVuIHVzZWQgaW5zaWRlIGRpZmZlcmVudCBzaXplcyBvZiBidXR0b25zLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciBbd2hpdGVdIC0gQ29sb3Igb2YgdGhlIGFycm93LlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkb2Zmc2V0IFskYnV0dG9uLXBhZGRpbmddIC0gRGlzdGFuY2UgYmV0d2VlbiB0aGUgYXJyb3cgYW5kIHRoZSB0ZXh0IG9mIHRoZSBidXR0b24uIERlZmF1bHRzIHRvIHdoYXRldmVyIHRoZSByaWdodCBwYWRkaW5nIG9mIGEgYnV0dG9uIGlzLlxuQG1peGluIGJ1dHRvbi1kcm9wZG93bihcbiAgJHNpemU6IDAuNGVtLFxuICAkY29sb3I6ICR3aGl0ZSxcbiAgJG9mZnNldDogZ2V0LXNpZGUoJGJ1dHRvbi1wYWRkaW5nLCByaWdodClcbikge1xuICAmOjphZnRlciB7XG4gICAgQGluY2x1ZGUgY3NzLXRyaWFuZ2xlKCRzaXplLCAkY29sb3IsIGRvd24pO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDAuNGVtOyAvLyBBbGlnbnMgdGhlIGFycm93IHdpdGggdGhlIHRleHQgb2YgdGhlIGJ1dHRvblxuICAgIGZsb2F0OiAjeyRnbG9iYWwtcmlnaHR9O1xuICAgIG1hcmdpbi0jeyRnbG9iYWwtbGVmdH06IGdldC1zaWRlKCRidXR0b24tcGFkZGluZywgcmlnaHQpO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxufVxuXG4vLy8gQWRkcyBhbGwgc3R5bGVzIGZvciBhIGJ1dHRvbi4gRm9yIG1vcmUgZ3JhbnVsYXIgY29udHJvbCBvdmVyIHN0eWxlcywgdXNlIHRoZSBpbmRpdmlkdWFsIGJ1dHRvbiBtaXhpbnMuXG4vLy8gQHBhcmFtIHtCb29sZWFufSAkZXhwYW5kIFtmYWxzZV0gLSBTZXQgdG8gYHRydWVgIHRvIG1ha2UgdGhlIGJ1dHRvbiBmdWxsLXdpZHRoLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRiYWNrZ3JvdW5kIFskYnV0dG9uLWJhY2tncm91bmRdIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYnV0dG9uLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRiYWNrZ3JvdW5kLWhvdmVyIFskYnV0dG9uLWJhY2tncm91bmQtaG92ZXJdIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYnV0dG9uIG9uIGhvdmVyLiBTZXQgdG8gYGF1dG9gIHRvIGhhdmUgdGhlIG1peGluIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGUgYSBob3ZlciBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkY29sb3IgWyRidXR0b24tY29sb3JdIC0gVGV4dCBjb2xvciBvZiB0aGUgYnV0dG9uLiBTZXQgdG8gYGF1dG9gIHRvIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGUgYSBjb2xvciBiYXNlZCBvbiB0aGUgYmFja2dyb3VuZCBjb2xvci5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICRzdHlsZSBbc29saWRdIC0gU2V0IHRvIGBob2xsb3dgIHRvIGNyZWF0ZSBhIGhvbGxvdyBidXR0b24uIFRoZSBjb2xvciBkZWZpbmVkIGluIGAkYmFja2dyb3VuZGAgd2lsbCBiZSB1c2VkIGFzIHRoZSBwcmltYXJ5IGNvbG9yIG9mIHRoZSBidXR0b24uXG5AbWl4aW4gYnV0dG9uKFxuICAkZXhwYW5kOiBmYWxzZSxcbiAgJGJhY2tncm91bmQ6ICRidXR0b24tYmFja2dyb3VuZCxcbiAgJGJhY2tncm91bmQtaG92ZXI6ICRidXR0b24tYmFja2dyb3VuZC1ob3ZlcixcbiAgJGNvbG9yOiAkYnV0dG9uLWNvbG9yLFxuICAkc3R5bGU6ICRidXR0b24tZmlsbFxuKSB7XG4gIEBpbmNsdWRlIGJ1dHRvbi1iYXNlO1xuXG4gIEBpZiAkc3R5bGUgPT0gc29saWQge1xuICAgIEBpbmNsdWRlIGJ1dHRvbi1zdHlsZSgkYmFja2dyb3VuZCwgJGJhY2tncm91bmQtaG92ZXIsICRjb2xvcik7XG4gIH1cbiAgQGVsc2UgaWYgJHN0eWxlID09IGhvbGxvdyB7XG4gICAgQGluY2x1ZGUgYnV0dG9uLWhvbGxvdztcbiAgICBAaW5jbHVkZSBidXR0b24taG9sbG93LXN0eWxlKCRiYWNrZ3JvdW5kKTtcbiAgfVxuXG4gIEBpZiAkZXhwYW5kIHtcbiAgICBAaW5jbHVkZSBidXR0b24tZXhwYW5kO1xuICB9XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWJ1dHRvbiB7XG4gIC5idXR0b24ge1xuICAgIEBpbmNsdWRlIGJ1dHRvbjtcblxuICAgIC8vIFNpemVzXG4gICAgJi50aW55ICAgICB7IGZvbnQtc2l6ZTogbWFwLWdldCgkYnV0dG9uLXNpemVzLCB0aW55KTsgfVxuICAgICYuc21hbGwgICAgeyBmb250LXNpemU6IG1hcC1nZXQoJGJ1dHRvbi1zaXplcywgc21hbGwpOyB9XG4gICAgJi5sYXJnZSAgICB7IGZvbnQtc2l6ZTogbWFwLWdldCgkYnV0dG9uLXNpemVzLCBsYXJnZSk7IH1cbiAgICAmLmV4cGFuZGVkIHsgQGluY2x1ZGUgYnV0dG9uLWV4cGFuZDsgfVxuXG4gICAgLy8gQ29sb3JzXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkZm91bmRhdGlvbi1jb2xvcnMge1xuICAgICAgQGlmICRidXR0b24tZmlsbCAhPSBob2xsb3cge1xuICAgICAgICAmLiN7JG5hbWV9IHtcbiAgICAgICAgICBAaW5jbHVkZSBidXR0b24tc3R5bGUoJGNvbG9yLCBhdXRvKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICAmLiN7JG5hbWV9IHtcbiAgICAgICAgICBAaW5jbHVkZSBidXR0b24taG9sbG93LXN0eWxlKCRjb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICAmLiN7JG5hbWV9LmRyb3Bkb3duOjphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJGNvbG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSG9sbG93IHN0eWxlXG4gICAgQGlmICRidXR0b24tZmlsbCAhPSBob2xsb3cge1xuICAgICAgJi5ob2xsb3cge1xuICAgICAgICBAaW5jbHVkZSBidXR0b24taG9sbG93O1xuICAgICAgICBAaW5jbHVkZSBidXR0b24taG9sbG93LXN0eWxlO1xuXG4gICAgICAgIEBlYWNoICRuYW1lLCAkY29sb3IgaW4gJGZvdW5kYXRpb24tY29sb3JzIHtcbiAgICAgICAgICAmLiN7JG5hbWV9IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGJ1dHRvbi1ob2xsb3ctc3R5bGUoJGNvbG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlZCBzdHlsZVxuICAgICYuZGlzYWJsZWQsXG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgQGluY2x1ZGUgYnV0dG9uLWRpc2FibGVkO1xuICAgIH1cblxuICAgIC8vIERyb3Bkb3duIGFycm93XG4gICAgJi5kcm9wZG93biB7XG4gICAgICBAaW5jbHVkZSBidXR0b24tZHJvcGRvd247XG5cbiAgICAgIEBpZiAkYnV0dG9uLWZpbGwgPT0gaG9sbG93IHtcbiAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6ICRidXR0b24tYmFja2dyb3VuZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJ1dHRvbiB3aXRoIGRyb3Bkb3duIGFycm93IG9ubHlcbiAgICAmLmFycm93LW9ubHk6OmFmdGVyIHtcbiAgICAgIG1hcmdpbi0jeyRnbG9iYWwtbGVmdH06IDA7XG4gICAgICBmbG9hdDogbm9uZTtcbiAgICAgIHRvcDogMC4yZW07XG4gICAgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBidXR0b24tZ3JvdXBcbi8vLy9cblxuLy8vIE1hcmdpbiBmb3IgYnV0dG9uIGdyb3Vwcy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRidXR0b25ncm91cC1tYXJnaW46IDFyZW0gIWRlZmF1bHQ7XG5cbi8vLyBNYXJnaW4gYmV0d2VlbiBidXR0b25zIGluIGEgYnV0dG9uIGdyb3VwLlxuLy8vIEB0eXBlIEJvcmRlclxuJGJ1dHRvbmdyb3VwLXNwYWNpbmc6IDFweCAhZGVmYXVsdDtcblxuLy8vIFNlbGVjdG9yIGZvciB0aGUgYnV0dG9ucyBpbnNpZGUgYSBidXR0b24gZ3JvdXAuXG4vLy8gQHR5cGUgU3RyaW5nXG4kYnV0dG9uZ3JvdXAtY2hpbGQtc2VsZWN0b3I6ICcuYnV0dG9uJyAhZGVmYXVsdDtcblxuLy8vIE1heGltdW0gbnVtYmVyIG9mIGJ1dHRvbnMgdGhhdCBjYW4gYmUgaW4gYW4gZXZlbi13aWR0aCBidXR0b24gZ3JvdXAuXG4vLy8gQHR5cGUgTnVtYmVyXG4kYnV0dG9uZ3JvdXAtZXhwYW5kLW1heDogNiAhZGVmYXVsdDtcblxuLy8vIEFkZCBzdHlsZXMgZm9yIGEgYnV0dG9uIGdyb3VwIGNvbnRhaW5lci5cbi8vLyBAcGFyYW0ge1N0cmluZ30gJGNoaWxkLXNlbGVjdG9yIFskYnV0dG9uZ3JvdXAtY2hpbGQtc2VsZWN0b3JdIC0gU2VsZWN0b3IgZm9yIHRoZSBidXR0b25zIGluc2lkZSBhIGJ1dHRvbiBncm91cC5cbkBtaXhpbiBidXR0b24tZ3JvdXAoXG4gICRjaGlsZC1zZWxlY3RvcjogJGJ1dHRvbmdyb3VwLWNoaWxkLXNlbGVjdG9yXG4pIHtcbiAgQGluY2x1ZGUgY2xlYXJmaXg7XG4gIG1hcmdpbi1ib3R0b206ICRidXR0b25ncm91cC1tYXJnaW47XG4gIGZvbnQtc2l6ZTogbWFwLWdldCgkYnV0dG9uLXNpemVzLCBkZWZhdWx0KTtcblxuICAjeyRjaGlsZC1zZWxlY3Rvcn0ge1xuICAgIGZsb2F0OiAjeyRnbG9iYWwtbGVmdH07XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcblxuICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItI3skZ2xvYmFsLXJpZ2h0fTogJGJ1dHRvbmdyb3VwLXNwYWNpbmcgc29saWQgJGJvZHktYmFja2dyb3VuZDtcbiAgICB9XG4gIH1cbn1cblxuLy8vIENyZWF0ZXMgYSBmdWxsLXdpZHRoIGJ1dHRvbiBncm91cCwgbWFraW5nIGVhY2ggYnV0dG9uIGVxdWFsIHdpZHRoLlxuLy8vIEBwYXJhbSB7S2V5d29yZHxOdW1iZXJ9ICRjb3VudCBbYXV0b10gLSBOdW1iZXIgb2YgYnV0dG9ucyBpbnNpZGUgdGhlIGJ1dHRvbiBncm91cC4gU2V0IHRvIGBhdXRvYCB0byBnZW5lcmF0ZSBDU1MgdGhhdCB3aWxsIGFjY291bnQgZm9yIGEgdmFyaWFibGUgbnVtYmVyIG9mIGJ1dHRvbnMuXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRzZWxlY3RvciBbJGJ1dHRvbmdyb3VwLWNoaWxkLXNlbGVjdG9yXSAtIFNlbGVjdG9yIGZvciB0aGUgYnV0dG9ucyBpbnNpZGUgYSBidXR0b24gZ3JvdXAuXG5AbWl4aW4gYnV0dG9uLWdyb3VwLWV4cGFuZChcbiAgJHNlbGVjdG9yOiAkYnV0dG9uZ3JvdXAtY2hpbGQtc2VsZWN0b3Jcbikge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgJjo6YmVmb3JlLFxuICAmOjphZnRlciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICN7JHNlbGVjdG9yfSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICBmbG9hdDogbm9uZTtcbiAgfVxufVxuXG4vLy8gU3RhY2tzIHRoZSBidXR0b25zIGluIGEgYnV0dG9uIGdyb3VwLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkc2VsZWN0b3IgWyRidXR0b25ncm91cC1jaGlsZC1zZWxlY3Rvcl0gLSBTZWxlY3RvciBmb3IgdGhlIGJ1dHRvbnMgaW5zaWRlIHRoZSBidXR0b24gZ3JvdXAuXG5AbWl4aW4gYnV0dG9uLWdyb3VwLXN0YWNrKFxuICAkc2VsZWN0b3I6ICRidXR0b25ncm91cC1jaGlsZC1zZWxlY3RvclxuKSB7XG4gICN7JHNlbGVjdG9yfSB7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAmOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgYm9yZGVyLSN7JGdsb2JhbC1yaWdodH06ICRidXR0b25ncm91cC1zcGFjaW5nIHNvbGlkO1xuICAgIH1cbiAgfVxufVxuXG4vLy8gVW4tc3RhY2tzIHRoZSBidXR0b25zIGluIGEgYnV0dG9uIGdyb3VwLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkc2VsZWN0b3IgWyRidXR0b25ncm91cC1jaGlsZC1zZWxlY3Rvcl0gLSBTZWxlY3RvciBmb3IgdGhlIGJ1dHRvbnMgaW5zaWRlIHRoZSBidXR0b24gZ3JvdXAuXG5AbWl4aW4gYnV0dG9uLWdyb3VwLXVuc3RhY2soXG4gICRzZWxlY3RvcjogJGJ1dHRvbmdyb3VwLWNoaWxkLXNlbGVjdG9yXG4pIHtcbiAgI3skc2VsZWN0b3J9IHtcbiAgICB3aWR0aDogYXV0bztcblxuICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItI3skZ2xvYmFsLXJpZ2h0fTogJGJ1dHRvbmdyb3VwLXNwYWNpbmcgc29saWQgJGJvZHktYmFja2dyb3VuZDtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tYnV0dG9uLWdyb3VwIHtcbiAgLmJ1dHRvbi1ncm91cCB7XG4gICAgQGluY2x1ZGUgYnV0dG9uLWdyb3VwO1xuXG4gICAgLy8gU2l6ZXNcbiAgICAmLnRpbnkgICAgIHsgZm9udC1zaXplOiBtYXAtZ2V0KCRidXR0b24tc2l6ZXMsIHRpbnkpOyB9XG4gICAgJi5zbWFsbCAgICB7IGZvbnQtc2l6ZTogbWFwLWdldCgkYnV0dG9uLXNpemVzLCBzbWFsbCk7IH1cbiAgICAmLmxhcmdlICAgIHsgZm9udC1zaXplOiBtYXAtZ2V0KCRidXR0b24tc2l6ZXMsIGxhcmdlKTsgfVxuICAgICYuZXhwYW5kZWQgeyBAaW5jbHVkZSBidXR0b24tZ3JvdXAtZXhwYW5kOyB9XG5cbiAgICAvLyBDb2xvcnNcbiAgICBAZWFjaCAkbmFtZSwgJGNvbG9yIGluICRmb3VuZGF0aW9uLWNvbG9ycyB7XG4gICAgICBAaWYgJGJ1dHRvbi1maWxsICE9IGhvbGxvdyB7XG4gICAgICAgICYuI3skbmFtZX0gI3skYnV0dG9uZ3JvdXAtY2hpbGQtc2VsZWN0b3J9IHtcbiAgICAgICAgICBAaW5jbHVkZSBidXR0b24tc3R5bGUoJGNvbG9yLCBhdXRvLCBhdXRvKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICAmLiN7JG5hbWV9ICN7JGJ1dHRvbmdyb3VwLWNoaWxkLXNlbGVjdG9yfSB7XG4gICAgICAgICAgQGluY2x1ZGUgYnV0dG9uLWhvbGxvdztcbiAgICAgICAgICBAaW5jbHVkZSBidXR0b24taG9sbG93LXN0eWxlKCRjb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLnN0YWNrZWQsXG4gICAgJi5zdGFja2VkLWZvci1zbWFsbCB7XG4gICAgICBAaW5jbHVkZSBidXR0b24tZ3JvdXAtc3RhY2s7XG4gICAgfVxuXG4gICAgJi5zdGFja2VkLWZvci1zbWFsbCB7XG4gICAgICBAaW5jbHVkZSBicmVha3BvaW50KG1lZGl1bSkge1xuICAgICAgICBAaW5jbHVkZSBidXR0b24tZ3JvdXAtdW5zdGFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vLy9cbi8vLyBAZ3JvdXAgYWNjb3JkaW9uLW1lbnVcbi8vLy9cblxuLy8vIFNldHMgaWYgYWNjb3JkaW9uIG1lbnVzIGhhdmUgdGhlIGRlZmF1bHQgYXJyb3cgc3R5bGVzLlxuLy8vIEB0eXBlIEJvb2xlYW5cbiRhY2NvcmRpb25tZW51LWFycm93czogdHJ1ZSAhZGVmYXVsdDtcblxuLy8vIFNldHMgYWNjb3JkaW9uIG1lbnUgYXJyb3cgY29sb3IgaWYgYXJyb3cgaXMgdXNlZC5cbi8vLyBAdHlwZSBDb2xvclxuJGFjY29yZGlvbm1lbnUtYXJyb3ctY29sb3I6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG5AbWl4aW4gZm91bmRhdGlvbi1hY2NvcmRpb24tbWVudSB7XG4gIEBpZiAkYWNjb3JkaW9ubWVudS1hcnJvd3Mge1xuICAgIC5pcy1hY2NvcmRpb24tc3VibWVudS1wYXJlbnQgPiBhIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBAaW5jbHVkZSBjc3MtdHJpYW5nbGUoNnB4LCAkYWNjb3JkaW9ubWVudS1hcnJvdy1jb2xvciwgZG93bik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIG1hcmdpbi10b3A6IC00cHg7XG4gICAgICAgIHJpZ2h0OiAxcmVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5pcy1hY2NvcmRpb24tc3VibWVudS1wYXJlbnRbYXJpYS1leHBhbmRlZD0ndHJ1ZSddID4gYTo6YWZ0ZXIge1xuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGVZKC0xKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGFjY29yZGlvblxuLy8vL1xuXG4vLy8gRGVmYXVsdCBiYWNrZ3JvdW5kIGNvbG9yIG9mIGFuIGFjY29yZGlvbiBncm91cC5cbi8vLyBAdHlwZSBDb2xvclxuJGFjY29yZGlvbi1iYWNrZ3JvdW5kOiAkd2hpdGUgIWRlZmF1bHQ7XG5cbi8vLyBJZiBgdHJ1ZWAsIGFkZHMgcGx1cyBhbmQgbWludXMgaWNvbnMgdG8gdGhlIHNpZGUgb2YgZWFjaCBhY2NvcmRpb24gdGl0bGUuXG4vLy8gQHR5cGUgQm9vbGVhblxuJGFjY29yZGlvbi1wbHVzbWludXM6IHRydWUgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHRleHQgY29sb3IgZm9yIGl0ZW1zIGluIGEgTWVudS5cbi8vLyBAdHlwZSBDb2xvclxuJGFjY29yZGlvbi1pdGVtLWNvbG9yOiBmb3JlZ3JvdW5kKCRhY2NvcmRpb24tYmFja2dyb3VuZCwgJHByaW1hcnktY29sb3IpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBiYWNrZ3JvdW5kIGNvbG9yIG9uIGhvdmVyIGZvciBpdGVtcyBpbiBhIE1lbnUuXG4vLy8gQHR5cGUgQ29sb3JcbiRhY2NvcmRpb24taXRlbS1iYWNrZ3JvdW5kLWhvdmVyOiAkbGlnaHQtZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcGFkZGluZyBvZiBhbiBhY2NvcmRpb24gaXRlbS5cbi8vLyBAdHlwZSBOdW1iZXIgfCBMaXN0XG4kYWNjb3JkaW9uLWl0ZW0tcGFkZGluZzogMS4yNXJlbSAxcmVtICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRhYiBjb250ZW50LlxuLy8vIEB0eXBlIENvbG9yXG4kYWNjb3JkaW9uLWNvbnRlbnQtYmFja2dyb3VuZDogJHdoaXRlICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBib3JkZXIgY29sb3Igb2YgdGFiIGNvbnRlbnQuXG4vLy8gQHR5cGUgQ29sb3JcbiRhY2NvcmRpb24tY29udGVudC1ib3JkZXI6IDFweCBzb2xpZCAkbGlnaHQtZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgdGV4dCBjb2xvciBvZiB0YWIgY29udGVudC5cbi8vLyBAdHlwZSBDb2xvclxuJGFjY29yZGlvbi1jb250ZW50LWNvbG9yOiBmb3JlZ3JvdW5kKCRhY2NvcmRpb24tYmFja2dyb3VuZCwgJHByaW1hcnktY29sb3IpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBwYWRkaW5nIGZvciB0YWIgY29udGVudC5cbi8vLyBAdHlwZSBOdW1iZXIgfCBMaXN0XG4kYWNjb3JkaW9uLWNvbnRlbnQtcGFkZGluZzogMXJlbSAhZGVmYXVsdDtcblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhbiBhY2NvcmRpb24gY29udGFpbmVyLiBBcHBseSB0aGlzIHRvIHRoZSBzYW1lIGVsZW1lbnQgdGhhdCBnZXRzIGBkYXRhLWFjY29yZGlvbmAuXG5AbWl4aW4gYWNjb3JkaW9uLWNvbnRhaW5lciB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgYmFja2dyb3VuZDogJGFjY29yZGlvbi1iYWNrZ3JvdW5kO1xuICBib3JkZXI6ICRhY2NvcmRpb24tY29udGVudC1ib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzO1xuICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiAwO1xufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIHRoZSB0aXRsZSBvZiBhbiBhY2NvcmRpb24gaXRlbS4gQXBwbHkgdGhpcyB0byB0aGUgbGluayB3aXRoaW4gYW4gYWNjb3JkaW9uIGl0ZW0uXG5AbWl4aW4gYWNjb3JkaW9uLXRpdGxlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6ICRhY2NvcmRpb24taXRlbS1wYWRkaW5nO1xuICBsaW5lLWhlaWdodDogMTtcbiAgZm9udC1zaXplOiByZW0tY2FsYygxMik7XG4gIGNvbG9yOiAkYWNjb3JkaW9uLWl0ZW0tY29sb3I7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyLWJvdHRvbTogJGFjY29yZGlvbi1jb250ZW50LWJvcmRlcjtcblxuICAmOmhvdmVyLFxuICAmOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWNjb3JkaW9uLWl0ZW0tYmFja2dyb3VuZC1ob3ZlcjtcbiAgfVxuXG4gIC8vIFJlbW92ZSB0aGUgYm9yZGVyIG9uIHRoZSBsYXN0IHRpdGxlXG4gIDpsYXN0LWNoaWxkID4gJiB7XG4gICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcbiAgfVxuXG4gIEBpZiAkYWNjb3JkaW9uLXBsdXNtaW51cyB7XG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcrJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICN7JGdsb2JhbC1yaWdodH06IDFyZW07XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIG1hcmdpbi10b3A6IC0wLjVyZW07XG4gICAgfVxuXG4gICAgLmlzLWFjdGl2ZSA+ICY6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAn4oCTJztcbiAgICB9XG4gIH1cbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhY2NvcmRpb24gY29udGVudC4gQXBwbHkgdGhpcyB0byB0aGUgY29udGVudCBwYW5lIGJlbG93IGFuIGFjY29yZGlvbiBpdGVtJ3MgdGl0bGUuXG5AbWl4aW4gYWNjb3JkaW9uLWNvbnRlbnQge1xuICBwYWRkaW5nOiAkYWNjb3JkaW9uLWNvbnRlbnQtcGFkZGluZztcbiAgZGlzcGxheTogbm9uZTtcbiAgYm9yZGVyLWJvdHRvbTogJGFjY29yZGlvbi1jb250ZW50LWJvcmRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGFjY29yZGlvbi1jb250ZW50LWJhY2tncm91bmQ7XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWFjY29yZGlvbiB7XG4gIC5hY2NvcmRpb24ge1xuICAgIEBpbmNsdWRlIGFjY29yZGlvbi1jb250YWluZXI7XG4gIH1cblxuICAuYWNjb3JkaW9uLWl0ZW0ge1xuICAgIC8vIFRoaXMgY2xhc3MgZG9lc24ndCBuZWVkIHN0eWxlcyFcbiAgfVxuXG4gIC5hY2NvcmRpb24tdGl0bGUge1xuICAgIEBpbmNsdWRlIGFjY29yZGlvbi10aXRsZTtcbiAgfVxuXG4gIC5hY2NvcmRpb24tY29udGVudCB7XG4gICAgQGluY2x1ZGUgYWNjb3JkaW9uLWNvbnRlbnQ7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGJhZGdlXG4vLy8vXG5cbi8vLyBEZWZhdWx0IGJhY2tncm91bmQgY29sb3IgZm9yIGJhZGdlcy5cbi8vLyBAdHlwZSBDb2xvclxuJGJhZGdlLWJhY2tncm91bmQ6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCB0ZXh0IGNvbG9yIGZvciBiYWRnZXMuXG4vLy8gQHR5cGUgQ29sb3JcbiRiYWRnZS1jb2xvcjogZm9yZWdyb3VuZCgkYmFkZ2UtYmFja2dyb3VuZCkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHBhZGRpbmcgaW5zaWRlIGJhZGdlcy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRiYWRnZS1wYWRkaW5nOiAwLjNlbSAhZGVmYXVsdDtcblxuLy8vIE1pbmltdW0gd2lkdGggb2YgYSBiYWRnZS5cbi8vLyBAdHlwZSBOdW1iZXJcbiRiYWRnZS1taW53aWR0aDogMi4xZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZvbnQgc2l6ZSBmb3IgYmFkZ2VzLlxuLy8vIEB0eXBlIE51bWJlclxuJGJhZGdlLWZvbnQtc2l6ZTogMC42cmVtICFkZWZhdWx0O1xuXG4vLy8gR2VuZXJhdGVzIHRoZSBiYXNlIHN0eWxlcyBmb3IgYSBiYWRnZS5cbkBtaXhpbiBiYWRnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogJGJhZGdlLXBhZGRpbmc7XG4gIG1pbi13aWR0aDogJGJhZGdlLW1pbndpZHRoO1xuICBmb250LXNpemU6ICRiYWRnZS1mb250LXNpemU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuXG5AbWl4aW4gZm91bmRhdGlvbi1iYWRnZSB7XG4gIC5iYWRnZSB7XG4gICAgQGluY2x1ZGUgYmFkZ2U7XG5cbiAgICBiYWNrZ3JvdW5kOiAkYmFkZ2UtYmFja2dyb3VuZDtcbiAgICBjb2xvcjogJGJhZGdlLWNvbG9yO1xuXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkZm91bmRhdGlvbi1jb2xvcnMge1xuICAgICAgQGlmICRuYW1lICE9IHByaW1hcnkge1xuICAgICAgICAmLiN7JG5hbWV9IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAkY29sb3I7XG4gICAgICAgICAgY29sb3I6IGZvcmVncm91bmQoJGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgYnJlYWRjcnVtYnNcbi8vLy9cblxuLy8vIE1hcmdpbiBhcm91bmQgYSBicmVhZGNydW1icyBjb250YWluZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kYnJlYWRjcnVtYnMtbWFyZ2luOiAwIDAgJGdsb2JhbC1tYXJnaW4gMCAhZGVmYXVsdDtcblxuLy8vIEZvbnQgc2l6ZSBvZiBicmVhZGNydW1iIGxpbmtzLlxuLy8vIEB0eXBlIE51bWJlclxuJGJyZWFkY3J1bWJzLWl0ZW0tZm9udC1zaXplOiByZW0tY2FsYygxMSkgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciBvZiBicmVhZGNydW1iIGxpbmtzLlxuLy8vIEB0eXBlIENvbG9yXG4kYnJlYWRjcnVtYnMtaXRlbS1jb2xvcjogJHByaW1hcnktY29sb3IgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciBvZiB0aGUgYWN0aXZlIGJyZWFkY3J1bWIgbGluay5cbi8vLyBAdHlwZSBDb2xvclxuJGJyZWFkY3J1bWJzLWl0ZW0tY29sb3ItY3VycmVudDogJGJsYWNrICFkZWZhdWx0O1xuXG4vLy8gT3BhY2l0eSBvZiBkaXNhYmxlZCBicmVhZGNydW1iIGxpbmtzLlxuLy8vIEB0eXBlIE51bWJlclxuJGJyZWFkY3J1bWJzLWl0ZW0tY29sb3ItZGlzYWJsZWQ6ICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIE1hcmdpbiBiZXR3ZWVuIGJyZWFkY3J1bWIgaXRlbXMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kYnJlYWRjcnVtYnMtaXRlbS1tYXJnaW46IDAuNzVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBJZiBgdHJ1ZWAsIG1ha2VzIGJyZWFkY3J1bWIgbGlua3MgdXBwZXJjYXNlLlxuLy8vIEB0eXBlIEJvb2xlYW5cbiRicmVhZGNydW1icy1pdGVtLXVwcGVyY2FzZTogdHJ1ZSAhZGVmYXVsdDtcblxuLy8vIElmIGB0cnVlYCwgYWRkcyBhIHNsYXNoIGJldHdlZW4gYnJlYWRjcnVtYiBsaW5rcy5cbi8vLyBAdHlwZSBCb29sZWFuXG4kYnJlYWRjcnVtYnMtaXRlbS1zbGFzaDogdHJ1ZSAhZGVmYXVsdDtcblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIGJyZWFkY3J1bWJzIGNvbnRhaW5lciwgYWxvbmcgd2l0aCB0aGUgc3R5bGVzIGZvciB0aGUgYDxsaT5gIGFuZCBgPGE+YCBlbGVtZW50cyBpbnNpZGUgb2YgaXQuXG5AbWl4aW4gYnJlYWRjcnVtYnMtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgY2xlYXJmaXg7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogJGJyZWFkY3J1bWJzLW1hcmdpbjtcblxuICAvLyBJdGVtIHdyYXBwZXJcbiAgbGkge1xuICAgIGZsb2F0OiAjeyRnbG9iYWwtbGVmdH07XG4gICAgY29sb3I6ICRicmVhZGNydW1icy1pdGVtLWNvbG9yLWN1cnJlbnQ7XG4gICAgZm9udC1zaXplOiAkYnJlYWRjcnVtYnMtaXRlbS1mb250LXNpemU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuXG4gICAgQGlmICRicmVhZGNydW1icy1pdGVtLXVwcGVyY2FzZSB7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cblxuICAgIEBpZiAkYnJlYWRjcnVtYnMtaXRlbS1zbGFzaCB7XG4gICAgICAvLyBOZWVkIHRvIGVzY2FwZSB0aGUgYmFja3NsYXNoXG4gICAgICAkc2xhc2g6IGlmKCRnbG9iYWwtdGV4dC1kaXJlY3Rpb24gPT0gJ2x0cicsICcvJywgJ1xcXFwnKTtcblxuICAgICAgJjpub3QoOmxhc3QtY2hpbGQpOjphZnRlciB7XG4gICAgICAgIGNvbG9yOiAkbWVkaXVtLWdyYXk7XG4gICAgICAgIGNvbnRlbnQ6ICRzbGFzaDtcbiAgICAgICAgbWFyZ2luOiAwICRicmVhZGNydW1icy1pdGVtLW1hcmdpbjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDFweDtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgIH1cbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgbWFyZ2luLSN7JGdsb2JhbC1yaWdodH06ICRicmVhZGNydW1icy1pdGVtLW1hcmdpbjtcbiAgICB9XG4gIH1cblxuICAvLyBQYWdlIGxpbmtzXG4gIGEge1xuICAgIGNvbG9yOiAkYnJlYWRjcnVtYnMtaXRlbS1jb2xvcjtcblxuICAgICY6aG92ZXIge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWJyZWFkY3J1bWJzIHtcbiAgLmJyZWFkY3J1bWJzIHtcbiAgICBAaW5jbHVkZSBicmVhZGNydW1icy1jb250YWluZXI7XG5cbiAgICAuZGlzYWJsZWQge1xuICAgICAgY29sb3I6ICRicmVhZGNydW1icy1pdGVtLWNvbG9yLWRpc2FibGVkO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgY2FsbG91dFxuLy8vL1xuXG4vLy8gRGVmdWFsdCBiYWNrZ3JvdW5kIGNvbG9yLlxuLy8vIEB0eXBlIENvbG9yXG4kY2FsbG91dC1iYWNrZ3JvdW5kOiAkd2hpdGUgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZhZGUgdmFsdWUgZm9yIGNhbGxvdXQgYmFja2dyb3VuZHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kY2FsbG91dC1iYWNrZ3JvdW5kLWZhZGU6IDg1JSAhZGVmYXVsdDtcblxuLy8vIERlZnVhbHQgYm9yZGVyIHN0eWxlIGZvciBjYWxsb3V0cy5cbi8vLyBAdHlwZSBMaXN0XG4kY2FsbG91dC1ib3JkZXI6IDFweCBzb2xpZCByZ2JhKCRibGFjaywgMC4yNSkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGJvdHRvbSBtYXJnaW4gZm9yIGNhbGxvdXRzLlxuLy8vIEB0eXBlIE51bWJlclxuJGNhbGxvdXQtbWFyZ2luOiAwIDAgMXJlbSAwICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBpbm5lciBwYWRkaW5nIGZvciBjYWxsb3V0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRjYWxsb3V0LXBhZGRpbmc6IDFyZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZvbnQgY29sb3IgZm9yIGNhbGxvdXRzLlxuLy8vIEB0eXBlIENvbG9yXG4kY2FsbG91dC1mb250LWNvbG9yOiAkYm9keS1mb250LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBmb250IGNvbG9yIGZvciBjYWxsb3V0cywgaWYgdGhlIGNhbGxvdXQgaGFzIGEgZGFyayBiYWNrZ3JvdW5kLlxuLy8vIEB0eXBlIENvbG9yXG4kY2FsbG91dC1mb250LWNvbG9yLWFsdDogJGJvZHktYmFja2dyb3VuZCAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgYm9yZGVyIHJhZGl1cyBmb3IgY2FsbG91dHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRjYWxsb3V0LXJhZGl1czogJGdsb2JhbC1yYWRpdXMgIWRlZmF1bHQ7XG5cbi8vLyBBbW91bnQgdG8gdGludCBsaW5rcyB1c2VkIHdpdGhpbiBjb2xvcmVkIHBhbmVscy4gU2V0IHRvIGBmYWxzZWAgdG8gZGlzYWJsZSB0aGlzIGZlYXR1cmUuXG4vLy8gQHR5cGUgTnVtYmVyIHwgQm9vbGVhblxuJGNhbGxvdXQtbGluay10aW50OiAzMCUgIWRlZmF1bHQ7XG5cbi8vLyBBZGRzIGJhc2ljIHN0eWxlcyBmb3IgYSBjYWxsb3V0LCBpbmNsdWRpbmcgcGFkZGluZyBhbmQgbWFyZ2luLlxuQG1peGluIGNhbGxvdXQtYmFzZSgpIHtcbiAgbWFyZ2luOiAkY2FsbG91dC1tYXJnaW47XG4gIHBhZGRpbmc6ICRjYWxsb3V0LXBhZGRpbmc7XG4gIGJvcmRlcjogJGNhbGxvdXQtYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiAkY2FsbG91dC1yYWRpdXM7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6ICRjYWxsb3V0LWZvbnQtY29sb3I7XG5cbiAgLy8gUmVzcGVjdCB0aGUgcGFkZGluZywgZm9vbC5cbiAgPiA6Zmlyc3QtY2hpbGQge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICA+IDpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi8vLyBHZW5lcmF0ZSBxdWljayBzdHlsZXMgZm9yIGEgY2FsbG91dCB1c2luZyBhIHNpbmdsZSBjb2xvciBhcyBhIGJhc2VsaW5lLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciBbJGNhbGxvdXQtYmFja2dyb3VuZF0gLSBDb2xvciB0byB1c2UuXG5AbWl4aW4gY2FsbG91dC1zdHlsZSgkY29sb3I6ICRjYWxsb3V0LWJhY2tncm91bmQpIHtcbiAgJGJhY2tncm91bmQ6IHNjYWxlLWNvbG9yKCRjb2xvciwgJGxpZ2h0bmVzczogJGNhbGxvdXQtYmFja2dyb3VuZC1mYWRlKTtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZDtcbn1cblxuQG1peGluIGNhbGxvdXQtc2l6ZSgkcGFkZGluZykge1xuICBwYWRkaW5nLXRvcDogJHBhZGRpbmc7XG4gIHBhZGRpbmctcmlnaHQ6ICRwYWRkaW5nO1xuICBwYWRkaW5nLWJvdHRvbTogJHBhZGRpbmc7XG4gIHBhZGRpbmctbGVmdDogJHBhZGRpbmc7XG59XG5cblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIGNhbGxvdXQuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yIFskY2FsbG91dC1iYWNrZ3JvdW5kXSAtIENvbG9yIHRvIHVzZS5cbkBtaXhpbiBjYWxsb3V0KCRjb2xvcjogJGNhbGxvdXQtYmFja2dyb3VuZCkge1xuICBAaW5jbHVkZSBjYWxsb3V0LWJhc2U7XG4gIEBpbmNsdWRlIGNhbGxvdXQtc3R5bGUoJGNvbG9yKTtcbn1cblxuQG1peGluIGZvdW5kYXRpb24tY2FsbG91dCB7XG4gIC5jYWxsb3V0IHtcbiAgICBAaW5jbHVkZSBjYWxsb3V0O1xuXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkZm91bmRhdGlvbi1jb2xvcnMge1xuICAgICAgJi4jeyRuYW1lfSB7XG4gICAgICAgIEBpbmNsdWRlIGNhbGxvdXQtc3R5bGUoJGNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLnNtYWxsIHtcbiAgICAgIEBpbmNsdWRlIGNhbGxvdXQtc2l6ZSgwLjVyZW0pO1xuICAgIH1cblxuICAgICYubGFyZ2Uge1xuICAgICAgQGluY2x1ZGUgY2FsbG91dC1zaXplKDNyZW0pO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgY2xvc2UtYnV0dG9uXG4vLy8vXG5cbi8vLyBEZWZhdWx0IHBvc2l0aW9uIG9mIHRoZSBjbG9zZSBidXR0b24uIFRoZSBmaXJzdCB2YWx1ZSBzaG91bGQgYmUgYHJpZ2h0YCBvciBgbGVmdGAsIGFuZCB0aGUgc2Vjb25kIHZhbHVlIHNob3VsZCBiZSBgdG9wYCBvciBgYm90dG9tYC5cbi8vLyBAdHlwZSBMaXN0XG4kY2xvc2VidXR0b24tcG9zaXRpb246IHJpZ2h0IHRvcCAhZGVmYXVsdDtcblxuLy8vIFJpZ2h0IChvciBsZWZ0KSBvZmZzZXQgZm9yIGEgY2xvc2UgYnV0dG9uLlxuLy8vIEB0eXBlIE51bWJlclxuJGNsb3NlYnV0dG9uLW9mZnNldC1ob3Jpem9udGFsOiAxcmVtICFkZWZhdWx0O1xuXG4vLy8gVG9wIChvciBib3R0b20pIG9mZnNldCBmb3IgYSBjbG9zZSBidXR0b24uXG4vLy8gQHR5cGUgTnVtYmVyXG4kY2xvc2VidXR0b24tb2Zmc2V0LXZlcnRpY2FsOiAwLjVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGZvbnQgc2l6ZSBvZiB0aGUgY2xvc2UgYnV0dG9uLlxuLy8vIEB0eXBlIE51bWJlclxuJGNsb3NlYnV0dG9uLXNpemU6IDJlbSAhZGVmYXVsdDtcblxuLy8vIFRoZSBsaW5lLWhlaWdodCBvZiB0aGUgY2xvc2UgYnV0dG9uLiBJdCBhZmZlY3RzIHRoZSBzcGFjaW5nIG9mIHRoZSBlbGVtZW50LlxuLy8vIEB0eXBlIE51bWJlclxuJGNsb3NlYnV0dG9uLWxpbmVoZWlnaHQ6IDEgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGNvbG9yIG9mIHRoZSBjbG9zZSBidXR0b24uXG4vLy8gQHR5cGUgQ29sb3JcbiRjbG9zZWJ1dHRvbi1jb2xvcjogJGRhcmstZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgY29sb3Igb2YgdGhlIGNsb3NlIGJ1dHRvbiB3aGVuIGJlaW5nIGhvdmVyZWQgb24uXG4vLy8gQHR5cGUgQ29sb3JcbiRjbG9zZWJ1dHRvbi1jb2xvci1ob3ZlcjogJGJsYWNrICFkZWZhdWx0O1xuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgY2xvc2UgYnV0dG9uLCB1c2luZyB0aGUgc3R5bGVzIGluIHRoZSBzZXR0aW5ncyB2YXJpYWJsZXMuXG5AbWl4aW4gY2xvc2UtYnV0dG9uIHtcbiAgJHg6IG50aCgkY2xvc2VidXR0b24tcG9zaXRpb24sIDEpO1xuICAkeTogbnRoKCRjbG9zZWJ1dHRvbi1wb3NpdGlvbiwgMik7XG5cbiAgQGluY2x1ZGUgZGlzYWJsZS1tb3VzZS1vdXRsaW5lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbG9yOiAkY2xvc2VidXR0b24tY29sb3I7XG4gICN7JHh9OiAkY2xvc2VidXR0b24tb2Zmc2V0LWhvcml6b250YWw7XG4gICN7JHl9OiAkY2xvc2VidXR0b24tb2Zmc2V0LXZlcnRpY2FsO1xuICBmb250LXNpemU6ICRjbG9zZWJ1dHRvbi1zaXplO1xuICBsaW5lLWhlaWdodDogJGNsb3NlYnV0dG9uLWxpbmVoZWlnaHQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmhvdmVyLFxuICAmOmZvY3VzIHtcbiAgICBjb2xvcjogJGNsb3NlYnV0dG9uLWNvbG9yLWhvdmVyO1xuICB9XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLWNsb3NlLWJ1dHRvbiB7XG4gIC5jbG9zZS1idXR0b24ge1xuICAgIEBpbmNsdWRlIGNsb3NlLWJ1dHRvbjtcbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZHJpbGxkb3duXG4vLy8vXG5cbi8vLyBUcmFuc2l0aW9uIHByb3BlcnR5IHRvIHVzZSBmb3IgYW5pbWF0aW5nIG1lbnVzLlxuLy8vIEB0eXBlIFRyYW5zaXRpb25cbiRkcmlsbGRvd24tdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzIGxpbmVhciAhZGVmYXVsdDtcblxuLy8vIEFkZHMgYXJyb3dzIHRvIGRyaWxsZG93biBpdGVtcyB3aXRoIHN1Ym1lbnVzLCBhcyB3ZWxsIGFzIHRoZSBiYWNrIGJ1dHRvbi5cbi8vLyBAdHlwZSBCb29sZWFuXG4kZHJpbGxkb3duLWFycm93czogdHJ1ZSAhZGVmYXVsdDtcblxuLy8vIFNldHMgZHJpbGxkb3duIGFycm93IGNvbG9yIGlmIGFycm93IGlzIHVzZWQuXG4vLy8gQHR5cGUgQ29sb3JcbiRkcmlsbGRvd24tYXJyb3ctY29sb3I6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBmb3IgZHJpbGxkb3duIHN1Ym1lbnVzLlxuLy8vIEB0eXBlIENvbG9yXG4kZHJpbGxkb3duLWJhY2tncm91bmQ6ICR3aGl0ZSAhZGVmYXVsdDtcblxuQG1peGluIGZvdW5kYXRpb24tZHJpbGxkb3duLW1lbnUge1xuICAvLyBBcHBsaWVkIHRvIHRoZSBNZW51IGNvbnRhaW5lclxuICAuaXMtZHJpbGxkb3duIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC8vIEFwcGxpZWQgdG8gbmVzdGVkIDx1bD5zXG4gIC5pcy1kcmlsbGRvd24tc3VibWVudSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICAjeyRnbG9iYWwtbGVmdH06IDEwMCU7XG4gICAgei1pbmRleDogLTE7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICRkcmlsbGRvd24tYmFja2dyb3VuZDtcbiAgICB0cmFuc2l0aW9uOiAkZHJpbGxkb3duLXRyYW5zaXRpb247XG5cbiAgICAmLmlzLWFjdGl2ZSB7XG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoaWYoJGdsb2JhbC10ZXh0LWRpcmVjdGlvbiA9PSBsdHIsIC0xMDAlLCAxMDAlKSk7XG4gICAgfVxuXG4gICAgJi5pcy1jbG9zaW5nIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWChpZigkZ2xvYmFsLXRleHQtZGlyZWN0aW9uID09IGx0ciwgMTAwJSwgLTEwMCUpKTtcbiAgICB9XG4gIH1cblxuICBAaWYgJGRyaWxsZG93bi1hcnJvd3Mge1xuICAgIC5pcy1kcmlsbGRvd24tc3VibWVudS1wYXJlbnQgPiBhIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBAaW5jbHVkZSBjc3MtdHJpYW5nbGUoNnB4LCAkZHJpbGxkb3duLWFycm93LWNvbG9yLCAkZ2xvYmFsLXJpZ2h0KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgbWFyZ2luLXRvcDogLTZweDtcbiAgICAgICAgI3skZ2xvYmFsLXJpZ2h0fTogMXJlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuanMtZHJpbGxkb3duLWJhY2s6OmJlZm9yZSB7XG4gICAgICBAaW5jbHVkZSBjc3MtdHJpYW5nbGUoNnB4LCAkZHJpbGxkb3duLWFycm93LWNvbG9yLCAkZ2xvYmFsLWxlZnQpO1xuICAgICAgZmxvYXQ6ICRnbG9iYWwtbGVmdDtcbiAgICAgIG1hcmdpbi0jeyRnbG9iYWwtcmlnaHR9OiAwLjc1cmVtOyAvLyBDcmVhdGVzIHNwYWNlIGJldHdlZW4gdGhlIGFycm93IGFuZCB0aGUgdGV4dFxuICAgICAgbWFyZ2luLSN7JGdsb2JhbC1sZWZ0fTogMC42cmVtOyAvLyBMaW5lcyB0aGUgdGlwIG9mIHRoZSBhcnJvdyB3aXRoIHRoZSBpdGVtcyBiZWxvd1xuICAgICAgbWFyZ2luLXRvcDogMTRweDsgLy8gQWxpZ25zIHRoZSBhcnJvdyB3aXRoIHRoZSB0ZXh0XG4gICAgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBkcm9wZG93bi1tZW51XG4vLy8vXG5cbi8vLyBFbmFibGVzIGFycm93cyBmb3IgaXRlbXMgd2l0aCBkcm9wZG93biBtZW51cy5cbi8vLyBAdHlwZSBCb29sZWFuXG4kZHJvcGRvd25tZW51LWFycm93czogdHJ1ZSAhZGVmYXVsdDtcblxuLy8vIFNldHMgZHJvcGRvd24gbWVudSBhcnJvdyBjb2xvciBpZiBhcnJvdyBpcyB1c2VkLlxuLy8vIEB0eXBlIENvbG9yXG4kZHJvcGRvd25tZW51LWFycm93LWNvbG9yOiAkYW5jaG9yLWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gTWluaW11bSB3aWR0aCBvZiBkcm9wZG93biBzdWItbWVudXMuXG4vLy8gQHR5cGUgTGVuZ3RoXG4kZHJvcGRvd25tZW51LW1pbi13aWR0aDogMjAwcHggIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIGZvciBkcm9wZG93bnMuXG4vLy8gQHR5cGUgQ29sb3JcbiRkcm9wZG93bm1lbnUtYmFja2dyb3VuZDogJHdoaXRlICFkZWZhdWx0O1xuXG4vLy8gQm9yZGVyIGZvciBkcm9wZG93biBzdWItbWVudXMuXG4vLy8gQHR5cGUgTGlzdFxuJGRyb3Bkb3dubWVudS1ib3JkZXI6IDFweCBzb2xpZCAkbWVkaXVtLWdyYXkgIWRlZmF1bHQ7XG5cbi8vIEJvcmRlciB3aWR0aCBmb3IgZHJvcGRvd24gc3ViLW1lbnVzLlxuLy8gVXNlZCB0byBhZGp1c3QgdG9wIG1hcmdpbiBvZiBhIHN1Yi1tZW51IGlmIGEgYm9yZGVyIGlzIHVzZWQuXG4vLyBAdHlwZSBMZW5ndGhcbiRkcm9wZG93bm1lbnUtYm9yZGVyLXdpZHRoOiBudGgoJGRyb3Bkb3dubWVudS1ib3JkZXIsIDEpO1xuXG5AbWl4aW4gZm91bmRhdGlvbi1kcm9wZG93bi1tZW51IHtcbiAgLmRyb3Bkb3duLm1lbnUge1xuICAgIGEge1xuICAgICAgQGluY2x1ZGUgZGlzYWJsZS1tb3VzZS1vdXRsaW5lO1xuICAgIH1cbiAgICAuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICBhOjphZnRlciB7XG4gICAgICAgIGZsb2F0OiAkZ2xvYmFsLXJpZ2h0O1xuICAgICAgICBtYXJnaW4tdG9wOiAzcHg7XG4gICAgICAgIG1hcmdpbi0jeyRnbG9iYWwtbGVmdH06IDEwcHg7XG4gICAgICB9XG5cbiAgICAgIEBpZiAkZHJvcGRvd25tZW51LWFycm93cyB7XG4gICAgICAgICYuaXMtZG93bi1hcnJvdyBhIHtcbiAgICAgICAgICBwYWRkaW5nLSN7JGdsb2JhbC1yaWdodH06IDEuNXJlbTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIH1cblxuICAgICAgICAmLmlzLWRvd24tYXJyb3cgPiBhOjphZnRlciB7XG4gICAgICAgICAgQGluY2x1ZGUgY3NzLXRyaWFuZ2xlKDVweCwgJGRyb3Bkb3dubWVudS1hcnJvdy1jb2xvciwgZG93bik7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogcmVtLWNhbGMoMnB4KSArIHJlbS1jYWxjKGdldC1zaWRlKCRtZW51LWl0ZW0tcGFkZGluZywgdG9wKSk7XG4gICAgICAgICAgI3skZ2xvYmFsLXJpZ2h0fTogNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgJi5pcy1sZWZ0LWFycm93ID4gYTo6YWZ0ZXIge1xuICAgICAgICAgIEBpbmNsdWRlIGNzcy10cmlhbmdsZSg1cHgsICRkcm9wZG93bm1lbnUtYXJyb3ctY29sb3IsIGxlZnQpO1xuICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgICYuaXMtcmlnaHQtYXJyb3cgPiBhOjphZnRlciB7XG4gICAgICAgICAgQGluY2x1ZGUgY3NzLXRyaWFuZ2xlKDVweCwgJGRyb3Bkb3dubWVudS1hcnJvdy1jb2xvciwgcmlnaHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYuaXMtbGVmdC1hcnJvdy5vcGVucy1pbm5lciAuc3VibWVudSB7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBsZWZ0OiBhdXRvO1xuICAgICAgfVxuXG4gICAgICAmLmlzLXJpZ2h0LWFycm93Lm9wZW5zLWlubmVyIC5zdWJtZW51IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICB9XG4gICAgICBcbiAgICAgICYub3BlbnMtaW5uZXIgLnN1Ym1lbnUge1xuICAgICAgICB0b3A6IDEwMCU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm5vLWpzICYgdWwge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAuc3VibWVudSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMTAwJTtcbiAgICAgIG1pbi13aWR0aDogJGRyb3Bkb3dubWVudS1taW4td2lkdGg7XG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgYmFja2dyb3VuZDogJGRyb3Bkb3dubWVudS1iYWNrZ3JvdW5kO1xuICAgICAgYm9yZGVyOiAkZHJvcGRvd25tZW51LWJvcmRlcjtcblxuICAgICAgQGlmICh0eXBlLW9mKCRkcm9wZG93bm1lbnUtYm9yZGVyLXdpZHRoKSA9PSAnbnVtYmVyJykge1xuICAgICAgICBtYXJnaW4tdG9wOiAoLSRkcm9wZG93bm1lbnUtYm9yZGVyLXdpZHRoKTtcbiAgICAgIH1cblxuICAgICAgPiBsaSB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAmLmZpcnN0LXN1YiB7XG4gICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICB9XG5cbiAgICAgICY6bm90KC5qcy1kcm9wZG93bi1ub2hvdmVyKSA+IC5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudDpob3ZlciA+ICYsXG4gICAgICAmLmpzLWRyb3Bkb3duLWFjdGl2ZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudC5vcGVucy1sZWZ0IC5zdWJtZW51IHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgICByaWdodDogMTAwJTtcbiAgICB9XG5cbiAgICAmLmFsaWduLXJpZ2h0IHtcbiAgICAgIC5zdWJtZW51LmZpcnN0LXN1YiB7XG4gICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmlzLWRyb3Bkb3duLW1lbnUudmVydGljYWwge1xuICAgIHdpZHRoOiAxMDBweDtcblxuICAgICYuYWxpZ24tcmlnaHQge1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgIH1cblxuICAgID4gbGkgLnN1Ym1lbnUge1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMTAwJTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIGRyb3Bkb3duXG4vLy8vXG5cbi8vLyBQYWRkaW5nIGZvciBkcm9wZG93biBwYW5lcy5cbi8vLyBAdHlwZSBMaXN0XG4kZHJvcGRvd24tcGFkZGluZzogMXJlbSAhZGVmYXVsdDtcblxuLy8vIEJvcmRlciBmb3IgZHJvcGRvd24gcGFuZXMuXG4vLy8gQHR5cGUgTGlzdFxuJGRyb3Bkb3duLWJvcmRlcjogMXB4IHNvbGlkICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIEZvbnQgc2l6ZSBmb3IgZHJvcGRvd24gcGFuZXMuXG4vLy8gQHR5cGUgTGlzdFxuJGRyb3Bkb3duLWZvbnQtc2l6ZTogMTZyZW0gIWRlZmF1bHQ7XG5cbi8vLyBXaWR0aCBmb3IgZHJvcGRvd24gcGFuZXMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kZHJvcGRvd24td2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuXG4vLy8gQm9yZGVyIHJhZGl1cyBkcm9wZG93biBwYW5lcy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRkcm9wZG93bi1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzICFkZWZhdWx0O1xuXG4vLy8gU2l6ZXMgZm9yIGRyb3Bkb3duIHBhbmVzLiBFYWNoIHNpemUgaXMgYSBDU1MgY2xhc3MgeW91IGNhbiBhcHBseS5cbi8vLyBAdHlwZSBNYXBcbiRkcm9wZG93bi1zaXplczogKFxuICB0aW55OiAxMDBweCxcbiAgc21hbGw6IDIwMHB4LFxuICBsYXJnZTogNDAwcHgsXG4pICFkZWZhdWx0O1xuXG4vLy8gQXBwbGllcyBzdHlsZXMgZm9yIGEgYmFzaWMgZHJvcGRvd24uXG5AbWl4aW4gZHJvcGRvd24tY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJvZHktYmFja2dyb3VuZDtcbiAgYm9yZGVyOiAkZHJvcGRvd24tYm9yZGVyO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogJGRyb3Bkb3duLXBhZGRpbmc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB3aWR0aDogJGRyb3Bkb3duLXdpZHRoO1xuICB6LWluZGV4OiAxMDtcbiAgYm9yZGVyLXJhZGl1czogJGRyb3Bkb3duLXJhZGl1cztcblxuICAmLmlzLW9wZW4ge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tZHJvcGRvd24ge1xuICAuZHJvcGRvd24tcGFuZSB7XG4gICAgQGluY2x1ZGUgZHJvcGRvd24tY29udGFpbmVyO1xuICB9XG5cbiAgQGVhY2ggJG5hbWUsICRzaXplIGluICRkcm9wZG93bi1zaXplcyB7XG4gICAgLmRyb3Bkb3duLXBhbmUuI3skbmFtZX0ge1xuICAgICAgd2lkdGg6ICRzaXplO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgZmxleC12aWRlb1xuLy8vL1xuXG4vLy8gTWFyZ2luIGJlbG93IGEgZmxleCB2aWRlbyBjb250YWluZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kZmxleHZpZGVvLW1hcmdpbi1ib3R0b206IHJlbS1jYWxjKDE2KSAhZGVmYXVsdDtcblxuLy8vIFBhZGRpbmcgdXNlZCB0byBjcmVhdGUgYSA0OjMgYXNwZWN0IHJhdGlvLlxuLy8vIEB0eXBlIE51bWJlclxuJGZsZXh2aWRlby1yYXRpbzogNCBieSAzICFkZWZhdWx0O1xuXG4vLy8gUGFkZGluZyB1c2VkIHRvIGNyZWF0ZSBhIDE2OjkgYXNwZWN0IHJhdGlvLlxuLy8vIEB0eXBlIE51bWJlclxuJGZsZXh2aWRlby1yYXRpby13aWRlc2NyZWVuOiAxNiBieSA5ICFkZWZhdWx0O1xuXG4vLy8gQ3JlYXRlcyBhIHBlcmNlbnRhZ2UgaGVpZ2h0IHRoYXQgY2FuIGJlIHVzZWQgYXMgcGFkZGluZyBpbiBhIGZsZXggdmlkZW8gY29udGFpbmVyLlxuLy8vIEBwYXJhbSB7TGlzdH0gJHJhdGlvIC0gUmF0aW8gdG8gdXNlIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0LCBmb3JtYXR0ZWQgYXMgYHggYnkgeWAuXG4vLy8gQHJldHVybiB7TnVtYmVyfSBBIHBlcmNlbnRhZ2UgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgYHBhZGRpbmctYm90dG9tYCBwYXJhbWV0ZXIgb2YgYSBmbGV4IHZpZGVvIGNvbnRhaW5lci5cbkBmdW5jdGlvbiBmbGV4LXZpZGVvKCRyYXRpbykge1xuICAkdzogbnRoKCRyYXRpbywgMSk7XG4gICRoOiBudGgoJHJhdGlvLCAzKTtcbiAgQHJldHVybiAkaCAvICR3ICogMTAwJTtcbn1cblxuLy8vIENyZWF0ZXMgYSBmbGV4IHZpZGVvIGNvbnRhaW5lci5cbi8vLyBAcGFyYW0ge0xpc3R9ICRyYXRpbyBbJGZsZXh2aWRlby1yYXRpb10gLSBSYXRpbyB0byB1c2UgZm9yIHRoZSBjb250YWluZXIsIGZvcm1hdHRlZCBhcyBgeCBieSB5YC5cbkBtaXhpbiBmbGV4LXZpZGVvKCRyYXRpbzogJGZsZXh2aWRlby1yYXRpbykge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMDtcbiAgcGFkZGluZy1ib3R0b206IGZsZXgtdmlkZW8oJHJhdGlvKTtcbiAgbWFyZ2luLWJvdHRvbTogJGZsZXh2aWRlby1tYXJnaW4tYm90dG9tO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIGlmcmFtZSxcbiAgb2JqZWN0LFxuICBlbWJlZCxcbiAgdmlkZW8ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgI3skZ2xvYmFsLWxlZnR9OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxufVxuXG5AbWl4aW4gZm91bmRhdGlvbi1mbGV4LXZpZGVvIHtcbiAgLmZsZXgtdmlkZW8ge1xuICAgIEBpbmNsdWRlIGZsZXgtdmlkZW87XG5cbiAgICAmLndpZGVzY3JlZW4ge1xuICAgICAgcGFkZGluZy1ib3R0b206IGZsZXgtdmlkZW8oJGZsZXh2aWRlby1yYXRpby13aWRlc2NyZWVuKTtcbiAgICB9XG5cbiAgICAmLnZpbWVvIHtcbiAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgbGFiZWxcbi8vLy9cblxuLy8vIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBmb3IgbGFiZWxzLlxuLy8vIEB0eXBlIENvbG9yXG4kbGFiZWwtYmFja2dyb3VuZDogJHByaW1hcnktY29sb3IgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHRleHQgY29sb3IgZm9yIGxhYmVscy5cbi8vLyBAdHlwZSBDb2xvclxuJGxhYmVsLWNvbG9yOiBmb3JlZ3JvdW5kKCRsYWJlbC1iYWNrZ3JvdW5kKSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZm9udCBzaXplIGZvciBsYWJlbHMuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbGFiZWwtZm9udC1zaXplOiAwLjhyZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHBhZGRpbmcgaW5zaWRlIGxhYmVscy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRsYWJlbC1wYWRkaW5nOiAwLjMzMzMzcmVtIDAuNXJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcmFkaXVzIG9mIGxhYmVscy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRsYWJlbC1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzICFkZWZhdWx0O1xuXG4vLy8gR2VuZXJhdGVzIGJhc2Ugc3R5bGVzIGZvciBhIGxhYmVsLlxuQG1peGluIGxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAkbGFiZWwtcGFkZGluZztcbiAgZm9udC1zaXplOiAkbGFiZWwtZm9udC1zaXplO1xuICBsaW5lLWhlaWdodDogMTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgY3Vyc29yOiBkZWZhdWx0O1xuICBib3JkZXItcmFkaXVzOiAkbGFiZWwtcmFkaXVzO1xufVxuXG5AbWl4aW4gZm91bmRhdGlvbi1sYWJlbCB7XG4gIC5sYWJlbCB7XG4gICAgQGluY2x1ZGUgbGFiZWw7XG5cbiAgICBiYWNrZ3JvdW5kOiAkbGFiZWwtYmFja2dyb3VuZDtcbiAgICBjb2xvcjogJGxhYmVsLWNvbG9yO1xuXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkZm91bmRhdGlvbi1jb2xvcnMge1xuICAgICAgQGlmICRuYW1lICE9IHByaW1hcnkge1xuICAgICAgICAmLiN7JG5hbWV9IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAkY29sb3I7XG4gICAgICAgICAgY29sb3I6IGZvcmVncm91bmQoJGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgbWVkaWEtb2JqZWN0XG4vLy8vXG5cbi8vLyBCb3R0b20gbWFyZ2luIG9mIGEgbWVkaWEgb2JqZWN0LlxuLy8vIEB0eXBlIE51bWJlclxuJG1lZGlhb2JqZWN0LW1hcmdpbi1ib3R0b206ICRnbG9iYWwtbWFyZ2luICFkZWZhdWx0O1xuXG4vLy8gTGVmdCBhbmQgcmlnaHQgcGFkZGluZyBvbiBzZWN0aW9ucyB3aXRoaW4gYSBtZWRpYSBvYmplY3QuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbWVkaWFvYmplY3Qtc2VjdGlvbi1wYWRkaW5nOiAkZ2xvYmFsLXBhZGRpbmcgIWRlZmF1bHQ7XG5cbi8vLyBXaXRoIG9mIGltYWdlcyB3aXRoaW4gYSBtZWRpYSBvYmplY3QsIHdoZW4gdGhlIG9iamVjdCBpcyBzdGFja2VkIHZlcnRpY2FsbHkuIFNldCB0byAnYXV0bycgdG8gdXNlIHRoZSBpbWFnZSdzIG5hdHVyYWwgd2lkdGguXG4vLy8gQHR5cGUgTnVtYmVyXG4kbWVkaWFvYmplY3QtaW1hZ2Utd2lkdGgtc3RhY2tlZDogMTAwJSAhZGVmYXVsdDtcblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIG1lZGlhIG9iamVjdCBjb250YWluZXIuXG5AbWl4aW4gbWVkaWEtb2JqZWN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206ICRtZWRpYW9iamVjdC1tYXJnaW4tYm90dG9tO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciBzZWN0aW9ucyB3aXRoaW4gYSBtZWRpYSBvYmplY3QuXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRwYWRkaW5nIFskbWVkaWFvYmplY3Qtc2VjdGlvbi1wYWRkaW5nXSAtIFBhZGRpbmcgYmV0d2VlbiBzZWN0aW9ucy5cbkBtaXhpbiBtZWRpYS1vYmplY3Qtc2VjdGlvbigkcGFkZGluZzogJG1lZGlhb2JqZWN0LXNlY3Rpb24tcGFkZGluZykge1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuXG4gICY6Zmlyc3QtY2hpbGQge1xuICAgIHBhZGRpbmctI3skZ2xvYmFsLXJpZ2h0fTogJHBhZGRpbmc7XG4gIH1cblxuICAmOmxhc3QtY2hpbGQ6bm90KCsgI3smfTpmaXJzdC1jaGlsZCkge1xuICAgIHBhZGRpbmctI3skZ2xvYmFsLWxlZnR9OiAkcGFkZGluZztcbiAgfVxufVxuXG4vLy8gQWRkcyBzdHlsZXMgdG8gc3RhY2sgc2VjdGlvbnMgb2YgYSBtZWRpYSBvYmplY3QuIEFwcGx5IHRoaXMgdG8gdGhlIHNlY3Rpb24gZWxlbWVudHMsIG5vdCB0aGUgY29udGFpbmVyLlxuQG1peGluIG1lZGlhLW9iamVjdC1zdGFjayB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwO1xuICBwYWRkaW5nLWJvdHRvbTogJG1lZGlhb2JqZWN0LXNlY3Rpb24tcGFkZGluZztcblxuICBpbWcge1xuICAgIHdpZHRoOiAkbWVkaWFvYmplY3QtaW1hZ2Utd2lkdGgtc3RhY2tlZDtcbiAgfVxufVxuXG5AbWl4aW4gZm91bmRhdGlvbi1tZWRpYS1vYmplY3Qge1xuICAubWVkaWEtb2JqZWN0IHtcbiAgICBAaW5jbHVkZSBtZWRpYS1vYmplY3QtY29udGFpbmVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICB9XG5cbiAgICAmLnN0YWNrLWZvci1zbWFsbCAubWVkaWEtb2JqZWN0LXNlY3Rpb24ge1xuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludChzbWFsbCBvbmx5KSB7XG4gICAgICAgIEBpbmNsdWRlIG1lZGlhLW9iamVjdC1zdGFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWVkaWEtb2JqZWN0LXNlY3Rpb24ge1xuICAgIEBpbmNsdWRlIG1lZGlhLW9iamVjdC1zZWN0aW9uO1xuXG4gICAgJi5taWRkbGUgeyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XG4gICAgJi5ib3R0b20geyB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIG1lbnVcbi8vLy9cblxuLy8vIE1hcmdpbiBvZiBhIG1lbnUuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbWVudS1tYXJnaW46IDAgIWRlZmF1bHQ7XG5cbi8vLyBMZWZ0LWhhbmQgbWFyZ2luIG9mIGEgbmVzdGVkIG1lbnUuXG4vLy8gQHR5cGUgTnVtYmVyXG4kbWVudS1tYXJnaW4tbmVzdGVkOiAxcmVtICFkZWZhdWx0O1xuXG4vLy8gUGFkZGluZyBmb3IgaXRlbXMgaW4gYSBtZW51LlxuLy8vIEB0eXBlIE51bWJlclxuJG1lbnUtaXRlbS1wYWRkaW5nOiAwLjdyZW0gMXJlbSAhZGVmYXVsdDtcblxuLy8vIFNwYWNpbmcgYmV0d2VlbiBhbiBpY29uIGFuZCB0ZXh0IGluIGEgbWVudSBpdGVtLlxuLy8vIEB0eXBlIE51bWJlclxuJG1lbnUtaWNvbi1zcGFjaW5nOiAwLjI1cmVtICFkZWZhdWx0O1xuXG4vLy8gTWF4aW11bSBudW1iZXIgb2YgYGV4cGFuZC1uYCBjbGFzc2VzIHRvIGluY2x1ZGUgaW4gdGhlIENTUy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRtZW51LWV4cGFuZC1tYXg6IDYgIWRlZmF1bHQ7XG5cbi8vLyBDcmVhdGVzIHRoZSBiYXNlIHN0eWxlcyBmb3IgYSBNZW51LlxuQG1peGluIG1lbnUtYmFzZSB7XG4gIG1hcmdpbjogJG1lbnUtbWFyZ2luO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5cbiAgLy8gTGlzdCBpdGVtcyBhcmUgdGFibGUgY2VsbCB0byBhbGxvdyBmb3IgdmVydGljYWwgYWxpZ25tZW50XG4gID4gbGkge1xuICAgIEBpbmNsdWRlIGRpc2FibGUtbW91c2Utb3V0bGluZTtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIH1cblxuICAvLyBSZXNldCBsaW5lIGhlaWdodCB0byBtYWtlIHRoZSBoZWlnaHQgb2YgdGhlIG92ZXJhbGwgaXRlbSBlYXNpZXIgdG8gY2FsY3VsYXRlXG4gID4gbGk6bm90KC5tZW51LXRleHQpID4gYSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogJG1lbnUtaXRlbS1wYWRkaW5nO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuICB9XG5cbiAgLy8gUmVzZXQgc3R5bGVzIG9mIGlubmVyIGVsZW1lbnRzXG4gIGlucHV0LFxuICBhLFxuICBidXR0b24ge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbn1cblxuLy8vIEV4cGFuZHMgdGhlIGl0ZW1zIG9mIGEgTWVudSwgc28gZWFjaCBpdGVtIGlzIHRoZSBzYW1lIHdpZHRoLlxuQG1peGluIG1lbnUtZXhwYW5kIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4vLy8gU2V0cyB0aGUgZGlyZWN0aW9uIG9mIGEgTWVudS5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICRkaXIgW2hvcml6b250YWxdIC0gRGlyZWN0aW9uIG9mIHRoZSBNZW51LiBDYW4gYmUgYGhvcml6b250YWxgIG9yIGB2ZXJ0aWNhbGAuXG5AbWl4aW4gbWVudS1kaXJlY3Rpb24oJGRpcjogaG9yaXpvbnRhbCkge1xuICBAaWYgJGRpciA9PSBob3Jpem9udGFsIHtcbiAgICA+IGxpIHtcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgfVxuICB9XG4gIEBlbHNlIGlmICRkaXIgPT0gdmVydGljYWwge1xuICAgID4gbGkge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICB9XG4gIEBlbHNlIHtcbiAgICBAd2FybiAnVGhlIGRpcmVjdGlvbiB1c2VkIGZvciBtZW51LWRpcmVjdGlvbigpIG11c3QgYmUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbC4nO1xuICB9XG59XG5cbi8vLyBDcmVhdGVzIGEgc2ltcGxlIE1lbnUsIHdoaWNoIGhhcyBubyBwYWRkaW5nIG9yIGhvdmVyIHN0YXRlLlxuQG1peGluIG1lbnUtc2ltcGxlIHtcbiAgYSB7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW4tI3skZ2xvYmFsLXJpZ2h0fTogZ2V0LXNpZGUoJG1lbnUtaXRlbS1wYWRkaW5nLCAkZ2xvYmFsLXJpZ2h0KTtcbiAgfVxufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgbmVzdGVkIE1lbnUsIGJ5IGFkZGluZyBgbWFyZ2luLWxlZnRgIHRvIHRoZSBtZW51LlxuLy8vIEBwYXJhbSB7S2V5d29yZHxOdW1iZXJ9ICRwYWRkaW5nIFthdXRvXSAtIExlbmd0aCBvZiB0aGUgbWFyZ2luLlxuQG1peGluIG1lbnUtbmVzdGVkKCRtYXJnaW46ICRtZW51LW1hcmdpbi1uZXN0ZWQpIHtcbiAgbWFyZ2luLSN7JGdsb2JhbC1sZWZ0fTogJG1hcmdpbjtcbn1cblxuLy8vIEFkZHMgc3VwcG9ydCBmb3IgaWNvbnMgdG8gTWVudSBpdGVtcy5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICRwb3NpdGlvbiBbc2lkZV0gLSBQb3NpdGlvbmluZyBmb3IgaWNvbnMuIENhbiBiZSBgc2lkZWAgKGxlZnQsIG9yIHJpZ2h0IG9uIFJUTCkgb3IgYHRvcGAuXG4vLy8gQHBhcmFtIHtCb29sZWFufSAkYmFzZSBbdHJ1ZV0gLSBTZXQgdG8gYGZhbHNlYCB0byBwcmV2ZW50IHRoZSBzaGFyZWQgQ1NTIGJldHdlZW4gc2lkZS0gYW5kIHRvcC1hbGlnbmVkIGljb25zIGZyb20gYmVpbmcgcHJpbnRlZC4gU2V0IHRoaXMgdG8gYGZhbHNlYCBpZiB5b3UncmUgY2FsbGluZyB0aGUgbWl4aW4gbXVsdGlwbGUgdGltZXMgb24gdGhlIHNhbWUgZWxlbWVudC5cbkBtaXhpbiBtZW51LWljb25zKCRwb3NpdGlvbjogc2lkZSwgJGJhc2U6IHRydWUpIHtcbiAgQGlmICRiYXNlIHtcbiAgICA+IGxpID4gYSB7XG4gICAgICA+IGltZyxcbiAgICAgID4gaSB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICB9XG5cbiAgICAgID4gc3BhbiB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGlmICRwb3NpdGlvbiA9PSBzaWRlIHtcbiAgICA+IGxpID4gYSB7XG4gICAgICA+IGltZyxcbiAgICAgID4gaSB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWFyZ2luLSN7JGdsb2JhbC1yaWdodH06ICRtZW51LWljb24tc3BhY2luZztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQGVsc2UgaWYgJHBvc2l0aW9uID09IHRvcCB7XG4gICAgPiBsaSA+IGEge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgICA+IGltZyxcbiAgICAgID4gaSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXJnaW46IDAgYXV0byAkbWVudS1pY29uLXNwYWNpbmc7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtZW51LXRleHQge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBwYWRkaW5nLXRvcDogMDtcbiAgcGFkZGluZy1ib3R0b206IDA7XG4gIHBhZGRpbmc6ICRtZW51LWl0ZW0tcGFkZGluZztcbn1cblxuQG1peGluIGZvdW5kYXRpb24tbWVudSB7XG4gIC5tZW51IHtcbiAgICBAaW5jbHVkZSBtZW51LWJhc2U7XG4gICAgQGluY2x1ZGUgbWVudS1pY29ucztcblxuICAgIC8vIE9yaWVudGF0aW9uXG4gICAgQGluY2x1ZGUgbWVudS1kaXJlY3Rpb24oaG9yaXpvbnRhbCk7XG5cbiAgICAmLnZlcnRpY2FsIHtcbiAgICAgIEBpbmNsdWRlIG1lbnUtZGlyZWN0aW9uKHZlcnRpY2FsKTtcbiAgICB9XG5cbiAgICBAZWFjaCAkc2l6ZSBpbiAkYnJlYWtwb2ludC1jbGFzc2VzIHtcbiAgICAgIEBpZiAkc2l6ZSAhPSBzbWFsbCB7XG4gICAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJHNpemUpIHtcbiAgICAgICAgICAmLiN7JHNpemV9LWhvcml6b250YWwge1xuICAgICAgICAgICAgQGluY2x1ZGUgbWVudS1kaXJlY3Rpb24oaG9yaXpvbnRhbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi4jeyRzaXplfS12ZXJ0aWNhbCB7XG4gICAgICAgICAgICBAaW5jbHVkZSBtZW51LWRpcmVjdGlvbih2ZXJ0aWNhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2ltcGxlXG4gICAgJi5zaW1wbGUge1xuICAgICAgQGluY2x1ZGUgbWVudS1zaW1wbGU7XG4gICAgfVxuXG4gICAgLy8gQWxpZ24gcmlnaHRcbiAgICAmLmFsaWduLSN7JGdsb2JhbC1yaWdodH0ge1xuICAgICAgPiBsaSB7XG4gICAgICAgIGZsb2F0OiAkZ2xvYmFsLXJpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEV2ZW4td2lkdGhcbiAgICAmLmV4cGFuZGVkIHtcbiAgICAgIEBpbmNsdWRlIG1lbnUtZXhwYW5kO1xuXG4gICAgICA+IGxpOmZpcnN0LWNoaWxkOmxhc3QtY2hpbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJ0aWNhbCBpY29uc1xuICAgICYuaWNvbi10b3Age1xuICAgICAgQGluY2x1ZGUgbWVudS1pY29ucyh0b3AsICRiYXNlOiBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gTmVzdGluZ1xuICAgICYubmVzdGVkIHtcbiAgICAgIEBpbmNsdWRlIG1lbnUtbmVzdGVkO1xuICAgIH1cbiAgfVxuXG4gIC5tZW51LXRleHQge1xuICAgIEBpbmNsdWRlIG1lbnUtdGV4dDtcbiAgfVxuXG4gIC8vIFByZXZlbnQgRk9VQyB3aGVuIHVzaW5nIHRoZSBSZXNwb25zaXZlIE1lbnUgcGx1Z2luXG4gIC5uby1qcyBbZGF0YS1yZXNwb25zaXZlLW1lbnVdIHVsIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBvZmYtY2FudmFzXG4vLy8vXG5cbi8vLyBXaWR0aCBvZiBhbiBvZmYtY2FudmFzIG1lbnUuXG4vLy8gQHR5cGUgTnVtYmVyXG4kb2ZmY2FudmFzLXNpemU6IDI1MHB4ICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBvZiBhbiBvZmYtY2FudmFzIG1lbnUuXG4vLy8gQHR5cGUgQ29sb3JcbiRvZmZjYW52YXMtYmFja2dyb3VuZDogJGxpZ2h0LWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBaLWluZGV4IG9mIGFuIG9mZi1jYW52YXMgbWVudS5cbi8vLyBAdHlwZSBOdW1iZXJcbiRvZmZjYW52YXMtemluZGV4OiAtMSAhZGVmYXVsdDtcblxuLy8vIExlbmd0aCBvZiB0aGUgYW5pbWF0aW9uIG9uIGFuIG9mZi1jYW52YXMgbWVudS5cbi8vLyBAdHlwZSBOdW1iZXJcbiRvZmZjYW52YXMtdHJhbnNpdGlvbi1sZW5ndGg6IDAuNXMgIWRlZmF1bHQ7XG5cbi8vLyBUaW1pbmcgZnVuY3Rpb24gb2YgdGhlIGFuaW1hdGlvbiBvbiBhbiBvZmYtY2FudmFzIG1lbnUuXG4vLy8gQHR5cGUgS2V5d29yZFxuJG9mZmNhbnZhcy10cmFuc2l0aW9uLXRpbWluZzogZWFzZSAhZGVmYXVsdDtcblxuLy8vIElmIGB0cnVlYCwgYSByZXZlYWxlZCBvZmYtY2FudmFzIHdpbGwgYmUgZml4ZWQtcG9zaXRpb24sIGFuZCBzY3JvbGwgd2l0aCB0aGUgc2NyZWVuLlxuJG9mZmNhbnZhcy1maXhlZC1yZXZlYWw6IHRydWUgIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIGZvciB0aGUgb3ZlcmxheSB0aGF0IGFwcGVhcnMgd2hlbiBhbiBvZmYtY2FudmFzIG1lbnUgaXMgb3Blbi5cbi8vLyBAdHlwZSBDb2xvclxuJG9mZmNhbnZhcy1leGl0LWJhY2tncm91bmQ6IHJnYmEoJHdoaXRlLCAwLjI1KSAhZGVmYXVsdDtcblxuLy8vIENTUyBjbGFzcyB1c2VkIGZvciB0aGUgbWFpbiBjb250ZW50IGFyZWEuIFRoZSBvZmYtY2FudmFzIG1peGlucyB1c2UgdGhpcyB0byB0YXJnZXQgdGhlIHBhZ2UgYm9keS5cbiRtYWluY29udGVudC1jbGFzczogJ29mZi1jYW52YXMtY29udGVudCcgIWRlZmF1bHQ7XG5cbi8vLyBCb3ggc2hhZG93IHRvIHBsYWNlIHVuZGVyIHRoZSBtYWluIGNvbnRlbnQgYXJlYS4gVGhpcyBzaGFkb3cgb3ZlcmxhcHMgdGhlIG9mZi1jYW52YXMgbWVudXMuXG4vLy8gQHR5cGUgU2hhZG93XG4kbWFpbmNvbnRlbnQtc2hhZG93OiAwIDAgMTBweCByZ2JhKCRibGFjaywgMC41KSAhZGVmYXVsdDtcblxuLy8vIEFkZHMgYmFzZWxpbmUgc3R5bGVzIGZvciBvZmYtY2FudmFzLiBUaGlzIENTUyBpcyByZXF1aXJlZCB0byBtYWtlIHRoZSBvdGhlciBwaWVjZXMgd29yay5cbkBtaXhpbiBvZmYtY2FudmFzLWJhc2ljcyB7XG4gIC8vIEV4dHJhIHByb3BlcnRpZXMgbmVlZGVkIG9uIDxodG1sPiBhbmQgPGJvZHk+IHRvIG1ha2Ugb2ZmLWNhbnZhcyB3b3JrXG4gIGh0bWwsXG4gIGJvZHkge1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5vZmYtY2FudmFzLXdyYXBwZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiBhdXRvO1xuICB9XG5cbiAgLm9mZi1jYW52YXMtd3JhcHBlci1pbm5lciB7XG4gICAgQGluY2x1ZGUgY2xlYXJmaXg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAkb2ZmY2FudmFzLXRyYW5zaXRpb24tbGVuZ3RoICRvZmZjYW52YXMtdHJhbnNpdGlvbi10aW1pbmc7XG4gIH1cblxuICAvLyBDb250YWluZXIgZm9yIHBhZ2UgY29udGVudFxuICAub2ZmLWNhbnZhcy1jb250ZW50LFxuICAuI3skbWFpbmNvbnRlbnQtY2xhc3N9IHtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICRib2R5LWJhY2tncm91bmQ7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtICRvZmZjYW52YXMtdHJhbnNpdGlvbi1sZW5ndGggJG9mZmNhbnZhcy10cmFuc2l0aW9uLXRpbWluZztcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgei1pbmRleDogMTtcblxuICAgIEBpZiBoYXMtdmFsdWUoJG1haW5jb250ZW50LXNoYWRvdykge1xuICAgICAgYm94LXNoYWRvdzogJG1haW5jb250ZW50LXNoYWRvdztcbiAgICB9XG4gIH1cblxuICAvLyBDbGljay10by1leGl0IG92ZXJsYXkgKGdlbmVyYXRlZCBieSBKYXZhU2NyaXB0KVxuICAuanMtb2ZmLWNhbnZhcy1leGl0IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogJG9mZmNhbnZhcy1leGl0LWJhY2tncm91bmQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgJG9mZmNhbnZhcy10cmFuc2l0aW9uLWxlbmd0aCAkb2ZmY2FudmFzLXRyYW5zaXRpb24tdGltaW5nO1xuXG4gICAgLmlzLW9mZi1jYW52YXMtb3BlbiAmIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgfVxufVxuXG4vLy8gQWRkcyBiYXNpYyBzdHlsZXMgZm9yIGFuIG9mZi1jYW52YXMgbWVudS5cbkBtaXhpbiBvZmYtY2FudmFzLWJhc2Uge1xuICBAaW5jbHVkZSBkaXNhYmxlLW1vdXNlLW91dGxpbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZDogJG9mZmNhbnZhcy1iYWNrZ3JvdW5kO1xuICB6LWluZGV4OiAkb2ZmY2FudmFzLXppbmRleDtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xufVxuXG5AbWl4aW4gb2ZmLWNhbnZhcy1wb3NpdGlvbihcbiAgJHBvc2l0aW9uOiBsZWZ0LFxuICAkc2l6ZTogJG9mZmNhbnZhcy1zaXplLFxuICAkZml4ZWQ6IGZhbHNlXG4pIHtcbiAgQGlmICRwb3NpdGlvbiA9PSBsZWZ0IHtcbiAgICBsZWZ0OiAtJHNpemU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAkc2l6ZTtcbiAgfVxuICBAZWxzZSBpZiAkcG9zaXRpb24gPT0gcmlnaHQge1xuICAgIHJpZ2h0OiAtJHNpemU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAkc2l6ZTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlcyBhbiBvcGVuIHN0YXRlIGNsYXNzIHRoYXQgbWF0Y2hlcyB0aGUgd2lkdGggb2YgdGhlIG1lbnVcbiAgQGF0LXJvb3Qge1xuICAgIC5pcy1vcGVuLSN7JHBvc2l0aW9ufSB7XG4gICAgICBAaWYgJHBvc2l0aW9uID09IGxlZnQge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHNpemUpO1xuICAgICAgfVxuICAgICAgQGVsc2UgaWYgJHBvc2l0aW9uID09IHJpZ2h0IHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0kc2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vLyBBZGRzIHN0eWxlcyB0aGF0IHJldmVhbCBhbiBvZmYtY2FudmFzIG1lbnUuXG4vLy8gQHBhcmFtIHtLZXl3b3JkfSAkcG9zaXRpb24gW2xlZnRdIC0gUG9zaXRpb24gb2YgdGhlIG9mZi1jYW52YXMgbWVudSBiZWluZyByZXZlYWxlZC5cbkBtaXhpbiBvZmYtY2FudmFzLXJldmVhbChcbiAgJHBvc2l0aW9uOiBsZWZ0XG4pIHtcbiAgI3skcG9zaXRpb259OiAwO1xuICB6LWluZGV4OiBhdXRvO1xuXG4gIEBpZiAkb2ZmY2FudmFzLWZpeGVkLXJldmVhbCB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICB9XG5cbiAgJiB+IC4jeyRtYWluY29udGVudC1jbGFzc30ge1xuICAgIG1hcmdpbi0jeyRwb3NpdGlvbn06ICRvZmZjYW52YXMtc2l6ZTtcbiAgfVxufVxuXG5AbWl4aW4gZm91bmRhdGlvbi1vZmYtY2FudmFzIHtcbiAgQGluY2x1ZGUgb2ZmLWNhbnZhcy1iYXNpY3M7XG5cbiAgLy8gT2ZmLWNhbnZhcyBjb250YWluZXJcbiAgLm9mZi1jYW52YXMge1xuICAgIEBpbmNsdWRlIG9mZi1jYW52YXMtYmFzZTtcblxuICAgICYucG9zaXRpb24tbGVmdCAgIHsgQGluY2x1ZGUgb2ZmLWNhbnZhcy1wb3NpdGlvbihsZWZ0KTsgfVxuICAgICYucG9zaXRpb24tcmlnaHQgIHsgQGluY2x1ZGUgb2ZmLWNhbnZhcy1wb3NpdGlvbihyaWdodCk7IH1cbiAgfVxuXG4gIC8vIFJldmVhbCBvZmYtY2FudmFzIG1lbnUgb24gbGFyZ2VyIHNjcmVlbnNcbiAgQGVhY2ggJG5hbWUsICR2YWx1ZSBpbiAkYnJlYWtwb2ludC1jbGFzc2VzIHtcbiAgICBAaWYgJG5hbWUgIT0gc21hbGwge1xuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgkbmFtZSkge1xuICAgICAgICAucG9zaXRpb24tbGVmdC5yZXZlYWwtZm9yLSN7JG5hbWV9IHtcbiAgICAgICAgICBAaW5jbHVkZSBvZmYtY2FudmFzLXJldmVhbChsZWZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wb3NpdGlvbi1yaWdodC5yZXZlYWwtZm9yLSN7JG5hbWV9IHtcbiAgICAgICAgICBAaW5jbHVkZSBvZmYtY2FudmFzLXJldmVhbChyaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIG9yYml0XG4vLy8vXG5cbi8vLyBEZWZhdWx0IGNvbG9yIGZvciBPcmJpdCdzIGJ1bGxldHMuXG4vLy8gQHR5cGUgQ29sb3JcbiRvcmJpdC1idWxsZXQtYmFja2dyb3VuZDogJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBhY3RpdmUgY29sb3IgZm9yIE9yYml0J3MgYnVsbGV0cy5cbi8vLyBAdHlwZSBDb2xvclxuJG9yYml0LWJ1bGxldC1iYWNrZ3JvdW5kLWFjdGl2ZTogJGRhcmstZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZGlhbWV0ZXIgZm9yIE9yYml0J3MgYnVsbGV0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRvcmJpdC1idWxsZXQtZGlhbWV0ZXI6IDEuMnJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgbWFyZ2luIGJldHdlZW4gT3JiaXQncyBidWxsZXRzLlxuLy8vIEB0eXBlIE51bWJlclxuJG9yYml0LWJ1bGxldC1tYXJnaW46IDAuMXJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZGlzdGFuY2UgZnJvbSBzbGlkZSByZWdpb24gZm9yIE9yYml0J3MgYnVsbGV0cy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRvcmJpdC1idWxsZXQtbWFyZ2luLXRvcDogMC44cmVtICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBib3R0b20gbWFyZ2luIGZyb20gT3JiaXQncyBidWxsZXRzIHRvIHdoYXRldmVyIGNvbnRlbnQgbWF5IGx1cmsgYmVsb3cgaXQuXG4vLy8gQHR5cGUgTnVtYmVyXG4kb3JiaXQtYnVsbGV0LW1hcmdpbi1ib3R0b206IDAuOHJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBmb3IgT3JiaXQncyBjYXB0aW9uLlxuLy8vIEB0eXBlIENvbG9yXG4kb3JiaXQtY2FwdGlvbi1iYWNrZ3JvdW5kOiByZ2JhKCRibGFjaywgMC41KSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcGFkZGluZyBmb3IgT3JiaXQncyBjYXB0aW9uLlxuLy8vIEB0eXBlIE51bWJlclxuJG9yYml0LWNhcHRpb24tcGFkZGluZzogMXJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBmb3IgT3JiaXQncyBjb250cm9scyB3aGVuIGhvdmVyZWQuXG4vLy8gQHR5cGUgQ29sb3JcbiRvcmJpdC1jb250cm9sLWJhY2tncm91bmQtaG92ZXI6IHJnYmEoJGJsYWNrLCAwLjUpICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBwYWRkaW5nIGZvciBPcmJpdCdzIGNvbnRyb2xzLlxuLy8vIEB0eXBlIE51bWJlclxuJG9yYml0LWNvbnRyb2wtcGFkZGluZzogMXJlbSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgei1pbmRleCBmb3IgT3JiaXQncyBjb250cm9scy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRvcmJpdC1jb250cm9sLXppbmRleDogMTAgIWRlZmF1bHQ7XG5cbi8vLyBBZGRzIHN0eWxlcyBmb3IgdGhlIG91dGVyIE9yYml0IHdyYXBwZXIuIFRoZXNlIHN0eWxlcyBhcmUgdXNlZCBvbiB0aGUgYC5vcmJpdGAgY2xhc3MuXG5AbWl4aW4gb3JiaXQtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciB0aGUgaW5uZXIgT3JiaXQgc2xpZGUgY29udGFpbmVyLiBUaGVzZSBzdHlsZXMgYXJlIHVzZWQgb24gdGhlIGAub3JiaXQtY29udGFpbmVyYCBjbGFzcy5cbkBtaXhpbiBvcmJpdC1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciB0aGUgaW5kaXZpZHVhbCBzbGlkZXMgb2YgYW4gT3JiaXQgc2xpZGVyLiBUaGVzZSBzdHlsZXMgYXJlIHVzZWQgb24gdGhlIGAub3JiaXQtc2xpZGVgIGNsYXNzLlxuQG1peGluIG9yYml0LXNsaWRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIFxuICAmLm5vLW1vdGlvbnVpIHtcbiAgICAmLmlzLWFjdGl2ZSB7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gb3JiaXQtZmlndXJlIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5AbWl4aW4gb3JiaXQtaW1hZ2Uge1xuICBtYXJnaW46IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi8vLyBBZGRzIHN0eWxlcyBmb3IgYW4gb3JiaXQgc2xpZGUgY2FwdGlvbi4gVGhlc2Ugc3R5bGVzIGFyZSB1c2VkIG9uIHRoZSBgLm9yYml0LWNhcHRpb25gIGNsYXNzLlxuQG1peGluIG9yYml0LWNhcHRpb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6ICRvcmJpdC1jYXB0aW9uLXBhZGRpbmc7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGNvbG9yOiBmb3JlZ3JvdW5kKCRvcmJpdC1jYXB0aW9uLWJhY2tncm91bmQpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkb3JiaXQtY2FwdGlvbi1iYWNrZ3JvdW5kO1xufVxuXG4vLy8gQWRkcyBiYXNlIHN0eWxlcyBmb3IgdGhlIG5leHQvcHJldmlvdXMgYnV0dG9ucyBpbiBhbiBPcmJpdCBzbGlkZXIuIFRoZXNlIHN0eWxlcyBhcmUgc2hhcmVkIGJldHdlZW4gdGhlIGAub3JiaXQtbmV4dGAgYW5kIGAub3JiaXQtcHJldmlvdXNgIGNsYXNzZXMgaW4gdGhlIGRlZmF1bHQgQ1NTLlxuQG1peGluIG9yYml0LWNvbnRyb2wge1xuICBAaW5jbHVkZSBkaXNhYmxlLW1vdXNlLW91dGxpbmU7XG4gIEBpbmNsdWRlIHZlcnRpY2FsLWNlbnRlcjtcbiAgei1pbmRleDogJG9yYml0LWNvbnRyb2wtemluZGV4O1xuICBwYWRkaW5nOiAkb3JiaXQtY29udHJvbC1wYWRkaW5nO1xuICBjb2xvcjogJHdoaXRlO1xuXG4gICY6aG92ZXIsXG4gICY6YWN0aXZlLFxuICAmOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkb3JiaXQtY29udHJvbC1iYWNrZ3JvdW5kLWhvdmVyO1xuICB9XG59XG5cbi8vLyBBZGRzIHN0eWxlcyBmb3IgdGhlIE9yYml0IHByZXZpb3VzIGJ1dHRvbi4gVGhlc2Ugc3R5bGVzIGFyZSB1c2VkIG9uIHRoZSBgLm9yYml0LXByZXZpb3VzYCBjbGFzcy5cbkBtaXhpbiBvcmJpdC1wcmV2aW91cyB7XG4gICN7JGdsb2JhbC1sZWZ0fTogMDtcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciB0aGUgT3JiaXQgbmV4dCBidXR0b24uIFRoZXNlIHN0eWxlcyBhcmUgdXNlZCBvbiB0aGUgYC5vcmJpdC1uZXh0YCBjbGFzcy5cbkBtaXhpbiBvcmJpdC1uZXh0IHtcbiAgI3skZ2xvYmFsLWxlZnR9OiBhdXRvO1xuICAjeyRnbG9iYWwtcmlnaHR9OiAwO1xufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgY29udGFpbmVyIG9mIE9yYml0IGJ1bGxldHMuIC8vLyBBZGRzIHN0eWxlcyBmb3IgdGhlIE9yYml0IHByZXZpb3VzIGJ1dHRvbi4gVGhlc2Ugc3R5bGVzIGFyZSB1c2VkIG9uIHRoZSBgLm9yYml0LWJ1bGxldHNgIGNsYXNzLlxuQG1peGluIG9yYml0LWJ1bGxldHMge1xuICBAaW5jbHVkZSBkaXNhYmxlLW1vdXNlLW91dGxpbmU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXRvcDogJG9yYml0LWJ1bGxldC1tYXJnaW4tdG9wO1xuICBtYXJnaW4tYm90dG9tOiAkb3JiaXQtYnVsbGV0LW1hcmdpbi1ib3R0b207XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBidXR0b24ge1xuICAgIHdpZHRoOiAkb3JiaXQtYnVsbGV0LWRpYW1ldGVyO1xuICAgIGhlaWdodDogJG9yYml0LWJ1bGxldC1kaWFtZXRlcjtcbiAgICBtYXJnaW46ICRvcmJpdC1idWxsZXQtbWFyZ2luO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRvcmJpdC1idWxsZXQtYmFja2dyb3VuZDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRvcmJpdC1idWxsZXQtYmFja2dyb3VuZC1hY3RpdmU7XG4gICAgfVxuXG4gICAgJi5pcy1hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG9yYml0LWJ1bGxldC1iYWNrZ3JvdW5kLWFjdGl2ZTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tb3JiaXQge1xuICAub3JiaXQge1xuICAgIEBpbmNsdWRlIG9yYml0LXdyYXBwZXI7XG4gIH1cblxuICAub3JiaXQtY29udGFpbmVyIHtcbiAgICBAaW5jbHVkZSBvcmJpdC1jb250YWluZXI7XG4gIH1cblxuICAub3JiaXQtc2xpZGUge1xuICAgIEBpbmNsdWRlIG9yYml0LXNsaWRlO1xuICB9XG5cbiAgLm9yYml0LWZpZ3VyZSB7XG4gICAgQGluY2x1ZGUgb3JiaXQtZmlndXJlO1xuICB9XG5cbiAgLm9yYml0LWltYWdlIHtcbiAgICBAaW5jbHVkZSBvcmJpdC1pbWFnZTtcbiAgfVxuXG4gIC5vcmJpdC1jYXB0aW9uIHtcbiAgICBAaW5jbHVkZSBvcmJpdC1jYXB0aW9uO1xuICB9XG5cbiAgJW9yYml0LWNvbnRyb2wge1xuICAgIEBpbmNsdWRlIG9yYml0LWNvbnRyb2w7XG4gIH1cblxuICAub3JiaXQtcHJldmlvdXMge1xuICAgIEBleHRlbmQgJW9yYml0LWNvbnRyb2w7XG4gICAgQGluY2x1ZGUgb3JiaXQtcHJldmlvdXM7XG4gIH1cblxuICAub3JiaXQtbmV4dCB7XG4gICAgQGV4dGVuZCAlb3JiaXQtY29udHJvbDtcbiAgICBAaW5jbHVkZSBvcmJpdC1uZXh0O1xuICB9XG5cbiAgLm9yYml0LWJ1bGxldHMge1xuICAgIEBpbmNsdWRlIG9yYml0LWJ1bGxldHM7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIHBhZ2luYXRpb25cbi8vLy9cblxuLy8vIEZvbnQgc2l6ZSBvZiBwYWdpbmF0aW9uIGl0ZW1zLlxuLy8vIEB0eXBlIE51bWJlclxuJHBhZ2luYXRpb24tZm9udC1zaXplOiByZW0tY2FsYygxNCkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGJvdHRvbSBtYXJnaW4gb2YgdGhlIG1lZGlhIG9iamVjdC5cbi8vLyBAdHlwZSBOdW1iZXJcbiRwYWdpbmF0aW9uLW1hcmdpbi1ib3R0b206ICRnbG9iYWwtbWFyZ2luICFkZWZhdWx0O1xuXG4vLy8gVGV4dCBjb2xvciBvZiBwYWdpbmF0aW9uIGl0ZW1zLlxuLy8vIEB0eXBlIENvbG9yXG4kcGFnaW5hdGlvbi1pdGVtLWNvbG9yOiAkYmxhY2sgIWRlZmF1bHQ7XG5cbi8vLyBQYWRkaW5nIGluc2lkZSBvZiBwYWdpbmF0aW9uIGl0ZW1zLlxuLy8vIEB0eXBlIE51bWJlclxuJHBhZ2luYXRpb24taXRlbS1wYWRkaW5nOiByZW0tY2FsYygzIDEwKSAhZGVmYXVsdDtcblxuLy8vIFJpZ2h0IG1hcmdpbiB0byBzZXBhcmF0ZSBwYWdpbmF0aW9uIGl0ZW1zLlxuLy8vIEB0eXBlIE51bWJlclxuJHBhZ2luYXRpb24taXRlbS1zcGFjaW5nOiByZW0tY2FsYygxKSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcmFkaXVzIGZvciBwYWdpbmF0aW9uIGl0ZW1zLlxuLy8vIEB0eXBlIE51bWJlclxuJHBhZ2luYXRpb24tcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cyAhZGVmYXVsdDtcblxuLy8vIEJhY2tncm91bmQgY29sb3Igb2YgcGFnaW5hdGlvbiBpdGVtcyBvbiBob3Zlci5cbi8vLyBAdHlwZSBDb2xvclxuJHBhZ2luYXRpb24taXRlbS1iYWNrZ3JvdW5kLWhvdmVyOiAkbGlnaHQtZ3JheSAhZGVmYXVsdDtcblxuLy8vIEJhY2tncm91bmQgY29sb3Igb2YgcGFnaW5hdGlvbiBpdGVtIGZvciB0aGUgY3VycmVudCBwYWdlLlxuLy8vIEB0eXBlIENvbG9yXG4kcGFnaW5hdGlvbi1pdGVtLWJhY2tncm91bmQtY3VycmVudDogJHByaW1hcnktY29sb3IgIWRlZmF1bHQ7XG5cbi8vLyBUZXh0IGNvbG9yIG9mIHRoZSBwYWdpbmF0aW9uIGl0ZW0gZm9yIHRoZSBjdXJyZW50IHBhZ2UuXG4vLy8gQHR5cGUgQ29sb3JcbiRwYWdpbmF0aW9uLWl0ZW0tY29sb3ItY3VycmVudDogZm9yZWdyb3VuZCgkcGFnaW5hdGlvbi1pdGVtLWJhY2tncm91bmQtY3VycmVudCkgIWRlZmF1bHQ7XG5cbi8vLyBUZXh0IGNvbG9yIG9mIGEgZGlzYWJsZWQgcGFnaW5hdGlvbiBpdGVtLlxuLy8vIEB0eXBlIENvbG9yXG4kcGFnaW5hdGlvbi1pdGVtLWNvbG9yLWRpc2FibGVkOiAkbWVkaXVtLWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciBvZiB0aGUgZWxsaXBzaXMgaW4gYSBwYWdpbmF0aW9uIG1lbnUuXG4vLy8gQHR5cGUgQ29sb3JcbiRwYWdpbmF0aW9uLWVsbGlwc2lzLWNvbG9yOiAkYmxhY2sgIWRlZmF1bHQ7XG5cbi8vLyBJZiBgZmFsc2VgLCBkb24ndCBkaXNwbGF5IHBhZ2UgbnVtYmVyIGxpbmtzIG9uIG1vYmlsZSwgb25seSBuZXh0L3ByZXZpb3VzIGxpbmtzLlxuLy8vIEB0eXBlIEJvb2xlYW5cbiRwYWdpbmF0aW9uLW1vYmlsZS1pdGVtczogZmFsc2UgIWRlZmF1bHQ7XG5cbi8vLyBJZiBgdHJ1ZWAsIGFycm93cyBhcmUgYWRkZWQgdG8gdGhlIG5leHQgYW5kIHByZXZpb3VzIGxpbmtzIG9mIHBhZ2luYXRpb24uXG4vLy8gQHR5cGUgQm9vbGVhblxuJHBhZ2luYXRpb24tYXJyb3dzOiB0cnVlICFkZWZhdWx0O1xuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgcGFnaW5hdGlvbiBjb250YWluZXIuIEFwcGx5IHRoaXMgdG8gYSBgPHVsPmAuXG5AbWl4aW4gcGFnaW5hdGlvbi1jb250YWluZXIge1xuICBAaW5jbHVkZSBjbGVhcmZpeDtcbiAgbWFyZ2luLSN7JGdsb2JhbC1sZWZ0fTogMDtcbiAgbWFyZ2luLWJvdHRvbTogJHBhZ2luYXRpb24tbWFyZ2luLWJvdHRvbTtcblxuICAvLyBMaXN0IGl0ZW1cbiAgbGkge1xuICAgIGZvbnQtc2l6ZTogJHBhZ2luYXRpb24tZm9udC1zaXplO1xuICAgIG1hcmdpbi0jeyRnbG9iYWwtcmlnaHR9OiAkcGFnaW5hdGlvbi1pdGVtLXNwYWNpbmc7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAkcGFnaW5hdGlvbi1yYWRpdXM7XG5cbiAgICBAaWYgbm90ICRwYWdpbmF0aW9uLW1vYmlsZS1pdGVtcyB7XG4gICAgICAmOmxhc3QtY2hpbGQsXG4gICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuXG4gICAgICBAaW5jbHVkZSBicmVha3BvaW50KG1lZGl1bSkge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUGFnZSBsaW5rc1xuICBhLFxuICBidXR0b24ge1xuICAgIGNvbG9yOiAkcGFnaW5hdGlvbi1pdGVtLWNvbG9yO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmc6ICRwYWdpbmF0aW9uLWl0ZW0tcGFkZGluZztcbiAgICBib3JkZXItcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cztcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHBhZ2luYXRpb24taXRlbS1iYWNrZ3JvdW5kLWhvdmVyO1xuICAgIH1cbiAgfVxufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIHRoZSBjdXJyZW50IHBhZ2luYXRpb24gaXRlbS4gQXBwbHkgdGhpcyB0byBhbiBgPGE+YC5cbkBtaXhpbiBwYWdpbmF0aW9uLWl0ZW0tY3VycmVudCB7XG4gIHBhZGRpbmc6ICRwYWdpbmF0aW9uLWl0ZW0tcGFkZGluZztcbiAgYmFja2dyb3VuZDogJHBhZ2luYXRpb24taXRlbS1iYWNrZ3JvdW5kLWN1cnJlbnQ7XG4gIGNvbG9yOiAkcGFnaW5hdGlvbi1pdGVtLWNvbG9yLWN1cnJlbnQ7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIGRpc2FibGVkIHBhZ2luYXRpb24gaXRlbS4gQXBwbHkgdGhpcyB0byBhbiBgPGE+YC5cbkBtaXhpbiBwYWdpbmF0aW9uLWl0ZW0tZGlzYWJsZWQge1xuICBwYWRkaW5nOiAkcGFnaW5hdGlvbi1pdGVtLXBhZGRpbmc7XG4gIGNvbG9yOiAkcGFnaW5hdGlvbi1pdGVtLWNvbG9yLWRpc2FibGVkO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIH1cbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhbiBlbGxpcHNpcyBmb3IgdXNlIGluIGEgcGFnaW5hdGlvbiBsaXN0LlxuQG1peGluIHBhZ2luYXRpb24tZWxsaXBzaXMge1xuICBjb250ZW50OiAn4oCmJztcbiAgcGFkZGluZzogJHBhZ2luYXRpb24taXRlbS1wYWRkaW5nO1xuICBjb2xvcjogJHBhZ2luYXRpb24tZWxsaXBzaXMtY29sb3I7XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLXBhZ2luYXRpb24ge1xuICAucGFnaW5hdGlvbiB7XG4gICAgQGluY2x1ZGUgcGFnaW5hdGlvbi1jb250YWluZXI7XG5cbiAgICAuY3VycmVudCB7XG4gICAgICBAaW5jbHVkZSBwYWdpbmF0aW9uLWl0ZW0tY3VycmVudDtcbiAgICB9XG5cbiAgICAuZGlzYWJsZWQge1xuICAgICAgQGluY2x1ZGUgcGFnaW5hdGlvbi1pdGVtLWRpc2FibGVkO1xuICAgIH1cblxuICAgIC5lbGxpcHNpczo6YWZ0ZXIge1xuICAgICAgQGluY2x1ZGUgcGFnaW5hdGlvbi1lbGxpcHNpcztcbiAgICB9XG4gIH1cblxuICBAaWYgJHBhZ2luYXRpb24tYXJyb3dzIHtcbiAgICAucGFnaW5hdGlvbi1wcmV2aW91cyBhOjpiZWZvcmUsXG4gICAgLnBhZ2luYXRpb24tcHJldmlvdXMuZGlzYWJsZWQ6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnwqsnO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgbWFyZ2luLSN7JGdsb2JhbC1yaWdodH06IDAuNXJlbTtcbiAgICB9XG5cbiAgICAucGFnaW5hdGlvbi1uZXh0IGE6OmFmdGVyLFxuICAgIC5wYWdpbmF0aW9uLW5leHQuZGlzYWJsZWQ6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICfCuyc7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBtYXJnaW4tI3skZ2xvYmFsLWxlZnR9OiAwLjVyZW07XG4gICAgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCBwcm9ncmVzcy1iYXJcbi8vLy9cblxuLy8vIEhlaWdodCBvZiBhIHByb2dyZXNzIGJhci5cbi8vLyBAdHlwZSBOdW1iZXJcbiRwcm9ncmVzcy1oZWlnaHQ6IDFyZW0gIWRlZmF1bHQ7XG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIGEgcHJvZ3Jlc3MgYmFyLlxuLy8vIEB0eXBlIENvbG9yXG4kcHJvZ3Jlc3MtYmFja2dyb3VuZDogJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gQm90dG9tIG1hcmdpbiBvZiBhIHByb2dyZXNzIGJhci5cbi8vLyBAdHlwZSBOdW1iZXJcbiRwcm9ncmVzcy1tYXJnaW4tYm90dG9tOiAkZ2xvYmFsLW1hcmdpbiAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgY29sb3Igb2YgYSBwcm9ncmVzcyBiYXIncyBtZXRlci5cbi8vLyBAdHlwZSBDb2xvclxuJHByb2dyZXNzLW1ldGVyLWJhY2tncm91bmQ6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCByYWRpdXMgb2YgYSBwcm9ncmVzcyBiYXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kcHJvZ3Jlc3MtcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cyAhZGVmYXVsdDtcblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIHByb2dyZXNzIGJhciBjb250YWluZXIuXG5AbWl4aW4gcHJvZ3Jlc3MtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHByb2dyZXNzLWJhY2tncm91bmQ7XG4gIGhlaWdodDogJHByb2dyZXNzLWhlaWdodDtcbiAgbWFyZ2luLWJvdHRvbTogJHByb2dyZXNzLW1hcmdpbi1ib3R0b207XG4gIGJvcmRlci1yYWRpdXM6ICRwcm9ncmVzcy1yYWRpdXM7XG59XG5cbi8vLyBBZGRzIHN0eWxlcyBmb3IgdGhlIGlubmVyIG1ldGVyIG9mIGEgcHJvZ3Jlc3MgYmFyLlxuQG1peGluIHByb2dyZXNzLW1ldGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICRwcm9ncmVzcy1tZXRlci1iYWNrZ3JvdW5kO1xuICBib3JkZXItcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cztcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciB0ZXh0IGluIHRoZSBwcm9ncmVzcyBtZXRlci5cbkBtaXhpbiBwcm9ncmVzcy1tZXRlci10ZXh0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgI3skZ2xvYmFsLWxlZnR9OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAkd2hpdGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLXByb2dyZXNzLWJhciB7XG4gIC8vIFByb2dyZXNzIGJhclxuICAucHJvZ3Jlc3Mge1xuICAgIEBpbmNsdWRlIHByb2dyZXNzLWNvbnRhaW5lcjtcblxuICAgIEBlYWNoICRuYW1lLCAkY29sb3IgaW4gJGZvdW5kYXRpb24tY29sb3JzIHtcbiAgICAgICYuI3skbmFtZX0ge1xuICAgICAgICAucHJvZ3Jlc3MtbWV0ZXIge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFByb2dyZXNzIGJhciBtZXRlclxuICAucHJvZ3Jlc3MtbWV0ZXIge1xuICAgIEBpbmNsdWRlIHByb2dyZXNzLW1ldGVyO1xuXG4gICAgLy8gUHJvZ3Jlc3MgYmFyIG1ldGVyIHRleHRcbiAgICAucHJvZ3Jlc3MtbWV0ZXItdGV4dCB7XG4gICAgICBAaW5jbHVkZSBwcm9ncmVzcy1tZXRlci10ZXh0O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgcmV2ZWFsXG4vLy8vXG5cbi8vLyBEZWZhdWx0IGJhY2tncm91bmQgY29sb3Igb2YgYSBtb2RhbC5cbi8vLyBAdHlwZSBDb2xvclxuJHJldmVhbC1iYWNrZ3JvdW5kOiAkd2hpdGUgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHdpZHRoIG9mIGEgbW9kYWwsIHdpdGggbm8gY2xhc3MgYXBwbGllZC5cbi8vLyBAdHlwZSBOdW1iZXJcbiRyZXZlYWwtd2lkdGg6IDYwMHB4ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBtYXhpbXVtIHdpZHRoIG9mIGEgbW9kYWwuXG4vLy8gQHR5cGUgTnVtYmVyXG4kcmV2ZWFsLW1heC13aWR0aDogJGdsb2JhbC13aWR0aCAhZGVmYXVsdDtcblxuLy8vIE9mZnNldCBmcm9tIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyB3aGVuIGEgbW9kYWwgaXMgYWRkZWQuXG4vLy8gQHR5cGUgTnVtYmVyXG4kcmV2ZWFsLW9mZnNldDogcmVtLWNhbGMoMTAwKSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcGFkZGluZyBpbnNpZGUgYSBtb2RhbC5cbi8vLyBAdHlwZSBOdW1iZXJcbiRyZXZlYWwtcGFkZGluZzogJGdsb2JhbC1wYWRkaW5nICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBib3JkZXIgYXJvdW5kIGEgbW9kYWwuXG4vLy8gQHR5cGUgTnVtYmVyXG4kcmV2ZWFsLWJvcmRlcjogMXB4IHNvbGlkICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcmFkaXVzIGZvciBtb2RhbC5cbi8vLyBAdHlwZSBOdW1iZXJcbiRyZXZlYWwtcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cyAhZGVmYXVsdDtcblxuLy8vIHotaW5kZXggZm9yIG1vZGFscy4gVGhlIG92ZXJsYXkgdXNlcyB0aGlzIHZhbHVlLCB3aGlsZSB0aGUgbW9kYWwgaXRzZWxmIHVzZXMgdGhpcyB2YWx1ZSBwbHVzIG9uZS5cbi8vLyBAdHlwZSBOdW1iZXJcbiRyZXZlYWwtemluZGV4OiAxMDA1ICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBvZiBtb2RhbCBvdmVybGF5cy5cbi8vLyBAdHlwZSBDb2xvclxuJHJldmVhbC1vdmVybGF5LWJhY2tncm91bmQ6IHJnYmEoJGJsYWNrLCAwLjQ1KSAhZGVmYXVsdDtcblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIG1vZGFsIG92ZXJsYXkuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGJhY2tncm91bmQgWyRyZXZlYWwtb3ZlcmxheS1iYWNrZ3JvdW5kXSAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG92ZXJsYXkuXG5AbWl4aW4gcmV2ZWFsLW92ZXJsYXkge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgei1pbmRleDogJHJldmVhbC16aW5kZXg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRyZXZlYWwtb3ZlcmxheS1iYWNrZ3JvdW5kO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi8vLyBBZGRzIGJhc2Ugc3R5bGVzIGZvciBhIG1vZGFsLlxuQG1peGluIHJldmVhbC1tb2RhbC1iYXNlIHtcbiAgQGluY2x1ZGUgZGlzYWJsZS1tb3VzZS1vdXRsaW5lO1xuICBkaXNwbGF5OiBub25lO1xuICB6LWluZGV4OiAkcmV2ZWFsLXppbmRleCArIDE7XG4gIHBhZGRpbmc6ICRyZXZlYWwtcGFkZGluZztcbiAgYm9yZGVyOiAkcmV2ZWFsLWJvcmRlcjtcbiAgbWFyZ2luOiAxMDBweCBhdXRvIDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICRyZXZlYWwtYmFja2dyb3VuZDtcbiAgYm9yZGVyLXJhZGl1czogJHJldmVhbC1yYWRpdXM7XG5cbiAgQGluY2x1ZGUgYnJlYWtwb2ludChtZWRpdW0pIHtcbiAgICBtaW4taGVpZ2h0OiAwO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHJvd3MgZG9uJ3QgaGF2ZSBhIG1pbi13aWR0aCBvbiB0aGVtXG4gIC5jb2x1bW4sXG4gIC5jb2x1bW5zIHtcbiAgICBtaW4td2lkdGg6IDA7XG4gIH1cblxuICAvLyBTdHJpcCBtYXJnaW5zIGZyb20gdGhlIGxhc3QgaXRlbSBpbiB0aGUgbW9kYWxcbiAgPiA6bGFzdC1jaGlsZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxufVxuXG4vLy8gQWRqdXN0cyB0aGUgd2lkdGggb2YgYSBtb2RhbC5cbi8vLyBAcGFyYW0ge051bWJlcn0gJHdpZHRoIC0gV2lkdGggb2YgdGhlIG1vZGFsLiBHZW5lcmFsbHkgYSBwZXJjZW50YWdlLlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkbWF4LXdpZHRoIFskcmV2ZWFsLW1heC13aWR0aF0gLSBNYXhpbXVtIHdpZHRoIG9mIHRoZSBtb2RhbC5cbkBtaXhpbiByZXZlYWwtbW9kYWwtd2lkdGgoXG4gICR3aWR0aDogJHJldmVhbC13aWR0aCxcbiAgJG1heC13aWR0aDogJHJldmVhbC1tYXgtd2lkdGhcbikge1xuICBAaW5jbHVkZSBicmVha3BvaW50KG1lZGl1bSkge1xuICAgIEBleHRlbmQgJXJldmVhbC1jZW50ZXJlZDtcbiAgICB3aWR0aDogJHdpZHRoO1xuICAgIG1heC13aWR0aDogJHJldmVhbC1tYXgtd2lkdGg7XG4gIH1cbn1cblxuLy8vIENyZWF0ZXMgYSBmdWxsLXNjcmVlbiBtb2RhbCwgd2hpY2ggc3RyZXRjaGVzIHRoZSBmdWxsIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHdpbmRvdy5cbkBtaXhpbiByZXZlYWwtbW9kYWwtZnVsbHNjcmVlbiB7XG4gIC8vIHNjc3MtbGludDpkaXNhYmxlIER1cGxpY2F0ZVByb3BlcnR5XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIG1heC13aWR0aDogbm9uZTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIGJvcmRlcjogMDtcbn1cblxuQG1peGluIGZvdW5kYXRpb24tcmV2ZWFsIHtcbiAgYm9keS5pcy1yZXZlYWwtb3BlbiB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC8vIE92ZXJsYXlcbiAgLnJldmVhbC1vdmVybGF5IHtcbiAgICBAaW5jbHVkZSByZXZlYWwtb3ZlcmxheTtcbiAgfVxuXG4gIC8vIE1vZGFsIGNvbnRhaW5lclxuICAucmV2ZWFsIHtcbiAgICBAaW5jbHVkZSByZXZlYWwtbW9kYWwtYmFzZTtcbiAgICBAaW5jbHVkZSByZXZlYWwtbW9kYWwtd2lkdGgoJHJldmVhbC13aWR0aCk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgICAvLyBSZW1vdmUgcGFkZGluZ1xuICAgICYuY29sbGFwc2Uge1xuICAgICAgcGFkZGluZzogMDtcbiAgICB9XG5cbiAgICAvLyBQbGFjZWhvbGRlciBzZWxlY3RvciBmb3IgbWVkaXVtLWFuZC11cCBtb2RhbHNcbiAgICAvLyBQcmV2ZW50cyBkdXBsaWNhdGUgQ1NTIHdoZW4gZGVmaW5pbmcgbXVsdGlwbGUgUmV2ZWFsIHNpemVzXG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludChtZWRpdW0pIHtcbiAgICAgICVyZXZlYWwtY2VudGVyZWQge1xuICAgICAgICBsZWZ0OiBhdXRvO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2l6aW5nIGNsYXNzZXNcbiAgICAmLnRpbnkgIHsgQGluY2x1ZGUgcmV2ZWFsLW1vZGFsLXdpZHRoKDMwJSk7IH1cbiAgICAmLnNtYWxsIHsgQGluY2x1ZGUgcmV2ZWFsLW1vZGFsLXdpZHRoKDUwJSk7IH1cbiAgICAmLmxhcmdlIHsgQGluY2x1ZGUgcmV2ZWFsLW1vZGFsLXdpZHRoKDkwJSk7IH1cblxuICAgIC8vIEZ1bGwtc2NyZWVuIG1vZGVcbiAgICAmLmZ1bGwge1xuICAgICAgQGluY2x1ZGUgcmV2ZWFsLW1vZGFsLWZ1bGxzY3JlZW47XG4gICAgfVxuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8gW1RPRE9dIENoZWNrIGhvdyBwbHVnaW4gY29uZmlybXMgZGlzYWJsZWQgb3IgdmVydGljYWwgc3RhdHVzXG4vLyBbVE9ET10gQ2hlY2sgaWYgdHJhbnNpdGlvbjogYWxsOyBpcyBuZWNlc3NhcnlcblxuLy8vL1xuLy8vIEBncm91cCBzbGlkZXJcbi8vLy9cblxuLy8vIERlZmF1bHQgaGVpZ2h0IG9mIHRoZSBzbGlkZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kc2xpZGVyLWhlaWdodDogMC41cmVtICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBzbGlkZXIgd2lkdGggb2YgYSB2ZXJ0aWNhbCBzbGlkZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kc2xpZGVyLXdpZHRoLXZlcnRpY2FsOiAkc2xpZGVyLWhlaWdodCAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgc2xpZGVyJ3MgdHJhY2suXG4vLy8gQHR5cGUgQ29sb3JcbiRzbGlkZXItYmFja2dyb3VuZDogJGxpZ2h0LWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGNvbG9yIG9mIHRoZSBhY3RpdmUgZmlsbCBjb2xvciBvZiB0aGUgc2xpZGVyLlxuLy8vIEB0eXBlIENvbG9yXG4kc2xpZGVyLWZpbGwtYmFja2dyb3VuZDogJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBoZWlnaHQgb2YgdGhlIGhhbmRsZSBvZiB0aGUgc2xpZGVyLlxuLy8vIEB0eXBlIE51bWJlclxuJHNsaWRlci1oYW5kbGUtaGVpZ2h0OiAxLjRyZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHdpZHRoIG9mIHRoZSBoYW5kbGUgb2YgdGhlIHNsaWRlci5cbi8vLyBAdHlwZSBOdW1iZXJcbiRzbGlkZXItaGFuZGxlLXdpZHRoOiAxLjRyZW0gIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGNvbG9yIG9mIHRoZSBoYW5kbGUgZm9yIHRoZSBzbGlkZXIuXG4vLy8gQHR5cGUgQ29sb3JcbiRzbGlkZXItaGFuZGxlLWJhY2tncm91bmQ6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBmYWRlIGFtb3VudCBvZiBhIGRpc2FibGVkIHNsaWRlci5cbi8vLyBAdHlwZSBOdW1iZXJcbiRzbGlkZXItb3BhY2l0eS1kaXNhYmxlZDogMC4yNSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcmFkaXVzIGZvciBzbGlkZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kc2xpZGVyLXJhZGl1czogJGdsb2JhbC1yYWRpdXMgIWRlZmF1bHQ7XG5cbi8vLyBUcmFuc2l0aW9uIHByb3BlcnRpZXMgdG8gYXBwbHkgdG8gdGhlIHNsaWRlciBoYW5kbGUgYW5kIGZpbGwuXG4vLy8gQHR5cGUgVHJhbnNpdGlvblxuJHNsaWRlci10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dCAhZGVmYXVsdDtcblxuLy8vIEFkZHMgdGhlIGdlbmVyYWwgc3R5bGVzIGZvciBzbGlkZXJzLlxuQG1peGluIHNsaWRlci1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogJHNsaWRlci1oZWlnaHQ7XG4gIG1hcmdpbi10b3A6IDEuMjVyZW07XG4gIG1hcmdpbi1ib3R0b206IDIuMjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICRzbGlkZXItYmFja2dyb3VuZDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgdG91Y2gtYWN0aW9uOiBub25lO1xufVxuXG4vLy8gQWRkcyB0aGUgZ2VuZXJhbCBzdHlsZXMgZm9yIGFjdGl2ZSBmaWxsIGZvciBzbGlkZXJzLlxuQG1peGluIHNsaWRlci1maWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6ICRzbGlkZXItaGVpZ2h0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2xpZGVyLWZpbGwtYmFja2dyb3VuZDtcbiAgdHJhbnNpdGlvbjogJHNsaWRlci10cmFuc2l0aW9uO1xuXG4gICYuaXMtZHJhZ2dpbmcge1xuICAgIHRyYW5zaXRpb246IGFsbCAwcyBsaW5lYXI7XG4gIH1cbn1cblxuLy8vIEFkZHMgdGhlIGdlbmVyYWwgc3R5bGVzIGZvciB0aGUgc2xpZGVyIGhhbmRsZXMuXG5AbWl4aW4gc2xpZGVyLWhhbmRsZSB7XG4gIEBpbmNsdWRlIGRpc2FibGUtbW91c2Utb3V0bGluZTtcbiAgQGluY2x1ZGUgdmVydGljYWwtY2VudGVyO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6ICRzbGlkZXItaGFuZGxlLXdpZHRoO1xuICBoZWlnaHQ6ICRzbGlkZXItaGFuZGxlLWhlaWdodDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNsaWRlci1oYW5kbGUtYmFja2dyb3VuZDtcbiAgdHJhbnNpdGlvbjogJHNsaWRlci10cmFuc2l0aW9uO1xuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgYm9yZGVyLXJhZGl1czogJHNsaWRlci1yYWRpdXM7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogc2NhbGUtY29sb3IoJHNsaWRlci1oYW5kbGUtYmFja2dyb3VuZCwgJGxpZ2h0bmVzczogLTE1JSk7XG4gIH1cblxuICAmLmlzLWRyYWdnaW5nIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMHMgbGluZWFyO1xuICB9XG59XG5cbkBtaXhpbiBzbGlkZXItZGlzYWJsZWQge1xuICBvcGFjaXR5OiAkc2xpZGVyLW9wYWNpdHktZGlzYWJsZWQ7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbkBtaXhpbiBzbGlkZXItdmVydGljYWwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAkc2xpZGVyLXdpZHRoLXZlcnRpY2FsO1xuICBoZWlnaHQ6IDEyLjVyZW07XG4gIG1hcmdpbjogMCAxLjI1cmVtO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEsIC0xKTtcblxuICAuc2xpZGVyLWZpbGwge1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogJHNsaWRlci13aWR0aC12ZXJ0aWNhbDtcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgLnNsaWRlci1oYW5kbGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHdpZHRoOiAkc2xpZGVyLWhhbmRsZS1oZWlnaHQ7XG4gICAgaGVpZ2h0OiAkc2xpZGVyLWhhbmRsZS13aWR0aDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tc2xpZGVyIHtcbiAgLy8gQ29udGFpbmVyXG4gIC5zbGlkZXIge1xuICAgIEBpbmNsdWRlIHNsaWRlci1jb250YWluZXI7XG4gIH1cblxuICAvLyBGaWxsIGFyZWFcbiAgLnNsaWRlci1maWxsIHtcbiAgICBAaW5jbHVkZSBzbGlkZXItZmlsbDtcbiAgfVxuXG4gIC8vIERyYWdnYWJsZSBoYW5kbGVcbiAgLnNsaWRlci1oYW5kbGUge1xuICAgIEBpbmNsdWRlIHNsaWRlci1oYW5kbGU7XG4gIH1cblxuICAvLyBEaXNhYmxlZCBzdGF0ZVxuICAuc2xpZGVyLmRpc2FibGVkLFxuICAuc2xpZGVyW2Rpc2FibGVkXSB7XG4gICAgQGluY2x1ZGUgc2xpZGVyLWRpc2FibGVkO1xuICB9XG5cbiAgLy8gVmVydGljYWwgc2xpZGVyXG4gIC5zbGlkZXIudmVydGljYWwge1xuICAgIEBpbmNsdWRlIHNsaWRlci12ZXJ0aWNhbDtcbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbkBtaXhpbiBmb3VuZGF0aW9uLXN0aWNreSB7XG4gIC5zdGlja3ktY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAuc3RpY2t5IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICB9XG5cbiAgLnN0aWNreS5pcy1zdHVjayB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDU7XG5cbiAgICAmLmlzLWF0LXRvcCB7XG4gICAgICB0b3A6IDA7XG4gICAgfVxuXG4gICAgJi5pcy1hdC1ib3R0b20ge1xuICAgICAgYm90dG9tOiAwO1xuICAgIH1cbiAgfVxuXG4gIC5zdGlja3kuaXMtYW5jaG9yZWQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiBhdXRvO1xuICAgIHJpZ2h0OiBhdXRvO1xuXG4gICAgJi5pcy1hdC1ib3R0b20ge1xuICAgICAgYm90dG9tOiAwO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gRm91bmRhdGlvbiBmb3IgU2l0ZXMgYnkgWlVSQlxuLy8gZm91bmRhdGlvbi56dXJiLmNvbVxuLy8gTGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlXG5cbi8vLy9cbi8vLyBAZ3JvdXAgc3dpdGNoXG4vLy8vXG5cbi8vLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIGEgc3dpdGNoLlxuLy8vIEB0eXBlIENvbG9yXG4kc3dpdGNoLWJhY2tncm91bmQ6ICRtZWRpdW0tZ3JheSAhZGVmYXVsdDtcblxuLy8vIEJhY2tncm91bmQgYWN0aXZlIGNvbG9yIG9mIGEgc3dpdGNoLlxuLy8vIEB0eXBlIENvbG9yXG4kc3dpdGNoLWJhY2tncm91bmQtYWN0aXZlOiAkcHJpbWFyeS1jb2xvciAhZGVmYXVsdDtcblxuLy8vIEhlaWdodCBvZiBhIHN3aXRjaCwgd2l0aCBubyBjbGFzcyBhcHBsaWVkLlxuLy8vIEB0eXBlIE51bWJlclxuJHN3aXRjaC1oZWlnaHQ6IDJyZW0gIWRlZmF1bHQ7XG5cbi8vLyBIZWlnaHQgb2YgYSBzd2l0Y2ggd2l0aCAudGlueSBjbGFzcy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRzd2l0Y2gtaGVpZ2h0LXRpbnk6IDEuNXJlbSAhZGVmYXVsdDtcblxuLy8vIEhlaWdodCBvZiBhIHN3aXRjaCB3aXRoIC5zbWFsbCBjbGFzcy5cbi8vLyBAdHlwZSBOdW1iZXJcbiRzd2l0Y2gtaGVpZ2h0LXNtYWxsOiAxLjc1cmVtICFkZWZhdWx0O1xuXG4vLy8gSGVpZ2h0IG9mIGEgc3dpdGNoIHdpdGggLmxhcmdlIGNsYXNzLlxuLy8vIEB0eXBlIE51bWJlclxuJHN3aXRjaC1oZWlnaHQtbGFyZ2U6IDIuNXJlbSAhZGVmYXVsdDtcblxuLy8vIEJvcmRlciByYWRpdXMgb2YgdGhlIHN3aXRjaFxuLy8vIEB0eXBlIE51bWJlclxuJHN3aXRjaC1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzICFkZWZhdWx0O1xuXG4vLy8gYm9yZGVyIGFyb3VuZCBhIG1vZGFsLlxuLy8vIEB0eXBlIE51bWJlclxuJHN3aXRjaC1tYXJnaW46ICRnbG9iYWwtbWFyZ2luICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHN3aXRjaCBjb250YWluZXIgYW5kIHBhZGRsZS5cbi8vLyBAdHlwZSBDb2xvclxuJHN3aXRjaC1wYWRkbGUtYmFja2dyb3VuZDogJHdoaXRlICFkZWZhdWx0O1xuXG4vLy8gU3BhY2luZyBiZXR3ZWVuIGEgc3dpdGNoIHBhZGRsZSBhbmQgdGhlIGVkZ2Ugb2YgdGhlIGJvZHkuXG4vLy8gQHR5cGUgTnVtYmVyXG4kc3dpdGNoLXBhZGRsZS1vZmZzZXQ6IDAuMjVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBib3JkZXIgcmFkaXVzIG9mIHRoZSBzd2l0Y2ggcGFkZGxlXG4vLy8gQHR5cGUgTnVtYmVyXG4kc3dpdGNoLXBhZGRsZS1yYWRpdXM6ICRnbG9iYWwtcmFkaXVzICFkZWZhdWx0O1xuXG4vLy8gc3dpdGNoIHRyYW5zaXRpb24uXG4vLy8gQHR5cGUgTnVtYmVyXG4kc3dpdGNoLXBhZGRsZS10cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZS1vdXQgIWRlZmF1bHQ7XG5cbi8vIG1ha2UgdGhlbSB2YXJpYWJsZXNcbi8vIGFzayBhYm91dCBhY2Nlc3NpYmlsaXR5IG9uIGxhYmVsXG4vLyBjaGFuZ2UgY2xhc3MgbmFtZSBmb3IgdGV4dFxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgc3dpdGNoIGNvbnRhaW5lci4gQXBwbHkgdGhpcyB0byBhIGNvbnRhaW5lciBjbGFzcy5cbkBtaXhpbiBzd2l0Y2gtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogJHN3aXRjaC1tYXJnaW47XG4gIG91dGxpbmU6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgLy8gVGhlc2UgcHJvcGVydGllcyBjYXNjYWRlIGRvd24gdG8gdGhlIHN3aXRjaCB0ZXh0XG4gIGNvbG9yOiAkd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IHJlbS1jYWxjKDE0KTtcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciBhIHN3aXRjaCBpbnB1dC4gQXBwbHkgdGhpcyB0byBhbiBgPGlucHV0PmAgd2l0aGluIGEgc3dpdGNoLlxuQG1peGluIHN3aXRjaC1pbnB1dCB7XG4gIG9wYWNpdHk6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciB0aGUgYmFja2dyb3VuZCBhbmQgcGFkZGxlIG9mIGEgc3dpdGNoLiBBcHBseSB0aGlzIHRvIGEgYDxsYWJlbD5gIHdpdGhpbiBhIHN3aXRjaC5cbkBtaXhpbiBzd2l0Y2gtcGFkZGxlIHtcbiAgYmFja2dyb3VuZDogJHN3aXRjaC1iYWNrZ3JvdW5kO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA0cmVtO1xuICBoZWlnaHQ6ICRzd2l0Y2gtaGVpZ2h0O1xuICB0cmFuc2l0aW9uOiAkc3dpdGNoLXBhZGRsZS10cmFuc2l0aW9uO1xuICBib3JkZXItcmFkaXVzOiAkc3dpdGNoLXJhZGl1cztcblxuICAvLyBSZXNldHRpbmcgdGhlc2UgPGxhYmVsPiBwcmVzZXRzIHNvIHR5cGUgc3R5bGVzIGNhc2NhZGUgZG93blxuICBjb2xvcjogaW5oZXJpdDtcbiAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XG5cbiAgLy8gTmVlZGVkIHRvIG92ZXJyaWRlIHNwZWNpZmljaXR5XG4gIGlucHV0ICsgJiB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgLy8gVGhlIHBhZGRsZSBpdHNlbGZcbiAgJjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6ICRzd2l0Y2gtcGFkZGxlLWJhY2tncm91bmQ7XG4gICAgY29udGVudDogJyc7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGhlaWdodDogMS41cmVtO1xuICAgICN7JGdsb2JhbC1sZWZ0fTogMC4yNXJlbTtcbiAgICB0b3A6IDAuMjVyZW07XG4gICAgd2lkdGg6IDEuNXJlbTtcbiAgICB0cmFuc2l0aW9uOiAkc3dpdGNoLXBhZGRsZS10cmFuc2l0aW9uO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgYm9yZGVyLXJhZGl1czogJHN3aXRjaC1wYWRkbGUtcmFkaXVzO1xuICB9XG5cbiAgLy8gQ2hhbmdlIHRoZSB2aXN1YWwgc3R5bGUgd2hlbiB0aGUgc3dpdGNoIGlzIGFjdGl2ZVxuICBpbnB1dDpjaGVja2VkIH4gJiB7XG4gICAgYmFja2dyb3VuZDogJHN3aXRjaC1iYWNrZ3JvdW5kLWFjdGl2ZTtcblxuICAgICY6OmFmdGVyIHtcbiAgICAgICN7JGdsb2JhbC1sZWZ0fTogMi4yNXJlbTtcbiAgICB9XG4gIH1cblxuICBpbnB1dDpmb2N1cyB+ICYge1xuICAgIEBpbmNsdWRlIGRpc2FibGUtbW91c2Utb3V0bGluZTtcbiAgfVxufVxuXG4vLy8gQWRkcyBiYXNlIHN0eWxlcyBmb3IgYWN0aXZlL2luYWN0aXZlIHRleHQgaW5zaWRlIGEgc3dpdGNoLiBBcHBseSB0aGlzIHRvIHRleHQgZWxlbWVudHMgaW5zaWRlIHRoZSBzd2l0Y2ggYDxsYWJlbD5gLlxuQG1peGluIHN3aXRjaC10ZXh0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIHRoZSBhY3RpdmUgc3RhdGUgdGV4dCB3aXRoaW4gYSBzd2l0Y2guXG5AbWl4aW4gc3dpdGNoLXRleHQtYWN0aXZlIHtcbiAgI3skZ2xvYmFsLWxlZnR9OiA4JTtcbiAgZGlzcGxheTogbm9uZTtcblxuICBpbnB1dDpjaGVja2VkICsgbGFiZWwgPiAmIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIHRoZSBpbmFjdGl2ZSBzdGF0ZSB0ZXh0IHdpdGhpbiBhIHN3aXRjaC5cbkBtaXhpbiBzd2l0Y2gtdGV4dC1pbmFjdGl2ZSB7XG4gICN7JGdsb2JhbC1yaWdodH06IDE1JTtcblxuICBpbnB1dDpjaGVja2VkICsgbGFiZWwgPiAmIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbi8vLyBDaGFuZ2VzIHRoZSBzaXplIG9mIGEgc3dpdGNoIGJ5IG1vZGlmeWluZyB0aGUgc2l6ZSBvZiB0aGUgYm9keSBhbmQgcGFkZGxlLiBBcHBseSB0aGlzIHRvIGEgc3dpdGNoIGNvbnRhaW5lci5cbi8vLyBAcGFyYW0ge051bWJlcn0gJGZvbnQtc2l6ZSBbMXJlbV0gLSBGb250IHNpemUgb2YgbGFiZWwgdGV4dCB3aXRoaW4gdGhlIHN3aXRjaC5cbi8vLyBAcGFyYW0ge051bWJlcn0gJHdpZHRoIFs0cmVtXSAtIFdpZHRoIG9mIHRoZSBzd2l0Y2ggYm9keS5cbi8vLyBAcGFyYW0ge051bWJlcn0gJGhlaWdodCBbMnJlbV0gLSBIZWlnaHQgb2YgdGhlIHN3aXRjaCBib2R5LlxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkcGFkZGxlLXdpZHRoIFsxLjVyZW1dIC0gV2lkdGggb2YgdGhlIHN3aXRjaCBwYWRkbGUuXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRwYWRkbGUtb2Zmc2V0IFswLjI1cmVtXSAtIFNwYWNpbmcgYmV0d2VlbiB0aGUgc3dpdGNoIHBhZGRsZSBhbmQgdGhlIGVkZ2Ugb2YgdGhlIHN3aXRjaCBib2R5LlxuQG1peGluIHN3aXRjaC1zaXplKFxuICAkZm9udC1zaXplOiAxcmVtLFxuICAkd2lkdGg6IDRyZW0sXG4gICRoZWlnaHQ6IDJyZW0sXG4gICRwYWRkbGUtd2lkdGg6IDEuNXJlbSxcbiAgJHBhZGRsZS1vZmZzZXQ6IDAuMjVyZW1cbikge1xuICAkcGFkZGxlLWhlaWdodDogJGhlaWdodCAtICgkcGFkZGxlLW9mZnNldCAqIDIpO1xuICAkcGFkZGxlLWxlZnQtYWN0aXZlOiAkd2lkdGggLSAkcGFkZGxlLXdpZHRoIC0gJHBhZGRsZS1vZmZzZXQ7XG5cbiAgLnN3aXRjaC1wYWRkbGUge1xuICAgIHdpZHRoOiAkd2lkdGg7XG4gICAgaGVpZ2h0OiAkaGVpZ2h0O1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcbiAgfVxuXG4gIC5zd2l0Y2gtcGFkZGxlOjphZnRlciB7XG4gICAgd2lkdGg6ICRwYWRkbGUtd2lkdGg7XG4gICAgaGVpZ2h0OiAkcGFkZGxlLWhlaWdodDtcbiAgfVxuXG4gIGlucHV0OmNoZWNrZWQgfiAuc3dpdGNoLXBhZGRsZTphZnRlciB7XG4gICAgI3skZ2xvYmFsLWxlZnR9OiAkcGFkZGxlLWxlZnQtYWN0aXZlO1xuICB9XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLXN3aXRjaCB7XG4gIC8vIENvbnRhaW5lciBjbGFzc1xuICAuc3dpdGNoIHtcbiAgICBAaW5jbHVkZSBzd2l0Y2gtY29udGFpbmVyO1xuICB9XG5cbiAgLy8gPGlucHV0PiBlbGVtZW50XG4gIC5zd2l0Y2gtaW5wdXQge1xuICAgIEBpbmNsdWRlIHN3aXRjaC1pbnB1dDtcbiAgfVxuXG4gIC8vIDxsYWJlbD4gZWxlbWVudFxuICAuc3dpdGNoLXBhZGRsZSB7XG4gICAgQGluY2x1ZGUgc3dpdGNoLXBhZGRsZTtcbiAgfVxuXG4gIC8vIEJhc2UgbGFiZWwgdGV4dCBzdHlsZXNcbiAgJXN3aXRjaC10ZXh0IHtcbiAgICBAaW5jbHVkZSBzd2l0Y2gtdGV4dDtcbiAgfVxuXG4gIC8vIEFjdGl2ZSBsYWJlbCB0ZXh0IHN0eWxlc1xuICAuc3dpdGNoLWFjdGl2ZSB7XG4gICAgQGV4dGVuZCAlc3dpdGNoLXRleHQ7XG4gICAgQGluY2x1ZGUgc3dpdGNoLXRleHQtYWN0aXZlO1xuICB9XG5cbiAgLy8gSW5hY3RpdmUgbGFiZWwgdGV4dCBzdHlsZXNcbiAgLnN3aXRjaC1pbmFjdGl2ZSB7XG4gICAgQGV4dGVuZCAlc3dpdGNoLXRleHQ7XG4gICAgQGluY2x1ZGUgc3dpdGNoLXRleHQtaW5hY3RpdmU7XG4gIH1cblxuICAvLyBTd2l0Y2ggc2l6ZXNcbiAgLnN3aXRjaC50aW55IHtcbiAgICBAaW5jbHVkZSBzd2l0Y2gtc2l6ZShyZW0tY2FsYygxMCksIDNyZW0sICRzd2l0Y2gtaGVpZ2h0LXRpbnksIDFyZW0sICRzd2l0Y2gtcGFkZGxlLW9mZnNldCk7XG4gIH1cblxuICAuc3dpdGNoLnNtYWxsIHtcbiAgICBAaW5jbHVkZSBzd2l0Y2gtc2l6ZShyZW0tY2FsYygxMiksIDMuNXJlbSwgJHN3aXRjaC1oZWlnaHQtc21hbGwsIDEuMjVyZW0sICRzd2l0Y2gtcGFkZGxlLW9mZnNldCk7XG4gIH1cblxuICAuc3dpdGNoLmxhcmdlIHtcbiAgICBAaW5jbHVkZSBzd2l0Y2gtc2l6ZShyZW0tY2FsYygxNiksIDVyZW0sICRzd2l0Y2gtaGVpZ2h0LWxhcmdlLCAycmVtLCAkc3dpdGNoLXBhZGRsZS1vZmZzZXQpO1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8gc2Nzcy1saW50OmRpc2FibGUgTWVyZ2VhYmxlU2VsZWN0b3IsIFF1YWxpZnlpbmdFbGVtZW50XG5cbi8vLy9cbi8vLyBAZ3JvdXAgdGFibGVcbi8vLy9cblxuLy8vIERlZnVhbHQgY29sb3IgZm9yIHRhYmxlIGJhY2tncm91bmQuXG4vLy8gQHR5cGUgQ29sb3JcbiR0YWJsZS1iYWNrZ3JvdW5kOiAkd2hpdGUgICFkZWZhdWx0O1xuXG4vLy8gRGVmdWFsdCBzY2FsZSBmb3IgZGFya2VuaW5nIHRoZSBzdHJpcGVkIHRhYmxlIHJvd3MgYW5kIHRoZSB0YWJsZSBib3JkZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kdGFibGUtY29sb3Itc2NhbGU6IDUlICFkZWZhdWx0O1xuXG4vLy8gRGVmdWFsdCBzdHlsZSBmb3IgdGFibGUgYm9yZGVyLlxuLy8vIEB0eXBlIExpc3RcbiR0YWJsZS1ib3JkZXI6IDFweCBzb2xpZCBzbWFydC1zY2FsZSgkdGFibGUtYmFja2dyb3VuZCwgJHRhYmxlLWNvbG9yLXNjYWxlKSAhZGVmYXVsdDtcblxuLy8vIERlZnVhbHQgcGFkZGluZyBmb3IgdGFibGUuXG4vLy8gQHR5cGUgTnVtYmVyXG4kdGFibGUtcGFkZGluZzogcmVtLWNhbGMoOCAxMCAxMCkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZ1YWx0IHNjYWxlIGZvciBkYXJrZW5pbmcgdGhlIHRhYmxlIHJvd3Mgb24gaG92ZXIuXG4vLy8gQHR5cGUgTnVtYmVyXG4kdGFibGUtaG92ZXItc2NhbGU6IDIlICFkZWZhdWx0O1xuXG4vLy8gRGVmdWFsdCBjb2xvciBvZiBzdGFuZGFyZCByb3dzIG9uIGhvdmVyLlxuLy8vIEB0eXBlIExpc3RcbiR0YWJsZS1yb3ctaG92ZXI6IGRhcmtlbigkdGFibGUtYmFja2dyb3VuZCwgJHRhYmxlLWhvdmVyLXNjYWxlKSAhZGVmYXVsdDtcblxuLy8vIERlZnVhbHQgY29sb3Igb2Ygc3RyaXBlZCByb3dzIG9uIGhvdmVyLlxuLy8vIEB0eXBlIExpc3RcbiR0YWJsZS1yb3ctc3RyaXBlLWhvdmVyOiBkYXJrZW4oJHRhYmxlLWJhY2tncm91bmQsICR0YWJsZS1jb2xvci1zY2FsZSArICR0YWJsZS1ob3Zlci1zY2FsZSkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZ1YWx0IGJhY2tncm91bmQgY29sb3IgZm9yIHN0cmlwZWQgcm93cy5cbi8vLyBAdHlwZSBDb2xvclxuJHRhYmxlLXN0cmlwZWQtYmFja2dyb3VuZDogc21hcnQtc2NhbGUoJHRhYmxlLWJhY2tncm91bmQsICR0YWJsZS1jb2xvci1zY2FsZSkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZ1YWx0IHZhbHVlIGZvciBzaG93aW5nIHRoZSBzdHJpcGUgb24gcm93cyBvZiB0aGUgdGFibGVzLCBleGNsdWRpbmcgdGhlIGhlYWRlciBhbmQgZm9vdGVyIElmIGV2ZW4sIHRoZSBldmVuIHJvd3Mgd2lsbCBoYXZlIGEgYmFja2dyb3VuZCBjb2xvci4gSWYgb2RkLCB0aGUgb2RkIHJvd3Mgd2lsbCBoYXZlIGEgYmFja2dyb3VuZCBjb2xvci4gSWYgZW1wdHksIG9yIGFueW90aGVyIHZhbHVlLCB0aGUgdGFibGUgcm93cyB3aWxsIGhhdmUgbm8gc3RyaXBpbmcuXG4vLy8gQHR5cGUgS2V5b3dvcmRcbiR0YWJsZS1zdHJpcGU6IGV2ZW4gIWRlZmF1bHQ7XG5cbi8vLyBEZWZ1YWx0IGNvbG9yIGZvciBoZWFkZXIgYmFja2dyb3VuZC5cbi8vLyBAdHlwZSBDb2xvclxuJHRhYmxlLWhlYWQtYmFja2dyb3VuZDogc21hcnQtc2NhbGUoJHRhYmxlLWJhY2tncm91bmQsICR0YWJsZS1jb2xvci1zY2FsZSAvIDIpICFkZWZhdWx0O1xuXG4vLy8gRGVmdWFsdCBjb2xvciBmb3IgZm9vdGVyIGJhY2tncm91bmQuXG4vLy8gQHR5cGUgQ29sb3JcbiR0YWJsZS1mb290LWJhY2tncm91bmQ6IHNtYXJ0LXNjYWxlKCR0YWJsZS1iYWNrZ3JvdW5kLCAkdGFibGUtY29sb3Itc2NhbGUpICFkZWZhdWx0O1xuXG4vLy8gRGVmdWFsdCBmb250IGNvbG9yIGZvciBoZWFkZXIuXG4vLy8gQHR5cGUgQ29sb3JcbiR0YWJsZS1oZWFkLWZvbnQtY29sb3I6ICRib2R5LWZvbnQtY29sb3IgIWRlZmF1bHQ7XG5cbi8vLyBEZWZ1YWx0IHZhbHVlIGZvciBzaG93aW5nIHRoZSBoZWFkZXIgd2hlbiB1c2luZyBzdGFja2VkIHRhYmxlcy5cbi8vLyBAdHlwZSBCb29sZWFuXG4kc2hvdy1oZWFkZXItZm9yLXN0YWNrZWQ6IGZhbHNlICFkZWZhdWx0O1xuXG4vLy8gQWRkcyB0aGUgZ2VuZXJhbCBzdHlsZXMgZm9yIHRhYmxlcy5cbi8vLyBAcGFyYW0ge0tleXdvcmR9ICRzdHJpcGUgWyR0YWJsZS1zdHJpcGVdIC0gVXNlcyBrZXdvcmRzIGV2ZW4sIG9kZCwgb3Igbm9uZSB0byBkYXJrZW4gcm93cyBvZiB0aGUgdGFibGUuIFRoZSBkZWZ1YWx0IHZhbHVlIGlzIGV2ZW4uXG5AbWl4aW4gdGFibGUoJHN0cmlwZTogJHRhYmxlLXN0cmlwZSkge1xuICBtYXJnaW4tYm90dG9tOiAkZ2xvYmFsLW1hcmdpbjtcbiAgYm9yZGVyLXJhZGl1czogJGdsb2JhbC1yYWRpdXM7XG5cbiAgQGF0LXJvb3Qge1xuICAgIHRoZWFkLFxuICAgIHRib2R5LFxuICAgIHRmb290IHtcbiAgICAgIGJvcmRlcjogJHRhYmxlLWJvcmRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR0YWJsZS1iYWNrZ3JvdW5kO1xuICAgIH1cblxuICAgIC8vIENhcHRpb25cbiAgICBjYXB0aW9uIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAkZ2xvYmFsLXdlaWdodC1ib2xkO1xuICAgICAgcGFkZGluZzogJHRhYmxlLXBhZGRpbmc7XG4gICAgfVxuXG4gICAgLy8gVGFibGUgaGVhZCBhbmQgZm9vdFxuICAgIHRoZWFkLFxuICAgIHRmb290IHtcbiAgICAgIGJhY2tncm91bmQ6ICR0YWJsZS1oZWFkLWJhY2tncm91bmQ7XG4gICAgICBjb2xvcjogJHRhYmxlLWhlYWQtZm9udC1jb2xvcjtcblxuICAgICAgLy8gUm93cyB3aXRoaW4gaGVhZCBhbmQgZm9vdFxuICAgICAgdHIge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cblxuICAgICAgLy8gQ2VsbHMgd2l0aGluIGhlYWQgYW5kIGZvb3RcbiAgICAgIHRoLFxuICAgICAgdGQge1xuICAgICAgICBwYWRkaW5nOiAkdGFibGUtcGFkZGluZztcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRnbG9iYWwtd2VpZ2h0LWJvbGQ7XG4gICAgICAgIHRleHQtYWxpZ246ICN7JGdsb2JhbC1sZWZ0fTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUYWJsZSByb3dzXG4gICAgdGJvZHkge1xuICAgICAgdHIge1xuICAgICAgICAvLyBJZiBzdHJpcGUgaXMgc2V0IHRvIGV2ZW4sIGRhcmtlbiB0aGUgZXZlbiByb3dzLlxuICAgICAgICBAaWYgJHN0cmlwZSA9PSBldmVuIHtcbiAgICAgICAgICAmOm50aC1jaGlsZChldmVuKSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdGFibGUtc3RyaXBlZC1iYWNrZ3JvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHN0cmlwZSBpcyBzZXQgdG8gb2RkLCBkYXJrZW4gdGhlIG9kZCByb3dzLlxuICAgICAgICBAZWxzZSBpZiAkc3RyaXBlID09IG9kZCB7XG4gICAgICAgICAgJjpudGgtY2hpbGQob2RkKSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdGFibGUtc3RyaXBlZC1iYWNrZ3JvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aCxcbiAgICAgIHRkIHtcbiAgICAgICAgcGFkZGluZzogJHRhYmxlLXBhZGRpbmc7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vLyBBZGRzIHRoZSBhYmlsaXR5IHRvIGhvcml6b250YWxseSBzY3JvbGwgdGhlIHRhYmxlIHdoZW4gdGhlIGNvbnRlbnQgb3ZlcmZsb3dzIGhvcml6b250YWxseS5cbkBtaXhpbiB0YWJsZS1zY3JvbGwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93LXg6IGF1dG87XG59XG5cbi8vLyBTbGlnaHRseSBkYXJrZW5zIHRoZSB0YWJsZSByb3dzIG9uIGhvdmVyLlxuQG1peGluIHRhYmxlLWhvdmVyIHtcbiAgdHIge1xuICAgIC8vRGFya2VucyB0aGUgbm9uLXN0cmlwZWQgdGFibGUgcm93cyBvbiBob3Zlci5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR0YWJsZS1yb3ctaG92ZXI7XG4gICAgfVxuXG4gICAgLy9EYXJrZW5zIHRoZSBldmVuIHN0cmlwZWQgdGFibGUgcm93cy5cbiAgICBAaWYoJHRhYmxlLXN0cmlwZSA9PSBldmVuKSB7XG4gICAgICAmOm50aC1vZi10eXBlKGV2ZW4pOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHRhYmxlLXJvdy1zdHJpcGUtaG92ZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9EYXJrZW5zIHRoZSBvZGQgc3RyaXBlZCB0YWJsZSByb3dzLlxuICAgIEBlbHNlaWYoJHRhYmxlLXN0cmlwZSA9PSBvZGQpIHtcbiAgICAgICY6bnRoLW9mLXR5cGUob2RkKTpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR0YWJsZS1yb3ctc3RyaXBlLWhvdmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgc3RhY2tlZCB0YWJsZS4gVXNlZnVsIGZvciBzbWFsbC1zY3JlZW4gbGF5b3V0cy5cbi8vLyBAcGFyYW0ge0Jvb2xlYW59ICRoZWFkZXIgWyRzaG93LWhlYWRlci1mb3Itc3RhY2tlZF0gLSBTaG93IHRoZSBmaXJzdCB0aCBvZiBoZWFkZXIgd2hlbiBzdGFja2VkLlxuQG1peGluIHRhYmxlLXN0YWNrKCRoZWFkZXI6ICRzaG93LWhlYWRlci1mb3Itc3RhY2tlZCkge1xuICBAaWYgJGhlYWRlciB7XG4gICAgdGhlYWQge1xuICAgICAgdGg6Zmlyc3QtY2hpbGQge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cblxuICAgICAgdGgge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBAZWxzZSB7XG4gICAgdGhlYWQge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICB0Zm9vdCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIHRyLFxuICB0aCxcbiAgdGQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgdGQge1xuICAgIGJvcmRlci10b3A6IDA7XG4gIH1cbn1cblxuQG1peGluIGZvdW5kYXRpb24tdGFibGUge1xuICB0YWJsZSB7XG4gICAgQGluY2x1ZGUgdGFibGU7XG4gIH1cblxuICB0YWJsZS5zdGFjayB7XG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludChtZWRpdW0gZG93bikge1xuICAgICAgQGluY2x1ZGUgdGFibGUtc3RhY2s7XG4gICAgfVxuICB9XG5cbiAgdGFibGUuc2Nyb2xsIHtcbiAgICBAaW5jbHVkZSB0YWJsZS1zY3JvbGw7XG4gIH1cblxuICB0YWJsZS5ob3ZlciB7XG4gICAgQGluY2x1ZGUgdGFibGUtaG92ZXI7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIHRhYnNcbi8vLy9cblxuLy8vIERlZmF1bHQgbWFyZ2luIG9mIHRoZSB0YWIgYmFyLlxuLy8vIEB0eXBlIE51bWJlclxuJHRhYi1tYXJnaW46IDAgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGJhY2tncm91bmQgY29sb3Igb2YgYSB0YWIgYmFyLlxuLy8vIEB0eXBlIENvbG9yXG4kdGFiLWJhY2tncm91bmQ6ICR3aGl0ZSAhZGVmYXVsdDtcblxuLy8vIGFjdGl2ZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGEgdGFiIGJhci5cbi8vLyBAdHlwZSBDb2xvclxuJHRhYi1iYWNrZ3JvdW5kLWFjdGl2ZTogJGxpZ2h0LWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IGJvcmRlciBjb2xvciBvZiB0YWIgY29udGVudC5cbi8vLyBAdHlwZSBDb2xvclxuJHRhYi1ib3JkZXI6ICRsaWdodC1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCB0ZXh0IGNvbG9yIGZvciBpdGVtcyBpbiBhIE1lbnUuXG4vLy8gQHR5cGUgQ29sb3JcbiR0YWItaXRlbS1jb2xvcjogZm9yZWdyb3VuZCgkdGFiLWJhY2tncm91bmQsICRwcmltYXJ5LWNvbG9yKSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBvbiBob3ZlciBmb3IgaXRlbXMgaW4gYSBNZW51LlxuJHRhYi1pdGVtLWJhY2tncm91bmQtaG92ZXI6ICR3aGl0ZSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgcGFkZGluZyBvZiBhIGEgdGFiIGl0ZW0uXG4vLy8gQHR5cGUgTnVtYmVyXG4kdGFiLWl0ZW0tcGFkZGluZzogMS4yNXJlbSAxLjVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBNYXhpbXVtIG51bWJlciBvZiBgZXhwYW5kLW5gIGNsYXNzZXMgdG8gaW5jbHVkZSBpbiB0aGUgQ1NTLlxuLy8vIEB0eXBlIE51bWJlclxuJHRhYi1leHBhbmQtbWF4OiA2ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRhYiBjb250ZW50LlxuLy8vIEB0eXBlIENvbG9yXG4kdGFiLWNvbnRlbnQtYmFja2dyb3VuZDogJHdoaXRlICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBib3JkZXIgY29sb3Igb2YgdGFiIGNvbnRlbnQuXG4vLy8gQHR5cGUgQ29sb3JcbiR0YWItY29udGVudC1ib3JkZXI6ICRsaWdodC1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCB0ZXh0IGNvbG9yIG9mIHRhYiBjb250ZW50LlxuLy8vIEB0eXBlIENvbG9yXG4kdGFiLWNvbnRlbnQtY29sb3I6IGZvcmVncm91bmQoJHRhYi1iYWNrZ3JvdW5kLCAkcHJpbWFyeS1jb2xvcikgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHBhZGRpbmcgZm9yIHRhYiBjb250ZW50LlxuLy8vIEB0eXBlIE51bWJlciB8IExpc3RcbiR0YWItY29udGVudC1wYWRkaW5nOiAxcmVtICFkZWZhdWx0O1xuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgdGFiIGNvbnRhaW5lci4gQXBwbHkgdGhpcyB0byBhIGA8dWw+YC5cbkBtaXhpbiB0YWJzLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGNsZWFyZml4O1xuICBtYXJnaW46ICR0YWItbWFyZ2luO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICR0YWItYmFja2dyb3VuZDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHRhYi1jb250ZW50LWJvcmRlcjtcbn1cblxuLy8vIEF1Z21lbnRzIGEgdGFiIGNvbnRhaW5lciB0byBoYXZlIHZlcnRpY2FsIHRhYnMuIFVzZSB0aGlzIGluIGNvbmp1bmN0aW9uIHdpdGggYHRhYnMtY29udGFpbmVyKClgLlxuQG1peGluIHRhYnMtY29udGFpbmVyLXZlcnRpY2FsIHtcbiAgPiBsaSB7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgZmxvYXQ6IG5vbmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbn1cblxuLy8vIEFkZHMgc3R5bGVzIGZvciB0aGUgbGlua3Mgd2l0aGluIGEgdGFiIGNvbnRhaW5lci4gQXBwbHkgdGhpcyB0byB0aGUgYDxsaT5gIGVsZW1lbnRzIGluc2lkZSBhIHRhYiBjb250YWluZXIuXG5AbWl4aW4gdGFicy10aXRsZSB7XG4gIGZsb2F0OiAjeyRnbG9iYWwtbGVmdH07XG5cbiAgPiBhIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwYWRkaW5nOiAkdGFiLWl0ZW0tcGFkZGluZztcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY29sb3I6ICR0YWItaXRlbS1jb2xvcjtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHRhYi1pdGVtLWJhY2tncm91bmQtaG92ZXI7XG4gICAgfVxuXG4gICAgJjpmb2N1cyxcbiAgICAmW2FyaWEtc2VsZWN0ZWQ9J3RydWUnXSB7XG4gICAgICBiYWNrZ3JvdW5kOiAkdGFiLWJhY2tncm91bmQtYWN0aXZlO1xuICAgIH1cbiAgfVxufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIHRoZSB3cmFwcGVyIHRoYXQgc3Vycm91bmRzIGEgdGFiIGdyb3VwJ3MgY29udGVudCBwYW5lcy5cbkBtaXhpbiB0YWJzLWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kOiAkdGFiLWNvbnRlbnQtYmFja2dyb3VuZDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcbiAgYm9yZGVyOiAxcHggc29saWQgJHRhYi1jb250ZW50LWJvcmRlcjtcbiAgYm9yZGVyLXRvcDogMDtcbn1cblxuLy8vIEF1Z21lbnRzIGEgdGFiIGNvbnRlbnQgY29udGFpbmVyIHRvIGhhdmUgYSB2ZXJ0aWNhbCBzdHlsZSwgYnkgc2hpZnRpbmcgdGhlIGJvcmRlciBhcm91bmQuIFVzZSB0aGlzIGluIGNvbmp1bmN0aW9uIHdpdGggYHRhYnMtY29udGVudCgpYC5cbkBtaXhpbiB0YWJzLWNvbnRlbnQtdmVydGljYWwge1xuICBib3JkZXI6IDFweCBzb2xpZCAkdGFiLWNvbnRlbnQtYm9yZGVyO1xuICBib3JkZXItI3skZ2xvYmFsLWxlZnR9OiAwO1xufVxuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGFuIGluZGl2aWR1YWwgdGFiIGNvbnRlbnQgcGFuZWwgd2l0aGluIHRoZSB0YWIgY29udGVudCBjb250YWluZXIuXG5AbWl4aW4gdGFicy1wYW5lbCB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBhZGRpbmc6ICR0YWItY29udGVudC1wYWRkaW5nO1xuXG4gICYuaXMtYWN0aXZlIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxufVxuXG5AbWl4aW4gZm91bmRhdGlvbi10YWJzIHtcbiAgLnRhYnMge1xuICAgIEBpbmNsdWRlIHRhYnMtY29udGFpbmVyO1xuICB9XG5cbiAgLy8gVmVydGljYWxcbiAgLnRhYnMudmVydGljYWwge1xuICAgIEBpbmNsdWRlIHRhYnMtY29udGFpbmVyLXZlcnRpY2FsO1xuICB9XG5cbiAgLy8gU2ltcGxlXG4gIC50YWJzLnNpbXBsZSB7XG4gICAgPiBsaSA+IGEge1xuICAgICAgcGFkZGluZzogMDtcblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFByaW1hcnkgY29sb3JcbiAgLnRhYnMucHJpbWFyeSB7XG4gICAgYmFja2dyb3VuZDogJHByaW1hcnktY29sb3I7XG5cbiAgICA+IGxpID4gYSB7XG4gICAgICBjb2xvcjogZm9yZWdyb3VuZCgkcHJpbWFyeS1jb2xvcik7XG5cbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgYmFja2dyb3VuZDogc21hcnQtc2NhbGUoJHByaW1hcnktY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC50YWJzLXRpdGxlIHtcbiAgICBAaW5jbHVkZSB0YWJzLXRpdGxlO1xuICB9XG5cbiAgLnRhYnMtY29udGVudCB7XG4gICAgQGluY2x1ZGUgdGFicy1jb250ZW50O1xuICB9XG5cbiAgLnRhYnMtY29udGVudC52ZXJ0aWNhbCB7XG4gICAgQGluY2x1ZGUgdGFicy1jb250ZW50LXZlcnRpY2FsO1xuICB9XG5cbiAgLnRhYnMtcGFuZWwge1xuICAgIEBpbmNsdWRlIHRhYnMtcGFuZWw7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIHRpdGxlLWJhclxuLy8vL1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBvZiBhIHRpdGxlIGJhci5cbi8vLyBAdHlwZSBDb2xvclxuJHRpdGxlYmFyLWJhY2tncm91bmQ6ICRibGFjayAhZGVmYXVsdDtcblxuLy8vIENvbG9yIG9mIHRleHQgaW5zaWRlIGEgdGl0bGUgYmFyLlxuLy8vIEB0eXBlIENvbG9yXG4kdGl0bGViYXItY29sb3I6ICR3aGl0ZSAhZGVmYXVsdDtcblxuLy8vIFBhZGRpbmcgaW5zaWRlIGEgdGl0bGUgYmFyLlxuLy8vIEB0eXBlIExlbmd0aFxuJHRpdGxlYmFyLXBhZGRpbmc6IDAuNXJlbSAhZGVmYXVsdDtcblxuLy8vIEZvbnQgd2VpZ2h0IG9mIHRleHQgaW5zaWRlIGEgdGl0bGUgYmFyLlxuLy8vIEB0eXBlIFdlaWdodFxuJHRpdGxlYmFyLXRleHQtZm9udC13ZWlnaHQ6IGJvbGQgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciBvZiBtZW51IGljb25zIGluc2lkZSBhIHRpdGxlIGJhci5cbi8vLyBAdHlwZSBDb2xvclxuJHRpdGxlYmFyLWljb24tY29sb3I6ICR3aGl0ZSAhZGVmYXVsdDtcblxuLy8vIENvbG9yIG9mIG1lbnUgaWNvbnMgaW5zaWRlIGEgdGl0bGUgYmFyIG9uIGhvdmVyLlxuLy8vIEB0eXBlIENvbG9yXG4kdGl0bGViYXItaWNvbi1jb2xvci1ob3ZlcjogJG1lZGl1bS1ncmF5ICFkZWZhdWx0O1xuXG4vLy8gU3BhY2luZyBiZXR3ZWVuIHRoZSBtZW51IGljb24gYW5kIHRleHQgaW5zaWRlIGEgdGl0bGUgYmFyLlxuLy8vIEB0eXBlIExlbmd0aFxuJHRpdGxlYmFyLWljb24tc3BhY2luZzogMC4yNXJlbSAhZGVmYXVsdDtcblxuQG1peGluIGZvdW5kYXRpb24tdGl0bGUtYmFyIHtcbiAgLnRpdGxlLWJhciB7XG4gICAgQGluY2x1ZGUgY2xlYXJmaXg7XG4gICAgYmFja2dyb3VuZDogJHRpdGxlYmFyLWJhY2tncm91bmQ7XG4gICAgY29sb3I6ICR0aXRsZWJhci1jb2xvcjtcbiAgICBwYWRkaW5nOiAkdGl0bGViYXItcGFkZGluZztcblxuICAgIC5tZW51LWljb24ge1xuICAgICAgbWFyZ2luLSN7JGdsb2JhbC1sZWZ0fTogJHRpdGxlYmFyLWljb24tc3BhY2luZztcbiAgICAgIG1hcmdpbi0jeyRnbG9iYWwtcmlnaHR9OiAkdGl0bGViYXItcGFkZGluZztcbiAgICB9XG4gIH1cblxuICAudGl0bGUtYmFyLWxlZnQge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG5cbiAgLnRpdGxlLWJhci1yaWdodCB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICB9XG5cbiAgLnRpdGxlLWJhci10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6ICR0aXRsZWJhci10ZXh0LWZvbnQtd2VpZ2h0O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgLm1lbnUtaWNvbiB7XG4gICAgQGluY2x1ZGUgaGFtYnVyZ2VyKCRjb2xvcjogJHRpdGxlYmFyLWljb24tY29sb3IsICRjb2xvci1ob3ZlcjogJHRpdGxlYmFyLWljb24tY29sb3ItaG92ZXIpO1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCB0b3AtYmFyXG4vLy8vXG5cbi8vLyBQYWRkaW5nIGZvciB0aGUgdG9wIGJhci5cbi8vLyBAdHlwZSBOdW1iZXJcbiR0b3BiYXItcGFkZGluZzogMC41cmVtICFkZWZhdWx0O1xuXG4vLy8gQmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHRvcCBiYXIuIFRoaXMgY29sb3IgYWxzbyBjYXNjYWRlcyB0byBtZW51cyB3aXRoaW4gdGhlIHRvcCBiYXIuXG4vLy8gQHR5cGUgQ29sb3JcbiR0b3BiYXItYmFja2dyb3VuZDogJGxpZ2h0LWdyYXkgIWRlZmF1bHQ7XG5cbi8vLyBDb2xvciBmb3IgbGlua3MgaW5zaWRlIGEgdG9wIGJhciBtZW51LlxuLy8vIEB0eXBlIENvbG9yXG4kdG9wYmFyLWxpbmstY29sb3I6ICRwcmltYXJ5LWNvbG9yICFkZWZhdWx0O1xuXG4vLy8gV2lkdGggb2YgYDxpbnB1dD5gIGVsZW1lbnRzIGluc2lkZSB0aGUgdG9wIGJhci5cbi8vLyBAdHlwZSBOdW1iZXJcbiR0b3BiYXItaW5wdXQtd2lkdGg6IDIwMHB4ICFkZWZhdWx0O1xuXG4vLy8gQWRkcyBzdHlsZXMgZm9yIGEgdG9wIGJhciBjb250YWluZXIuXG5AbWl4aW4gdG9wLWJhci1jb250YWluZXIge1xuICBAaW5jbHVkZSBjbGVhcmZpeDtcbiAgcGFkZGluZzogJHRvcGJhci1wYWRkaW5nO1xuXG4gICYsXG4gIHVsIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdG9wYmFyLWJhY2tncm91bmQ7XG4gIH1cblxuICBhIHtcbiAgICBjb2xvcjogJHRvcGJhci1saW5rLWNvbG9yO1xuICB9XG5cbiAgaW5wdXQge1xuICAgIHdpZHRoOiAkdG9wYmFyLWlucHV0LXdpZHRoO1xuICAgIG1hcmdpbi0jeyRnbG9iYWwtcmlnaHR9OiAxcmVtO1xuICB9XG5cbiAgaW5wdXQuYnV0dG9uIHtcbiAgICB3aWR0aDogYXV0bztcbiAgfVxufVxuXG4vLy8gbWFrZXMgc2VjdGlvbnMgc3RhY2tlZFxuQG1peGluIHRvcC1iYXItc3RhY2tlZCB7XG4gIC8vIFN1Yi1zZWN0aW9uc1xuICAudG9wLWJhci1yaWdodCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAudG9wLWJhci1sZWZ0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuXG5AbWl4aW4gZm91bmRhdGlvbi10b3AtYmFyIHtcbiAgLy8gVG9wIGJhciBjb250YWluZXJcbiAgLnRvcC1iYXIge1xuICAgIEBpbmNsdWRlIHRvcC1iYXItY29udGFpbmVyO1xuICB9XG5cbiAgLy8gR2VuZXJhdGUgY2xhc3NlcyBmb3Igc3RhY2tpbmcgb24gZWFjaCBzY3JlZW4gc2l6ZSAoZGVmaW5lZCBpbiAkYnJlYWtwb2ludC1jbGFzc2VzKVxuICBAZWFjaCAkc2l6ZSBpbiAkYnJlYWtwb2ludC1jbGFzc2VzIHtcbiAgICAuc3RhY2tlZC1mb3ItI3skc2l6ZX0ge1xuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgkc2l6ZSBkb3duKSB7XG4gICAgICAgIEBpbmNsdWRlIHRvcC1iYXItc3RhY2tlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTdGFjayBvbiBzbWFsbCBzY3JlZW5zIGFzIGRlZmF1bHRcbiAgQGluY2x1ZGUgYnJlYWtwb2ludChzbWFsbCBvbmx5KSB7XG4gICAgQGluY2x1ZGUgdG9wLWJhci1zdGFja2VkO1xuICB9XG5cbiAgLy8gU3ViLXNlY3Rpb25zXG4gIC50b3AtYmFyLWxlZnQge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG4gIFxuICAudG9wLWJhci1yaWdodCB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICB9XG59XG4iLCIvLyBGb3VuZGF0aW9uIGZvciBTaXRlcyBieSBaVVJCXG4vLyBmb3VuZGF0aW9uLnp1cmIuY29tXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2VcblxuLy8vL1xuLy8vIEBncm91cCB0aHVtYm5haWxcbi8vLy9cblxuLy8vIEJvcmRlciBhcm91bmQgdGh1bWJuYWlsIGltYWdlcy5cbi8vLyBAdHlwZSBCb3JkZXJcbiR0aHVtYm5haWwtYm9yZGVyOiBzb2xpZCA0cHggJHdoaXRlICFkZWZhdWx0O1xuXG4vLy8gQm90dG9tIG1hcmdpbiBmb3IgdGh1bWJuYWlsIGltYWdlcy5cbi8vLyBAdHlwZSBMZW5ndGhcbiR0aHVtYm5haWwtbWFyZ2luLWJvdHRvbTogJGdsb2JhbC1tYXJnaW4gIWRlZmF1bHQ7XG5cbi8vLyBCb3ggc2hhZG93IHVuZGVyIHRodW1ibmFpbCBpbWFnZXMuXG4vLy8gQHR5cGUgU2hhZG93XG4kdGh1bWJuYWlsLXNoYWRvdzogMCAwIDAgMXB4IHJnYmEoJGJsYWNrLCAwLjIpICFkZWZhdWx0O1xuXG4vLy8gQm94IHNoYWRvdyB1bmRlciB0aHVtYm5haWwgaW1hZ2VzLlxuLy8vIEB0eXBlIFNoYWRvd1xuJHRodW1ibmFpbC1zaGFkb3ctaG92ZXI6IDAgMCA2cHggMXB4IHJnYmEoJHByaW1hcnktY29sb3IsIDAuNSkgIWRlZmF1bHQ7XG5cbi8vLyBUcmFuc2l0aW9uIHByb3BydGllcyBmb3IgdGh1bWJuYWlsIGltYWdlcy5cbi8vLyBAdHlwZSBUcmFuc2l0aW9uXG4kdGh1bWJuYWlsLXRyYW5zaXRpb246IGJveC1zaGFkb3cgMjAwbXMgZWFzZS1vdXQgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHJhZGl1cyBmb3IgdGh1bWJuYWlsIGltYWdlcy5cbi8vLyBAdHlwZSBOdW1iZXJcbiR0aHVtYm5haWwtcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cyAhZGVmYXVsdDtcblxuLy8vIEFkZHMgdGh1bWJuYWlsIHN0eWxlcyB0byBhbiBlbGVtZW50LlxuQG1peGluIHRodW1ibmFpbCB7XG4gIGJvcmRlcjogJHRodW1ibmFpbC1ib3JkZXI7XG4gIGJveC1zaGFkb3c6ICR0aHVtYm5haWwtc2hhZG93O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHRyYW5zaXRpb246ICR0aHVtYm5haWwtdHJhbnNpdGlvbjtcbiAgYm9yZGVyLXJhZGl1czogJHRodW1ibmFpbC1yYWRpdXM7XG4gIG1hcmdpbi1ib3R0b206ICR0aHVtYm5haWwtbWFyZ2luLWJvdHRvbTtcblxuICAmOmhvdmVyLFxuICAmOmZvY3VzIHtcbiAgICBib3gtc2hhZG93OiAkdGh1bWJuYWlsLXNoYWRvdy1ob3ZlcjtcbiAgfVxufVxuXG5AbWl4aW4gZm91bmRhdGlvbi10aHVtYm5haWwge1xuICAudGh1bWJuYWlsIHtcbiAgICBAaW5jbHVkZSB0aHVtYm5haWw7XG4gIH1cbn1cbiIsIi8vIEZvdW5kYXRpb24gZm9yIFNpdGVzIGJ5IFpVUkJcbi8vIGZvdW5kYXRpb24uenVyYi5jb21cbi8vIExpY2Vuc2VkIHVuZGVyIE1JVCBPcGVuIFNvdXJjZVxuXG4vLy8vXG4vLy8gQGdyb3VwIHRvb2x0aXBcbi8vLy9cblxuLy8vIERlZmF1bHQgY29sb3Igb2YgdGhlIHRvb2x0aXAgYmFja2dyb3VuZC5cbi8vLyBAdHlwZSBDb2xvclxuJHRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBjb2xvciBvZiB0aGUgdG9vbHRpcCBmb250LlxuLy8vIEB0eXBlIENvbG9yXG4kdG9vbHRpcC1jb2xvcjogJHdoaXRlICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBwYWRkaW5nIG9mIHRoZSB0b29sdGlwIGJhY2tncm91bmQuXG4vLy8gQHR5cGUgTnVtYmVyXG4kdG9vbHRpcC1wYWRkaW5nOiAwLjc1cmVtICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBmb250IHNpemUgb2YgdGhlIHRvb2x0aXAgdGV4dC4gQnkgZGVmYXVsdCwgd2UgcmVjb21tZW5kIGEgc21hbGxlciBmb250IHNpemUgdGhhbiB0aGUgYm9keSBjb3B5LlxuLy8vIEB0eXBlIE51bWJlclxuJHRvb2x0aXAtZm9udC1zaXplOiAkc21hbGwtZm9udC1zaXplICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBwaXAgd2lkdGggZm9yIHRvb2x0aXBzLlxuLy8vIEB0eXBlIE51bWJlclxuJHRvb2x0aXAtcGlwLXdpZHRoOiAwLjc1cmVtICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCBwaXAgaGVpZ2h0IGZvciB0b29sdGlwcy4gVGhpcyBpcyBoZWxwZnVsIGZvciBjYWxjdWxhdGluZyB0aGUgZGlzdGFuY2Ugb2YgdGhlIHRvb2x0aXAgZnJvbSB0aGUgdG9vbHRpcCB3b3JkLlxuLy8vIEB0eXBlIE51bWJlclxuJHRvb2x0aXAtcGlwLWhlaWdodDogJHRvb2x0aXAtcGlwLXdpZHRoICogMC44NjYgIWRlZmF1bHQ7XG5cbi8vLyBEZWZhdWx0IHBpcCBvZmZzZXQgZm9yIHRvb2x0aXBzLiBUaGlzIGNvbnRyb2xzIGhvdyBmYXIgdGhlIHBpcCBpcyBpbmRlbnRlZCBmcm9tIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIHRvb2x0aXAuXG4vLy8gQHR5cGUgTnVtYmVyXG4kdG9vbHRpcC1waXAtb2Zmc2V0OiAxLjI1cmVtICFkZWZhdWx0O1xuXG4vLy8gRGVmYXVsdCByYWRpdXMgZm9yIHRvb2x0aXBzLlxuLy8vIEB0eXBlIE51bWJlclxuJHRvb2x0aXAtcmFkaXVzOiAkZ2xvYmFsLXJhZGl1cyAhZGVmYXVsdDtcblxuQG1peGluIGhhcy10aXAge1xuICBib3JkZXItYm90dG9tOiBkb3R0ZWQgMXB4ICRkYXJrLWdyYXk7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY3Vyc29yOiBoZWxwO1xufVxuXG5AbWl4aW4gdG9vbHRpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICR0b29sdGlwLWJhY2tncm91bmQtY29sb3I7XG4gIGNvbG9yOiAkdG9vbHRpcC1jb2xvcjtcbiAgZm9udC1zaXplOiAkdG9vbHRpcC1mb250LXNpemU7XG4gIHBhZGRpbmc6ICR0b29sdGlwLXBhZGRpbmc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTA7XG4gIHRvcDogY2FsYygxMDAlICsgI3skdG9vbHRpcC1waXAtaGVpZ2h0fSk7XG4gIG1heC13aWR0aDogMTByZW0gIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogJHRvb2x0aXAtcmFkaXVzO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgQGluY2x1ZGUgY3NzLXRyaWFuZ2xlKCR0b29sdGlwLXBpcC13aWR0aCwgJHRvb2x0aXAtYmFja2dyb3VuZC1jb2xvciwgdXApO1xuICAgIGJvdHRvbTogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgfVxuXG4gICYudG9wOjpiZWZvcmUge1xuICAgIEBpbmNsdWRlIGNzcy10cmlhbmdsZSgkdG9vbHRpcC1waXAtd2lkdGgsICR0b29sdGlwLWJhY2tncm91bmQtY29sb3IsIGRvd24pO1xuICAgIHRvcDogMTAwJTtcbiAgICBib3R0b206IGF1dG87XG4gIH1cblxuICAmLmxlZnQ6OmJlZm9yZSB7XG4gICAgQGluY2x1ZGUgY3NzLXRyaWFuZ2xlKCR0b29sdGlwLXBpcC13aWR0aCwgJHRvb2x0aXAtYmFja2dyb3VuZC1jb2xvciwgcmlnaHQpO1xuICAgIGJvdHRvbTogYXV0bztcbiAgICBsZWZ0OiAxMDAlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgfVxuXG4gICYucmlnaHQ6OmJlZm9yZSB7XG4gICAgQGluY2x1ZGUgY3NzLXRyaWFuZ2xlKCR0b29sdGlwLXBpcC13aWR0aCwgJHRvb2x0aXAtYmFja2dyb3VuZC1jb2xvciwgbGVmdCk7XG4gICAgYm90dG9tOiBhdXRvO1xuICAgIGxlZnQ6IGF1dG87XG4gICAgcmlnaHQ6IDEwMCU7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB9XG59XG5cbkBtaXhpbiBmb3VuZGF0aW9uLXRvb2x0aXAge1xuICAuaGFzLXRpcCB7XG4gICAgQGluY2x1ZGUgaGFzLXRpcDtcbiAgfVxuXG4gIC50b29sdGlwIHtcbiAgICBAaW5jbHVkZSB0b29sdGlwO1xuICB9XG59XG4iLCIvKiBcbiAqIEZvdW5kYXRpb24gSWNvbnMgdiAzLjBcbiAqIE1hZGUgYnkgWlVSQiAyMDEzIGh0dHA6Ly96dXJiLmNvbS9wbGF5Z3JvdW5kL2ZvdW5kYXRpb24taWNvbi1mb250cy0zXG4gKiBNSVQgTGljZW5zZVxuICovXG5cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcImZvdW5kYXRpb24taWNvbnNcIjtcbiAgc3JjOiB1cmwoXCJmb3VuZGF0aW9uLWljb25zLmVvdFwiKTtcbiAgc3JjOiB1cmwoXCJmb3VuZGF0aW9uLWljb25zLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksXG4gICAgICAgdXJsKFwiZm91bmRhdGlvbi1pY29ucy53b2ZmXCIpIGZvcm1hdChcIndvZmZcIiksXG4gICAgICAgdXJsKFwiZm91bmRhdGlvbi1pY29ucy50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIiksXG4gICAgICAgdXJsKFwiZm91bmRhdGlvbi1pY29ucy5zdmcjZm9udGN1c3RvbVwiKSBmb3JtYXQoXCJzdmdcIik7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cblxuLypcbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJmb3VuZGF0aW9uLWljb25zXCI7XG4gIHNyYzogdXJsKFwiZm91bmRhdGlvbi1pY29ucy53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbiovXG5cblxuLmZpLWFkZHJlc3MtYm9vazpiZWZvcmUsXG4uZmktYWxlcnQ6YmVmb3JlLFxuLmZpLWFsaWduLWNlbnRlcjpiZWZvcmUsXG4uZmktYWxpZ24tanVzdGlmeTpiZWZvcmUsXG4uZmktYWxpZ24tbGVmdDpiZWZvcmUsXG4uZmktYWxpZ24tcmlnaHQ6YmVmb3JlLFxuLmZpLWFuY2hvcjpiZWZvcmUsXG4uZmktYW5ub3RhdGU6YmVmb3JlLFxuLmZpLWFyY2hpdmU6YmVmb3JlLFxuLmZpLWFycm93LWRvd246YmVmb3JlLFxuLmZpLWFycm93LWxlZnQ6YmVmb3JlLFxuLmZpLWFycm93LXJpZ2h0OmJlZm9yZSxcbi5maS1hcnJvdy11cDpiZWZvcmUsXG4uZmktYXJyb3dzLWNvbXByZXNzOmJlZm9yZSxcbi5maS1hcnJvd3MtZXhwYW5kOmJlZm9yZSxcbi5maS1hcnJvd3MtaW46YmVmb3JlLFxuLmZpLWFycm93cy1vdXQ6YmVmb3JlLFxuLmZpLWFzbDpiZWZvcmUsXG4uZmktYXN0ZXJpc2s6YmVmb3JlLFxuLmZpLWF0LXNpZ246YmVmb3JlLFxuLmZpLWJhY2tncm91bmQtY29sb3I6YmVmb3JlLFxuLmZpLWJhdHRlcnktZW1wdHk6YmVmb3JlLFxuLmZpLWJhdHRlcnktZnVsbDpiZWZvcmUsXG4uZmktYmF0dGVyeS1oYWxmOmJlZm9yZSxcbi5maS1iaXRjb2luLWNpcmNsZTpiZWZvcmUsXG4uZmktYml0Y29pbjpiZWZvcmUsXG4uZmktYmxpbmQ6YmVmb3JlLFxuLmZpLWJsdWV0b290aDpiZWZvcmUsXG4uZmktYm9sZDpiZWZvcmUsXG4uZmktYm9vay1ib29rbWFyazpiZWZvcmUsXG4uZmktYm9vazpiZWZvcmUsXG4uZmktYm9va21hcms6YmVmb3JlLFxuLmZpLWJyYWlsbGU6YmVmb3JlLFxuLmZpLWJ1cnN0LW5ldzpiZWZvcmUsXG4uZmktYnVyc3Qtc2FsZTpiZWZvcmUsXG4uZmktYnVyc3Q6YmVmb3JlLFxuLmZpLWNhbGVuZGFyOmJlZm9yZSxcbi5maS1jYW1lcmE6YmVmb3JlLFxuLmZpLWNoZWNrOmJlZm9yZSxcbi5maS1jaGVja2JveDpiZWZvcmUsXG4uZmktY2xpcGJvYXJkLW5vdGVzOmJlZm9yZSxcbi5maS1jbGlwYm9hcmQtcGVuY2lsOmJlZm9yZSxcbi5maS1jbGlwYm9hcmQ6YmVmb3JlLFxuLmZpLWNsb2NrOmJlZm9yZSxcbi5maS1jbG9zZWQtY2FwdGlvbjpiZWZvcmUsXG4uZmktY2xvdWQ6YmVmb3JlLFxuLmZpLWNvbW1lbnQtbWludXM6YmVmb3JlLFxuLmZpLWNvbW1lbnQtcXVvdGVzOmJlZm9yZSxcbi5maS1jb21tZW50LXZpZGVvOmJlZm9yZSxcbi5maS1jb21tZW50OmJlZm9yZSxcbi5maS1jb21tZW50czpiZWZvcmUsXG4uZmktY29tcGFzczpiZWZvcmUsXG4uZmktY29udHJhc3Q6YmVmb3JlLFxuLmZpLWNyZWRpdC1jYXJkOmJlZm9yZSxcbi5maS1jcm9wOmJlZm9yZSxcbi5maS1jcm93bjpiZWZvcmUsXG4uZmktY3NzMzpiZWZvcmUsXG4uZmktZGF0YWJhc2U6YmVmb3JlLFxuLmZpLWRpZS1maXZlOmJlZm9yZSxcbi5maS1kaWUtZm91cjpiZWZvcmUsXG4uZmktZGllLW9uZTpiZWZvcmUsXG4uZmktZGllLXNpeDpiZWZvcmUsXG4uZmktZGllLXRocmVlOmJlZm9yZSxcbi5maS1kaWUtdHdvOmJlZm9yZSxcbi5maS1kaXNsaWtlOmJlZm9yZSxcbi5maS1kb2xsYXItYmlsbDpiZWZvcmUsXG4uZmktZG9sbGFyOmJlZm9yZSxcbi5maS1kb3dubG9hZDpiZWZvcmUsXG4uZmktZWplY3Q6YmVmb3JlLFxuLmZpLWVsZXZhdG9yOmJlZm9yZSxcbi5maS1ldXJvOmJlZm9yZSxcbi5maS1leWU6YmVmb3JlLFxuLmZpLWZhc3QtZm9yd2FyZDpiZWZvcmUsXG4uZmktZmVtYWxlLXN5bWJvbDpiZWZvcmUsXG4uZmktZmVtYWxlOmJlZm9yZSxcbi5maS1maWx0ZXI6YmVmb3JlLFxuLmZpLWZpcnN0LWFpZDpiZWZvcmUsXG4uZmktZmxhZzpiZWZvcmUsXG4uZmktZm9sZGVyLWFkZDpiZWZvcmUsXG4uZmktZm9sZGVyLWxvY2s6YmVmb3JlLFxuLmZpLWZvbGRlcjpiZWZvcmUsXG4uZmktZm9vdDpiZWZvcmUsXG4uZmktZm91bmRhdGlvbjpiZWZvcmUsXG4uZmktZ3JhcGgtYmFyOmJlZm9yZSxcbi5maS1ncmFwaC1ob3Jpem9udGFsOmJlZm9yZSxcbi5maS1ncmFwaC1waWU6YmVmb3JlLFxuLmZpLWdyYXBoLXRyZW5kOmJlZm9yZSxcbi5maS1ndWlkZS1kb2c6YmVmb3JlLFxuLmZpLWhlYXJpbmctYWlkOmJlZm9yZSxcbi5maS1oZWFydDpiZWZvcmUsXG4uZmktaG9tZTpiZWZvcmUsXG4uZmktaHRtbDU6YmVmb3JlLFxuLmZpLWluZGVudC1sZXNzOmJlZm9yZSxcbi5maS1pbmRlbnQtbW9yZTpiZWZvcmUsXG4uZmktaW5mbzpiZWZvcmUsXG4uZmktaXRhbGljOmJlZm9yZSxcbi5maS1rZXk6YmVmb3JlLFxuLmZpLWxhcHRvcDpiZWZvcmUsXG4uZmktbGF5b3V0OmJlZm9yZSxcbi5maS1saWdodGJ1bGI6YmVmb3JlLFxuLmZpLWxpa2U6YmVmb3JlLFxuLmZpLWxpbms6YmVmb3JlLFxuLmZpLWxpc3QtYnVsbGV0OmJlZm9yZSxcbi5maS1saXN0LW51bWJlcjpiZWZvcmUsXG4uZmktbGlzdC10aHVtYm5haWxzOmJlZm9yZSxcbi5maS1saXN0OmJlZm9yZSxcbi5maS1sb2NrOmJlZm9yZSxcbi5maS1sb29wOmJlZm9yZSxcbi5maS1tYWduaWZ5aW5nLWdsYXNzOmJlZm9yZSxcbi5maS1tYWlsOmJlZm9yZSxcbi5maS1tYWxlLWZlbWFsZTpiZWZvcmUsXG4uZmktbWFsZS1zeW1ib2w6YmVmb3JlLFxuLmZpLW1hbGU6YmVmb3JlLFxuLmZpLW1hcDpiZWZvcmUsXG4uZmktbWFya2VyOmJlZm9yZSxcbi5maS1tZWdhcGhvbmU6YmVmb3JlLFxuLmZpLW1pY3JvcGhvbmU6YmVmb3JlLFxuLmZpLW1pbnVzLWNpcmNsZTpiZWZvcmUsXG4uZmktbWludXM6YmVmb3JlLFxuLmZpLW1vYmlsZS1zaWduYWw6YmVmb3JlLFxuLmZpLW1vYmlsZTpiZWZvcmUsXG4uZmktbW9uaXRvcjpiZWZvcmUsXG4uZmktbW91bnRhaW5zOmJlZm9yZSxcbi5maS1tdXNpYzpiZWZvcmUsXG4uZmktbmV4dDpiZWZvcmUsXG4uZmktbm8tZG9nczpiZWZvcmUsXG4uZmktbm8tc21va2luZzpiZWZvcmUsXG4uZmktcGFnZS1hZGQ6YmVmb3JlLFxuLmZpLXBhZ2UtY29weTpiZWZvcmUsXG4uZmktcGFnZS1jc3Y6YmVmb3JlLFxuLmZpLXBhZ2UtZGVsZXRlOmJlZm9yZSxcbi5maS1wYWdlLWRvYzpiZWZvcmUsXG4uZmktcGFnZS1lZGl0OmJlZm9yZSxcbi5maS1wYWdlLWV4cG9ydC1jc3Y6YmVmb3JlLFxuLmZpLXBhZ2UtZXhwb3J0LWRvYzpiZWZvcmUsXG4uZmktcGFnZS1leHBvcnQtcGRmOmJlZm9yZSxcbi5maS1wYWdlLWV4cG9ydDpiZWZvcmUsXG4uZmktcGFnZS1maWxsZWQ6YmVmb3JlLFxuLmZpLXBhZ2UtbXVsdGlwbGU6YmVmb3JlLFxuLmZpLXBhZ2UtcGRmOmJlZm9yZSxcbi5maS1wYWdlLXJlbW92ZTpiZWZvcmUsXG4uZmktcGFnZS1zZWFyY2g6YmVmb3JlLFxuLmZpLXBhZ2U6YmVmb3JlLFxuLmZpLXBhaW50LWJ1Y2tldDpiZWZvcmUsXG4uZmktcGFwZXJjbGlwOmJlZm9yZSxcbi5maS1wYXVzZTpiZWZvcmUsXG4uZmktcGF3OmJlZm9yZSxcbi5maS1wYXlwYWw6YmVmb3JlLFxuLmZpLXBlbmNpbDpiZWZvcmUsXG4uZmktcGhvdG86YmVmb3JlLFxuLmZpLXBsYXktY2lyY2xlOmJlZm9yZSxcbi5maS1wbGF5LXZpZGVvOmJlZm9yZSxcbi5maS1wbGF5OmJlZm9yZSxcbi5maS1wbHVzOmJlZm9yZSxcbi5maS1wb3VuZDpiZWZvcmUsXG4uZmktcG93ZXI6YmVmb3JlLFxuLmZpLXByZXZpb3VzOmJlZm9yZSxcbi5maS1wcmljZS10YWc6YmVmb3JlLFxuLmZpLXByaWNldGFnLW11bHRpcGxlOmJlZm9yZSxcbi5maS1wcmludDpiZWZvcmUsXG4uZmktcHJvaGliaXRlZDpiZWZvcmUsXG4uZmktcHJvamVjdGlvbi1zY3JlZW46YmVmb3JlLFxuLmZpLXB1enpsZTpiZWZvcmUsXG4uZmktcXVvdGU6YmVmb3JlLFxuLmZpLXJlY29yZDpiZWZvcmUsXG4uZmktcmVmcmVzaDpiZWZvcmUsXG4uZmktcmVzdWx0cy1kZW1vZ3JhcGhpY3M6YmVmb3JlLFxuLmZpLXJlc3VsdHM6YmVmb3JlLFxuLmZpLXJld2luZC10ZW46YmVmb3JlLFxuLmZpLXJld2luZDpiZWZvcmUsXG4uZmktcnNzOmJlZm9yZSxcbi5maS1zYWZldHktY29uZTpiZWZvcmUsXG4uZmktc2F2ZTpiZWZvcmUsXG4uZmktc2hhcmU6YmVmb3JlLFxuLmZpLXNoZXJpZmYtYmFkZ2U6YmVmb3JlLFxuLmZpLXNoaWVsZDpiZWZvcmUsXG4uZmktc2hvcHBpbmctYmFnOmJlZm9yZSxcbi5maS1zaG9wcGluZy1jYXJ0OmJlZm9yZSxcbi5maS1zaHVmZmxlOmJlZm9yZSxcbi5maS1za3VsbDpiZWZvcmUsXG4uZmktc29jaWFsLTUwMHB4OmJlZm9yZSxcbi5maS1zb2NpYWwtYWRvYmU6YmVmb3JlLFxuLmZpLXNvY2lhbC1hbWF6b246YmVmb3JlLFxuLmZpLXNvY2lhbC1hbmRyb2lkOmJlZm9yZSxcbi5maS1zb2NpYWwtYXBwbGU6YmVmb3JlLFxuLmZpLXNvY2lhbC1iZWhhbmNlOmJlZm9yZSxcbi5maS1zb2NpYWwtYmluZzpiZWZvcmUsXG4uZmktc29jaWFsLWJsb2dnZXI6YmVmb3JlLFxuLmZpLXNvY2lhbC1kZWxpY2lvdXM6YmVmb3JlLFxuLmZpLXNvY2lhbC1kZXNpZ25lci1uZXdzOmJlZm9yZSxcbi5maS1zb2NpYWwtZGV2aWFudC1hcnQ6YmVmb3JlLFxuLmZpLXNvY2lhbC1kaWdnOmJlZm9yZSxcbi5maS1zb2NpYWwtZHJpYmJibGU6YmVmb3JlLFxuLmZpLXNvY2lhbC1kcml2ZTpiZWZvcmUsXG4uZmktc29jaWFsLWRyb3Bib3g6YmVmb3JlLFxuLmZpLXNvY2lhbC1ldmVybm90ZTpiZWZvcmUsXG4uZmktc29jaWFsLWZhY2Vib29rOmJlZm9yZSxcbi5maS1zb2NpYWwtZmxpY2tyOmJlZm9yZSxcbi5maS1zb2NpYWwtZm9ycnN0OmJlZm9yZSxcbi5maS1zb2NpYWwtZm91cnNxdWFyZTpiZWZvcmUsXG4uZmktc29jaWFsLWdhbWUtY2VudGVyOmJlZm9yZSxcbi5maS1zb2NpYWwtZ2l0aHViOmJlZm9yZSxcbi5maS1zb2NpYWwtZ29vZ2xlLXBsdXM6YmVmb3JlLFxuLmZpLXNvY2lhbC1oYWNrZXItbmV3czpiZWZvcmUsXG4uZmktc29jaWFsLWhpNTpiZWZvcmUsXG4uZmktc29jaWFsLWluc3RhZ3JhbTpiZWZvcmUsXG4uZmktc29jaWFsLWpvb21sYTpiZWZvcmUsXG4uZmktc29jaWFsLWxhc3RmbTpiZWZvcmUsXG4uZmktc29jaWFsLWxpbmtlZGluOmJlZm9yZSxcbi5maS1zb2NpYWwtbWVkaXVtOmJlZm9yZSxcbi5maS1zb2NpYWwtbXlzcGFjZTpiZWZvcmUsXG4uZmktc29jaWFsLW9ya3V0OmJlZm9yZSxcbi5maS1zb2NpYWwtcGF0aDpiZWZvcmUsXG4uZmktc29jaWFsLXBpY2FzYTpiZWZvcmUsXG4uZmktc29jaWFsLXBpbnRlcmVzdDpiZWZvcmUsXG4uZmktc29jaWFsLXJkaW86YmVmb3JlLFxuLmZpLXNvY2lhbC1yZWRkaXQ6YmVmb3JlLFxuLmZpLXNvY2lhbC1za2lsbHNoYXJlOmJlZm9yZSxcbi5maS1zb2NpYWwtc2t5cGU6YmVmb3JlLFxuLmZpLXNvY2lhbC1zbWFzaGluZy1tYWc6YmVmb3JlLFxuLmZpLXNvY2lhbC1zbmFwY2hhdDpiZWZvcmUsXG4uZmktc29jaWFsLXNwb3RpZnk6YmVmb3JlLFxuLmZpLXNvY2lhbC1zcXVpZG9vOmJlZm9yZSxcbi5maS1zb2NpYWwtc3RhY2stb3ZlcmZsb3c6YmVmb3JlLFxuLmZpLXNvY2lhbC1zdGVhbTpiZWZvcmUsXG4uZmktc29jaWFsLXN0dW1ibGV1cG9uOmJlZm9yZSxcbi5maS1zb2NpYWwtdHJlZWhvdXNlOmJlZm9yZSxcbi5maS1zb2NpYWwtdHVtYmxyOmJlZm9yZSxcbi5maS1zb2NpYWwtdHdpdHRlcjpiZWZvcmUsXG4uZmktc29jaWFsLXZpbWVvOmJlZm9yZSxcbi5maS1zb2NpYWwtd2luZG93czpiZWZvcmUsXG4uZmktc29jaWFsLXhib3g6YmVmb3JlLFxuLmZpLXNvY2lhbC15YWhvbzpiZWZvcmUsXG4uZmktc29jaWFsLXllbHA6YmVmb3JlLFxuLmZpLXNvY2lhbC15b3V0dWJlOmJlZm9yZSxcbi5maS1zb2NpYWwtemVycGx5OmJlZm9yZSxcbi5maS1zb2NpYWwtenVyYjpiZWZvcmUsXG4uZmktc291bmQ6YmVmb3JlLFxuLmZpLXN0YXI6YmVmb3JlLFxuLmZpLXN0b3A6YmVmb3JlLFxuLmZpLXN0cmlrZXRocm91Z2g6YmVmb3JlLFxuLmZpLXN1YnNjcmlwdDpiZWZvcmUsXG4uZmktc3VwZXJzY3JpcHQ6YmVmb3JlLFxuLmZpLXRhYmxldC1sYW5kc2NhcGU6YmVmb3JlLFxuLmZpLXRhYmxldC1wb3J0cmFpdDpiZWZvcmUsXG4uZmktdGFyZ2V0LXR3bzpiZWZvcmUsXG4uZmktdGFyZ2V0OmJlZm9yZSxcbi5maS10ZWxlcGhvbmUtYWNjZXNzaWJsZTpiZWZvcmUsXG4uZmktdGVsZXBob25lOmJlZm9yZSxcbi5maS10ZXh0LWNvbG9yOmJlZm9yZSxcbi5maS10aHVtYm5haWxzOmJlZm9yZSxcbi5maS10aWNrZXQ6YmVmb3JlLFxuLmZpLXRvcnNvLWJ1c2luZXNzOmJlZm9yZSxcbi5maS10b3Jzby1mZW1hbGU6YmVmb3JlLFxuLmZpLXRvcnNvOmJlZm9yZSxcbi5maS10b3Jzb3MtYWxsLWZlbWFsZTpiZWZvcmUsXG4uZmktdG9yc29zLWFsbDpiZWZvcmUsXG4uZmktdG9yc29zLWZlbWFsZS1tYWxlOmJlZm9yZSxcbi5maS10b3Jzb3MtbWFsZS1mZW1hbGU6YmVmb3JlLFxuLmZpLXRvcnNvczpiZWZvcmUsXG4uZmktdHJhc2g6YmVmb3JlLFxuLmZpLXRyZWVzOmJlZm9yZSxcbi5maS10cm9waHk6YmVmb3JlLFxuLmZpLXVuZGVybGluZTpiZWZvcmUsXG4uZmktdW5pdmVyc2FsLWFjY2VzczpiZWZvcmUsXG4uZmktdW5saW5rOmJlZm9yZSxcbi5maS11bmxvY2s6YmVmb3JlLFxuLmZpLXVwbG9hZC1jbG91ZDpiZWZvcmUsXG4uZmktdXBsb2FkOmJlZm9yZSxcbi5maS11c2I6YmVmb3JlLFxuLmZpLXZpZGVvOmJlZm9yZSxcbi5maS12b2x1bWUtbm9uZTpiZWZvcmUsXG4uZmktdm9sdW1lLXN0cmlrZTpiZWZvcmUsXG4uZmktdm9sdW1lOmJlZm9yZSxcbi5maS13ZWI6YmVmb3JlLFxuLmZpLXdoZWVsY2hhaXI6YmVmb3JlLFxuLmZpLXdpZGdldDpiZWZvcmUsXG4uZmktd3JlbmNoOmJlZm9yZSxcbi5maS14LWNpcmNsZTpiZWZvcmUsXG4uZmkteDpiZWZvcmUsXG4uZmkteWVuOmJlZm9yZSxcbi5maS16b29tLWluOmJlZm9yZSxcbi5maS16b29tLW91dDpiZWZvcmUge1xuICBmb250LWZhbWlseTogXCJmb3VuZGF0aW9uLWljb25zXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC12YXJpYW50OiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBsaW5lLWhlaWdodDogMTtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xufVxuXG4uZmktYWRkcmVzcy1ib29rOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTAwXCI7IH1cbi5maS1hbGVydDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwMVwiOyB9XG4uZmktYWxpZ24tY2VudGVyOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTAyXCI7IH1cbi5maS1hbGlnbi1qdXN0aWZ5OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTAzXCI7IH1cbi5maS1hbGlnbi1sZWZ0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTA0XCI7IH1cbi5maS1hbGlnbi1yaWdodDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwNVwiOyB9XG4uZmktYW5jaG9yOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTA2XCI7IH1cbi5maS1hbm5vdGF0ZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwN1wiOyB9XG4uZmktYXJjaGl2ZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwOFwiOyB9XG4uZmktYXJyb3ctZG93bjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwOVwiOyB9XG4uZmktYXJyb3ctbGVmdDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwYVwiOyB9XG4uZmktYXJyb3ctcmlnaHQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMGJcIjsgfVxuLmZpLWFycm93LXVwOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTBjXCI7IH1cbi5maS1hcnJvd3MtY29tcHJlc3M6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMGRcIjsgfVxuLmZpLWFycm93cy1leHBhbmQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMGVcIjsgfVxuLmZpLWFycm93cy1pbjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEwZlwiOyB9XG4uZmktYXJyb3dzLW91dDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExMFwiOyB9XG4uZmktYXNsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTExXCI7IH1cbi5maS1hc3RlcmlzazpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExMlwiOyB9XG4uZmktYXQtc2lnbjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExM1wiOyB9XG4uZmktYmFja2dyb3VuZC1jb2xvcjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExNFwiOyB9XG4uZmktYmF0dGVyeS1lbXB0eTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExNVwiOyB9XG4uZmktYmF0dGVyeS1mdWxsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTE2XCI7IH1cbi5maS1iYXR0ZXJ5LWhhbGY6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMTdcIjsgfVxuLmZpLWJpdGNvaW4tY2lyY2xlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTE4XCI7IH1cbi5maS1iaXRjb2luOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTE5XCI7IH1cbi5maS1ibGluZDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExYVwiOyB9XG4uZmktYmx1ZXRvb3RoOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTFiXCI7IH1cbi5maS1ib2xkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTFjXCI7IH1cbi5maS1ib29rLWJvb2ttYXJrOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTFkXCI7IH1cbi5maS1ib29rOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTFlXCI7IH1cbi5maS1ib29rbWFyazpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjExZlwiOyB9XG4uZmktYnJhaWxsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEyMFwiOyB9XG4uZmktYnVyc3QtbmV3OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTIxXCI7IH1cbi5maS1idXJzdC1zYWxlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTIyXCI7IH1cbi5maS1idXJzdDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEyM1wiOyB9XG4uZmktY2FsZW5kYXI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMjRcIjsgfVxuLmZpLWNhbWVyYTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEyNVwiOyB9XG4uZmktY2hlY2s6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMjZcIjsgfVxuLmZpLWNoZWNrYm94OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTI3XCI7IH1cbi5maS1jbGlwYm9hcmQtbm90ZXM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMjhcIjsgfVxuLmZpLWNsaXBib2FyZC1wZW5jaWw6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMjlcIjsgfVxuLmZpLWNsaXBib2FyZDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEyYVwiOyB9XG4uZmktY2xvY2s6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMmJcIjsgfVxuLmZpLWNsb3NlZC1jYXB0aW9uOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTJjXCI7IH1cbi5maS1jbG91ZDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEyZFwiOyB9XG4uZmktY29tbWVudC1taW51czpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEyZVwiOyB9XG4uZmktY29tbWVudC1xdW90ZXM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMmZcIjsgfVxuLmZpLWNvbW1lbnQtdmlkZW86YmVmb3JlIHsgY29udGVudDogXCJcXGYxMzBcIjsgfVxuLmZpLWNvbW1lbnQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMzFcIjsgfVxuLmZpLWNvbW1lbnRzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTMyXCI7IH1cbi5maS1jb21wYXNzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTMzXCI7IH1cbi5maS1jb250cmFzdDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEzNFwiOyB9XG4uZmktY3JlZGl0LWNhcmQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMzVcIjsgfVxuLmZpLWNyb3A6YmVmb3JlIHsgY29udGVudDogXCJcXGYxMzZcIjsgfVxuLmZpLWNyb3duOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTM3XCI7IH1cbi5maS1jc3MzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTM4XCI7IH1cbi5maS1kYXRhYmFzZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjEzOVwiOyB9XG4uZmktZGllLWZpdmU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxM2FcIjsgfVxuLmZpLWRpZS1mb3VyOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTNiXCI7IH1cbi5maS1kaWUtb25lOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTNjXCI7IH1cbi5maS1kaWUtc2l4OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTNkXCI7IH1cbi5maS1kaWUtdGhyZWU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxM2VcIjsgfVxuLmZpLWRpZS10d286YmVmb3JlIHsgY29udGVudDogXCJcXGYxM2ZcIjsgfVxuLmZpLWRpc2xpa2U6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNDBcIjsgfVxuLmZpLWRvbGxhci1iaWxsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTQxXCI7IH1cbi5maS1kb2xsYXI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNDJcIjsgfVxuLmZpLWRvd25sb2FkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTQzXCI7IH1cbi5maS1lamVjdDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE0NFwiOyB9XG4uZmktZWxldmF0b3I6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNDVcIjsgfVxuLmZpLWV1cm86YmVmb3JlIHsgY29udGVudDogXCJcXGYxNDZcIjsgfVxuLmZpLWV5ZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE0N1wiOyB9XG4uZmktZmFzdC1mb3J3YXJkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTQ4XCI7IH1cbi5maS1mZW1hbGUtc3ltYm9sOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTQ5XCI7IH1cbi5maS1mZW1hbGU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNGFcIjsgfVxuLmZpLWZpbHRlcjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE0YlwiOyB9XG4uZmktZmlyc3QtYWlkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTRjXCI7IH1cbi5maS1mbGFnOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTRkXCI7IH1cbi5maS1mb2xkZXItYWRkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTRlXCI7IH1cbi5maS1mb2xkZXItbG9jazpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE0ZlwiOyB9XG4uZmktZm9sZGVyOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTUwXCI7IH1cbi5maS1mb290OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTUxXCI7IH1cbi5maS1mb3VuZGF0aW9uOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTUyXCI7IH1cbi5maS1ncmFwaC1iYXI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNTNcIjsgfVxuLmZpLWdyYXBoLWhvcml6b250YWw6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNTRcIjsgfVxuLmZpLWdyYXBoLXBpZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE1NVwiOyB9XG4uZmktZ3JhcGgtdHJlbmQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNTZcIjsgfVxuLmZpLWd1aWRlLWRvZzpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE1N1wiOyB9XG4uZmktaGVhcmluZy1haWQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNThcIjsgfVxuLmZpLWhlYXJ0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTU5XCI7IH1cbi5maS1ob21lOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTVhXCI7IH1cbi5maS1odG1sNTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE1YlwiOyB9XG4uZmktaW5kZW50LWxlc3M6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNWNcIjsgfVxuLmZpLWluZGVudC1tb3JlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTVkXCI7IH1cbi5maS1pbmZvOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTVlXCI7IH1cbi5maS1pdGFsaWM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNWZcIjsgfVxuLmZpLWtleTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE2MFwiOyB9XG4uZmktbGFwdG9wOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTYxXCI7IH1cbi5maS1sYXlvdXQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNjJcIjsgfVxuLmZpLWxpZ2h0YnVsYjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE2M1wiOyB9XG4uZmktbGlrZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE2NFwiOyB9XG4uZmktbGluazpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE2NVwiOyB9XG4uZmktbGlzdC1idWxsZXQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNjZcIjsgfVxuLmZpLWxpc3QtbnVtYmVyOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTY3XCI7IH1cbi5maS1saXN0LXRodW1ibmFpbHM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNjhcIjsgfVxuLmZpLWxpc3Q6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNjlcIjsgfVxuLmZpLWxvY2s6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNmFcIjsgfVxuLmZpLWxvb3A6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNmJcIjsgfVxuLmZpLW1hZ25pZnlpbmctZ2xhc3M6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNmNcIjsgfVxuLmZpLW1haWw6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNmRcIjsgfVxuLmZpLW1hbGUtZmVtYWxlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTZlXCI7IH1cbi5maS1tYWxlLXN5bWJvbDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE2ZlwiOyB9XG4uZmktbWFsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE3MFwiOyB9XG4uZmktbWFwOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTcxXCI7IH1cbi5maS1tYXJrZXI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxNzJcIjsgfVxuLmZpLW1lZ2FwaG9uZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE3M1wiOyB9XG4uZmktbWljcm9waG9uZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE3NFwiOyB9XG4uZmktbWludXMtY2lyY2xlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTc1XCI7IH1cbi5maS1taW51czpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE3NlwiOyB9XG4uZmktbW9iaWxlLXNpZ25hbDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE3N1wiOyB9XG4uZmktbW9iaWxlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTc4XCI7IH1cbi5maS1tb25pdG9yOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTc5XCI7IH1cbi5maS1tb3VudGFpbnM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxN2FcIjsgfVxuLmZpLW11c2ljOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTdiXCI7IH1cbi5maS1uZXh0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTdjXCI7IH1cbi5maS1uby1kb2dzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTdkXCI7IH1cbi5maS1uby1zbW9raW5nOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTdlXCI7IH1cbi5maS1wYWdlLWFkZDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE3ZlwiOyB9XG4uZmktcGFnZS1jb3B5OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTgwXCI7IH1cbi5maS1wYWdlLWNzdjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE4MVwiOyB9XG4uZmktcGFnZS1kZWxldGU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxODJcIjsgfVxuLmZpLXBhZ2UtZG9jOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTgzXCI7IH1cbi5maS1wYWdlLWVkaXQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxODRcIjsgfVxuLmZpLXBhZ2UtZXhwb3J0LWNzdjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE4NVwiOyB9XG4uZmktcGFnZS1leHBvcnQtZG9jOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTg2XCI7IH1cbi5maS1wYWdlLWV4cG9ydC1wZGY6YmVmb3JlIHsgY29udGVudDogXCJcXGYxODdcIjsgfVxuLmZpLXBhZ2UtZXhwb3J0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTg4XCI7IH1cbi5maS1wYWdlLWZpbGxlZDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE4OVwiOyB9XG4uZmktcGFnZS1tdWx0aXBsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE4YVwiOyB9XG4uZmktcGFnZS1wZGY6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOGJcIjsgfVxuLmZpLXBhZ2UtcmVtb3ZlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMThjXCI7IH1cbi5maS1wYWdlLXNlYXJjaDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE4ZFwiOyB9XG4uZmktcGFnZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE4ZVwiOyB9XG4uZmktcGFpbnQtYnVja2V0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMThmXCI7IH1cbi5maS1wYXBlcmNsaXA6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOTBcIjsgfVxuLmZpLXBhdXNlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTkxXCI7IH1cbi5maS1wYXc6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOTJcIjsgfVxuLmZpLXBheXBhbDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE5M1wiOyB9XG4uZmktcGVuY2lsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTk0XCI7IH1cbi5maS1waG90bzpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE5NVwiOyB9XG4uZmktcGxheS1jaXJjbGU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOTZcIjsgfVxuLmZpLXBsYXktdmlkZW86YmVmb3JlIHsgY29udGVudDogXCJcXGYxOTdcIjsgfVxuLmZpLXBsYXk6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOThcIjsgfVxuLmZpLXBsdXM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOTlcIjsgfVxuLmZpLXBvdW5kOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTlhXCI7IH1cbi5maS1wb3dlcjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE5YlwiOyB9XG4uZmktcHJldmlvdXM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOWNcIjsgfVxuLmZpLXByaWNlLXRhZzpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjE5ZFwiOyB9XG4uZmktcHJpY2V0YWctbXVsdGlwbGU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxOWVcIjsgfVxuLmZpLXByaW50OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMTlmXCI7IH1cbi5maS1wcm9oaWJpdGVkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWEwXCI7IH1cbi5maS1wcm9qZWN0aW9uLXNjcmVlbjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhMVwiOyB9XG4uZmktcHV6emxlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWEyXCI7IH1cbi5maS1xdW90ZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhM1wiOyB9XG4uZmktcmVjb3JkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWE0XCI7IH1cbi5maS1yZWZyZXNoOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWE1XCI7IH1cbi5maS1yZXN1bHRzLWRlbW9ncmFwaGljczpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhNlwiOyB9XG4uZmktcmVzdWx0czpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhN1wiOyB9XG4uZmktcmV3aW5kLXRlbjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhOFwiOyB9XG4uZmktcmV3aW5kOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWE5XCI7IH1cbi5maS1yc3M6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYWFcIjsgfVxuLmZpLXNhZmV0eS1jb25lOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWFiXCI7IH1cbi5maS1zYXZlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWFjXCI7IH1cbi5maS1zaGFyZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhZFwiOyB9XG4uZmktc2hlcmlmZi1iYWRnZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFhZVwiOyB9XG4uZmktc2hpZWxkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWFmXCI7IH1cbi5maS1zaG9wcGluZy1iYWc6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYjBcIjsgfVxuLmZpLXNob3BwaW5nLWNhcnQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYjFcIjsgfVxuLmZpLXNodWZmbGU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYjJcIjsgfVxuLmZpLXNrdWxsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWIzXCI7IH1cbi5maS1zb2NpYWwtNTAwcHg6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYjRcIjsgfVxuLmZpLXNvY2lhbC1hZG9iZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFiNVwiOyB9XG4uZmktc29jaWFsLWFtYXpvbjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFiNlwiOyB9XG4uZmktc29jaWFsLWFuZHJvaWQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYjdcIjsgfVxuLmZpLXNvY2lhbC1hcHBsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFiOFwiOyB9XG4uZmktc29jaWFsLWJlaGFuY2U6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYjlcIjsgfVxuLmZpLXNvY2lhbC1iaW5nOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWJhXCI7IH1cbi5maS1zb2NpYWwtYmxvZ2dlcjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFiYlwiOyB9XG4uZmktc29jaWFsLWRlbGljaW91czpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFiY1wiOyB9XG4uZmktc29jaWFsLWRlc2lnbmVyLW5ld3M6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYmRcIjsgfVxuLmZpLXNvY2lhbC1kZXZpYW50LWFydDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFiZVwiOyB9XG4uZmktc29jaWFsLWRpZ2c6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYmZcIjsgfVxuLmZpLXNvY2lhbC1kcmliYmJsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFjMFwiOyB9XG4uZmktc29jaWFsLWRyaXZlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWMxXCI7IH1cbi5maS1zb2NpYWwtZHJvcGJveDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFjMlwiOyB9XG4uZmktc29jaWFsLWV2ZXJub3RlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWMzXCI7IH1cbi5maS1zb2NpYWwtZmFjZWJvb2s6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYzRcIjsgfVxuLmZpLXNvY2lhbC1mbGlja3I6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYzVcIjsgfVxuLmZpLXNvY2lhbC1mb3Jyc3Q6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYzZcIjsgfVxuLmZpLXNvY2lhbC1mb3Vyc3F1YXJlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWM3XCI7IH1cbi5maS1zb2NpYWwtZ2FtZS1jZW50ZXI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYzhcIjsgfVxuLmZpLXNvY2lhbC1naXRodWI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxYzlcIjsgfVxuLmZpLXNvY2lhbC1nb29nbGUtcGx1czpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFjYVwiOyB9XG4uZmktc29jaWFsLWhhY2tlci1uZXdzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWNiXCI7IH1cbi5maS1zb2NpYWwtaGk1OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWNjXCI7IH1cbi5maS1zb2NpYWwtaW5zdGFncmFtOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWNkXCI7IH1cbi5maS1zb2NpYWwtam9vbWxhOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWNlXCI7IH1cbi5maS1zb2NpYWwtbGFzdGZtOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWNmXCI7IH1cbi5maS1zb2NpYWwtbGlua2VkaW46YmVmb3JlIHsgY29udGVudDogXCJcXGYxZDBcIjsgfVxuLmZpLXNvY2lhbC1tZWRpdW06YmVmb3JlIHsgY29udGVudDogXCJcXGYxZDFcIjsgfVxuLmZpLXNvY2lhbC1teXNwYWNlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWQyXCI7IH1cbi5maS1zb2NpYWwtb3JrdXQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZDNcIjsgfVxuLmZpLXNvY2lhbC1wYXRoOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWQ0XCI7IH1cbi5maS1zb2NpYWwtcGljYXNhOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWQ1XCI7IH1cbi5maS1zb2NpYWwtcGludGVyZXN0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWQ2XCI7IH1cbi5maS1zb2NpYWwtcmRpbzpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFkN1wiOyB9XG4uZmktc29jaWFsLXJlZGRpdDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFkOFwiOyB9XG4uZmktc29jaWFsLXNraWxsc2hhcmU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZDlcIjsgfVxuLmZpLXNvY2lhbC1za3lwZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFkYVwiOyB9XG4uZmktc29jaWFsLXNtYXNoaW5nLW1hZzpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFkYlwiOyB9XG4uZmktc29jaWFsLXNuYXBjaGF0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWRjXCI7IH1cbi5maS1zb2NpYWwtc3BvdGlmeTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFkZFwiOyB9XG4uZmktc29jaWFsLXNxdWlkb286YmVmb3JlIHsgY29udGVudDogXCJcXGYxZGVcIjsgfVxuLmZpLXNvY2lhbC1zdGFjay1vdmVyZmxvdzpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFkZlwiOyB9XG4uZmktc29jaWFsLXN0ZWFtOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWUwXCI7IH1cbi5maS1zb2NpYWwtc3R1bWJsZXVwb246YmVmb3JlIHsgY29udGVudDogXCJcXGYxZTFcIjsgfVxuLmZpLXNvY2lhbC10cmVlaG91c2U6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZTJcIjsgfVxuLmZpLXNvY2lhbC10dW1ibHI6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZTNcIjsgfVxuLmZpLXNvY2lhbC10d2l0dGVyOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWU0XCI7IH1cbi5maS1zb2NpYWwtdmltZW86YmVmb3JlIHsgY29udGVudDogXCJcXGYxZTVcIjsgfVxuLmZpLXNvY2lhbC13aW5kb3dzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWU2XCI7IH1cbi5maS1zb2NpYWwteGJveDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFlN1wiOyB9XG4uZmktc29jaWFsLXlhaG9vOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWU4XCI7IH1cbi5maS1zb2NpYWwteWVscDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFlOVwiOyB9XG4uZmktc29jaWFsLXlvdXR1YmU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZWFcIjsgfVxuLmZpLXNvY2lhbC16ZXJwbHk6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZWJcIjsgfVxuLmZpLXNvY2lhbC16dXJiOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWVjXCI7IH1cbi5maS1zb3VuZDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFlZFwiOyB9XG4uZmktc3RhcjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFlZVwiOyB9XG4uZmktc3RvcDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFlZlwiOyB9XG4uZmktc3RyaWtldGhyb3VnaDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFmMFwiOyB9XG4uZmktc3Vic2NyaXB0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWYxXCI7IH1cbi5maS1zdXBlcnNjcmlwdDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFmMlwiOyB9XG4uZmktdGFibGV0LWxhbmRzY2FwZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFmM1wiOyB9XG4uZmktdGFibGV0LXBvcnRyYWl0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWY0XCI7IH1cbi5maS10YXJnZXQtdHdvOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWY1XCI7IH1cbi5maS10YXJnZXQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZjZcIjsgfVxuLmZpLXRlbGVwaG9uZS1hY2Nlc3NpYmxlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWY3XCI7IH1cbi5maS10ZWxlcGhvbmU6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZjhcIjsgfVxuLmZpLXRleHQtY29sb3I6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZjlcIjsgfVxuLmZpLXRodW1ibmFpbHM6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZmFcIjsgfVxuLmZpLXRpY2tldDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFmYlwiOyB9XG4uZmktdG9yc28tYnVzaW5lc3M6YmVmb3JlIHsgY29udGVudDogXCJcXGYxZmNcIjsgfVxuLmZpLXRvcnNvLWZlbWFsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjFmZFwiOyB9XG4uZmktdG9yc286YmVmb3JlIHsgY29udGVudDogXCJcXGYxZmVcIjsgfVxuLmZpLXRvcnNvcy1hbGwtZmVtYWxlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMWZmXCI7IH1cbi5maS10b3Jzb3MtYWxsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjAwXCI7IH1cbi5maS10b3Jzb3MtZmVtYWxlLW1hbGU6YmVmb3JlIHsgY29udGVudDogXCJcXGYyMDFcIjsgfVxuLmZpLXRvcnNvcy1tYWxlLWZlbWFsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIwMlwiOyB9XG4uZmktdG9yc29zOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjAzXCI7IH1cbi5maS10cmFzaDpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIwNFwiOyB9XG4uZmktdHJlZXM6YmVmb3JlIHsgY29udGVudDogXCJcXGYyMDVcIjsgfVxuLmZpLXRyb3BoeTpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIwNlwiOyB9XG4uZmktdW5kZXJsaW5lOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjA3XCI7IH1cbi5maS11bml2ZXJzYWwtYWNjZXNzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjA4XCI7IH1cbi5maS11bmxpbms6YmVmb3JlIHsgY29udGVudDogXCJcXGYyMDlcIjsgfVxuLmZpLXVubG9jazpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIwYVwiOyB9XG4uZmktdXBsb2FkLWNsb3VkOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjBiXCI7IH1cbi5maS11cGxvYWQ6YmVmb3JlIHsgY29udGVudDogXCJcXGYyMGNcIjsgfVxuLmZpLXVzYjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIwZFwiOyB9XG4uZmktdmlkZW86YmVmb3JlIHsgY29udGVudDogXCJcXGYyMGVcIjsgfVxuLmZpLXZvbHVtZS1ub25lOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjBmXCI7IH1cbi5maS12b2x1bWUtc3RyaWtlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjEwXCI7IH1cbi5maS12b2x1bWU6YmVmb3JlIHsgY29udGVudDogXCJcXGYyMTFcIjsgfVxuLmZpLXdlYjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIxMlwiOyB9XG4uZmktd2hlZWxjaGFpcjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjIxM1wiOyB9XG4uZmktd2lkZ2V0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjE0XCI7IH1cbi5maS13cmVuY2g6YmVmb3JlIHsgY29udGVudDogXCJcXGYyMTVcIjsgfVxuLmZpLXgtY2lyY2xlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjE2XCI7IH1cbi5maS14OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjE3XCI7IH1cbi5maS15ZW46YmVmb3JlIHsgY29udGVudDogXCJcXGYyMThcIjsgfVxuLmZpLXpvb20taW46YmVmb3JlIHsgY29udGVudDogXCJcXGYyMTlcIjsgfVxuLmZpLXpvb20tb3V0OmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxmMjFhXCI7IH1cbiIsIkBpbXBvcnQgXCJtaXhpbnMvY2FyZFwiO1xuXG4uc2lkZS1uYXYge1xuICAgIEBpbmNsdWRlIGNhcmQ7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG4gICAgbWFyZ2luLXRvcDogMXZoO1xuICAgIHBhZGRpbmc6IDEwcHggMTVweCA1cHggMTVweDtcblxuICAgIC5zaWRlLW5hdi1oZWFkZXIge1xuICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcblxuICAgICAgICAjc2lkZS1uYXYtbG9nbyB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxdmg7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAubWVudSAubWVudS1oZWFkaW5nIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IFxuICAgICAgICA+IGEge1xuICAgICAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAubWVudSB1bCB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG5cbiAgICAgICAgPiBsaSB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDF2dztcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDF2dztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIkBtaXhpbiBjYXJkIHtcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggI2FhYTtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG4iLCJAaW1wb3J0IFwibWl4aW5zL2NhcmRcIjtcblxuLmNvdXJzZS10aXRsZSB7XG4gICAgQGluY2x1ZGUgY2FyZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMnB4IDBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XG5cbiAgICBzcGFuIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBtYXJnaW4tbGVmdDogMTVweDtcbiAgICAgICAgdG9wOiAycHg7XG4gICAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yO1xuICAgICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAuMnM7XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogI0MxRDJERTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIkBpbXBvcnQgXCJtaXhpbnMvY2FyZFwiO1xuXG4ucmVxdWVzdHMtY29udGFpbmVyIHtcbiAgICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi5yZXF1ZXN0LWxpc3Rpbmcge1xuICAgIG1hcmdpbi10b3A6IDVweDtcblxuXG4gICAgJi5jYW5jZWxsZWQge1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjc1cyBlYXNlO1xuICAgICAgICBtYXJnaW4tbGVmdDogMjAwcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogLTIwMHB4O1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgIH1cblxuICAgIC5yb3cge1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIH1cblxuICAgIC5yZXF1ZXN0LWluZm9ybWF0aW9uIHtcbiAgICAgICAgQGluY2x1ZGUgY2FyZDtcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMHB4O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwcHg7XG5cbiAgICAgICAgJi5lZGl0YWJsZSB7XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb2x1bW5zOm50aC1vZi10eXBlKDIpIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMHB4O1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLnJlcXVlc3QtYWN0aW9uLWJhciB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMXZ3O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogLTI1cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IC0yNXB4O1xuXG4gICAgICAgIC5jb2x1bW5zIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGNhcmQ7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAuMmVtIDFlbSAuNGVtIDFlbTtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDBweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogbGFyZ2VyO1xuXG4gICAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLnByaW1hcnkuYnV0dG9uIHtcbiAgICAgICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICY6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAgIG1hcmdpbi10b3A6IDBweDtcbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAzcHg7XG4gICAgfVxuICAgIC5yZXF1ZXN0LW5hbWUge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDsgIFxuICAgIH1cbiAgICAucmVxdWVzdC1sb2NhdGlvbiB7XG4gICAgICAgIGNvbG9yOiBncmV5O1xuICAgICAgICBmb250LXNpemU6IHNtYWxsO1xuICAgIH1cblxuICAgIC5yZXF1ZXN0LWJvdHRvbS1yb3cge1xuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gICAgfVxufVxuXG4ubWFrZS1yZXF1ZXN0LWNvbnRhaW5lciB7XG4gICAgQGluY2x1ZGUgY2FyZDtcbiAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0MwQzBDMDtcbiAgICBwYWRkaW5nOiAxMHB4O1xuXG4gICAgaW5wdXQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMHB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgIH1cblxuICAgIC5pbnB1dC1mb290ZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogLTJweDtcbiAgICAgICAgZm9udC1zaXplOiBzbWFsbGVyO1xuICAgIH1cbiAgICAuY2hhcmFjdGVyLWNvdW50IHtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgICB9XG5cbiAgICAubWFrZS1yZXF1ZXN0LWVycm9yLW1lc3NhZ2Uge1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAucm93LmVycm9yIHtcbiAgICAgICAgbGFiZWwge1xuICAgICAgICAgICAgY29sb3I6IGRhcmtyZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiBkYXJrcmVkO1xuICAgICAgICB9XG4gICAgICAgIC5tYWtlLXJlcXVlc3QtZXJyb3ItbWVzc2FnZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiQUNBQTs7Ozs7R0FLRztBK0RMSDs7OztHQUlHO0FBR0gsVUFBVTtFQUNSLFdBQVcsRUFBRSxrQkFBbUI7RUFDaEMsR0FBRyxFQUFFLDJCQUFHO0VBQ1IsR0FBRyxFQUFFLGtDQUFHLENBQWdDLDJCQUFNLEVBQ3pDLDRCQUFHLENBQTBCLGNBQU0sRUFDbkMsMkJBQUcsQ0FBeUIsa0JBQU0sRUFDbEMsc0NBQUcsQ0FBb0MsYUFBTTtFQUNsRCxXQUFXLEVBQUUsTUFBTztFQUNwQixVQUFVLEVBQUUsTUFBTzs7QUFHckI7Ozs7Ozs7RUFPRTtBQUdGLGdCQUFnQixBQUFBLE9BQU87QUFDdkIsU0FBUyxBQUFBLE9BQU87QUFDaEIsZ0JBQWdCLEFBQUEsT0FBTztBQUN2QixpQkFBaUIsQUFBQSxPQUFPO0FBQ3hCLGNBQWMsQUFBQSxPQUFPO0FBQ3JCLGVBQWUsQUFBQSxPQUFPO0FBQ3RCLFVBQVUsQUFBQSxPQUFPO0FBQ2pCLFlBQVksQUFBQSxPQUFPO0FBQ25CLFdBQVcsQUFBQSxPQUFPO0FBQ2xCLGNBQWMsQUFBQSxPQUFPO0FBQ3JCLGNBQWMsQUFBQSxPQUFPO0FBQ3JCLGVBQWUsQUFB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 */", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "92827f088b9eda87169bdc2b9888ce52.eot";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "data:application/font-woff;base64,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"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e20945d7c929279ef7a6f1db184a4470.ttf";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "17cb1ed2e8467b51bb26cf017daa9722.svg";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var _ = __webpack_require__(11);
	var $ = __webpack_require__(12);

	var School = __webpack_require__(13);
	var CourseView = __webpack_require__(16);
	var AppRouter = __webpack_require__(21);

	var SchoolView = Backbone.View.extend({
	    el: 'body', /** The School is the main view of the app, so it is the root */
	    template: _.template( $( '#school-template' ).html() ),
	    
	    initialize: function( options ) {
	        this.school = new School();
	        this.courseView = new CourseView();
	        this.listenTo( this.school, 'change', this.render );

	        this.school.fetch({
	            /* 
	             * Only bind the router once we have a school, so that we only try to
	             * get a course once we have a school 
	             */
	            success: _.bind( this.initRouter, this )
	        });
	    },
	    initRouter: function() {
	        this.router = new AppRouter();
	        this.router.on( 'route:course', _.bind(function( id ) {
	            this.courseView.trigger( 'newCourse', Number( id ) );
	        }, this ) );
	        Backbone.history.start();
	    },
	    render: function() {
	        this.$el.html( this.template( this.school.attributes ) ); 
	        this.courseView.setElement( this.$el.find( '.main-content' ) );
	        return this;
	    }
	});

	module.exports = SchoolView;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {//     Backbone.js 1.2.3

	//     (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org

	(function(factory) {

	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self == 'object' && self.self == self && self) ||
	            (typeof global == 'object' && global.global == global && global);

	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(12), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore'), $;
	    try { $ = require('jquery'); } catch(e) {}
	    factory(root, exports, _, $);

	  // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
	  }

	}(function(root, Backbone, _, $) {

	  // Initial Setup
	  // -------------

	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;

	  // Create a local reference to a common array method we'll want to use later.
	  var slice = Array.prototype.slice;

	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.2.3';

	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;

	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function() {
	    root.Backbone = previousBackbone;
	    return this;
	  };

	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;

	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;

	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function(length, method, attribute) {
	    switch (length) {
	      case 1: return function() {
	        return _[method](this[attribute]);
	      };
	      case 2: return function(value) {
	        return _[method](this[attribute], value);
	      };
	      case 3: return function(iteratee, context) {
	        return _[method](this[attribute], cb(iteratee, this), context);
	      };
	      case 4: return function(iteratee, defaultVal, context) {
	        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	      };
	      default: return function() {
	        var args = slice.call(arguments);
	        args.unshift(this[attribute]);
	        return _[method].apply(_, args);
	      };
	    }
	  };
	  var addUnderscoreMethods = function(Class, methods, attribute) {
	    _.each(methods, function(length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };

	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
	    return iteratee;
	  };
	  var modelMatcher = function(attrs) {
	    var matcher = _.matches(attrs);
	    return function(model) {
	      return matcher(model.attributes);
	    };
	  };

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length ; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };

	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function(name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };

	  // Guard the `listening` argument from the public API.
	  var internalOn = function(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	        context: context,
	        ctx: obj,
	        listening: listening
	    });

	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }

	    return obj;
	  };

	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo =  function(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
	    }

	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };

	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context, ctx = options.ctx, listening = options.listening;
	      if (listening) listening.count++;

	      handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
	    }
	    return events;
	  };

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off =  function(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	        context: context,
	        listeners: this._listeners
	    });
	    return this;
	  };

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening =  function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }
	    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

	    return this;
	  };

	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function(events, name, callback, options) {
	    if (!events) return;

	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;

	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }

	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];

	      // Bail out if there are no events stored.
	      if (!handlers) break;

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (
	          callback && callback !== handler.callback &&
	            callback !== handler.callback._callback ||
	              context && context !== handler.context
	        ) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }

	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    if (_.size(events)) return events;
	  };

	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once =  function(name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    return this.on(events, void 0, context);
	  };

	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce =  function(obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };

	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function() {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger =  function(name) {
	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

	    eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };

	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function(objEvents, name, cb, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	  };

	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;

	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);

	  // Backbone.Model
	  // --------------

	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.

	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function(attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };

	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {

	    // A hash of attributes whose current and previous value differ.
	    changed: null,

	    // The value returned during the last failed validation.
	    validationError: null,

	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',

	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Return a copy of the model's `attributes` object.
	    toJSON: function(options) {
	      return _.clone(this.attributes);
	    },

	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Get the value of an attribute.
	    get: function(attr) {
	      return this.attributes[attr];
	    },

	    // Get the HTML-escaped value of an attribute.
	    escape: function(attr) {
	      return _.escape(this.get(attr));
	    },

	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function(attr) {
	      return this.get(attr) != null;
	    },

	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },

	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function(key, val, options) {
	      if (key == null) return this;

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});

	      // Run validation.
	      if (!this._validate(attrs, options)) return false;

	      // Extract attributes and options.
	      var unset      = options.unset;
	      var silent     = options.silent;
	      var changes    = [];
	      var changing   = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }

	      var current = this.attributes;
	      var changed = this.changed;
	      var prev    = this._previousAttributes;

	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }

	      // Update the `id`.
	      this.id = this.get(this.idAttribute);

	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }

	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },

	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
	    },

	    // Clear all attributes on the model, firing `"change"`.
	    clear: function(options) {
	      var attrs = {};
	      for (var key in this.attributes) attrs[key] = void 0;
	      return this.set(attrs, _.extend({}, options, {unset: true}));
	    },

	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },

	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },

	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },

	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },

	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var model = this;
	      var success = options.success;
	      options.success = function(resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options = _.extend({validate: true, parse: true}, options);
	      var wait = options.wait;

	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else {
	        if (!this._validate(attrs, options)) return false;
	      }

	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function(resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);

	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

	      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);

	      // Restore attributes.
	      this.attributes = attributes;

	      return xhr;
	    },

	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;

	      var destroy = function() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };

	      options.success = function(resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };

	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },

	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function() {
	      var base =
	        _.result(this, 'urlRoot') ||
	        _.result(this.collection, 'url') ||
	        urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },

	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new model with identical attributes to this one.
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },

	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function() {
	      return !this.has(this.idAttribute);
	    },

	    // Check if the model is currently in a valid state.
	    isValid: function(options) {
	      return this._validate({}, _.defaults({validate: true}, options));
	    },

	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	      return false;
	    }

	  });

	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	      omit: 0, chain: 1, isEmpty: 1 };

	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');

	  // Backbone.Collection
	  // -------------------

	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.

	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function(models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({silent: true}, options));
	  };

	  // Default options for `Collection#set`.
	  var setOptions = {add: true, remove: true, merge: true};
	  var addOptions = {add: true, remove: false};

	  // Splices `insert` into `array` at index `at`.
	  var splice = function(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    for (var i = 0; i < tail.length; i++) tail[i] = array[i + at];
	    for (i = 0; i < length; i++) array[i + at] = insert[i];
	    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {

	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function(options) {
	      return this.map(function(model) { return model.toJSON(options); });
	    },

	    // Proxy `Backbone.sync` by default.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function(models, options) {
	      return this.set(models, _.extend({merge: false}, options, addOptions));
	    },

	    // Remove a model, or a list of models from the set.
	    remove: function(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : _.clone(models);
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed) this.trigger('update', this, options);
	      return singular ? removed[0] : removed;
	    },

	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function(models, options) {
	      if (models == null) return;

	      options = _.defaults({}, options, setOptions);
	      if (options.parse && !this._isModel(models)) models = this.parse(models, options);

	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();

	      var at = options.at;
	      if (at != null) at = +at;
	      if (at < 0) at += this.length + 1;

	      var set = [];
	      var toAdd = [];
	      var toRemove = [];
	      var modelMap = {};

	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;

	      var sort = false;
	      var sortable = this.comparator && (at == null) && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model;
	      for (var i = 0; i < models.length; i++) {
	        model = models[i];

	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;

	        // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }

	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }

	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length != set.length || _.some(this.models, function(model, index) {
	          return model !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }

	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({silent: true});

	      // Unless silenced, it's time to fire all appropriate add/sort events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length) this.trigger('update', this, options);
	      }

	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },

	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({silent: true}, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },

	    // Add a model to the end of the collection.
	    push: function(model, options) {
	      return this.add(model, _.extend({at: this.length}, options));
	    },

	    // Remove a model from the end of the collection.
	    pop: function(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },

	    // Add a model to the beginning of the collection.
	    unshift: function(model, options) {
	      return this.add(model, _.extend({at: 0}, options));
	    },

	    // Remove a model from the beginning of the collection.
	    shift: function(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },

	    // Slice out a sub-array of models from the collection.
	    slice: function() {
	      return slice.apply(this.models, arguments);
	    },

	    // Get a model from the set by id.
	    get: function(obj) {
	      if (obj == null) return void 0;
	      var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
	      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
	    },

	    // Get the model at the given index.
	    at: function(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },

	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },

	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function(attrs) {
	      return this.where(attrs, true);
	    },

	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});

	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },

	    // Pluck an attribute from each model in the collection.
	    pluck: function(attr) {
	      return _.invoke(this.models, 'get', attr);
	    },

	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function(resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function(model, resp, callbackOpts) {
	        if (wait) collection.add(model, callbackOpts);
	        if (success) success.call(callbackOpts.context, model, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },

	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new collection with an identical list of models as this one.
	    clone: function() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },

	    // Define how to uniquely identify models in the collection.
	    modelId: function (attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },

	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function() {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	    },

	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },

	    // Internal method called by both remove and set.
	    _removeModels: function(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;

	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;

	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }

	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed.length ? removed : false;
	    },

	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function (model) {
	      return model instanceof Model;
	    },

	    // Internal method to create a model's ties to a collection.
	    _addReference: function(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },

	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },

	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function(event, model, collection, options) {
	      if ((event === 'add' || event === 'remove') && collection !== this) return;
	      if (event === 'destroy') this.remove(model, options);
	      if (event === 'change') {
	        var prevId = this.modelId(model.previousAttributes());
	        var id = this.modelId(model.attributes);
	        if (prevId !== id) {
	          if (prevId != null) delete this._byId[prevId];
	          if (id != null) this._byId[id] = model;
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = { forEach: 3, each: 3, map: 3, collect: 3, reduce: 4,
	      foldl: 4, inject: 4, reduceRight: 4, foldr: 4, find: 3, detect: 3, filter: 3,
	      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	      sortBy: 3, indexBy: 3};

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');

	  // Backbone.View
	  // -------------

	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.

	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function(options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function(selector) {
	      return this.$el.find(selector);
	    },

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function() {
	      return this;
	    },

	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },

	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function() {
	      this.$el.remove();
	    },

	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },

	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },

	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },

	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },

	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function(tagName) {
	      return document.createElement(tagName);
	    },

	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },

	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function(attributes) {
	      this.$el.attr(attributes);
	    }

	  });

	  // Backbone.sync
	  // -------------

	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function(method, model, options) {
	    var type = methodMap[method];

	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });

	    // Default JSON-request options.
	    var params = {type: type, dataType: 'json'};

	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }

	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }

	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? {model: params.data} : {};
	    }

	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function(xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }

	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }

	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function(xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };

	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };

	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch':  'PATCH',
	    'delete': 'DELETE',
	    'read':   'GET'
	  };

	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function() {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };

	  // Backbone.Router
	  // ---------------

	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function(options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam    = /(\(\?)?:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function(route, name, callback) {
	      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(route, function(fragment) {
	        var args = router._extractParameters(route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },

	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },

	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },

	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route, routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(optionalParam, '(?:$1)?')
	                   .replace(namedParam, function(match, optional) {
	                     return optional ? match : '([^/?]+)';
	                   })
	                   .replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function(param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }

	  });

	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function() {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },

	    // Does the pathname match the root?
	    matchRoot: function() {
	      var path = this.decodeFragment(this.location.pathname);
	      var root = path.slice(0, this.root.length - 1) + '/';
	      return root === this.root;
	    },

	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },

	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the pathname and search params, without the root.
	    getPath: function() {
	      var path = this.decodeFragment(
	        this.location.pathname + this.getSearch()
	      ).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },

	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, this.options, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.history && this.history.pushState);
	      this._usePushState    = this._wantsPushState && this._hasPushState;
	      this.fragment         = this.getFragment();

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var root = this.root.slice(0, -1) || '/';
	          this.location.replace(root + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;

	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), {replace: true});
	        }

	      }

	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }

	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function (eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function (eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };

	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }

	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }

	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();

	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }

	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};

	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');

	      // Don't include a trailing slash on the root.
	      var root = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        root = root.slice(0, -1) || '/';
	      }
	      var url = root + fragment;

	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow))) {
	          var iWindow = this.iframe.contentWindow;

	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }

	          this._updateHash(iWindow.location, fragment, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });

	  // Create the default Backbone.history.
	  Backbone.history = new History;

	  // Helpers
	  // -------

	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function(protoProps, staticProps) {
	    var parent = this;
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent` constructor function.
	    var Surrogate = function(){ this.constructor = child; };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;

	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) _.extend(child.prototype, protoProps);

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function() {
	    throw new Error('A "url" property or function must be specified');
	  };

	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function(model, options) {
	    var error = options.error;
	    options.error = function(resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };

	  return Backbone;

	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.0
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-01-08T20:02Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.0",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if ( document.msFullscreenElement && window.top !== window ) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if ( elem.getClientRects().length ) {
				val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					// Support: IE<11
					// option.value not trimmed (#14858)
					return jQuery.trim( elem.value );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
								jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true

					// Previously, `originalEvent: {}` was set here, so stopPropagation call
					// would not be triggered on donor event, since in our own
					// jQuery.event.stopPropagation function we had a check for existence of
					// originalEvent.stopPropagation method, so, consequently it would be a noop.
					//
					// But now, this "simulate" function is used only for events
					// for which stopPropagation() is noop, so there is no need for that anymore.
					//
					// For the compat branch though, guard for "click" and "submit"
					// events is still used, but was moved to jQuery.event.stopPropagation function
					// because `originalEvent` should point to the original event for the constancy
					// with other events and for more focused logic
				}
			);

			jQuery.event.trigger( e, null, elem );

			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8+
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = context || ( support.createHTMLDocument ?
			document.implementation.createHTMLDocument( "" ) :
			document );

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				// Subtract offsetParent scroll positions
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
					offsetParent.scrollTop();
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
					offsetParent.scrollLeft();
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var CourseCollection = __webpack_require__(14);

	var School = Backbone.Model.extend({
	    url: '/api/v3/school/',
	    save: function() {
	       /* noop for schools, since they can't be changed. */ 
	    },

	    initialize: function( attributes, options ) {
	        this.courseCollection = new CourseCollection();
	        this.listenTo( this, 'change:courses', this.courseListChanged );
	    },

	    courseListChanged: function( newCourses ) {
	        this.courseCollection.add( newCourses, { 'merge': true } );
	    }

	});

	module.exports = School;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var Course = __webpack_require__(15);

	var CourseCollection = Backbone.Collection.extend({
	    url: '/api/v3/school/courses',
	    model: Course,
	});

	module.exports = CourseCollection;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);

	var Course = Backbone.Model.extend({
	    urlRoot: '/api/v3/school/courses',
	    save: function() {
	        /* noop for courses, since they can't be changed */
	    },
	    initialize: function( attributes, options ) {},
	});

	module.exports = Course;



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var _ = __webpack_require__(11);
	var $ = __webpack_require__(12);

	var Course = __webpack_require__(15);
	var Requests = __webpack_require__(17);
	var RequestView = __webpack_require__(19);
	var MakeRequestView = __webpack_require__(20);

	var CourseView = Backbone.View.extend({
	    template: _.template( $( '#course-template' ).html() ),
	    initialize: function( options ) {
	        this.course = new Course();
	        this.requests = new Requests();
	        this.makeRequestView = new MakeRequestView();

	        this.listenTo( this.course, 'change:id', this.fetchCourse );
	        this.listenTo( this.course, 'change:name', this.render );
	        this.listenTo( this.requests, 'reset', this.renderAllRequests );
	        this.listenTo( this.requests, 'add', this.renderRequest );

	        this.listenTo( this, 'newCourse', this.newCourse );
	    },
	    fetchCourse: function() {
	        this.course.fetch( {
	            success: _.bind(function( course ) {
	                this.requests.trigger( 'resetCourse', course.get( 'id' ) );
	            }, this )
	        } );
	    },
	    newCourse: function( courseID ) {
	        this.course.set( { 'id': courseID } );
	    },
	    renderRequest: function( request ) {
	        var requestElement = new RequestView( { model: request } );
	        this.requestsContainer.append( requestElement.render().el );
	    },
	    renderAllRequests: function() {
	        console.log( 'Render all requests for course ', this.course.get( 'name' ) );
	        this.requestsContainer.empty();
	        this.requests.each( this.renderRequest, this );
	    },
	    render: function() {
	        this.$el.html( this.template( this.course.attributes ) );
	        this.requestsContainer = this.$el.find( $( '.requests-container' ) );
	        this.makeRequestView.setElement( this.$el.find( '.make-request-container' ) );
	        this.makeRequestView.render();
	        return this;
	    }
	});

	module.exports = CourseView;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var Request = __webpack_require__(18);

	var Requests = Backbone.Collection.extend({
	    model: Request,
	    initialize: function(initialModels, options) {
	        this.listenTo( this, 'resetCourse', this.resetCourse );
	    },
	    resetCourse: function( resetCourseID ) {
	        this.courseID = resetCourseID;
	        this.fetch( { reset: true } );
	    },
	    url: function() {
	        return '/api/v3/school/courses/' + this.courseID + '/requests/';
	    },
	    comparator: function ( request ) {
	        return request.get( 'when_asked' );
	    }
	});

	module.exports = Requests;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);

	var Request = Backbone.Model.extend( {
	    defaults: {
	        editable: true
	    }
	} );

	module.exports = Request;



/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var _ = __webpack_require__(11);
	var $ = __webpack_require__(12);

	var RequestView = Backbone.View.extend({
	    className: 'request-listing',
	    template: _.template( $( '#request-listing-template' ).html() ),
	    events: {
	        'click .primary.button': 'cancel'
	    },
	    cancel: function() {
	        // this.remove();
	        // this.model.trigger( 'destroy' );
	        var view = this;
	        var transitionFinishedEvents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
	        this.$el.addClass( 'cancelled' )
	            .on( transitionFinishedEvents, function() {
	                $(this).height($(this).height());
	                $(this).height(0).css({'margin':'0'}).on( transitionFinishedEvents, function() {
	                    // $(this).css({'display': 'none'});
	                    view.remove();
	                } );
	            } );
	    },
	    render: function() {
	        this.$el.html( this.template( this.model.attributes ) ); 
	        return this;
	    }
	});

	module.exports = RequestView;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);
	var _ = __webpack_require__(11);
	var $ = __webpack_require__(12);

	var MakeRequestView = Backbone.View.extend({
	    template: _.template( $( '#make-request-remplate' ).html() ),
	    events: {
	        'keyup .problem-input': 'problemChanged',
	        'keyup .location-input': 'locationChanged',
	    },
	    problemChanged: function() {
	        this.problemCharCount.text( this.problemInput.val().length );
	    },
	    locationChanged: function() {
	        this.locationCharCount.text( this.locationInput.val().length );
	    },
	    render: function() {
	        this.$el.html( this.template() );

	        this.problemInput = this.$el.find( '.problem-input' );
	        this.problemCharCount = this.$el.find( '.problem-char-count' );

	        this.locationInput = this.$el.find( '.location-input' );
	        this.locationCharCount = this.$el.find( '.location-char-count' );

	        return this;
	    }
	});

	module.exports = MakeRequestView;



/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(10);

	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "course/:id": "course",
	    },
	});

	module.exports = AppRouter;


/***/ }
/******/ ]);