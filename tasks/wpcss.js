/*
 * grunt-wp-css
 * http://www.blazersix.com/
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var _ = require( 'underscore' ),
		Comb = require( 'csscomb' ),
		cssbeautify = require( 'cssbeautify' );

	/**
	 * Format CSS according to the rules defined in .csscomb.json.
	 *
	 * Rules are sorted alphabetically by default, with the following exceptions:
	 * - Position units (top, right, bottom, left) follow the 'position' declaration.
	 */
	grunt.registerMultiTask( 'wpcss', function() {
		var comb = new Comb(),
			config = require( './config/wp.json' ),
			configKeys = _.keys( config ),
			userConfig = {},
			options;

		options = this.options();

		if ( grunt.file.exists( '.csscomb.json' ) ) {
			userConfig = grunt.file.readJSON( '.csscomb.json' );
		}

		config = _.extend( config, userConfig, options );
		config = _.pick( config, configKeys );

		comb.configure( config );

		this.files.forEach(function( f ) {
			var contents, combed;

			// Read and combine source files into the 'contents' var.
			contents = f.src.filter(function( filepath ) {
				// Warn on and remove invalid source files (if nonull was set).
				if ( ! grunt.file.exists( filepath ) ) {
					grunt.log.warn( 'Source file "' + filepath + '" not found.' );
					return false;
				} else {
					return true;
				}
			}).map(function( filepath ) {
				return grunt.file.read( filepath ).trim();
			}).join( '\n\n' );

			contents = cssbeautify( contents );
			combed = comb.processString( contents );
			grunt.file.write( f.dest, combed );
		});
	});

};
