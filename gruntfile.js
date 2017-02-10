
"use strict";

var fs = require ('fs');
var _ = require ('lodash');
var mkdirp = require ('mkdirp');
var path = require ('path');

var CONFIG = 'source/config';

module.exports = function(grunt) {

  var TARGET = grunt.cli.tasks[0];

  var manifest = require ('./manifest.json');

  var pack = grunt.file.readJSON('package.json');

  var libs = _.keys (pack.dependencies);
  libs.push ('settings');

  // console.log (libs);

  var tasks = {
    jshint: {
      files: ['Gruntfile.js', 'source/**/*.js', '!source/public/blockly/**/*.js', '!source/public/red/**/*.js', '!source/public/documentation/**/*.js', '!source/public/tools/snippets/**/*.js', '!source/chrome/interpreter.js'],
      options: {
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
      chrome:
      {
        files: {
          'build/wyliodrin.js': ['source/chrome/app.js']
        },
        options: {
          external: null,
          browserifyOptions: {
            debug: process.env.DEBUG_WYLIODRIN && process.env.DEBUG_WYLIODRIN !== ''
          },
          transform: [
                  ["babelify", { "presets": ["es2015"], "ignore":/.*\/bower_components\/.*/ }],
                  ["brfs", {}]
               ]
        }
      },
      client: {
        files: {
          'build/public/wyliodrin.js': ['source/public/wyliodrin.js']
        },
        options: {
          browserifyOptions: {
            debug: process.env.DEBUG_WYLIODRIN && process.env.DEBUG_WYLIODRIN !== ''
          },
          transform: [
                  ["babelify", { "presets": ["es2015"], "ignore":/.*\/bower_components\/.*/ }],
                  ["brfs", {}]
               ]
        }
      },
      visualproject: {
        files: {
          'build/public/blockly/blockly.js': ['source/public/blockly/blockly.js']
        },
        options: {
          external: null,
          transform: [
                  ["brfs", {}]
               ],
        },
      },
      notebook: {
        files: {
          'build/public/notebook/notebook.js': ['source/public/notebook/notebook.js']
        },
        options: {
          external: null,
          transform: [
                  ["brfs", {}]
               ],
        },
      },
      vendor: {
          src: [],
          dest: 'build/public/vendor.js',
          options: {
            external: null,
            require: libs
          }
        },
      options:{
        external: libs,
        transform: [["brfs", {}]]
      }
      // streamsproject: {
      //   files: {
      //     'build/public/red/blockly.js': ['source/public/blockly/blockly.js']
      //   },
      //   options: {
      //     transform: [
      //             ["brfs", {}]
      //          ],
      //   }
      // }
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
      },
      notebook:
      {
        files: {
          'build/public/notebook/style/notebook.css': 'source/public/notebook/style/*.less'
        }
      }
    },
    sass: {
      build: {
        options: {
            outputStyle: 'compressed'
        },
        files: [{
            dest: 'build/public/red/red/style.min.css',
            src: 'source/public/red/red/styles/style.scss'
        }]
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
    embedFonts: {
      notebook: {
        files: {
          'build/public/notebook/style/notebook.css': ['build/public/notebook/style/notebook.css']
        }
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
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/notebook/**', '!public/notebook/**/*.js', '!public/notebook/**/*.less'], // Actual pattern(s) to match.
              dest: 'build/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            },
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'node_modules/katex/dist/fonts',      // Src matches are relative to this path.
              src: '*', // Actual pattern(s) to match.
              dest: 'build/public/notebook/style/fonts/',   // Destination path prefix.
              // ext: '.html',   // Dest filepaths will have this extension.
              extDot: 'first'   // Extensions in filenames begin after the first dot
            },
            {
              expand: true,     // Enable dynamic expansion.
              cwd: 'source/',      // Src matches are relative to this path.
              src: ['public/red/**'], // Actual pattern(s) to match.
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
            src: ['public/**/*.js', '!public/blockly/blockly/**', '!public/red/**'], // Actual pattern(s) to match.
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

  grunt.registerTask ('platform', 'Platform', function ()
  {
    mkdirp.sync (CONFIG);
    if (!process.env.PLATFORM) process.env.PLATFORM = 'CHROME';
    fs.writeFileSync (CONFIG+'/platform.js', '"use strict";\n module.exports.'+process.env.PLATFORM+'=true;');
  });

  grunt.registerTask ('makefile', 'Makefile', function ()
  {
    var MAKEFILE_FOLDER_LINUX = 'source/embedded/makefile/linux';
    var listmakefile = fs.readdirSync (MAKEFILE_FOLDER_LINUX);
    var makefile = {
      linux:{},
      windows:{}
    };
    _.each (listmakefile, function (mf)
    {
      if (mf.startsWith ('Makefile'))
      {
        var ln = path.extname (mf).substring (1);
        console.log ('makefile '+ln);
        makefile.linux[ln] = fs.readFileSync (MAKEFILE_FOLDER_LINUX+'/'+mf).toString ();
      }
    });
    var MAKEFILE_FOLDER_WINDOWS = 'source/embedded/makefile/windows';
    listmakefile = fs.readdirSync (MAKEFILE_FOLDER_WINDOWS);
    _.each (listmakefile, function (mf)
    {
      if (mf.startsWith ('make'))
      {
        var ln = path.extname (mf).substring (1);
        console.log ('makefile '+ln);
        makefile.windows[ln] = fs.readFileSync (MAKEFILE_FOLDER_WINDOWS+'/'+mf).toString ();
      }
    });
    mkdirp.sync (CONFIG);
    fs.writeFileSync ('source/config/makefile.js', '"use strict";\n module.exports = '+JSON.stringify (makefile)+';');
  });


  grunt.registerTask ('makefile_v2', 'Makefile_v2', function ()////////////////////////////////////////////////
  {
    function recurse(folder){
      var ret = {};
      var content = fs.readdirSync(folder);
      _.each(content, function (file)
      {
        var p = path.join(folder,file);
        if (fs.lstatSync(p).isDirectory())
        {
          ret[file] = recurse(p);
        }
        else
        {
          var name = path.extname(file).substring(1);
          ret[name] = fs.readFileSync(p).toString();
        }
      });
      return ret;
    }
    var makefile = recurse("source/embedded/makefile");
    fs.writeFileSync ('source/config/makefile_v2.js', '"use strict";\n module.exports = '+JSON.stringify (makefile)+';');
  });


  grunt.registerTask ('example', 'Example', function ()
  {
    var EXAMPLE_FOLDER_SOFTWARE = 'source/embedded/example/software';
    var example = {
      'software':{},
      'firmware':{},
      'start':{}
    };
    // var listsoftware = fs.readdirSync (EXAMPLE_FOLDER_SOFTWARE);
    // _.each (listsoftware, function (software)
    // {
    //   if (software[0]!=='.')
    //   {
    //     example.software[software] = {};
    //     var examplefile = fs.readdirSync (EXAMPLE_FOLDER_SOFTWARE+'/'+software);
    //     _.each (examplefile, function (file)
    //     {
    //       if (file[0]!=='.')
    //       {
    //         try
    //         {
    //           var project = path.basename (file, '.wylioapp');
    //           console.log (project);
    //           if (project.startsWith('start-'))
    //           {
    //             console.log (project);
    //             if (!example.start[software]) example.start[software] = {};
    //             example.start[software][project.substring(6)] = JSON.parse(fs.readFileSync (EXAMPLE_FOLDER_SOFTWARE+'/'+software+'/'+file).toString());
    //           }
    //           else
    //           {
    //             example.software[software][project] = JSON.parse(fs.readFileSync (EXAMPLE_FOLDER_SOFTWARE+'/'+software+'/'+file).toString());
    //           }
    //         }
    //         catch (e)
    //         {
    //           console.log (e);
    //         }
    //       }
    //     });
    //   }
    // });
    // var EXAMPLE_FOLDER_FIRMWARE = 'source/embedded/example/firmware';
    // var listfirmware = fs.readdirSync (EXAMPLE_FOLDER_FIRMWARE);
    // _.each (listfirmware, function (firmware)
    // {
    //   if (firmware[0]!=='.')
    //   {
    //     example.firmware[firmware] = {};
    //     var examplefolder = fs.readdirSync (EXAMPLE_FOLDER_FIRMWARE+'/'+firmware);
    //     _.each (examplefolder, function (folder)
    //     {
    //       if (folder[0]!=='.')
    //       {
    //         example.firmware[firmware][folder] = {};
    //         var examplefile = fs.readdirSync (EXAMPLE_FOLDER_FIRMWARE+'/'+firmware+'/'+folder);
    //         _.each (examplefile, function (file)
    //         {
    //           if (file[0]!=='.')
    //           {
    //             example.firmware[firmware][folder][file] = fs.readFileSync (EXAMPLE_FOLDER_FIRMWARE+'/'+firmware+'/'+folder+'/'+file+'/'+file+'.ino').toString();
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
    mkdirp.sync (CONFIG);
    fs.writeFileSync (CONFIG+'/example.js', '"use strict";\n module.exports = '+JSON.stringify (example)+';');
  });

  grunt.registerTask ('install', 'Install', function ()
  {
    var INSTALL_FOLDER = 'source/embedded/install';
    var listinstall = fs.readdirSync (INSTALL_FOLDER);
    var install = {
      linux:{},
      windows:{}
    };
    _.each (listinstall, function (installfile)
    {
      if (path.extname (installfile) === '.sh')
      {
        install.linux[path.basename(installfile, '.sh')] = fs.readFileSync (INSTALL_FOLDER+'/'+installfile).toString();  
        install.linux[path.basename(installfile, '.sh')] = install.linux[path.basename(installfile, '.sh')].replace (/\r?\n/g, ' && ');
	if (install.linux[path.basename(installfile, '.sh')].slice (-3) === '&& ')
	{
		var length = install.linux[path.basename(installfile, '.sh')].length;
		install.linux[path.basename(installfile, '.sh')] = install.linux[path.basename(installfile, '.sh')].slice (0, length-3);
	}
        console.log ('Install: '+path.basename(installfile, '.sh'));
      }
      else
      if (path.extname (installfile) === '.cmd')
      {
        var data = fs.readFileSync (INSTALL_FOLDER+'/'+installfile).toString().split ('\n');
        for (var i=0; i<data.length; i++)
        {
          data[i] = data[i].trim ();
          if (data[i].length === 0 || data[i][0] === '#')
          {
            data.splice (i, 1);
            i--;
          }
        }
        var buffer = data.join ('\n');
        install.windows[path.basename(installfile, '.cmd')] = 'powershell.exe -OutputFormat Text -EncodedCommand '+new Buffer (buffer, 'utf16le').toString('base64');  
        // install.windows[path.basename(installfile, '.cmd')] = install.windows[path.basename(installfile, '.cmd')].replace (/\r?\n/g, '^\r\n');
        // install.windows[path.basename(installfile, '.cmd')] = install.windows[path.basename(installfile, '.cmd')] + '\r\n';
        console.log ('Install: '+path.basename(installfile, '.cmd'));
      }      
    });
    mkdirp.sync (CONFIG);
    fs.writeFileSync (CONFIG+'/install.js', '"use strict";\n module.exports = '+JSON.stringify (install, null, 2)+';');
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
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-embed-fonts');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('publish', ['clean', 'default', 'cssmin', 'uglify', 'htmlmin', 'compress']);

  grunt.registerTask('default', ['mixpanel', 'debug', 'platform', 'makefile', 'makefile_v2', 'languages', 'example', 'install', 'jshint', 
    'browserify',
    'ngAnnotate',
    'copy',
    'less',
    'embedFonts',
    'sass',
    'locale', 
    // 'cssmin',
    // 'uglify',
    // 'htmlmin'
    ]);

};
