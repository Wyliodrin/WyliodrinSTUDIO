'use strict';

var angular = require ('angular');
var settings = require ('settings');

var library = require ('library');
var mixpanel = require ('mixpanel');

require ('debug').enable (settings.debug);

var debug = require ('debug')('wyliodrin:lacy:translation');

var _ = require ('lodash');

debug ('Loading');

module.exports = function ()
{

	var app = angular.module ('wyliodrinApp');

	//taking language list 
	var available = settings.TRANSLATE;
  // console.log (available);


	app.config(function ($translateProvider) {

    // $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.useStaticFilesLoader({
    files: [{
        prefix: '../translations/locale-',
        suffix: '.json'
        }]
    });

    $translateProvider
      .uniformLanguageTag('bcp47')

      //languages in bcp-47 (standard) format are formed from two parts:
      //language and geolocation of respective language
      //using both we can pinpoint to a certain file to pertain
      //to specific irregularities of languages


     //  .registerAvailableLanguageKeys(['en', 'de'], {
	    // 'en-US': 'en',
     //    'en-UK': 'en',
     //    'de-DE': 'de',
     //    'de-CH': 'de'
     //  })
      //.registerAvailableLanguageKeys(['en', 'de'], {
	  //  'en-*': 'en',
      //  'de-*': 'de'
      //})
      .determinePreferredLanguage();

    //$translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');

    });



    app.controller('TranslateController', function ($translate, $scope) {

      $scope.available = available;
      $scope.language = {
        code: $translate.use (),
        title: available[$translate.use ()]
      };

      var that = this;

      library.retrieveValue ('language', null, function (language)
      {
        if (language)
        {
          // mixpanel.language (language);
          that.changeLanguage (language);
        }
        else
        {
          mixpanel.language ($translate.use ());
        }
      });

      // console.log (available);
      this.changeLanguage = function (langKey) {
            $translate.use(langKey);
            var languagecode = $translate.proposedLanguage() || $translate.use();
            console.log (languagecode);
            // $timeout (function ()
            // {
              $scope.language = {
                code: languagecode,
                title: available[languagecode]
              };
            // });
            mixpanel.language (langKey);
            library.storeValue ('language', languagecode);
          };
    });


};