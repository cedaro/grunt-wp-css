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

exports.makepot = {
	setUp: function( done ) {
		done();
	},

	nested_blocks: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'nested-blocks' ).isEqual, "nested blocks don't match the expected output" );
		test.done();
	},

	section_spacing: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'section-spacing' ).isEqual, "section comments should follow two newlines" );
		test.done();
	},

	single_line_selectors: function( test ) {
		test.expect( 1 );
		test.ok( getTestData( 'single-line-selectors' ).isEqual, 'selectors should appear on their own line' );
		test.done();
	},
};
