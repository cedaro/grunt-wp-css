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
			comment_spacing: {
				src: ['tmp/comment-spacing.css'],
				dest: 'tmp/comment-spacing.css'
			},
			font_face: {
				src: ['tmp/font-face.css'],
				dest: 'tmp/font-face.css'
			},
			nested_blocks: {
				src: ['tmp/nested-blocks.css'],
				dest: 'tmp/nested-blocks.css'
			},
			single_line_selectors: {
				src: ['tmp/single-line-selectors.css'],
				dest: 'tmp/single-line-selectors.css'
			},
			single_line_declarations: {
				src: ['tmp/single-line-declarations.css'],
				dest: 'tmp/single-line-declarations.css'
			}
		},

		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	grunt.registerTask( 'default', [ 'jshint' ] );

	grunt.registerTask( 'test', ['clean:tests', 'copy:tests', 'wpcss', 'nodeunit']);

};
