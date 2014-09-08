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
				src: ['test/fixtures/comment-spacing.css'],
				dest: 'tmp/comment-spacing.css'
			},
			font_face: {
				src: ['test/fixtures/font-face.css'],
				dest: 'tmp/font-face.css'
			},
			nested_blocks: {
				src: ['test/fixtures/nested-blocks.css'],
				dest: 'tmp/nested-blocks.css'
			},
			single_line_selectors: {
				src: ['test/fixtures/single-line-selectors.css'],
				dest: 'tmp/single-line-selectors.css'
			},
			single_line_declarations: {
				src: ['test/fixtures/single-line-declarations.css'],
				dest: 'tmp/single-line-declarations.css'
			}
		},

		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	grunt.registerTask( 'default', [ 'jshint' ] );

	grunt.registerTask( 'test', ['clean:tests', 'wpcss', 'nodeunit']);

};
