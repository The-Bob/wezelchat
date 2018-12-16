const sass = require('node-sass');
module.exports = function(grunt){
  grunt.initConfig({
    vars: {
      resources: './src', // source files (scss)
      assets: './build'    // compiled files (css)
    },

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          '<%= vars.assets %>/<%= pkg.main.slice(0, -3) %>.min.js': ['<%= vars.resources %>/<%= pkg.main %>'],
          '<%= vars.assets %>/client/js/client.js': ['<%= vars.resources %>/client/js/client.js']
        }
      }
    },
    sass: {
      options: {
            implementation: sass,
            sourceMap: true
      },
      dist: {
        files: {
          "<%=  vars.debuging ? vars.resources : vars.assets %>/client/styles/main.css": "<%=vars.resources %>/client/styles/main.scss"
        }
      },
      dev: {
        files: {
          "src/client/styles/main.css": "<%=vars.resources %>/client/styles/main.scss"
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults

        esversion: 6,
        globals: {
          jQuery: false,
          console: true,
          module: true
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/client/', src: '*', dest: 'build/client/'},
        ],
      },
    },
    watch: {
      css: {
        files: ['src/client/styles/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['src/*.js'],
        tasks: ['run:dev']
      }
    },
    run: {
      dev: {
        cmd: 'node',
        args: ['<%= vars.resources %>/server.js', '--inspect']
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'run:dev'],
        options: {
          logConcurrentOutput: true
        }
      }

    }

  });
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-run');

  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint']);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('build', ['sass', 'uglify', 'copy']);

  grunt.registerTask('setForDebug', function(){
    grunt.config.set('vars.debuging', 'true');
  });

  grunt.registerTask('debug', ['setForDebug','jshint', 'sass','concurrent:dev']);

};
