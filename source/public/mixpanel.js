
"use strict";

var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:mixpanel');
var api = 'https://api.mixpanel.com';
var uuid = require ('uuid');
var _ = require ('lodash');
var $ = require ('jquery');
var app = window.app = window.app || {};
var library = require ('library');

var mixpanel = {};

var ln = null;

library.retrieveValue ('usage', true, function (value)
{
  debug ('Usage '+value);
  global.usage = value;
});

function init(token, userid) {
  debug ('startup');
  if (token && token !== '')
  {
    mixpanel.token = token;
    mixpanel.distinct_id = userid;

    var payload = {
      $token: mixpanel.token,
      $distinct_id: userid,
      $set_once: {
        $name: userid,
      }
    };

    if (settings.platform.CHROME)
    {
      chrome.runtime.getPlatformInfo (function (system)
      {
        mixpanel.os = system.os;
        mixpanel.architecture = system.arch;
        payload.$set_once.$os = mixpanel.os;
        payload.version = settings.VERSION;
        payload.ui_lang = ln;
        var data = new Buffer (JSON.stringify(payload)).toString ('base64');
        var url = api + '/engage?data=' + data;

        $.get(url);
      });
    }
  }
}

function track(event, properties) {
  debug (event);
  if (userid && global.usage && mixpanel.token)
  {
    var payload = {
        event: event,
        properties: _.assign ({
            distinct_id: mixpanel.distinct_id,
            token: mixpanel.token,
            version: settings.VERSION,
            $os: mixpanel.os,
            architecture: mixpanel.architecture,
            ui_lang: ln?ln:'en'
            // browser: app.browser.name
        }, 
        properties)
    };

    var data = new Buffer (JSON.stringify(payload)).toString ('base64');
    var url = api + '/track?data=' + data;

    $.get(url);
  }
}

function language (l)
{
  ln = l;
}

var userid = null;
library.retrieveValue ('userid', uuid.v4(), function (user)
{
  userid = user;
  if (userid) init (settings.MIXPANEL, userid);
});

mixpanel.init = init;
mixpanel.track = track;
mixpanel.language = language;

module.exports = mixpanel;
