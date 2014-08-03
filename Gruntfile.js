/*
 * grunt-wp-css
 * http://www.cedaro.com/
 *
 * Copyright (c) 2014 Cedaro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	grunt.loadTasks( 'tasks' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	grunt.config.init({

		jshint: {
			options : {
				jshintrc : '.jshintrc'
			},
			all : [
				'Gruntfile.js',
				'tasks/*.js'
			]
		}

	});

	// Register default task.
	grunt.registerTask( 'default', [ 'jshint' ] );

};
