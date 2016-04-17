
"use strict";

var fs = require ('fs');
var _ = require ('lodash');
var mkdirp = require ('mkdirp');
var path = require ('path');

var CONFIG = 'source/config';

module.exports = function(grunt) {

  var TARGET = grunt.cli.tasks[0];

  var manifest = require ('./manifest.json');

  var tasks = {
    jshint: {
      files: ['Gruntfile.js', 'source/**/*.js', '!source/public/blockly/**/*.js', '!source/public/documentation/**/*.js', '!source/public/tools/snippets/**/*.js', '!source/interpreter.js'],
      options: {
        jquery:true,
        esnext: true,
        node: true,
        globals: {
          chrome: true,
          window: true,
          document: true,
          DEBUG: true,
          Blob: true,
          FileReader: true,
          navigator: true
        }
      }
    },
    browserify: {
      client: {
        files: {
          'build/wyliodrin.js': ['source/**/*.js', '!source/public/**'],
          'build/public/wyliodrin.js': ['source/public/**/*.js', '!source/public/blockly/**/*.js', '!source/public/documentation/**/*.js', '!source/public/tools/snippets/**/*.js']
        },
        options: {
          browserifyOptions: {
            debug: process.env.DEBUG_WYLIODRIN && process.env.DEBUG_WYLIODRIN !== ''
          },
          transform: [
                  ["babelify", { "presets": ["es2015"], "ignore":/.*\/bower_components\/.*/ }],
                  ["brfs", {}]
               ],
          insertGlobalVars: {
            DEBUG: function (file, dir)
            {
              return "'wyliodrin:*'";
            }
          }
        }
      },
      visualproject: {
        files: {
          'build/public/blockly/blockly.js': ['source/public/blockly/blockly.js']
        },
        options: {
          transform: [
                  ["brfs", {}]
               ],
        }
      }
    },
    ngAnnotate:
    {
      files: {
        src: 'build/public/wyliodrin.js',
        dest: 'build/public/wyliodrin.js'
      }
    },
    compress: {
      publish: {
        options: {
          archive: 'publish/publish-'+manifest.version+'.zip'
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: 'publish/'}, // makes all src relative to cwd
        ]
      }
    },
    htmlmin: {
      client:
      {
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'build/',      // Src matches are relative to this path.
            src: ['**/*.html'], // Actual pattern(s) to match.
            dest: 'build/',   // Destination path prefix.
            ext: '.html',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ]
      }
    },
    clean:
    {
      client: [CONFIG, 'build']
    },
    less:
    {
      wyliodrin:
      {
        files: {
          'build/public/style/wyliodrin.css': 'source/public/style/**/*.less'
        }
      },
      blockly:
      {
        files: {
          'build/public/blockly/blockly-style.css': 'source/public/blockly/*.less'
        }
      }
    },
    cssmin: {
      client:
      {
        options: {
          keepSpecialComments: false
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'build/',      // Src matches are relative to this path.
            src: ['**/*.css'], // Actual pattern(s) to match.
            dest: 'build/',   // Destination path prefix.
            ext: '.css',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ]
      }
    },
    copy:
    {
      client:
      {
        files: [
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/**/*.html', '!public/documentation/**'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            },
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/drawable/**'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            },
            /*{
              expand: true,     // Enable dynamic expansion.
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/translations/**'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            }, */
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/blockly/**', '!public/blockly/blockly.js'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            },
            {
              expand: true,     // Enable dynamic expansion.
              cwd: '',      // Src matches are relative to this path.
              src: ['manifest.json', 'wyliodrin-studio-icon.png', 'LICENSE'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            },
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/documentation/**/*'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            }
          ]
      }
    },
    uglify: {
      client:
      {
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'build/',      // Src matches are relative to this path.
            src: ['public/**/*.js', '!public/blockly/blockly/**'], // Actual pattern(s) to match.
            dest: 'build/',   // Destination path prefix.
            ext: '.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ]
      }
    }
  };

  tasks.watch = {
      style_wyliodrin:
      {
        files: tasks.less.wyliodrin.files['build/public/style/wyliodrin.css'],
        tasks: ['less:wyliodrin', 'copy']
      },
      style_blockly:
      {
        files: tasks.less.blockly.files['build/public/blockly/blockly-style.css'],
        tasks: ['less:blockly', 'copy']
      },
      source:
      {
        files: ['source/**/*.js', '!source/public/blockly/**/*.js', '!source/public/documentation/**/*'],
        tasks: ['default']  
      },
      blockly:
      {
        files: ['source/public/blockly**/*.js'],
        tasks: ['jshint', 'browserify:visualproject', 'copy']  
      },
      html:
      {
        files: [tasks.copy.client.files[0].cwd+tasks.copy.client.files[0].src[0], tasks.copy.client.files[1].cwd+tasks.copy.client.files[1].src, tasks.copy.client.files[4].cwd+tasks.copy.client.files[4].src[0], tasks.copy.client.files[4].cwd+tasks.copy.client.files[4].src[1]],
        tasks: ['copy']
      }
    };

  grunt.initConfig(tasks);

  grunt.registerTask ('mixpanel', 'Mixpanel', function ()
  {
    mkdirp.sync (CONFIG);
    var MIXPANEL_DEBUG = '';
    if (!process.env.MIXPANEL_WYLIODRIN)
    {
      if (TARGET === 'publish') grunt.fail.warn ('Please provide the environment variable MIXPANEL_WYLIODRIN');
      process.env.MIXPANEL_WYLIODRIN = MIXPANEL_DEBUG;
    }
    fs.writeFileSync (CONFIG+'/mixpanel.js', '"use strict";\n module.exports = \''+process.env.MIXPANEL_WYLIODRIN+'\';');
  });

  grunt.registerTask ('debug', 'Debug', function ()
  {
    mkdirp.sync (CONFIG);
    if (!process.env.DEBUG_WYLIODRIN) process.env.DEBUG_WYLIODRIN = '';
    else if (TARGET === 'publish') grunt.fail.warn ('Please erase the environment variable DEBUG_WYLIODRIN');
    fs.writeFileSync (CONFIG+'/debug.js', '"use strict";\n module.exports = \''+process.env.DEBUG_WYLIODRIN+'\';');
  });

  grunt.registerTask ('makefile', 'Makefile', function ()
  {
    var MAKEFILE_FOLDER = 'source/embedded';
    var listmakefile = fs.readdirSync (MAKEFILE_FOLDER);
    var makefile = {};
    _.each (listmakefile, function (mf)
    {
      if (mf.startsWith ('Makefile'))
      {
        var ln = path.extname (mf).substring (1);
        console.log ('makefile '+ln);
        makefile[ln] = fs.readFileSync (MAKEFILE_FOLDER+'/'+mf).toString ();
      }
    });
    mkdirp.sync (CONFIG);
    fs.writeFileSync ('source/config/makefile.js', '"use strict";\n module.exports = '+JSON.stringify (makefile)+';');
  });

  grunt.registerTask ('example', 'Example', function ()
  {
    var EXAMPLE_FOLDER_SOFTWARE = 'source/embedded/example/software';
    var example = {
      'software':{},
      'firmware':{},
      'start':{}
    };
    var listsoftware = fs.readdirSync (EXAMPLE_FOLDER_SOFTWARE);
    _.each (listsoftware, function (software)
    {
      if (software[0]!=='.')
      {
        example.software[software] = {};
        var examplefile = fs.readdirSync (EXAMPLE_FOLDER_SOFTWARE+'/'+software);
        _.each (examplefile, function (file)
        {
          if (file[0]!=='.')
          {
            try
            {
              var project = path.basename (file, '.wylioapp');
              console.log (project);
              if (project.startsWith('start-'))
              {
                console.log (project);
                if (!example.start[software]) example.start[software] = {};
                example.start[software][project.substring(6)] = JSON.parse(fs.readFileSync (EXAMPLE_FOLDER_SOFTWARE+'/'+software+'/'+file).toString());
              }
              else
              {
                example.software[software][project] = JSON.parse(fs.readFileSync (EXAMPLE_FOLDER_SOFTWARE+'/'+software+'/'+file).toString());
              }
            }
            catch (e)
            {
              console.log (e);
            }
          }
        });
      }
    });
    var EXAMPLE_FOLDER_FIRMWARE = 'source/embedded/example/firmware';
    var listfirmware = fs.readdirSync (EXAMPLE_FOLDER_FIRMWARE);
    _.each (listfirmware, function (firmware)
    {
      if (firmware[0]!=='.')
      {
        example.firmware[firmware] = {};
        var examplefolder = fs.readdirSync (EXAMPLE_FOLDER_FIRMWARE+'/'+firmware);
        _.each (examplefolder, function (folder)
        {
          if (folder[0]!=='.')
          {
            example.firmware[firmware][folder] = {};
            var examplefile = fs.readdirSync (EXAMPLE_FOLDER_FIRMWARE+'/'+firmware+'/'+folder);
            _.each (examplefile, function (file)
            {
              if (file[0]!=='.')
              {
                example.firmware[firmware][folder][file] = fs.readFileSync (EXAMPLE_FOLDER_FIRMWARE+'/'+firmware+'/'+folder+'/'+file+'/'+file+'.ino').toString();
              }
            });
          }
        });
      }
    });
    mkdirp.sync (CONFIG);
    fs.writeFileSync (CONFIG+'/example.js', '"use strict";\n module.exports = '+JSON.stringify (example)+';');
  });

  grunt.registerTask ('install', 'Install', function ()
  {
    var INSTALL_FOLDER = 'source/embedded/install';
    var listinstall = fs.readdirSync (INSTALL_FOLDER);
    var install = {};
    _.each (listinstall, function (installfile)
    {
      if (path.extname (installfile) === '.sh')
      {
        install[path.basename(installfile, '.sh')] = fs.readFileSync (INSTALL_FOLDER+'/'+installfile).toString();  
        install[path.basename(installfile, '.sh')] = install[path.basename(installfile, '.sh')].replace (/\r?\n/g, ' ');
        console.log ('Install: '+path.basename(installfile, '.sh'));
      }      
    });
    mkdirp.sync (CONFIG);
    fs.writeFileSync (CONFIG+'/install.js', '"use strict";\n module.exports = '+JSON.stringify (install)+';');
  });


  grunt.registerTask ('languages', 'Languages', function ()
  {
    var TRANSLATION_READ = 'source/public/translations/';
    var TRANSLATION_WRITE = 'build/public/translations/';
    var languageList = fs.readdirSync (TRANSLATION_READ);

    var result = {};

    _.forEach (languageList, function(file)
       {
        var fileTranslated = path.basename( file, '.json' );
        if (fileTranslated.startsWith('messages-'))
        {
          var newObject = {};

          _.forEach( require('./'+TRANSLATION_READ+fileTranslated), function( value, key ) {
            newObject[key] = value.message;
          });

          result[fileTranslated.substring(9)] = JSON.parse(fs.readFileSync(path.join(TRANSLATION_READ,file)).toString()).LANGUAGE.message;
          console.log ('Language ' + fileTranslated.substring(9).toString() + ' added.');

          mkdirp.sync(TRANSLATION_WRITE);
          fs.writeFileSync( './'+TRANSLATION_WRITE+"locale-"+fileTranslated.substring(9)+".json", JSON.stringify (newObject));     
        }
       });

    mkdirp.sync (CONFIG);
    fs.writeFileSync ('source/config/languages.js', '"use strict";\n module.exports = '+JSON.stringify (result)+';');  
  });

  grunt.registerTask ('locale', 'Locale', function ()
  {
    var TRANSLATION_FOLDER = 'source/public/translations';

    var languagelist = fs.readdirSync (TRANSLATION_FOLDER);

    _.each (languagelist, function(file)
    {
      var filename = path.basename(file, '.json');
      if (filename.startsWith('messages-'))
      {
        var language = JSON.parse(fs.readFileSync(path.join(TRANSLATION_FOLDER,file)).toString());
        console.log ('Locale ' + filename.substring(9).toString() + ' added.');
        mkdirp.sync ('build/_locales/'+filename.substring(9));
        fs.writeFileSync ('build/_locales/'+filename.substring(9)+'/messages.json', JSON.stringify ({
          appName:
          {
            message:language.appName.message
          },
          appDesc:
          {
            message:language.appDesc.message
          }
        }, null, 2));
      }
    });
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('publish', ['clean', 'default', 'cssmin', 'uglify', 'htmlmin', 'compress']);

  grunt.registerTask('default', ['mixpanel', 'debug', 'makefile', 'languages', 'example', 'install', 'jshint', 
    'browserify',
    'ngAnnotate',
    'copy',
    'less',
    'locale', 
    // 'cssmin',
    // 'uglify',
    // 'htmlmin'
    ]);

};