'use strict';

var grunt = require( 'grunt' );

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

Test methods:
	test.expect( numAssertions )
	test.done()
Test assertions:
	test.ok( value, [message])
	test.equal( actual, expected, [message])
	test.notEqual( actual, expected, [message])
	test.deepEqual( actual, expected, [message])
	test.notDeepEqual( actual, expected, [message])
	test.strictEqual( actual, expected, [message])
	test.notStrictEqual( actual, expected, [message])
	test.throws( block, [error], [message])
	test.doesNotThrow( block, [error], [message])
	test.ifError( value )
*/

function getTestData( id ) {
	var processed = grunt.file.read( 'tmp/' + id + '.css' ),
		expected = grunt.file.read( 'test/expected/' + id + '.css' );

	return {
		expected: expected,
		processed: processed,
		isEqual: processed === expected
	};
}

exports.wpcss = {
	setUp: function( done ) {
		done();
	},

	comment_spacing: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'comment-spacing' ).isEqual, "comments weren't spaced correctly" );
		test.done();
	},

	font_face: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'font-face' ).isEqual, "@font-face src wasn't ordered correctly" );
		test.done();
	},

	nested_blocks: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'nested-blocks' ).isEqual, "nested blocks don't match the expected output" );
		test.done();
	},

	single_line_selectors: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'single-line-selectors' ).isEqual, 'selectors should appear on their own line' );
		test.done();
	},

	single_line_declarations: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'single-line-declarations' ).isEqual, 'declarations should appear on their own line' );
		test.done();
	},
};
