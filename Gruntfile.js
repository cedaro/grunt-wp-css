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
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.config.init({

		clean: {
			tests: ['tmp']
		},

		copy: {
			tests: {
				files: [
					{
						expand: true,
						cwd: 'test/fixtures',
						src: ['**'],
						dest: 'tmp/'
					}
				]
			}
		},

		jshint: {
			options : {
				jshintrc : '.jshintrc'
			},
			all : [
				'Gruntfile.js',
				'tasks/*.js'
			]
		},

		wpcss: {
			nested_blocks: {
				src: ['tmp/nested-blocks.css'],
				dest: 'tmp/nested-blocks.css'
			},
			section_spacing: {
				src: ['tmp/section-spacing.css'],
				dest: 'tmp/section-spacing.css'
			},
			single_line_selectors: {
				src: ['tmp/single-line-selectors.css'],
				dest: 'tmp/single-line-selectors.css'
			}
		},

		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	grunt.registerTask( 'default', [ 'jshint' ] );

	grunt.registerTask( 'test', ['clean:tests', 'copy:tests', 'wpcss', 'nodeunit']);

};
