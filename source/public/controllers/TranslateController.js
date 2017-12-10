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


	app.config(function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
    files: [{
        prefix: '../translations/locale-',
        suffix: '.json'
        }]
    });

    $translateProvider
      .uniformLanguageTag('bcp47')

      .determinePreferredLanguage();

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
          that.changeLanguage (language);
        }
        else
        {
          mixpanel.language ($translate.use ());
        }
      });

      this.changeLanguage = function (langKey) {
            $translate.use(langKey);
            var languagecode = $translate.proposedLanguage() || $translate.use();
            console.log (languagecode);
              $scope.language = {
                code: languagecode,
                title: available[languagecode]
              };
            mixpanel.language (langKey);
            library.storeValue ('language', languagecode);
          };
    });


};