// ==UserScript==
// @id quickCopyPortalMeowth
// @name IITC Plugin: Quick Copy Meowth POI Command
// @category Tweaks
// @version 0.0.1
// @namespace
// @description Copies the command to add a Gym to Meowth with one click
// @author forked from Forte and Sunkast
// @updateURL      https://github.com/typographynerd/iitc-plugins/raw/master/meowth/quickcopypokenavpoicommand.user.js
// @downloadURL    https://github.com/typographynerd/iitc-plugins/raw/master/meowth/quickcopypokenavpoicommand.user.js
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

// Wrapper function that will be stringified and injected
// into the document. Because of this, normal closure rules
// do not apply here.
function wrapper(plugin_info) {
    // Make sure that window.plugin exists. IITC defines it as a no-op function,
    // and other plugins assume the same.
    if (typeof window.plugin !== 'function') window.plugin = function() {};

    // Use own namespace for plugin
    window.plugin.CopytoClipboardMeowth = function() {};

    // Name of the IITC build for first-party plugins
    plugin_info.buildName = 'CopytoClipboardMeowth';

    // Datetime-derived version of the plugin
    plugin_info.dateTimeVersion = '20190101000000';

    // ID/name of the plugin
    plugin_info.pluginId = 'pokenavpoimanagement';

    // The entry point for this plugin.
    function setup() {
      var QCPNotifcationM = '.QCPNotificationM{width:200px;height:20px;height:auto;position:absolute;left:50%;margin-left:-100px;top:20px;z-index:10000;background-color: #383838;color: #F0F0F0;font-family: Calibri;font-size: 20px;padding:10px;text-align:center;border-radius: 2px;-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);}';
      $('head').append("<style>" + QCPNotifcationM + "</style>");

      var titleCSS = '.title{cursor:pointer;}';
      $('head').append("<style>" + titleCSS + "</style>");

      $('body').append("<div class='QCPNotificationM' style='display:none'>Data Copied</div>");

      window.addHook('portalDetailsUpdated', window.plugin.CopytoClipboardMeowth.addButton);
    };

    // Future functionality
    window.plugin.CopytoClipboardMeowth.addButton = function() {
    $('.linkdetails').append('<aside><a href="#" onclick="window.plugin.CopytoClipboardMeowth.copyPortalAssistBot()">Meowth Gym Command</a></aside>');
    $('.linkdetails').append('<aside><a href="#" onclick="window.plugin.CopytoClipboardMeowth.copyAllData()">Meowth PokeStop Command</a></aside>');
    };

    window.plugin.CopytoClipboardMeowth.copyPortalAssistBot = function() {
      var portalData = window.portals[window.selectedPortal].options.data;
      var p_name = portalData.title;
      var p_latE6 = portalData.latE6;
      var p_lngE6 = portalData.lngE6;
      var p_lat =portalData.latE6 / 1E6;
      var p_lng = portalData.lngE6 / 1E6;
      var is_ex = document.getElementById('PogoGymEx');

      var convenientGoogleMapsURL = 'http://maps.google.com/?ll=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6 + '&q=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6;
      var convenientIntelURL= 'https://www.ingress.com/intel?ll=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6 + '&q=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6;


       if(is_ex && is_ex.checked){
	  var PortalAssistBottext ='!addexraidgym "' + p_name + '" ' + p_lat + ' ' + p_lng + '';
  }
	else
      {var PortalAssistBottext ='!addgym "' + p_name + '" ' + p_lat + ' ' + p_lng + '';}

      //$('body').append('<textarea class="portal-name-textarea">' + p_name + '&#10;' + convenientGoogleMapsURL + '&#10;' + convenientIntelURL + '&#10;' + PortalAssistBot + '</textarea>');
      //$('body').append('<textarea class="portal-name-textarea">' + PortalAssistBot + '&#10;' + p_name + '&#10;' + convenientGoogleMapsURL + '&#10;' + convenientIntelURL + '</textarea>');

      $('body').append('<textarea class="portal-name-textarea">' + PortalAssistBottext + '</textarea>');
      $('.portal-name-textarea').select();
      document.execCommand('copy');
      $('.portal-summary-textarea').remove();
      $('.QCPNotificationM').fadeIn(400).delay(3000).fadeOut(400);
    };

      window.plugin.CopytoClipboardMeowth.copyAllData = function() {
      var portalData = window.portals[window.selectedPortal].options.data;
      var p_name = portalData.title;
      var p_latE6 = portalData.latE6;
      var p_lngE6 = portalData.lngE6;
      var p_lat =portalData.latE6 / 1E6;
      var p_lng = portalData.lngE6 / 1E6;


      var convenientGoogleMapsURL = 'GMAPS: http://maps.google.com/?ll=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6 + '&q=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6;
      var convenientIntelURL= 'INTEL: https://www.ingress.com/intel?ll=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6 + '&q=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6;
      var applemapsurl = 'APPLE: https://maps.apple.com/?ll=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6 + '&q=' + p_latE6 / 1E6 + ',' + p_lngE6 / 1E6;

      var PortalAssistBottext ='!addgym "' + p_name + '" ' + p_lat + ' ' + p_lng + '';

      $('body').append('<textarea class="portal-name-textarea">' + '!addstop "' + p_name + '" ' + p_lat + ' ' + p_lng + '</textarea>');
      $('.portal-name-textarea').select();
      document.execCommand('copy');
      $('.portal-summary-textarea').remove();
      $('.QCPNotificationM').fadeIn(400).delay(3000).fadeOut(400);
    };

    // Add an info property for IITC's plugin system
    setup.info = plugin_info;

    // Make sure window.bootPlugins exists and is an array
    if (!window.bootPlugins) window.bootPlugins = [];
    // Add our startup hook
    window.bootPlugins.push(setup);
    // If IITC has already booted, immediately run the 'setup' function
    if (window.iitcLoaded && typeof setup === 'function') setup();
  }


  // Create a script element to hold our content script
  var script = document.createElement('script');
  var info = {};

  // GM_info is defined by the assorted monkey-themed browser extensions
  // and holds information parsed from the script header.
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
    info.script = {
      version: GM_info.script.version,
      name: GM_info.script.name,
      description: GM_info.script.description
    };
  }

  // Create a text node and our IIFE inside of it
  var textContent = document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ')');
  // Add some content to the script element
  script.appendChild(textContent);
  // Finally, inject it... wherever.
  (document.body || document.head || document.documentElement).appendChild(script);
