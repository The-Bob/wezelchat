const sass = require('node-sass');
module.exports = function(grunt){
  grunt.initConfig({
    paths: {
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
          '<%= paths.assets %>/<%= pkg.main.slice(0, -3) %>.min.js': ['<%= paths.resources %>/<%= pkg.main %>'],
          '<%= paths.assets %>/client/js/client.js': ['<%= paths.resources %>/client/js/client.js']
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
          "<%= paths.assets %>/client/styles/main.css": "<%= paths.resources %>/client/styles/main.scss"
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
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint']);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('build', ['jshint', 'sass', 'uglify', 'copy']);

};
