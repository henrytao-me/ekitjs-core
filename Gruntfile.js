'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            test: {
                src: ['test/spec/**/*.js'],
                options: {
                    reporter: 'spec',
                    // captureFile: 'test/results/server.xml'
                }
            }
        }
    });

    // Grunt task(s)

    grunt.registerTask('test', ['mochaTest']);

    grunt.registerTask('default', ['mochaTest']);

};