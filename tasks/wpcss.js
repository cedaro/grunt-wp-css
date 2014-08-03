/*
 * grunt-wp-css
 * http://www.cedaro.com/
 *
 * Copyright (c) 2014 Cedaro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var _ = require( 'underscore' ),
		Comb = require( 'csscomb' ),
		cssbeautify = require( 'cssbeautify' ),
		fs = require( 'fs' ),
		path = require( 'path' );

	grunt.registerMultiTask( 'wpcss', function() {
		var comb = new Comb(),
			config = {},
			configKeys = {},
			configPath = {},
			userConfig = {},
			options;

		options = this.options({
			config: 'default'
		});

		configPath = path.resolve( __dirname, 'config/' + options.config + '.json' );
		if ( fs.existsSync( configPath ) ) {
			config = require( configPath );
		} else {
			grunt.fatal( 'Invalid config defined.' );
		}

		if ( grunt.file.exists( '.csscomb.json' ) ) {
			userConfig = grunt.file.readJSON( '.csscomb.json' );
		}

		configKeys = _.keys( config );
		config     = _.extend( config, userConfig, options );
		config     = _.pick( config, configKeys );

		comb.configure( config );

		this.files.forEach(function( f ) {
			// Read and combine source files into the 'contents' var.
			var contents = f.src.filter(function( filepath ) {
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
			contents = comb.processString( contents );

			// Collapse extra newlines.
			contents = contents.replace( /\n{3,}/g, '\n\n' );

			// Comments with at least 20 dashes in them will be considered
			// section headings and should follow two newlines.
			contents = contents.replace(/\s*(\/\*((?!\*\/)[\s\S])+-{20,}[\s\S]*?\*\/)\s*/g, '\n\n\n$1\n\n');
			contents = contents.replace( /\n{4,}/g, '\n\n\n' );

			grunt.file.write( f.dest, contents );
		});
	});

};
