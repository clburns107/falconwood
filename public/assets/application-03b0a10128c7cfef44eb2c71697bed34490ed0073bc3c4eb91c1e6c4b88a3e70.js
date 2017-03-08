/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error, error1;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
//opens full screen overlay
function openOverlay() {
  $("#homepage-overlay").css('height', '100%');
}

//closes full screen overlay
function closeOverlay() {
  $("#homepage-overlay").css('height', '0%');
}


/* Set the width of the side navigation to 250px */
function openNav() {
  $("#mySidenav").css('width', '250px');
    // document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  $("#mySidenav").css('width', '0px');
    // document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {
  openOverlay();   
});
/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */

!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return n.each(a.match(F)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&n.each(arguments,function(a,c){var d;while((d=n.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body)return setTimeout(n.ready);n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))}}});function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===z.readyState)setTimeout(n.ready);else if(z.addEventListener)z.addEventListener("DOMContentLoaded",K,!1),a.addEventListener("load",K,!1);else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&z.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}J(),n.ready()}}()}return I.promise(b)};var L="undefined",M;for(M in n(l))break;l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},X=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;function bb(){return!0}function cb(){return!1}function db(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=cb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function zb(a){var b=qb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ab(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Cb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=vb(f),h=vb(a),g=0;null!=(e=h[g]);++g)d[g]&&Cb(e,d[g]);if(b)if(c)for(h=h||vb(a),d=d||vb(f),g=0;null!=(e=h[g]);g++)Bb(e,d[g]);else Bb(a,f);return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;while(f=h[e++])pb.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(vb(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0;if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;f>j;j++)d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Db,Eb={};function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");return d.detach(),e}function Gb(a){var b=z,c=Eb[a];return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;if(null==b){if(a=z.getElementsByTagName("body")[0],!a)return;f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null}return b}}();var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Mb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c)return c;var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];if(f)return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c},boxSizing:function(){return null==d&&k(),d},boxSizingReliable:function(){return null==e&&k(),e},pixelPosition:function(){return null==f&&k(),f},reliableMarginRight:function(){var b,c,d,e;if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b)return;c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)}return g}});function k(){var b,c,h=z.getElementsByTagName("body")[0];h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];function Vb(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;while(e--)if(b=Ub[e]+c,b in a)return b;return d}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Xb(a,b,c){var d=Qb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]="",i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)}):Zb(a,b,d):void 0},set:function(a,c,d){var e=d&&Jb(a);return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Jb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)},show:function(){return Wb(this,!0)},hide:function(){return Wb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=$b.propHooks[this.prop];return a&&a.get?a.get(this):$b.propHooks._default.get(this)},run:function(a){var b,c=$b.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=$b.prototype.init,n.fx.step={};var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function gc(){return setTimeout(function(){_b=void 0}),_b=n.now()}function hc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=U[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}if(!n.isEmptyObject(o)){r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function kc(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(kc(k,j.opts.specialEasing);g>f;f++)if(d=ec[f].call(j,a,k,j.opts))return d;return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&dc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)}}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(_b=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),_b=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(ac),ac=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var mc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):nc&&nc.set(a,b,c)}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},pc.id=pc.name=pc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var vc=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");try{Ac=location.href}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href}zc=Hc.exec(Ac.toLowerCase())||[];function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nc(a,b,c,d){var e={},f=a===Jc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Dc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t)return v;h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;function Wc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Wc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Wc(c,a[c],b,e);return d.join("&").replace(Rc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}}):{name:b.name,value:c.replace(Tc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()}:$c;var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc)Yc[a](void 0,!0)}),l.cors=!!Zc&&"withCredentials"in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Xc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function $c(){try{return new a.XMLHttpRequest}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ad=[],bd=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var cd=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&cd)return cd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var dd=a.document.documentElement;function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||dd})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return W(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var fd=a.jQuery,gd=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n},typeof b===L&&(a.jQuery=a.$=n),n});
function scrollToAbout() {
  	$('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 2000);
}

//opens full screen overlay
function scrollToDetails() {
  	$('html, body').animate({
        scrollTop: $("#details").offset().top
    }, 2000);
}

//opens full screen overlay
function scrollToContact() {
  	$('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);
}
;
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

window.onload = function() {
  document.getElementById("defaultOpen").click();
};

if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("tiles");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("tiles")});


/**
 * Grid gallery theme
 */
function UGTheme_tiles(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_tiles = new UGTiles(), g_lightbox = new UGLightbox(), g_objPreloader, g_objTilesWrapper;
	var g_functions = new UGFunctions(), g_objTileDesign = new UGTileDesign();
	
	var g_options = {
			theme_enable_preloader: true,		//enable preloader circle
			theme_preloading_height: 200,		//the height of the preloading div, it show before the gallery
			theme_preloader_vertpos: 100,		//the vertical position of the preloader
			theme_gallery_padding: 0,			//the horizontal padding of the gallery from the sides
			theme_appearance_order: "normal",	//normal, shuffle, keep - the appearance order of the tiles. applying only to columns type
			theme_auto_open:null				//auto open lightbox at start
	};
	
	var g_defaults = {
			gallery_width: "100%"
	};
	
	//temp variables
	var g_temp = {
			showPreloader: false
	};
	
	
	/**
	 * Init the theme
	 */
	function initTheme(gallery, customOptions){
		
		g_gallery = gallery;
		
		//set default options
		g_options = jQuery.extend(g_options, g_defaults);
		
		//set custom options
		g_options = jQuery.extend(g_options, customOptions);
		
		modifyOptions();
		
		//set gallery options
		g_gallery.setOptions(g_options);
		
		g_gallery.setFreestyleMode();
		
		g_objects = gallery.getObjects();
		
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;
		
		//init objects
		g_tiles.init(gallery, g_options);
		g_lightbox.init(gallery, g_options);
		
		g_objTileDesign = g_tiles.getObjTileDesign();

		
	}
	
	
	/**
	 * modift options
	 */
	function modifyOptions(){
		
		if(g_options.theme_enable_preloader == true)
			g_temp.showPreloader = true;
		
		switch(g_options.theme_appearance_order){
			default:
			case "normal":
			break;
			case "shuffle":
				g_gallery.shuffleItems();
			break;
			case "keep":
				g_options.tiles_keep_order = true;
			break;
		}
		
	}

	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-tiles");
		
		g_objWrapper.append("<div class='ug-tiles-wrapper' style='position:relative'></div>");
		
		//add preloader
		if(g_temp.showPreloader == true){
			g_objWrapper.append("<div class='ug-tiles-preloader ug-preloader-trans'></div>");
			g_objPreloader = g_objWrapper.children(".ug-tiles-preloader");
			g_objPreloader.fadeTo(0,0);
		}
		
		g_objTilesWrapper = g_objWrapper.children(".ug-tiles-wrapper");
		
		//set padding
		if(g_options.theme_gallery_padding)
			g_objWrapper.css({
				"padding-left":g_options.theme_gallery_padding+"px",
				"padding-right":g_options.theme_gallery_padding+"px"
			});
		
		g_tiles.setHtml(g_objTilesWrapper);
		g_lightbox.putHtml();
	}
	
	/**
	 * actually run the theme
	 */
	function actualRun(){
		
		//set preloader mode
		if(g_objPreloader){
			g_objPreloader.fadeTo(0,1);
			g_objWrapper.height(g_options.theme_preloading_height);
			g_functions.placeElement(g_objPreloader, "center", g_options.theme_preloader_vertpos);
		}
		
		initEvents();
		
		g_tiles.run();
		g_lightbox.run();
		
	}

	
	/**
	 * run the theme
	 */
	function runTheme(){
		
		setHtml();
		
		actualRun();
		
	}
	
	
	
	/**
	 * init size of the thumbs panel
	 */
	function initThumbsPanel(){
		
		//set size:
		var objGallerySize = g_gallery.getSize();
			
		if(g_temp.isVertical == false)			
			g_objPanel.setWidth(objGallerySize.width);
		else
			g_objPanel.setHeight(objGallerySize.height);
		
		g_objPanel.run();
	}
	
	
	/**
	 * on tile click - open lightbox
	 */
	function onTileClick(data, objTile){
		
		objTile = jQuery(objTile);		
		
		var objItem = g_objTileDesign.getItemByTile(objTile);
		var index = objItem.index;		
		
		g_lightbox.open(index);
	}
	
	
	/**
	 * before items request: hide items, show preloader
	 */
	function onBeforeReqestItems(){
				
		g_objTilesWrapper.hide();
		
		if(g_objPreloader){
			g_objPreloader.show();
		
			var preloaderSize = g_functions.getElementSize(g_objPreloader);
			var galleryHeight = preloaderSize.bottom + 30;
			
			g_objWrapper.height(galleryHeight);
		}
		
	}

	/**
	 * open lightbox at start if needed
	 */
	function onLightboxInit(){

		if(g_options.theme_auto_open !== null){
			g_lightbox.open(g_options.theme_auto_open);
			g_options.theme_auto_open = null;
		}
		
	}
	
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
		
		//remove preloader on tiles first placed
		if(g_objPreloader){
			
			g_gallery.onEvent(g_tiles.events.TILES_FIRST_PLACED, function(){
				
				g_objWrapper.height("auto");
				g_objPreloader.hide();
			});			
		}
		
		jQuery(g_objTileDesign).on(g_objTileDesign.events.TILE_CLICK, onTileClick);
		
		g_objGallery.on(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS, onBeforeReqestItems);

		jQuery(g_lightbox).on(g_lightbox.events.LIGHTBOX_INIT, onLightboxInit);

	}
	
	
	/**
	 * destroy the theme
	 */
	this.destroy = function(){
				
		jQuery(g_objTileDesign).off(g_objTileDesign.events.TILE_CLICK);
		
		g_gallery.destroyEvent(g_tiles.events.TILES_FIRST_PLACED);
				
		g_objGallery.off(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS);

		jQuery(g_lightbox).off(g_lightbox.events.LIGHTBOX_INIT);
		
		g_tiles.destroy();
		g_lightbox.destroy();
	}
	
	
	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		runTheme();
	}
	
	
	/**
	 * add items
	 */
	this.addItems = function(){
		
		g_tiles.runNewItems();
	}
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
				
		initTheme(gallery, customOptions);
		
	}
	
	
}
;
// Unite Gallery, Version: 1.7.45, released 27 Feb 2017 

function debugLine(e,t,i){e===!0&&(e="true"),e===!1&&(e="false");var n=e;if("object"==typeof e){n="";for(name in e){var r=e[name];n+=" "+name+": "+r}}if(1!=t||i||(n+=" "+Math.random()),1==i){var o=jQuery("#debug_line");o.width(200),o.height()>=500&&o.html("");var a=o.html();n=a+"<br> -------------- <br>"+n}jQuery("#debug_line").show().html(n)}function debugSide(e){var t="";for(name in e){var i=e[name];t+=name+" : "+i+"<br>"}jQuery("#debug_side").show().html(t)}function trace(e){"undefined"!=typeof console&&console.log(e)}function UGFunctions(){function e(e,t,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent?t.attachEvent("on"+e,i):t[e]=i}var t=null,i=this,n={starTime:0,arrThemes:[],isTouchDevice:-1,isRgbaSupported:-1,timeCache:{},dataCache:{},lastEventType:"",lastEventTime:0,lastTouchStartElement:null,touchThreshold:700,handle:null};this.debugVar="",this.z__________FULL_SCREEN___________=function(){},this.toFullscreen=function(e,t){if(e.requestFullscreen)e.requestFullscreen();else if(e.mozRequestFullScreen)e.mozRequestFullScreen();else if(e.webkitRequestFullscreen)e.webkitRequestFullscreen();else{if(!e.msRequestFullscreen)return!1;e.msRequestFullscreen()}return!0},this.exitFullscreen=function(){if(0==i.isFullScreen())return!1;if(document.exitFullscreen)document.exitFullscreen();else if(document.cancelFullScreen)document.cancelFullScreen();else if(document.mozCancelFullScreen)document.mozCancelFullScreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen();else{if(!document.msExitFullscreen)return!1;document.msExitFullscreen()}return!0},this.addFullScreenChangeEvent=function(t){document.webkitCancelFullScreen?e("webkitfullscreenchange",document,t):document.msExitFullscreen?e("MSFullscreenChange",document,t):document.mozCancelFullScreen?e("mozfullscreenchange",document,t):e("fullscreenchange",document,t)},this.destroyFullScreenChangeEvent=function(){jQuery(document).unbind("fullscreenChange"),jQuery(document).unbind("mozfullscreenchange"),jQuery(document).unbind("webkitfullscreenchange"),jQuery(document).unbind("MSFullscreenChange")},this.getFullScreenElement=function(){var e=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;return e},this.isFullScreen=function(){var e=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen||document.msFullscreenElement;return e=e?!0:!1},this.z__________GET_PROPS___________=function(){},this.getBrowserPrefix=function(){if(null!==t)return t;var e=["webkit","Moz","ms","O"],i=document.createElement("div");for(var n in e){var r=e[n];if(r+"Transform"in i.style)return r=r.toLowerCase(),t=r,r}return t="",""},this.getImageInsideParentDataByImage=function(e,t,n){var r=e.parent(),o=i.getImageOriginalSize(e),a=i.getImageInsideParentData(r,o.width,o.height,t,n);return a},this.getImageInsideParentData=function(e,t,i,n,r,o,a){if(!r)var r={};var s={};if("undefined"==typeof o)var o=e.width();if("undefined"==typeof a)var a=e.height();r.padding_left&&(o-=r.padding_left),r.padding_right&&(o-=r.padding_right),r.padding_top&&(a-=r.padding_top),r.padding_bottom&&(a-=r.padding_bottom);var l=null,u="100%",d=null,_=null,g="display:block;margin:0px auto;";if(t>0&&i>0){if("down"==n&&o>t&&a>i)u=i,l=t,_=(o-l)/2,d=(a-u)/2;else if("fill"==n){var c=t/i;u=a,l=u*c,o>l?(l=o,u=l/c,_=0,d=Math.round((u-a)/2*-1)):(d=0,_=Math.round((l-o)/2*-1))}else{var c=t/i;u=a,l=u*c,d=0,_=(o-l)/2,"fitvert"!=n&&l>o&&(l=o,u=l/c,_=0,d=(a-u)/2)}l=Math.floor(l),u=Math.floor(u),d=Math.floor(d),_=Math.floor(_),g="position:absolute;"}return r.padding_top&&(d+=r.padding_top),r.padding_left&&(_+=r.padding_left),s.imageWidth=l,s.imageHeight=u,s.imageTop=d,s.imageLeft=_,s.imageRight=_+l,0==d||"100%"==u?s.imageBottom=null:s.imageBottom=d+u,s.style=g,s},this.getElementCenterPosition=function(e,t){var n=e.parent(),r=i.getElementSize(e),o=i.getElementSize(n),a=o.width,s=o.height;t&&void 0!==t.padding_top&&(s-=t.padding_top),t&&void 0!==t.padding_bottom&&(s-=t.padding_bottom),t&&void 0!==t.padding_left&&(a-=t.padding_left),t&&void 0!==t.padding_right&&(a-=t.padding_right);var l={};return l.left=Math.round((a-r.width)/2),l.top=Math.round((s-r.height)/2),t&&void 0!==t.padding_top&&(l.top+=t.padding_top),t&&void 0!==t.padding_left&&(l.left+=t.padding_left),l},this.getElementCenterPoint=function(e,t){if(!t)var t=!1;var n=i.getElementSize(e),r={};return r.x=n.width/2,r.y=n.height/2,1==t&&(r.x+=n.left,r.y+=n.top),r.x=Math.round(r.x),r.y=Math.round(r.y),r},this.getMousePosition=function(e,t){var i={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY};if(e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0&&(i.pageX=e.originalEvent.touches[0].pageX,i.pageY=e.originalEvent.touches[0].pageY,i.clientX=e.originalEvent.touches[0].clientX,i.clientY=e.originalEvent.touches[0].clientY),t){var n=t.offset();i.mouseX=i.pageX-n.left,i.mouseY=i.pageY-n.top}return i},this.getMouseElementPoint=function(e,t){var n={x:e.pageX,y:e.pageY},r=i.getElementLocalPoint(n,t);return r},this.getElementLocalPoint=function(e,t){var i={},n=t.offset();return i.x=Math.round(e.x-n.left),i.y=Math.round(e.y-n.top),i},this.getImageOriginalSize=function(e,t,i){if("undefined"!=typeof t&&"undefined"!=typeof i)return{width:t,height:i};var n=e[0];if("undefined"==typeof n)throw new Error("getImageOriginalSize error - Image not found");var r={};if("undefined"==typeof n.naturalWidth){if("number"==typeof e.data("naturalWidth")){var r={};return r.width=e.data("naturalWidth"),r.height=e.data("naturalHeight"),r}var o=new Image;return o.src=n.src,o.complete?(r.width=o.width,r.height=o.height,e.data("naturalWidth",r.width),e.data("naturalHeight",r.height),r):{width:0,height:0}}return r.width=n.naturalWidth,r.height=n.naturalHeight,r},this.getimageRatio=function(e){var t=i.getImageOriginalSize(e),n=i.getElementSize(e),r=n.width/t.width;return r},this.isImageFitParent=function(e){var t=e.parent(),n=i.getElementSize(e),r=i.getElementSize(t);return n.width<=r.width&&n.height<=r.height?!0:!1},this.getElementSize=function(e){if(void 0===e)throw new Error("Can't get size, empty element");var t=e.position();return t.height=e.outerHeight(),t.width=e.outerWidth(),t.left=Math.round(t.left),t.top=Math.round(t.top),t.right=t.left+t.width,t.bottom=t.top+t.height,t},this.isElementBiggerThenParent=function(e){var t=e.parent(),n=i.getElementSize(e),r=i.getElementSize(t);return n.width>r.width||n.height>r.height?!0:!1},this.isPointInsideElement=function(e,t){var i=e.x>=0&&e.x<t.width;if(0==i)return!1;var n=e.y>=0&&e.y<t.height;return 0==n?!1:!0},this.getElementRelativePos=function(e,t,n,r){if(!r)var r=e.parent();if("number"==typeof e)var o={width:e,height:e};else var o=i.getElementSize(e);var a=i.getElementSize(r);switch(t){case"top":case"left":t=0,n&&(t+=n);break;case"center":t=Math.round((a.width-o.width)/2),n&&(t+=n);break;case"right":t=a.width-o.width,n&&(t-=n);break;case"middle":t=Math.round((a.height-o.height)/2),n&&(t+=n);break;case"bottom":t=a.height-o.height,n&&(t-=n)}return t},this.z_________SET_ELEMENT_PROPS_______=function(){},this.zoomImageInsideParent=function(e,t,n,r,o,a,s){if(!n)var n=1.2;if(!o)var o="fit";var l,u,d,_,g=n,c=e.parent(),h=i.getElementSize(e),p=i.getImageOriginalSize(e),f=!1,m=0,v=0,b=0,y=0;if(r){var I=i.getMouseElementPoint(r,e);f=i.isPointInsideElement(I,h),b=I.x,y=I.y}else f=!1;if(0==f){var w=i.getElementCenterPoint(e);b=w.x,y=w.y}if(1==t)l=h.height*g,u=h.width*g,0!=b&&(m=-(b*g-b)),0!=y&&(v=-(y*g-y));else{l=h.height/g,u=h.width/g;var E=i.getImageInsideParentData(c,p.width,p.height,o,s);if(u<E.imageWidth)return i.scaleImageFitParent(e,p.width,p.height,o,s),!0;1==f&&(0!=b&&(m=-(b/g-b)),0!=y&&(v=-(y/g-y)))}if(a){var T=1;if(0!=p.width&&(T=u/p.width),T>a)return!1}if(i.setElementSize(e,u,l),0==t&&0==f){var S=i.getElementCenterPosition(e);d=S.left,_=S.top}else d=h.left+m,_=h.top+v;return i.placeElement(e,d,_),!0},this.placeElement=function(e,t,n,r,o,a){if(0==jQuery.isNumeric(t)||0==jQuery.isNumeric(n)){if(!a)var a=e.parent();var s=i.getElementSize(e),l=i.getElementSize(a)}if(0==jQuery.isNumeric(t))switch(t){case"left":t=0,r&&(t+=r);break;case"center":t=Math.round((l.width-s.width)/2),r&&(t+=r);break;case"right":t=l.width-s.width,r&&(t-=r)}if(0==jQuery.isNumeric(n))switch(n){case"top":n=0,o&&(n+=o);break;case"middle":case"center":n=Math.round((l.height-s.height)/2),o&&(n+=o);break;case"bottom":n=l.height-s.height,o&&(n-=o)}var u={position:"absolute",margin:"0px"};null!==t&&(u.left=t),null!==n&&(u.top=n),e.css(u)},this.placeElementInParentCenter=function(e){i.placeElement(e,"center","middle")},this.setElementSizeAndPosition=function(e,t,i,n,r){var o={width:n+"px",height:r+"px",left:t+"px",top:i+"px",position:"absolute",margin:"0px"};e.css(o)},this.setElementSize=function(e,t,i){var n={width:t+"px"};null!==i&&"undefined"!=typeof i&&(n.height=i+"px"),e.css(n)},this.cloneElementSizeAndPos=function(e,t,n,r,o){var a=e.position();if(void 0==a)throw new Error("Can't get size, empty element");n===!0?(a.height=e.outerHeight(),a.width=e.outerWidth()):(a.height=e.height(),a.width=e.width()),a.left=Math.round(a.left),a.top=Math.round(a.top),r&&(a.left+=r),o&&(a.top+=o),i.setElementSizeAndPosition(t,a.left,a.top,a.width,a.height)},this.placeImageInsideParent=function(e,t,n,r,o,a){var s=i.getImageInsideParentData(t,n,r,o,a),l="<img";null!==s.imageWidth&&(l+=" width = '"+s.imageWidth+"'",s.style+="width:"+s.imageWidth+";"),null!=s.imageHeight&&("100%"==s.imageHeight?(l+=" height = '"+s.imageHeight+"'",s.style+="height:"+s.imageHeight+";"):(l+=" height = '"+s.imageHeight+"'",s.style+="height:"+s.imageHeight+"px;")),null!==s.imageTop&&(s.style+="top:"+s.imageTop+"px;"),null!==s.imageLeft&&(s.style+="left:"+s.imageLeft+"px;"),e=i.escapeDoubleSlash(e),l+=" style='"+s.style+"'",l+=' src="'+e+'"',l+=">",t.html(l);var u=t.children("img");return u},this.scaleImageCoverParent=function(e,t,n){if("number"==typeof t)var r=t,o=n;else var r=t.outerWidth(),o=t.outerHeight();var a=i.getImageOriginalSize(e),s=a.width,l=a.height,u=s/l,d=o,_=d*u,g=0,c=0;r>_?(_=r,d=_/u,c=0,g=Math.round((d-o)/2*-1)):(g=0,c=Math.round((_-r)/2*-1)),_=Math.round(_),d=Math.round(d),e.css({width:_+"px",height:d+"px",left:c+"px",top:g+"px"})},this.scaleImageFitParent=function(e,t,n,r,o){var a=e.parent(),s=i.getImageInsideParentData(a,t,n,r,o),l=!1,u={};return null!==s.imageWidth&&(l=!0,e.removeAttr("width"),u.width=s.imageWidth+"px"),null!=s.imageHeight&&(l=!0,e.removeAttr("height"),u.height=s.imageHeight+"px"),null!==s.imageTop&&(l=!0,u.top=s.imageTop+"px"),null!==s.imageLeft&&(l=!0,u.left=s.imageLeft+"px"),1==l&&(u.position="absolute",u.margin="0px 0px",e.css(u)),s},this.scaleImageByHeight=function(e,t,n,r){var o=i.getImageOriginalSize(e,n,r),a=o.width/o.height,s=Math.round(t*a);t=Math.round(t),i.setElementSize(e,s,t)},this.scaleImageByWidth=function(e,t,n,r){var o=i.getImageOriginalSize(e,n,r),a=o.width/o.height,s=Math.round(t/a);t=Math.round(t),i.setElementSize(e,t,s)},this.scaleImageExactSizeInParent=function(e,t,n,r,o,a){var s=e.parent(),l=i.getElementSize(s);l.width<r&&(r=l.width),l.height<o&&(o=l.height);var u=i.getImageInsideParentData(null,t,n,a,null,r,o),d=r,_=o,g=u.imageLeft,c=u.imageLeft,h=u.imageTop,p=u.imageTop,f=Math.round((l.width-r)/2),m=Math.round((l.height-o)/2),v=u.imageWidth+g+c,b=r-v;0!=b&&(c+=b);var y=u.imageHeight+h+p,b=o-y;0!=b&&(p+=b),e.removeAttr("width"),e.removeAttr("height");var I={position:"absolute",margin:"0px 0px"};I.width=d+"px",I.height=_+"px",I.left=f+"px",I.top=m+"px",I["padding-left"]=g+"px",I["padding-top"]=h+"px",I["padding-right"]=c+"px",I["padding-bottom"]=p+"px",e.css(I);var w={};return w.imageWidth=d,w.imageHeight=_,w},this.showElement=function(e,t,i){e.show().fadeTo(0,1),t&&t.show().fadeTo(0,1),i&&i.show().fadeTo(0,1)},this.z_________GALLERY_RELATED_FUNCTIONS_______=function(){},this.disableButton=function(e,t){if(!t)var t="ug-button-disabled";0==i.isButtonDisabled(e,t)&&e.addClass(t)},this.convertCustomPrefixOptions=function(e,t,i){if(!t)return e;var n={};return jQuery.each(e,function(e,r){if(0===e.indexOf(t+"_"+i+"_")){var o=e.replace(t+"_"+i+"_",i+"_");n[o]=r}else n[e]=r}),n},this.enableButton=function(e,t){if(!t)var t="ug-button-disabled";1==i.isButtonDisabled(e,t)&&e.removeClass(t)},this.isButtonDisabled=function(e,t){if(!t)var t="ug-button-disabled";return e.hasClass(t)?!0:!1},this.z_________MATH_FUNCTIONS_______=function(){},this.normalizeSetting=function(e,t,i,n,r,o){if(!o)var o=!1;var a=(r-i)/(n-i);return r=e+(t-e)*a,1==o&&(e>r&&(r=e),r>t&&(r=t)),r},this.getNormalizedValue=function(e,t,i,n,r){var o=(r-e)/(t-e);return r=e+(n-i)*o},this.getDistance=function(e,t,i,n){var r=Math.round(Math.sqrt(Math.abs((i-e)*(i-e)+(n-t)*(n-t))));return r},this.getMiddlePoint=function(e,t,i,n){var r={};return r.x=e+Math.round((i-e)/2),r.y=t+Math.round((n-t)/2),r},this.getNumItemsInSpace=function(e,t,i){var n=Math.floor((e+i)/(t+i));return n},this.getNumItemsInSpaceRound=function(e,t,i){var n=Math.round((e+i)/(t+i));return n},this.getSpaceByNumItems=function(e,t,i){var n=e*t+(e-1)*i;return n},this.getItemSizeInSpace=function(e,t,i){var n=Math.floor((e-(t-1)*i)/t);return n},this.getColX=function(e,t,i){var n=e*(t+i);return n},this.getColByIndex=function(e,t){var i=t%e;return i},this.getColRowByIndex=function(e,t){var i=Math.floor(e/t),n=Math.floor(e%t);return{col:n,row:i}},this.getIndexByRowCol=function(e,t,i){if(0>e)return-1;if(0>t)return-1;var n=e*i+t;return n},this.getPrevRowSameColIndex=function(e,t){var n=i.getColRowByIndex(e,t),r=i.getIndexByRowCol(n.row-1,n.col,t);return r},this.getNextRowSameColIndex=function(e,t){var n=i.getColRowByIndex(e,t),r=i.getIndexByRowCol(n.row+1,n.col,t);return r},this.z_________DATA_FUNCTIONS_______=function(){},this.setGlobalData=function(e,t){jQuery.data(document.body,e,t)},this.getGlobalData=function(e){var t=jQuery.data(document.body,e);return t},this.z_________EVENT_DATA_FUNCTIONS_______=function(){},this.handleScrollTop=function(e){if(0==i.isTouchDevice())return null;var t=i.getStoredEventData(e),r=15,o=15;if(null===t.scrollDir&&(Math.abs(t.diffMouseX)>r?t.scrollDir="hor":Math.abs(t.diffMouseY)>o&&Math.abs(t.diffMouseY)>Math.abs(t.diffMouseX)&&(t.scrollDir="vert",t.scrollStartY=t.lastMouseClientY,t.scrollOrigin=jQuery(document).scrollTop(),n.dataCache[e].scrollStartY=t.lastMouseClientY,n.dataCache[e].scrollOrigin=t.scrollOrigin),n.dataCache[e].scrollDir=t.scrollDir),"vert"!==t.scrollDir)return t.scrollDir;var a=(jQuery(document).scrollTop(),t.scrollOrigin-(t.lastMouseClientY-t.scrollStartY));return a>=0&&jQuery(document).scrollTop(a),t.scrollDir},this.wasVerticalScroll=function(e){var t=i.getStoredEventData(e);return"vert"===t.scrollDir?!0:!1},this.storeEventData=function(e,t,r){var o=i.getMousePosition(e),a=jQuery.now(),s={startTime:a,lastTime:a,startMouseX:o.pageX,startMouseY:o.pageY,lastMouseX:o.pageX,lastMouseY:o.pageY,startMouseClientY:o.clientY,lastMouseClientY:o.clientY,scrollTop:jQuery(document).scrollTop(),scrollDir:null};r&&(s=jQuery.extend(s,r)),n.dataCache[t]=s},this.updateStoredEventData=function(e,t,r){if(!n.dataCache[t])throw new Error("updateEventData error: must have stored cache object");var o=n.dataCache[t],a=i.getMousePosition(e);o.lastTime=jQuery.now(),void 0!==a.pageX&&(o.lastMouseX=a.pageX,o.lastMouseY=a.pageY,o.lastMouseClientY=a.clientY),r&&(o=jQuery.extend(o,r)),n.dataCache[t]=o},this.getStoredEventData=function(e,t){if(!n.dataCache[e])throw new Error("updateEventData error: must have stored cache object");var i=n.dataCache[e];return i.diffMouseX=i.lastMouseX-i.startMouseX,i.diffMouseY=i.lastMouseY-i.startMouseY,i.diffMouseClientY=i.lastMouseClientY-i.startMouseClientY,i.diffTime=i.lastTime-i.startTime,t===!0?(i.startMousePos=i.lastMouseY,i.lastMousePos=i.lastMouseY,i.diffMousePos=i.diffMouseY):(i.startMousePos=i.lastMouseX,i.lastMousePos=i.lastMouseX,i.diffMousePos=i.diffMouseX),i},this.isApproveStoredEventClick=function(e,t){if(!n.dataCache[e])return!0;var r=i.getStoredEventData(e,t),o=Math.abs(r.diffMousePos);return r.diffTime>400?!1:o>30?!1:!0},this.clearStoredEventData=function(e){n.dataCache[e]=null},this.z_________CHECK_SUPPORT_FUNCTIONS_______=function(){},this.isCanvasExists=function(){var e=jQuery('<canvas width="500" height="500" > </canvas>')[0];return"function"==typeof e.getContext?!0:!1},this.isScrollbarExists=function(){var e=window.innerWidth>document.documentElement.clientWidth;return e},this.isTouchDevice=function(){if(-1!==n.isTouchDevice)return n.isTouchDevice;try{document.createEvent("TouchEvent"),n.isTouchDevice=!0}catch(e){n.isTouchDevice=!1}return n.isTouchDevice},this.isRgbaSupported=function(){if(-1!==n.isRgbaSupported)return n.isRgbaSupported;var e=document.getElementsByTagName("script")[0],t=e.style.color;try{e.style.color="rgba(1,5,13,0.44)"}catch(i){}var r=e.style.color!=t;return e.style.color=t,n.isRgbaSupported=r,r},this.z_________GENERAL_FUNCTIONS_______=function(){},this.checkMinJqueryVersion=function(e){for(var t=jQuery.fn.jquery.split("."),i=e.split("."),n=0,r=t.length;r>n;n++){var o=parseInt(t[n]),a=parseInt(i[n]);if("undefined"==typeof i[n])return!0;if(a>o)return!1;if(o>a)return!0}return!0},this.getCssSizeParam=function(e){return jQuery.isNumeric(e)?e+"px":e},this.convertHexToRGB=function(e,t){var i=e.replace("#","");return i===e?e:(r=parseInt(i.substring(0,2),16),g=parseInt(i.substring(2,4),16),b=parseInt(i.substring(4,6),16),result="rgba("+r+","+g+","+b+","+t+")",result)},this.timestampToString=function(e){var t=new Date(e),i=t.getDate()+"/"+t.getMonth();return i+=" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+":"+t.getMilliseconds()},this.getArrTouches=function(e){var t=[];return e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0&&(t=e.originalEvent.touches),t},this.getArrTouchPositions=function(e){for(var t=[],i=0;i<e.length;i++){var n={pageX:e[i].pageX,pageY:e[i].pageY};t.push(n)}return t},this.startTimeDebug=function(){n.starTime=jQuery.now()},this.showTimeDebug=function(){var e=jQuery.now(),t=e-n.starTime;debugLine({"Time Passed":t},!0)},this.initProgressIndicator=function(e,t,n){switch("bar"!=e&&0==i.isCanvasExists()&&(e="bar"),e){case"bar":var r=new UGProgressBar;r.putHidden(n,t);break;default:case"pie":var r=new UGProgressPie;r.putHidden(n,t);break;case"pie2":t.type_fill=!0;var r=new UGProgressPie;r.putHidden(n,t)}return r},this.setButtonMobileReady=function(e){e.on("touchstart",function(e){jQuery(this).addClass("ug-nohover")}),e.on("mousedown touchend",function(e){return e.stopPropagation(),e.stopImmediatePropagation(),!1})},this.registerTheme=function(e){n.arrThemes.push(e)},this.getArrThemes=function(){return n.arrThemes},this.isThemeRegistered=function(e){return-1!==jQuery.inArray(e,n.arrThemes)?!0:!1},this.getFirstRegisteredTheme=function(){if(0==n.arrThemes.length)return"";var e=n.arrThemes[0];return e},this.isTimePassed=function(e,t){if(!t)var t=100;var i=jQuery.now();0==n.timeCache.hasOwnProperty(e)?lastTime=0:lastTime=n.timeCache[e];var r=i-lastTime;return n.timeCache[e]=i,t>=r?!1:!0},this.whenContiniousEventOver=function(e,t,i){if(!i)var i=300;1==n.timeCache.hasOwnProperty(e)&&null!=n.timeCache[e]&&(clearTimeout(n.timeCache[e]),n.timeCache[e]=null),n.timeCache[e]=setTimeout(t,i)},this.validateClickTouchstartEvent=function(e){var t=!0,i=jQuery.now()-n.lastEventTime;return"click"==e&&"touchstart"==n.lastEventType&&1e3>i&&(t=!1),n.lastEventTime=jQuery.now(),n.lastEventType=e,t},this.addClassOnHover=function(e,t){if(!t)var t="ug-button-hover";e.hover(function(){jQuery(this).addClass(t)},function(){jQuery(this).removeClass(t)})},this.destroyButton=function(e){e.off("mouseenter"),e.off("mouseleave"),e.off("click"),e.off("touchstart"),e.off("touchend"),e.off("mousedown"),e.off("tap")},this.setButtonOnClick=function(e,t){i.setButtonMobileReady(e),e.on("click touchstart",function(e){return objThis=jQuery(this),e.stopPropagation(),e.stopImmediatePropagation(),0==i.validateClickTouchstartEvent(e.type)?!0:void t(objThis,e)})},this.setButtonOnTap=function(e,t){e.on("tap",t),0==i.isTouchDevice()?e.on("click",function(e){var t=jQuery(this);return 0==i.validateClickTouchstartEvent(e.type)?!0:void t.trigger("tap")}):(e.on("touchstart",function(e){var t=jQuery(this);t.addClass("ug-nohover"),n.lastTouchStartElement=jQuery(this),n.lastEventTime=jQuery.now()}),e.on("touchend",function(e){var t=jQuery(this);if(0==t.is(n.lastTouchStartElement))return!0;if(!n.lastEventTime)return!0;var i=jQuery.now()-n.lastEventTime;return i>n.touchThreshold?!0:void t.trigger("tap")}))},this.loadJs=function(e,t){t===!0&&(e=location.protocol+"//"+e);var i=document.createElement("script");i.src=e;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(i,n)},this.loadCss=function(e,t){t===!0&&(e=location.protocol+"//"+e);var i=document.createElement("link");i.setAttribute("rel","stylesheet"),i.setAttribute("type","text/css"),i.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(i)},this.addEvent=function(e,t,i){"undefined"!=typeof e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i)},this.checkImagesLoaded=function(e,t,i){function n(e,n){r++,"function"==typeof i&&setTimeout(function(){i(e,n)}),r==o&&"function"==typeof t&&setTimeout(function(){t()})}var r=0,o=e.length;return 0==o&&t?(t(),!1):void setTimeout(function(){for(var t=0;o>t;t++){var i=e[t];if(void 0!==i.naturalWidth&&0!==i.naturalWidth)n(e[t],!1);else{var r=jQuery("<img/>");r.data("index",t),r.on("load",function(){var t=jQuery(this).data("index");n(e[t],!1)}),r.on("error",function(){var t=jQuery(this).data("index");n(e[t],!0)}),r.attr("src",i.src)}}})},this.waitForWidth=function(e,t){var i=e.width();return 0!=i?(t(),!1):void(n.handle=setInterval(function(){i=e.width(),0!=i&&(clearInterval(n.handle),t())},300))},this.arrayShuffle=function(e){if("object"!=typeof e)return e;for(var t,i,n=e.length;n;t=parseInt(Math.random()*n),i=e[--n],e[n]=e[t],e[t]=i);return e},this.getObjectLength=function(e){var t=0;for(var i in e)t++;return t},this.normalizePercent=function(e){return 0>e&&(e=0),e>1&&(e=1),e},this.stripTags=function(e){var t=e.replace(/(<([^>]+)>)/gi,"");return t},this.escapeDoubleSlash=function(e){return e.replace('"','"')},this.htmlentitles=function(e){var t=jQuery("<div/>").text(e).html();return t},this.z_________END_GENERAL_FUNCTIONS_______=function(){}}function UGThumbsGeneral(){function e(e,t){var i=w[e],n="";0==C.customThumbs&&(n=" ug-thumb-generated");var r=i.index+1,o="style='z-index:"+r+";'",a="<div class='ug-thumb-wrapper"+n+"' "+o+"></div>";if(1==j.thumb_wrapper_as_link){var s=i.link;""==i.link&&(s="javascript:void(0)");var l="";1==j.thumb_link_newpage&&i.link&&(l=" target='_blank'");var a="<a href='"+s+"'"+l+" class='ug-thumb-wrapper"+n+"'></a>"}var u=jQuery(a),d=i.objThumbImage;if(0==C.customThumbs){if(1==j.thumb_show_loader&&d){var _="ug-thumb-loader-dark";"bright"==j.thumb_loader_type&&(_="ug-thumb-loader-bright"),u.append("<div class='ug-thumb-loader "+_+"'></div>"),u.append("<div class='ug-thumb-error' style='display:none'></div>")}if(d){if(d.addClass("ug-thumb-image"),1==j.thumb_image_overlay_effect){var g=d.clone().appendTo(u);g.addClass("ug-thumb-image-overlay "+t).removeClass("ug-thumb-image"),g.fadeTo(0,0),i.objImageOverlay=g}u.append(d)}}return C.isEffectBorder&&u.append("<div class='ug-thumb-border-overlay'></div>"),C.isEffectOverlay&&u.append("<div class='ug-thumb-overlay'></div>"),E.append(u),C.customThumbs&&C.funcSetCustomThumbHtml(u,i),w[e].objThumbWrapper=u,u}function t(e,t,i,n){var r={width:e+"px",height:t+"px"},o={width:e-C.thumbInnerReduce+"px",height:t-C.thumbInnerReduce+"px"},a=".ug-thumb-loader, .ug-thumb-error, .ug-thumb-border-overlay, .ug-thumb-overlay";i?(n!==!0&&i.css(r),i.find(a).css(o)):(E.children(".ug-thumb-wrapper").css(r),E.find(a).css(o))}function i(e,t,i,n){if(!n)var n=!1;P.isFakeFullscreen()&&(n=!0);var r=e.children(".ug-thumb-border-overlay"),o={};o["border-width"]=t+"px",0!=t&&(o["border-color"]=i),n&&n===!0?(r.css(o),0==t?r.hide():r.show()):(0==t?r.stop().fadeOut(j.thumb_transition_duration):r.show().stop().fadeIn(j.thumb_transition_duration),l(r,o))}function n(e,t,i){var n=e.children(".ug-thumb-overlay"),r=j.thumb_transition_duration;i&&i===!0&&(r=0),t?n.stop(!0).fadeTo(r,C.colorOverlayOpacity):n.stop(!0).fadeTo(r,0)}function r(e,t,i){var n=e.children("img.ug-thumb-image"),r=e.children("img.ug-thumb-image-overlay"),o=j.thumb_transition_duration;i&&i===!0&&(o=0),t?r.stop(!0).fadeTo(o,1):(n.fadeTo(0,1),r.stop(!0).fadeTo(o,0))}function o(e,t){if(C.isEffectBorder&&i(e,j.thumb_selected_border_width,j.thumb_selected_border_color,t),C.isEffectOverlay){var o=1==j.thumb_overlay_reverse?!0:!1;n(e,o,t)}C.isEffectImage&&r(e,!1,t),S.trigger(T.events.SETSELECTEDSTYLE,e)}function a(e){var t=T.getItemByThumb(e);return t.isLoaded=!0,t.isThumbImageLoaded=!1,1==C.customThumbs?(S.trigger(T.events.IMAGELOADERROR,e),!0):(e.children(".ug-thumb-loader").hide(),void e.children(".ug-thumb-error").show())}function s(e){if(j.thumb_round_corners_radius<=0)return!1;var t={"border-radius":j.thumb_round_corners_radius+"px"};e?(e.css(t),e.find(".ug-thumb-border-overlay").css(t)):E.find(".ug-thumb-wrapper, .ug-thumb-wrapper .ug-thumb-border-overlay").css(t)}function l(e,t){e.stop(!0).animate(t,{duration:j.thumb_transition_duration,easing:j.thumb_transition_easing,queue:!1})}function u(e){1==c(e)?o(e,!0,"redraw"):T.setThumbNormalStyle(e,!0,"redraw")}function d(e,i,n){if(1==j.thumb_fixed_size)x.scaleImageCoverParent(i,e);else{"height"==j.thumb_resize_by?x.scaleImageByHeight(i,j.thumb_height):x.scaleImageByWidth(i,j.thumb_width);var r=x.getElementSize(i);x.placeElement(i,0,0),t(r.width,r.height,e)}e.children(".ug-thumb-loader").hide(),i.show(),0==j.thumb_image_overlay_effect?i.fadeTo(0,1):(1==j.thumb_image_overlay_effect&&_(i),i.fadeTo(0,0),u(e)),S.trigger(T.events.AFTERPLACEIMAGE,e)}function _(e){var t=e.siblings(".ug-thumb-image-overlay");if(0==t.length)return!1;var i=x.getElementSize(e),n={width:i.width+"px",height:i.height+"px",left:i.left+"px",top:i.top+"px"};t.css(n),0==C.customThumbs&&t.fadeTo(0,1)}function g(){var e="",t=j.thumb_image_overlay_type.split(",");for(var i in t){var n=t[i];switch(n){case"bw":e+=" ug-bw-effect";break;case"blur":e+=" ug-blur-effect";break;case"sepia":e+=" ug-sepia-effect"}}return e}function c(e){return e.hasClass("ug-thumb-selected")?!0:!1}function h(e,i){i=jQuery(i);var n=(T.getItemByThumb(i),x.getElementSize(i));t(n.width,n.height,i,!0),u(i)}function p(e){return 1==C.touchEnabled?(objThumbs.off("mouseenter").off("mouseleave"),!0):void(0==c(e)&&T.setThumbOverStyle(e))}function f(e){return 1==C.touchEnabled?!0:void(0==c(e)&&T.setThumbNormalStyle(e,!1))}function m(e,t){if(!t)var t=!1;var i=jQuery(e),n=i.parents(".ug-thumb-wrapper");return 0==n.parent().length?!1:(objItem=T.getItemByThumb(n),1==objItem.isLoaded&&t===!1?!1:(T.triggerImageLoadedEvent(n,i),void(1==C.customThumbs?S.trigger(T.events.PLACEIMAGE,[n,i]):d(n,i,objItem))))}function v(e,t,i){objItem=T.getItemByThumb(t),objItem.isLoaded=!0,objItem.isThumbImageLoaded=!0;var n=x.getImageOriginalSize(i);objItem.thumbWidth=n.width,objItem.thumbHeight=n.height,objItem.thumbRatioByWidth=n.width/n.height,objItem.thumbRatioByHeight=n.height/n.width,t.addClass("ug-thumb-ratio-set")}var b,y,I,w,E,T=this,S=jQuery(T),P=new UniteGalleryMain,x=new UGFunctions;this.type={GET_THUMBS_ALL:"all",GET_THUMBS_RATIO:"ratio",GET_THUMBS_NO_RATIO:"no_ratio",GET_THUMBS_NEW:"new"},this.events={SETOVERSTYLE:"thumbmouseover",SETNORMALSTYLE:"thumbmouseout",SETSELECTEDSTYLE:"thumbsetselected",PLACEIMAGE:"thumbplaceimage",AFTERPLACEIMAGE:"thumb_after_place_image",IMAGELOADERROR:"thumbimageloaderror",THUMB_IMAGE_LOADED:"thumb_image_loaded"};var j={thumb_width:88,thumb_height:50,thumb_fixed_size:!0,thumb_resize_by:"height",thumb_border_effect:!0,thumb_border_width:0,thumb_border_color:"#000000",thumb_over_border_width:0,thumb_over_border_color:"#d9d9d9",thumb_selected_border_width:1,thumb_selected_border_color:"#d9d9d9",thumb_round_corners_radius:0,thumb_color_overlay_effect:!0,thumb_overlay_color:"#000000",thumb_overlay_opacity:.4,thumb_overlay_reverse:!1,thumb_image_overlay_effect:!1,thumb_image_overlay_type:"bw",thumb_transition_duration:200,thumb_transition_easing:"easeOutQuad",thumb_show_loader:!0,thumb_loader_type:"dark",thumb_wrapper_as_link:!1,thumb_link_newpage:!1},C={touchEnabled:!1,num_thumbs_checking:0,customThumbs:!1,funcSetCustomThumbHtml:null,isEffectBorder:!1,isEffectOverlay:!1,isEffectImage:!1,colorOverlayOpacity:1,thumbInnerReduce:0,allowOnResize:!0,classNewThumb:"ug-new-thumb"},A={timeout_thumb_check:100,thumb_max_check_times:600,eventSizeChange:"thumb_size_change"};this.init=function(e,t){y=e.getObjects(),P=e,b=jQuery(e),I=y.g_objWrapper,w=y.g_arrItems,j=jQuery.extend(j,t),C.isEffectBorder=j.thumb_border_effect,C.isEffectOverlay=j.thumb_color_overlay_effect,C.isEffectImage=j.thumb_image_overlay_effect},this._____________EXTERNAL_SETTERS__________=function(){},this.setHtmlThumbs=function(t,i){if(E=t,1==C.isEffectImage)var n=g();if(i!==!0)for(var r=P.getNumItems(),o=0;r>o;o++)e(o,n);else{var a=T.getThumbs();a.removeClass(C.classNewThumb);var s=P.getNewAddedItemsIndexes();jQuery.each(s,function(t,i){var r=e(i,n);r.addClass(C.classNewThumb)})}},this.setThumbNormalStyle=function(e,t,o){if(1==C.customThumbs&&e.removeClass("ug-thumb-over"),C.isEffectBorder&&i(e,j.thumb_border_width,j.thumb_border_color,t),C.isEffectOverlay){var a=1==j.thumb_overlay_reverse?!1:!0;n(e,a,t)}C.isEffectImage&&r(e,!0,t),S.trigger(T.events.SETNORMALSTYLE,e)},this.setThumbOverStyle=function(e){if(1==C.customThumbs&&e.addClass("ug-thumb-over"),C.isEffectBorder&&i(e,j.thumb_over_border_width,j.thumb_over_border_color),C.isEffectOverlay){var t=1==j.thumb_overlay_reverse?!0:!1;n(e,t)}1==C.isEffectImage&&r(e,!1),S.trigger(T.events.SETOVERSTYLE,e)},this.setHtmlProperties=function(e){if(!e)var e=T.getThumbs();if(0==C.customThumbs){1==j.thumb_fixed_size&&t(j.thumb_width,j.thumb_height,e),s(e)}if(e.each(function(){var e=jQuery(this);u(e)}),C.isEffectOverlay&&j.thumb_overlay_color){var i={};if(x.isRgbaSupported()){var n=x.convertHexToRGB(j.thumb_overlay_color,j.thumb_overlay_opacity);i["background-color"]=n}else i["background-color"]=j.thumb_overlay_color,C.colorOverlayOpacity=j.thumb_overlay_opacity;e.find(".ug-thumb-overlay").css(i)}},this.setThumbSelected=function(e){return 1==C.customThumbs&&e.removeClass("ug-thumb-over"),1==c(e)?!0:(e.addClass("ug-thumb-selected"),void o(e))},this.setThumbUnselected=function(e){e.removeClass("ug-thumb-selected"),T.setThumbNormalStyle(e,!1,"set unselected")},this.setOptions=function(e){j=jQuery.extend(j,e)},this.setThumbInnerReduce=function(e){C.thumbInnerReduce=e},this.setCustomThumbs=function(e,t,i){if(C.customThumbs=!0,"function"!=typeof e)throw new Error("The argument should be function");C.funcSetCustomThumbHtml=e,-1==jQuery.inArray("overlay",t)&&(C.isEffectOverlay=!1),-1==jQuery.inArray("border",t)&&(C.isEffectBorder=!1),C.isEffectImage=!1,i&&i.allow_onresize===!1&&(C.allowOnResize=!1)},this._____________EXTERNAL_GETTERS__________=function(){},this.getOptions=function(){return j},this.getNumThumbs=function(){var e=w.length;return e},this.getThumbImage=function(e){var t=e.find(".ug-thumb-image");return t},this.getThumbByIndex=function(e){var t=T.getThumbs();if(e>=t.length||0>e)throw new Error("Wrong thumb index");var i=jQuery(t[e]);return i},this.getThumbs=function(e){var t=".ug-thumb-wrapper",i=".ug-thumb-ratio-set";switch(e){default:case T.type.GET_THUMBS_ALL:var n=E.children(t);break;case T.type.GET_THUMBS_NO_RATIO:var n=E.children(t).not(i);break;case T.type.GET_THUMBS_RATIO:var n=E.children(t+i);break;case T.type.GET_THUMBS_NEW:var n=E.children("."+C.classNewThumb)}return n},this.getItemByThumb=function(e){var t=e.data("index");void 0===t&&(t=e.index());var i=w[t];return i},this.isThumbLoaded=function(e){var t=T.getItemByThumb(e);return t.isLoaded},this.getGlobalThumbSize=function(){var e={width:j.thumb_width,
height:j.thumb_height};return e},this._____________EXTERNAL_OTHERS__________=function(){},this.initEvents=function(){var e=".ug-thumb-wrapper";1==C.allowOnResize&&I.on(A.eventSizeChange,h),S.on(T.events.THUMB_IMAGE_LOADED,v),E.on("touchstart",e,function(){C.touchEnabled=!0,E.off("mouseenter").off("mouseleave")}),E.on("mouseenter",e,function(e){var t=jQuery(this);p(t)}),E.on("mouseleave",e,function(e){var t=jQuery(this);f(t)})},this.destroy=function(){var e=".ug-thumb-wrapper";E.off("touchstart",e),I.off(A.eventSizeChange),E.off("mouseenter",e),E.off("mouseleave",e),S.off(T.events.THUMB_IMAGE_LOADED)},this.loadThumbsImages=function(){var e=E.find(".ug-thumb-image");x.checkImagesLoaded(e,null,function(e,t){if(0==t)m(e,!0);else{var i=jQuery(e).parent();a(i)}})},this.triggerImageLoadedEvent=function(e,t){S.trigger(T.events.THUMB_IMAGE_LOADED,[e,t])},this.hideThumbs=function(){E.find(".ug-thumb-wrapper").hide()}}function UGThumbsStrip(){function e(e,i){S=e.getObjects(),z=e,z.attachThumbsPanel("strip",O),T=jQuery(e),P=S.g_objWrapper,x=S.g_arrItems,k=jQuery.extend(k,i),H=k.strip_vertical_type,1==H&&(k=jQuery.extend(k,D),k=jQuery.extend(k,i),i.thumb_resize_by="width"),N.init(e,i),t()}function t(){var e=N.getOptions();R.isNotFixedThumbs=e.thumb_fixed_size===!1,H=k.strip_vertical_type}function n(){N.setHtmlProperties(),o(),l(),s(),0==R.isRunOnce&&(1==k.strip_control_touch&&(M=new UGTouchThumbsControl,M.init(O)),1==k.strip_control_avia&&(A=new UGAviaControl,A.init(O)),p(),N.loadThumbsImages(),y()),R.isRunOnce=!0}function r(e){G.stripSize=e,0==H?G.stripActiveSize=G.stripSize-k.strip_padding_left-k.strip_padding_right:G.stripActiveSize=G.stripSize-k.strip_padding_top-k.strip_padding_bottom,G.stripActiveSize<0&&(G.stripActiveSize=0)}function o(){var e=C.children(".ug-thumb-wrapper"),t=jQuery(e[0]),i=t.outerWidth(),n=t.outerHeight(),o=N.getOptions();0==H?(G.thumbSize=i,1==o.thumb_fixed_size?G.thumbSecondSize=n:G.thumbSecondSize=o.thumb_height,r(j.width()),G.stripInnerSize=C.width()):(G.thumbSize=n,1==o.thumb_fixed_size?G.thumbSecondSize=i:G.thumbSecondSize=o.thumb_width,r(j.height()),G.stripInnerSize=C.height())}function a(e){0==H?C.width(e):C.height(e),G.stripInnerSize=e,p(),jQuery(O).trigger(O.events.INNER_SIZE_CHANGE)}function s(){var e=C.children(".ug-thumb-wrapper"),t=0,n=0;for(0==H&&(n=k.strip_padding_top),i=0;i<e.length;i++){var r=jQuery(e[i]);if(1==R.isNotFixedThumbs){if(objItem=N.getItemByThumb(r),0==objItem.isLoaded)continue;r.show()}L.placeElement(r,t,n),0==H?t+=r.outerWidth()+k.strip_space_between_thumbs:n+=r.outerHeight()+k.strip_space_between_thumbs}if(0==H)var o=t-k.strip_space_between_thumbs;else var o=n-k.strip_space_between_thumbs;a(o)}function l(){if(0==H){var e=G.thumbSecondSize,t={};t.height=e+"px";var i={};i.height=e+"px"}else{var n=G.thumbSecondSize,t={};t.width=n+"px";var i={};i.width=n+"px"}j.css(t),C.css(i)}function u(e){var t=O.getInnerStripPos(),i=t+e;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function d(e){var t=E(e),i=-1*t.min;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function _(e){var t=E(e),i=-1*t.max+G.stripSize;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function g(e){if(0==I())return!1;var t=w(),i=E(e);if(i.min<t.minPosThumbs){var n=e.prev();d(n.length?n:e)}else if(i.max>t.maxPosThumbs){var r=e.next();_(r.length?r:e)}}function c(){var e=z.getSelectedItem();if(null==e)return!0;var t=e.objThumbWrapper;t&&g(t)}function h(){if(0==I())return!1;var e=O.getInnerStripPos(),t=O.fixInnerStripLimits(e);e!=t&&O.positionInnerStrip(t,!0)}function p(){var e=I();1==e?(A&&A.enable(),M&&M.enable()):(A&&A.disable(),M&&M.disable())}function f(){return I()?!1:void(0==H?L.placeElement(C,k.strip_thumbs_align,0):L.placeElement(C,0,k.strip_thumbs_align))}function m(e){if(O.isTouchMotionActive()){var t=M.isSignificantPassed();if(1==t)return!0}var i=N.getItemByThumb(e);z.selectItem(i)}function v(){clearTimeout(R.handle),R.handle=setTimeout(function(){s()},50)}function b(){var e=z.getSelectedItem();N.setThumbSelected(e.objThumbWrapper),g(e.objThumbWrapper)}function y(){N.initEvents();var e=j.find(".ug-thumb-wrapper");e.on("click touchend",function(e){var t=jQuery(this);m(t)}),T.on(z.events.ITEM_CHANGE,b),R.isNotFixedThumbs&&jQuery(N).on(N.events.AFTERPLACEIMAGE,v)}function I(){return G.stripInnerSize>G.stripActiveSize?!0:!1}function w(){var e={},t=O.getInnerStripPos();return e.minPosThumbs=-1*t+1,e.maxPosThumbs=-1*t+G.stripSize-1,e}function E(e){var t={},i=e.position();return 0==H?(t.min=i.left,t.max=i.left+G.thumbSize):(t.min=i.top,t.max=i.top+G.thumbSize),t}var T,S,P,x,j,C,A,M,O=this,z=new UniteGalleryMain,L=new UGFunctions,H=!1,N=new UGThumbsGeneral,L=new UGFunctions,k={strip_vertical_type:!1,strip_thumbs_align:"left",strip_space_between_thumbs:6,strip_thumb_touch_sensetivity:15,strip_scroll_to_thumb_duration:500,strip_scroll_to_thumb_easing:"easeOutCubic",strip_control_avia:!0,strip_control_touch:!0,strip_padding_top:0,strip_padding_bottom:0,strip_padding_left:0,strip_padding_right:0},R={isRunOnce:!1,is_placed:!1,isNotFixedThumbs:!1,handle:null},G={stripSize:0,stripActiveSize:0,stripInnerSize:0,thumbSize:0,thumbSecondSize:0};this.events={STRIP_MOVE:"stripmove",INNER_SIZE_CHANGE:"size_change"};var D={strip_thumbs_align:"top",thumb_resize_by:"width"};this.setHtml=function(e){if(!e){var e=P;null!=k.parent_container&&(e=k.parent_container)}e.append("<div class='ug-thumbs-strip'><div class='ug-thumbs-strip-inner'></div></div>"),j=e.children(".ug-thumbs-strip"),C=j.children(".ug-thumbs-strip-inner"),N.setHtmlThumbs(C),1==R.isNotFixedThumbs&&N.hideThumbs()},this.destroy=function(){var e=j.find(".ug-thumb-wrapper");e.off("click"),e.off("touchend"),T.off(z.events.ITEM_CHANGE),jQuery(N).off(N.events.AFTERPLACEIMAGE),M&&M.destroy(),A&&A.destroy(),N.destroy()},this.________EXTERNAL_GENERAL___________=function(){},this.init=function(t,i){e(t,i)},this.run=function(){n()},this.positionInnerStrip=function(e,t){if(void 0===t)var t=!1;if(0==H)var i={left:e+"px"};else var i={top:e+"px"};0==t?(C.css(i),O.triggerStripMoveEvent()):(O.triggerStripMoveEvent(),C.stop(!0).animate(i,{duration:k.strip_scroll_to_thumb_duration,easing:k.strip_scroll_to_thumb_easing,queue:!1,progress:function(){O.triggerStripMoveEvent()},always:function(){O.triggerStripMoveEvent()}}))},this.triggerStripMoveEvent=function(){jQuery(O).trigger(O.events.STRIP_MOVE)},this.isTouchMotionActive=function(){if(!M)return!1;var e=M.isTouchActive();return e},this.isItemThumbVisible=function(e){var t=e.objThumbWrapper,i=t.position(),n=-1*O.getInnerStripPos();if(0==H)var r=n+G.stripSize,o=i.left,a=i.left+t.width();else var r=n+G.stripSize,o=i.top,a=i.top+t.height();var s=!1;return a>=n&&r>=o&&(s=!0),s},this.getInnerStripPos=function(){return 0==H?C.position().left:C.position().top},this.getInnerStripLimits=function(){var e={};return 0==H?e.maxPos=k.strip_padding_left:e.maxPos=k.strip_padding_top,e.minPos=-(G.stripInnerSize-G.stripActiveSize),e},this.fixInnerStripLimits=function(e){var t=O.getInnerStripLimits();return e>t.maxPos&&(e=t.maxPos),e<t.minPos&&(e=t.minPos),e},this.scrollForeward=function(){u(-G.stripSize)},this.scrollBack=function(){u(G.stripSize)},this.________EXTERNAL_SETTERS___________=function(){},this.setOptions=function(e){k=jQuery.extend(k,e),N.setOptions(e),t()},this.setSizeVertical=function(e){if(0==H)throw new Error("setSizeVertical error, the strip size is not vertical");var t=G.thumbSecondSize,i={};i.width=t+"px",i.height=e+"px",j.css(i),r(e);var n={};n.width=t+"px",n.left="0px",n.top="0px",C.css(n),R.is_placed=!0,p()},this.setSizeHorizontal=function(e){if(1==H)throw new Error("setSizeHorizontal error, the strip size is not horizontal");var t=G.thumbSecondSize+k.strip_padding_top+k.strip_padding_bottom,i={};i.width=e+"px",i.height=t+"px",j.css(i),r(e);var n=k.strip_padding_left,o={};o.height=t+"px",o.left=n+"px",o.top="0px",C.css(o),R.is_placed=!0,p()},this.setPosition=function(e,t,i,n){L.placeElement(j,e,t,i,n)},this.resize=function(e){0==H?(j.width(e),G.stripActiveSize=e-k.strip_padding_left-k.strip_padding_right):(j.height(e),G.stripActiveSize=e-k.strip_padding_top-k.strip_padding_bottom),r(e),p(),h(),f(),c()},this.setThumbUnselected=function(e){N.setThumbUnselected(e)},this.setCustomThumbs=function(e){N.setCustomThumbs(e)},this.________EXTERNAL_GETTERS___________=function(){},this.getObjects=function(){var e=N.getOptions(),t=jQuery.extend(k,e),i={g_gallery:z,g_objGallery:T,g_objWrapper:P,g_arrItems:x,g_objStrip:j,g_objStripInner:C,g_aviaControl:A,g_touchThumbsControl:M,isVertical:H,g_options:t,g_thumbs:N};return i},this.getObjThumbs=function(){return N},this.getSelectedThumb=function(){var e=z.getSelectedItemIndex();return-1==e?null:N.getThumbByIndex(e)},this.getSizeAndPosition=function(){var e=L.getElementSize(j);return e},this.getHeight=function(){var e=j.outerHeight();return e},this.getWidth=function(){var e=j.outerWidth();return e},this.getSizes=function(){return G},this.isVertical=function(){return H},this.isPlaced=function(){return R.is_placed},this.isMoveEnabled=function(){var e=I();return e}}function UGTouchThumbsControl(){function e(){var e=jQuery.now(),t={};return t.passedTime=T.lastTime-T.startTime,t.lastActiveTime=e-T.buttonReleaseTime,t.passedDistance=T.lastPos-T.startPos,t.passedDistanceAbs=Math.abs(t.passedDistance),t}function t(){E.thumb_touch_slowFactor=w.normalizeSetting(5e-5,.01,1,100,y.strip_thumb_touch_sensetivity,!0)}function i(e){return 0==I?w.getMousePosition(e).pageX:w.getMousePosition(e).pageY}function n(e){var t=T.mousePos-e,i=T.innerPos-t,n=h.getInnerStripLimits();if(i>n.maxPos){var r=i-n.maxPos;i=n.maxPos+r/3}if(i<n.minPos){var r=n.minPos-i;i=n.minPos-r/3}h.positionInnerStrip(i)}function r(e){var t=h.getInnerStripPos();T.mousePos=e,T.innerPos=t,T.lastPortionPos=t,T.lastDeltaTime=0,T.lastDeltaPos=0,T.startTime=jQuery.now(),T.startPos=T.innerPos,T.lastTime=T.startTime,T.lastPos=T.startPos,T.speed=0}function o(){var e=jQuery.now(),t=e-T.lastTime;t>=E.touch_portion_time&&(T.lastDeltaTime=e-T.lastTime,T.lastDeltaTime>E.touch_portion_time&&(T.lastDeltaTime=E.touch_portion_time),T.lastDeltaPos=T.lastPos-T.lastPortionPos,T.lastPortionPos=T.lastPos,T.lastTime=e)}function a(){var e=E.thumb_touch_slowFactor,t=E.minDeltaTime,i=E.minPath,n=h.getInnerStripPos(),r=jQuery.now(),o=r-T.lastTime,a=n-T.lastPortionPos;t>o&&T.lastDeltaTime>0&&(o=T.lastDeltaTime,a=T.lastDeltaPos+a),t>o&&(o=t);var l=a>0?1:-1,u=0;o>0&&(u=a/o);var d=u*u/(2*e)*l;Math.abs(d)<=i&&(d=0);var _=h.getInnerStripPos(),g=_+d,c=h.fixInnerStripLimits(g),p=h.getInnerStripLimits(),f=E.limitsBreakAddition,m=!1,v=c;if(g>p.maxPos&&(m=!0,c=f,f>g&&(c=g)),g<p.minPos){m=!0;var y=p.minPos-f;c=y,g>y&&(c=g)}var w=c-_,S=Math.abs(Math.round(u/e));if(0!=d&&(S=S*w/d),_!=c){var P={left:c+"px"};1==I&&(P={top:c+"px"}),b.animate(P,{duration:S,easing:E.animationEasing,queue:!0,progress:s})}if(1==m){var x=E.returnAnimateSpeed,j={left:v+"px"};1==I&&(j={top:v+"px"}),b.animate(j,{duration:x,easing:E.returnAnimationEasing,queue:!0,progress:s})}}function s(){T.lastPos=h.getInnerStripPos(),h.triggerStripMoveEvent()}function l(){return 1==T.loop_active?!0:(T.loop_active=!0,void(T.handle=setInterval(o,10)))}function u(e){if(0==T.loop_active)return!0;if(e){var t=i(e);a(t)}T.loop_active=!1,T.handle=clearInterval(T.handle)}function d(e){return 0==T.isControlEnabled?!0:(T.buttonReleaseTime=jQuery.now(),0==T.touch_active?(u(e),!0):(e.preventDefault(),T.touch_active=!1,u(e),void v.removeClass("ug-dragging")))}function _(e){if(0==T.isControlEnabled)return!0;e.preventDefault(),T.touch_active=!0;var t=i(e);b.stop(!0),r(t),l(),v.addClass("ug-dragging")}function g(e){if(0==T.isControlEnabled)return!0;if(0==T.touch_active)return!0;if(e.preventDefault(),0==e.buttons)return T.touch_active=!1,u(e),!0;var t=i(e);T.lastPos=h.getInnerStripPos(),n(t),o()}function c(){v.bind("mousedown touchstart",_),jQuery(window).add("body").bind("mouseup touchend",d),jQuery("body").bind("mousemove touchmove",g)}var h,p,f,m,v,b,y,I,w=new UGFunctions,E={touch_portion_time:200,thumb_touch_slowFactor:0,minDeltaTime:70,minPath:10,limitsBreakAddition:30,returnAnimateSpeed:500,animationEasing:"easeOutCubic",returnAnimationEasing:"easeOutCubic"},T={touch_active:!1,loop_active:!1,mousePos:0,innerPos:0,startPos:0,startTime:0,lastTime:0,buttonReleaseTime:0,lastPos:0,lastPortionPos:0,lastDeltaTime:0,lastDeltaPos:0,speed:0,handle:"",touchEnabled:!1,isControlEnabled:!0};this.enable=function(){T.isControlEnabled=!0},this.disable=function(){T.isControlEnabled=!1},this.init=function(e){h=e,m=e.getObjects(),p=m.g_gallery,f=m.g_objGallery,v=m.g_objStrip,b=m.g_objStripInner,y=m.g_options,I=m.isVertical,t(),c()},this.isSignificantPassed=function(){var t=e();return t.passedTime>300?!0:t.passedDistanceAbs>30?!0:!1},this.isTouchActive=function(){if(1==T.touch_active)return!0;if(1==b.is(":animated"))return!0;var t=e();return t.lastActiveTime<50?!0:!1},this.destroy=function(){v.unbind("mousedown"),v.unbind("touchstart"),jQuery(window).add("body").unbind("mouseup").unbind("touchend"),jQuery("body").unbind("mousemove").unbind("touchmove")}}function UGPanelsBase(){function e(e,t){switch(n.orientation){case"right":case"left":var i={left:e+"px"};break;case"top":case"bottom":var i={top:e+"px"}}o.stop(!0).animate(i,{duration:300,easing:"easeInOutQuad",queue:!1,complete:function(){t&&t()}})}function t(e){switch(n.orientation){case"right":case"left":g.placeElement(o,e,null);break;case"top":case"bottom":g.placeElement(o,null,e)}}function i(){s.trigger(r.events.FINISH_MOVE)}var n,r,o,a,s,l,u,d=new UniteGalleryMain,_=this,g=new UGFunctions;this.init=function(e,t,i,o,l){n=t,r=i,d=e,a=o,s=l,u=jQuery(d)},this.setHtml=function(e){if(o=e,"strip"==n.panelType)var t=a.strippanel_enable_handle;else var t=a.gridpanel_enable_handle;if(1==t&&(l=new UGPanelHandle,l.init(r,o,a,n.panelType,d),l.setHtml()),n.isDisabledAtStart===!0){var i="<div class='ug-overlay-disabled'></div>";o.append(i),setTimeout(function(){o.children(".ug-overlay-disabled").hide()},n.disabledAtStartTimeout)}},this.placeElements=function(){l&&l.placeHandle()},this.initEvents=function(){l&&(l.initEvents(),u.on(d.events.SLIDER_ACTION_START,function(){l.hideHandle()}),u.on(d.events.SLIDER_ACTION_END,function(){l.showHandle()}))},this.destroy=function(){l&&(l.destroy(),u.off(d.events.SLIDER_ACTION_START),u.off(d.events.SLIDER_ACTION_END))},this.openPanel=function(a){if(!a)var a=!1;return o.is(":animated")?!1:0==n.isClosed?!1:(n.isClosed=!1,s.trigger(r.events.OPEN_PANEL),void(a===!1?e(n.originalPos,i):(t(n.originalPos),i())))},this.closePanel=function(a){if(!a)var a=!1;if(o.is(":animated"))return!1;if(1==n.isClosed)return!1;var l=_.getClosedPanelDest();n.isClosed=!0,s.trigger(r.events.CLOSE_PANEL),a===!1?e(l,i):(t(l),i())},this.setClosedState=function(e){n.originalPos=e,s.trigger(r.events.CLOSE_PANEL),n.isClosed=!0},this.setOpenedState=function(e){s.trigger(r.events.OPEN_PANEL),n.isClosed=!1},this.getClosedPanelDest=function(){var e,t=g.getElementSize(o);switch(n.orientation){case"left":n.originalPos=t.left,e=-n.panelWidth;break;case"right":n.originalPos=t.left;var i=d.getSize();e=i.width;break;case"top":n.originalPos=t.top,e=-n.panelHeight;break;case"bottom":n.originalPos=t.top;var i=d.getSize();e=i.height}return e},this.isPanelClosed=function(){return n.isClosed},this.setDisabledAtStart=function(e){return 0>=e?!1:(n.isDisabledAtStart=!0,void(n.disabledAtStartTimeout=e))}}function UGPanelHandle(){function e(){s.removeClass("ug-button-hover")}function t(){s.addClass("ug-button-closed")}function i(){s.removeClass("ug-button-closed")}function n(e){return e.stopPropagation(),e.stopImmediatePropagation(),0==l.validateClickTouchstartEvent(e.type)?!0:void(a.isPanelClosed()?a.openPanel():a.closePanel())}function r(){var e=a.getOrientation();switch(e){case"right":case"left":"top"!=u.panel_handle_align&&"bottom"!=u.panel_handle_align&&(u.panel_handle_align="top");break;case"bottom":"left"!=u.panel_handle_align&&"right"!=u.panel_handle_align&&(u.panel_handle_align="left");break;case"top":"left"!=u.panel_handle_align&&"right"!=u.panel_handle_align&&(u.panel_handle_align="right")}}var o,a,s,l=new UGFunctions,u={panel_handle_align:"top",panel_handle_offset:0,panel_handle_skin:0};this.init=function(e,t,i,n,r){switch(a=e,o=t,n){case"grid":u.panel_handle_align=i.gridpanel_handle_align,u.panel_handle_offset=i.gridpanel_handle_offset,u.panel_handle_skin=i.gridpanel_handle_skin;break;case"strip":u.panel_handle_align=i.strippanel_handle_align,u.panel_handle_offset=i.strippanel_handle_offset,u.panel_handle_skin=i.strippanel_handle_skin;break;default:throw new Error("Panel handle error: wrong panel type: "+n)}var s=r.getOptions(),l=s.gallery_skin;""==u.panel_handle_skin&&(u.panel_handle_skin=l)},this.setHtml=function(){var e=a.getOrientation(),t="ug-panel-handle-tip";switch(e){case"right":t+=" ug-handle-tip-left";break;case"left":t+=" ug-handle-tip-right";break;case"bottom":t+=" ug-handle-tip-top";break;case"top":t+=" ug-handle-tip-bottom"}o.append("<div class='"+t+" ug-skin-"+u.panel_handle_skin+"'></div>"),s=o.children(".ug-panel-handle-tip")},this.initEvents=function(){l.addClassOnHover(s),s.bind("click touchstart",n),jQuery(a).on(a.events.OPEN_PANEL,function(){e(),i()}),jQuery(a).on(a.events.CLOSE_PANEL,function(){e(),t()})},this.destroy=function(){l.destroyButton(s),jQuery(a).off(a.events.OPEN_PANEL),jQuery(a).off(a.events.CLOSE_PANEL)},this.placeHandle=function(){var e=l.getElementSize(s);r();var t=a.getOrientation();switch(t){case"left":l.placeElement(s,"right",u.panel_handle_align,-e.width);break;case"right":l.placeElement(s,-e.width,u.panel_handle_align,0,u.panel_handle_offset);break;case"top":l.placeElement(s,u.panel_handle_align,"bottom",u.panel_handle_offset,-e.height);break;case"bottom":l.placeElement(s,u.panel_handle_align,"top",u.panel_handle_offset,-e.height);break;default:throw new Error("Wrong panel orientation: "+t)}},this.hideHandle=function(){1==s.is(":visible")&&s.hide()},this.showHandle=function(){0==s.is(":visible")&&s.show()}}function UGStripPanel(){function e(e,t){T=e,m=jQuery(T),j=jQuery.extend(j,t);var i=!1;1==j.strippanel_vertical_type&&(j=jQuery.extend(j,C),i=!0),0==j.strippanel_enable_buttons&&(j=jQuery.extend(j,A),i=!0),1==i&&(j=jQuery.extend(j,t));var n=T.getOptions(),r=n.gallery_skin;""==j.strippanel_buttons_skin&&(j.strippanel_buttons_skin=r),v=T.getElement(),x.init(T,M,w,j,E),P=new UGThumbsStrip,P.init(T,j)}function t(){if(0==j.strippanel_vertical_type){if(0==M.panelWidth)throw new Error("Strip panel error: The width not set, please set width")}else if(0==M.panelHeight)throw new Error("Strip panel error: The height not set, please set height");if(null==M.orientation)throw new Error("Wrong orientation, please set panel orientation before run");return!0}function i(){return 1==M.isFirstRun&&0==t()?!1:(P.run(),s(),d(),f(),M.isFirstRun=!1,void c())}function n(e){if(!e)var e=v;if(e.append("<div class='ug-strip-panel'></div>"),b=e.children(".ug-strip-panel"),1==j.strippanel_enable_buttons){var t="ug-strip-arrow-left",i="ug-strip-arrow-right";1==j.strippanel_vertical_type&&(t="ug-strip-arrow-up",i="ug-strip-arrow-down"),b.append("<div class='ug-strip-arrow "+t+" ug-skin-"+j.strippanel_buttons_skin+"'><div class='ug-strip-arrow-tip'></div></div>"),b.append("<div class='ug-strip-arrow "+i+" ug-skin-"+j.strippanel_buttons_skin+"'><div class='ug-strip-arrow-tip'></div></div>")}x.setHtml(b),P.setHtml(b),1==j.strippanel_enable_buttons&&(I=b.children("."+t),y=b.children("."+i)),r()}function r(){""!=j.strippanel_background_color&&b.css("background-color",j.strippanel_background_color)}function o(){var e=P.getHeight(),t=M.panelWidth;if(y){I.height(e),y.height(e);var i=I.children(".ug-strip-arrow-tip");S.placeElement(i,"center","middle");var n=y.children(".ug-strip-arrow-tip");S.placeElement(n,"center","middle")}var r=e+j.strippanel_padding_top+j.strippanel_padding_bottom;b.width(t),b.height(r),M.panelHeight=r;var o=t-j.strippanel_padding_left-j.strippanel_padding_right;if(y){var a=y.outerWidth();o=o-2*a-2*j.strippanel_padding_buttons}P.resize(o)}function a(){var e=P.getWidth(),t=M.panelHeight;if(y){I.width(e),y.width(e);var i=I.children(".ug-strip-arrow-tip");S.placeElement(i,"center","middle");var n=y.children(".ug-strip-arrow-tip");S.placeElement(n,"center","middle")}var r=e+j.strippanel_padding_left+j.strippanel_padding_right;b.width(r),b.height(t),M.panelWidth=r;var o=t-j.strippanel_padding_top-j.strippanel_padding_bottom;if(y){var a=y.outerHeight();o=o-2*a-2*j.strippanel_padding_buttons}P.resize(o)}function s(){0==j.strippanel_vertical_type?o():a()}function l(){y&&(S.placeElement(I,"left","top",j.strippanel_padding_left,j.strippanel_padding_top),S.placeElement(y,"right","top",j.strippanel_padding_right,j.strippanel_padding_top));var e=j.strippanel_padding_left;y&&(e+=y.outerWidth()+j.strippanel_padding_buttons),P.setPosition(e,j.strippanel_padding_top)}function u(){y&&(S.placeElement(I,"left","top",j.strippanel_padding_left,j.strippanel_padding_top),S.placeElement(y,"left","bottom",j.strippanel_padding_left,j.strippanel_padding_bottom));var e=j.strippanel_padding_top;y&&(e+=y.outerHeight()+j.strippanel_padding_buttons),P.setPosition(j.strippanel_padding_left,e)}function d(){0==j.strippanel_vertical_type?l():u(),x.placeElements()}function _(e){return S.isButtonDisabled(e)?!0:void("advance_item"==j.strippanel_buttons_role?T.nextItem():P.scrollForeward())}function g(e){return S.isButtonDisabled(e)?!0:void("advance_item"==j.strippanel_buttons_role?T.prevItem():P.scrollBack())}function c(){if(!y)return!0;if(0==P.isMoveEnabled())return S.disableButton(I),S.disableButton(y),!0;var e=P.getInnerStripLimits(),t=P.getInnerStripPos();t>=e.maxPos?S.disableButton(I):S.enableButton(I),t<=e.minPos?S.disableButton(y):S.enableButton(y)}function h(){c()}function p(){T.isLastItem()?S.disableButton(y):S.enableButton(y),T.isFirstItem()?S.disableButton(I):S.enableButton(I)}function f(){if(1==M.isEventsInited)return!1;if(M.isEventsInited=!0,y)if(S.addClassOnHover(y,"ug-button-hover"),S.addClassOnHover(I,"ug-button-hover"),S.setButtonOnClick(I,g),S.setButtonOnClick(y,_),"advance_item"!=j.strippanel_buttons_role)jQuery(P).on(P.events.STRIP_MOVE,h),jQuery(P).on(P.events.INNER_SIZE_CHANGE,c),m.on(T.events.SIZE_CHANGE,c);else{var e=T.getOptions();0==e.gallery_carousel&&jQuery(T).on(T.events.ITEM_CHANGE,p)}x.initEvents()}var m,v,b,y,I,w=this,E=jQuery(this),T=new UniteGalleryMain,S=new UGFunctions,P=new UGThumbsStrip,x=new UGPanelsBase;this.events={FINISH_MOVE:"gridpanel_move_finish",OPEN_PANEL:"open_panel",CLOSE_PANEL:"close_panel"};var j={strippanel_vertical_type:!1,strippanel_padding_top:8,strippanel_padding_bottom:8,strippanel_padding_left:0,strippanel_padding_right:0,strippanel_enable_buttons:!0,strippanel_buttons_skin:"",strippanel_padding_buttons:2,strippanel_buttons_role:"scroll_strip",strippanel_enable_handle:!0,strippanel_handle_align:"top",strippanel_handle_offset:0,strippanel_handle_skin:"",strippanel_background_color:""},C={strip_vertical_type:!0,strippanel_padding_left:8,strippanel_padding_right:8,strippanel_padding_top:0,strippanel_padding_bottom:0},A={strippanel_padding_left:8,strippanel_padding_right:8,strippanel_padding_top:8,strippanel_padding_bottom:8},M={panelType:"strip",panelWidth:0,panelHeight:0,isEventsInited:!1,isClosed:!1,orientation:null,originalPos:null,isFirstRun:!0};this.destroy=function(){y&&(S.destroyButton(y),S.destroyButton(I),jQuery(P).off(P.events.STRIP_MOVE),jQuery(T).off(T.events.ITEM_CHANGE),jQuery(T).off(T.events.SIZE_CHANGE)),x.destroy(),P.destroy()},this.getOrientation=function(){return M.orientation},this.setOrientation=function(e){M.orientation=e},this.init=function(t,i){e(t,i)},this.run=function(){i()},this.setHtml=function(e){n(e)},this.getElement=function(){return b},this.getSize=function(){var e=S.getElementSize(b);return e},this.setWidth=function(e){M.panelWidth=e},this.setHeight=function(e){M.panelHeight=e},this.resize=function(e){w.setWidth(e),s(),d()},this.__________Functions_From_Base_____=function(){},this.isPanelClosed=function(){return x.isPanelClosed()},this.getClosedPanelDest=function(){return x.getClosedPanelDest()},this.openPanel=function(e){x.openPanel(e)},this.closePanel=function(e){x.closePanel(e)},this.setOpenedState=function(e){x.setOpenedState(e)},this.setClosedState=function(e){x.setClosedState(e)},this.setCustomThumbs=function(e){P.setCustomThumbs(e)},this.setDisabledAtStart=function(e){x.setDisabledAtStart(e)}}function UGGridPanel(){function e(e,i){x=e,t(),i&&i.vertical_scroll&&(M.gridpanel_vertical_scroll=i.vertical_scroll),M=jQuery.extend(M,i),1==L.isHorType?(M=jQuery.extend(M,z),M=jQuery.extend(M,i)):1==M.gridpanel_vertical_scroll&&(M=jQuery.extend(M,O),M=jQuery.extend(M,i),M.grid_panes_direction="bottom");var n=x.getOptions(),r=n.gallery_skin;""==M.gridpanel_arrows_skin&&(M.gridpanel_arrows_skin=r);var o=e.getObjects();I=o.g_objWrapper,A.init(x,L,S,M,P),C=new UGThumbsGrid,C.init(x,M)}function t(){if(null==L.orientation)throw new Error("Wrong orientation, please set panel orientation before run")}function i(){t(),o(),C.run(),l(),u(),y(),d()}function n(){I.append("<div class='ug-grid-panel'></div>"),w=I.children(".ug-grid-panel"),L.isHorType?(w.append("<div class='grid-arrow grid-arrow-left-hortype ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-right-hortype ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-left-hortype"),E=w.children(".grid-arrow-right-hortype")):0==M.gridpanel_vertical_scroll?(w.append("<div class='grid-arrow grid-arrow-left ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-right ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-left"),E=w.children(".grid-arrow-right")):(w.append("<div class='grid-arrow grid-arrow-up ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-down ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-up"),E=w.children(".grid-arrow-down")),A.setHtml(w),T.fadeTo(0,0),E.fadeTo(0,0),C.setHtml(w),r()}function r(){""!=M.gridpanel_background_color&&w.css("background-color",M.gridpanel_background_color)}function o(){"center"==M.gridpanel_grid_align&&(M.gridpanel_grid_align="middle")}function a(){var e=M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom,t=L.panelHeight-e;if(0==M.gridpanel_arrows_always_on){var i=C.getNumPanesEstimationByHeight(t);if(1==i)return t}var n=j.getElementSize(E),r=n.height,e=r+M.gridpanel_arrows_padding_vert;return 1==M.gridpanel_vertical_scroll&&(e*=2),e+=M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom,t=L.panelHeight-e}function s(){var e=M.gridpanel_padding_border_left+M.gridpanel_padding_border_right,t=L.panelWidth-e;if(0==M.gridpanel_arrows_always_on){var i=C.getNumPanesEstimationByWidth(t);if(1==i)return t}var n=j.getElementSize(E),r=n.width;return e+=2*(r+M.gridpanel_arrows_padding_hor),t=L.panelWidth-e}function l(){var e=!1;if(1==M.gridpanel_arrows_always_on)e=!0;else{var t=C.getNumPanes();t>1&&(e=!0)}1==e?(E.show().fadeTo(0,1),T.show().fadeTo(0,1),L.arrowsVisible=!0):(E.hide(),T.hide(),L.arrowsVisible=!1)}function u(){var e=C.getSize();1==L.isHorType?L.panelHeight=e.height+M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom:L.panelWidth=e.width+M.gridpanel_padding_border_left+M.gridpanel_padding_border_right,j.setElementSize(w,L.panelWidth,L.panelHeight)}function d(){return 1==L.isEventsInited?!1:(L.isEventsInited=!0,T&&(j.addClassOnHover(T),C.attachPrevPaneButton(T)),E&&(j.addClassOnHover(E),C.attachNextPaneButton(E)),void A.initEvents())}function _(){var e=M.gridpanel_padding_border_left;return e}function g(){var e=M.gridpanel_grid_align,t=0;switch(e){case"top":t=M.gridpanel_padding_border_top;break;case"bottom":t=M.gridpanel_padding_border_bottom}var i=_(),n=C.getElement();j.placeElement(n,i,e,0,t)}function c(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize();switch(M.gridpanel_grid_align){default:case"top":e=M.gridpanel_padding_border_top+r.height+M.gridpanel_arrows_padding_vert;break;case"middle":e="middle";break;case"bottom":e=L.panelHeight-o.height-r.height-M.gridpanel_padding_border_bottom-M.gridpanel_arrows_padding_vert}var a=_(),s=C.getElement();j.placeElement(s,a,e);var o=C.getSize();switch(M.gridpanel_arrows_align_vert){default:case"center":case"middle":t=(o.top-r.height)/2,i=o.bottom+(L.panelHeight-o.bottom-r.height)/2,n=0;break;case"grid":t=o.top-r.height-M.gridpanel_arrows_padding_vert_vert,i=o.bottom+M.gridpanel_arrows_padding_vert,n=0;break;case"border":case"borders":t=M.gridpanel_padding_border_top,i="bottom",n=M.gridpanel_padding_border_bottom}j.placeElement(T,"center",t),j.placeElement(E,"center",i,0,n)}function h(){1==L.arrowsVisible?c():g()}function p(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize(),a=M.gridpanel_padding_border_top;switch(M.gridpanel_grid_align){case"middle":switch(M.gridpanel_arrows_align_vert){default:var s=o.height+M.gridpanel_arrows_padding_vert+r.height;a=(L.panelHeight-s)/2;break;case"border":case"borders":var l=L.panelHeight-r.height-M.gridpanel_padding_border_bottom;a=(l-o.height)/2}break;case"bottom":var s=o.height+r.height+M.gridpanel_arrows_padding_vert;a=L.panelHeight-s-M.gridpanel_padding_border_bottom}var u=C.getElement(),d=_();j.placeElement(u,d,a);var o=C.getSize();switch(M.gridpanel_arrows_align_vert){default:case"center":case"middle":e=o.bottom+(L.panelHeight-o.bottom-r.height)/2,i=0;break;case"grid":e=o.bottom+M.gridpanel_arrows_padding_vert,i=0;break;case"border":case"borders":e="bottom",i=M.gridpanel_padding_border_bottom}t=-r.width/2-M.gridpanel_space_between_arrows/2,j.placeElement(T,"center",e,t,i);var n=Math.abs(t);j.placeElement(E,"center",e,n,i)}function f(){1==L.arrowsVisible?p():g()}function m(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize();switch(M.gridpanel_grid_align){default:case"left":e=M.gridpanel_padding_border_left+M.gridpanel_arrows_padding_hor+r.width;break;case"middle":case"center":e="center";break;case"right":e=L.panelWidth-o.width-r.width-M.gridpanel_padding_border_right-M.gridpanel_arrows_padding_hor}var a=C.getElement();switch(j.placeElement(a,e,M.gridpanel_padding_border_top),o=C.getSize(),M.gridpanel_arrows_align_vert){default:case"center":case"middle":n=(o.height-r.height)/2+o.top;break;case"top":n=M.gridpanel_padding_border_top+M.gridpanel_arrows_padding_vert;break;case"bottom":n=L.panelHeight-M.gridpanel_padding_border_bottom-M.gridpanel_arrows_padding_vert-r.height}switch(M.gridpanel_arrows_align_hor){default:case"borders":t=M.gridpanel_padding_border_left,i=L.panelWidth-M.gridpanel_padding_border_right-r.width;break;case"grid":t=o.left-M.gridpanel_arrows_padding_hor-r.width,i=o.right+M.gridpanel_arrows_padding_hor;break;case"center":t=(o.left-r.width)/2,i=o.right+(L.panelWidth-o.right-r.width)/2}j.placeElement(T,t,n),j.placeElement(E,i,n)}function v(){var e,t=C.getSize();switch(M.gridpanel_grid_align){default:case"left":e=M.gridpanel_padding_border_left;break;case"middle":case"center":e="center";break;case"right":e=L.panelWidth-t.width-M.gridpanel_padding_border_right}var i=C.getElement();j.placeElement(i,e,M.gridpanel_padding_border_top)}function b(){1==L.arrowsVisible?m():v()}function y(){0==L.isHorType?1==M.gridpanel_vertical_scroll?h():f():b(),A.placeElements()}var I,w,E,T,S=this,P=jQuery(this),x=new UniteGalleryMain,j=new UGFunctions,C=new UGThumbsGrid,A=new UGPanelsBase;this.events={FINISH_MOVE:"gridpanel_move_finish",OPEN_PANEL:"open_panel",CLOSE_PANEL:"close_panel"};var M={gridpanel_vertical_scroll:!0,gridpanel_grid_align:"middle",gridpanel_padding_border_top:10,gridpanel_padding_border_bottom:4,gridpanel_padding_border_left:10,gridpanel_padding_border_right:10,gridpanel_arrows_skin:"",gridpanel_arrows_align_vert:"middle",gridpanel_arrows_padding_vert:4,gridpanel_arrows_align_hor:"center",gridpanel_arrows_padding_hor:10,gridpanel_space_between_arrows:20,gridpanel_arrows_always_on:!1,gridpanel_enable_handle:!0,gridpanel_handle_align:"top",
gridpanel_handle_offset:0,gridpanel_handle_skin:"",gridpanel_background_color:""},O={gridpanel_grid_align:"middle",gridpanel_padding_border_top:2,gridpanel_padding_border_bottom:2},z={gridpanel_grid_align:"center"},L={panelType:"grid",isHorType:!1,arrowsVisible:!1,panelHeight:0,panelWidth:0,originalPosX:null,isEventsInited:!1,isClosed:!1,orientation:null};this.destroy=function(){T&&j.destroyButton(T),E&&j.destroyButton(E),A.destroy(),C.destroy()},this.getOrientation=function(){return L.orientation},this.setOrientation=function(e){switch(L.orientation=e,e){case"right":case"left":L.isHorType=!1;break;case"top":case"bottom":L.isHorType=!0;break;default:throw new Error("Wrong grid panel orientation: "+e)}},this.setHeight=function(e){if(1==L.isHorType)throw new Error("setHeight is not appliable to this orientatio ("+L.orientation+"). Please use setWidth");L.panelHeight=e;var t=a();C.setMaxHeight(t)},this.setWidth=function(e){if(0==L.isHorType)throw new Error("setWidth is not appliable to this orientatio ("+L.orientation+"). Please use setHeight");L.panelWidth=e;var t=s();C.setMaxWidth(t)},this.init=function(t,i){e(t,i)},this.setHtml=function(){n()},this.run=function(){i()},this.getElement=function(){return w},this.getSize=function(){var e=j.getElementSize(w);return e},this.__________Functions_From_Base_____=function(){},this.isPanelClosed=function(){return A.isPanelClosed()},this.getClosedPanelDest=function(){return A.getClosedPanelDest()},this.openPanel=function(e){A.openPanel(e)},this.closePanel=function(e){A.closePanel(e)},this.setOpenedState=function(e){A.setOpenedState(e)},this.setClosedState=function(e){A.setClosedState(e)},this.setDisabledAtStart=function(e){A.setDisabledAtStart(e)}}function UGThumbsGrid(){function e(e,t,i){if(N=e.getObjects(),B=e,B.attachThumbsPanel("grid",Q),H=jQuery(e),k=N.g_objWrapper,R=N.g_arrItems,i===!0&&(X.isTilesMode=!0),X.numThumbs=R.length,_(t),1==X.isTilesMode){U.setFixedMode(),U.setApproveClickFunction(x),U.init(e,V);var n=U.getOptions();X.tileMaxHeight=n.tile_height,X.tileMaxWidth=n.tile_width,Y=U.getObjThumbs()}else t.thumb_fixed_size=!0,Y.init(e,t)}function t(e){var t=k;e&&(t=e),t.append("<div class='ug-thumbs-grid'><div class='ug-thumbs-grid-inner'></div></div>"),G=t.children(".ug-thumbs-grid"),D=G.children(".ug-thumbs-grid-inner"),1==X.isTilesMode?U.setHtml(D):Y.setHtmlThumbs(D)}function n(){if(0==X.isHorizontal){if(0==X.gridHeight)throw new Error("You must set height before run.")}else if(0==X.gridWidth)throw new Error("You must set width before run.")}function r(){var e=B.getSelectedItem();if(n(),1==X.isFirstTimeRun)L(),1==X.isTilesMode?(a(),u(),U.run()):(Y.setHtmlProperties(),u(),Y.loadThumbsImages());else if(1==X.isTilesMode){var t=a();1==t&&(u(),U.run())}if(p(),1==X.isFirstTimeRun&&X.isTilesMode){var i=Y.getThumbs();i.each(function(e,t){k.trigger(X.eventSizeChange,jQuery(t))}),i.fadeTo(0,1)}null!=e&&d(e.index),W.trigger(Q.events.PANE_CHANGE,X.currentPane),X.isFirstTimeRun=!1}function o(){if(1==X.isTilesMode)var e=U.getGlobalTileSize();else var e=Y.getGlobalThumbSize();return e}function a(){if(0==X.isTilesMode)throw new Error("Dynamic size can be set only in tiles mode");var e=!1,t=B.isMobileMode(),i=X.spaceBetweenCols;1==t?(X.spaceBetweenCols=V.grid_space_between_mobile,X.spaceBetweenRows=V.grid_space_between_mobile):(X.spaceBetweenCols=V.grid_space_between_cols,X.spaceBetweenRows=V.grid_space_between_rows),X.spaceBetweenCols!=i&&(e=!0);var n=o(),r=n.width,a=X.tileMaxWidth,s=F.getNumItemsInSpace(X.gridWidth,X.tileMaxWidth,X.spaceBetweenCols);return s<V.grid_min_cols&&(a=F.getItemSizeInSpace(X.gridWidth,V.grid_min_cols,X.spaceBetweenCols)),U.setTileSizeOptions(a),a!=r&&(e=!0),e}function s(){var e=o(),t=e.height,i=X.gridWidth,n=V.grid_num_rows*t+(V.grid_num_rows-1)*X.spaceBetweenRows+2*V.grid_padding;X.gridHeight=n,F.setElementSize(G,i,n),F.setElementSize(D,i,n),X.innerWidth=i,X.innerHeight=n}function l(){var e=o(),t=e.width,i=V.grid_num_cols*t+(V.grid_num_cols-1)*X.spaceBetweenCols+2*V.grid_padding,n=X.gridHeight;X.gridWidth=i,F.setElementSize(G,i,n),F.setElementSize(D,i,n),X.innerWidth=i,X.innerHeight=n}function u(){0==X.isHorizontal?l():s()}function d(e){var t=T(e);return-1==t?!1:void Q.gotoPane(t,"scroll")}function _(e){V=jQuery.extend(V,e),Y.setOptions(e),X.isNavigationVertical="top"==V.grid_panes_direction||"bottom"==V.grid_panes_direction,X.spaceBetweenCols=V.grid_space_between_cols,X.spaceBetweenRows=V.grid_space_between_rows}function g(){var e=D.children(".ug-thumb-wrapper"),t=0,n=0,r=0,o=0,a=0,s=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(o);var l=e.length;for(i=0;i<l;i++){var u=jQuery(e[i]);F.placeElement(u,t,n);var d=u.outerWidth(),_=u.outerHeight();t>a&&(a=t);var g=n+_;g>s&&(s=g);var c=a+d;c>X.innerWidth&&(X.innerWidth=c),t+=d+X.spaceBetweenCols,r++,r>=V.grid_num_cols&&(n+=_+X.spaceBetweenRows,t=o,r=0),1==X.numPanes&&X.numThumbsInPane++,n+_>X.gridHeight&&(n=0,o=X.innerWidth+X.spaceBetweenCols,t=o,r=0,1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=s,G.height(X.gridHeight)),i<l-1&&(X.numPanes++,X.arrPanes.push(o)))}D.width(X.innerWidth),1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=s,G.height(s))}function c(){var e=D.children(".ug-thumb-wrapper"),t=0,n=0,r=0,o=0,a=0,s=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(a);var l=e.length;for(i=0;i<l;i++){var u=jQuery(e[i]);F.placeElement(u,t,n);var d=u.outerWidth(),_=u.outerHeight();t+=d+X.spaceBetweenCols;var g=n+_;g>r&&(r=g),o++,o>=V.grid_num_cols&&(n+=_+X.spaceBetweenRows,t=a,o=0),1==X.numPanes&&X.numThumbsInPane++,g=n+_;var c=s+X.gridHeight;g>c&&(1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=r,G.height(X.gridHeight),c=X.gridHeight),n=c+X.spaceBetweenRows,s=n,a=0,t=a,o=0,i<l-1&&(X.numPanes++,X.arrPanes.push(n)))}D.height(r),X.innerHeight=r,1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=r,G.height(r))}function h(){var e=D.children(".ug-thumb-wrapper"),t=V.grid_padding,n=V.grid_padding,r=n,o=t,a=0,s=0,l=0,u=0,d=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(t-V.grid_padding);var _=e.length;for(i=0;i<_;i++){var g=jQuery(e[i]),c=g.outerWidth(),h=g.outerHeight();o-t+c>X.gridWidth&&(d++,r=0,d>=V.grid_num_rows?(d=0,t=o,r=n,l=0,1==X.numPanes&&(X.gridWidth=a+V.grid_padding,G.width(X.gridWidth),X.gridHeight=u+V.grid_padding,G.height(X.gridHeight)),X.numPanes++,X.arrPanes.push(t-V.grid_padding)):(o=t,r=l+X.spaceBetweenRows)),F.placeElement(g,o,r);var p=o+c;p>a&&(a=p);var f=r+h;f>l&&(l=f),f>u&&(u=f),f>s&&(s=f);var p=a+c;p>X.innerWidth&&(X.innerWidth=p),o+=c+X.spaceBetweenCols,1==X.numPanes&&X.numThumbsInPane++}X.innerWidth=a+V.grid_padding,X.innerHeight=u+V.grid_padding,D.width(X.innerWidth),D.height(X.innerHeight),1==X.numPanes&&(X.gridWidth=a+V.grid_padding,X.gridHeight=u+V.grid_padding,G.width(X.gridWidth),G.height(X.gridHeight))}function p(){0==X.isHorizontal?X.isNavigationVertical?c():g():h()}function f(e){if(0>e||e>=X.numThumbs)throw new Error("Thumb not exists: "+e);return!0}function m(e){if(e>=X.numPanes||0>e)throw new Error("Pane "+index+" doesn't exists.");return!0}function v(e){var t=w(e);return 0==t?!1:void D.css(t)}function b(e){var t=w(e);return 0==t?!1:void D.stop(!0).animate(t,{duration:V.grid_transition_duration,easing:V.grid_transition_easing,queue:!1})}function y(){var e=-X.arrPanes[X.currentPane];b(e)}function I(){return 1==X.isNavigationVertical?X.gridHeight:X.gridWidth}function w(e){var t={};return 1==X.isNavigationVertical?t.top=e+"px":t.left=e+"px",t}function E(){var e=F.getElementSize(D);return 1==X.isNavigationVertical?e.top:e.left}function T(e){if(0==f(e))return-1;var t=Math.floor(e/X.numThumbsInPane);return t}function S(){if(1==X.numPanes)return!1;var e=F.getStoredEventData(X.storedEventID),t=e.diffTime,i=E(),n=Math.abs(i-e.startInnerPos);return n>30?!0:n>5&&t>300?!0:!1}function P(){var e=F.getStoredEventData(X.storedEventID),t=E();diffPos=Math.abs(e.startInnerPos-t);var i=I(),n=Math.round(3*i/8);return diffPos>=n?!0:e.diffTime<300&&diffPos>25?!0:!1}function x(){if(1==X.numPanes)return!0;var e=F.isApproveStoredEventClick(X.storedEventID,X.isNavigationVertical);return e}function j(e){if(1==S())return!0;var t=jQuery(this),i=Y.getItemByThumb(t);B.selectItem(i)}function C(e){if(1==X.numPanes)return!0;if(1==X.touchActive)return!0;0==X.isTilesMode&&e.preventDefault(),X.touchActive=!0;var t={startInnerPos:E()};F.storeEventData(e,X.storedEventID,t)}function A(){if(0==V.grid_vertical_scroll_ondrag)return!1;if(1==X.isNavigationVertical)return!1;var e=F.handleScrollTop(X.storedEventID);return"vert"===e?!0:!1}function M(e){if(0==X.touchActive)return!0;e.preventDefault(),F.updateStoredEventData(e,X.storedEventID);var t=F.getStoredEventData(X.storedEventID,X.isNavigationVertical),i=A();if(i)return!0;var n=t.diffMousePos,r=t.startInnerPos+n,o=n>0?"prev":"next",a=X.arrPanes[X.numPanes-1];0==V.grid_carousel&&r>0&&"prev"==o&&(r/=3),0==V.grid_carousel&&-a>r&&"next"==o&&(r=t.startInnerPos+n/3),v(r)}function O(e){if(0==X.touchActive)return!0;F.updateStoredEventData(e,X.storedEventID);var t=F.getStoredEventData(X.storedEventID,X.isNavigationVertical);if(X.touchActive=!1,0==P())return y(),!0;var i=E(),n=i-t.startInnerPos,r=n>0?"prev":"next";"next"==r?0==V.grid_carousel&&Q.isLastPane()?y():Q.nextPane():0==V.grid_carousel&&Q.isFirstPane()?y():Q.prevPane()}function z(){var e=B.getSelectedItem();Y.setThumbSelected(e.objThumbWrapper),d(e.index)}function L(){if(0==X.isTilesMode){Y.initEvents();var e=G.find(".ug-thumb-wrapper");e.on("click touchend",j),H.on(B.events.ITEM_CHANGE,z)}else U.initEvents();G.bind("mousedown touchstart",C),jQuery("body").bind("mousemove touchmove",M),jQuery(window).add("body").bind("mouseup touchend",O)}var H,N,k,R,G,D,Q=this,W=jQuery(this),B=new UniteGalleryMain,F=new UGFunctions,Y=new UGThumbsGeneral,U=new UGTileDesign,V={grid_panes_direction:"left",grid_num_cols:2,grid_min_cols:2,grid_num_rows:2,grid_space_between_cols:10,grid_space_between_rows:10,grid_space_between_mobile:10,grid_transition_duration:300,grid_transition_easing:"easeInOutQuad",grid_carousel:!1,grid_padding:0,grid_vertical_scroll_ondrag:!1};this.events={PANE_CHANGE:"pane_change"};var X={eventSizeChange:"thumb_size_change",isHorizontal:!1,isMaxHeight:!1,isMaxWidth:!1,gridHeight:0,gridWidth:0,innerWidth:0,innerHeight:0,numPanes:0,arrPanes:0,numThumbs:0,currentPane:0,numThumbsInPane:0,isNavigationVertical:!1,touchActive:!1,startScrollPos:0,isFirstTimeRun:!0,isTilesMode:!1,storedEventID:"thumbsgrid",tileMaxWidth:null,tileMaxHeight:null,spaceBetweenCols:null,spaceBetweenRows:null};this.destroy=function(){if(0==X.isTilesMode){var e=G.find(".ug-thumb-wrapper");e.off("click"),e.off("touchend"),H.on(B.events.ITEM_CHANGE),Y.destroy()}else U.destroy();G.unbind("mousedown"),G.unbind("touchstart"),jQuery("body").unbind("mousemove"),jQuery("body").unbind("touchmove"),jQuery(window).add("body").unbind("touchend"),jQuery(window).add("body").unbind("mouseup"),W.off(Q.events.PANE_CHANGE)},this.__________EXTERNAL_GENERAL_________=function(){},this.setThumbUnselected=function(e){Y.setThumbUnselected(e)},this.isItemThumbVisible=function(e){var t=e.index,i=T(t);return i==X.currentPane?!0:!1},this.__________EXTERNAL_API_________=function(){},this.getNumPanesEstimationByHeight=function(e){if(1==X.isTilesMode)var t=V.tile_height;else var i=Y.getOptions(),t=i.thumb_height;var n=Y.getNumThumbs(),r=Math.ceil(n/V.grid_num_cols),o=r*t+(r-1)*X.spaceBetweenRows,a=Math.ceil(o/e);return a},this.getNumPanesEstimationByWidth=function(e){if(X.isTilesMode)var t=V.tile_width;else var i=Y.getOptions(),t=i.thumb_width;var n=Y.getNumThumbs(),r=Math.ceil(n/V.grid_num_rows),o=r*t+(r-1)*X.spaceBetweenCols,a=Math.ceil(o/e);return a},this.getHeightEstimationByWidth=function(e){if(0==X.isTilesMode)throw new Error("This function works only with tiles mode");var t=Y.getNumThumbs(),i=F.getNumItemsInSpace(e,V.tile_width,X.spaceBetweenCols),n=Math.ceil(t/i);n>V.grid_num_rows&&(n=V.grid_num_rows);var r=F.getSpaceByNumItems(n,V.tile_height,X.spaceBetweenRows);return r+=2*V.grid_padding},this.getElement=function(){return G},this.getSize=function(){var e=F.getElementSize(G);return e},this.getNumPanes=function(){return X.numPanes},this.isFirstPane=function(){return 0==X.currentPane?!0:!1},this.isLastPane=function(){return X.currentPane==X.numPanes-1?!0:!1},this.getPaneInfo=function(){var e={pane:X.currentPane,total:X.numPanes};return e},this.getPane=function(){return X.currentPane},this.setWidth=function(e){X.gridWidth=e,X.isHorizontal=!0},this.setMaxWidth=function(e){X.gridWidth=e,X.isMaxWidth=!0,X.isHorizontal=!0},this.setHeight=function(e){X.gridHeight=e,X.isHorizontal=!1},this.setMaxHeight=function(e){X.gridHeight=e,X.isMaxHeight=!0,X.isHorizontal=!1},this.gotoPane=function(e,t){if(0==m(e))return!1;if(e==X.currentPane)return!1;var i=-X.arrPanes[e];X.currentPane=e,b(i),W.trigger(Q.events.PANE_CHANGE,e)},this.nextPane=function(){var e=X.currentPane+1;if(e>=X.numPanes){if(0==V.grid_carousel)return!0;e=0}Q.gotoPane(e,"next")},this.prevPane=function(){var e=X.currentPane-1;return 0>e&&(e=X.numPanes-1,0==V.grid_carousel)?!1:void Q.gotoPane(e,"prev")},this.attachNextPaneButton=function(e){return F.setButtonOnClick(e,Q.nextPane),1==V.grid_carousel?!0:(Q.isLastPane()&&e.addClass("ug-button-disabled"),void W.on(Q.events.PANE_CHANGE,function(){Q.isLastPane()?e.addClass("ug-button-disabled"):e.removeClass("ug-button-disabled")}))},this.attachPrevPaneButton=function(e){return F.setButtonOnClick(e,Q.prevPane),1==V.grid_carousel?!0:(Q.isFirstPane()&&e.addClass("ug-button-disabled"),void W.on(Q.events.PANE_CHANGE,function(){Q.isFirstPane()?e.addClass("ug-button-disabled"):e.removeClass("ug-button-disabled")}))},this.attachBullets=function(e){e.setActive(X.currentPane),jQuery(e).on(e.events.BULLET_CLICK,function(t,i){Q.gotoPane(i,"theme"),e.setActive(i)}),jQuery(Q).on(Q.events.PANE_CHANGE,function(t,i){e.setActive(i)})},this.getObjTileDesign=function(){return U},this.init=function(t,i,n){e(t,i,n)},this.run=function(){r()},this.setHtml=function(e){t(e)}}function UGTiles(){function e(e,i){g_objects=e.getObjects(),oe=e,K=jQuery(e),J=g_objects.g_objWrapper,ee=g_objects.g_arrItems,de=jQuery.extend(de,i),t(),se.init(e,de),le=se.getObjThumbs()}function t(){de.tiles_min_columns<1&&(de.tiles_min_columns=1),0!=de.tiles_max_columns&&de.tiles_max_columns<de.tiles_min_columns&&(de.tiles_max_columns=de.tiles_min_columns)}function i(e){if(!e)if($)e=$;else var e=J;$=e;var t=de.tiles_type;e.addClass("ug-tiletype-"+t),se.setHtml(e),e.children(".ug-thumb-wrapper").hide()}function n(){if($.addClass("ug-tiles-rest-mode"),_e.isTransInited=!0,1==de.tiles_enable_transition){$.addClass("ug-tiles-transit");var e=se.getOptions();1==e.tile_enable_image_effect&&0==e.tile_image_effect_reverse&&$.addClass("ug-tiles-transit-overlays"),_e.isTransActive=!0}}function r(){return ae.getElementSize($).width}function o(){return 0==_e.isTransInited?!1:($.addClass("ug-tiles-transition-active"),$.removeClass("ug-tiles-rest-mode"),0==_e.isTransActive?!1:void se.disableEvents())}function a(){return 0==_e.isTransInited?!1:($.removeClass("ug-tiles-transition-active"),void $.addClass("ug-tiles-rest-mode"))}function s(){1==_e.isTransActive?(setTimeout(function(){se.enableEvents(),se.triggerSizeChangeEventAllTiles(),a()},800),_e.handle&&clearTimeout(_e.handle),_e.handle=setTimeout(function(){a(),se.triggerSizeChangeEventAllTiles(),_e.handle=null},2e3)):(se.triggerSizeChangeEventAllTiles(),a())}function l(){ue.colWidth=(ue.availWidth-ue.colGap*(ue.numCols-1))/ue.numCols,ue.colWidth=Math.floor(ue.colWidth),ue.totalWidth=ae.getSpaceByNumItems(ue.numCols,ue.colWidth,ue.colGap)}function u(){if(ue.colWidth=de.tiles_col_width,ue.minCols=de.tiles_min_columns,ue.maxCols=de.tiles_max_columns,0==oe.isMobileMode()?ue.colGap=de.tiles_space_between_cols:ue.colGap=de.tiles_space_between_cols_mobile,ue.galleryWidth=r(),ue.availWidth=ue.galleryWidth,1==de.tiles_include_padding&&(ue.availWidth=ue.galleryWidth-2*ue.colGap),1==de.tiles_exact_width)ue.numCols=ae.getNumItemsInSpace(ue.availWidth,ue.colWidth,ue.colGap),ue.maxCols>0&&ue.numCols>ue.maxCols&&(ue.numCols=ue.maxCols),ue.numCols<ue.minCols?(ue.numCols=ue.minCols,l()):ue.totalWidth=ue.numCols*(ue.colWidth+ue.colGap)-ue.colGap;else{var e=ae.getNumItemsInSpaceRound(ue.availWidth,ue.colWidth,ue.colGap);e<ue.minCols?e=ue.minCols:0!=ue.maxCols&&e>ue.maxCols&&(e=ue.maxCols),ue.numCols=e,l()}switch(de.tiles_align){case"center":default:ue.addX=Math.round((ue.galleryWidth-ue.totalWidth)/2);break;case"left":ue.addX=0;break;case"right":ue.addX=ue.galleryWidth-ue.totalWidth}for(ue.arrPosx=[],col=0;col<ue.numCols;col++){var t=ae.getColX(col,ue.colWidth,ue.colGap);ue.arrPosx[col]=t+ue.addX}}function d(){ue.maxColHeight=0,ue.colHeights=[0]}function _(){var e=0,t=999999999;for(col=0;col<ue.numCols;col++){if(void 0==ue.colHeights[col]||0==ue.colHeights[col])return col;ue.colHeights[col]<t&&(e=col,t=ue.colHeights[col])}return e}function g(e,t,i,n){if(null===n||"undefined"==typeof n)var n=_();var r=0;void 0!==ue.colHeights[n]&&(r=ue.colHeights[n]);var o=se.getTileHeightByWidth(ue.colWidth,e);if(null===o){if(1==de.tiles_enable_transition)throw new Error("Can't know tile height, please turn off transition");var a=ae.getElementSize(e);o=a.height}var s=ue.arrPosx[n];ae.placeElement(e,s,r);var l=r+o;ue.colHeights[n]=l+ue.colGap,ue.maxColHeight<l&&(ue.maxColHeight=l),1==t&&e.show().fadeTo(0,1),1==i&&$.height(ue.maxColHeight)}function c(e){e||(e=!1),u(),d();var t=le.getThumbs(le.type.GET_THUMBS_RATIO);o(),se.resizeAllTiles(ue.colWidth,se.resizemode.VISIBLE_ELEMENTS,t);for(var i=0;i<t.length;i++){var n=jQuery(t[i]),r=void 0;1==de.tiles_keep_order&&(r=ae.getColByIndex(ue.numCols,i)),g(n,e,!1,r)}s();var a=$.height();1==_e.isTransActive&&a>ue.maxColHeight?setTimeout(function(){$.height(ue.maxColHeight)},700):$.height(ue.maxColHeight)}function h(e){var t=e.index(),i=oe.getItem(t);if(i.ordered_placed===!0)return!1;var n=ae.getPrevRowSameColIndex(t,ue.numCols);if(0>n)return!0;var r=oe.getItem(n);return r.ordered_placed===!0?!0:!1}function p(e,t){if(t!==!0){var i=h(e);if(0==i)return!1}var n=e.index(),r=ae.getColByIndex(ue.numCols,n),o=oe.getItem(n);se.resizeTile(e,ue.colWidth),g(e,!0,!0,r),o.ordered_placed=!0;var a=oe.getNumItems(),s=ae.getNextRowSameColIndex(n,ue.numCols);if(s>=a)return!1;var l=le.getThumbByIndex(s),u=oe.getItem(s);le.isThumbLoaded(l);le.isThumbLoaded(l)&&!u.ordered_placed&&p(l,!0)}function f(e,t){if(1==t)return!1;e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e),1==de.tiles_keep_order?p(i):(se.resizeTile(i,ue.colWidth),g(i,!0,!0))}function m(){var e=le.getThumbs(le.type.GET_THUMBS_NO_RATIO);if(!e||0==e.length)return!1;if(_e.isAllLoaded=!1,1==_e.isFirstPlaced){u(),d();var t=Math.abs(ue.galleryWidth-ue.totalWidth);if(1==de.tiles_set_initial_height&&0==ae.isScrollbarExists()&&25>t){var i=(e.length,Math.ceil(e.length/ue.numCols)),r=i*de.tiles_col_width*.75;$.height(r),u()}}e.fadeTo(0,0);var o=e.find("img.ug-thumb-image"),a=ue.numCols,s=ue.galleryWidth;ae.checkImagesLoaded(o,function(){u(),(a!=ue.numCols||s!=ue.galleryWidth)&&c(!1),n(),re.trigger(ne.events.ALL_TILES_LOADED)},function(e,t){1==_e.isFirstPlaced&&oe.triggerEvent(ne.events.TILES_FIRST_PLACED),f(e,t)})}function v(){var e=r(),t=le.getThumbs(!0),i=de.tiles_justified_row_height,n=[],o=0,a=de.tiles_justified_space_between,s=t.length;jQuery.each(t,function(e,t){t=jQuery(t);var r=le.getItemByThumb(t),a=r.thumbWidth,s=r.thumbHeight;s!==i&&(a=Math.floor(r.thumbRatioByWidth*i)),n[e]=a,o+=a});var l=Math.ceil(o/e);l>s&&(l=s);var u=o/l,d=[],_=0,g=[],c=[],h=0,p=0;jQuery.each(t,function(e,t){var i=n[e];h+i/2>(p+1)*u&&(g[d.length]=_,d.push(c),c=[],_=0,p++),h+=i,_+=i,c.push(t)}),g[d.length]=_,d.push(c);var f=[],m=[],v=0;jQuery.each(d,function(t,r){var o=(r.length,g[t]),s=(r.length-1)*a,l=(e-s)/o,u=Math.round(i*l);v+=u,t>0&&(v+=a),m.push(u);var d=u/i,_=[],c=s;jQuery.each(r,function(e,t){var i=jQuery(t),r=i.index(),o=n[r],a=Math.round(o*d);_[e]=a,c+=a});var h=c-e;jQuery.each(_,function(e,t){return 0==h?!1:(0>h?(_[e]=t+1,h++):(_[e]=t-1,h--),void(e==_.length-1&&0!=h&&(_[e]-=h)))}),f[t]=_});var b={arrRows:d,arrRowWidths:f,arrRowHeights:m,gap:a,totalHeight:v};return b}function b(e){if(!e)var e=!1;var t=r(),i=v();$.height(i.totalHeight);var n=r();n!=t&&(i=v()),o();var a=0,l=0;jQuery.each(i.arrRows,function(t,n){var r=i.arrRowWidths[t],o=i.arrRowHeights[t],s=0;jQuery.each(n,function(t,n){var u=jQuery(n),d=o,_=r[t];se.resizeTile(u,_,d,se.resizemode.VISIBLE_ELEMENTS),ae.placeElement(u,s,a),s+=_,s>l&&(l=s),s+=i.gap,1==e&&jQuery(n).show()}),a+=o+i.gap}),s()}function y(){var e=jQuery(J).find("img.ug-thumb-image"),t=le.getThumbs();_e.isAllLoaded=!1,t.fadeTo(0,0),ae.checkImagesLoaded(e,function(){setTimeout(function(){b(!0),t.fadeTo(0,1),oe.triggerEvent(ne.events.TILES_FIRST_PLACED),n(),re.trigger(ne.events.ALL_TILES_LOADED)})},function(e,t){e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e)})}function I(){var e=jQuery(J).find("img.ug-thumb-image"),t=le.getThumbs();_e.isAllLoaded=!1,t.fadeTo(0,0),ae.checkImagesLoaded(e,function(){1==oe.isMobileMode()?c(!0):E(!0),oe.triggerEvent(ne.events.TILES_FIRST_PLACED),n(),re.trigger(ne.events.ALL_TILES_LOADED)},function(e,t){e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e)})}function w(){var e=r();ge.galleryWidth=e,te={},ge.colWidth=de.tiles_nested_col_width,ge.optimalTileWidth=de.tiles_nested_optimal_tile_width,ge.currentGap=de.tiles_space_between_cols,1==oe.isMobileMode()&&(ge.currentGap=de.tiles_space_between_cols_mobile),null==ge.colWidth?ge.colWidth=Math.floor(ge.optimalTileWidth/ge.nestedOptimalCols):ge.optimalTileWidth>ge.colWidth?ge.nestedOptimalCols=Math.ceil(ge.optimalTileWidth/ge.colWidth):ge.nestedOptimalCols=1,ge.maxColumns=ae.getNumItemsInSpace(e,ge.colWidth,ge.currentGap),ge.colWidth=ae.getItemSizeInSpace(e,ge.maxColumns,ge.currentGap),ge.gridY=0,ie=[];var t=le.getThumbs(!0);switch(t.each(function(){var e=jQuery(this),t=T(e);ie.push(t)}),ge.optimalTileWidth>ge.colWidth?ge.nestedOptimalCols=Math.ceil(ge.optimalTileWidth/ge.colWidth):ge.nestedOptimalCols=1,ge.totalWidth=ge.maxColumns*(ge.colWidth+ge.currentGap)-ge.currentGap,de.tiles_align){case"center":default:ge.addX=Math.round((ge.galleryWidth-ge.totalWidth)/2);break;case"left":ge.addX=0;break;case"right":ge.addX=ge.galleryWidth-ge.totalWidth}ge.maxGridY=0}function E(e){var t=r();w(),x();var i=ge.maxGridY*(ge.colWidth+ge.currentGap)-ge.currentGap;$.height(i);var n=r();n!=t&&(w(),x()),0==de.tiles_nested_debug&&U(e)}function T(e){var t,i,n={},r=ge.colWidth,o=ge.currentGap,a=se.getTileImageSize(e),s=e.index(),l=Math.ceil(S(s)*(1*ge.nestedOptimalCols/3)+2*ge.nestedOptimalCols/3),u=a.width,d=a.height,_=u/d;return u>d?(t=l,i=Math.round(t/_),0==i&&(i=1)):(i=l,t=Math.round(i*_),0==t&&(t=1)),n.dimWidth=t,n.dimHeight=i,n.width=t*r+o*(t-1),n.height=i*r+o*(i-1),n.imgWidth=u,n.imgHeight=d,n.left=0,n.top=0,n}function S(e){return Math.abs(Math.sin(Math.abs(1e3*Math.sin(e))))}function P(e,t){if(0==t){for(var i=ge.currentItem;i<ie.length;i++)j(i,!0);ge.currentItem=ie.length-1}else j(ge.currentItem,!0);for(var i=0;i<=ge.currentItem;i++)V(i,!0);ge.currentItem++}function x(e){if(1==de.tiles_nested_debug)return"undefined"==typeof e&&(e=!0),P(!0,e),!1;for(var t=0;t<ie.length;t++)j(t,!0)}function j(e,t){if(!t)var t=!1;ge.maxColHeight=0;for(var i=ae.getObjectLength(te),n=ge.gridY;i+1>=n;n++){for(var r=0;r<ge.maxColumns;r++)if(0==Q(ge.gridY)||0==F(ge.gridY,r)){var o=D(r);return void C(e,o,r)}ge.gridY++}}function C(e,t,i){var n=jQuery.extend(!0,{},ie[e]),r=n.dimWidth,o=t-n.dimWidth,a=ge.nestedOptimalCols,s=t<=n.dimWidth||.33*a>=o||a>=t;if(s)N(e,t);else if(a>=o)a>=4?1==G(Math.floor(t/2),i)?N(e,Math.floor(t/2)+1):N(e,Math.floor(t/2)):N(objImage,t);else if(1==G(r,i))switch(r>=a){case!0:N(e,r-1);break;case!1:N(e,r+1)}n=jQuery.extend(!0,{},ie[e]);var l=L(e,n.dimWidth,i);if(ge.columnsValueToEnableHeightResize<=l[0]&&ge.maxColumns>=2*ge.nestedOptimalCols){var u=H(i,n),d=k(e,u.newHeight,!0);ie[e].dimHeight=d.dimHeight;var _=z(l,d.dimWidth,i),g=A(_),c=!1;g>=2&&(c=!0),u.newHeight>=n.dimHeight&&(n=k(e,u.newHeight,!0));var h=M(u.idToResize,u.newHeight,n.dimHeight);n.top=ge.gridY,n.left=i,h.push({tileID:e,sizes:n});var p=R(h),f=R(_);return f>p||1==c?void O(h):void O(_)}n.left=i,n.top=ge.gridY,ie[e]=n,W(e,n,i,ge.gridY),ge.maxGridY=n.top+n.dimHeight}function A(e){for(var t=0,i=0,n=0;n<e.length-1;n++){var r=e[n].sizes,o=-1,a=-1;Q(r.top+r.dimHeight)&&ge.maxColumns>r.left+r.dimWidth&&(o=te[r.top+r.dimHeight-1][r.left+r.dimWidth],a=te[r.top+r.dimHeight][r.left+r.dimWidth]),o!=a&&t++}for(var n=0;n<e.length-1;n++){var r=e[n].sizes,o=-1,a=-1;Q(r.top+r.dimHeight)&&r.left-1>=0&&(o=te[r.top+r.dimHeight-1][r.left-1],a=te[r.top+r.dimHeight][r.left-1]),o!=a&&i++}return Math.max(i,t)}function M(e,t,i){var n=ie[e],r=n.dimHeight,o=(n.dimWidth,n.left),a=n.top,s=(parseInt(a/(ge.colWidth+ge.currentGap)),parseInt(o/(ge.colWidth+ge.currentGap)),r-t+i),l=k(e,s,!0),u=[];return u.push({tileID:e,sizes:l}),u}function O(e){for(var t=0;t<e.length;t++){var i=e[t].sizes,n=e[t].tileID;ie[n]=jQuery.extend(!0,{},i),W(n,i,i.left,i.top)}}function z(e,t){for(var i=0,n=0,r=[],o=0,a=0,s=0;s<e[1].length;s++){var l=e[1][s],u=ie[e[1][s]];if(n+=u.dimHeight,0!=s)i+=u.dimHeight,r.push([l,u.dimHeight]);else{var d=N(l,t,!0);i+=d.dimHeight,r.push([e[1][s],d.dimHeight])}}o=u.left,a=u.top;for(var _=n,g=[],s=r.length-1;s>=0;s--){var c,l=r[s][0];0!=s?(c=Math.max(Math.round(1*n/3),Math.floor(r[s][1]*(n/i))),_-=c,d=k(l,c,!0),d.left=o,d.top=a,g.push({tileID:l,sizes:d}),a+=d.dimHeight):(c=_,d=k(l,c,!0),d.left=o,d.top=a,g.push({tileID:l,sizes:d}))}return g}function L(e,t,i){var n=ge.gridY-1,r=0,o=0,a=1,s=[],l=[];if(s.push(e),n>=0){for(o=0;n>=0;){if(r=te[n][i],"undefined"!=typeof te[n][i-1]&&te[n][i-1]==te[n][i]||"undefined"!=typeof te[n][i+t]&&te[n][i+t-1]==te[n][i+t]||te[n][i]!=te[n][i+t-1])return l.push(a),l.push(s),l;o!=r&&(a++,s.push(r)),n--,o=r}return l.push(a),l.push(s),l}return[0,[]]}function H(e,t){var i=0,n=0,r=t.dimWidth,o=t.dimHeight,a=0,s=0,l=jQuery.map(te,function(e,t){return[e]});if("undefined"==typeof l[ge.gridY]||"undefined"==typeof l[ge.gridY][e-1])n=0;else for(var u=0;;){if("undefined"==typeof te[ge.gridY+u]||-1==te[ge.gridY+u][e-1])break;a=te[ge.gridY+u][e-2],u++,n++}if("undefined"==typeof l[ge.gridY]||"undefined"==typeof l[ge.gridY][e+r])i=0;else for(u=0;;){if("undefined"==typeof te[ge.gridY+u]||-1==te[ge.gridY+u][e+r])break;s=te[ge.gridY+u][e+r+1],u++,i++}var d=0,_=0;Math.abs(o-n)<Math.abs(o-i)&&0!=n?(d=n,_=a):0!=i?(d=i,_=s):d=o;var g={newHeight:d,idToResize:_};return g}function N(e,t,i){i||(i=!1);var n=ge.colWidth,r=ge.currentGap,o=ie[e],a=o.imgWidth,s=o.imgHeight,l=a/s;if(dimWidth=t,dimHeight=Math.round(dimWidth/l),1==i){var u=jQuery.extend(!0,{},o);return u.dimWidth=dimWidth,u.dimHeight=dimHeight,u.width=dimWidth*n+r*(dimWidth-1),u.height=dimHeight*n+r*(dimHeight-1),u}o.dimWidth=dimWidth,o.dimHeight=dimHeight,o.width=dimWidth*n+r*(dimWidth-1),o.height=dimHeight*n+r*(dimHeight-1)}function k(e,t,i){i||(i=!1);var n=ie[e],r=n.dimWidth,o=ge.colWidth,a=ge.currentGap;if(1==i){var s=jQuery.extend(!0,{},n);return s.dimHeight=t,s.width=r*o+a*(r-1),s.height=t*o+a*(t-1),s}n.dimHeight=t,n.width=r*o+a*(r-1),n.height=t*o+a*(t-1)}function R(e){for(var t=0,i=0,n=0;n<e.length;n++){var r=ie[e[n].tileID];if(0==r.dimHeight||0==r.height)return;resizeVal=r.dimWidth/r.dimHeight/(r.imgWidth/r.imgHeight),resizeVal<1&&(resizeVal=1/resizeVal),t+=resizeVal,i++}return t/i}function G(e,t){var i=ge.gridY-1;return 0>=i||0==Q(i)?!1:te[i][t+e-1]!=te[i][t+e]?!0:!1}function D(e){var t=e,i=0;if(1==Q(ge.gridY))for(;0==F(ge.gridY,t);)i++,t++;else i=ge.maxColumns;return i}function Q(e){return"undefined"==typeof te[e]?!1:!0}function W(e,t,i,n){for(var r=0;r<t.dimHeight;r++)for(var o=0;o<t.dimWidth;o++)0==Q(n+r)&&B(n+r),Y(n+r,i+o,e)}function B(e){te[e]=new Object;for(var t=0;t<ge.maxColumns;t++)te[e][t]=-1}function F(e,t){return-1!=te[e][t]}function Y(e,t,i){te[e][t]=i}function U(e){if(!e)var e=!1;o();for(var t=0;t<ie.length;t++)V(t,e);$.height(ge.maxColHeight),s()}function V(e,t){var i=le.getThumbByIndex(e),n=ie[e],r=n.top*(ge.colWidth+ge.currentGap),o=ge.addX+n.left*(ge.colWidth+ge.currentGap);se.resizeTile(i,n.width,n.height,se.resizemode.VISIBLE_ELEMENTS),ae.placeElement(i,o,r),r+n.height>ge.maxColHeight&&(ge.maxColHeight=r+n.height),1==t&&i.fadeTo(0,1)}function X(){if(1==_e.isFirstTimeRun)return!0;if(0==_e.isAllLoaded)return!1;switch(de.tiles_type){case"columns":c(!1);break;case"justified":b(!1);break;case"nested":var e=oe.isMobileMode();1==e?c(!1):E(!1)}}function Z(){re.on(ne.events.ALL_TILES_LOADED,function(){_e.isAllLoaded=!0}),K.on(oe.events.SIZE_CHANGE,X),K.on(ne.events.TILES_FIRST_PLACED,function(){_e.isFirstPlaced=!1}),se.initEvents()}function q(){switch(J.children(".ug-tile").show(),1==_e.isFirstTimeRun&&Z(),se.run(),de.tiles_type){default:case"columns":m();break;case"justified":y();break;case"nested":I()}_e.isFirstTimeRun=!1}var K,J,$,ee,te,ie,ne=this,re=jQuery(this),oe=new UniteGalleryMain,ae=new UGFunctions,se=new UGTileDesign,le=new UGThumbsGeneral,ue={},de={tiles_type:"columns",tiles_col_width:250,tiles_align:"center",tiles_exact_width:!1,tiles_space_between_cols:3,tiles_space_between_cols_mobile:3,tiles_include_padding:!0,tiles_min_columns:2,tiles_max_columns:0,tiles_keep_order:!1,tiles_set_initial_height:!0,tiles_justified_row_height:150,tiles_justified_space_between:3,tiles_nested_optimal_tile_width:250,tiles_nested_col_width:null,tiles_nested_debug:!1,tiles_enable_transition:!0};this.events={THUMB_SIZE_CHANGE:"thumb_size_change",TILES_FIRST_PLACED:"tiles_first_placed",ALL_TILES_LOADED:"all_tiles_loaded"};var _e={isFirstTimeRun:!0,handle:null,isTransActive:!1,isTransInited:!1,isFirstPlaced:!0,isAllLoaded:!1},ge={colWidth:null,nestedOptimalCols:5,gridY:0,maxColumns:0,columnsValueToEnableHeightResize:3,resizeLeftRightToColumn:!0,currentItem:0,currentGap:null,optimalTileWidth:null,maxGridY:0};this.destroy=function(){K.off(oe.events.SIZE_CHANGE),se.destroy(),K.off(ne.events.TILES_FIRST_PLACED)},this.init=function(t,i){e(t,i)},this.setHtml=function(e){i(e)},this.getObjTileDesign=function(){return se},this.run=function(){q()},this.runNewItems=function(){if(!$)throw new Error("Can't run new items - parent not set");switch(se.setHtml($,!0),se.run(!0),de.tiles_type){case"columns":m();break;default:case"justified":case"nested":throw new Error("Tiles type: "+de.tiles_type+" not support load more yet")}}}function UGTileDesign(){function e(e,i){D=e,L=jQuery(e);var r=D.getObjects();N=r.g_objWrapper,k=D.getArrItems(),B=jQuery.extend(B,F),B=jQuery.extend(B,i),t(),W.init(e,B);var o={allow_onresize:!1},a=["overlay"];Y.funcCustomTileHtml&&(a=[]),W.setCustomThumbs(n,a,o);var s=W.getOptions();B=jQuery.extend(B,s),Y.ratioByWidth=B.tile_width/B.tile_height,Y.ratioByHeight=B.tile_height/B.tile_width,B.tile_size_by==R.sizeby.GLOBAL_RATIO&&Y.isTextpanelOutside&&(Y.hasImageContainer=!0)}function t(){if(1==B.tile_enable_overlay?(B.thumb_overlay_opacity=B.tile_overlay_opacity,B.thumb_overlay_color=B.tile_overlay_color):0==B.tile_enable_icons?B.thumb_color_overlay_effect=!1:B.thumb_overlay_opacity=0,B.tile_as_link&&(B.thumb_wrapper_as_link=!0,B.thumb_link_newpage=B.tile_link_newpage),1==B.tile_enable_outline&&0==B.tile_enable_border&&(B.tile_enable_outline=!1),Y.tileInnerReduce=0,B.tile_enable_border&&(Y.tileInnerReduce=2*B.tile_border_width,W.setThumbInnerReduce(Y.tileInnerReduce)),Y.isSaparateIcons=!Q.isRgbaSupported(),1==B.tile_enable_textpanel){switch(B.tile_textpanel_position){case"top":B.tile_textpanel_align="top";case"bottom":Y.isTextpanelOutside=!0,B.tile_textpanel_always_on=!0,B.tile_textpanel_offset=0;break;case"inside_top":B.tile_textpanel_align="top";break;case"middle":B.tile_textpanel_align="middle",B.tile_textpanel_appear_type="fade"}0==B.tile_textpanel_always_on&&(Y.isSaparateIcons=!0)}0!=B.tile_textpanel_offset&&(B.tile_textpanel_appear_type="fade",B.tile_textpanel_margin=B.tile_textpanel_offset),"title_and_desc"==B.tile_textpanel_source&&(B.tile_textpanel_enable_description=!0,
B.tile_textpanel_desc_style_as_title=!0)}function i(){var e=D.isMobileMode();switch(Y.isTextPanelHidden=!1,1==e&&0==B.tile_textpanel_always_on&&(Y.isTextPanelHidden=!0),Y.isVideoplayIconAlwaysOn=B.tile_videoplay_icon_always_on,B.tile_videoplay_icon_always_on){case"always":Y.isVideoplayIconAlwaysOn=!0;break;case"never":Y.isVideoplayIconAlwaysOn=!1;break;case"mobile_only":Y.isVideoplayIconAlwaysOn=1==e?!0:!1;break;case"desktop_only":Y.isVideoplayIconAlwaysOn=0==e?!0:!1}}function n(e,t){if(e.addClass("ug-tile"),Y.funcCustomTileHtml)return Y.funcCustomTileHtml(e,t),!1;var i="";1==Y.hasImageContainer&&(i+="<div class='ug-image-container ug-trans-enabled'>");var n="ug-thumb-image";(0==B.tile_enable_image_effect||1==B.tile_image_effect_reverse)&&(n+=" ug-trans-enabled");var r=Q.stripTags(t.title);r=Q.htmlentitles(r),i+='<img src="'+Q.escapeDoubleSlash(t.urlThumb)+"\" alt='"+r+"' class='"+n+"'>",1==Y.hasImageContainer&&(i+="</div>"),e.append(i),B.tile_size_by==R.sizeby.GLOBAL_RATIO&&e.fadeTo(0,0);var o={};if(1==B.tile_enable_background&&(o["background-color"]=B.tile_background_color),1==B.tile_enable_border&&(o["border-width"]=B.tile_border_width+"px",o["border-style"]="solid",o["border-color"]=B.tile_border_color,B.tile_border_radius&&(o["border-radius"]=B.tile_border_radius+"px")),1==B.tile_enable_outline&&(o.outline="1px solid "+B.tile_outline_color),1==B.tile_enable_shadow){var a=B.tile_shadow_h+"px ";a+=B.tile_shadow_v+"px ",a+=B.tile_shadow_blur+"px ",a+=B.tile_shadow_spread+"px ",a+=B.tile_shadow_color,o["box-shadow"]=a}e.css(o);var s="";if(B.tile_enable_icons){if(0==B.tile_as_link&&1==B.tile_enable_action){var l="ug-button-play ug-icon-zoom";"image"!=t.type&&(l="ug-button-play ug-icon-play"),s+="<div class='ug-tile-icon "+l+"' style='display:none'></div>"}if(t.link&&1==B.tile_show_link_icon||1==B.tile_as_link)if(0==B.tile_as_link){var u="";1==B.tile_link_newpage&&(u=" target='_blank'"),s+="<a href='"+t.link+"'"+u+" class='ug-tile-icon ug-icon-link'></a>"}else s+="<div class='ug-tile-icon ug-icon-link' style='display:none'></div>";var _=Y.isSaparateIcons;if(0==_&&"image"!=t.type&&1==Y.isVideoplayIconAlwaysOn&&(_=!0),_)var g=e;else var g=e.children(".ug-thumb-overlay");g.append(s);var c=g.children("."+l);0==c.length?c=null:c.hide();var h=g.children(".ug-icon-link");0==h.length?h=null:h.hide(),h||1!=B.tile_enable_action||e.addClass("ug-tile-clickable")}else 1==B.tile_enable_action&&e.addClass("ug-tile-clickable");if(1==B.tile_enable_image_effect){var p="";0==B.tile_image_effect_reverse&&(p=" ug-trans-enabled");var f="<div class='ug-tile-image-overlay"+p+"' >",m=" ug-"+B.tile_image_effect_type+"-effect";f+='<img src="'+Q.escapeDoubleSlash(t.urlThumb)+"\" alt='"+t.title+"' class='"+m+p+"'>",f+="</div>",e.append(f),1==B.tile_image_effect_reverse&&e.children(".ug-tile-image-overlay").fadeTo(0,0)}if(1==B.tile_enable_textpanel){var v=new UGTextPanel;v.init(D,B,"tile");var b="";(1==B.tile_textpanel_always_on||1==Y.isTextpanelOutside)&&(b="ug-trans-enabled"),v.appendHTML(e,b);var y=t.title,I="";switch(B.tile_textpanel_source){case"desc":case"description":y=t.description;break;case"desc_title":""!=t.description&&(y=t.description);break;case"title_and_desc":y=t.title,I=t.description}if(v.setTextPlain(y,I),0==B.tile_textpanel_always_on&&v.getElement().fadeTo(0,0),e.data("objTextPanel",v),1==B.tile_textpanel_always_on){var w=d(e);w.css("z-index",2)}if(1==Y.isTextpanelOutside){var E="<div class='ug-tile-cloneswrapper'></div>";e.append(E);var T=e.children(".ug-tile-cloneswrapper"),S=new UGTextPanel;S.init(D,B,"tile"),S.appendHTML(T),S.setTextPlain(y,I),e.data("objTextPanelClone",S)}}null!==t.addHtml&&e.append(t.addHtml)}function r(e){var t=e.children(".ug-tile-image-overlay");return t}function o(e){var t=e.children(".ug-thumb-overlay");return t}function a(e){if(0==Y.hasImageContainer)return null;var t=e.children(".ug-image-container");return t}function s(e){var t=e.find(".ug-tile-image-overlay img");return t}function l(e){var t=e.data("objTextPanel");return t}function u(e){var t=e.data("objTextPanelClone");return t}function d(e){var t=e.children(".ug-textpanel");return t}function _(e){var t=e.find(".ug-tile-cloneswrapper .ug-textpanel");if(0==t.length)throw new Error("text panel cloned element not found");return t}function g(e){if(1==Y.isTextpanelOutside)var t=_(e);else var t=d(e);if(!t)return 0;var i=Q.getElementSize(t);return i.height}function c(e){var t=e.find(".ug-icon-link");return 0==t.length?null:t}function h(e){var t=Y.ratioByHeight;switch(B.tile_size_by){default:t=Y.ratioByHeight;break;case R.sizeby.IMAGE_RATIO:if(!e)throw new Error("tile should be given for tile ratio");var i=R.getItemByTile(e);if("undefined"!=typeof i.thumbRatioByHeight){if(0==i.thumbRatioByHeight)throw trace(i),new Error("the item ratio not inited yet");t=i.thumbRatioByHeight}break;case R.sizeby.CUSTOM:return null}return t}function p(e){var t=e.find(".ug-button-play");return 0==t.length?null:t}function f(e){return e.hasClass("ug-thumb-over")?!0:!1}function m(e){return e.hasClass("ug-tile-clickable")}function v(e){return 1==B.tile_enable_icons&&1==Y.isVideoplayIconAlwaysOn&&"image"!=e.type?!0:!1}function b(e,t,i,n){var o=r(e),l=R.getTileImage(e),u=s(e);t-=Y.tileInnerReduce,i-=Y.tileInnerReduce;var d=null;if(1==Y.isTextpanelOutside){var _=g(e);if(i-=_,"top"==B.tile_textpanel_position&&(d=_),1==Y.hasImageContainer){var c=a(e);Q.setElementSize(c,t,i),null!==d&&Q.placeElement(c,0,d)}}if(0==B.tile_enable_image_effect)Q.scaleImageCoverParent(l,t,i),0==Y.hasImageContainer&&null!==d&&Q.placeElement(l,0,d);else{var h="nothing";n===!0&&0==Y.isTextpanelOutside&&(h=1==B.tile_image_effect_reverse?"effect":"image"),"effect"!=h&&(Q.setElementSize(o,t,i),null!==d&&Q.placeElement(o,0,d),Q.scaleImageCoverParent(u,t,i)),"image"!=h&&(1==Y.hasImageContainer?Q.scaleImageCoverParent(l,t,i):"effect"==h?(Q.scaleImageCoverParent(l,t,i),null!==d&&Q.placeElement(l,0,d)):Q.cloneElementSizeAndPos(u,l,!1,null,d))}}function y(e,t,i,n){var r=null;if(i&&(r=i-Y.tileInnerReduce),n&&(n-=Y.tileInnerReduce),"clone"==t){var o=u(e);o.refresh(!0,!0,r);var a=R.getItemByTile(e);return a.textPanelCloneSizeSet=!0,!1}var s=l(e);if(!s)return!1;var d=null;1==Y.isTextpanelOutside&&(d=g(e)),s.refresh(!1,!0,r,d);var _=1==B.tile_textpanel_always_on||"fade"==B.tile_textpanel_appear_type;if(_)if(1==Y.isTextpanelOutside&&n&&"bottom"==B.tile_textpanel_position){var c=n-d;s.positionPanel(c)}else s.positionPanel()}function I(e){var t=(R.getItemByTile(e),p(e)),i=c(e),n=Q.getElementSize(e);b(e,n.width,n.height),1==B.tile_enable_textpanel&&y(e,"regular",n.width,n.height);var r=n.width-Y.tileInnerReduce,a=n.height-Y.tileInnerReduce,s=0;if(1==Y.isTextpanelOutside){var l=g(e);a-=l,"top"==B.tile_textpanel_position&&(s=l)}var u=o(e);if(Q.setElementSizeAndPosition(u,0,s,r,a),t||i){var _=0;if(1==B.tile_enable_textpanel&&0==Y.isTextPanelHidden&&0==Y.isTextpanelOutside){var h=d(e),f=Q.getElementSize(h);f.height>0&&(_=Math.floor(f.height/2*-1))}}if(t&&i){var m=Q.getElementSize(t),v=Q.getElementSize(i),I=B.tile_space_between_icons,w=m.width+I+v.width,E=Math.floor((n.width-w)/2);I>E&&(I=Math.floor((n.width-m.width-v.width)/3),w=m.width+I+v.width,E=Math.floor((n.width-w)/2)),Q.placeElement(t,E,"middle",0,_),Q.placeElement(i,E+m.width+I,"middle",0,_)}else t&&Q.placeElement(t,"center","middle",0,_),i&&Q.placeElement(i,"center","middle",0,_);t&&t.show(),i&&i.show()}function w(e,t){var i=(R.getItemByTile(e),r(e)),n=B.thumb_transition_duration;if(0==B.tile_image_effect_reverse){var o=R.getTileImage(e);t?(o.fadeTo(0,1),i.stop(!0).fadeTo(n,0)):i.stop(!0).fadeTo(n,1)}else t?i.stop(!0).fadeTo(n,1):i.stop(!0).fadeTo(n,0)}function E(e,t){var i=B.thumb_transition_duration,n=d(e);if(!n)return!0;if("slide"==B.tile_textpanel_appear_type){var r=Q.getElementSize(n);if(0==r.width)return!1;var o=-r.height,a=0,s={},l={},u="bottom";"inside_top"==B.tile_textpanel_position&&(u="top"),s[u]=o+"px",l[u]=a+"px",1==t?(n.fadeTo(0,1),0==n.is(":animated")&&n.css(s),l.opacity=1,n.stop(!0).animate(l,i)):n.stop(!0).animate(s,i)}else 1==t?n.stop(!0).fadeTo(i,1):n.stop(!0).fadeTo(i,0)}function T(e,t,i){var n=B.thumb_transition_duration;i&&i===!0&&(n=0);var r=p(e),o=c(e),a=t?1:0;r&&r.stop(!0).fadeTo(n,a),o&&o.stop(!0).fadeTo(n,a)}function S(e,t){if(t=jQuery(t),B.tile_enable_image_effect&&w(t,!0),1==B.tile_enable_textpanel&&0==B.tile_textpanel_always_on&&0==Y.isTextPanelHidden&&E(t,!0),Y.isSaparateIcons&&1==B.tile_enable_icons){var i=1==B.thumb_overlay_reverse,n=R.getItemByTile(t);0==v(n)&&T(t,i,!1)}}function P(e,t){if(t=jQuery(t),B.tile_enable_image_effect&&w(t,!1),1==B.tile_enable_textpanel&&0==B.tile_textpanel_always_on&&E(t,!1),1==Y.isSaparateIcons&&1==B.tile_enable_icons){var i=1==B.thumb_overlay_reverse?!1:!0,n=R.getItemByTile(t);0==v(n)?T(t,i,!1):T(t,!0,!0)}}function x(e){var t=W.getThumbs().not(e);t.each(function(e,t){W.setThumbNormalStyle(jQuery(t))})}function j(e,t,i){return t=jQuery(t),1==B.tile_visible_before_image&&t.data("image_placed")!==!0&&i!==!0?!0:(I(t),void W.setThumbNormalStyle(t))}function C(e,t,i){I(t),i.fadeTo(0,1),t.data("image_placed",!0)}function A(e){return 1==m(e)?(G.trigger(R.events.TILE_CLICK,e),!0):void(0==f(e)&&(x(e),W.setThumbOverStyle(e)))}function M(e){var t=jQuery(this),i=t.prop("tagName").toLowerCase(),n=!0;if(Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&(n=!1),"a"==i)0==n&&e.preventDefault();else if(0==f(t))1==n&&A(t);else{if(0==m(t))return!0;1==n&&G.trigger(R.events.TILE_CLICK,t)}}function O(e){e.stopPropagation();var t=jQuery(this).parents(".ug-tile"),i=!0;return Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&(i=!1),0==f(t)?(A(t),!0):1==i?(G.trigger(R.events.TILE_CLICK,t),!1):void 0}function z(e){var t=jQuery(this).parents(".ug-tile");Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&e.preventDefault(),0==f(t)&&0==B.tile_as_link&&(e.preventDefault(),A(t))}var L,H,N,k,R=this,G=jQuery(this),D=new UniteGalleryMain,Q=new UGFunctions,W=new UGThumbsGeneral;this.resizemode={FULL:"full",WRAPPER_ONLY:"wrapper_only",VISIBLE_ELEMENTS:"visible_elements"},this.sizeby={GLOBAL_RATIO:"global_ratio",TILE_RATIO:"tile_ratio",IMAGE_RATIO:"image_ratio",CUSTOM:"custom"},this.events={TILE_CLICK:"tile_click"};var B={tile_width:250,tile_height:200,tile_size_by:R.sizeby.IMAGE_RATIO,tile_visible_before_image:!1,tile_enable_background:!0,tile_background_color:"#F0F0F0",tile_enable_border:!1,tile_border_width:3,tile_border_color:"#F0F0F0",tile_border_radius:0,tile_enable_outline:!1,tile_outline_color:"#8B8B8B",tile_enable_shadow:!1,tile_shadow_h:1,tile_shadow_v:1,tile_shadow_blur:3,tile_shadow_spread:2,tile_shadow_color:"#8B8B8B",tile_enable_action:!0,tile_as_link:!1,tile_link_newpage:!0,tile_enable_overlay:!0,tile_overlay_opacity:.4,tile_overlay_color:"#000000",tile_enable_icons:!0,tile_show_link_icon:!1,tile_videoplay_icon_always_on:"never",tile_space_between_icons:26,tile_enable_image_effect:!1,tile_image_effect_type:"bw",tile_image_effect_reverse:!1,tile_enable_textpanel:!1,tile_textpanel_source:"title",tile_textpanel_always_on:!1,tile_textpanel_appear_type:"slide",tile_textpanel_position:"inside_bottom",tile_textpanel_offset:0},F={thumb_color_overlay_effect:!0,thumb_overlay_reverse:!0,thumb_image_overlay_effect:!1,tile_textpanel_enable_description:!1,tile_textpanel_bg_opacity:.6,tile_textpanel_padding_top:8,tile_textpanel_padding_bottom:8},Y={ratioByHeight:0,ratioByWidth:0,eventSizeChange:"thumb_size_change",funcCustomTileHtml:null,funcCustomPositionElements:null,funcParentApproveClick:null,isSaparateIcons:!1,tileInnerReduce:0,isTextpanelOutside:!1,hasImageContainer:!1,isVideoplayIconAlwaysOn:!1,isTextPanelHidden:!1};this.loadTileImage=function(e){var t=R.getTileImage(e);Q.checkImagesLoaded(t,null,function(t,i){C(null,e,jQuery(t))})},this.setHtml=function(e,t){H=e,t!==!0&&i(),W.setHtmlThumbs(e,t)},this.initEvents=function(){W.initEvents(),jQuery(W).on(W.events.SETOVERSTYLE,S),jQuery(W).on(W.events.SETNORMALSTYLE,P),jQuery(W).on(W.events.PLACEIMAGE,C),N.on(Y.eventSizeChange,j),H.on("click",".ug-tile",M),H.on("click",".ug-tile .ug-button-play",O),H.on("click",".ug-tile .ug-icon-link",z)},this.destroy=function(){if(H.off("click",".ug-tile"),H.off("click",".ug-tile .ug-button-play"),H.off("click",".ug-tile .ug-icon-link"),jQuery(W).off(W.events.SETOVERSTYLE),jQuery(W).off(W.events.SETNORMALSTYLE),jQuery(W).off(W.events.PLACEIMAGE),N.off(Y.eventSizeChange),1==B.tile_enable_textpanel){var e=W.getThumbs();jQuery.each(e,function(e,t){var i=l(jQuery(t));i&&i.destroy()})}W.destroy()},this.init=function(t,i,n){e(t,i,n)},this.setFixedMode=function(){B.tile_size_by=R.sizeby.GLOBAL_RATIO,B.tile_visible_before_image=!0},this.setApproveClickFunction=function(e){Y.funcParentApproveClick=e},this.resizeTile=function(e,t,i,n){if(1==Y.isTextpanelOutside&&y(e,"clone",t),t){if(!i)var i=R.getTileHeightByWidth(t,e)}else var t=B.tile_width,i=B.tile_height;switch(Q.setElementSize(e,t,i),n){default:case R.resizemode.FULL:R.triggerSizeChangeEvent(e,!0);break;case R.resizemode.WRAPPER_ONLY:return!0;case R.resizemode.VISIBLE_ELEMENTS:if(Y.funcCustomTileHtml)return R.triggerSizeChangeEvent(e,!0),!0;b(e,t,i,!0),1==B.tile_enable_textpanel&&1==B.tile_textpanel_always_on&&t&&y(e,"regular",t,i)}},this.resizeAllTiles=function(e,t,n){i();var r=null;if(B.tile_size_by==R.sizeby.GLOBAL_RATIO&&(r=R.getTileHeightByWidth(e)),!n)var n=W.getThumbs();n.each(function(i,n){R.resizeTile(jQuery(n),e,r,t)})},this.triggerSizeChangeEvent=function(e,t){if(!e)return!1;if(!t)var t=!1;N.trigger(Y.eventSizeChange,[e,t])},this.triggerSizeChangeEventAllTiles=function(e){var t=W.getThumbs();t.each(function(){var t=jQuery(this);R.triggerSizeChangeEvent(t,e)})},this.disableEvents=function(){var e=W.getThumbs();e.css("pointer-events","none")},this.enableEvents=function(){var e=W.getThumbs();e.css("pointer-events","auto")},this.setOptions=function(e){B=jQuery.extend(B,e),W.setOptions(e)},this.setTileSizeOptions=function(e){if(B.tile_size_by!==R.sizeby.GLOBAL_RATIO)throw new Error("setNewTileOptions works with global ration only");B.tile_width=e,B.tile_height=Math.floor(e*Y.ratioByHeight)},this.setCustomFunctions=function(e,t){Y.funcCustomTileHtml=e,Y.funcCustomPositionElements=t},this.run=function(e){var t=W.type.GET_THUMBS_ALL;e===!0&&(t=W.type.GET_THUMBS_NEW);var i=W.getThumbs(t);B.tile_size_by==R.sizeby.GLOBAL_RATIO&&R.resizeAllTiles(B.tile_width,R.resizemode.WRAPPER_ONLY,i),1==B.tile_enable_image_effect&&0==B.tile_image_effect_reverse&&i.children(".ug-thumb-image").fadeTo(0,0),W.setHtmlProperties(i),1==B.tile_visible_before_image&&(i.children(".ug-thumb-image").fadeTo(0,0),W.loadThumbsImages())},this._____________EXTERNAL_GETTERS____________=function(){},this.getObjThumbs=function(){return W},this.getOptions=function(){return B},this.getTileImage=function(e){var t=e.find("img.ug-thumb-image");return t},this.getItemByTile=function(e){return W.getItemByThumb(e)},this.getTileHeightByWidth=function(e,t){var i=h(t);if(null===i)return null;var n=Math.floor((e-Y.tileInnerReduce)*i)+Y.tileInnerReduce;return t&&1==Y.isTextpanelOutside&&B.tile_size_by==R.sizeby.IMAGE_RATIO&&(n+=g(t)),n},this.getTileImageSize=function(e){var t=R.getItemByTile(e);if(!t.thumbWidth||!t.thumbHeight)throw new Error("Can't get image size - image not inited.");var i={width:t.thumbWidth,height:t.thumbHeight};return i},this.getGlobalTileSize=function(){if(B.tile_size_by!=R.sizeby.GLOBAL_RATIO)throw new Error("The size has to be global ratio");var e={width:B.tile_width,height:B.tile_height};return e}}function UGAviaControl(){function e(e){return 0==p?e.pageX:e.pageY}function t(t){jQuery("body").on("touchstart",function(e){return 0==f.isControlEnabled?!0:void(f.touchEnabled=!0)}),jQuery("body").mousemove(function(t){if(0==f.isControlEnabled)return!0;if(1==f.touchEnabled)return jQuery("body").off("mousemove"),!0;f.isMouseInsideStrip=g.ismouseover();var i=u.isTouchMotionActive();if(1==f.isMouseInsideStrip&&0==i){var n=e(t);l(n)}else a()})}function i(e){var t=h.strip_padding_top,i=(h.strip_padding_bottom,g.height()),n=c.height();if(i>n)return null;var r=g.offset(),o=r.top,a=e-o-t;if(0>a)return null;var s=h.thumb_height,l=i-h.thumb_height,u=l-s;s>a&&(a=s),a>l&&(a=l);var d=(a-s)/u,_=(n-i)*d;return _=-1*Math.round(_)+t}function n(e){var t=h.strip_padding_left,i=h.strip_padding_right,n=g.width()-t-i,r=c.width();if(n>r)return null;var o=g.offset(),a=o.left,s=e-a-t,l=h.thumb_width,u=n-h.thumb_width,d=u-l;l>s&&(s=l),s>u&&(s=u);var _=(s-l)/d,p=(r-n)*_;return p=-1*Math.round(p)+t}function r(){if(0==f.is_strip_moving)return!1;var e=u.getInnerStripPos();Math.floor(e)==Math.floor(f.strip_finalPos)&&a();var t,i=Math.abs(f.strip_finalPos-e);1>i?t=i:(t=i/4,t>0&&1>t&&(t=1)),f.strip_finalPos<e&&(t=-1*t);var n=e+t;u.positionInnerStrip(n)}function o(){return 1==f.isStripMoving?!1:(f.isStripMoving=!0,void(f.handle_timeout=setInterval(r,10)))}function a(){return 0==f.isStripMoving?!1:(f.isStripMoving=!1,void(f.handle_timeout=clearInterval(f.handle_timeout)))}function s(e){return 0==p?n(e):i(e)}function l(e){var t=s(e);return null===t?!1:(f.is_strip_moving=!0,f.strip_finalPos=t,void o())}var u,d,_,g,c,h,p,f={touchEnabled:!1,isMouseInsideStrip:!1,strip_finalPos:0,handle_timeout:"",isStripMoving:!1,isControlEnabled:!0};this.enable=function(){f.isControlEnabled=!0},this.disable=function(){f.isControlEnabled=!1},this.init=function(e){u=e,_=e.getObjects(),d=_.g_gallery,g=_.g_objStrip,c=_.g_objStripInner,h=_.g_options,p=_.isVertical,t()},this.destroy=function(){jQuery("body").off("touchstart"),jQuery("body").off("mousemove")}}function UGSlider(){function e(e,t,n){me=e,n&&(he=n,t=we.convertCustomPrefixOptions(t,he,"slider")),te=jQuery(e);var r=me.getObjects();if(ie=r.g_objWrapper,ne=r.g_objThumbs,t.hasOwnProperty("slider_progress_indicator_type")&&(Se.slider_progress_indicator_type=t.slider_progress_indicator_type),"bar"==Se.slider_progress_indicator_type&&(Se=jQuery.extend(Se,Pe)),t&&pe.setOptions(t),i(),1==Se.slider_enable_bullets){ye=new UGBullets;var o={bullets_skin:Se.slider_bullets_skin,bullets_space_between:Se.slider_bullets_space_between};ye.init(me,o)}Se.slider_enable_text_panel&&(Te=new UGTextPanel,Te.init(me,Se,"slider")),Se.slider_enable_zoom_panel&&(ce=new UGZoomButtonsPanel,ce.init(pe,Se));var a=me.getGalleryID();Ie.init(Se,!1,a)}function t(){if(1==xe.isRunOnce)return!1;if(xe.isRunOnce=!0,Se.slider_background_color){var e=Se.slider_background_color;1!=Se.slider_background_opacity&&(e=we.convertHexToRGB(e,Se.slider_background_opacity)),re.css("background-color",e)}else 1!=Se.slider_background_opacity&&(e=we.convertHexToRGB("#000000",Se.slider_background_opacity),re.css("background-color",e));1==Se.slider_control_swipe&&(_e=new UGTouchSliderControl,_e.init(pe,Se)),1==Se.slider_control_zoom&&(ge=new UGZoomSliderControl,ge.init(pe,Se)),Te&&Te.run(),X()}function i(){var e=me.getOptions(),t=e.gallery_skin;""==Se.slider_bullets_skin&&(Se.slider_bullets_skin=t),""==Se.slider_arrows_skin&&(Se.slider_arrows_skin=t),""==Se.slider_zoompanel_skin&&(Se.slider_zoompanel_skin=t),""==Se.slider_play_button_skin&&(Se.slider_play_button_skin=t),""==Se.slider_fullscreen_button_skin&&(Se.slider_fullscreen_button_skin=t),Se.video_enable_closebutton=Se.slider_video_enable_closebutton,"zoom"!=e.gallery_mousewheel_role&&(Se.slider_zoom_mousewheel=!1)}function n(e,t){var i="ug-type-square";"round"==Se.slider_videoplay_button_type&&(i="ug-type-round");var n="";return n+="<div class='ug-slide-wrapper ug-slide"+t+"'>",n+="<div class='ug-item-wrapper'></div>",n+="<div class='ug-slider-preloader "+e+"'></div>",n+="<div class='ug-button-videoplay "+i+"' style='display:none'></div>",n+="</div>"}function r(e){e&&(ie=e);var t=Z(),i=(me.getOptions(),"<div class='ug-slider-wrapper'>");if(i+="<div class='ug-slider-inner'>",i+=n(t,1),i+=n(t,2),i+=n(t,3),i+="</div>",1==Se.slider_enable_arrows&&(i+="<div class='ug-slider-control ug-arrow-left ug-skin-"+Se.slider_arrows_skin+"'></div>",i+="<div class='ug-slider-control ug-arrow-right ug-skin-"+Se.slider_arrows_skin+"'></div>"),1==Se.slider_enable_play_button&&(i+="<div class='ug-slider-control ug-button-play ug-skin-"+Se.slider_play_button_skin+"'></div>"),1==Se.slider_enable_fullscreen_button&&(i+="<div class='ug-slider-control ug-button-fullscreen ug-skin-"+Se.slider_fullscreen_button_skin+"'></div>"),i+="</div>",ie.append(i),re=ie.children(".ug-slider-wrapper"),oe=re.children(".ug-slider-inner"),ae=oe.children(".ug-slide1"),se=oe.children(".ug-slide2"),le=oe.children(".ug-slide3"),ae.data("slidenum",1),se.data("slidenum",2),le.data("slidenum",3),ye&&ye.appendHTML(re),1==Se.slider_enable_arrows&&(ue=re.children(".ug-arrow-left"),de=re.children(".ug-arrow-right")),1==Se.slider_enable_play_button&&(ve=re.children(".ug-button-play")),1==Se.slider_enable_fullscreen_button&&(be=re.children(".ug-button-fullscreen")),1==Se.slider_enable_progress_indicator){Ee=we.initProgressIndicator(Se.slider_progress_indicator_type,Se,re);var r=Ee.getType();"bar"==r&&"pie"==Se.slider_progress_indicator_type&&(Se.slider_progress_indicator_type="bar",Se=jQuery.extend(Se,Pe)),me.setProgressIndicator(Ee)}if(1==Se.slider_enable_text_panel&&(Te.appendHTML(re),0==Se.slider_textpanel_always_on)){var o=Te.getElement();o.hide().data("isHidden",!0),xe.isTextPanelSaparateHover=!0}1==Se.slider_enable_zoom_panel&&ce.appendHTML(re),Ie.setHtml(oe)}function o(e){var t=J(e);we.placeElementInParentCenter(t);var i=$(e);we.placeElementInParentCenter(i)}function a(){if(ye&&(objBullets=ye.getElement(),we.placeElement(objBullets,Se.slider_bullets_align_hor,Se.slider_bullets_align_vert,Se.slider_bullets_offset_hor,Se.slider_bullets_offset_vert),we.placeElement(objBullets,Se.slider_bullets_align_hor,Se.slider_bullets_align_vert,Se.slider_bullets_offset_hor,Se.slider_bullets_offset_vert)),1==Se.slider_enable_arrows&&(we.placeElement(ue,Se.slider_arrow_left_align_hor,Se.slider_arrow_left_align_vert,Se.slider_arrow_left_offset_hor,Se.slider_arrow_left_offset_vert),we.placeElement(de,Se.slider_arrow_right_align_hor,Se.slider_arrow_left_align_vert,Se.slider_arrow_right_offset_hor,Se.slider_arrow_right_offset_vert)),0==Se.slider_controls_always_on&&M(!0),Ee){var e=Ee.getElement();if("bar"==Se.slider_progress_indicator_type){var t=re.width();Ee.setSize(t),we.placeElement(e,"left",Se.slider_progress_indicator_align_vert,0,Se.slider_progress_indicator_offset_vert)}else we.placeElement(e,Se.slider_progress_indicator_align_hor,Se.slider_progress_indicator_align_vert,Se.slider_progress_indicator_offset_hor,Se.slider_progress_indicator_offset_vert)}Te&&Te.positionPanel(),s(),o(ae),o(se),o(le),C()}function s(){if(ve&&we.placeElement(ve,Se.slider_play_button_align_hor,Se.slider_play_button_align_vert,Se.slider_play_button_offset_hor,Se.slider_play_button_offset_vert),be&&we.placeElement(be,Se.slider_fullscreen_button_align_hor,Se.slider_fullscreen_button_align_vert,Se.slider_fullscreen_button_offset_hor,Se.slider_fullscreen_button_offset_vert),ce){var e=ce.getElement();we.placeElement(e,Se.slider_zoompanel_align_hor,Se.slider_zoompanel_align_vert,Se.slider_zoompanel_offset_hor,Se.slider_zoompanel_offset_vert)}}function l(){var e,t,i,n,r=pe.getSlidesReference(),o=0,a=0,s=0;i=pe.isSlideHasItem(r.objNextSlide),n=pe.isSlideHasItem(r.objPrevSlide),n?(s=r.objPrevSlide.outerWidth(),r.objPrevSlide.css("z-index",1)):r.objPrevSlide.hide(),t=s+r.objCurrentSlide.outerWidth(),e=t,i?(e=t+r.objNextSlide.outerWidth(),r.objPrevSlide.css("z-index",2)):r.objNextSlide.hide(),r.objCurrentSlide.css("z-index",3),we.placeElement(r.objCurrentSlide,s,o),oe.css({left:-s+"px",width:e+"px"}),n&&(we.placeElement(r.objPrevSlide,a,o),we.showElement(r.objPrevSlide)),i&&(we.showElement(r.objNextSlide),we.placeElement(r.objNextSlide,t,o))}function u(e){var t=e.data("index");if(void 0===t||null==t)return!1;var i=me.getItem(t);return i?void f(e,i):!1}function d(e){e.stop(!0).show(100)}function _(e){e.stop(!0).hide(100)}function g(e,t){var i=Se.slider_image_border_width;if(10>=i)return i;var n=we.getElementSize(e),r=n.width,o=n.height;if(t&&(t.hasOwnProperty("imageWidth")&&(r=t.imageWidth),t.hasOwnProperty("imageHeight")&&(o=t.imageHeight)),0>=r)return i;var a=o>r?r:o,s=2*i,l=s/a;if(l<Se.slider_image_border_maxratio)return i;var i=a*Se.slider_image_border_maxratio/2;return i=Math.round(i)}function c(e,t,i){var n={};if(1==Se.slider_image_border){n["border-style"]="solid";var r=g(e,i);n["border-width"]=r+"px",n["border-color"]=Se.slider_image_border_color,n["border-radius"]=Se.slider_image_border_radius}"image"!=t&&1==Se.slider_video_constantsize&&(n["background-color"]="#000000"),1==Se.slider_image_shadow&&(n["box-shadow"]="3px 3px 10px 0px #353535"),e.css(n)}function h(e,t){var i=Se.slider_video_constantsize_width,n=Se.slider_video_constantsize_height,r=Se.slider_video_constantsize_scalemode,o=we.scaleImageExactSizeInParent(e,t.imageWidth,t.imageHeight,i,n,r);return o}function p(e,t,i){var n=e.children(".ug-item-wrapper"),r=J(e);if("undefined"==typeof t.urlImage||""==t.urlImage)throw new Error("The slide don't have big image defined ( data-image='imageurl' ). Please check gallery items.","showbig");var o=t.urlImage,a=e.data("urlImage");e.data("urlImage",o);var s=pe.getScaleMode(e),l=pe.getSlideType(e);if(objPadding=pe.getObjImagePadding(),a==o&&i!==!0){var u=n.children("img");(0==t.imageWidth||0==t.imageHeight)&&me.checkFillImageSize(u,t);var g={};g="image"!=l&&1==Se.slider_video_constantsize?h(u,t):we.scaleImageFitParent(u,t.imageWidth,t.imageHeight,s,objPadding),c(u,l,g),fe.trigger(pe.events.AFTER_PUT_IMAGE,e)}else if(u=we.placeImageInsideParent(o,n,t.imageWidth,t.imageHeight,s,objPadding),1==t.isBigImageLoaded){if(u.fadeTo(0,1),_(r),"image"!=l&&1==Se.slider_video_constantsize)var g=h(u,t);else var g=we.getImageInsideParentData(n,t.imageWidth,t.imageHeight,s,objPadding);u.css("width",g.imageWidth+"px"),c(u,l,g),fe.trigger(pe.events.AFTER_PUT_IMAGE,e)}else u.fadeTo(0,0),d(r),e.data("isLoading",!0),pe.isSlideCurrent(e)&&fe.trigger(pe.events.CURRENTSLIDE_LOAD_START),u.data("itemIndex",t.index),u.on("load",function(){var e=jQuery(this),t=e.data("itemIndex");e.fadeTo(0,1);var i=e.parent().parent(),n=pe.getSlideType(i),r=J(i),o=pe.getObjImagePadding(),a=pe.getScaleMode(i);_(r),i.data("isLoading",!1),pe.isSlideCurrent(i)&&fe.trigger(pe.events.CURRENTSLIDE_LOAD_END),me.onItemBigImageLoaded(null,e);var s=me.getItem(t),l={};"image"!=n&&1==Se.slider_video_constantsize?h(e,s):l=we.scaleImageFitParent(e,s.imageWidth,s.imageHeight,a,o),e.fadeTo(0,1),c(e,n,l),fe.trigger(pe.events.AFTER_PUT_IMAGE,i)})}function f(e,t){try{var i=e.children(".ug-item-wrapper");if(null==t)return i.html(""),e.removeData("index"),e.removeData("type"),e.removeData("urlImage"),!1;e.data("index");e.data("index",t.index),e.data("type",t.type),1==Se.slider_enable_links&&"image"==t.type&&(t.link?e.addClass("ug-slide-clickable"):e.removeClass("ug-slide-clickable")),p(e,t);var n=$(e);switch(t.type){case"image":n.hide();break;default:n.show()}}catch(r){throw"undefined"!=typeof r.fileName&&"showbig"==r.fileName&&me.showErrorMessageReplaceGallery(r.message),i.html(""),new Error(r)}}function m(){if(!Te)return!1;if(1==b())return!1;var e=Te.getElement(),t=0;(1==xe.isTextPanelSaparateHover||1==Se.slider_textpanel_always_on)&&(t=Se.slider_controls_appear_duration),e.stop().fadeTo(t,0),e.data("isHidden",!0)}function v(){if(!Te)return!1;if(0==b())return!1;var e=Te.getElement(),t=0;(1==xe.isTextPanelSaparateHover||1==Se.slider_textpanel_always_on)&&(e.show(),Te.positionElements(),t=Se.slider_controls_appear_duration),e.stop().show().fadeTo(t,1),e.data("isHidden",!1)}function b(){var e=Te.getElement(),t=e.data("isHidden");return t===!1?!1:!0}function y(e,t){if(void 0==t)var t=pe.getCurrentSlide();var i=pe.getSlideType(t);if(i!=e)throw new Error("Wrong slide type: "+i+", should be: "+e);return!0}function I(){var e=pe.getCurrentSlide(),t=pe.getSlideImage(e),i=we.getElementSize(e),n=i.left,r=i.top;if(1==Se.slider_video_constantsize){var o=we.getElementSize(t);n+=o.left,r+=o.top}else n+=Se.slider_video_padding_left,r+=Se.slider_video_padding_top;Ie.setPosition(n,r)}function w(){var e=Se.slider_video_constantsize_width,t=Se.slider_video_constantsize_height;Ie.setSize(e,t);var i=Ie.getObject();c(i,"video")}function E(e,t,i){fe.trigger(pe.events.TRANSITION_START);var n=Se.slider_transition;switch(i&&(n=i),pe.stopSlideAction(null,!0),n){default:case"fade":P(t);break;case"slide":T(e,t);break;case"lightbox_open":P(t,!1,!0)}}function T(e,t){var i=pe.isAnimating();if(1==i)return xe.itemWaiting=t,!0;null!=xe.itemWaiting&&(xe.itemWaiting=null);var n=pe.getSlidesReference();switch(e){case"right":f(n.objPrevSlide,t),l();var r=we.getElementSize(n.objPrevSlide),o=-r.left;pe.switchSlideNums("right");break;case"left":f(n.objNextSlide,t),l();var a=we.getElementSize(n.objNextSlide),o=-a.left;pe.switchSlideNums("left");break;default:throw new Error("wrong direction: "+e)}var s=Se.slider_transition_speed,u=Se.slider_transition_easing,d={duration:s,easing:u,queue:!1,always:function(){if(pe.stopSlideAction(),Ie.hide(),null!=xe.itemWaiting){var e=K(xe.itemWaiting);T(e,xe.itemWaiting)}else pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END)}};oe.animate({left:o+"px"},d)}function S(e,t,i){i?e.fadeTo(Se.slider_transition_speed,t,i):e.fadeTo(Se.slider_transition_speed,t)}function P(e,t,i){if(!t)var t=!1;var n=pe.getSlidesReference();f(n.objNextSlide,e);var r=we.getElementSize(n.objCurrentSlide);we.placeElement(n.objNextSlide,r.left,r.top);var o=xe.numCurrent;if(xe.numCurrent=xe.numNext,xe.numNext=o,fe.trigger(pe.events.ITEM_CHANGED),n.objNextSlide.stop(!0),n.objCurrentSlide.stop(!0),1==t)n.objCurrentSlide.fadeTo(0,0),n.objNextSlide.fadeTo(0,1),pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END),i!==!0&&Ie.hide();else{if(n.objNextSlide.fadeTo(0,0),S(n.objCurrentSlide,0,function(){pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END),i!==!0&&Ie.hide()}),1==Ie.isVisible()){var a=Ie.getObject();S(a,0)}S(n.objNextSlide,1)}}function x(){1==Se.slider_fullscreen_button_mobilehide&&be&&be.hide(),1==Se.slider_play_button_mobilehide&&ve&&ve.hide(),1==Se.slider_zoompanel_mobilehide&&ce&&ce.getElement().hide()}function j(){1==Se.slider_fullscreen_button_mobilehide&&be&&be.show(),1==Se.slider_play_button_mobilehide&&ve&&ve.show(),1==Se.slider_zoompanel_mobilehide&&ce&&ce.getElement().show()}function C(){var e=me.isMobileMode();e?x():j()}function A(){var e=re.children(".ug-slider-control");return e}function M(e){if(0==we.isTimePassed("sliderControlsToggle"))return!1;if(0==xe.isControlsVisible)return!1;if(!e)var e=!1;var t=A();e===!0?t.stop().fadeTo(0,0).hide():t.stop().fadeTo(Se.slider_controls_appear_duration,0,function(){t.hide()}),xe.isControlsVisible=!1}function O(e){if(0==we.isTimePassed("sliderControlsToggle"))return!1;if(1==xe.isControlsVisible)return!0;if(!e)var e=!1;var t=A();e===!0?t.stop().show():(t.stop().show().fadeTo(0,0),t.fadeTo(Se.slider_controls_appear_duration,1)),xe.isControlsVisible=!0}function z(){0==xe.isControlsVisible?O():M()}function L(e){if(e==xe.currentControlsMode)return!1;switch(e){case"image":ce&&ce.getElement().show();break;case"video":ce&&ce.getElement().hide();break;default:throw new Error("wrong controld mode: "+e)}xe.currentControlsMode=e}function H(e,t,i){var n=me.getSelectedItem();pe.setItem(n,!1,i);var r=n.index;ye&&ye.setActive(r),Te&&0==xe.isTextPanelSaparateHover&&v(),L("image"==n.type?"image":"video")}function N(e,t){me.selectItem(t)}function k(e){return _e&&0==_e.isTapEventOccured(e)?!0:void fe.trigger(pe.events.CLICK,e)}function R(){var e=pe.getCurrentSlide(),t=e.hasClass("ug-slide-clickable"),i=pe.getCurrentItem();return t?(0==Se.slider_links_newpage?location.href=i.link:window.open(i.link,"_blank"),!0):void(0==Se.slider_controls_always_on&&1==Se.slider_controls_appear_ontap&&1==pe.isCurrentSlideType("image")&&(z(),Te&&1==Se.slider_textpanel_always_on&&pe.isCurrentSlideType("image")&&pe.isCurrentSlideImageFit()&&v()))}function G(e){Te&&pe.isCurrentSlideType("image")&&0==pe.isCurrentSlideImageFit()&&m()}function D(){O()}function Q(){
M()}function W(e){var t=e.parent();pe.startSlideAction(t)}function B(){me.isPlayMode()&&me.pausePlaying(),fe.trigger(pe.events.ACTION_START)}function F(){me.isPlayMode()&&me.continuePlaying(),fe.trigger(pe.events.ACTION_END)}function Y(e,t,i){ae.data("index")==t&&(objItem=me.getItem(t),p(ae,objItem,!0)),se.data("index")==t&&(objItem=me.getItem(t),p(se,objItem,!0)),le.data("index")==t&&(objItem=me.getItem(t),p(le,objItem,!0))}function U(e,t){t=jQuery(t);var i=pe.getSlideImage(t),n=$(t),r=we.getElementSize(i);we.placeElement(n,"center","middle",r.left,r.top,i)}function V(e){var t=$(e);we.addClassOnHover(t),we.setButtonOnClick(t,W)}function X(){te.on(me.events.ITEM_IMAGE_UPDATED,Y),te.on(me.events.ITEM_CHANGE,H),ye&&jQuery(ye).on(ye.events.BULLET_CLICK,N),1==Se.slider_enable_arrows&&(we.addClassOnHover(de,"ug-arrow-hover"),we.addClassOnHover(ue,"ug-arrow-hover"),me.setNextButton(de),me.setPrevButton(ue)),0==Se.slider_controls_always_on&&re.hover(D,Q),re.on("touchend click",k),fe.on(pe.events.CLICK,R),Te&&1==xe.isTextPanelSaparateHover&&re.hover(v,m),ve&&(we.addClassOnHover(ve,"ug-button-hover"),me.setPlayButton(ve)),be&&(we.addClassOnHover(be,"ug-button-hover"),me.setFullScreenToggleButton(be)),ge&&fe.on(pe.events.ZOOM_CHANGE,G),ce&&ce.initEvents(),Ie.initEvents(),jQuery(Ie).on(Ie.events.SHOW,B),jQuery(Ie).on(Ie.events.HIDE,F),V(ae),V(se),V(le),fe.on(pe.events.AFTER_PUT_IMAGE,U),re.on("mouseenter",".ug-item-wrapper img",function(e){fe.trigger(pe.events.IMAGE_MOUSEENTER)}),re.on("mouseleave",".ug-item-wrapper img",function(e){var t=pe.isMouseInsideSlideImage(e);0==t&&fe.trigger(pe.events.IMAGE_MOUSELEAVE)})}function Z(){var e;switch(Se.slider_loader_type){default:case 1:e="ug-loader1";break;case 2:e="ug-loader2";break;case 3:e="ug-loader3";break;case 4:e="ug-loader4";break;case 5:e="ug-loader5";break;case 6:e="ug-loader6";break;case 7:e="ug-loader7";break;case 8:e="ug-loader8";break;case 9:e="ug-loader9"}return"black"==Se.slider_loader_color&&(e+=" ug-loader-black"),e}function q(e){switch(e){case 1:return ae;case 2:return se;case 3:return le;default:throw new Error("wrong num: "+e)}}function K(e){var t=pe.getSlidesReference(),i=t.objCurrentSlide.data("index"),n=e.index,r="left";return i>n&&(r="right"),r}function J(e){if(!e)var e=pe.getCurrentSlide();var t=e.children(".ug-slider-preloader");return t}function $(e){var t=e.children(".ug-button-videoplay");return t}function ee(e){if(!e)var e=pe.getCurrentSlide();var t=e.data("index");if(void 0==t)return null;var i=me.getItem(t);return i}var te,ie,ne,re,oe,ae,se,le,ue,de,_e,ge,ce,he,pe=this,fe=jQuery(pe),me=new UniteGalleryMain,ve=null,be=null,ye=null,Ie=new UGVideoPlayer,we=new UGFunctions,Ee=null,Te=null;this.events={ITEM_CHANGED:"item_changed",BEFORE_SWITCH_SLIDES:"before_switch",BEFORE_RETURN:"before_return",AFTER_RETURN:"after_return",ZOOM_START:"slider_zoom_start",ZOOM_END:"slider_zoom_end",ZOOMING:"slider_zooming",ZOOM_CHANGE:"slider_zoom_change",START_DRAG:"start_drag",AFTER_DRAG_CHANGE:"after_drag_change",ACTION_START:"action_start",ACTION_END:"action_end",CLICK:"slider_click",TRANSITION_START:"slider_transition_start",TRANSITION_END:"slider_transition_end",AFTER_PUT_IMAGE:"after_put_image",IMAGE_MOUSEENTER:"slider_image_mouseenter",IMAGE_MOUSELEAVE:"slider_image_mouseleave",CURRENTSLIDE_LOAD_START:"slider_current_loadstart",CURRENTSLIDE_LOAD_END:"slider_current_loadend"};var Se={slider_scale_mode:"fill",slider_scale_mode_media:"fill",slider_scale_mode_fullscreen:"down",slider_item_padding_top:0,slider_item_padding_bottom:0,slider_item_padding_left:0,slider_item_padding_right:0,slider_background_color:"",slider_background_opacity:1,slider_image_padding_top:0,slider_image_padding_bottom:0,slider_image_padding_left:0,slider_image_padding_right:0,slider_image_border:!1,slider_image_border_width:10,slider_image_border_color:"#ffffff",slider_image_border_radius:0,slider_image_border_maxratio:.35,slider_image_shadow:!1,slider_video_constantsize:!1,slider_video_constantsize_scalemode:"fit",slider_video_constantsize_width:854,slider_video_constantsize_height:480,slider_video_padding_top:0,slider_video_padding_bottom:0,slider_video_padding_left:0,slider_video_padding_right:0,slider_video_enable_closebutton:!0,slider_transition:"slide",slider_transition_speed:300,slider_transition_easing:"easeInOutQuad",slider_control_swipe:!0,slider_control_zoom:!0,slider_zoom_mousewheel:!0,slider_vertical_scroll_ondrag:!1,slider_loader_type:1,slider_loader_color:"white",slider_enable_links:!0,slider_links_newpage:!1,slider_enable_bullets:!1,slider_bullets_skin:"",slider_bullets_space_between:-1,slider_bullets_align_hor:"center",slider_bullets_align_vert:"bottom",slider_bullets_offset_hor:0,slider_bullets_offset_vert:10,slider_enable_arrows:!0,slider_arrows_skin:"",slider_arrow_left_align_hor:"left",slider_arrow_left_align_vert:"middle",slider_arrow_left_offset_hor:20,slider_arrow_left_offset_vert:0,slider_arrow_right_align_hor:"right",slider_arrow_right_align_vert:"middle",slider_arrow_right_offset_hor:20,slider_arrow_right_offset_vert:0,slider_enable_progress_indicator:!0,slider_progress_indicator_type:"pie",slider_progress_indicator_align_hor:"right",slider_progress_indicator_align_vert:"top",slider_progress_indicator_offset_hor:10,slider_progress_indicator_offset_vert:10,slider_enable_play_button:!0,slider_play_button_skin:"",slider_play_button_align_hor:"left",slider_play_button_align_vert:"top",slider_play_button_offset_hor:40,slider_play_button_offset_vert:8,slider_play_button_mobilehide:!1,slider_enable_fullscreen_button:!0,slider_fullscreen_button_skin:"",slider_fullscreen_button_align_hor:"left",slider_fullscreen_button_align_vert:"top",slider_fullscreen_button_offset_hor:11,slider_fullscreen_button_offset_vert:9,slider_fullscreen_button_mobilehide:!1,slider_enable_zoom_panel:!0,slider_zoompanel_skin:"",slider_zoompanel_align_hor:"left",slider_zoompanel_align_vert:"top",slider_zoompanel_offset_hor:12,slider_zoompanel_offset_vert:92,slider_zoompanel_mobilehide:!1,slider_controls_always_on:!1,slider_controls_appear_ontap:!0,slider_controls_appear_duration:300,slider_enable_text_panel:!0,slider_textpanel_always_on:!0,slider_videoplay_button_type:"square"},Pe={slider_progress_indicator_align_hor:"left",slider_progress_indicator_align_vert:"bottom",slider_progress_indicator_offset_hor:0,slider_progress_indicator_offset_vert:0},xe={isRunOnce:!1,isTextPanelSaparateHover:!1,numPrev:1,numCurrent:2,numNext:3,isControlsVisible:!0,currentControlsMode:"image"};this.switchSlideNums=function(e){switch(fe.trigger(pe.events.BEFORE_SWITCH_SLIDES),e){case"left":var t=xe.numCurrent;xe.numCurrent=xe.numNext,xe.numNext=xe.numPrev,xe.numPrev=t;break;case"right":var t=xe.numCurrent;xe.numCurrent=xe.numPrev,xe.numPrev=xe.numNext,xe.numNext=t;break;default:throw new Error("wrong direction: "+e)}fe.trigger(pe.events.ITEM_CHANGED)},this.destroy=function(){fe.off(pe.events.AFTER_PUT_IMAGE),te.off(me.events.ITEM_IMAGE_UPDATED),te.off(me.events.ITEM_CHANGE),ye&&jQuery(ye).on(ye.events.BULLET_CLICK),re.off("mouseenter"),re.off("mouseleave"),re.off("touchend"),re.off("click"),fe.off(pe.events.CLICK),ge&&fe.off(pe.events.ZOOM_CHANGE),fe.off(pe.events.BEFORE_SWITCH_SLIDES),jQuery(Ie).off(Ie.events.SHOW),jQuery(Ie).off(Ie.events.HIDE),Ie.destroy(),re.off("mouseenter",".ug-item-wrapper img"),re.off("mouseleave",".ug-item-wrapper img")},this.________EXTERNAL_GENERAL___________=function(){},this.init=function(t,i,n){e(t,i,n)},this.getSlideImage=function(e){if(!e)var e=pe.getCurrentSlide();var t=e.find(".ug-item-wrapper img");return t},this.setHtml=function(e){r(e)},this.run=function(){t()},this.isInnerInPlace=function(){var e=pe.getSlidesReference(),t=we.getElementSize(e.objCurrentSlide),i=-t.left,n=we.getElementSize(oe);return i==n.left?!0:!1},this.isAnimating=function(){var e=oe.is(":animated");return e},this.isSlideCurrent=function(e){var t=e.data("slidenum");return xe.numCurrent==t?!0:!1},this.isSlideHasItem=function(e){var t=e.data("index");return void 0===t||null===t?!1:!0},this.getObjImagePadding=function(){var e={padding_top:Se.slider_image_padding_top,padding_bottom:Se.slider_image_padding_bottom,padding_left:Se.slider_image_padding_left,padding_right:Se.slider_image_padding_right};return e},this.getSlidesReference=function(){var e={objPrevSlide:q(xe.numPrev),objNextSlide:q(xe.numNext),objCurrentSlide:q(xe.numCurrent)};return e},this.getCurrentSlide=function(){var e=pe.getSlidesReference();return e.objCurrentSlide},this.getCurrentItemIndex=function(){var e=pe.getSlidesReference(),t=e.objCurrentSlide.data("index");return(null===t||void 0===t)&&(t=-1),t},this.getCurrentItem=function(){var e=pe.getCurrentItemIndex();if(-1==e)return null;var t=me.getItem(e);return t},this.getSlideType=function(e){void 0==e&&(e=pe.getCurrentSlide());var t=e.data("type");return t},this.isMouseInsideSlideImage=function(e){var t=pe.getSlideImage(),i=we.getMousePosition(e);void 0===i.pageX&&(i=_e.getLastMousePos());var n=we.getMouseElementPoint(i,t),r=we.getElementSize(t);return isMouseInside=we.isPointInsideElement(n,r),isMouseInside},this.isCurrentSlideType=function(e){var t=pe.getSlideType();return t==e?!0:!1},this.isCurrentSlideLoadingImage=function(){var e=pe.getCurrentSlide(),t=e.data("isLoading");return t===!0?!0:!1},this.setItem=function(e,t,i){var n=pe.getSlidesReference(),r=n.objCurrentSlide.data("index"),o=e.index;if(o==r)return!0;var a=void 0==r;if(a)f(n.objCurrentSlide,e),pe.placeNabourItems();else{var s="left";me.getNumItems();"next"==i?s="left":"prev"==i||r>o?s="right":r>o&&(s="right"),E(s,e,t)}},this.placeNabourItems=function(){var e=pe.getSlidesReference(),t=e.objCurrentSlide.data("index"),i=me.getPrevItem(t),n=me.getNextItem(t);f(e.objNextSlide,n),f(e.objPrevSlide,i),l()},this.________EXTERNAL_API___________=function(){},this.stopSlideAction=function(e,t){e||(e=pe.getCurrentSlide()),t===!0?Ie.pause():Ie.hide()},this.startSlideAction=function(e){e||(e=pe.getCurrentSlide());var t=ee(e);if("image"==t.type)return!0;switch(1==Se.slider_video_constantsize&&w(),I(),Ie.show(),t.type){case"youtube":Ie.playYoutube(t.videoid);break;case"vimeo":Ie.playVimeo(t.videoid);break;case"html5video":Ie.playHtml5Video(t.videoogv,t.videowebm,t.videomp4,t.urlImage);break;case"soundcloud":Ie.playSoundCloud(t.trackid);break;case"wistia":Ie.playWistia(t.videoid)}},this.getScaleMode=function(e){if(!e)var e=pe.getCurrentSlide();var t=pe.getSlideType(e);return"image"!=t?Se.slider_scale_mode_media:Se.slider_scale_mode==Se.slider_scale_mode_fullscreen?Se.slider_scale_mode:1==me.isFullScreen()?Se.slider_scale_mode_fullscreen:Se.slider_scale_mode},this.getObjects=function(){var e={g_objSlider:re,g_objInner:oe,g_options:Se,g_objZoomSlider:ge};return e},this.getObjZoom=function(){return ge},this.getOptions=function(){return Se},this.getElement=function(){return re},this.getVideoObject=function(){return Ie},this.isCurrentSlideImageFit=function(){var e=pe.getCurrentSlide();pe.getSlideType(e);y("image",e);var t=pe.getSlideImage(e);if(0==t.length)return!1;var i=we.isImageFitParent(t);return i},this.isCurrentImageInPlace=function(){var e=pe.getSlideImage();if(0==e.length)return!1;var t=pe.getScaleMode(),i=pe.getObjImagePadding(),n=ee(),r=e.parent(),o=we.getImageInsideParentData(r,n.imageWidth,n.imageHeight,t,i),a=we.getElementSize(e),s=!1;return o.imageWidth==a.width&&(s=!0),s},this.isSlideActionActive=function(){return Ie.isVisible()},this.isSwiping=function(){if(!_e)return!1;var e=_e.isTouchActive();return e},this.isPreloading=function(){var e=J();return e.is(":visible")?!0:!1},this.setOptions=function(e){he&&(e=we.convertCustomPrefixOptions(e,he,"slider")),Se=jQuery.extend(Se,e)},this.setSize=function(e,t){if(0>e||0>t)return!0;var i={};i.width=e+"px",i.height=t+"px",re.css(i);var n={};n.height=t+"px",n.top="0px",n.left="0px",oe.css(n);var r={};r.height=t+"px",r.width=e+"px",ae.css(r),se.css(r),le.css(r);var o=e-Se.slider_item_padding_left-Se.slider_item_padding_right,s=t-Se.slider_item_padding_top-Se.slider_item_padding_bottom,d={};d.width=o+"px",d.height=s+"px",d.top=Se.slider_item_padding_top+"px",d.left=Se.slider_item_padding_left+"px",re.find(".ug-item-wrapper").css(d),Te&&Te.setSizeByParent(),a(),u(ae),u(se),u(le),l();var _=pe.getSlideType();if("image"!=_&&1==Se.slider_video_constantsize)w();else{var g=e-Se.slider_video_padding_left-Se.slider_video_padding_right,c=t-Se.slider_video_padding_top-Se.slider_video_padding_bottom;Ie.setSize(g,c)}I()},this.refreshSlideItems=function(){return 1==pe.isAnimating()?!0:(u(ae),u(se),u(le),void l())},this.isMouseOver=function(){return re.ismouseover()},this.setPosition=function(e,t){we.placeElement(re,e,t)},this.zoomIn=function(){return ge?void ge.zoomIn():!0},this.zoomOut=function(){return ge?void ge.zoomOut():!0},this.zoomBack=function(){return ge?void ge.zoomBack():!0}}function UGTextPanel(){function e(e,t){if(!t)var t=v.textpanel_padding_top;var i=t;if(d){var n=i;f.placeElement(d,0,n);var o=d.is(":visible");if(1==o){var a=f.getElementSize(d),i=a.bottom;i>0&&(b.lastTitleBottom=i)}else{var i=20;b.lastTitleBottom>0&&(i=b.lastTitleBottom)}}var s="";if(_&&(s=jQuery.trim(_.text())),""!=s){var l=i;d&&(l+=v.textpanel_padding_title_description),f.placeElement(_,0,l);var u=jQuery(_).is(":visible");if(1==u){var g=f.getElementSize(_);i=g.bottom,g.height>0&&(b.lastDescHeight=g.height)}else{var c=16;b.lastDescHeight>0&&(c=b.lastDescHeight),i=l+c}}if(!v.textpanel_height&&1==b.setInternalHeight){var h=i+v.textpanel_padding_bottom;r(h,e)}}function t(){var e=0;if(d&&(e+=d.outerHeight()),_){var t="";_&&(t=jQuery.trim(_.text())),""!=t&&(d&&(e+=v.textpanel_padding_title_description),e+=_.outerHeight())}return e}function i(){var i=t(),n=(c.height()-i)/2;e(!1,n)}function n(){var i=t(),n=c.height()-i-v.textpanel_padding_bottom;e(!1,n)}function r(e,t){if(!t)var t=!1;if(1==t){if(g){var i=g.height();e>i&&g.height(e)}var n={height:e+"px"};l.add(c).animate(n,v.textpanel_fade_duration)}else g&&g.height(e),l.add(c).height(e)}function o(){if(1==v.textpanel_enable_bg){g=l.children(".ug-textpanel-bg"),g.fadeTo(0,v.textpanel_bg_opacity);var e={"background-color":v.textpanel_bg_color};e=jQuery.extend(e,v.textpanel_bg_css),g.css(e)}if(1==v.textpanel_enable_title){d=c.children(".ug-textpanel-title");var t={};null!==v.textpanel_title_color&&(t.color=v.textpanel_title_color),null!==v.textpanel_title_font_family&&(t["font-family"]=v.textpanel_title_font_family),null!==v.textpanel_title_text_align&&(t["text-align"]=v.textpanel_title_text_align),null!==v.textpanel_title_font_size&&(t["font-size"]=v.textpanel_title_font_size+"px"),null!==v.textpanel_title_bold&&(v.textpanel_title_bold===!0?t["font-weight"]="bold":t["font-weight"]="normal"),v.textpanel_css_title&&(t=jQuery.extend(t,v.textpanel_css_title)),d.css(t)}if(1==v.textpanel_enable_description){_=c.children(".ug-textpanel-description");var i={};null!==v.textpanel_desc_color&&(i.color=v.textpanel_desc_color),null!==v.textpanel_desc_font_family&&(i["font-family"]=v.textpanel_desc_font_family),null!==v.textpanel_desc_text_align&&(i["text-align"]=v.textpanel_desc_text_align),null!==v.textpanel_desc_font_size&&(i["font-size"]=v.textpanel_desc_font_size+"px"),null!==v.textpanel_desc_bold&&(v.textpanel_desc_bold===!0?i["font-weight"]="bold":i["font-weight"]="normal"),v.textpanel_css_title&&(i=jQuery.extend(i,v.textpanel_css_description)),_.css(i)}}function a(){var e=h.getSelectedItem();p.setText(e.title,e.description)}function s(){jQuery(h).on(h.events.ITEM_CHANGE,a)}var l,u,d,_,g,c,h,p=this,f=new UGFunctions,m="",v={textpanel_align:"bottom",textpanel_margin:0,textpanel_text_valign:"middle",textpanel_padding_top:10,textpanel_padding_bottom:10,textpanel_height:null,textpanel_padding_title_description:5,textpanel_padding_right:11,textpanel_padding_left:11,textpanel_fade_duration:200,textpanel_enable_title:!0,textpanel_enable_description:!0,textpanel_enable_bg:!0,textpanel_bg_color:"#000000",textpanel_bg_opacity:.4,textpanel_title_color:null,textpanel_title_font_family:null,textpanel_title_text_align:null,textpanel_title_font_size:null,textpanel_title_bold:null,textpanel_css_title:{},textpanel_desc_color:null,textpanel_desc_font_family:null,textpanel_desc_text_align:null,textpanel_desc_font_size:null,textpanel_desc_bold:null,textpanel_css_description:{},textpanel_desc_style_as_title:!1,textpanel_bg_css:{}},b={isFirstTime:!0,setInternalHeight:!0,lastTitleBottom:0,lastDescHeight:0};this.positionElements=function(t){if(!v.textpanel_height||"top"==v.textpanel_text_valign)return e(t),!1;switch(v.textpanel_text_valign){default:case"top":e(!1);break;case"bottom":n();break;case"center":case"middle":i()}},this.init=function(e,t,i){if(h=e,i&&(m=i,t=f.convertCustomPrefixOptions(t,m,"textpanel")),t&&(v=jQuery.extend(v,t)),0==v.textpanel_enable_title&&0==v.textpanel_enable_description)throw new Error("Textpanel Error: The title or description must be enabled");v.textpanel_height&&v.textpanel_height<0&&(v.textpanel_height=null),1==v.textpanel_desc_style_as_title&&(v.textpanel_desc_color||(v.textpanel_desc_color=v.textpanel_title_color),v.textpanel_desc_bold||(v.textpanel_desc_bold=v.textpanel_title_bold),v.textpanel_desc_font_family||(v.textpanel_desc_font_family=v.textpanel_title_font_family),v.textpanel_desc_font_size||(v.textpanel_desc_font_size=v.textpanel_title_font_size),v.textpanel_desc_text_align||(v.textpanel_desc_text_align=v.textpanel_title_text_align))},this.appendHTML=function(e,t){u=e,t=t?" "+t:"";var i="<div class='ug-textpanel"+t+"'>";1==v.textpanel_enable_bg&&(i+="<div class='ug-textpanel-bg"+t+"'></div>"),i+="<div class='ug-textpanel-textwrapper"+t+"'>",1==v.textpanel_enable_title&&(i+="<div class='ug-textpanel-title"+t+"'></div>"),1==v.textpanel_enable_description&&(i+="<div class='ug-textpanel-description"+t+"'></div>"),i+="</div></div>",e.append(i),l=e.children(".ug-textpanel"),c=l.children(".ug-textpanel-textwrapper"),o()},this.destroy=function(){jQuery(h).off(h.events.ITEM_CHANGE)},this.run=function(){p.setSizeByParent(),s()},this.setPanelSize=function(e,t){if(b.setInternalHeight=!0,t)b.setInternalHeight=!1;else var t=80;v.textpanel_height&&(t=v.textpanel_height),l.width(e),l.height(t),g&&(g.width(e),g.height(t));var i=e-v.textpanel_padding_left-v.textpanel_padding_right,n=v.textpanel_padding_left;f.setElementSizeAndPosition(c,n,0,i,t),d&&d.width(i),_&&_.width(i),0==b.isFirstTime&&p.positionElements(!1)},this.setSizeByParent=function(){var e=f.getElementSize(u);p.setPanelSize(e.width)},this.setTextPlain=function(e,t){d&&d.html(e),_&&_.html(t)},this.setText=function(e,t){1==b.isFirstTime?(p.setTextPlain(e,t),b.isFirstTime=!1,p.positionElements(!1)):c.stop().fadeTo(v.textpanel_fade_duration,0,function(){p.setTextPlain(e,t),p.positionElements(!0),jQuery(this).fadeTo(v.textpanel_fade_duration,1)})},this.positionPanel=function(e,t){var i={};if(void 0!==e&&null!==e)i.top=e,i.bottom="auto";else switch(v.textpanel_align){case"top":i.top=v.textpanel_margin+"px";break;case"bottom":i.top="auto",i.bottom=v.textpanel_margin+"px";break;case"middle":i.top=f.getElementRelativePos(l,"middle",v.textpanel_margin)}void 0!==t&&null!==t&&(i.left=t),l.css(i)},this.setOptions=function(e){m&&(e=f.convertCustomPrefixOptions(e,m,"textpanel")),v=jQuery.extend(v,e)},this.getElement=function(){return l},this.getSize=function(){var e=f.getElementSize(l);return e},this.refresh=function(e,t,i,n){o(),i?p.setPanelSize(i,n):p.setSizeByParent(),p.positionElements(!1),t!==!0&&p.positionPanel(),e===!0&&p.show()},this.hide=function(){l.hide()},this.show=function(){l.show()},this.getOptions=function(){return v},this.getOption=function(e){return 0==v.hasOwnProperty(e)?null:v[e]}}function UGZoomButtonsPanel(){function e(e){return e?e.hasClass("ug-zoompanel-button-disabled")?!0:!1:!0}function t(e){e&&e.addClass("ug-zoompanel-button-disabled")}function i(e){e&&e.removeClass("ug-zoompanel-button-disabled")}function n(){if(0==d.isCurrentSlideType("image"))return!0;var n=d.isCurrentSlideImageFit();1==n?0==e(s)&&(t(s),t(l)):1==e(s)&&(i(s),i(l))}var r,o,a,s,l,u=this,d=new UGSlider,_=new UGFunctions,g={slider_zoompanel_skin:""};this.init=function(e,t){d=e,t&&(g=jQuery.extend(g,t))},this.appendHTML=function(e){o=e;var t="<div class='ug-slider-control ug-zoompanel ug-skin-"+g.slider_zoompanel_skin+"'>";t+="<div class='ug-zoompanel-button ug-zoompanel-plus'></div>",t+="<div class='ug-zoompanel-button ug-zoompanel-minus ug-zoompanel-button-disabled'></div>",t+="<div class='ug-zoompanel-button ug-zoompanel-return ug-zoompanel-button-disabled'></div>",t+="</div>",e.append(t),r=e.children(".ug-zoompanel"),a=r.children(".ug-zoompanel-plus"),s=r.children(".ug-zoompanel-minus"),l=r.children(".ug-zoompanel-return")},this.setObjects=function(e,t,i){a=e,s=t,l=i,s&&s.addClass("ug-zoompanel-button-disabled"),l&&l.addClass("ug-zoompanel-button-disabled")},this.getElement=function(){return r},u.initEvents=function(){_.addClassOnHover(a,"ug-button-hover"),_.addClassOnHover(s,"ug-button-hover"),_.addClassOnHover(l,"ug-button-hover"),_.setButtonOnClick(a,function(){return 1==e(a)?!0:void d.zoomIn()}),_.setButtonOnClick(s,function(){return 1==e(s)?!0:void d.zoomOut()}),_.setButtonOnClick(l,function(){return 1==e(l)?!0:void d.zoomBack()}),jQuery(d).on(d.events.ZOOM_CHANGE,n),jQuery(d).on(d.events.ITEM_CHANGED,n)}}function UGBullets(){function e(){var e="",t="";-1!=h.bullets_space_between&&(t=" style='margin-left:"+h.bullets_space_between+"px'");for(var i=0;u>i;i++)e+=0==i?"<div class='ug-bullet'></div>":"<div class='ug-bullet'"+t+"></div>";if(o.html(e),!s){var n=o.find(".ug-bullet:first-child");n.length&&(s=n.width())}}function t(e){if(1==l.isActive(e))return!0;var t=e.index();jQuery(l).trigger(l.events.BULLET_CLICK,t)}function i(){var e=o.children(".ug-bullet");g.setButtonOnClick(e,t),e.on("mousedown mouseup",function(e){return!1})}function n(e){if(0>e||e>=u)throw new Error("wrong bullet index: "+e)}function r(){if(1==c.isInited)return!0;throw new Error("The bullets are not inited!")}var o,a,s,l=this,u=0,d=new UniteGalleryMain,_=-1,g=new UGFunctions,c={isInited:!1},h={bullets_skin:"",bullets_addclass:"",bullets_space_between:-1};this.events={BULLET_CLICK:"bullet_click"},this.init=function(e,t,i){d=e,u=i?i:d.getNumItems(),c.isInited=!0,h=jQuery.extend(h,t),""==h.bullets_skin&&(h.bullets_skin=h.gallery_skin)},this.getBulletsWidth=function(){if(0==u)return 0;if(!s)return 0;var e=u*s+(u-1)*h.bullets_space_between;return e},this.appendHTML=function(t){a=t,r();var n="";""!=h.bullets_addclass&&(n=" "+h.bullets_addclass);var s="<div class='ug-slider-control ug-bullets ug-skin-"+h.bullets_skin+n+"'>";s+="</div>",o=jQuery(s),t.append(o),e(),i()},this.updateNumBullets=function(t){u=t,e(),i()},this.getElement=function(){return o},this.setActive=function(e){r(),n(e);var t=o.children(".ug-bullet");t.removeClass("ug-bullet-active");var i=jQuery(t[e]);i.addClass("ug-bullet-active"),_=e},this.isActive=function(e){if(n(e),"number"!=typeof e)var t=e;else var t=o.children(".ug-bullet")[e];return t.hasClass("ug-bullet-active")?!0:!1},this.getNumBullets=function(){return u}}function UGProgressBar(){var e,t,i=this,n=0,r=new UGFunctions,o={slider_progressbar_color:"#ffffff",slider_progressbar_opacity:.6,slider_progressbar_line_width:5};this.put=function(i,n){n&&(o=jQuery.extend(o,n)),i.append("<div class='ug-progress-bar'><div class='ug-progress-bar-inner'></div></div>"),e=i.children(".ug-progress-bar"),t=e.children(".ug-progress-bar-inner"),t.css("background-color",o.slider_progressbar_color),e.height(o.slider_progressbar_line_width),t.height(o.slider_progressbar_line_width),t.width("0%");var r=o.slider_progressbar_opacity,a=t[0];a.style.opacity=r,a.style.filter="alpha(opacity="+100*r+")"},this.putHidden=function(t,n){i.put(t,n),e.hide()},this.getElement=function(){return e},this.setSize=function(n){e.width(n),t.width(n),i.draw()},this.setPosition=function(t,i,n,o){r.placeElement(e,t,i,n,o)},this.draw=function(){var e=100*n;t.width(e+"%")},this.setProgress=function(e){n=r.normalizePercent(e),i.draw()},this.getType=function(){return"bar"}}function UGProgressPie(){function e(e){if(!e)var e=0;var t=Math.min(a.slider_progresspie_width,a.slider_progresspie_height)/2,n=i[0].getContext("2d");0==r&&(r=!0,n.rotate(1.5*Math.PI),n.translate(-2*t,0)),n.clearRect(0,0,a.slider_progresspie_width,a.slider_progresspie_height);var o=a.slider_progresspie_width/2,s=a.slider_progresspie_height/2,l=0,u=e*Math.PI*2;if(1==a.slider_progresspie_type_fill)n.beginPath(),n.moveTo(o,s),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath();else{n.globalCompositeOperation="source-over",n.beginPath(),n.moveTo(o,s),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath(),n.globalCompositeOperation="destination-out";var d=t-a.slider_progresspie_stroke_width;n.beginPath(),n.moveTo(o,s),n.arc(o,s,d,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath()}1==a.slider_progresspie_type_fill&&(l=u,u=2*Math.PI,n.beginPath(),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color2,n.fill(),n.closePath())}var t,i,n=this,r=!1,o=new UGFunctions,a={slider_progresspie_type_fill:!1,slider_progresspie_color1:"#B5B5B5",slider_progresspie_color2:"#E5E5E5",slider_progresspie_stroke_width:6,slider_progresspie_width:30,slider_progresspie_height:30};this.put=function(e,t){t&&(a=jQuery.extend(a,t)),e.append("<canvas class='ug-canvas-pie' width='"+a.slider_progresspie_width+"' height='"+a.slider_progresspie_height+"'></canvas>"),i=e.children(".ug-canvas-pie")},this.putHidden=function(t,r){n.put(t,r),e(.1),i.hide()},this.getElement=function(){return i},this.setPosition=function(e,t){o.placeElement(i,e,t)},this.getSize=function(){var e={width:a.slider_progresspie_width,height:a.slider_progresspie_height};return e},this.setProgress=function(i){i=o.normalizePercent(i),t=i,e(i)},this.getType=function(){return"pie"}}function UGTouchSliderControl(){function e(e){if(!e)var e=m.getSlidesReference();var t=v.getElementSize(e.objCurrentSlide),i=-t.left,n=v.getElementSize(h),r=i-n.left;return r}function t(){var t=m.getSlidesReference(),i=e(t),n=Math.round(3*t.objCurrentSlide.width()/8);if(Math.abs(i)>=n)return!0;var r=Math.abs(b.lastMouseX-b.startMouseX);Math.abs(b.lastMouseY-b.startMouseY);if(20>r)return!1;var o=jQuery.now(),a=o-b.startTime;return 500>a?!0:!1}function i(e){if(1==m.isInnerInPlace())return!1;if(p.trigger(m.events.BEFORE_RETURN),!e)var e=m.getSlidesReference();var t=v.getElementSize(e.objCurrentSlide),i=-t.left;h.animate({left:i+"px"},{duration:f.slider_transition_return_speed,easing:f.slider_transition_continuedrag_easing,queue:!1,progress:function(e,t,n){if(1==b.isDragVideo){var r=v.getElementSize(h),o=r.left,a=o-i,s=b.videoStartX+a;b.videoObject.css("left",s)}},complete:function(){p.trigger(m.events.AFTER_RETURN)}})}function n(e){m.getVideoObject().hide(),m.switchSlideNums(e),m.placeNabourItems()}function r(){var t=m.getSlidesReference(),r=e(t);if(0==r)return!1;var o=r>0?"left":"right",a=!1;switch(o){case"right":if(m.isSlideHasItem(t.objPrevSlide))var s=v.getElementSize(t.objPrevSlide),l=-s.left;else a=!0;break;case"left":if(m.isSlideHasItem(t.objNextSlide))var u=v.getElementSize(t.objNextSlide),l=-u.left;else a=!0}1==a?i(t):h.stop().animate({left:l+"px"},{duration:f.slider_transition_continuedrag_speed,easing:f.slider_transition_continuedrag_easing,queue:!1,progress:function(){if(1==b.isDragVideo){var e=v.getElementSize(h),t=e.left,i=t-b.startPosx,n=b.videoStartX+i;b.videoObject.css("left",n)}},always:function(){n(o),p.trigger(m.events.AFTER_DRAG_CHANGE)}})}function o(e){var t=b.lastMouseX-b.startMouseX;if(0==t)return!0;var i=0>t?"left":"right",n=m.getObjZoom();if(n){var r=n.isPanEnabled(e,i);if(1==r)return b.isInitDataValid=!1,!0;if(0==b.isInitDataValid)return a(e),!0}var o=b.startPosx+t;if(t>0&&o>0)o/=3;else if(0>t){var s=o+h.width(),l=c.width();l>s&&(o=b.startPosx+t/3)}if(0==b.isDragging&&(b.isDragging=!0,p.trigger(m.events.START_DRAG)),h.css("left",o+"px"),1==b.isDragVideo){var u=o-b.startPosx,d=b.videoStartX+u;b.videoObject.css("left",d)}}function a(e){var t=v.getMousePosition(e);b.startMouseX=t.pageX,b.startMouseY=t.pageY,b.lastMouseX=b.startMouseX,b.lastMouseY=b.startMouseY,b.startTime=jQuery.now();var i=v.getArrTouches(e);b.startArrTouches=v.getArrTouchPositions(i);var n=v.getElementSize(h);b.startPosx=n.left,b.isInitDataValid=!0,b.isDragVideo=!1,v.storeEventData(e,b.storedEventID)}function s(e){b.touch_active=!1}function l(e,t){b.touch_active=!0,a(t)}function u(e){e.preventDefault(),b.isDragging=!1,1==m.isAnimating()&&h.stop(!0,!0);var t=v.getArrTouches(e);return t.length>1?(1==b.touch_active&&s("1"),!0):1==b.touch_active?!0:void l("1",e)}function d(e){if(0==b.touch_active)return!0;if(0==e.buttons)return s("2"),r(),!0;v.updateStoredEventData(e,b.storedEventID),e.preventDefault();var t=v.getMousePosition(e);b.lastMouseX=t.pageX,b.lastMouseY=t.pageY;var i=null;1==f.slider_vertical_scroll_ondrag&&(i=v.handleScrollTop(b.storedEventID)),"vert"!==i&&o(e)}function _(e){var n=v.getArrTouches(e),o=n.length,a=m.isInnerInPlace();if(1==a&&0==b.touch_active&&0==o)return!0;if(0==o&&1==b.touch_active){s("3");var u=!1,d=v.wasVerticalScroll(b.storedEventID);0==d&&(u=t()),1==u?r():i()}else 1==o&&0==b.touch_active&&l("2",e)}function g(){c.bind("mousedown touchstart",u),jQuery("body").bind("mousemove touchmove",d),jQuery(window).add("body").bind("mouseup touchend",_)}var c,h,p,f,m=new UGSlider,v=new UGFunctions,f={slider_transition_continuedrag_speed:250,slider_transition_continuedrag_easing:"linear",slider_transition_return_speed:300,slider_transition_return_easing:"easeInOutQuad"},b={touch_active:!1,startMouseX:0,startMouseY:0,lastMouseX:0,lastMouseY:0,startPosx:0,startTime:0,isInitDataValid:!1,slides:null,lastNumTouches:0,isDragging:!1,storedEventID:"touchSlider",videoStartX:0,isDragVideo:!1,videoObject:null};this.isTapEventOccured=function(t){var i=v.getArrTouches(t),n=i.length;if(0!=n||0!=b.lastNumTouches)return b.lastNumTouches=n,!1;b.lastNumTouches=n;var r=m.getSlidesReference(),o=(e(r),Math.abs(b.lastMouseX-b.startMouseX)),a=Math.abs(b.lastMouseY-b.startMouseY),s=jQuery.now(),l=s-b.startTime;return 20>o&&50>a&&500>l?!0:!1},this.init=function(e,t){m=e,p=jQuery(m),g_objects=e.getObjects(),c=g_objects.g_objSlider,h=g_objects.g_objInner,f=jQuery.extend(f,t),g()},this.getLastMousePos=function(){var e={pageX:b.lastMouseX,pageY:b.lastMouseY};return e},this.isTouchActive=function(){return b.touch_active}}function UGZoomSliderControl(){function e(e,t){E=e,w=jQuery(E),g_objects=e.getObjects(),y=g_objects.g_objSlider,I=g_objects.g_objInner,S=jQuery.extend(S,t),b()}function t(){var e=E.getScaleMode();return"down"!=e&&(e="fit"),e}function i(){var e=jQuery.now(),i=e-P.storeImageLastTime;if(20>i)return!1;var n=E.getSlidesReference();if(P.objSlide=n.objCurrentSlide,P.objImage=n.objCurrentSlide.find("img"),0==P.objImage.length)return!1;P.objImageSize=T.getElementSize(P.objImage),P.objParent=P.objImage.parent(),P.objParentSize=T.getElementSize(P.objParent);var r=t();objPadding=E.getObjImagePadding(),P.objFitImageSize=T.getImageInsideParentDataByImage(P.objImage,r,objPadding);var e=jQuery.now();return P.storeImageLastTime=e,!0}function n(e,i){var n=E.getSlidesReference(),r=n.objCurrentSlide.find("img"),o=t();w.trigger(E.events.ZOOM_START);var a=!0,s=E.getObjImagePadding();if("back"==e){var l=T.getImageOriginalSize(r);T.scaleImageFitParent(r,l.width,l.height,o,s)}else{var u="in"==e?!0:!1;a=T.zoomImageInsideParent(r,u,S.slider_zoom_step,i,o,S.slider_zoom_max_ratio,s)}1==a&&(w.trigger(E.events.ZOOMING),w.trigger(E.events.ZOOM_CHANGE),w.trigger(E.events.ZOOM_END))}function r(e,t,i){var n=T.getArrTouches(t);if(i===!0){if(1!=n.length)return!1}else if(n.length>1)return!1;return T.isElementBiggerThenParent(e)?!0:!1}function o(e){var t=T.getMousePosition(e);P.startMouseX=t.pageX,P.startMouseY=t.pageY,P.lastMouseX=P.startMouseX,P.lastMouseY=P.startMouseY,P.startImageX=P.objImageSize.left,P.startImageY=P.objImageSize.top,P.panXActive=P.objImageSize.width>P.objParentSize.width,
P.panYActive=P.objImageSize.height>P.objParentSize.height}function a(e){P.isPanActive=!0,o(e)}function s(e){if(void 0==P.objImage||0==P.objImage.length)return!0;var t=T.getMousePosition(e),i=(t.pageX-P.startMouseX,t.pageY-P.startMouseY,t.pageX-P.lastMouseX),n=t.pageY-P.lastMouseY,r=0>i?"left":"right",o=0>n?"up":"down";P.lastMouseX=t.pageX,P.lastMouseY=t.pageY;var a=T.getElementSize(P.objImage);0==P.panYActive?n=0:"down"==o&&a.top>0?n/=3:"up"==o&&a.bottom<P.objParentSize.height&&(n/=3),0==P.panXActive||0==E.isInnerInPlace()?i=0:"right"==r&&a.left>0?i/=3:"left"==r&&a.right<P.objParentSize.width&&(i/=3);var s=a.left+i,l=a.top+n;T.placeElement(P.objImage,s,l)}function l(){var e=!1,t=!1,i=0,n=0,r=T.getElementSize(P.objImage),o=E.getObjImagePadding(),a=T.getElementCenterPosition(P.objImage,o);P.panXActive=P.objImageSize.width>P.objParentSize.width,P.panYActive=P.objImageSize.height>P.objParentSize.height,1==P.panYActive?r.top>0?(n=0,t=!0):r.bottom<P.objParentSize.height&&(n=P.objParentSize.height-r.height,t=!0):r.top!=a.top&&(t=!0,n=a.top),1==P.panXActive?r.left>0?(i=0,e=!0):r.right<P.objParentSize.width&&(i=P.objParentSize.width-r.width,e=!0):r.left!=a.left&&(e=!0,i=a.left);var s={};1==t&&(s.top=n+"px"),1==e&&(s.left=i+"px"),(1==t||1==e)&&P.objImage.animate(s,{duration:S.slider_zoom_return_pan_duration,easing:S.slider_zoom_return_pan_easing,queue:!1})}function u(){return P.objImage&&P.objImage.is(":animated")?!0:!1}function d(e){P.isZoomActive=!0,P.startDistance=T.getDistance(e[0].pageX,e[0].pageY,e[1].pageX,e[1].pageY),0==P.startDistance&&(P.startDistance=1),P.startMiddlePoint=T.getMiddlePoint(e[0].pageX,e[0].pageY,e[1].pageX,e[1].pageY),P.objImageSize=T.getElementSize(P.objImage),P.startImageX=P.objImageSize.left,P.startImageY=P.objImageSize.top,P.imageOrientPoint=T.getElementLocalPoint(P.startMiddlePoint,P.objImage);var t=T.isPointInsideElement(P.imageOrientPoint,P.objImageSize);0==t&&(P.imageOrientPoint=T.getElementCenterPoint(P.objImage)),w.trigger(E.events.ZOOM_START)}function _(e){if(0==P.isZoomActive)return!1;var t=T.getArrTouches(e);2!=t.length&&(P.isZoomActive=!1,w.trigger(E.events.ZOOM_END))}function g(e){if(1==P.isZoomActive)return!0;var t=T.getArrTouches(e);return 2!=t.length?!0:void d(t)}function c(e){var t=T.getArrTouches(e),i=T.getDistance(t[0].pageX,t[0].pageY,t[1].pageX,t[1].pageY),n=i/P.startDistance,r=T.getMiddlePoint(t[0].pageX,t[0].pageY,t[1].pageX,t[1].pageY),o=P.objImageSize.width*n,a=P.objImageSize.height*n,s=T.getImageOriginalSize(P.objImage),l=1;if(s.width>0&&(l=o/s.width),l>S.slider_zoom_max_ratio)return!0;panX=-(P.imageOrientPoint.x*n-P.imageOrientPoint.x),panY=-(P.imageOrientPoint.y*n-P.imageOrientPoint.y);var u=r.x-P.startMiddlePoint.x,d=r.y-P.startMiddlePoint.y,_=P.startImageX+panX+u,g=P.startImageY+panY+d;T.setElementSizeAndPosition(P.objImage,_,g,o,a),w.trigger(E.events.ZOOMING),w.trigger(E.events.ZOOM_CHANGE)}function h(){if(void 0==P.objImage||0==P.objImage.length)return!0;var e=T.getElementSize(P.objImage);if(e.width<P.objFitImageSize.imageWidth){P.objImage.css({position:"absolute",margin:"none"});var t={top:P.objFitImageSize.imageTop+"px",left:P.objFitImageSize.imageLeft+"px",width:P.objFitImageSize.imageWidth+"px",height:P.objFitImageSize.imageHeight+"px"};P.objImage.animate(t,{duration:S.slider_zoom_return_pan_duration,easing:S.slider_zoom_return_pan_easing,queue:!1})}else l()}function p(e){if(0==E.isCurrentSlideType("image"))return!0;i();return void 0==P.objImage||0==P.objImage.length?!0:(e.preventDefault(),1==u()&&P.objImage.stop(!0),1==P.isZoomActive?_(e):g(e),void(1==P.isZoomActive?P.isPanActive=!1:1==r(P.objImage,e)&&1==P.isZoomedOnce&&a(e)))}function f(e){if(0==E.isCurrentSlideType("image"))return!0;var t=jQuery(e.target);if(1==t.data("ug-button"))return!1;i();if(void 0==P.objImage||0==P.objImage.length)return!0;var n=P.isPanActive,o=P.isZoomActive;if(0==E.isInnerInPlace())return P.isZoomActive=!1,P.isPanActive=!1,!0;if(1==P.isZoomActive?_(e):g(e),1==P.isZoomActive)P.isPanActive=!1;else{var s=r(P.objImage,e,!0);1==P.isPanActive?P.isPanActive=!1:1==s&&a(e)}(n||o)&&0==P.isZoomActive&&0==P.isPanActive&&h()}function m(e){return 0==E.isCurrentSlideType("image")?!0:void(1==P.isZoomActive?c(e):1==P.isPanActive&&s(e))}function v(e,t,i,r){if(0==S.slider_zoom_mousewheel)return!0;if(0==E.isCurrentSlideType("image"))return!0;e.preventDefault();var o=t>0,a=T.getMousePosition(e),s=1==o?"in":"out";n(s,a)}function b(){y.on("mousewheel",v),y.bind("mousedown touchstart",p),jQuery("body").bind("mousemove touchmove",m),jQuery(window).add("body").bind("mouseup touchend",f),w.bind(E.events.BEFORE_RETURN,function(){h()}),w.bind(E.events.ITEM_CHANGED,function(){P.isZoomedOnce=!1}),w.bind(E.events.ZOOM_CHANGE,function(){P.isZoomedOnce=!0})}var y,I,w,E=new UGSlider,T=new UGFunctions,S={slider_zoom_step:1.2,slider_zoom_max_ratio:6,slider_zoom_return_pan_duration:400,slider_zoom_return_pan_easing:"easeOutCubic"},P={isPanActive:!1,startMouseX:0,startMouseY:0,lastMouseX:0,lastMouseY:0,startImageX:0,startImageY:0,panXActive:!1,panYActive:!1,objImage:null,objImageSize:null,objParent:null,objParentSize:null,objSlide:null,storeImageLastTime:0,isZoomActive:!1,startDistance:0,startMiddlePoint:null,imageOrientPoint:null,objFitImageSize:null,isZoomedOnce:!1};this.________EXTERNAL_____________=function(){},this.isPanEnabled=function(e,t){if(i(),void 0==P.objImage||0==P.objImage.length)return!1;if(0==P.isZoomedOnce)return!1;if(0==r(P.objImage,e))return!1;if(0==E.isInnerInPlace())return!1;if("left"==t){if(P.objImageSize.right<=P.objParentSize.width)return!1}else if(P.objImageSize.left>=0)return!1;return!0},this.init=function(t,i){e(t,i)},this.zoomIn=function(){n("in")},this.zoomOut=function(){n("out")},this.zoomBack=function(){n("back")}}function UGWistiaAPI(){function e(){return"undefined"!=typeof Wistia}function t(e,t,n,o,a){r=null,s=!1;var l=e+"_video",u="<div id='"+l+"' class='wistia_embed' style='width:"+n+";height:"+o+";' data-video-width='"+n+"' data-video-height='"+o+"'>&nbsp;</div>";jQuery("#"+e).html(u),r=Wistia.embed(t,{version:"v1",videoWidth:n,videoHeight:o,container:l,autoPlay:a}),s=!0,i()}function i(){r.bind("play",function(){a.trigger(o.events.START_PLAYING)}),r.bind("pause",function(){a.trigger(o.events.STOP_PLAYING)}),r.bind("end",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this),s=!1;this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugWistiaAPI.isAPILoaded?!0:e()?(g_ugWistiaAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("fast.wistia.com/assets/external/E-v1.js",!0),void(g_ugWistiaAPI.isAPILoaded=!0))},this.doCommand=function(e){if(null==r)return!1;if(0==s)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.isPlayerReady=function(){return s&&r?!0:!1}}function UGSoundCloudAPI(){function e(){return"undefined"!=typeof SC}function t(e,t,n,a,s){r=null,g_isPlayerReady=!1;var l=e+"_iframe",u=location.protocol+"//w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/"+t;u+="&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=true&show_comments=false&amp;show_playcount=true&amp;show_user=false&amp;hide_related=true&amp;visual=true&amp;start_track=0&amp;callback=true",u+=s===!0?"&amp;auto_play=true":"&amp;auto_play=false";var d="<iframe id='"+l+"' src="+u+" width='"+n+"' height='"+a+"' frameborder='0' scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";jQuery("#"+e).html(d),r=SC.Widget(l),r.bind(SC.Widget.Events.READY,function(){r&&(g_isPlayerReady=!0,i())}),o=e}function i(){r.bind(SC.Widget.Events.PLAY,function(){s.trigger(a.events.START_PLAYING)}),r.bind(SC.Widget.Events.PAUSE,function(){s.trigger(a.events.STOP_PLAYING)}),r.bind(SC.Widget.Events.FINISH,function(){s.trigger(a.events.STOP_PLAYING),s.trigger(a.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o,a=this,s=jQuery(this);this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugSoundCloudAPI.isAPILoaded?!0:e()?(g_ugSoundCloudAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("w.soundcloud.com/player/api.js",!0),void(g_ugSoundCloudAPI.isAPILoaded=!0))},this.putSound=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.doCommand=function(e){if(null==r)return!1;if(0==g_isPlayerReady)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){a.doCommand("pause")},this.play=function(){a.doCommand("play")},this.destroy=function(){g_isPlayerReady=!1,r=null,o&&(jQuery("#"+o).html(""),o=null)}}function UGHtml5MediaAPI(){function e(){return"undefined"!=typeof mejs}function t(e,t,n,o,a){r=null,g_isPlayerReady=!1;var s=location.protocol+"//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/flashmediaelement-cdn.swf",l=location.protocol+"//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/silverlightmediaelement.xap",u=e+"_video",d="";a&&a===!0&&(d="autoplay='autoplay'");var _="";t.posterImage&&(_="poster='"+t.posterImage+"'");var g="<video id='"+u+"' width='"+n+"' height='"+o+"'  controls='controls' preload='none' "+d+" "+_+">";""!=t.mp4&&(g+="<source type='video/mp4' src='"+t.mp4+"' />"),""!=t.webm&&(g+="<source type='video/webm' src='"+t.webm+"' />"),""!=t.ogv&&(g+="<source type='video/ogg' src='"+t.ogv+"' />"),g+="<object width='"+n+"' height='"+o+"' type='application/x-shockwave-flash' data='"+s+"'>",g+="<param name='movie' value='"+s+"' />",g+="<param name='flashvars' value='controls=true&file="+t.mp4+"' />",g+="</object>",g+="</video>",jQuery("#"+e).html(g),new MediaElement(u,{enablePluginDebug:!1,flashName:s,silverlightName:l,success:function(e,t){g_isPlayerReady=!0,r=e,0==a&&r.pause(),i()},error:function(e){trace(e)}})}function i(){g_ugFunctions.addEvent(r,"play",function(){a.trigger(o.events.START_PLAYING)}),g_ugFunctions.addEvent(r,"pause",function(){a.trigger(o.events.STOP_PLAYING)}),g_ugFunctions.addEvent(r,"ended",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this);this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugHtml5MediaAPI.isAPILoaded?!0:e()?(g_ugHtml5MediaAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelement.min.js",!0),g_ugFunctions.loadCss("cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelementplayer.min.css",!0),void(g_ugHtml5MediaAPI.isAPILoaded=!0))},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.doCommand=function(e){if(null==r)return!1;if(0==g_isPlayerReady)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")}}function UGVimeoAPI(){function e(){return"undefined"!=typeof Froogaloop}function t(e,t,n,o,a){s=null,l=!1;var u=location.protocol+"//player.vimeo.com/video/"+t+"?api=1";a===!0&&(u+="&amp;byline=0&amp;autoplay=1&amp;title=0&amp;portrait=0");var d="<iframe src="+u+" width='"+n+"' height='"+o+"' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";jQuery("#"+e).html(d);var _=jQuery("#"+e+" iframe")[0];s=Froogaloop(_),s.addEvent("ready",function(){s&&(l=!0,i())}),r=e}function i(){return s?(s.addEvent("cuechange",function(){1==u&&o.play()}),s.addEvent("play",function(){a.trigger(o.events.START_PLAYING)}),s.addEvent("pause",function(){a.trigger(o.events.STOP_PLAYING)}),void s.addEvent("finish",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})):!1}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this),s=null,l=!1,u=!1;this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugVimeoAPI.isAPILoaded?!0:e()?(g_ugVimeoAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("f.vimeocdn.com/js/froogaloop2.min.js",!0),void(g_ugVimeoAPI.isAPILoaded=!0))},this.doCommand=function(e){if(null==s)return!1;if(0==l)return!1;switch(e){default:s.api(e)}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")},this.destroy=function(){s&&(s.api("unload"),s=null,l=!1),r&&jQuery("#"+r).html("")},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.isPlayerReady=function(){return l&&s?!0:!1},this.changeVideo=function(e,t){return 0==o.isPlayerReady()?!1:(u=t,void s.api("loadVideo",e))},this.getVideoImages=function(e,t,i){var n=location.protocol+"//vimeo.com/api/v2/video/"+e+".json";jQuery.get(n,{},function(e){var n={};n.preview=e[0].thumbnail_large,n.thumb=e[0].thumbnail_medium,i(t,n)})}}function UGYoutubeAPI(){function e(e,t,r,a,u){s&&l&&s.destroy();var d={controls:2,showinfo:_.video_youtube_showinfo,rel:0};u===!0&&(d.autoplay=1),l=!1,s=new YT.Player(e,{height:a,width:r,videoId:t,playerVars:d,events:{onReady:i,onStateChange:n}}),o=e}function t(){return"undefined"!=typeof YT&&"undefined"!=typeof YT.Player?!0:!1}function i(){l=!0}function n(){if("function"!=typeof s.getPlayerState)return trace("Youtube API error: can't get player state"),!1;var e=s.getPlayerState();switch(e){case YT.PlayerState.PLAYING:u.trigger(a.events.START_PLAYING);break;case YT.PlayerState.ENDED:u.trigger(a.events.STOP_PLAYING),u.trigger(a.events.VIDEO_ENDED);break;default:d==YT.PlayerState.PLAYING&&u.trigger(a.events.STOP_PLAYING)}d=e}this.isAPILoaded=!1;var r,o,a=this,s=null,l=!1,u=jQuery(this),d=-1,_={video_youtube_showinfo:!0};this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.setOptions=function(e){_=jQuery.extend(_,e)},this.putVideo=function(i,n,o,a,s){return t()?(e(i,n,o,a,s),!0):(this.loadAPI(),void(r=setInterval(function(){t()&&(e(i,n,o,a,s),clearInterval(r))},500)))},this.loadAPI=function(){return 1==g_ugYoutubeAPI.isAPILoaded?!0:"undefined"!=typeof YT?(g_ugYoutubeAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("https://www.youtube.com/player_api",!1),void(g_ugYoutubeAPI.isAPILoaded=!0))},this.doCommand=function(e,t){if(!s)return!0;if(0==l)return!1;switch(e){case"play":if("function"!=typeof s.playVideo)return!1;s.playVideo();break;case"pause":if("function"!=typeof s.pauseVideo)return!1;s.pauseVideo();break;case"seek":if("function"!=typeof s.seekTo)return!1;s.seekTo(t);break;case"stopToBeginning":var i=s.getPlayerState();switch(s.pauseVideo(),i){case YT.PlayerState.PLAYING:case YT.PlayerState.ENDED:case YT.PlayerState.PAUSED:s.seekTo(0)}}},this.play=function(){a.doCommand("play")},this.pause=function(){a.doCommand("pause")},this.destroy=function(){try{s&&(l=!1,s.clearVideo(),s.destroy())}catch(e){jQuery("#"+o).html("")}},this.stopToBeginning=function(){a.doCommand("stopToBeginning")},this.changeVideo=function(e,t){return 0==a.isPlayerReady()?!1:void(t&&1==t?s.loadVideoById(e,0,"large"):s.cueVideoById(e,0,"large"))},this.isPlayerReady=function(){return l&&s?!0:!1},this.getVideoImages=function(e){var t={};return t.preview="https://i.ytimg.com/vi/"+e+"/sddefault.jpg",t.thumb="https://i.ytimg.com/vi/"+e+"/default.jpg",t}}function UGVideoPlayer(){function e(){h.hide()}function t(){p.trigger(h.events.PLAY_START),_&&_.hide()}function i(){p.trigger(h.events.PLAY_STOP),_&&_.show()}function n(){p.trigger(h.events.VIDEO_ENDED)}function r(){_&&(f.setButtonMobileReady(_),f.setButtonOnClick(_,e)),jQuery(m).on(m.events.START_PLAYING,t),jQuery(m).on(m.events.STOP_PLAYING,i),jQuery(m).on(m.events.VIDEO_ENDED,n),jQuery(v).on(v.events.START_PLAYING,t),jQuery(v).on(v.events.STOP_PLAYING,i),jQuery(v).on(v.events.VIDEO_ENDED,n),jQuery(b).on(b.events.START_PLAYING,t),jQuery(b).on(b.events.STOP_PLAYING,i),jQuery(b).on(b.events.VIDEO_ENDED,n),jQuery(y).on(y.events.START_PLAYING,t),jQuery(y).on(y.events.STOP_PLAYING,i),jQuery(y).on(y.events.VIDEO_ENDED,n),jQuery(I).on(I.events.START_PLAYING,t),jQuery(I).on(I.events.STOP_PLAYING,i),jQuery(I).on(I.events.VIDEO_ENDED,n)}function o(e){var t=["youtube","vimeo","html5","soundcloud","wistia"];for(var i in t){var n=t[i];if(n!=e)switch(n){case"youtube":m.pause(),m.destroy(),l.hide();break;case"vimeo":v.pause(),v.destroy(),u.hide();break;case"html5":b.pause(),d.hide();break;case"soundcloud":y.pause(),y.destroy(),g.hide();break;case"wistia":I.pause(),c.hide()}}}var a,s,l,u,d,_,g,c,h=this,p=jQuery(this),f=new UGFunctions,m=new UGYoutubeAPI,v=new UGVimeoAPI,b=new UGHtml5MediaAPI,y=new UGSoundCloudAPI,I=new UGWistiaAPI,w=null,E={video_enable_closebutton:!0};this.events={SHOW:"video_show",HIDE:"video_hide",PLAY_START:"video_play_start",PLAY_STOP:"video_play_stop",VIDEO_ENDED:"video_ended"};var T={standAloneMode:!1,youtubeInnerID:"",vimeoPlayerID:"",html5PlayerID:"",wistiaPlayerID:"",soundCloudPlayerID:""};this.init=function(e,t,i){if(a=i,!a)throw new Error("missing gallery ID for video player, it's a must!");E=jQuery.extend(E,e),m.setOptions(E),t&&1==t&&(T.standAloneMode=!0)},this.setHtml=function(e){T.youtubeInnerID=a+"_youtube_inner",T.vimeoPlayerID=a+"_videoplayer_vimeo",T.html5PlayerID=a+"_videoplayer_html5",T.wistiaPlayerID=a+"_videoplayer_wistia",T.soundCloudPlayerID=a+"_videoplayer_soundcloud";var t="<div class='ug-videoplayer' style='display:none'>";t+="<div class='ug-videoplayer-wrapper ug-videoplayer-youtube' style='display:none'><div id='"+T.youtubeInnerID+"'></div></div>",t+="<div id='"+T.vimeoPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-vimeo' style='display:none'></div>",t+="<div id='"+T.html5PlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-html5'></div>",t+="<div id='"+T.soundCloudPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-soundcloud'></div>",t+="<div id='"+T.wistiaPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-wistia'></div>",0==T.standAloneMode&&1==E.video_enable_closebutton&&(t+="<div class='ug-videoplayer-button-close'></div>"),t+="</div>",e.append(t),s=e.children(".ug-videoplayer"),l=s.children(".ug-videoplayer-youtube"),u=s.children(".ug-videoplayer-vimeo"),d=s.children(".ug-videoplayer-html5"),g=s.children(".ug-videoplayer-soundcloud"),c=s.children(".ug-videoplayer-wistia"),0==T.standAloneMode&&1==E.video_enable_closebutton&&(_=s.children(".ug-videoplayer-button-close"))},this.destroy=function(){_&&(_.off("click"),_.off("touchend")),jQuery(m).off(m.events.START_PLAYING),jQuery(m).off(m.events.STOP_PLAYING),jQuery(v).off(v.events.START_PLAYING),jQuery(v).off(v.events.STOP_PLAYING),jQuery(b).off(b.events.START_PLAYING),jQuery(b).off(b.events.STOP_PLAYING),jQuery(y).off(y.events.START_PLAYING,t),jQuery(y).off(y.events.STOP_PLAYING,i),jQuery(I).off(I.events.START_PLAYING,t),jQuery(I).off(I.events.STOP_PLAYING,i),w=null},this.initEvents=function(){r()},this.setSize=function(e,t){f.setElementSize(s,e,t),_&&f.placeElement(_,"right","top")},this.setPosition=function(e,t){f.placeElement(s,e,t)},this.getObject=function(){return s},this.show=function(){return 1==h.isVisible()?!0:(s.show(),s.fadeTo(0,1),_&&_.show(),void p.trigger(h.events.SHOW))},this.hide=function(){return 0==h.isVisible()?!0:(o(),w=null,s.hide(),void p.trigger(h.events.HIDE))},this.getActiveAPI=function(){switch(w){case"youtube":return m;case"vimeo":return v;case"wistia":return I;case"soundcloud":return y;case"html5":return b;default:return null}},this.pause=function(){var e=h.getActiveAPI();return null==e?!1:void("function"==typeof e.pause&&e.pause())},this.isVisible=function(){return s.is(":visible")},this.playYoutube=function(e,t){if("undefined"==typeof t)var t=!0;o("youtube"),l.show();var i=l.children("#"+T.youtubeInnerID);0==i.length&&l.append("<div id='"+T.youtubeInnerID+"'></div>"),1==m.isPlayerReady()&&1==T.standAloneMode?m.changeVideo(e,t):m.putVideo(T.youtubeInnerID,e,"100%","100%",t),w="youtube"},this.playVimeo=function(e,t){if("undefined"==typeof t)var t=!0;o("vimeo"),u.show(),v.putVideo(T.vimeoPlayerID,e,"100%","100%",t),w="vimeo"},this.playHtml5Video=function(e,t,i,n,r){if("undefined"==typeof r)var r=!0;o("html5"),d.show();var a={ogv:e,webm:t,mp4:i,posterImage:n};b.putVideo(T.html5PlayerID,a,"100%","100%",r),w="html5"},this.playSoundCloud=function(e,t){if("undefined"==typeof t)var t=!0;o("soundcloud"),g.show(),y.putSound(T.soundCloudPlayerID,e,"100%","100%",t),w="soundcloud"},this.playWistia=function(e,t){if("undefined"==typeof t)var t=!0;o("wistia"),c.show(),I.putVideo(T.wistiaPlayerID,e,"100%","100%",t),w="wistia"}}function ugCheckForMinJQueryVersion(){var e=g_ugFunctions.checkMinJqueryVersion("1.8.0");if(0==e)throw new Error("The gallery can run from jquery 1.8 You have jQuery "+jQuery.fn.jquery+" Please update your jQuery library.")}function ugCheckForErrors(e,t){function i(){if("undefined"==typeof jQuery)throw new Error("jQuery library not included")}function n(){if("function"==typeof jQuery.fn.unitegallery)return!0;var e="You have some jquery.js library include that comes after the gallery files js include.";throw e+="<br> This include eliminates the gallery libraries, and make it not work.","cms"==t?(e+="<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Gallery Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.",e+="<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it."):e+="<br><br> Please find and remove this jquery.js include and the gallery will work. <br> * There should be only one jquery.js include before all other js includes in the page.",new Error(e)}try{"jquery"==t?(i(),ugCheckForMinJQueryVersion()):(ugCheckForMinJQueryVersion(),n())}catch(r){var o=r.message;if(o="Unite Gallery Error: "+o,o="<div style='font-size:16px;color:#BC0C06;max-width:900px;border:1px solid red;padding:10px;'>"+o+"</div>","jquery"==t){var a=document.getElementById(e);a.innerHTML=o,a.style.display="block"}else jQuery(e).show().html(o);return!1}return!0}function UniteGalleryMain(){function __________INIT_GALLERY_______(){}function getThemeFunction(e){var t=e;return-1==t.indexOf("UGTheme_")&&(t="UGTheme_"+t),t}function initTheme(objCustomOptions){if(objCustomOptions.hasOwnProperty("gallery_theme"))g_options.gallery_theme=objCustomOptions.gallery_theme;else{var defaultTheme=g_options.gallery_theme;0==g_ugFunctions.isThemeRegistered(defaultTheme)&&(g_options.gallery_theme=g_ugFunctions.getFirstRegisteredTheme())}var themeFunction=getThemeFunction(g_options.gallery_theme);try{g_options.gallery_theme=eval(themeFunction)}catch(e){}g_options.gallery_theme=eval(themeFunction),g_objTheme=new g_options.gallery_theme,g_objTheme.init(t,objCustomOptions)}function resetOptions(){g_options=jQuery.extend({},g_temp.originalOptions),g_selectedItemIndex=-1,g_selectedItem=null,g_objSlider=void 0,g_objThumbs=void 0,g_objSlider=void 0}function checkForStartupErrors(){try{ugCheckForMinJQueryVersion()}catch(e){throwErrorShowMessage(e.message)}"object"==typeof g_objWrapper.outerWidth()&&throwErrorShowMessage("You have some buggy script. most chances jquery-ui.js that destroy jquery outerWidth, outerHeight functions. The gallery can't run. Please update jquery-ui.js to latest version."),setTimeout(function(){ugCheckForErrors(g_galleryID,"cms")},5e3)}function runGallery(e,i,n,r){var o="object"==typeof i;if(o&&(g_temp.objCustomOptions=i),1==g_temp.isRunFirstTime){if(g_galleryID=e,g_objWrapper=jQuery(g_galleryID),0==g_objWrapper.length)return trace("div with id: "+g_galleryID+" not found"),!1;g_objParent=g_objWrapper.parent(),checkForStartupErrors(),g_temp.originalOptions=jQuery.extend({},g_options),o&&(g_options=jQuery.extend(g_options,i)),1==g_options.gallery_enable_cache&&g_options.gallery_initial_catid&&cacheItems(g_options.gallery_initial_catid),t.setSizeClass();var a=g_objWrapper.children();fillItemsArray(a),loadAPIs(),g_objWrapper.find("img").fadeTo(0,0).hide(),g_objWrapper.show(),clearInitData()}else if(t.destroy(),resetOptions(),g_options=jQuery.extend(g_options,g_temp.objCustomOptions),n){if(r&&1==g_options.gallery_enable_cache&&cacheItems(r,n),"noitems"==n)return showErrorMessage("No items in this category",""),!1;g_objWrapper.html(n);var a=g_objWrapper.children();fillItemsArray(a),loadAPIs(),g_objWrapper.children().fadeTo(0,0).hide(),g_objWrapper.show(),clearInitData()}1==g_temp.isRunFirstTime&&1==g_options.gallery_enable_tabs&&(g_objTabs=new UGTabs,g_objTabs.init(t,g_options)),1==g_temp.isRunFirstTime&&1==g_options.gallery_enable_loadmore&&(g_objLoadMore=new UGLoadMore,g_objLoadMore.init(t,g_options)),o&&modifyInitParams(g_temp.objCustomOptions),validateParams(),1==g_options.gallery_shuffle&&t.shuffleItems(),initTheme(g_temp.objCustomOptions),setGalleryHtml(),setHtmlObjectsProperties();var s=g_objWrapper.width();0==s?g_functions.waitForWidth(g_objWrapper,runGalleryActually):runGalleryActually()}function runGalleryActually(){t.setSizeClass(),0==g_temp.isFreestyleMode&&1==g_options.gallery_preserve_ratio&&setHeightByOriginalRatio(),g_objTheme.run(),g_objTabs&&g_temp.isRunFirstTime&&g_objTabs.run(),preloadBigImages(),initEvents(),g_numItems>0&&t.selectItem(0),1==g_options.gallery_autoplay&&t.startPlayMode(),g_temp.isRunFirstTime=!1}function showErrorMessage(e,t){if("undefined"==typeof t)var t="<b>Unite Gallery Error: </b>";else t="<b>"+t+": </b>";e=t+e;var i="<div class='ug-error-message-wrapper'><div class='ug-error-message'>"+e+"</div></div>";g_objWrapper.children().remove(),g_objWrapper.html(i),g_objWrapper.show()}function throwErrorShowMessage(e){throw showErrorMessage(e),new Error(e)}function modifyInitParams(){g_options.gallery_images_preload_type||(g_options.gallery_images_preload_type="minimal"),(void 0==g_options.gallery_min_height||g_options.gallery_height<g_options.gallery_min_height)&&(g_options.gallery_min_height=0),(void 0==g_options.gallery_min_width||g_options.gallery_width<g_options.gallery_min_width)&&(g_options.gallery_min_width=0)}function validateParams(){if(!g_options.gallery_theme)throw new Error("The gallery can't run without theme");if(jQuery.isNumeric(g_options.gallery_height)&&g_options.gallery_height<g_options.gallery_min_height)throw new Error("The <b>gallery_height</b> option must be bigger then <b>gallery_min_height option</b>");if(g_options.gallery_width<g_options.gallery_min_width)throw new Error("The <b>gallery_width</b> option must be bigger then <b>gallery_min_width option</b>")}function setGalleryHtml(){g_objWrapper.addClass("ug-gallery-wrapper"),g_objWrapper.append("<div class='ug-overlay-disabled' style='display:none'></div>"),t.setSizeClass()}function clearInitData(){g_objWrapper.children().remove()}function storeLastSize(){var e=t.getSize();g_temp.lastWidth=e.width,g_temp.lastHeight=e.height}function setHeightByOriginalRatio(){var e=t.getSize(),i=e.width/e.height;if(i!=e.orig_ratio){var n=e.width/e.orig_ratio;n=Math.round(n),n<g_options.gallery_min_height&&(n=g_options.gallery_min_height),g_objWrapper.height(n)}}function setHtmlObjectsProperties(){var e=g_functions.getCssSizeParam(g_options.gallery_width),t={"max-width":e,"min-width":g_functions.getCssSizeParam(g_options.gallery_min_width)};if(0==g_temp.isFreestyleMode){var i=g_functions.getCssSizeParam(g_options.gallery_height);t.height=i}else t.overflow="visible";g_options.gallery_background_color&&(t["background-color"]=g_options.gallery_background_color),g_objWrapper.css(t)}function fillItemByChild(e){var i=t.isMobileMode(),n=e.prop("tagName").toLowerCase(),r="";if("a"==n){r=e.attr("href"),e=e.children();var n=e.prop("tagName").toLowerCase()}var o=e.data("type");void 0==o&&(o="image");var a={};if(a.type=o,"img"==n){var s=e.data("lazyload-src");s&&""!=s&&(e.attr("src",s),jQuery.removeData(e,"lazyload-src"));var l=e.data("image"),u=e.data("thumb");"undefined"==typeof l&&(l=null),"undefined"==typeof u&&(u=null);var d=e.attr("src");l||(l=d),u||(u=d),u||(u=l),l||(l=u),a.urlThumb=u,a.urlImage=l,a.title=e.attr("alt"),a.objThumbImage=e,a.objThumbImage.attr("src",a.urlThumb)}else{if("image"==o)throw trace("Problematic gallery item found:"),trace(e),trace("Please look for some third party js script that could add this item to the gallery"),new Error("The item should not be image type");a.urlThumb=e.data("thumb"),a.title=e.data("title"),a.objThumbImage=null,a.urlImage=e.data("image")}if(1==i){var _=e.data("thumb-mobile");"undefined"!=typeof _&&""!=_&&(a.urlThumb=_,"img"==n&&e.attr("src",a.urlThumb));var g=e.data("image-mobile");"undefined"!=typeof g&&""!=g&&(a.urlImage=g)}a.link=r,a.description=e.attr("title"),a.description||(a.description=e.data("description")),a.description||(a.description=""),a.isNewAdded=!1,a.isLoaded=!1,a.isThumbImageLoaded=!1,a.objPreloadImage=null,a.isBigImageLoadStarted=!1,a.isBigImageLoaded=!1,a.isBigImageLoadError=!1,a.imageWidth=0,a.imageHeight=0,a.thumbWidth=0,a.thumbHeight=0,a.thumbRatioByWidth=0,a.thumbRatioByHeight=0;var c=e.data("width"),h=e.data("height");c&&"number"==typeof c&&h&&"number"==typeof h&&(a.thumbWidth=c,a.thumbHeight=h,a.thumbRatioByWidth=c/h,a.thumbRatioByHeight=h/c),a.addHtml=null;var p=void 0==a.urlImage||""==a.urlImage,f=void 0==a.urlThumb||""==a.urlThumb;switch(a.type){case"youtube":if(a.videoid=e.data("videoid"),p||f){var m=g_ugYoutubeAPI.getVideoImages(a.videoid);p&&(a.urlImage=m.preview),f&&(a.urlThumb=m.thumb,"img"==n&&e.attr("src",a.urlThumb))}g_temp.isYoutubePresent=!0;break;case"vimeo":a.videoid=e.data("videoid"),g_temp.isVimeoPresent=!0;break;case"html5video":a.videoogv=e.data("videoogv"),a.videowebm=e.data("videowebm"),a.videomp4=e.data("videomp4"),g_temp.isHtml5VideoPresent=!0;break;case"soundcloud":a.trackid=e.data("trackid"),g_temp.isSoundCloudPresent=!0;break;case"wistia":a.videoid=e.data("videoid"),g_temp.isWistiaPresent=!0;break;case"custom":var v=e.children("img");v.length&&(v=jQuery(v[0]),a.urlThumb=v.attr("src"),a.title=v.attr("alt"),a.objThumbImage=v);var b=e.children().not("img:first-child");b.length&&(a.addHtml=b.clone())}return a.objThumbImage&&(a.objThumbImage.removeAttr("data-description",""),a.objThumbImage.removeAttr("data-image",""),a.objThumbImage.removeAttr("data-thumb",""),a.objThumbImage.removeAttr("title","")),a}function fillItemsArray(e,t){if(t!==!0)g_arrItems=[];else for(var i=0;g_numItems>i;i++)g_arrItems[i].isNewAdded=!1;for(var i=0;i<e.length;i++){var n=jQuery(e[i]),r=fillItemByChild(n);numIndex=g_arrItems.length,r.index=numIndex,t===!0&&(r.isNewAdded=!0),g_arrItems.push(r)}g_numItems=g_arrItems.length}function loadAPIs(){g_temp.isYoutubePresent&&g_ugYoutubeAPI.loadAPI(),g_temp.isVimeoPresent&&g_ugVimeoAPI.loadAPI(),g_temp.isHtml5VideoPresent&&g_ugHtml5MediaAPI.loadAPI(),g_temp.isSoundCloudPresent&&g_ugSoundCloudAPI.loadAPI(),g_temp.isWistiaPresent&&g_ugWistiaAPI.loadAPI()}function preloadBigImages(){if("visible"!=g_options.gallery_images_preload_type||g_objThumbs||(g_options.gallery_images_preload_type="minimal"),1==g_temp.isAllItemsPreloaded)return!0;switch(g_options.gallery_images_preload_type){default:case"minimal":break;case"all":jQuery(g_arrItems).each(function(){preloadItemImage(this)});break;case"visible":jQuery(g_arrItems).each(function(){var e=this,t=g_objThumbs.isItemThumbVisible(e);1==t&&preloadItemImage(e)})}}function checkPreloadItemImage(e){if(1==e.isBigImageLoadStarted||1==e.isBigImageLoaded||1==e.isBigImageLoadError)return!1;switch(g_options.gallery_images_preload_type){default:case"minimal":break;case"all":preloadItemImage(e);break;case"visible":var t=g_objThumbs.isItemThumbVisible(e);1==t&&preloadItemImage(e)}}function preloadItemImage(e){if(1==e.isBigImageLoadStarted||1==e.isBigImageLoaded||1==e.isBigImageLoadError)return!0;var i=e.urlImage;
return""==i||void 0==i?(e.isBigImageLoadError=!0,!1):(e.isBigImageLoadStarted=!0,e.objPreloadImage=jQuery("<img/>").attr("src",i),e.objPreloadImage.data("itemIndex",e.index),e.objPreloadImage.on("load",t.onItemBigImageLoaded),e.objPreloadImage.on("error",function(){var e=jQuery(this),i=e.data("itemIndex"),n=g_arrItems[i];n.isBigImageLoadError=!0,n.isBigImageLoaded=!1;var r=jQuery(this).attr("src");console.log("Can't load image: "+r),g_objGallery.trigger(t.events.ITEM_IMAGE_UPDATED,[i,n.urlImage]),n.objThumbImage.attr("src",n.urlThumb)}),void checkAllItemsStartedPreloading())}function preloadNearBigImages(e){if(1==g_temp.isAllItemsPreloaded)return!1;if(!e)var e=g_selectedItem;if(!e)return!0;var t=e.index,i=t-1,n=t+1;i>0&&preloadItemImage(g_arrItems[i]),g_numItems>n&&preloadItemImage(g_arrItems[n])}function checkAllItemsStartedPreloading(){if(1==g_temp.isAllItemsPreloaded)return!1;for(var e in g_arrItems)if(0==g_arrItems[e].isBigImageLoadStarted)return!1;g_temp.isAllItemsPreloaded=!0}function __________END_INIT_GALLERY_______(){}function __________EVENTS_____________(){}function onSliderMouseEnter(e){1==g_options.gallery_pause_on_mouseover&&0==t.isFullScreen()&&1==g_temp.isPlayMode&&g_objSlider&&0==g_objSlider.isSlideActionActive()&&t.pausePlaying()}function onSliderMouseLeave(e){if(1==g_options.gallery_pause_on_mouseover&&1==g_temp.isPlayMode&&g_objSlider&&0==g_objSlider.isSlideActionActive()){var i=g_objSlider.isCurrentSlideLoadingImage();0==i&&t.continuePlaying()}}function onKeyPress(e){var i=jQuery(e.target);if(i.is("textarea")||i.is("select")||i.is("input"))return!0;var n=e.charCode?e.charCode:e.keyCode?e.keyCode:e.which?e.which:0,r=!0;switch(n){case 39:t.nextItem();break;case 37:t.prevItem();break;default:r=!1}1==r&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()),g_objGallery.trigger(t.events.GALLERY_KEYPRESS,[n,e])}function onGalleryResized(){var e=t.getSize();if(0==e.width)return!0;t.setSizeClass();var e=t.getSize();if(e.width!=g_temp.lastWidth||0==g_temp.isFreestyleMode&&e.height!=g_temp.lastHeight){var i=!1;if(g_temp.funcCustomHeight){var n=g_temp.funcCustomHeight(e);n&&(g_objWrapper.height(n),i=!0)}0==i&&1==g_options.gallery_preserve_ratio&&0==g_temp.isFreestyleMode&&setHeightByOriginalRatio(),storeLastSize(),g_objGallery.trigger(t.events.SIZE_CHANGE)}}function onThumbsChange(e){"visible"==g_options.gallery_images_preload_type&&0==g_temp.isAllItemsPreloaded&&preloadBigImages()}function onFullScreenChange(){var e=g_functions.isFullScreen(),i=e?t.events.ENTER_FULLSCREEN:t.events.EXIT_FULLSCREEN,n=g_functions.getGlobalData("fullscreenID");return g_galleryID!==n?!0:(e?g_objWrapper.addClass("ug-fullscreen"):g_objWrapper.removeClass("ug-fullscreen"),g_objGallery.trigger(i),void onGalleryResized())}function onItemImageUpdated(e,i){var n=t.getItem(i);checkPreloadItemImage(n)}function onCurrentSlideImageLoadEnd(){1==t.isPlayMode()&&t.continuePlaying()}function initEvents(){if(g_objWrapper.on("dragstart",function(e){e.preventDefault()}),g_objGallery.on(t.events.ITEM_IMAGE_UPDATED,onItemImageUpdated),g_objThumbs)switch(g_temp.thumbsType){case"strip":jQuery(g_objThumbs).on(g_objThumbs.events.STRIP_MOVE,onThumbsChange);break;case"grid":jQuery(g_objThumbs).on(g_objThumbs.events.PANE_CHANGE,onThumbsChange)}if("advance"==g_options.gallery_mousewheel_role&&0==g_temp.isFreestyleMode&&g_objWrapper.on("mousewheel",t.onGalleryMouseWheel),storeLastSize(),jQuery(window).resize(function(){g_objWrapper.css("width","auto"),g_functions.whenContiniousEventOver("gallery_resize",onGalleryResized,g_temp.resizeDelay)}),setTimeout(function(){setInterval(onGalleryResized,2e3)},1e4),g_functions.addFullScreenChangeEvent(onFullScreenChange),g_objSlider){if(jQuery(g_objSlider).on(g_objSlider.events.ITEM_CHANGED,function(){var e=g_objSlider.getCurrentItemIndex();-1!=e&&t.selectItem(e)}),1==g_options.gallery_pause_on_mouseover){var e=g_objSlider.getElement();e.hover(onSliderMouseEnter,onSliderMouseLeave),g_objGallery.on(t.events.ENTER_FULLSCREEN,function(){onSliderMouseLeave()})}retriggerEvent(g_objSlider,g_objSlider.events.ACTION_START,t.events.SLIDER_ACTION_START),retriggerEvent(g_objSlider,g_objSlider.events.ACTION_END,t.events.SLIDER_ACTION_END),jQuery(g_objSlider).on(g_objSlider.events.CURRENTSLIDE_LOAD_END,onCurrentSlideImageLoadEnd)}1==g_options.gallery_control_keyboard&&jQuery(document).keydown(onKeyPress)}function __________GENERAL_______(){}function cacheItems(e,t){if(t){var i=t;"noitems"!=i&&(i=jQuery(t).clone())}else var i=g_objWrapper.children().clone();g_objCache[e]=i}function removeAllSizeClasses(e){e||(e=g_objWrapper),e.removeClass("ug-under-480"),e.removeClass("ug-under-780"),e.removeClass("ug-under-960")}function retriggerEvent(e,t,i){jQuery(e).on(t,function(e){g_objGallery.trigger(i,[this])})}function advanceNextStep(){var e=jQuery.now(),i=e-g_temp.playTimeLastStep;g_temp.playTimeLastStep=e;var n=t.isGalleryVisible();if(0==n)return!1;if(g_temp.playTimePassed+=i,g_temp.objProgress){var r=g_temp.playTimePassed/g_options.gallery_play_interval;g_temp.objProgress.setProgress(r)}g_temp.playTimePassed>=g_options.gallery_play_interval&&(t.nextItem(),g_temp.playTimePassed=0)}function unselectSeletedItem(){return null==g_selectedItem?!0:(g_objThumbs&&g_objThumbs.setThumbUnselected(g_selectedItem.objThumbWrapper),g_selectedItem=null,void(g_selectedItemIndex=-1))}function toFakeFullScreen(){jQuery("body").addClass("ug-body-fullscreen"),g_objWrapper.addClass("ug-fake-fullscreen"),g_temp.isFakeFullscreen=!0,g_objGallery.trigger(t.events.ENTER_FULLSCREEN),g_objGallery.trigger(t.events.SIZE_CHANGE)}function exitFakeFullscreen(){jQuery("body").removeClass("ug-body-fullscreen"),g_objWrapper.removeClass("ug-fake-fullscreen"),g_temp.isFakeFullscreen=!1,g_objGallery.trigger(t.events.EXIT_FULLSCREEN),g_objGallery.trigger(t.events.SIZE_CHANGE)}var t=this,g_galleryID,g_objGallery=jQuery(t),g_objWrapper,g_objParent,g_objThumbs,g_objSlider,g_functions=new UGFunctions,g_objTabs,g_objLoadMore,g_arrItems=[],g_numItems,g_selectedItem=null,g_selectedItemIndex=-1,g_objTheme,g_objCache={};this.events={ITEM_CHANGE:"item_change",SIZE_CHANGE:"size_change",ENTER_FULLSCREEN:"enter_fullscreen",EXIT_FULLSCREEN:"exit_fullscreen",START_PLAY:"start_play",STOP_PLAY:"stop_play",PAUSE_PLAYING:"pause_playing",CONTINUE_PLAYING:"continue_playing",SLIDER_ACTION_START:"slider_action_start",SLIDER_ACTION_END:"slider_action_end",ITEM_IMAGE_UPDATED:"item_image_updated",GALLERY_KEYPRESS:"gallery_keypress",GALLERY_BEFORE_REQUEST_ITEMS:"gallery_before_request_items",OPEN_LIGHTBOX:"open_lightbox",CLOSE_LIGHTBOX:"close_lightbox"};var g_options={gallery_width:900,gallery_height:500,gallery_min_width:150,gallery_min_height:100,gallery_theme:"default",gallery_skin:"default",gallery_images_preload_type:"minimal",gallery_autoplay:!1,gallery_play_interval:3e3,gallery_pause_on_mouseover:!0,gallery_mousewheel_role:"zoom",gallery_control_keyboard:!0,gallery_carousel:!0,gallery_preserve_ratio:!0,gallery_background_color:"",gallery_debug_errors:!1,gallery_shuffle:!1,gallery_urlajax:null,gallery_enable_tabs:!1,gallery_enable_loadmore:!1,gallery_enable_cache:!0,gallery_initial_catid:""},g_temp={objCustomOptions:{},isAllItemsPreloaded:!1,isFreestyleMode:!1,lastWidth:0,lastHeigh:0,handleResize:null,isInited:!1,isPlayMode:!1,isPlayModePaused:!1,playTimePassed:0,playTimeLastStep:0,playHandle:"",playStepInterval:33,objProgress:null,isFakeFullscreen:!1,thumbsType:null,isYoutubePresent:!1,isVimeoPresent:!1,isHtml5VideoPresent:!1,isSoundCloudPresent:!1,isWistiaPresent:!1,resizeDelay:100,isRunFirstTime:!0,originalOptions:{},funcCustomHeight:null};this.onItemBigImageLoaded=function(e,t){if(!t)var t=jQuery(this);var i=t.data("itemIndex"),n=g_arrItems[i];n.isBigImageLoaded=!0;var r=g_functions.getImageOriginalSize(t);n.imageWidth=r.width,n.imageHeight=r.height},this.checkFillImageSize=function(e,t){if(!t){var i=e.data("itemIndex");if(void 0===i)throw new Error("Wrong image given to gallery.checkFillImageSize");var t=g_arrItems[i]}var n=g_functions.getImageOriginalSize(e);t.imageWidth=n.width,t.imageHeight=n.height},this.setFreestyleMode=function(){g_temp.isFreestyleMode=!0},this.attachThumbsPanel=function(e,t){g_temp.thumbsType=e,g_objThumbs=t},this.initSlider=function(e,i){if(!e)var e={};e=jQuery.extend(g_temp.objCustomOptions,e),g_objSlider=new UGSlider,g_objSlider.init(t,e,i)},this.onGalleryMouseWheel=function(e,i,n,r){e.preventDefault(),i>0?t.prevItem():t.nextItem()},this.destroy=function(){if(g_objWrapper.off("dragstart"),g_objGallery.off(t.events.ITEM_IMAGE_UPDATED),g_objThumbs)switch(g_temp.thumbsType){case"strip":jQuery(g_objThumbs).off(g_objThumbs.events.STRIP_MOVE);break;case"grid":jQuery(g_objThumbs).off(g_objThumbs.events.PANE_CHANGE)}if(g_objWrapper.off("mousewheel"),jQuery(window).off("resize"),g_functions.destroyFullScreenChangeEvent(),g_objSlider){jQuery(g_objSlider).off(g_objSlider.events.ITEM_CHANGED);var e=g_objSlider.getElement();e.off("mouseenter"),e.off("mouseleave"),g_objGallery.off(t.events.ENTER_FULLSCREEN),jQuery(g_objSlider).off(g_objSlider.events.ACTION_START),jQuery(g_objSlider).off(g_objSlider.events.ACTION_END),jQuery(g_objSlider).off(g_objSlider.events.CURRENTSLIDE_LOAD_END)}1==g_options.gallery_control_keyboard&&jQuery(document).off("keydown"),g_objTheme&&"function"==typeof g_objTheme.destroy&&g_objTheme.destroy(),g_objWrapper.html("")},this.getArrItems=function(){return g_arrItems},this.getObjects=function(){var e={g_galleryID:g_galleryID,g_objWrapper:g_objWrapper,g_objThumbs:g_objThumbs,g_objSlider:g_objSlider,g_options:g_options,g_arrItems:g_arrItems,g_numItems:g_numItems};return e},this.getObjSlider=function(){return g_objSlider},this.getItem=function(e){if(0>e)throw new Error("item with index: "+e+" not found");if(e>=g_numItems)throw new Error("item with index: "+e+" not found");return g_arrItems[e]},this.getWidth=function(){var e=t.getSize();return e.width},this.getHeight=function(){var e=t.getSize();return e.height},this.getSize=function(){var e=g_functions.getElementSize(g_objWrapper);return e.orig_width=g_options.gallery_width,e.orig_height=g_options.gallery_height,e.orig_ratio=e.orig_width/e.orig_height,e},this.getGalleryID=function(){var e=g_galleryID.replace("#","");return e},this.getNextItem=function(e,t){"object"==typeof e&&(e=e.index);var i=e+1;if(t!==!0&&1==g_numItems)return null;if(i>=g_numItems){if(1!=g_options.gallery_carousel&&t!==!0)return null;i=0}var n=g_arrItems[i];return n},this.getPrevItem=function(e){"object"==typeof e&&(e=e.index);var t=e-1;if(0>t){if(1!=g_options.gallery_carousel&&forceCarousel!==!0)return null;t=g_numItems-1}var i=g_arrItems[t];return i},this.getSelectedItem=function(){return g_selectedItem},this.getSelectedItemIndex=function(){return g_selectedItemIndex},this.getNumItems=function(){return g_numItems},this.isLastItem=function(){return g_selectedItemIndex==g_numItems-1?!0:!1},this.isFirstItem=function(){return 0==g_selectedItemIndex?!0:!1},this.getOptions=function(){return g_options},this.getElement=function(){return g_objWrapper},this.___________SET_CONTROLS___________=function(){},this.setNextButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.nextItem)},this.setPrevButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.prevItem)},this.setFullScreenToggleButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnTap(e,t.toggleFullscreen),g_objGallery.on(t.events.ENTER_FULLSCREEN,function(){e.addClass("ug-fullscreenmode")}),g_objGallery.on(t.events.EXIT_FULLSCREEN,function(){e.removeClass("ug-fullscreenmode")})},this.destroyFullscreenButton=function(e){g_functions.destroyButton(e),g_objGallery.off(t.events.ENTER_FULLSCREEN),g_objGallery.off(t.events.EXIT_FULLSCREEN)},this.setPlayButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.togglePlayMode),g_objGallery.on(t.events.START_PLAY,function(){e.addClass("ug-stop-mode")}),g_objGallery.on(t.events.STOP_PLAY,function(){e.removeClass("ug-stop-mode")})},this.destroyPlayButton=function(e){g_functions.destroyButton(e),g_objGallery.off(t.events.START_PLAY),g_objGallery.off(t.events.STOP_PLAY)},this.setProgressIndicator=function(e){g_temp.objProgress=e},this.setTextContainers=function(e,i){g_objGallery.on(t.events.ITEM_CHANGE,function(){var n=t.getSelectedItem();e.html(n.title),i.html(n.description)})},this.showDisabledOverlay=function(){g_objWrapper.children(".ug-overlay-disabled").show()},this.hideDisabledOverlay=function(){g_objWrapper.children(".ug-overlay-disabled").hide()},this.___________END_SET_CONTROLS___________=function(){},this.___________PLAY_MODE___________=function(){},this.startPlayMode=function(){if(g_temp.isPlayMode=!0,g_temp.isPlayModePaused=!1,g_temp.playTimePassed=0,g_temp.playTimeLastStep=jQuery.now(),g_temp.playHandle=setInterval(advanceNextStep,g_temp.playStepInterval),g_temp.objProgress){var e=g_temp.objProgress.getElement();g_temp.objProgress.setProgress(0),e.show()}g_objGallery.trigger(t.events.START_PLAY),g_objSlider&&1==g_objSlider.isCurrentSlideLoadingImage()&&t.pausePlaying()},this.resetPlaying=function(){return 0==g_temp.isPlayMode?!0:(g_temp.playTimePassed=0,void(g_temp.playTimeLastStep=jQuery.now()))},this.pausePlaying=function(){return 1==g_temp.isPlayModePaused?!0:(g_temp.isPlayModePaused=!0,clearInterval(g_temp.playHandle),void g_objGallery.trigger(t.events.PAUSE_PLAYING))},this.continuePlaying=function(){return 0==g_temp.isPlayModePaused?!0:(g_temp.isPlayModePaused=!1,g_temp.playTimeLastStep=jQuery.now(),void(g_temp.playHandle=setInterval(advanceNextStep,g_temp.playStepInterval)))},this.stopPlayMode=function(){if(g_temp.isPlayMode=!1,clearInterval(g_temp.playHandle),g_temp.playTimePassed=0,g_temp.objProgress){var e=g_temp.objProgress.getElement();e.hide()}g_objGallery.trigger(t.events.STOP_PLAY)},this.isPlayMode=function(){return g_temp.isPlayMode},this.togglePlayMode=function(){0==t.isPlayMode()?t.startPlayMode():t.stopPlayMode()},this.___________GENERAL_EXTERNAL___________=function(){},this.shuffleItems=function(){g_arrItems=g_functions.arrayShuffle(g_arrItems);for(var e in g_arrItems)g_arrItems[e].index=parseInt(e)},this.setOptions=function(e){g_options=jQuery.extend(g_options,e)},this.selectItem=function(e,i){"number"==typeof e&&(e=t.getItem(e));var n=e.index;if(n==g_selectedItemIndex)return!0;if(unselectSeletedItem(),g_selectedItem=e,g_selectedItemIndex=n,g_objGallery.trigger(t.events.ITEM_CHANGE,[e,i]),1==g_temp.isPlayMode){t.resetPlaying();var r=g_objSlider.isCurrentSlideLoadingImage();1==r&&t.pausePlaying()}},this.nextItem=function(){var e=g_selectedItemIndex+1;return 0==g_numItems?!0:0==g_options.gallery_carousel&&e>=g_numItems?!0:(e>=g_numItems&&(e=0),void t.selectItem(e,"next"))},this.prevItem=function(){var e=g_selectedItemIndex-1;return-1==g_selectedItemIndex&&(e=0),0==g_numItems?!0:0==g_options.gallery_carousel&&0>e?!0:(0>e&&(e=g_numItems-1),void t.selectItem(e,"prev"))},this.isFullScreen=function(){return 1==g_temp.isFakeFullscreen?!0:1==g_functions.isFullScreen()?!0:!1},this.isFakeFullscreen=function(){return g_temp.isFakeFullscreen},this.toFullScreen=function(){g_functions.setGlobalData("fullscreenID",g_galleryID);var e=g_objWrapper.get(0),t=g_functions.toFullscreen(e);0==t&&toFakeFullScreen()},this.exitFullScreen=function(){1==g_temp.isFakeFullscreen?exitFakeFullscreen():g_functions.exitFullscreen()},this.toggleFullscreen=function(){0==t.isFullScreen()?t.toFullScreen():t.exitFullScreen()},this.resize=function(e,t,i){g_objWrapper.css("width","auto"),g_objWrapper.css("max-width",e+"px"),t&&g_objWrapper.height(t),i||i===!0||onGalleryResized()},this.setSizeClass=function(e,i){if(!e)var e=g_objWrapper;if(!i)var n=t.getSize(),i=n.width;if(0==i)var i=jQuery(window).width();var r="";return 480>=i?r="ug-under-480":780>=i?r="ug-under-780":960>i&&(r="ug-under-960"),1==e.hasClass(r)?!0:(removeAllSizeClasses(e),void(""!=r&&e.addClass(r)))},this.isMobileMode=function(){return g_objWrapper.hasClass("ug-under-480")?!0:!1},this.isSmallWindow=function(){var e=jQuery(window).width();return e?480>=e?!0:!1:!0},this.isGalleryVisible=function(){var e=g_objWrapper.is(":visible");return e},this.changeItems=function(e,t){if(!e)var e="noitems";runGallery(g_galleryID,"nochange",e,t)},this.addItems=function(e){if(!e||0==e.length)return!1;var t=g_objWrapper.children(".ug-newitems-wrapper");0==t.length&&g_objWrapper.append("<div class='ug-newitems-wrapper' style='display:none'></div>"),t=g_objWrapper.children(".ug-newitems-wrapper"),t.append(e);var i=jQuery(t.children());if(fillItemsArray(i,!0),loadAPIs(),!g_objTheme||"function"!=typeof g_objTheme.addItems)throw new Error("addItems function not found in the theme");t.remove(),g_objTheme.addItems()},this.getNewAddedItemsIndexes=function(){var e=[];return jQuery.each(g_arrItems,function(t,i){1==i.isNewAdded&&e.push(t)}),e},this.showErrorMessageReplaceGallery=function(e){showErrorMessage(e)},this.setFuncCustomHeight=function(e){g_temp.funcCustomHeight=e},this.__________EXTERNAL_EVENTS_______=function(){},this.triggerEvent=function(e,t){t?("array"!=jQuery.type(t)&&(t=[t]),g_objGallery.trigger(e,t)):g_objGallery.trigger(e)},this.onEvent=function(e,t){g_objGallery.on(e,t)},this.destroyEvent=function(e){g_objGallery.off(e)},this.__________AJAX_REQUEST_______=function(){},this.ajaxRequest=function(e,t,i,n){if(!i||"function"!=typeof i)throw new Error("ajaxRequest error: success function should be passed");var r=g_options.gallery_urlajax;if(!r||""==r)throw new Error("ajaxRequest error: Ajax url don't passed");if("undefined"==typeof t)var t={};var o={action:"unitegallery_ajax_action",client_action:e,galleryID:g_galleryID,data:t};jQuery.ajax({type:"post",url:g_options.gallery_urlajax,dataType:"json",data:o,success:function(e){if(!e)throw new Error("Empty ajax response!");if(-1==e||0===e)throw new Error("ajax error!!!");if("undefined"==typeof e.success)throw new Error("ajax error!!!");return 0==e.success?(showErrorMessage(e.message,"ajax error"),!1):void i(e)},error:function(e,t,i){console.log("Ajax Error!!! "+t),responseText=e.responseText,n&&"function"==typeof n?n(responseText):trace(responseText)}})},this.requestNewItems=function(e,i,n){var r=g_options.gallery_enable_cache;if(n||(n=e),1==i&&(r=!1),1==r&&g_objCache.hasOwnProperty(n)){var o=g_objCache[n];t.changeItems(o,n)}else g_objGallery.trigger(t.events.GALLERY_BEFORE_REQUEST_ITEMS),t.ajaxRequest("front_get_cat_items",{catid:e},function(e){var i=e.html;t.changeItems(i,n)})},this.run=function(e,t){g_options.gallery_debug_errors;if(t&&t.hasOwnProperty("gallery_debug_errors")&&(g_options.gallery_debug_errors=t.gallery_debug_errors),1==g_options.gallery_debug_errors)try{runGallery(e,t)}catch(i){if("object"==typeof i){var n=i.message,r=i.lineNumber,o=i.fileName;i.stack;n+=" <br><br> in file: "+o,n+=" <b> line "+r+"</b>",trace(i)}else var n=i;n=n.replace("Error:",""),showErrorMessage(n)}else runGallery(e,t)}}function UGLightbox(){function e(e,i){ie=e,U=jQuery(e),ae=jQuery.extend(ae,le),ae=jQuery.extend(ae,i),se.originalOptions=jQuery.extend({},ae),"compact"==ae.lightbox_type&&(se.isCompact=!0,ae=jQuery.extend(ae,ue),ae=jQuery.extend(ae,i)),t(),1==se.putSlider?(ie.initSlider(ae,"lightbox"),g_objects=e.getObjects(),ne=g_objects.g_objSlider):ne=null,1==ae.lightbox_show_textpanel?oe.init(ie,ae,"lightbox"):oe=null}function t(){1==se.isCompact&&1==ae.lightbox_show_textpanel&&(ae.lightbox_slider_image_padding_bottom=se.initTextPanelHeight),1==se.isCompact&&"inside"==ae.lightbox_arrows_position&&(se.isArrowsInside=!0),1==se.isArrowsInside&&0==ae.lightbox_arrows_inside_alwayson&&(se.isArrowsOnHoverMode=!0),0==ae.lightbox_show_textpanel&&(se.isTopPanelEnabled=!1,se.topPanelHeight=0,ae.lightbox_slider_image_padding_top=0)}function i(){var e="",t="";1==se.isCompact&&(t=" ug-lightbox-compact"),e+="<div class='ug-gallery-wrapper ug-lightbox"+t+"'>",e+="<div class='ug-lightbox-overlay'></div>",0==se.isCompact&&se.isTopPanelEnabled?(e+="<div class='ug-lightbox-top-panel'>",e+="<div class='ug-lightbox-top-panel-overlay'></div>",ae.lightbox_show_numbers&&(e+="<div class='ug-lightbox-numbers'></div>"),e+="</div>"):ae.lightbox_show_numbers&&(e+="<div class='ug-lightbox-numbers'></div>"),e+="<div class='ug-lightbox-button-close'></div>",e+="<div class='ug-lightbox-arrow-left'></div>",e+="<div class='ug-lightbox-arrow-right'></div>",e+="</div>",V=jQuery(e),jQuery("body").append(V),ne&&ne.setHtml(V),X=V.children(".ug-lightbox-overlay"),0==se.isCompact&&1==se.isTopPanelEnabled&&($=V.children(".ug-lightbox-top-panel"),0==$.length&&($=null)),K=V.find(".ug-lightbox-button-close"),ae.lightbox_show_numbers&&(J=V.find(".ug-lightbox-numbers")),Z=V.children(".ug-lightbox-arrow-left"),q=V.children(".ug-lightbox-arrow-right"),oe&&($?oe.appendHTML($):oe.appendHTML(V))}function n(){if(null!==ae.lightbox_overlay_color&&X.css("background-color",ae.lightbox_overlay_color),null!==ae.lightbox_overlay_opacity&&X.fadeTo(0,ae.lightbox_overlay_opacity),$&&null!==ae.lightbox_top_panel_opacity&&$.children(".ug-lightbox-top-panel-overlay").fadeTo(0,ae.lightbox_top_panel_opacity),J){var e={};null!==ae.lightbox_numbers_size&&(e["font-size"]=ae.lightbox_numbers_size+"px"),ae.lightbox_numbers_color&&(e.color=ae.lightbox_numbers_color),null!==ae.lightbox_numbers_padding_right&&(e["padding-right"]=ae.lightbox_numbers_padding_right+"px"),null!==ae.lightbox_numbers_padding_top&&(e["padding-top"]=ae.lightbox_numbers_padding_top+"px"),J.css(e)}}function r(e){if(!ne)return!0;var t={slider_image_padding_top:e};ne.setOptions(t),ne.refreshSlideItems()}function o(e){if(!$)return!1;if(!oe)return!1;var t=$.height();if(0==t)return!1;if(0==$.is(":visible"))return!1;var i=t,n=oe.getSize(),o=n.height;t!=se.topPanelHeight&&(i=se.topPanelHeight),o>i&&(i=o),t!=i&&($.height(i),ne&&0==ne.isAnimating()&&r(i))}function a(e){var t={},i=ae.lightbox_textpanel_width,n=47,r=40,a=e.width-n-r;i>a?(t.textpanel_padding_left=n,t.textpanel_padding_right=r,t.textpanel_title_text_align="center",t.textpanel_desc_text_align="center"):(t.textpanel_padding_left=Math.floor((e.width-i)/2),t.textpanel_padding_right=t.textpanel_padding_left,t.textpanel_title_text_align="left",t.textpanel_desc_text_align="left",ae.lightbox_textpanel_title_text_align&&(t.textpanel_title_text_align=ae.lightbox_textpanel_desc_text_align),ae.lightbox_textpanel_desc_text_align&&(t.textpanel_desc_text_align=ae.lightbox_textpanel_desc_text_align)),oe.setOptions(t),oe.refresh(!0,!0),o("positionTextPanelWide"),oe.positionPanel()}function s(){return $?void $.hide():!1}function l(){return $?void $.show():!1}function u(e){if(0==se.isOpened)return!1;if(!oe)return!1;if(!ne)return!1;var t=re.getElementSize(V),i=oe.getSize();if(0==i.width||i.height>120)return!1;if(!e)var n=ne.getSlideImage(),e=re.getElementSize(n);if(0==e.height||0==e.width)return!1;var r=e.bottom+i.height;if(r<t.height)return!1;var o=ne.getOptions(),a=i.height;if(a!=o.slider_image_padding_bottom){var s={slider_image_padding_bottom:a};if(0==ne.isAnimating())return ne.setOptions(s),ne.refreshSlideItems(),!0}return!1}function d(e,t){if(!e)var i=ne.getSlideImage(),e=re.getElementSize(i);se.textPanelTop=e.bottom,t===!0&&oe.positionPanel(se.textPanelTop,se.textPanelLeft)}function _(e){var t=(re.getElementSize(V),ne.getSlideImage()),i=re.getElementSize(t);if(0==i.width)return!1;se.textPanelLeft=i.left,se.textPanelTop=i.bottom;var n=i.width;if(J){var r=re.getElementSize(J);n-=r.width;var o=i.right-r.width;re.placeElement(J,o,se.textPanelTop)}oe&&(oe.show(),oe.refresh(!0,!0,n),d(i));var a=u(i);0==a&&(se.positionFrom="handleCompactTextpanelSizes",oe&&(oe.positionPanel(se.textPanelTop,se.textPanelLeft),e===!0&&(e(),j())))}function g(){if(0==ne.isCurrentSlideType("image"))return!0;var e=1==ne.isCurrentImageInPlace();return e}function c(e,t){if(0==se.isArrowsInside)return!1;if(!Z)return!1;var i=g();if(Z.show(),q.show(),se.positionFrom="positionArrowsInside",1==se.isArrowsOnHoverMode&&1==i&&0==y()&&I(!0),0==i)var n=re.getElementRelativePos(Z,"left",ae.lightbox_arrows_offset),r=re.getElementRelativePos(Z,"middle"),o=re.getElementRelativePos(q,"right",ae.lightbox_arrows_offset),a=r;else var s=ne.getSlideImage(),l=re.getElementSize(s),n=(re.getElementSize(ne.getElement()),re.getElementRelativePos(Z,"left",0,s)+l.left+ae.lightbox_arrows_inside_offset),r=re.getElementRelativePos(Z,"middle",0,s)+l.top,o=re.getElementRelativePos(Z,"right",0,s)+l.left-ae.lightbox_arrows_inside_offset,a=r;if(t===!0){var u={left:n,top:r},d={left:o,top:a};Z.stop().animate(u,{duration:se.fadeDuration}),q.stop().animate(d,{duration:se.fadeDuration})}else Z.stop(),q.stop(),re.placeElement(Z,n,r),re.placeElement(q,o,a);1==e&&E(t)}function h(e,t){se.positionFrom=null;var i=g(),n=2,r=re.getElementRelativePos(K,"right",2,V);if(0==i)var o=n,a=r;else{var s=ne.getSlideImage(),l=re.getElementSize(s),u=re.getElementSize(ne.getElement()),d=re.getElementSize(K);u.top==u.height&&(u.top=0);var a=u.left+l.right-d.width/2+ae.lightbox_compact_closebutton_offsetx,o=u.top+l.top-d.height/2-ae.lightbox_compact_closebutton_offsety;n>o&&(o=n),a>r&&(a=r)}if(t===!0){var _={left:a,top:o};K.stop().animate(_,{duration:se.fadeDuration})}else K.stop(),re.placeElement(K,a,o);e===!0&&T(t)}function p(){K&&K.stop().fadeTo(se.fadeDuration,0),v(),b(),se.positionFrom="hideCompactElements",1==se.isArrowsInside&&I()}function f(){K&&K.hide(),Z&&1==se.isArrowsInside&&(Z.hide(),q.hide()),J&&J.hide(),oe&&oe.hide()}function m(){var e=re.getElementSize(V);$&&re.setElementSizeAndPosition($,0,0,e.width,se.topPanelHeight),Z&&0==se.isArrowsInside&&(1==ae.lightbox_hide_arrows_onvideoplay&&(Z.show(),q.show()),re.placeElement(Z,"left","middle",ae.lightbox_arrows_offset),re.placeElement(q,"right","middle",ae.lightbox_arrows_offset)),0==se.isCompact&&re.placeElement(K,"right","top",2,2),oe&&(se.positionFrom="positionElements",0==se.isCompact?a(e):(x(),j()));var t=e.width,i=e.height,n=0,r=0;if(ne){if($){var o=$.height(),s={slider_image_padding_top:o};ne.setOptions(s)}ne.setSize(t,i),ne.setPosition(r,n)}}function v(){oe&&oe.getElement().stop().fadeTo(se.fadeDuration,0)}function b(){J&&J.stop().fadeTo(se.fadeDuration,0)}function y(){if(!se.lastMouseX)return!0;var e={pageX:se.lastMouseX,pageY:se.lastMouseY},t=ne.isMouseInsideSlideImage(e);return t}function I(e,t){return Z?1==se.isArrowsOnHoverMode&&t===!1?(1==y(),!0):void(e===!0?(Z.stop().fadeTo(0,0),q.stop().fadeTo(0,0)):(Z.stop().fadeTo(se.fadeDuration,0),q.stop().fadeTo(se.fadeDuration,0))):!1}function w(){if(!Z)return!0;if(0==Z.is(":visible"))return!0;var e=Z.css("opacity");return 1!=e?!0:!1}function E(e,t){return Z?1==se.isArrowsOnHoverMode&&t!==!0&&1==g()?!0:1==ne.isSwiping()?!0:(e!==!0&&(Z.stop(),q.stop()),Z.fadeTo(se.fadeDuration,1),void q.fadeTo(se.fadeDuration,1)):!1}function T(e){e!==!0&&K.stop(),K.fadeTo(se.fadeDuration,1)}function S(e){if(!oe)return!1;if(!e)var e=ne.getCurrentItem();oe.setTextPlain(e.title,e.description)}function P(e){if(!J)return!1;if(!e)var e=ne.getCurrentItem();var t=ie.getNumItems(),i=e.index+1;J.html(i+" / "+t)}function x(){return oe?void oe.getElement().show().stop().fadeTo(se.fadeDuration,1):!1}function j(){J&&J.stop().fadeTo(se.fadeDuration,1)}function C(){return 0==se.isCompact?!0:void p()}function A(){if(0==se.isCompact)return!0;if(se.positionFrom="onZoomChange",h(!1,!0),c(!1,!0),1==se.isCompact){var e=ne.isCurrentSlideType("image")&&1==ne.isCurrentImageInPlace();0==e?(v(),b()):(se.positionFrom="onZoomChange",x(),j())}}function M(){if(0==se.isCompact)return!0;se.positionFrom="onSliderAfterReturn",h(!0),c(!0);var e=u();0==e&&_(),x(),j()}function O(e,t){return t=jQuery(t),0==se.isCompact?!0:0==ne.isSlideCurrent(t)?!0:(se.positionFrom="onSliderAfterPutImage",h(!0),c(!0),void _())}function z(){var e=ne.getOptions(),t=e.slider_image_padding_top;if($){var i=$.height();i!=t&&r(i)}if(1==se.isCompact){if(S(),P(),se.positionFrom="onSliderTransitionEnd",h(!0),c(!0),0==ne.isSlideActionActive()){var n=u();0==n&&_()}x(),j()}}function L(e,t){0==se.isCompact?(J&&P(t),oe&&(S(t),0==se.isRightNowOpened&&(oe.positionElements(!1),o("onchange"),oe.positionPanel()))):0==ne.isAnimating()&&(oe&&S(t),J&&P(t)),0==se.isSliderChangedOnce&&(se.isSliderChangedOnce=!0,te.trigger(ee.events.LIGHTBOX_INIT))}function H(e,t){var i=ne.getSlideType();if("image"!=i&&0==se.isCompact&&ne.isSlideActionActive())return!0;var n=ne.isPreloading();if(1==n)return ee.close("slider"),!0;if(1==ae.lightbox_close_on_emptyspace){var r=ne.isMouseInsideSlideImage(t);0==r&&ee.close("slider_inside")}}function N(){m()}function k(){$?s():J&&J.hide(),Z&&1==ae.lightbox_hide_arrows_onvideoplay&&(Z.hide(),q.hide())}function R(){$?(l(),o("onStopVideo")):J&&J.show(),Z&&1==ae.lightbox_hide_arrows_onvideoplay&&(Z.show(),q.show())}function G(e,t,i){var n=!1;switch(t){case 27:1==se.isOpened&&ee.close("keypress");break;case 38:case 40:case 33:case 34:n=!0}1==se.isOpened&&1==n&&i.preventDefault()}function D(){1==se.isArrowsOnHoverMode&&E(!1,!0)}function Q(e){se.positionFrom="hideCompactElements",1==se.isArrowsOnHoverMode&&1==g()&&I(!1,!0)}function W(e){se.lastMouseX=e.pageX,se.lastMouseY=e.pageY;var t=w();1==t&&y()&&0==ne.isAnimating()&&(se.positionFrom="onMouseMove",Z&&0==Z.is(":animated")&&E(!1,!0))}function B(e,t,i,n){if(0==se.isOpened)return!0;switch(ae.gallery_mousewheel_role){default:case"zoom":var r=ne.getSlideType();"image"!=r&&e.preventDefault();break;case"none":e.preventDefault();break;case"advance":ie.onGalleryMouseWheel(e,t,i,n)}}function F(){if(X.on("touchstart",function(e){e.preventDefault()}),X.on("touchend",function(e){ee.close("overlay")}),re.addClassOnHover(q,"ug-arrow-hover"),re.addClassOnHover(Z,"ug-arrow-hover"),re.addClassOnHover(K),ie.setNextButton(q),ie.setPrevButton(Z),K.click(function(){ee.close("button")}),U.on(ie.events.ITEM_CHANGE,L),ne){jQuery(ne).on(ne.events.TRANSITION_END,z),jQuery(ne).on(ne.events.CLICK,H);var e=ne.getVideoObject();jQuery(e).on(e.events.PLAY_START,k),jQuery(e).on(e.events.PLAY_STOP,R),jQuery(ne).on(ne.events.START_DRAG,C),jQuery(ne).on(ne.events.TRANSITION_START,C),jQuery(ne).on(ne.events.AFTER_DRAG_CHANGE,M),jQuery(ne).on(ne.events.AFTER_RETURN,M),jQuery(ne).on(ne.events.AFTER_PUT_IMAGE,O),jQuery(ne).on(ne.events.ZOOM_CHANGE,A),jQuery(ne).on(ne.events.IMAGE_MOUSEENTER,D),jQuery(ne).on(ne.events.IMAGE_MOUSELEAVE,Q)}jQuery(window).resize(function(){return 0==se.isOpened?!0:void re.whenContiniousEventOver("lightbox_resize",N,100)}),U.on(ie.events.GALLERY_KEYPRESS,G),1==se.isArrowsOnHoverMode&&jQuery(document).bind("mousemove",W),V.on("mousewheel",B)}function Y(){se.isCompact=!1,t(),se.isArrowsInside=!1,se.isArrowsOnHoverMode=!1,ae=jQuery.extend({},se.originalOptions),ae.lightbox_arrows_position="sides",ne.setOptions(ae)}var U,V,X,Z,q,K,J,$,ee=this,te=jQuery(this),ie=new UniteGalleryMain,ne=new UGSlider,re=new UGFunctions,oe=new UGTextPanel,ae={lightbox_type:"wide",lightbox_show_textpanel:!0,lightbox_textpanel_width:550,lightbox_hide_arrows_onvideoplay:!0,lightbox_arrows_position:"sides",lightbox_arrows_offset:10,lightbox_arrows_inside_offset:10,lightbox_arrows_inside_alwayson:!1,lightbox_overlay_color:null,lightbox_overlay_opacity:1,lightbox_top_panel_opacity:null,lightbox_show_numbers:!0,lightbox_numbers_size:null,lightbox_numbers_color:null,lightbox_numbers_padding_top:null,lightbox_numbers_padding_right:null,lightbox_compact_closebutton_offsetx:1,lightbox_compact_closebutton_offsety:1,lightbox_close_on_emptyspace:!0};this.events={LIGHTBOX_INIT:"lightbox_init"};var se={topPanelHeight:44,initTextPanelHeight:26,isOpened:!1,isRightNowOpened:!1,putSlider:!0,isCompact:!1,fadeDuration:300,positionFrom:null,textPanelTop:null,textPanelLeft:null,isArrowsInside:!1,isArrowsOnHoverMode:!1,lastMouseX:null,lastMouseY:null,originalOptions:null,isSliderChangedOnce:!1,isTopPanelEnabled:!0},le={lightbox_slider_controls_always_on:!0,lightbox_slider_enable_bullets:!1,lightbox_slider_enable_arrows:!1,lightbox_slider_enable_progress_indicator:!1,lightbox_slider_enable_play_button:!1,lightbox_slider_enable_fullscreen_button:!1,lightbox_slider_enable_zoom_panel:!1,lightbox_slider_enable_text_panel:!1,
lightbox_slider_scale_mode_media:"down",lightbox_slider_scale_mode:"down",lightbox_slider_loader_type:3,lightbox_slider_loader_color:"black",lightbox_slider_transition:"fade",lightbox_slider_image_padding_top:se.topPanelHeight,lightbox_slider_image_padding_bottom:0,lightbox_slider_video_padding_top:0,lightbox_slider_video_padding_bottom:0,lightbox_textpanel_align:"middle",lightbox_textpanel_padding_top:5,lightbox_textpanel_padding_bottom:5,slider_video_constantsize:!1,lightbox_slider_image_border:!1,lightbox_textpanel_enable_title:!0,lightbox_textpanel_enable_description:!1,lightbox_textpanel_desc_style_as_title:!0,lightbox_textpanel_enable_bg:!1,video_enable_closebutton:!1,lightbox_slider_video_enable_closebutton:!1,video_youtube_showinfo:!1,lightbox_slider_enable_links:!1},ue={lightbox_overlay_opacity:.6,lightbox_slider_image_border:!0,lightbox_slider_image_shadow:!0,lightbox_slider_image_padding_top:30,lightbox_slider_image_padding_bottom:30,slider_video_constantsize:!0,lightbox_textpanel_align:"bottom",lightbox_textpanel_title_text_align:"left",lightbox_textpanel_desc_text_align:"left",lightbox_textpanel_padding_left:10,lightbox_textpanel_padding_right:10};this.destroy=function(){if(jQuery(document).unbind("mousemove"),X.off("touchstart"),X.off("touchend"),K.off("click"),U.off(ie.events.ITEM_CHANGE),ne){jQuery(ne).off(ne.events.TRANSITION_END),jQuery(ne).off(ne.events.CLICK),jQuery(ne).off(ne.events.START_DRAG),jQuery(ne).off(ne.events.TRANSITION_START),jQuery(ne).off(ne.events.AFTER_DRAG_CHANGE),jQuery(ne).off(ne.events.AFTER_RETURN);var e=ne.getVideoObject();jQuery(e).off(e.events.PLAY_START),jQuery(e).off(e.events.PLAY_STOP),jQuery(ne).on(ne.events.IMAGE_MOUSEENTER,D),jQuery(ne).on(ne.events.IMAGE_MOUSELEAVE,Q),ne.destroy()}jQuery(window).unbind("resize"),U.off(ie.events.GALLERY_KEYPRESS,G),V.off("mousewheel"),V.remove()},this.open=function(e){var t=ie.getItem(e);if(se.isOpened=!0,se.isRightNowOpened=!0,setTimeout(function(){se.isRightNowOpened=!1},100),ne&&ne.setItem(t,"lightbox_open"),oe&&oe.setTextPlain(t.title,t.description),X.stop().fadeTo(0,0),V.show(),V.fadeTo(0,1),X.stop().fadeTo(se.fadeDuration,ae.lightbox_overlay_opacity),m(),1==se.isCompact){var i=ne.isPreloading();1==i?f():1==se.isArrowsInside&&(Z.hide(),q.hide())}ne&&ne.startSlideAction(),U.trigger(ie.events.OPEN_LIGHTBOX,t)},this.close=function(e){se.isOpened=!1,1==se.isCompact&&p(),ne&&ne.stopSlideAction();var t=ne.getSlideType();"image"!=t?V.hide():V.fadeTo(se.fadeDuration,0,function(){V.hide()}),U.trigger(ie.events.CLOSE_LIGHTBOX)},this.init=function(t,i){e(t,i)},this.putHtml=function(){var e=ie.isSmallWindow();e&&1==se.isCompact&&Y(),i()},this.run=function(){n(),ne&&ne.run(),F()}}function UGCarousel(){function e(e,t){g_objects=e.getObjects(),W=e,H=jQuery(e),N=g_objects.g_objWrapper,k=g_objects.g_arrItems,U=jQuery.extend(U,t),F.setFixedMode(),F.setApproveClickFunction(L),F.init(e,U),Y=F.getObjThumbs(),U=F.getOptions(),V.initTileWidth=U.tile_width,V.initTileHeight=U.tile_height,V.tileWidth=U.tile_width}function t(e){if(!e)var e=N;var t="<div class='ug-carousel-wrapper'><div class='ug-carousel-inner'></div></div>";N.append(t),R=N.children(".ug-carousel-wrapper"),G=R.children(".ug-carousel-inner"),F.setHtml(G),Y.getThumbs().fadeTo(0,1)}function i(e,t){if(!t)var t=V.initTileHeight/V.initTileWidth*e;V.tileWidth=e;var i={tile_width:e,tile_height:t};F.setOptions(i),U.tile_width=e,U.tile_height=t,F.resizeAllTiles(e),m(!0)}function n(){if(null===V.carouselMaxWidth)throw new Error("The carousel width not set");if(V.tileWidth<V.initTileWidth){var e=V.carouselMaxWidth-2*U.carousel_padding;e>V.initTileWidth&&(e=V.initTileWidth),i(e);var t=B.getNumItemsInSpace(V.carouselMaxWidth,e,U.carousel_space_between_tiles)}else{var t=B.getNumItemsInSpace(V.carouselMaxWidth,V.tileWidth,U.carousel_space_between_tiles);if(0>=t){t=1;var e=V.carouselMaxWidth-2*U.carousel_padding;i(e)}}var n=B.getSpaceByNumItems(t,V.tileWidth,U.carousel_space_between_tiles);n+=2*U.carousel_padding,R.width(n),1==V.isFirstTimeRun?(z(),F.run(),jQuery.each(k,function(e,t){t.objThumbWrapper.data("index",e),N.trigger(V.eventSizeChange,[t.objThumbWrapper,!0]),t.objTileOriginal=t.objThumbWrapper.clone(!0,!0)}),m(!0),1==U.carousel_autoplay&&D.startAutoplay()):(1==U.carousel_autoplay&&D.pauseAutoplay(),w(0,!1),1==U.carousel_autoplay&&D.startAutoplay()),P(),V.isFirstTimeRun=!1}function r(){return B.getElementSize(G).left}function o(e){return B.getMousePosition(e).pageX}function a(){var e=G.children(".ug-thumb-wrapper");return e}function s(e){var t=B.getNumItemsInSpace(e,V.tileWidth,U.carousel_space_between_tiles);return t}function l(){return a().length}function u(e){v(e);var t=a(),i=jQuery(t[e]);return i}function d(){return G.children(".ug-thumb-wrapper").first()}function _(){return G.children(".ug-thumb-wrapper").last()}function g(e,t,i){var n=e.data("index");if(void 0==n)throw new Error("every tile should have index!");for(var r=[],o=0;t>o;o++){if("prev"==i)var a=W.getPrevItem(n,!0);else var a=W.getNextItem(n,!0);if(!a)throw new Error("the item to add is empty");var s=a.objTileOriginal.clone(!0,!0);n=a.index,s.addClass("cloned"),r.push(s)}return r}function c(){var e=B.getElementSize(R),t=B.getElementSize(G),i=t.width-e.width+t.left,n=V.sideSpace-i;return n}function h(){var e=-r(),t=V.sideSpace-e;return t}function p(){var e=B.getElementSize(R);return e.width}function f(){var e=p(),t=s(e);return t}function m(e){if(!e)var e=!1;var t,i=a(),n=0,r=0;return jQuery.each(i,function(e,o){o=jQuery(o),B.placeElement(o,n,0);var a=B.getElementSize(o);n+=a.width+U.carousel_space_between_tiles,r=Math.max(r,a.height),e==i.length-1&&(t=a.right)}),G.width(t),r+=2*U.carousel_padding,e===!0&&(G.height(r),R.height(r)),w(V.numCurrent,!1),t}function v(e){if(e>a().length-1)throw new Error("Wrogn tile number: "+e)}function b(e,t){if("left"==t)var i=d();else var i=_();var n="left"==t?"prev":"next",r=g(i,e,n);jQuery.each(r,function(e,i){"left"==t?G.prepend(i):G.append(i),N.trigger(V.eventSizeChange,i),F.loadTileImage(i)})}function y(e,t){v(n);for(var i=a(),n=i.length,r=0;e>r;r++)"left"==t?jQuery(i[r]).remove():jQuery(i[n-1-r]).remove()}function I(e){var t={left:e+"px"};G.css(t)}function w(e,t,i){if(void 0===t){var t=!0;if(G.is(":animated"))return!0}var n=u(e),r=B.getElementSize(n),o=-r.left+U.carousel_padding,a={left:o+"px"};if(t===!0){var s=U.carousel_scroll_duration,l=U.carousel_scroll_easing;i===!0&&(s=V.scrollShortDuration,l=V.scrollShortEasing),G.stop(!0).animate(a,{duration:s,easing:l,queue:!1,complete:function(){V.numCurrent=e,S(!0)}})}else V.numCurrent=e,G.css(a)}function E(){var e=-r(),t=s(e),i=B.getElementSize(u(t)).left,n=B.getElementSize(u(t+1)).left;return Math.abs(i-e)<Math.abs(n-e)?t:t+1}function T(){var e=E();w(e,!0,!0)}function S(){var e=h(),t=c(),i=0,n=0,r=0,o=0,a=l();if(e>V.spaceActionSize)i=s(e),b(i,"left"),V.numCurrent+=i;else if(e<-V.spaceActionSize){var r=s(Math.abs(e));y(r,"left"),V.numCurrent-=r}if(t>V.spaceActionSize?(n=s(t),b(n,"right")):t<-V.spaceActionSize&&(o=s(Math.abs(t)),y(o,"right")),o>a)throw new Error("Can't remove more then num tiles");var u=!1;return(i||n||r||o)&&(m(),u=!0),u}function P(e){B.placeElement(G,0,U.carousel_padding),S()}function x(){"left"==U.carousel_autoplay_direction?D.scrollRight(1):D.scrollLeft(1)}function j(e){return 1==V.touchActive?!0:(V.touchActive=!0,D.pauseAutoplay(),V.startTime=jQuery.now(),V.startMousePos=o(e),V.startInnerPos=r(),V.lastTime=V.startTime,V.lastMousePos=V.startMousePos,void B.storeEventData(e,V.storedEventID))}function C(e){if(0==V.touchActive)return!0;B.updateStoredEventData(e,V.storedEventID),e.preventDefault();var t=null;if(1==U.carousel_vertical_scroll_ondrag&&(t=B.handleScrollTop(V.storedEventID)),"vert"===t)return!0;V.lastMousePos=o(e);var i=V.lastMousePos-V.startMousePos,n=V.startInnerPos+i,r=i>0?"prev":"next",a=B.getElementSize(G).width;n>0&&"prev"==r&&(n/=3),-a>n&&"next"==r&&(n=V.startInnerPos+i/3),I(n)}function A(e){return 0==V.touchActive?!0:(V.touchActive=!1,T(),void D.unpauseAutoplay())}function M(e){return 0==U.carousel_autoplay_pause_onhover?!0:void(1==V.isPlayMode&&0==V.isPaused&&D.pauseAutoplay())}function O(e){return 0==U.carousel_autoplay_pause_onhover?!0:void D.unpauseAutoplay()}function z(){F.initEvents(),R.bind("mousedown touchstart",j),jQuery("body").bind("mousemove touchmove",C),jQuery(window).add("body").bind("mouseup touchend",A),R.hover(M,O)}function L(){var e=V.lastTime-V.startTime,t=Math.abs(V.lastMousePos-V.startMousePos);return e>300?!1:t>30?!1:!0}var H,N,k,R,G,D=this,Q=jQuery(this),W=new UniteGalleryMain,B=new UGFunctions,F=new UGTileDesign,Y=new UGThumbsGeneral,U={carousel_padding:8,carousel_space_between_tiles:20,carousel_navigation_numtiles:3,carousel_scroll_duration:500,carousel_scroll_easing:"easeOutCubic",carousel_autoplay:!0,carousel_autoplay_timeout:3e3,carousel_autoplay_direction:"right",carousel_autoplay_pause_onhover:!0,carousel_vertical_scroll_ondrag:!1};this.events={START_PLAY:"carousel_start_play",PAUSE_PLAY:"carousel_pause_play",STOP_PLAY:"carousel_stop_play"};var V={eventSizeChange:"thumb_size_change",isFirstTimeRun:!0,carouselMaxWidth:null,tileWidth:0,initTileWidth:0,initTileHeight:0,sideSpace:1500,spaceActionSize:500,numCurrent:0,touchActive:!1,startInnerPos:0,lastTime:0,startTime:0,startMousePos:0,lastMousePos:0,scrollShortDuration:200,scrollShortEasing:"easeOutQuad",handle:null,isPlayMode:!1,isPaused:!1,storedEventID:"carousel"};this.startAutoplay=function(){V.isPlayMode=!0,V.isPaused=!1,Q.trigger(D.events.START_PLAY),V.handle&&clearInterval(V.handle),V.handle=setInterval(x,U.carousel_autoplay_timeout)},this.unpauseAutoplay=function(){return 0==V.isPlayMode?!0:0==V.isPaused?!0:void D.startAutoplay()},this.pauseAutoplay=function(){return 0==V.isPlayMode?!0:(V.isPaused=!0,V.handle&&clearInterval(V.handle),void Q.trigger(D.events.PAUSE_PLAY))},this.stopAutoplay=function(){return 0==V.isPlayMode?!0:(V.isPaused=!1,V.isPlayMode=!1,V.handle&&clearInterval(V.handle),void Q.trigger(D.events.STOP_PLAY))},this.destroy=function(){V.handle&&clearInterval(V.handle),Q.off(D.events.START_PLAY),Q.off(D.events.STOP_PLAY),R.unbind("mousedown"),R.unbind("touchstart"),jQuery("body").unbind("mousemove"),jQuery("body").unbind("touchmove"),jQuery(window).add("body").unbind("mouseup").unbind("touchend"),R.off("mouseenter").off("mouseleave"),F.destroy()},this.init=function(t,i,n){n&&this.setMaxWidth(n),e(t,i)},this.setMaxWidth=function(e){V.carouselMaxWidth=e},this.setHtml=function(e){t(e)},this.getElement=function(){return R},this.getObjTileDesign=function(){return F},this.getEstimatedHeight=function(){var e=U.tile_height+2*U.carousel_padding;return e},this.run=function(){n()},this.scrollRight=function(e){if(!e||"object"==typeof e)var e=U.carousel_navigation_numtiles;var t=f();e>t&&(e=t);var i=V.numCurrent-e;0>=i&&(i=0),w(i)},this.scrollLeft=function(e){if(!e||"object"==typeof e)var e=U.carousel_navigation_numtiles;var t=f();e>t&&(e=t);var i=l(),n=V.numCurrent+e;n>=i&&(n=i-1),w(n)},this.setScrollLeftButton=function(e){B.setButtonMobileReady(e),B.setButtonOnClick(e,D.scrollLeft)},this.setScrollRightButton=function(e){B.setButtonMobileReady(e),B.setButtonOnClick(e,D.scrollRight)},this.setPlayPauseButton=function(e){B.setButtonMobileReady(e),1==V.isPlayMode&&0==V.isPaused&&e.addClass("ug-pause-icon"),Q.on(D.events.START_PLAY,function(){e.addClass("ug-pause-icon")}),Q.on(D.events.STOP_PLAY,function(){e.removeClass("ug-pause-icon")}),B.setButtonOnClick(e,function(){0==V.isPlayMode||1==V.isPaused?D.startAutoplay():D.stopAutoplay()})}}function UGTabs(){function e(e,t){u=e,a=jQuery(u),d=jQuery.extend(d,t),"select"==d.tabs_type?l=jQuery(d.tabs_container):s=jQuery(d.tabs_container+" .ug-tab")}function t(){o()}function i(e){u.requestNewItems(e)}function n(){var e=d.tabs_class_selected,t=jQuery(this);if(t.hasClass(e))return!0;s.not(t).removeClass(e),t.addClass(e);var n=t.data("catid");return n?void i(n):!0}function r(){var e=jQuery(this),t=e.val();return t?void i(t):!0}function o(){"select"==d.tabs_type?l.change(r):s.click(n)}var a,s,l,u=(jQuery(this),new UniteGalleryMain),d=(new UGFunctions,{tabs_type:"tabs",tabs_container:"#ug_tabs",tabs_class_selected:"ug-tab-selected"});this.events={},this.destroy=function(){l&&l.off("change"),s&&s.off("click")},this.init=function(t,i){e(t,i)},this.run=function(){t()}}function UG_API(e){function t(e){var t={index:e.index,title:e.title,description:e.description,urlImage:e.urlImage,urlThumb:e.urlThumb},i=e.objThumbImage.data();for(var n in i){switch(n){case"image":case"description":continue}t[n]=i[n]}return t}var i,n=this,r=(jQuery(n),new UniteGalleryMain),o=[];r=e,i=jQuery(e),this.events={API_INIT_FUNCTIONS:"api_init",API_ON_EVENT:"api_on_event"},this.on=function(e,a,s){switch(s!==!0&&o.push({event:e,func:a}),e){case"item_change":i.on(r.events.ITEM_CHANGE,function(){var e=r.getSelectedItem(),i=t(e);a(i.index,i)});break;case"resize":i.on(r.events.SIZE_CHANGE,a);break;case"enter_fullscreen":i.on(r.events.ENTER_FULLSCREEN,a);break;case"exit_fullscreen":i.on(r.events.EXIT_FULLSCREEN,a);break;case"play":i.on(r.events.START_PLAY,a);break;case"stop":i.on(r.events.STOP_PLAY,a);break;case"pause":i.on(r.events.PAUSE_PLAYING,a);break;case"continue":i.on(r.events.CONTINUE_PLAYING,a);break;case"open_lightbox":i.on(r.events.OPEN_LIGHTBOX,a);break;case"close_lightbox":i.on(r.events.CLOSE_LIGHTBOX,a);break;default:console&&console.log("wrong api event: "+e)}i.trigger(n.events.API_ON_EVENT,[e,a])},this.play=function(){r.startPlayMode()},this.stop=function(){r.stopPlayMode()},this.togglePlay=function(){r.togglePlayMode()},this.enterFullscreen=function(){r.toFullScreen()},this.exitFullscreen=function(){r.exitFullScreen()},this.toggleFullscreen=function(){r.toggleFullscreen()},this.resetZoom=function(){var e=r.getObjSlider();return e?void e.zoomBack():!1},this.zoomIn=function(){var e=r.getObjSlider();return e?void e.zoomIn():!1},this.zoomOut=function(){var e=r.getObjSlider();return e?void e.zoomOut():!1},this.nextItem=function(){r.nextItem()},this.prevItem=function(){r.prevItem()},this.selectItem=function(e){r.selectItem(e)},this.resize=function(e,t){t?r.resize(e,t):r.resize(e)},this.getItem=function(e){var i=r.getItem(e),n=t(i);return n},this.getNumItems=function(){var e=r.getNumItems();return e},this.reloadGallery=function(e){if(!e)var e={};r.run(null,e),o.map(function(e){n.on(e.event,e.func,!0)})},this.destroy=function(){r.destroy()},i.trigger(n.events.API_INIT_FUNCTIONS,n)}function UGLoadMore(){function e(){return o=jQuery("#"+_.loadmore_container),0==o.length?!1:(a=o.find(".ug-loadmore-button"),0==a.length?!1:(s=o.find(".ug-loadmore-loader"),0==s.length?!1:(l=o.find(".ug-loadmore-error"),0==l.length?!1:void(d.isInited=!0))))}function t(){o.show()}function i(){a.hide(),s.show();var e={numitems:u.getNumItems()};u.ajaxRequest("front_loadmore",e,function(e){s.hide();var t=e.html_items,i=e.show_loadmore;1==i?(a.blur().show(),s.hide()):o.hide(),u.addItems(t)},function(e){e="Ajax Error!"+e,s.hide(),l.show(),l.html(e)})}function n(){u.onEvent("tiles_first_placed",t),a.click(i)}var r,o,a,s,l,u=(jQuery(this),new UniteGalleryMain),d=(new UGFunctions,{isInited:!1}),_={loadmore_container:"ug_loadmore_wrapper"};this.events={},this.destroy=function(){return 0==d.isInited?!1:void 0},this.init=function(t,i){return u=t,r=jQuery(u),_=jQuery.extend(_,i),e(),0==d.isInited?(trace("load more not inited, something is wrong"),!1):void n()}}var g_ugFunctions=new UGFunctions;!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var a=t||window.event,s=l.call(arguments,1),u=0,d=0,_=0,g=0;if(t=e.event.fix(a),t.type="mousewheel","detail"in a&&(_=-1*a.detail),"wheelDelta"in a&&(_=a.wheelDelta),"wheelDeltaY"in a&&(_=a.wheelDeltaY),"wheelDeltaX"in a&&(d=-1*a.wheelDeltaX),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(d=-1*_,_=0),u=0===_?d:_,"deltaY"in a&&(_=-1*a.deltaY,u=_),"deltaX"in a&&(d=a.deltaX,0===_&&(u=-1*d)),0!==_||0!==d){if(1===a.deltaMode){var c=e.data(this,"mousewheel-line-height");u*=c,_*=c,d*=c}else if(2===a.deltaMode){var h=e.data(this,"mousewheel-page-height");u*=h,_*=h,d*=h}return g=Math.max(Math.abs(_),Math.abs(d)),(!o||o>g)&&(o=g,n(a,g)&&(o/=40)),n(a,g)&&(u/=40,d/=40,_/=40),u=Math[u>=1?"floor":"ceil"](u/o),d=Math[d>=1?"floor":"ceil"](d/o),_=Math[_>=1?"floor":"ceil"](_/o),t.deltaX=d,t.deltaY=_,t.deltaFactor=o,t.deltaMode=0,s.unshift(t,u,d,_),r&&clearTimeout(r),r=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,s)}}function i(){o=null}function n(e,t){return d.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120===0}var r,o,a=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],s="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var u=a.length;u;)e.event.fixHooks[a[--u]]=e.event.mouseHooks;var d=e.event.special.mousewheel={version:"3.1.9",setup:function(){if(this.addEventListener)for(var i=s.length;i;)this.addEventListener(s[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",d.getLineHeight(this)),e.data(this,"mousewheel-page-height",d.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=s.length;e;)this.removeEventListener(s[--e],t,!1);else this.onmousewheel=null},getLineHeight:function(t){return parseInt(e(t)["offsetParent"in e.fn?"offsetParent":"parent"]().css("fontSize"),10)},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(e){"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):"object"==typeof module&&"object"==typeof module.exports?exports=e(require("jquery")):e(jQuery)}(function(e){function t(e){var t=7.5625,i=2.75;return 1/i>e?t*e*e:2/i>e?t*(e-=1.5/i)*e+.75:2.5/i>e?t*(e-=2.25/i)*e+.9375:t*(e-=2.625/i)*e+.984375}e.easing.jswing=e.easing.swing;var i=Math.pow,n=Math.sqrt,r=Math.sin,o=Math.cos,a=Math.PI,s=1.70158,l=1.525*s,u=s+1,d=2*a/3,_=2*a/4.5;e.extend(e.easing,{def:"easeOutQuad",swing:function(t){return e.easing[e.easing.def](t)},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return 1-(1-e)*(1-e)},easeInOutQuad:function(e){return.5>e?2*e*e:1-i(-2*e+2,2)/2},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return 1-i(1-e,3)},easeInOutCubic:function(e){return.5>e?4*e*e*e:1-i(-2*e+2,3)/2},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1-i(1-e,4)},easeInOutQuart:function(e){return.5>e?8*e*e*e*e:1-i(-2*e+2,4)/2},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1-i(1-e,5)},easeInOutQuint:function(e){return.5>e?16*e*e*e*e*e:1-i(-2*e+2,5)/2},easeInSine:function(e){return 1-o(e*a/2)},easeOutSine:function(e){return r(e*a/2)},easeInOutSine:function(e){return-(o(a*e)-1)/2},easeInExpo:function(e){return 0===e?0:i(2,10*e-10)},easeOutExpo:function(e){return 1===e?1:1-i(2,-10*e)},easeInOutExpo:function(e){return 0===e?0:1===e?1:.5>e?i(2,20*e-10)/2:(2-i(2,-20*e+10))/2},easeInCirc:function(e){return 1-n(1-i(e,2))},easeOutCirc:function(e){return n(1-i(e-1,2))},easeInOutCirc:function(e){return.5>e?(1-n(1-i(2*e,2)))/2:(n(1-i(-2*e+2,2))+1)/2},easeInElastic:function(e){return 0===e?0:1===e?1:-i(2,10*e-10)*r((10*e-10.75)*d)},easeOutElastic:function(e){return 0===e?0:1===e?1:i(2,-10*e)*r((10*e-.75)*d)+1},easeInOutElastic:function(e){return 0===e?0:1===e?1:.5>e?-(i(2,20*e-10)*r((20*e-11.125)*_))/2:i(2,-20*e+10)*r((20*e-11.125)*_)/2+1},easeInBack:function(e){return u*e*e*e-s*e*e},easeOutBack:function(e){return 1+u*i(e-1,3)+s*i(e-1,2)},easeInOutBack:function(e){return.5>e?i(2*e,2)*(2*(l+1)*e-l)/2:(i(2*e-2,2)*((l+1)*(2*e-2)+l)+2)/2},easeInBounce:function(e){return 1-t(1-e)},easeOutBounce:t,easeInOutBounce:function(e){return.5>e?(1-t(1-2*e))/2:(1+t(2*e-1))/2}})}),!function(e,t){function i(e,t,i){var n=_[t.type]||{};return null==e?i||!t.def?null:t.def:(e=n.floor?~~e:parseFloat(e),isNaN(e)?t.def:n.mod?(e+n.mod)%n.mod:0>e?0:n.max<e?n.max:e)}function n(t){var i=u(),n=i._rgba=[];return t=t.toLowerCase(),h(l,function(e,r){var o,a=r.re.exec(t),s=a&&r.parse(a),l=r.space||"rgba";return s?(o=i[l](s),i[d[l].cache]=o[d[l].cache],n=i._rgba=o._rgba,!1):void 0}),n.length?("0,0,0,0"===n.join()&&e.extend(n,o.transparent),i):o[t]}function r(e,t,i){return i=(i+1)%1,1>6*i?e+(t-e)*i*6:1>2*i?t:2>3*i?e+(t-e)*(2/3-i)*6:e}if("undefined"==typeof e.cssHooks)return!1;var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",s=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],u=e.Color=function(t,i,n,r){return new e.Color.fn.parse(t,i,n,r)},d={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},_={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},g=u.support={},c=e("<p>")[0],h=e.each;c.style.cssText="background-color:rgba(1,1,1,.5)",g.rgba=c.style.backgroundColor.indexOf("rgba")>-1,h(d,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),u.fn=e.extend(u.prototype,{parse:function(r,a,s,l){if(r===t)return this._rgba=[null,null,null,null],this;(r.jquery||r.nodeType)&&(r=e(r).css(a),a=t);var _=this,g=e.type(r),c=this._rgba=[];return a!==t&&(r=[r,a,s,l],g="array"),"string"===g?this.parse(n(r)||o._default):"array"===g?(h(d.rgba.props,function(e,t){c[t.idx]=i(r[t.idx],t)}),this):"object"===g?(r instanceof u?h(d,function(e,t){r[t.cache]&&(_[t.cache]=r[t.cache].slice())}):h(d,function(t,n){var o=n.cache;h(n.props,function(e,t){if(!_[o]&&n.to){if("alpha"===e||null==r[e])return;_[o]=n.to(_._rgba)}_[o][t.idx]=i(r[e],t,!0)}),_[o]&&e.inArray(null,_[o].slice(0,3))<0&&(_[o][3]=1,n.from&&(_._rgba=n.from(_[o])))}),this):void 0},is:function(e){var t=u(e),i=!0,n=this;return h(d,function(e,r){var o,a=t[r.cache];return a&&(o=n[r.cache]||r.to&&r.to(n._rgba)||[],h(r.props,function(e,t){return null!=a[t.idx]?i=a[t.idx]===o[t.idx]:void 0})),i}),i},_space:function(){var e=[],t=this;return h(d,function(i,n){t[n.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var n=u(e),r=n._space(),o=d[r],a=0===this.alpha()?u("transparent"):this,s=a[o.cache]||o.to(a._rgba),l=s.slice();return n=n[o.cache],h(o.props,function(e,r){var o=r.idx,a=s[o],u=n[o],d=_[r.type]||{};null!==u&&(null===a?l[o]=u:(d.mod&&(u-a>d.mod/2?a+=d.mod:a-u>d.mod/2&&(a-=d.mod)),l[o]=i((u-a)*t+a,r)))}),this[r](l)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),n=i.pop(),r=u(t)._rgba;return u(e.map(i,function(e,t){return(1-n)*r[t]+n*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),n=i.pop();return t&&i.push(~~(255*n)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,d.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,n=e[0]/255,r=e[1]/255,o=e[2]/255,a=e[3],s=Math.max(n,r,o),l=Math.min(n,r,o),u=s-l,d=s+l,_=.5*d;return t=l===s?0:n===s?60*(r-o)/u+360:r===s?60*(o-n)/u+120:60*(n-r)/u+240,i=0===u?0:.5>=_?u/d:u/(2-d),[Math.round(t)%360,i,_,null==a?1:a]},d.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],n=e[2],o=e[3],a=.5>=n?n*(1+i):n+i-n*i,s=2*n-a;return[Math.round(255*r(s,a,t+1/3)),Math.round(255*r(s,a,t)),Math.round(255*r(s,a,t-1/3)),o]},h(d,function(n,r){var o=r.props,a=r.cache,l=r.to,d=r.from;u.fn[n]=function(n){if(l&&!this[a]&&(this[a]=l(this._rgba)),n===t)return this[a].slice();var r,s=e.type(n),_="array"===s||"object"===s?n:arguments,g=this[a].slice();return h(o,function(e,t){var n=_["object"===s?e:t.idx];null==n&&(n=g[t.idx]),g[t.idx]=i(n,t)}),d?(r=u(d(g)),r[a]=g,r):u(g)},h(o,function(t,i){u.fn[t]||(u.fn[t]=function(r){var o,a=e.type(r),l="alpha"===t?this._hsla?"hsla":"rgba":n,u=this[l](),d=u[i.idx];return"undefined"===a?d:("function"===a&&(r=r.call(this,d),a=e.type(r)),null==r&&i.empty?this:("string"===a&&(o=s.exec(r),o&&(r=d+parseFloat(o[2])*("+"===o[1]?1:-1))),u[i.idx]=r,this[l](u)))})})}),u.hook=function(t){var i=t.split(" ");h(i,function(t,i){e.cssHooks[i]={set:function(t,r){var o,a,s="";if("transparent"!==r&&("string"!==e.type(r)||(o=n(r)))){if(r=u(o||r),!g.rgba&&1!==r._rgba[3]){for(a="backgroundColor"===i?t.parentNode:t;(""===s||"transparent"===s)&&a&&a.style;)try{s=e.css(a,"backgroundColor"),a=a.parentNode}catch(l){}r=r.blend(s&&"transparent"!==s?s:"_default")}r=r.toRgbaString()}try{t.style[i]=r}catch(l){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=u(t.elem,i),t.end=u(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},u.hook(a),e.cssHooks.borderColor={expand:function(e){var t={};return h(["Top","Right","Bottom","Left"],function(i,n){t["border"+n+"Color"]=e}),t}},o=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),!function(e){function t(){try{var i=this===document?e(this):e(this).contents()}catch(n){return!1}i.mousemove(function(t){e.mlp={x:t.pageX,y:t.pageY}}),i.find("iframe").on("load",t)}e.mlp={x:0,y:0},e(t),e.fn.ismouseover=function(){var t=!1;return this.eq(0).each(function(){var i=e(this).is("iframe")?e(this).contents().find("body"):e(this),n=i.offset();t=n.left<=e.mlp.x&&n.left+i.outerWidth()>e.mlp.x&&n.top<=e.mlp.y&&n.top+i.outerHeight()>e.mlp.y}),t}}(jQuery);var g_ugYoutubeAPI=new UGYoutubeAPI,g_ugVimeoAPI=new UGVimeoAPI,g_ugHtml5MediaAPI=new UGHtml5MediaAPI,g_ugSoundCloudAPI=new UGSoundCloudAPI,g_ugWistiaAPI=new UGWistiaAPI;jQuery.fn.unitegallery=function(e){var t=jQuery(this),i="#"+t.attr("id");if(!e)var e={};var n=new UniteGalleryMain;n.run(i,e);var r=new UG_API(n);return r};
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
