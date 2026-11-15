(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ae.R === region.av.R)
	{
		return 'on line ' + region.ae.R;
	}
	return 'on lines ' + region.ae.R + ' through ' + region.av.R;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bb,
		impl.bl,
		impl.bC,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /(^|:)script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^[\0-\x20\s]*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^[\0-\x20\s]*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' || key == '\x5F_proto_\x5F' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		bo: func(record.bo),
		aq: record.aq,
		ap: record.ap
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.bo;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.aq;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.ap) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bb,
		impl.bl,
		impl.bC,
		function(sendToApp, initialModel) {
			var view = impl.bd;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bb,
		impl.bl,
		impl.bC,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.ad && impl.ad(sendToApp)
			var view = impl.bd;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.a9);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.N) && (_VirtualDom_doc.title = title = doc.N);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bw;
	var onUrlRequest = impl.bx;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		ad: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.a$ === next.a$
							&& curr.az === next.az
							&& curr.aI.a === next.aI.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bb: function(flags)
		{
			return A3(impl.bb, flags, _Browser_getUrl(), key);
		},
		bd: impl.bd,
		bl: impl.bl,
		bC: impl.bC
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bi: 'hidden', bg: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bi: 'mozHidden', bg: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bi: 'msHidden', bg: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bi: 'webkitHidden', bg: 'webkitvisibilitychange' }
		: { bi: 'hidden', bg: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aL: _Browser_getScene(),
		a0: {
			ar: _Browser_window.pageXOffset,
			as: _Browser_window.pageYOffset,
			aM: _Browser_doc.documentElement.clientWidth,
			aN: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aM: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aN: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aL: {
				aM: node.scrollWidth,
				aN: node.scrollHeight
			},
			a0: {
				ar: node.scrollLeft,
				as: node.scrollTop,
				aM: node.clientWidth,
				aN: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aL: _Browser_getScene(),
			a0: {
				ar: x,
				as: y,
				aM: _Browser_doc.documentElement.clientWidth,
				aN: _Browser_doc.documentElement.clientHeight
			},
			bm: {
				ar: x + rect.left,
				as: y + rect.top,
				aM: rect.width,
				aN: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $author$project$SchemaMain$Fold = function (a) {
	return {$: 7, a: a};
};
var $elm$core$Basics$True = 0;
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.c) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.d);
		} else {
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.e) : builder.e;
			var treeLen = builder.c * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.c);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.d);
		}
	});
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{d: tail, e: nodeList, c: (len / $elm$core$Array$branchFactor) | 0});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\u000A    ',
		A2($elm$core$String$split, '\u000A', str));
};
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\u000A\u000A(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\u0027' + (f + '\u0027]'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\u000A\u000A',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\u000A\u000A';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\u000A\u000A    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\u000A\u000A' + msg));
			}
		}
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$DiagramTheme$Theme = function (background) {
	return function (text) {
		return function (participant) {
			return function (participantText) {
				return function (activation) {
					return function (lifeline) {
						return function (activationBorder) {
							return function (font) {
								return function (radius) {
									return function (participantBorder) {
										return {ay: font, T: text, Z: radius, aZ: lifeline, aa: activation, a3: background, a5: participant, a6: participantText, a7: activationBorder, a8: participantBorder};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$DiagramTheme$dark = $author$project$DiagramTheme$Theme('#172321')('#e4f0ea')('#315845')('#ffffff')('#436c57')('#80988c')('#9ccdaf')('mono')(9)('#80988c');
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$SchemaMain$Edit = function (a) {
	return {$: 0, a: a};
};
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$core$String$trim = _String_trim;
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$SchemaMain$Format = {$: 3};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$html$Html$details = _VirtualDom_node('details');
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$SchemaSvg$domAttr = function (attribute) {
	if (!attribute.$) {
		var name = attribute.a;
		var value = attribute.b;
		return A2($elm$html$Html$Attributes$attribute, name, value);
	} else {
		var name = attribute.a;
		var decoder = attribute.b;
		return A2($elm$html$Html$Events$on, name, decoder);
	}
};
var $author$project$SchemaSvg$toDom = function (node) {
	toDom:
	while (true) {
		switch (node.$) {
			case 0:
				var tag = node.a;
				var attrs = node.b;
				var children = node.c;
				return A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					'http://www.w3.org/2000/svg',
					tag,
					A2($elm$core$List$map, $author$project$SchemaSvg$domAttr, attrs),
					A2($elm$core$List$map, $author$project$SchemaSvg$toDom, children));
			case 1:
				var shape = node.b;
				var $temp$node = shape;
				node = $temp$node;
				continue toDom;
			default:
				var value = node.a;
				return $elm$virtual_dom$VirtualDom$text(value);
		}
	}
};
var $author$project$SchemaSvg$Attr = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$SchemaSvg$attr = $author$project$SchemaSvg$Attr;
var $author$project$SchemaSvg$Element = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$SchemaSvg$rect = $author$project$SchemaSvg$Element('rect');
var $author$project$SchemaSvg$root = F3(
	function (attrs, extra, node) {
		if (!node.$) {
			var tag = node.a;
			var original = node.b;
			var children = node.c;
			return A3(
				$author$project$SchemaSvg$Element,
				tag,
				_Utils_ap(original, attrs),
				_Utils_ap(extra, children));
		} else {
			return node;
		}
	});
var $author$project$SchemaSvg$g = $author$project$SchemaSvg$Element('g');
var $author$project$SchemaSvg$svg = $author$project$SchemaSvg$Element('svg');
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$SchemaSvg$hasAttribute = F3(
	function (name, value, node) {
		if (!node.$) {
			var attrs = node.b;
			var children = node.c;
			return A2(
				$elm$core$List$any,
				function (attribute) {
					if (!attribute.$) {
						var attributeName = attribute.a;
						var attributeValue = attribute.b;
						return _Utils_eq(name, attributeName) && _Utils_eq(value, attributeValue);
					} else {
						return false;
					}
				},
				attrs) || A2(
				$elm$core$List$any,
				A2($author$project$SchemaSvg$hasAttribute, name, value),
				children);
		} else {
			return false;
		}
	});
var $author$project$SchemaSvg$hasClass = $author$project$SchemaSvg$hasAttribute('class');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Render$Svg$IRef = function (a) {
	return {$: 8, a: a};
};
var $author$project$SchemaSvg$Card = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$SchemaSvg$card = F2(
	function (anchor, attrs) {
		return A2(
			$author$project$SchemaSvg$Card,
			anchor,
			A2(
				$author$project$SchemaSvg$rect,
				A2(
					$elm$core$List$cons,
					A2($author$project$SchemaSvg$attr, 'class', 'schema-card'),
					attrs),
				_List_Nil));
	});
var $author$project$SchemaSvg$Text = function (a) {
	return {$: 2, a: a};
};
var $author$project$SchemaSvg$text = $author$project$SchemaSvg$Text;
var $author$project$SchemaSvg$text_ = $author$project$SchemaSvg$Element('text');
var $author$project$SchemaMarks$number = F2(
	function (key, value) {
		return A2(
			$author$project$SchemaSvg$attr,
			key,
			$elm$core$String$fromFloat(value));
	});
var $author$project$SchemaMarks$caption = F7(
	function (x, y, size, fill, weight, anchor, value) {
		return A2(
			$author$project$SchemaSvg$text_,
			_List_fromArray(
				[
					A2($author$project$SchemaMarks$number, 'x', x),
					A2($author$project$SchemaMarks$number, 'y', y),
					A2($author$project$SchemaSvg$attr, 'font-size', size),
					A2($author$project$SchemaSvg$attr, 'fill', fill),
					A2($author$project$SchemaSvg$attr, 'font-weight', weight),
					A2($author$project$SchemaSvg$attr, 'text-anchor', anchor)
				]),
			_List_fromArray(
				[
					$author$project$SchemaSvg$text(value)
				]));
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$String$foldl = _String_foldl;
var $author$project$SchemaMarks$measure = F2(
	function (unit, value) {
		return A3(
			$elm$core$String$foldl,
			F2(
				function (_char, width) {
					return width + (($elm$core$Char$toCode(_char) >= 11904) ? (unit * 1.7) : unit);
				}),
			0,
			value);
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$SchemaMarks$card = F3(
	function (height, node, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var foreground = node.ag ? 'var(--schema-iconText)' : 'var(--schema-nodeText)';
		var typeWidth = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					$author$project$SchemaMarks$measure(5.6),
					$elm$core$Basics$add(
						_Utils_eq(node.ac, $elm$core$Maybe$Nothing) ? 0 : 10)),
				node.ab));
		var nameWidth = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				$author$project$SchemaMarks$measure(6.8),
				node.ac));
		var center = y + (height / 2);
		var baseline = center + 3.8;
		var requiredMark = node.al ? _List_fromArray(
			[
				A2(
				$author$project$SchemaSvg$text_,
				_List_fromArray(
					[
						A2($author$project$SchemaSvg$attr, 'class', 'schema-required'),
						A2($author$project$SchemaSvg$attr, 'aria-label', 'Required'),
						A2($author$project$SchemaMarks$number, 'x', (x + 12) + nameWidth),
						A2($author$project$SchemaMarks$number, 'y', baseline - 2),
						A2($author$project$SchemaSvg$attr, 'font-size', '9'),
						A2($author$project$SchemaSvg$attr, 'fill', foreground)
					]),
				_List_fromArray(
					[
						$author$project$SchemaSvg$text('*')
					]))
			]) : _List_Nil;
		var right = x + A2(
			$elm$core$Basics$max,
			56,
			(((10 + nameWidth) + (node.al ? 8 : 0)) + typeWidth) + 17);
		var bounds = _List_fromArray(
			[
				A2($author$project$SchemaMarks$number, 'x', x),
				A2($author$project$SchemaMarks$number, 'y', y),
				A2($author$project$SchemaMarks$number, 'width', right - x),
				A2($author$project$SchemaMarks$number, 'height', height),
				A2($author$project$SchemaSvg$attr, 'rx', '3')
			]);
		var outline = A2(
			$author$project$SchemaSvg$card,
			{aK: right, aP: center, a4: foreground},
			_Utils_ap(
				bounds,
				_Utils_ap(
					_List_fromArray(
						[
							A2($author$project$SchemaSvg$attr, 'fill', 'transparent'),
							A2($author$project$SchemaSvg$attr, 'stroke', 'var(--schema-nodeBorder)'),
							A2($author$project$SchemaSvg$attr, 'stroke-width', '1'),
							A2(
							$author$project$SchemaSvg$attr,
							'stroke-opacity',
							node.ag ? '0.85' : 'var(--schema-outlineOpacity)'),
							A2($author$project$SchemaSvg$attr, 'vector-effect', 'non-scaling-stroke')
						]),
					node.am ? _List_fromArray(
						[
							A2($author$project$SchemaSvg$attr, 'stroke-dasharray', '4 2')
						]) : _List_Nil)));
		var _v1 = function () {
			var _v2 = node.ac;
			if (!_v2.$) {
				var name = _v2.a;
				return _Utils_Tuple3(
					_List_fromArray(
						[
							A7($author$project$SchemaMarks$caption, x + 10, baseline, '11', foreground, node.ah, 'start', name)
						]),
					right - 17,
					'end');
			} else {
				return _Utils_Tuple3(_List_Nil, x + 10, 'start');
			}
		}();
		var nameText = _v1.a;
		var typeX = _v1.b;
		var typeAnchor = _v1.c;
		var typeText = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				$elm$core$List$singleton,
				A2(
					$elm$core$Maybe$map,
					A6(
						$author$project$SchemaMarks$caption,
						typeX,
						baseline,
						'9',
						node.ag ? foreground : 'var(--schema-nodeBorderSubtle)',
						'500',
						typeAnchor),
					node.ab)));
		var tint = node.af ? _List_fromArray(
			[
				A2(
				$author$project$SchemaSvg$rect,
				A2(
					$elm$core$List$cons,
					A2($author$project$SchemaSvg$attr, 'fill', 'var(--schema-branchTint)'),
					A2(
						$elm$core$List$cons,
						A2($author$project$SchemaSvg$attr, 'fill-opacity', 'var(--schema-branchOpacity)'),
						bounds)),
				_List_Nil)
			]) : _List_Nil;
		var fill = node.ag ? 'var(--schema-iconChipBg)' : 'var(--schema-background)';
		return _Utils_Tuple2(
			A2(
				$author$project$SchemaSvg$g,
				_List_Nil,
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$author$project$SchemaSvg$rect,
							A2(
								$elm$core$List$cons,
								A2($author$project$SchemaSvg$attr, 'fill', fill),
								bounds),
							_List_Nil)
						]),
					_Utils_ap(
						tint,
						_Utils_ap(
							nameText,
							_Utils_ap(
								requiredMark,
								_Utils_ap(
									typeText,
									_List_fromArray(
										[outline]))))))),
			_Utils_Tuple2(right, y + height));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$SchemaSvg$hasFold = $author$project$SchemaSvg$hasAttribute('data-fold');
var $author$project$SchemaSvg$path = $author$project$SchemaSvg$Element('path');
var $author$project$SchemaSvg$foldMarker = F2(
	function (collapsed, anchor) {
		return A2(
			$author$project$SchemaSvg$path,
			_List_fromArray(
				[
					A2($author$project$SchemaSvg$attr, 'class', 'schema-fold-marker'),
					A2(
					$author$project$SchemaSvg$attr,
					'transform',
					'translate(' + ($elm$core$String$fromFloat(anchor.aK - 9) + (' ' + ($elm$core$String$fromFloat(anchor.aP) + (')' + (collapsed ? '' : ' rotate(90)')))))),
					A2($author$project$SchemaSvg$attr, 'd', 'M -1.5 -2.75 L 1.5 0 L -1.5 2.75'),
					A2($author$project$SchemaSvg$attr, 'fill', 'none'),
					A2($author$project$SchemaSvg$attr, 'stroke', anchor.a4),
					A2($author$project$SchemaSvg$attr, 'stroke-width', '1.4'),
					A2($author$project$SchemaSvg$attr, 'stroke-linecap', 'round'),
					A2($author$project$SchemaSvg$attr, 'stroke-linejoin', 'round'),
					A2($author$project$SchemaSvg$attr, 'pointer-events', 'none'),
					A2($author$project$SchemaSvg$attr, 'aria-hidden', 'true')
				]),
			_List_Nil);
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$SchemaSvg$cardAnchors = function (node) {
	switch (node.$) {
		case 1:
			var anchor = node.a;
			return _List_fromArray(
				[anchor]);
		case 0:
			var children = node.c;
			return A2($elm$core$List$concatMap, $author$project$SchemaSvg$cardAnchors, children);
		default:
			return _List_Nil;
	}
};
var $author$project$SchemaSvg$fold = F3(
	function (key, collapsed, node) {
		if (A2($author$project$SchemaSvg$hasFold, key, node)) {
			return node;
		} else {
			var name = collapsed ? 'Expand schema node' : 'Collapse schema node';
			return A2(
				$author$project$SchemaSvg$g,
				_List_fromArray(
					[
						A2($author$project$SchemaSvg$attr, 'class', 'schema-fold'),
						A2($author$project$SchemaSvg$attr, 'data-fold', key),
						A2($author$project$SchemaSvg$attr, 'role', 'button'),
						A2($author$project$SchemaSvg$attr, 'tabindex', '0'),
						A2($author$project$SchemaSvg$attr, 'aria-label', name + (' ' + key)),
						A2(
						$author$project$SchemaSvg$attr,
						'aria-expanded',
						collapsed ? 'false' : 'true')
					]),
				A2(
					$elm$core$List$cons,
					node,
					A2(
						$elm$core$List$map,
						$author$project$SchemaSvg$foldMarker(collapsed),
						A2(
							$elm$core$List$take,
							1,
							$author$project$SchemaSvg$cardAnchors(node)))));
		}
	});
var $author$project$Render$Svg$INull = {$: 7};
var $author$project$SchemaSvg$title = function (value) {
	return A3(
		$author$project$SchemaSvg$Element,
		'title',
		_List_Nil,
		_List_fromArray(
			[
				$author$project$SchemaSvg$Text(value)
			]));
};
var $author$project$Render$Svg$IAllOf = {$: 19};
var $author$project$Render$Svg$IAnyOf = {$: 18};
var $author$project$Render$Svg$IOneOf = {$: 17};
var $author$project$Render$Svg$hSpace = 34;
var $author$project$SchemaSvg$hidden = function (node) {
	return A2(
		$author$project$SchemaSvg$g,
		_List_fromArray(
			[
				A2($author$project$SchemaSvg$attr, 'display', 'none')
			]),
		_List_fromArray(
			[node]));
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $author$project$Render$Svg$ySpace = 8;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Render$Svg$halfPill = 11;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$length = _String_length;
var $author$project$Render$Svg$iconLabel = function (icon) {
	switch (icon.$) {
		case 0:
			return 'array';
		case 1:
			return 'object';
		case 2:
			return 'integer';
		case 3:
			return 'string';
		case 4:
			return 'number';
		case 5:
			return 'file';
		case 6:
			return 'boolean';
		case 7:
			return 'null';
		case 8:
			var marker = icon.a;
			return (marker === '↺') ? 'cyclic ref' : 'ref';
		case 9:
			return 'email';
		case 10:
			return 'date-time';
		case 11:
			return 'hostname';
		case 12:
			return 'ipv4';
		case 13:
			return 'ipv6';
		case 14:
			return 'uri';
		case 15:
			var format = icon.a;
			return ($elm$core$String$length(format) > 18) ? (A2($elm$core$String$left, 17, format) + '…') : format;
		case 16:
			return 'enum';
		case 17:
			return 'oneOf';
		case 18:
			return 'anyOf';
		default:
			return 'allOf';
	}
};
var $author$project$Render$Svg$pillHeight = 22;
var $author$project$Render$Svg$IList = {$: 0};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Render$Svg$IObject = {$: 1};
var $author$project$Render$Svg$isBranchIcon = function (icon) {
	if (icon.$ === 8) {
		return true;
	} else {
		return A2(
			$elm$core$List$member,
			icon,
			_List_fromArray(
				[$author$project$Render$Svg$IObject, $author$project$Render$Svg$IList, $author$project$Render$Svg$IOneOf, $author$project$Render$Svg$IAnyOf, $author$project$Render$Svg$IAllOf]));
	}
};
var $author$project$Render$Svg$iconRect = F5(
	function (origin, icon, name, weight, required) {
		var kind = $author$project$Render$Svg$iconLabel(icon);
		return A2(
			$author$project$SchemaMarks$card,
			$author$project$Render$Svg$pillHeight,
			{
				ab: $elm$core$Maybe$Just(kind),
				ac: name,
				af: $author$project$Render$Svg$isBranchIcon(icon),
				ag: origin,
				ah: weight,
				al: required,
				am: function () {
					if (icon.$ === 8) {
						return true;
					} else {
						return false;
					}
				}()
			});
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$Render$Svg$isCollapsed = F3(
	function (config, paths, path) {
		return (config._ && (path === 'root')) ? A2($elm$core$Set$member, path, paths) : (!_Utils_eq(
			config._,
			A2($elm$core$Set$member, path, paths)));
	});
var $author$project$Render$Svg$retainSpace = F3(
	function (config, collapsed, _v0) {
		var svg = _v0.a;
		var dims = _v0.b;
		return (config.x && collapsed) ? _Utils_Tuple2(
			$author$project$SchemaSvg$hidden(svg),
			dims) : _Utils_Tuple2(svg, dims);
	});
var $author$project$Render$Svg$hideChild = F4(
	function (config, paths, path, svg) {
		return A3(
			$author$project$Render$Svg$retainSpace,
			config,
			A3($author$project$Render$Svg$isCollapsed, config, paths, path),
			_Utils_Tuple2(
				svg,
				_Utils_Tuple2(0, 0))).a;
	});
var $author$project$Render$Svg$roundRect = function (label) {
	return A2(
		$author$project$SchemaMarks$card,
		$author$project$Render$Svg$pillHeight,
		{
			ab: $elm$core$Maybe$Nothing,
			ac: $elm$core$Maybe$Just(label),
			af: false,
			ag: false,
			ah: '500',
			al: false,
			am: false
		});
};
var $author$project$Render$Svg$IInt = {$: 2};
var $author$project$Render$Svg$IStr = {$: 3};
var $author$project$Render$Svg$IUri = {$: 14};
var $author$project$Render$Svg$IBool = {$: 6};
var $author$project$Render$Svg$IEnum = {$: 16};
var $author$project$Render$Svg$IIpv4 = {$: 12};
var $author$project$Render$Svg$IIpv6 = {$: 13};
var $author$project$Render$Svg$IEmail = {$: 9};
var $author$project$Render$Svg$IFloat = {$: 4};
var $author$project$Render$Svg$ICustom = function (a) {
	return {$: 15, a: a};
};
var $author$project$Render$Svg$IDateTime = {$: 10};
var $author$project$Render$Svg$IHostname = {$: 11};
var $author$project$Render$Svg$iconForSchema = function (schema) {
	switch (schema.$) {
		case 2:
			var _enum = schema.a.w;
			var format = schema.a.bh;
			if (!_enum.$) {
				return $author$project$Render$Svg$IEnum;
			} else {
				if (!format.$) {
					switch (format.a.$) {
						case 1:
							var _v3 = format.a;
							return $author$project$Render$Svg$IEmail;
						case 0:
							var _v4 = format.a;
							return $author$project$Render$Svg$IDateTime;
						case 2:
							var _v5 = format.a;
							return $author$project$Render$Svg$IHostname;
						case 3:
							var _v6 = format.a;
							return $author$project$Render$Svg$IIpv4;
						case 4:
							var _v7 = format.a;
							return $author$project$Render$Svg$IIpv6;
						case 5:
							var _v8 = format.a;
							return $author$project$Render$Svg$IUri;
						default:
							var s = format.a.a;
							return $author$project$Render$Svg$ICustom(s);
					}
				} else {
					return $author$project$Render$Svg$IStr;
				}
			}
		case 3:
			var _enum = schema.a.w;
			if (!_enum.$) {
				return $author$project$Render$Svg$IEnum;
			} else {
				return $author$project$Render$Svg$IInt;
			}
		case 4:
			var _enum = schema.a.w;
			if (!_enum.$) {
				return $author$project$Render$Svg$IEnum;
			} else {
				return $author$project$Render$Svg$IFloat;
			}
		case 5:
			var _enum = schema.a.w;
			if (!_enum.$) {
				return $author$project$Render$Svg$IEnum;
			} else {
				return $author$project$Render$Svg$IBool;
			}
		case 0:
			return $author$project$Render$Svg$IObject;
		case 1:
			return $author$project$Render$Svg$IList;
		case 6:
			return $author$project$Render$Svg$INull;
		case 7:
			var ref = schema.a.ax;
			return $author$project$Render$Svg$IRef('*');
		case 8:
			return $author$project$Render$Svg$IOneOf;
		case 9:
			return $author$project$Render$Svg$IAnyOf;
		case 10:
			return $author$project$Render$Svg$IAllOf;
		default:
			return $author$project$Render$Svg$INull;
	}
};
var $author$project$Render$Svg$siblingGap = F3(
	function (schemaFor, current, rest) {
		if (rest.b) {
			var next = rest.a;
			return A2(
				$elm$core$List$any,
				A2(
					$elm$core$Basics$composeR,
					schemaFor,
					A2($elm$core$Basics$composeR, $author$project$Render$Svg$iconForSchema, $author$project$Render$Svg$isBranchIcon)),
				_List_fromArray(
					[current, next])) ? 13 : 6;
		} else {
			return $author$project$Render$Svg$ySpace;
		}
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$SchemaSvg$circle = $author$project$SchemaSvg$Element('circle');
var $author$project$SchemaMarks$connector = F3(
	function (square, d, _v0) {
		var endX = _v0.a;
		var endY = _v0.b;
		return A2(
			$author$project$SchemaSvg$g,
			_List_fromArray(
				[
					A2($author$project$SchemaSvg$attr, 'class', 'schema-connection'),
					A2($author$project$SchemaSvg$attr, 'aria-hidden', 'true')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$SchemaSvg$path,
					_List_fromArray(
						[
							A2($author$project$SchemaSvg$attr, 'd', d),
							A2($author$project$SchemaSvg$attr, 'fill', 'none'),
							A2($author$project$SchemaSvg$attr, 'stroke', 'var(--schema-connector)'),
							A2($author$project$SchemaSvg$attr, 'stroke-width', '0.85'),
							A2($author$project$SchemaSvg$attr, 'vector-effect', 'non-scaling-stroke'),
							A2($author$project$SchemaSvg$attr, 'stroke-opacity', '0.72')
						]),
					_List_Nil),
					square ? A2(
					$author$project$SchemaSvg$rect,
					_List_fromArray(
						[
							A2($author$project$SchemaMarks$number, 'x', endX - 2),
							A2($author$project$SchemaMarks$number, 'y', endY - 1),
							A2($author$project$SchemaMarks$number, 'width', 2),
							A2($author$project$SchemaMarks$number, 'height', 2),
							A2($author$project$SchemaSvg$attr, 'fill', 'var(--schema-connector)')
						]),
					_List_Nil) : A2(
					$author$project$SchemaSvg$circle,
					_List_fromArray(
						[
							A2($author$project$SchemaMarks$number, 'cx', endX - 1.15),
							A2($author$project$SchemaMarks$number, 'cy', endY),
							A2($author$project$SchemaMarks$number, 'r', 1.15),
							A2($author$project$SchemaSvg$attr, 'fill', 'var(--schema-connector)')
						]),
					_List_Nil)
				]));
	});
var $author$project$SchemaMarks$point = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return $elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y));
};
var $author$project$SchemaMarks$curve = F3(
	function (square, start, end) {
		var startX = start.a;
		var startY = start.b;
		var endX = end.a;
		var endY = end.b;
		var mid = (startX + endX) / 2;
		return 'M ' + ($author$project$SchemaMarks$point(start) + (square ? (' H ' + ($elm$core$String$fromFloat(mid) + (' V ' + ($elm$core$String$fromFloat(endY) + (' H ' + $elm$core$String$fromFloat(endX)))))) : (' C ' + ($author$project$SchemaMarks$point(
			_Utils_Tuple2(mid, startY)) + (' ' + ($author$project$SchemaMarks$point(
			_Utils_Tuple2(mid, endY)) + (' ' + $author$project$SchemaMarks$point(end))))))));
	});
var $author$project$Render$Svg$connectorPathD = $author$project$SchemaMarks$curve;
var $author$project$Render$Svg$connectorPath = F3(
	function (square, start, end) {
		return A3(
			$author$project$SchemaMarks$connector,
			square,
			A3($author$project$Render$Svg$connectorPathD, square, start, end),
			end);
	});
var $author$project$Render$Svg$isCircularRef = F2(
	function (visited, ref) {
		return A2($elm$core$Set$member, ref, visited);
	});
var $author$project$Render$Svg$clickableGroup = F3(
	function (path, collapsed, _v0) {
		var svg = _v0.a;
		var dims = _v0.b;
		return _Utils_Tuple2(
			A3($author$project$SchemaSvg$fold, path, collapsed, svg),
			dims);
	});
var $author$project$Render$Svg$combinatorIcon = function (kind) {
	switch (kind) {
		case 0:
			return $author$project$Render$Svg$IOneOf;
		case 1:
			return $author$project$Render$Svg$IAnyOf;
		default:
			return $author$project$Render$Svg$IAllOf;
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Render$Svg$extractRefName = function (ref) {
	return A2(
		$elm$core$Maybe$withDefault,
		ref,
		$elm$core$List$head(
			$elm$core$List$reverse(
				A2($elm$core$String$split, '/', ref))));
};
var $author$project$Render$Svg$propertySchema = function (property) {
	if (!property.$) {
		var schema = property.b;
		return schema;
	} else {
		var schema = property.b;
		return schema;
	}
};
var $author$project$SchemaSvg$Event = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$SchemaSvg$on = $author$project$SchemaSvg$Event;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Render$Svg$hasMetadata = function (meta) {
	return (!_Utils_eq(meta.a, $elm$core$Maybe$Nothing)) || ((!$elm$core$List$isEmpty(meta.g)) || ((!_Utils_eq(meta.i, $elm$core$Maybe$Nothing)) || (!_Utils_eq(meta.h, $elm$core$Maybe$Nothing))));
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Render$Svg$truncatePattern = function (s) {
	return ($elm$core$String$length(s) > 40) ? (A2($elm$core$String$left, 40, s) + '\u2026') : s;
};
var $author$project$Render$Svg$metaForSchema = F2(
	function (schema, icon) {
		switch (schema.$) {
			case 2:
				var _enum = schema.a.w;
				var pattern = schema.a.bp;
				var maxLength = schema.a.bs;
				var minLength = schema.a.bt;
				var description = schema.a.a;
				var constraints = A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'minLen',
									$elm$core$String$fromInt(v));
							},
							minLength),
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'maxLen',
									$elm$core$String$fromInt(v));
							},
							maxLength),
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'pattern',
									$author$project$Render$Svg$truncatePattern(v));
							},
							pattern)
						]));
				var enumStrs = _enum;
				var baseType = function () {
					if (icon.$ === 16) {
						return $elm$core$Maybe$Just('string');
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return {h: baseType, i: enumStrs, g: constraints, a: description};
			case 3:
				var _enum = schema.a.w;
				var maximum = schema.a.aT;
				var minimum = schema.a.aU;
				var description = schema.a.a;
				var constraints = A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'min',
									$elm$core$String$fromInt(v));
							},
							minimum),
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'max',
									$elm$core$String$fromInt(v));
							},
							maximum)
						]));
				var enumStrs = A2(
					$elm$core$Maybe$map,
					$elm$core$List$map($elm$core$String$fromInt),
					_enum);
				return {
					h: function () {
						if (icon.$ === 16) {
							return $elm$core$Maybe$Just('integer');
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}(),
					i: enumStrs,
					g: constraints,
					a: description
				};
			case 4:
				var _enum = schema.a.w;
				var maximum = schema.a.aT;
				var minimum = schema.a.aU;
				var description = schema.a.a;
				var constraints = A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'min',
									$elm$core$String$fromFloat(v));
							},
							minimum),
							A2(
							$elm$core$Maybe$map,
							function (v) {
								return _Utils_Tuple2(
									'max',
									$elm$core$String$fromFloat(v));
							},
							maximum)
						]));
				var enumStrs = A2(
					$elm$core$Maybe$map,
					$elm$core$List$map($elm$core$String$fromFloat),
					_enum);
				return {
					h: function () {
						if (icon.$ === 16) {
							return $elm$core$Maybe$Just('number');
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}(),
					i: enumStrs,
					g: constraints,
					a: description
				};
			case 5:
				var _enum = schema.a.w;
				var description = schema.a.a;
				var boolToStr = function (b) {
					return b ? 'true' : 'false';
				};
				var enumStrs = A2(
					$elm$core$Maybe$map,
					$elm$core$List$map(boolToStr),
					_enum);
				return {
					h: function () {
						if (icon.$ === 16) {
							return $elm$core$Maybe$Just('boolean');
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}(),
					i: enumStrs,
					g: _List_Nil,
					a: description
				};
			case 0:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			case 1:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			case 6:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			case 7:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			case 8:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			case 9:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			case 10:
				var description = schema.a.a;
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: description};
			default:
				return {h: $elm$core$Maybe$Nothing, i: $elm$core$Maybe$Nothing, g: _List_Nil, a: $elm$core$Maybe$Nothing};
		}
	});
var $author$project$Render$Svg$withHoverEvents = F6(
	function (config, path, schema, icon, _v0, _v1) {
		var ox = _v0.a;
		var oy = _v0.b;
		var svg = _v1.a;
		var _v2 = _v1.b;
		var w = _v2.a;
		var h = _v2.b;
		var meta = A2($author$project$Render$Svg$metaForSchema, schema, icon);
		if (!$author$project$Render$Svg$hasMetadata(meta)) {
			return _Utils_Tuple2(
				svg,
				_Utils_Tuple2(w, h));
		} else {
			var hoverDecoder = A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (cx, cy) {
						return config.aj(
							{aA: meta, aB: path, aR: cx, aS: cy});
					}),
				A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
				A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float));
			var hoverAttrs = _List_fromArray(
				[
					A2($author$project$SchemaSvg$on, 'mouseenter', hoverDecoder),
					A2(
					$author$project$SchemaSvg$on,
					'mouseleave',
					$elm$json$Json$Decode$succeed(config.ao))
				]);
			return _Utils_Tuple2(
				A2(
					$author$project$SchemaSvg$g,
					hoverAttrs,
					_List_fromArray(
						[
							$author$project$SchemaSvg$title(
							A2(
								$elm$core$String$join,
								'\u000A',
								A2(
									$elm$core$List$cons,
									A2($elm$core$Maybe$withDefault, '', meta.a),
									A2(
										$elm$core$List$map,
										function (_v3) {
											var key = _v3.a;
											var val = _v3.b;
											return key + (': ' + val);
										},
										meta.g)))),
							svg
						])),
				_Utils_Tuple2(w, h));
		}
	});
var $author$project$Render$Svg$toSvgCoordsTuple = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	return _Utils_Tuple2(
		A2($author$project$SchemaSvg$g, _List_Nil, a),
		b);
};
var $author$project$Render$Svg$preserveChildren = F3(
	function (config, collapsed, _v0) {
		var nodes = _v0.a;
		var dims = _v0.b;
		if (nodes.b) {
			var head = nodes.a;
			var tail = nodes.b;
			return $author$project$Render$Svg$toSvgCoordsTuple(
				_Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						head,
						A2(
							$elm$core$List$map,
							function (node) {
								return A3(
									$author$project$Render$Svg$retainSpace,
									config,
									collapsed,
									_Utils_Tuple2(node, dims)).a;
							},
							tail)),
					dims));
		} else {
			return $author$project$Render$Svg$toSvgCoordsTuple(
				_Utils_Tuple2(nodes, dims));
		}
	});
var $author$project$Render$Svg$verticalChildIndent = $author$project$Render$Svg$hSpace;
var $author$project$Render$Svg$verticalTrunkOffset = $author$project$Render$Svg$halfPill;
var $author$project$Render$Svg$fontWeightForRequired = function (isRequired) {
	return isRequired ? '700' : '400';
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$SchemaMarks$downThenRight = F3(
	function (square, start, end) {
		var startX = start.a;
		var startY = start.b;
		var endX = end.a;
		var endY = end.b;
		var bend = A2(
			$elm$core$Basics$min,
			$elm$core$Basics$abs(endY - startY),
			$elm$core$Basics$abs(endX - startX)) / 2;
		var turn = square ? (' V ' + $elm$core$String$fromFloat(endY)) : (' V ' + ($elm$core$String$fromFloat(endY - bend) + (' Q ' + ($author$project$SchemaMarks$point(
			_Utils_Tuple2(startX, endY)) + (' ' + $author$project$SchemaMarks$point(
			_Utils_Tuple2(startX + bend, endY)))))));
		return A3(
			$author$project$SchemaMarks$connector,
			square,
			'M ' + ($author$project$SchemaMarks$point(start) + (turn + (' H ' + $elm$core$String$fromFloat(endX)))),
			end);
	});
var $author$project$Render$Svg$connectorDownThenRight = $author$project$SchemaMarks$downThenRight;
var $elm$core$String$contains = _String_contains;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$startsWith = _String_startsWith;
var $author$project$Render$Svg$isPathItemPath = F2(
	function (section, path) {
		var prefix = 'root.properties.' + (section + '.properties.');
		if (A2($elm$core$String$startsWith, prefix, path)) {
			var suffix = A2(
				$elm$core$String$dropLeft,
				$elm$core$String$length(prefix),
				path);
			return (!$elm$core$String$isEmpty(suffix)) && (!A2($elm$core$String$contains, '.properties.', suffix));
		} else {
			return false;
		}
	});
var $author$project$Render$Svg$oasVerticalSections = _List_fromArray(
	['Paths', 'Webhooks', 'Schemas', 'Parameters', 'Request Bodies', 'Responses', 'Headers', 'Security Schemes', 'Examples', 'Links', 'Callbacks']);
var $author$project$Render$Svg$shouldRenderChildrenBelow = function (path) {
	var isSection = function (section) {
		return _Utils_eq(path, 'root.properties.' + section);
	};
	return A2($elm$core$List$any, isSection, $author$project$Render$Svg$oasVerticalSections) || A2(
		$elm$core$List$any,
		function (section) {
			return A2($author$project$Render$Svg$isPathItemPath, section, path);
		},
		$author$project$Render$Svg$oasVerticalSections);
};
var $author$project$Render$Svg$viewItems = F9(
	function (visited, defs, collapsedNodes, config, path, parentRightX, parentY, coords, items) {
		var viewItems_ = F3(
			function (idx, coords_, elms) {
				var x = coords_.a;
				var y = coords_.b;
				if (!elms.b) {
					return _Utils_Tuple3(_List_Nil, coords_, x);
				} else {
					var element = elms.a;
					var elements = elms.b;
					var connector = A3(
						$author$project$Render$Svg$connectorPath,
						config.s,
						_Utils_Tuple2(parentRightX, parentY + $author$project$Render$Svg$halfPill),
						_Utils_Tuple2(x, y + $author$project$Render$Svg$halfPill));
					var itemPath = path + ('.' + $elm$core$String$fromInt(idx));
					var _v54 = A7($author$project$Render$Svg$viewArrayItem, visited, defs, collapsedNodes, config, itemPath, coords_, element);
					var g_ = _v54.a;
					var _v55 = _v54.b;
					var w1 = _v55.a;
					var h1 = _v55.b;
					var _v56 = A3(
						viewItems_,
						idx + 1,
						_Utils_Tuple2(
							x,
							h1 + A3($author$project$Render$Svg$siblingGap, $elm$core$Basics$identity, element, elements)),
						elements);
					var gs = _v56.a;
					var _v57 = _v56.b;
					var w2 = _v57.a;
					var h2 = _v57.b;
					var w3 = _v56.c;
					var maxW = A3(
						$elm$core$List$foldl,
						$elm$core$Basics$max,
						w1,
						_List_fromArray(
							[w1, w2, w3]));
					return _Utils_Tuple3(
						A2(
							$elm$core$List$cons,
							connector,
							A2($elm$core$List$cons, g_, gs)),
						_Utils_Tuple2(x, h2),
						maxW);
				}
			});
		var _v58 = A3(viewItems_, 0, coords, items);
		var g = _v58.a;
		var _v59 = _v58.b;
		var h = _v59.b;
		var w = _v58.c;
		return _Utils_Tuple2(
			g,
			_Utils_Tuple2(w, h));
	});
var $author$project$Render$Svg$viewMulti = function (visited) {
	return function (defs) {
		return function (collapsedNodes) {
			return function (config) {
				return function (path) {
					return function (_v49) {
						return function (icon) {
							return function (name) {
								return function (weight) {
									return function (isRequired) {
										return function (schemas) {
											var x = _v49.a;
											var y = _v49.b;
											var _v50 = A3(
												$author$project$Render$Svg$clickableGroup,
												path,
												A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
												A6(
													$author$project$Render$Svg$iconRect,
													path === 'root',
													icon,
													name,
													weight,
													isRequired,
													_Utils_Tuple2(x, y)));
											var choiceGraph = _v50.a;
											var _v51 = _v50.b;
											var w = _v51.a;
											var h = _v51.b;
											if (A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path) && (!config.x)) {
												return _Utils_Tuple2(
													choiceGraph,
													_Utils_Tuple2(w, h));
											} else {
												var _v52 = A9(
													$author$project$Render$Svg$viewItems,
													visited,
													defs,
													collapsedNodes,
													config,
													path,
													w,
													y,
													_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, y),
													schemas);
												var subSchemaGraphs = _v52.a;
												var newCoords = _v52.b;
												var allOfGraph = A2($elm$core$List$cons, choiceGraph, subSchemaGraphs);
												return A3(
													$author$project$Render$Svg$preserveChildren,
													config,
													A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
													_Utils_Tuple2(allOfGraph, newCoords));
											}
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Render$Svg$viewSchema = function (visited) {
	return function (defs) {
		return function (collapsedNodes) {
			return function (config) {
				return function (path) {
					return function (coords) {
						return function (name) {
							return function (weight) {
								return function (isRequired) {
									return function (schema) {
										var x = coords.a;
										var y = coords.b;
										switch (schema.$) {
											case 0:
												var combinator = schema.a.I;
												var properties = schema.a.bu;
												var title = schema.a.N;
												var icon = $author$project$Render$Svg$iconForSchema(schema);
												var _v25 = A3(
													$author$project$Render$Svg$clickableGroup,
													path,
													A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
													A6(
														$author$project$Render$Svg$withHoverEvents,
														config,
														path,
														schema,
														icon,
														coords,
														A6($author$project$Render$Svg$iconRect, path === 'root', icon, name, weight, isRequired, coords)));
												var objectGraph = _v25.a;
												var _v26 = _v25.b;
												var w = _v26.a;
												var h = _v26.b;
												if (A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path) && (!config.x)) {
													return _Utils_Tuple2(
														objectGraph,
														_Utils_Tuple2(w, h));
												} else {
													if ($author$project$Render$Svg$shouldRenderChildrenBelow(path) && _Utils_eq(combinator, $elm$core$Maybe$Nothing)) {
														var childStart = _Utils_Tuple2(x + $author$project$Render$Svg$verticalChildIndent, h + $author$project$Render$Svg$ySpace);
														var trunkX = x + $author$project$Render$Svg$verticalTrunkOffset;
														var _v27 = A9($author$project$Render$Svg$viewPropertiesBelow, visited, defs, collapsedNodes, config, path, trunkX, h, childStart, properties);
														var propertiesGraphs = _v27.a;
														var _v28 = _v27.b;
														var pw = _v28.a;
														var ph = _v28.b;
														return $author$project$Render$Svg$toSvgCoordsTuple(
															_Utils_Tuple2(
																A2(
																	$elm$core$List$cons,
																	objectGraph,
																	A2(
																		$elm$core$List$map,
																		A3($author$project$Render$Svg$hideChild, config, collapsedNodes, path),
																		propertiesGraphs)),
																_Utils_Tuple2(
																	A2($elm$core$Basics$max, w, pw),
																	A2($elm$core$Basics$max, h, ph))));
													} else {
														var _v29 = A9(
															$author$project$Render$Svg$viewProperties,
															visited,
															defs,
															collapsedNodes,
															config,
															path,
															w,
															y,
															_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, y),
															properties);
														var propertiesGraphs = _v29.a;
														var _v30 = _v29.b;
														var pw = _v30.a;
														var ph = _v30.b;
														var _v31 = function () {
															if (combinator.$ === 1) {
																return _Utils_Tuple2(
																	A2(
																		$elm$core$List$cons,
																		objectGraph,
																		A2(
																			$elm$core$List$map,
																			A3($author$project$Render$Svg$hideChild, config, collapsedNodes, path),
																			propertiesGraphs)),
																	_Utils_Tuple2(
																		pw,
																		A2($elm$core$Basics$max, h, ph)));
															} else {
																var _v33 = combinator.a;
																var kind = _v33.a;
																var subSchemas = _v33.b;
																var combStartY = $elm$core$List$isEmpty(properties) ? y : (ph + $author$project$Render$Svg$ySpace);
																var combConnector = A3(
																	$author$project$Render$Svg$connectorPath,
																	config.s,
																	_Utils_Tuple2(w, y + $author$project$Render$Svg$halfPill),
																	_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, combStartY + $author$project$Render$Svg$halfPill));
																var combPath = path + '.combinator';
																var _v34 = $author$project$Render$Svg$viewMulti(visited)(defs)(collapsedNodes)(config)(combPath)(
																	_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, combStartY))(
																	$author$project$Render$Svg$combinatorIcon(kind))($elm$core$Maybe$Nothing)('500')(false)(subSchemas);
																var combGraph = _v34.a;
																var _v35 = _v34.b;
																var cw = _v35.a;
																var ch = _v35.b;
																return _Utils_Tuple2(
																	A2(
																		$elm$core$List$cons,
																		objectGraph,
																		_Utils_ap(
																			propertiesGraphs,
																			_List_fromArray(
																				[combConnector, combGraph]))),
																	_Utils_Tuple2(
																		A2($elm$core$Basics$max, pw, cw),
																		A2(
																			$elm$core$Basics$max,
																			A2($elm$core$Basics$max, h, ph),
																			ch)));
															}
														}();
														var allGraphs = _v31.a;
														var finalDims = _v31.b;
														return A3(
															$author$project$Render$Svg$preserveChildren,
															config,
															A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
															_Utils_Tuple2(allGraphs, finalDims));
													}
												}
											case 1:
												var combinator = schema.a.I;
												var items = schema.a.bf;
												var title = schema.a.N;
												var icon = $author$project$Render$Svg$iconForSchema(schema);
												var _v36 = A3(
													$author$project$Render$Svg$clickableGroup,
													path,
													A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
													A6(
														$author$project$Render$Svg$withHoverEvents,
														config,
														path,
														schema,
														icon,
														coords,
														A6($author$project$Render$Svg$iconRect, path === 'root', icon, name, weight, isRequired, coords)));
												var arrayGraph = _v36.a;
												var _v37 = _v36.b;
												var w = _v37.a;
												var h = _v37.b;
												if (A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path) && (!config.x)) {
													return _Utils_Tuple2(
														arrayGraph,
														_Utils_Tuple2(w, h));
												} else {
													var itemConnector = A3(
														$author$project$Render$Svg$connectorPath,
														config.s,
														_Utils_Tuple2(w, y + $author$project$Render$Svg$halfPill),
														_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, y + $author$project$Render$Svg$halfPill));
													var _v38 = function () {
														if (items.$ === 1) {
															return A2(
																$author$project$Render$Svg$roundRect,
																'*',
																_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, y));
														} else {
															var items_ = items.a;
															return $author$project$Render$Svg$viewSchema(visited)(defs)(collapsedNodes)(config)(path + '.items')(
																_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, y))($elm$core$Maybe$Nothing)('700')(false)(items_);
														}
													}();
													var itemsGraph = _v38.a;
													var _v39 = _v38.b;
													var iw = _v39.a;
													var ih = _v39.b;
													var _v41 = function () {
														if (combinator.$ === 1) {
															return _Utils_Tuple2(
																_List_fromArray(
																	[arrayGraph, itemConnector, itemsGraph]),
																_Utils_Tuple2(
																	iw,
																	A2($elm$core$Basics$max, h, ih)));
														} else {
															var _v43 = combinator.a;
															var kind = _v43.a;
															var subSchemas = _v43.b;
															var combStartY = ih + $author$project$Render$Svg$ySpace;
															var combConnector = A3(
																$author$project$Render$Svg$connectorPath,
																config.s,
																_Utils_Tuple2(w, y + $author$project$Render$Svg$halfPill),
																_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, combStartY + $author$project$Render$Svg$halfPill));
															var combPath = path + '.combinator';
															var _v44 = $author$project$Render$Svg$viewMulti(visited)(defs)(collapsedNodes)(config)(combPath)(
																_Utils_Tuple2(w + $author$project$Render$Svg$hSpace, combStartY))(
																$author$project$Render$Svg$combinatorIcon(kind))($elm$core$Maybe$Nothing)('500')(false)(subSchemas);
															var combGraph = _v44.a;
															var _v45 = _v44.b;
															var cw = _v45.a;
															var ch = _v45.b;
															return _Utils_Tuple2(
																_List_fromArray(
																	[arrayGraph, itemConnector, itemsGraph, combConnector, combGraph]),
																_Utils_Tuple2(
																	A2($elm$core$Basics$max, iw, cw),
																	A2(
																		$elm$core$Basics$max,
																		A2($elm$core$Basics$max, h, ih),
																		ch)));
														}
													}();
													var allGraphs = _v41.a;
													var finalDims = _v41.b;
													return A3(
														$author$project$Render$Svg$preserveChildren,
														config,
														A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
														_Utils_Tuple2(allGraphs, finalDims));
												}
											case 2:
												var stringSchema = schema.a;
												var icon = $author$project$Render$Svg$iconForSchema(schema);
												return A8(
													$author$project$Render$Svg$withCombinator,
													visited,
													defs,
													collapsedNodes,
													config,
													path,
													y,
													stringSchema.I,
													A6(
														$author$project$Render$Svg$withHoverEvents,
														config,
														path,
														schema,
														icon,
														coords,
														A6($author$project$Render$Svg$iconRect, path === 'root', icon, name, weight, isRequired, coords)));
											case 3:
												var intSchema = schema.a;
												var icon = $author$project$Render$Svg$iconForSchema(schema);
												return A8(
													$author$project$Render$Svg$withCombinator,
													visited,
													defs,
													collapsedNodes,
													config,
													path,
													y,
													intSchema.I,
													A6(
														$author$project$Render$Svg$withHoverEvents,
														config,
														path,
														schema,
														icon,
														coords,
														A6($author$project$Render$Svg$iconRect, path === 'root', icon, name, weight, isRequired, coords)));
											case 4:
												var numSchema = schema.a;
												var icon = $author$project$Render$Svg$iconForSchema(schema);
												return A8(
													$author$project$Render$Svg$withCombinator,
													visited,
													defs,
													collapsedNodes,
													config,
													path,
													y,
													numSchema.I,
													A6(
														$author$project$Render$Svg$withHoverEvents,
														config,
														path,
														schema,
														icon,
														coords,
														A6($author$project$Render$Svg$iconRect, path === 'root', icon, name, weight, isRequired, coords)));
											case 5:
												var boolSchema = schema.a;
												var icon = $author$project$Render$Svg$iconForSchema(schema);
												return A8(
													$author$project$Render$Svg$withCombinator,
													visited,
													defs,
													collapsedNodes,
													config,
													path,
													y,
													boolSchema.I,
													A6(
														$author$project$Render$Svg$withHoverEvents,
														config,
														path,
														schema,
														icon,
														coords,
														A6($author$project$Render$Svg$iconRect, path === 'root', icon, name, weight, isRequired, coords)));
											case 6:
												var nullSchema = schema.a;
												return A8(
													$author$project$Render$Svg$withCombinator,
													visited,
													defs,
													collapsedNodes,
													config,
													path,
													y,
													nullSchema.I,
													A6($author$project$Render$Svg$iconRect, path === 'root', $author$project$Render$Svg$INull, name, weight, isRequired, coords));
											case 7:
												var ref = schema.a.ax;
												var title = schema.a.N;
												var isCycle = A2($author$project$Render$Svg$isCircularRef, visited, ref);
												var defName = A2(
													$elm$core$Maybe$withDefault,
													$author$project$Render$Svg$extractRefName(ref),
													name);
												if (isCycle) {
													return A6(
														$author$project$Render$Svg$iconRect,
														path === 'root',
														$author$project$Render$Svg$IRef('↺'),
														$elm$core$Maybe$Just(defName),
														weight,
														isRequired,
														_Utils_Tuple2(x, y));
												} else {
													if (A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path) && ((!config.x) && A2($elm$core$Dict$member, ref, defs))) {
														return A3(
															$author$project$Render$Svg$clickableGroup,
															path,
															A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path),
															A2(
																$elm$core$Tuple$mapFirst,
																function (node) {
																	return A2(
																		$author$project$SchemaSvg$g,
																		_List_Nil,
																		_List_fromArray(
																			[
																				$author$project$SchemaSvg$title(ref),
																				node
																			]));
																},
																A6(
																	$author$project$Render$Svg$iconRect,
																	path === 'root',
																	$author$project$Render$Svg$IRef('↗'),
																	$elm$core$Maybe$Just(defName),
																	weight,
																	isRequired,
																	_Utils_Tuple2(x, y))));
													} else {
														var _v46 = A2($elm$core$Dict$get, ref, defs);
														if (_v46.$ === 1) {
															return A2(
																$elm$core$Tuple$mapFirst,
																function (node) {
																	return A2(
																		$author$project$SchemaSvg$g,
																		_List_Nil,
																		_List_fromArray(
																			[
																				$author$project$SchemaSvg$title(ref),
																				node
																			]));
																},
																A6(
																	$author$project$Render$Svg$iconRect,
																	path === 'root',
																	$author$project$Render$Svg$IRef('↗'),
																	$elm$core$Maybe$Just(defName),
																	weight,
																	isRequired,
																	_Utils_Tuple2(x, y)));
														} else {
															var defSchema = _v46.a;
															var collapsed = A3($author$project$Render$Svg$isCollapsed, config, collapsedNodes, path);
															var _v47 = A6(
																$author$project$Render$Svg$iconRect,
																path === 'root',
																$author$project$Render$Svg$IRef('↗'),
																$elm$core$Maybe$Just(defName),
																weight,
																isRequired,
																_Utils_Tuple2(x, y));
															var pill = _v47.a;
															var _v48 = $author$project$Render$Svg$viewSchema(
																A2($elm$core$Set$insert, ref, visited))(defs)(collapsedNodes)(config)(path)(
																_Utils_Tuple2(x, y))(
																$elm$core$Maybe$Just(defName))(weight)(isRequired)(defSchema);
															var expanded = _v48.a;
															var dims = _v48.b;
															return (config.x && collapsed) ? _Utils_Tuple2(
																A2(
																	$author$project$SchemaSvg$g,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$author$project$SchemaSvg$hidden(expanded),
																			A3(
																			$author$project$SchemaSvg$fold,
																			path,
																			true,
																			A2(
																				$author$project$SchemaSvg$g,
																				_List_Nil,
																				_List_fromArray(
																					[
																						$author$project$SchemaSvg$title(ref),
																						pill
																					])))
																		])),
																dims) : A3(
																$author$project$Render$Svg$clickableGroup,
																path,
																false,
																_Utils_Tuple2(expanded, dims));
														}
													}
												}
											case 8:
												var subSchemas = schema.a.an;
												var title = schema.a.N;
												return $author$project$Render$Svg$viewMulti(visited)(defs)(collapsedNodes)(config)(path)(
													_Utils_Tuple2(x, y))($author$project$Render$Svg$IOneOf)(name)(weight)(isRequired)(subSchemas);
											case 9:
												var subSchemas = schema.a.an;
												var title = schema.a.N;
												return $author$project$Render$Svg$viewMulti(visited)(defs)(collapsedNodes)(config)(path)(
													_Utils_Tuple2(x, y))($author$project$Render$Svg$IAnyOf)(name)(weight)(isRequired)(subSchemas);
											case 10:
												var subSchemas = schema.a.an;
												var title = schema.a.N;
												return $author$project$Render$Svg$viewMulti(visited)(defs)(collapsedNodes)(config)(path)(
													_Utils_Tuple2(x, y))($author$project$Render$Svg$IAllOf)(name)(weight)(isRequired)(subSchemas);
											default:
												var value = schema.a;
												var description = A2(
													$elm$core$Result$withDefault,
													'',
													A2(
														$elm$json$Json$Decode$decodeValue,
														A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string),
														value));
												return A2(
													$elm$core$Tuple$mapFirst,
													function (node) {
														return A2(
															$author$project$SchemaSvg$g,
															_List_Nil,
															_List_fromArray(
																[
																	$author$project$SchemaSvg$title(description),
																	node
																]));
													},
													A3(
														$author$project$SchemaMarks$card,
														$author$project$Render$Svg$pillHeight,
														{
															ab: $elm$core$Maybe$Just('schema'),
															ac: name,
															af: false,
															ag: path === 'root',
															ah: weight,
															al: isRequired,
															am: false
														},
														coords));
										}
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Render$Svg$viewProperty = F7(
	function (visited, defs, collapsedNodes, config, path, coords, objectProperty) {
		var _v21 = function () {
			if (!objectProperty.$) {
				var name_ = objectProperty.a;
				var property_ = objectProperty.b;
				return _Utils_Tuple3(name_, property_, true);
			} else {
				var name_ = objectProperty.a;
				var property_ = objectProperty.b;
				return _Utils_Tuple3(name_, property_, false);
			}
		}();
		var name = _v21.a;
		var property = _v21.b;
		var isRequired = _v21.c;
		var weight = $author$project$Render$Svg$fontWeightForRequired(isRequired);
		var childPath = path + ('.properties.' + name);
		var _v23 = $author$project$Render$Svg$viewSchema(visited)(defs)(collapsedNodes)(config)(childPath)(coords)(
			$elm$core$Maybe$Just(name))(weight)(isRequired)(property);
		var schemaGraph = _v23.a;
		var newCoords = _v23.b;
		return _Utils_Tuple2(
			A2(
				$author$project$SchemaSvg$g,
				_List_Nil,
				_List_fromArray(
					[schemaGraph])),
			newCoords);
	});
var $author$project$Render$Svg$viewArrayItem = F7(
	function (visited, defs, collapsedNodes, config, path, coords, schema) {
		var _v20 = $author$project$Render$Svg$viewSchema(visited)(defs)(collapsedNodes)(config)(path)(coords)($elm$core$Maybe$Nothing)('700')(false)(schema);
		var schemaGraph = _v20.a;
		var newCoords = _v20.b;
		return _Utils_Tuple2(
			A2(
				$author$project$SchemaSvg$g,
				_List_Nil,
				_List_fromArray(
					[schemaGraph])),
			newCoords);
	});
var $author$project$Render$Svg$viewProperties = F9(
	function (visited, defs, collapsedNodes, config, path, parentRightX, parentY, coords, props) {
		var viewProps = F2(
			function (coords_, elms) {
				var x = coords_.a;
				var y = coords_.b;
				if (!elms.b) {
					return _Utils_Tuple3(_List_Nil, coords_, x);
				} else {
					var element = elms.a;
					var elements = elms.b;
					var connector = A3(
						$author$project$Render$Svg$connectorPath,
						config.s,
						_Utils_Tuple2(parentRightX, parentY + $author$project$Render$Svg$halfPill),
						_Utils_Tuple2(x, y + $author$project$Render$Svg$halfPill));
					var _v14 = A7($author$project$Render$Svg$viewProperty, visited, defs, collapsedNodes, config, path, coords_, element);
					var g_ = _v14.a;
					var _v15 = _v14.b;
					var w1 = _v15.a;
					var h1 = _v15.b;
					var _v16 = A2(
						viewProps,
						_Utils_Tuple2(
							x,
							h1 + A3($author$project$Render$Svg$siblingGap, $author$project$Render$Svg$propertySchema, element, elements)),
						elements);
					var gs = _v16.a;
					var _v17 = _v16.b;
					var w2 = _v17.a;
					var h2 = _v17.b;
					var w3 = _v16.c;
					var maxW = A3(
						$elm$core$List$foldl,
						$elm$core$Basics$max,
						w1,
						_List_fromArray(
							[w1, w2, w3]));
					return _Utils_Tuple3(
						A2(
							$elm$core$List$cons,
							connector,
							A2($elm$core$List$cons, g_, gs)),
						_Utils_Tuple2(x, h2),
						maxW);
				}
			});
		var _v18 = A2(viewProps, coords, props);
		var g = _v18.a;
		var _v19 = _v18.b;
		var h = _v19.b;
		var w = _v18.c;
		return _Utils_Tuple2(
			g,
			_Utils_Tuple2(w, h));
	});
var $author$project$Render$Svg$withCombinator = F8(
	function (visited, defs, collapsedNodes, config, path, parentY, maybeCombinator, _v7) {
		var baseGraph = _v7.a;
		var _v8 = _v7.b;
		var bw = _v8.a;
		var bh = _v8.b;
		if (maybeCombinator.$ === 1) {
			return _Utils_Tuple2(
				baseGraph,
				_Utils_Tuple2(bw, bh));
		} else {
			var _v10 = maybeCombinator.a;
			var kind = _v10.a;
			var subSchemas = _v10.b;
			var combConnector = A3(
				$author$project$Render$Svg$connectorPath,
				config.s,
				_Utils_Tuple2(bw, parentY + $author$project$Render$Svg$halfPill),
				_Utils_Tuple2(bw + $author$project$Render$Svg$hSpace, parentY + $author$project$Render$Svg$halfPill));
			var combPath = path + '.combinator';
			var _v11 = $author$project$Render$Svg$viewMulti(visited)(defs)(collapsedNodes)(config)(combPath)(
				_Utils_Tuple2(bw + $author$project$Render$Svg$hSpace, parentY))(
				$author$project$Render$Svg$combinatorIcon(kind))($elm$core$Maybe$Nothing)('500')(false)(subSchemas);
			var combGraph = _v11.a;
			var _v12 = _v11.b;
			var cw = _v12.a;
			var ch = _v12.b;
			var finalGraph = A2(
				$author$project$SchemaSvg$g,
				_List_Nil,
				_List_fromArray(
					[baseGraph, combConnector, combGraph]));
			return _Utils_Tuple2(
				finalGraph,
				_Utils_Tuple2(
					cw,
					A2($elm$core$Basics$max, bh, ch)));
		}
	});
var $author$project$Render$Svg$viewPropertiesBelow = F9(
	function (visited, defs, collapsedNodes, config, path, trunkX, parentBottomY, coords, props) {
		var viewProps = F2(
			function (coords_, elms) {
				var x = coords_.a;
				var y = coords_.b;
				if (!elms.b) {
					return _Utils_Tuple3(_List_Nil, coords_, x);
				} else {
					var element = elms.a;
					var elements = elms.b;
					var connector = A3(
						$author$project$Render$Svg$connectorDownThenRight,
						config.s,
						_Utils_Tuple2(trunkX, parentBottomY),
						_Utils_Tuple2(x, y + $author$project$Render$Svg$halfPill));
					var _v1 = A7($author$project$Render$Svg$viewProperty, visited, defs, collapsedNodes, config, path, coords_, element);
					var g_ = _v1.a;
					var _v2 = _v1.b;
					var w1 = _v2.a;
					var h1 = _v2.b;
					var _v3 = A2(
						viewProps,
						_Utils_Tuple2(
							x,
							h1 + A3($author$project$Render$Svg$siblingGap, $author$project$Render$Svg$propertySchema, element, elements)),
						elements);
					var gs = _v3.a;
					var _v4 = _v3.b;
					var w2 = _v4.a;
					var h2 = _v4.b;
					var w3 = _v3.c;
					var maxW = A3(
						$elm$core$List$foldl,
						$elm$core$Basics$max,
						w1,
						_List_fromArray(
							[w1, w2, w3]));
					return _Utils_Tuple3(
						A2(
							$elm$core$List$cons,
							connector,
							A2($elm$core$List$cons, g_, gs)),
						_Utils_Tuple2(x, h2),
						maxW);
				}
			});
		var _v5 = A2(viewProps, coords, props);
		var g = _v5.a;
		var _v6 = _v5.b;
		var h = _v6.b;
		var w = _v5.c;
		return _Utils_Tuple2(
			g,
			_Utils_Tuple2(w, h));
	});
var $author$project$Render$Svg$viewBoxString = F3(
	function (w, h, padding) {
		return '0 0 ' + ($elm$core$String$fromFloat(w + padding) + (' ' + $elm$core$String$fromFloat(h + padding)));
	});
var $author$project$SchemaMarks$requiredLegend = function (bottom) {
	return A7($author$project$SchemaMarks$caption, 0, bottom + 11, '9', 'var(--schema-nodeText)', '400', 'start', '* Required field');
};
var $author$project$Render$Svg$view = F9(
	function (overview, fixed, square, hoverMsg, unhoverMsg, collapsedNodes, defs, name, schema) {
		var padding = 24;
		var config = {x: fixed, s: square, aj: hoverMsg, _: overview, ao: unhoverMsg};
		var _v0 = $author$project$Render$Svg$viewSchema($elm$core$Set$empty)(defs)(collapsedNodes)(config)('root')(
			_Utils_Tuple2(0, 0))(name)('700')(false)(schema);
		var schemaView = _v0.a;
		var _v1 = _v0.b;
		var w = _v1.a;
		var h = _v1.b;
		var hasRequired = A2($author$project$SchemaSvg$hasClass, 'schema-required', schemaView);
		var svgW = w + padding;
		var height = hasRequired ? (h + 16) : h;
		var vb = A3($author$project$Render$Svg$viewBoxString, w, height, padding);
		var svgH = height + padding;
		var legend = hasRequired ? _List_fromArray(
			[
				$author$project$SchemaMarks$requiredLegend(h)
			]) : _List_Nil;
		return A2(
			$author$project$SchemaSvg$svg,
			_List_fromArray(
				[
					$author$project$SchemaSvg$attr('width')(
					$elm$core$String$fromFloat(svgW)),
					$author$project$SchemaSvg$attr('height')(
					$elm$core$String$fromFloat(svgH)),
					$author$project$SchemaSvg$attr('viewBox')(vb),
					$author$project$SchemaSvg$attr('style')('display: block;')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$SchemaSvg$g,
					_List_fromArray(
						[
							A2($author$project$SchemaSvg$attr, 'transform', 'translate(12 12)')
						]),
					A2($elm$core$List$cons, schemaView, legend))
				]));
	});
var $author$project$SchemaSvg$style = function (css) {
	return A3(
		$author$project$SchemaSvg$Element,
		'style',
		_List_Nil,
		_List_fromArray(
			[
				$author$project$SchemaSvg$Text(css)
			]));
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === -2) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$isEmpty(dict);
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$SchemaDiagram$themeCss = function (theme) {
	var matchingFills = _Utils_eq(
		$elm$core$String$toLower(theme.a5),
		$elm$core$String$toLower(theme.a3));
	var font = function () {
		var _v1 = theme.ay;
		switch (_v1) {
			case 'sans':
				return 'system-ui, sans-serif';
			case 'serif':
				return 'Georgia, serif';
			default:
				return 'Consolas, Menlo, monospace';
		}
	}();
	return '.schema-svg { background: ' + (theme.a3 + ('; font-family: ' + (font + (';' + ($elm$core$String$concat(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var key = _v0.a;
				var value = _v0.b;
				return '--schema-' + (key + (':' + (value + ';')));
			},
			_List_fromArray(
				[
					_Utils_Tuple2('nodeBorder', theme.a8),
					_Utils_Tuple2(
					'outlineOpacity',
					(matchingFills && (!theme.Z)) ? '0.95' : '0.55'),
					_Utils_Tuple2('background', theme.a3),
					_Utils_Tuple2('nodeBorderSubtle', theme.a7),
					_Utils_Tuple2('nodeText', theme.T),
					_Utils_Tuple2('iconText', theme.a6),
					_Utils_Tuple2('iconChipBg', theme.a5),
					_Utils_Tuple2(
					'branchTint',
					matchingFills ? theme.a8 : theme.a5),
					_Utils_Tuple2(
					'branchOpacity',
					matchingFills ? '0.20' : '0.12'),
					_Utils_Tuple2('connector', theme.aZ)
				]))) + ('} .schema-svg text { font-family: inherit; cursor: inherit; }' + ('.schema-svg rect[rx=\u00223\u0022] { rx: ' + ($elm$core$String$fromInt(theme.Z) + ('px; ry: ' + ($elm$core$String$fromInt(theme.Z) + ('px; }' + ('.schema-fold[tabindex] { cursor: pointer; }' + ('.schema-fold[tabindex] .schema-card:hover { stroke-opacity: .85; stroke-width: 1.2px; }' + ('.schema-fold:focus { outline: none; }' + '.schema-fold:focus-visible .schema-card { stroke-opacity: 1; stroke-width: 2px; }'))))))))))))));
};
var $author$project$SchemaDiagram$render = F5(
	function (hover, leave, theme, folding, document) {
		return A3(
			$author$project$SchemaSvg$root,
			_List_fromArray(
				[
					A2($author$project$SchemaSvg$attr, 'class', 'sequence-svg schema-svg'),
					A2($author$project$SchemaSvg$attr, 'role', 'group'),
					A2($author$project$SchemaSvg$attr, 'aria-label', 'JSON Schema diagram'),
					A2(
					$author$project$SchemaSvg$attr,
					'data-can-collapse',
					(folding._ && $elm$core$Set$isEmpty(folding.z)) ? 'false' : 'true')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$SchemaSvg$rect,
					_List_fromArray(
						[
							A2($author$project$SchemaSvg$attr, 'width', '100%'),
							A2($author$project$SchemaSvg$attr, 'height', '100%'),
							A2($author$project$SchemaSvg$attr, 'fill', theme.a3)
						]),
					_List_Nil),
					$author$project$SchemaSvg$style(
					$author$project$SchemaDiagram$themeCss(theme))
				]),
			A9($author$project$Render$Svg$view, folding._, folding.x, !theme.Z, hover, leave, folding.z, document.V.bv, document.N, document.V.bk));
	});
var $author$project$SchemaDiagram$view = F5(
	function (hover, leave, theme, folding, document) {
		return $author$project$SchemaSvg$toDom(
			A5($author$project$SchemaDiagram$render, hover, leave, theme, folding, document));
	});
var $author$project$SchemaMain$Hover = function (a) {
	return {$: 8, a: a};
};
var $author$project$SchemaMain$Leave = {$: 9};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $elm$html$Html$summary = _VirtualDom_node('summary');
var $author$project$SchemaMain$LoadExample = {$: 2};
var $author$project$SchemaMain$ToggleFixed = function (a) {
	return {$: 6, a: a};
};
var $author$project$DiagramTheme$classic = $author$project$DiagramTheme$Theme('#ffffff')('#17382a')('#21543e')('#ffffff')('#c7ebd7')('#899d92')('#39815d')('mono')(3)('#17382a');
var $author$project$DiagramTheme$monochrome = $author$project$DiagramTheme$Theme('#ffffff')('#202521')('#323a34')('#ffffff')('#e1e6e2')('#929292')('#565656')('mono')(9)('#202521');
var $author$project$DiagramTheme$highContrastBlack = {ay: 'mono', T: '#fafffd', Z: 0, aZ: '#ffffff', aa: '#000000', a3: '#000000', a5: '#000000', a6: '#ffffff', a7: '#ffffff', a8: '#faf9f9'};
var $author$project$DiagramTheme$inverseMonochrome = $author$project$DiagramTheme$Theme('#202020')('#f4f4f4')('#ededed')('#202020')('#454545')('#929292')('#bdbdbd')('mono')(9)('#bdbdbd');
var $author$project$DiagramTheme$preset = function (name) {
	switch (name) {
		case 'classic':
			return $elm$core$Maybe$Just($author$project$DiagramTheme$classic);
		case 'monochrome':
			return $elm$core$Maybe$Just($author$project$DiagramTheme$monochrome);
		case 'inverse-monochrome':
			return $elm$core$Maybe$Just($author$project$DiagramTheme$inverseMonochrome);
		case 'dark':
			return $elm$core$Maybe$Just($author$project$DiagramTheme$dark);
		case 'high-contrast-black':
			return $elm$core$Maybe$Just($author$project$DiagramTheme$highContrastBlack);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$SchemaMain$currentTheme = function (model) {
	return (model.B === 'custom') ? model.O : A2(
		$elm$core$Maybe$withDefault,
		$author$project$DiagramTheme$classic,
		$author$project$DiagramTheme$preset(model.B));
};
var $author$project$SchemaMain$preview = function (model) {
	var _v0 = model.C;
	if (!_v0.$) {
		var document = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							model.M ? 'diagram-preview local-diagram diagram-fit' : 'diagram-preview local-diagram'),
							A2($elm$html$Html$Attributes$attribute, 'tabindex', '0'),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Schema diagram preview')
						]),
					_List_fromArray(
						[
							A5(
							$author$project$SchemaDiagram$view,
							$author$project$SchemaMain$Hover,
							$author$project$SchemaMain$Leave,
							$author$project$SchemaMain$currentTheme(model),
							model.t,
							document)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fold-settings schema-panel-footer')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('diagram-tools')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$SchemaMain$Fold('collapse'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Collapse all')
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$SchemaMain$Fold('expand'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Expand all')
										])),
									A2(
									$elm$html$Html$label,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$input,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('checkbox'),
													$elm$html$Html$Attributes$checked(model.t.x),
													$elm$html$Html$Events$onCheck($author$project$SchemaMain$ToggleFixed)
												]),
											_List_Nil),
											$elm$html$Html$text('Keep positions fixed')
										]))
								])),
							A2(
							$elm$html$Html$details,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('walkthrough-help')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$summary,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Diagram help')
										])),
									A2(
									$elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Collapse all to start with an overview. Select a node with a chevron to reveal or hide its details. Keep positions fixed to preserve the layout while you explore.')
										]))
								]))
						])),
					function () {
					var _v1 = model.y;
					if (!_v1.$) {
						var hover = _v1.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('schema-tooltip'),
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									A2(
									$elm$html$Html$Attributes$attribute,
									'style',
									'left:' + ($elm$core$String$fromFloat(hover.aR) + ('px;top:' + ($elm$core$String$fromFloat(hover.aS) + 'px'))))
								]),
							_Utils_ap(
								A2(
									$elm$core$List$filterMap,
									$elm$core$Basics$identity,
									_List_fromArray(
										[
											A2(
											$elm$core$Maybe$map,
											A2(
												$elm$core$Basics$composeR,
												$elm$html$Html$text,
												A2(
													$elm$core$Basics$composeR,
													$elm$core$List$singleton,
													$elm$html$Html$p(_List_Nil))),
											hover.aA.a),
											A2(
											$elm$core$Maybe$map,
											A2(
												$elm$core$Basics$composeR,
												$elm$core$String$join(', '),
												A2(
													$elm$core$Basics$composeR,
													$elm$core$Basics$append('Values: '),
													A2(
														$elm$core$Basics$composeR,
														$elm$html$Html$text,
														A2(
															$elm$core$Basics$composeR,
															$elm$core$List$singleton,
															$elm$html$Html$p(_List_Nil))))),
											hover.aA.i)
										])),
								A2(
									$elm$core$List$map,
									function (_v2) {
										var key = _v2.a;
										var val = _v2.b;
										return A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(key + (': ' + val))
												]));
									},
									hover.aA.g)));
					} else {
						return $elm$html$Html$text('');
					}
				}()
				]));
	} else {
		return $elm$core$String$isEmpty(model.n) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('output-message output-empty')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('output-message-title')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Your diagram starts here')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Paste a schema or open a JSON file to see its structure.')
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($author$project$SchemaMain$LoadExample),
							$elm$html$Html$Attributes$class('example-button')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Try an example')
						]))
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('output-message output-error schema-error'),
					A2($elm$html$Html$Attributes$attribute, 'role', 'status')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('output-message-title')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Could not render this schema')
						])),
					A2(
					$elm$html$Html$pre,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(model.n)
						]))
				]));
	}
};
var $elm$html$Html$section = _VirtualDom_node('section');
var $author$project$SchemaMain$Download = {$: 11};
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Json$Highlight$TKey = function (a) {
	return {$: 1, a: a};
};
var $author$project$Json$Highlight$TString = function (a) {
	return {$: 2, a: a};
};
var $author$project$Json$Highlight$peekNonWhitespace = function (tokens) {
	peekNonWhitespace:
	while (true) {
		if (!tokens.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (tokens.a.$ === 6) {
				var rest = tokens.b;
				var $temp$tokens = rest;
				tokens = $temp$tokens;
				continue peekNonWhitespace;
			} else {
				var t = tokens.a;
				return $elm$core$Maybe$Just(t);
			}
		}
	}
};
var $author$project$Json$Highlight$assignKeys = function (tokens) {
	if (!tokens.b) {
		return _List_Nil;
	} else {
		if (tokens.a.$ === 2) {
			var s = tokens.a.a;
			var rest = tokens.b;
			var _v1 = $author$project$Json$Highlight$peekNonWhitespace(rest);
			if (((!_v1.$) && (!_v1.a.$)) && (_v1.a.a === ':')) {
				return A2(
					$elm$core$List$cons,
					$author$project$Json$Highlight$TKey(s),
					$author$project$Json$Highlight$assignKeys(rest));
			} else {
				return A2(
					$elm$core$List$cons,
					$author$project$Json$Highlight$TString(s),
					$author$project$Json$Highlight$assignKeys(rest));
			}
		} else {
			var t = tokens.a;
			var rest = tokens.b;
			return A2(
				$elm$core$List$cons,
				t,
				$author$project$Json$Highlight$assignKeys(rest));
		}
	}
};
var $author$project$Json$Highlight$TBool = function (a) {
	return {$: 4, a: a};
};
var $author$project$Json$Highlight$TNull = function (a) {
	return {$: 5, a: a};
};
var $author$project$Json$Highlight$TPunct = function (a) {
	return {$: 0, a: a};
};
var $author$project$Json$Highlight$TNumber = function (a) {
	return {$: 3, a: a};
};
var $author$project$Json$Highlight$TInvalid = function (a) {
	return {$: 7, a: a};
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$String$fromList = _String_fromList;
var $author$project$Json$Highlight$readString = F2(
	function (collected, chars) {
		readString:
		while (true) {
			_v0$3:
			while (true) {
				if (!chars.b) {
					return _Utils_Tuple2(
						$elm$core$String$fromList(
							$elm$core$List$reverse(collected)),
						_List_Nil);
				} else {
					switch (chars.a) {
						case '"':
							var rest = chars.b;
							return _Utils_Tuple2(
								$elm$core$String$fromList(
									$elm$core$List$reverse(
										A2($elm$core$List$cons, '"', collected))),
								rest);
						case '\\':
							if (chars.b.b) {
								var _v1 = chars.b;
								var c = _v1.a;
								var rest = _v1.b;
								var $temp$collected = A2(
									$elm$core$List$cons,
									c,
									A2($elm$core$List$cons, '\\', collected)),
									$temp$chars = rest;
								collected = $temp$collected;
								chars = $temp$chars;
								continue readString;
							} else {
								break _v0$3;
							}
						default:
							break _v0$3;
					}
				}
			}
			var c = chars.a;
			var rest = chars.b;
			var $temp$collected = A2($elm$core$List$cons, c, collected),
				$temp$chars = rest;
			collected = $temp$collected;
			chars = $temp$chars;
			continue readString;
		}
	});
var $author$project$Json$Highlight$TWhitespace = function (a) {
	return {$: 6, a: a};
};
var $author$project$Json$Highlight$isIdentChar = function (c) {
	return $elm$core$Char$isAlpha(c) || ($elm$core$Char$isDigit(c) || (c === '_'));
};
var $author$project$Json$Highlight$consumeHelp = F3(
	function (pred, acc, chars) {
		consumeHelp:
		while (true) {
			if (chars.b) {
				var c = chars.a;
				var rest = chars.b;
				if (pred(c)) {
					var $temp$pred = pred,
						$temp$acc = A2($elm$core$List$cons, c, acc),
						$temp$chars = rest;
					pred = $temp$pred;
					acc = $temp$acc;
					chars = $temp$chars;
					continue consumeHelp;
				} else {
					return _Utils_Tuple2(
						$elm$core$String$fromList(
							$elm$core$List$reverse(acc)),
						chars);
				}
			} else {
				return _Utils_Tuple2(
					$elm$core$String$fromList(
						$elm$core$List$reverse(acc)),
					_List_Nil);
			}
		}
	});
var $author$project$Json$Highlight$consumeWhile = F2(
	function (pred, chars) {
		return A3($author$project$Json$Highlight$consumeHelp, pred, _List_Nil, chars);
	});
var $author$project$Json$Highlight$isNumberChar = function (c) {
	return $elm$core$Char$isDigit(c) || ((c === '.') || ((c === '-') || ((c === '+') || ((c === 'e') || (c === 'E')))));
};
var $author$project$Json$Highlight$isWhitespaceChar = function (c) {
	return (c === ' ') || ((c === '\t') || ((c === '\n') || (c === '\r')));
};
var $author$project$Json$Highlight$tokenizeChars = F2(
	function (acc, chars) {
		tokenizeChars:
		while (true) {
			if (!chars.b) {
				return acc;
			} else {
				switch (chars.a) {
					case '{':
						var rest = chars.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TPunct('{'),
							acc),
							$temp$chars = rest;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					case '}':
						var rest = chars.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TPunct('}'),
							acc),
							$temp$chars = rest;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					case '[':
						var rest = chars.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TPunct('['),
							acc),
							$temp$chars = rest;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					case ']':
						var rest = chars.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TPunct(']'),
							acc),
							$temp$chars = rest;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					case ',':
						var rest = chars.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TPunct(','),
							acc),
							$temp$chars = rest;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					case ':':
						var rest = chars.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TPunct(':'),
							acc),
							$temp$chars = rest;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					case '"':
						var rest = chars.b;
						var _v1 = A2(
							$author$project$Json$Highlight$readString,
							_List_fromArray(
								['"']),
							rest);
						var body = _v1.a;
						var remaining = _v1.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$author$project$Json$Highlight$TString(body),
							acc),
							$temp$chars = remaining;
						acc = $temp$acc;
						chars = $temp$chars;
						continue tokenizeChars;
					default:
						var c = chars.a;
						var rest = chars.b;
						if ($author$project$Json$Highlight$isWhitespaceChar(c)) {
							var _v2 = A2($author$project$Json$Highlight$consumeWhile, $author$project$Json$Highlight$isWhitespaceChar, chars);
							var ws = _v2.a;
							var remaining = _v2.b;
							var $temp$acc = A2(
								$elm$core$List$cons,
								$author$project$Json$Highlight$TWhitespace(ws),
								acc),
								$temp$chars = remaining;
							acc = $temp$acc;
							chars = $temp$chars;
							continue tokenizeChars;
						} else {
							if ($elm$core$Char$isDigit(c) || (c === '-')) {
								var _v3 = A2($author$project$Json$Highlight$consumeWhile, $author$project$Json$Highlight$isNumberChar, chars);
								var num = _v3.a;
								var remaining = _v3.b;
								var $temp$acc = A2(
									$elm$core$List$cons,
									$author$project$Json$Highlight$TNumber(num),
									acc),
									$temp$chars = remaining;
								acc = $temp$acc;
								chars = $temp$chars;
								continue tokenizeChars;
							} else {
								if ($elm$core$Char$isAlpha(c)) {
									var _v4 = A2($author$project$Json$Highlight$consumeWhile, $author$project$Json$Highlight$isIdentChar, chars);
									var ident = _v4.a;
									var remaining = _v4.b;
									switch (ident) {
										case 'true':
											var $temp$acc = A2(
												$elm$core$List$cons,
												$author$project$Json$Highlight$TBool('true'),
												acc),
												$temp$chars = remaining;
											acc = $temp$acc;
											chars = $temp$chars;
											continue tokenizeChars;
										case 'false':
											var $temp$acc = A2(
												$elm$core$List$cons,
												$author$project$Json$Highlight$TBool('false'),
												acc),
												$temp$chars = remaining;
											acc = $temp$acc;
											chars = $temp$chars;
											continue tokenizeChars;
										case 'null':
											var $temp$acc = A2(
												$elm$core$List$cons,
												$author$project$Json$Highlight$TNull('null'),
												acc),
												$temp$chars = remaining;
											acc = $temp$acc;
											chars = $temp$chars;
											continue tokenizeChars;
										default:
											var other = ident;
											var $temp$acc = A2(
												$elm$core$List$cons,
												$author$project$Json$Highlight$TInvalid(other),
												acc),
												$temp$chars = remaining;
											acc = $temp$acc;
											chars = $temp$chars;
											continue tokenizeChars;
									}
								} else {
									var $temp$acc = A2(
										$elm$core$List$cons,
										$author$project$Json$Highlight$TInvalid(
											$elm$core$String$fromChar(c)),
										acc),
										$temp$chars = rest;
									acc = $temp$acc;
									chars = $temp$chars;
									continue tokenizeChars;
								}
							}
						}
				}
			}
		}
	});
var $author$project$Json$Highlight$tokenize = function (src) {
	return $author$project$Json$Highlight$assignKeys(
		$elm$core$List$reverse(
			A2(
				$author$project$Json$Highlight$tokenizeChars,
				_List_Nil,
				$elm$core$String$toList(src))));
};
var $author$project$SchemaMain$ToggleFit = {$: 5};
var $author$project$SchemaMain$FullScreen = {$: 10};
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$Json$Highlight$viewToken = function (tok) {
	switch (tok.$) {
		case 0:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-punct')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
		case 1:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-key')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
		case 2:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-string')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
		case 3:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-number')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
		case 4:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-bool')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
		case 5:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-null')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
		case 6:
			var s = tok.a;
			return $elm$html$Html$text(s);
		default:
			var s = tok.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tk-invalid')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]));
	}
};
var $author$project$Json$Highlight$tokensToHtml = $elm$core$List$map($author$project$Json$Highlight$viewToken);
var $author$project$DiagramTheme$fonts = _List_fromArray(
	[
		_Utils_Tuple2('mono', 'Monospace'),
		_Utils_Tuple2('sans', 'Sans serif'),
		_Utils_Tuple2('serif', 'Serif')
	]);
var $elm$core$String$toInt = _String_toInt;
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$SchemaMain$choose = F4(
	function (caption, current, onChange, choices) {
		return A2(
			$elm$html$Html$label,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(caption),
					A2(
					$elm$html$Html$select,
					_List_fromArray(
						[
							$elm$html$Html$Events$onInput(onChange)
						]),
					A2(
						$elm$core$List$map,
						function (_v0) {
							var key = _v0.a;
							var name = _v0.b;
							return A2(
								$elm$html$Html$option,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$value(key),
										$elm$html$Html$Attributes$selected(
										_Utils_eq(key, current))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(name)
									]));
						},
						choices))
				]));
	});
var $author$project$SchemaMain$Customize = function (a) {
	return {$: 13, a: a};
};
var $author$project$SchemaMain$ExportTheme = {$: 15};
var $author$project$SchemaMain$SelectTheme = function (a) {
	return {$: 12, a: a};
};
var $author$project$SchemaMain$themeSettings = function (model) {
	var theme = model.O;
	var color = F3(
		function (caption, current, setColor) {
			return A2(
				$elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(caption),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('color'),
								$elm$html$Html$Attributes$value(current),
								$elm$html$Html$Events$onInput(
								A2($elm$core$Basics$composeR, setColor, $author$project$SchemaMain$Customize))
							]),
						_List_Nil)
					]));
		});
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('theme-settings'),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Diagram theme settings')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('theme-controls')
					]),
				_List_fromArray(
					[
						A4(
						$author$project$SchemaMain$choose,
						'Diagram theme',
						model.B,
						$author$project$SchemaMain$SelectTheme,
						_List_fromArray(
							[
								_Utils_Tuple2('classic', 'Classic'),
								_Utils_Tuple2('monochrome', 'Monochrome'),
								_Utils_Tuple2('inverse-monochrome', 'Inverse monochrome'),
								_Utils_Tuple2('dark', 'Dark'),
								_Utils_Tuple2('high-contrast-black', 'High Contrast Black'),
								_Utils_Tuple2('custom', 'Custom')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('diagram-tools schema-theme-actions')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('schema-file-button')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Import theme'),
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$id('theme-file'),
												$elm$html$Html$Attributes$type_('file'),
												A2($elm$html$Html$Attributes$attribute, 'accept', '.json,application/json')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$SchemaMain$ExportTheme)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Export theme')
									]))
							]))
					])),
				(model.B === 'custom') ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('theme-custom')
					]),
				_List_fromArray(
					[
						A3(
						color,
						'Background',
						theme.a3,
						function (v) {
							return _Utils_update(
								theme,
								{a3: v});
						}),
						A3(
						color,
						'Labels',
						theme.T,
						function (v) {
							return _Utils_update(
								theme,
								{T: v});
						}),
						A3(
						color,
						'Root and branch fill',
						theme.a5,
						function (v) {
							return _Utils_update(
								theme,
								{a5: v});
						}),
						A3(
						color,
						'Root label',
						theme.a6,
						function (v) {
							return _Utils_update(
								theme,
								{a6: v});
						}),
						A3(
						color,
						'Node outline',
						theme.a8,
						function (v) {
							return _Utils_update(
								theme,
								{a8: v});
						}),
						A3(
						color,
						'Type labels',
						theme.a7,
						function (v) {
							return _Utils_update(
								theme,
								{a7: v});
						}),
						A3(
						color,
						'Connectors',
						theme.aZ,
						function (v) {
							return _Utils_update(
								theme,
								{aZ: v});
						}),
						A4(
						$author$project$SchemaMain$choose,
						'Font',
						theme.ay,
						function (v) {
							return $author$project$SchemaMain$Customize(
								_Utils_update(
									theme,
									{ay: v}));
						},
						$author$project$DiagramTheme$fonts),
						A2(
						$elm$html$Html$label,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								'Node corner radius (' + ($elm$core$String$fromInt(theme.Z) + ' px)')),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('range'),
										A2($elm$html$Html$Attributes$attribute, 'min', '0'),
										A2($elm$html$Html$Attributes$attribute, 'max', '11'),
										$elm$html$Html$Attributes$value(
										$elm$core$String$fromInt(
											A2($elm$core$Basics$min, 11, theme.Z))),
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$SchemaMain$Customize(
												_Utils_update(
													theme,
													{
														Z: A2(
															$elm$core$Maybe$withDefault,
															theme.Z,
															$elm$core$String$toInt(v))
													}));
										})
									]),
								_List_Nil)
							]))
					])) : $elm$html$Html$text(''),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('theme-status'),
						A2($elm$html$Html$Attributes$attribute, 'role', 'status')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(model.K)
					]))
			]));
};
var $author$project$SchemaMain$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page schema-page')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$header,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('site-header')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('brand')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('brand-icon'),
										A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('{}')
									])),
								$elm$html$Html$text('JSON Schema')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('tool-links')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('../')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Home')
									])),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('../sequence-diagram/')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Sequence diagrams')
									])),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('https://github.com/eelcoh/jsonschema-viewer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('GitHub ↗')
									]))
							]))
					])),
				A2(
				$elm$html$Html$main_,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('intro')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h1,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('JSON Schema '),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('viewer')
											]))
									])),
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Explore JSON Schema and OpenAPI one branch at a time.')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('workbench')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$section,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('panel'),
										A2($elm$html$Html$Attributes$attribute, 'aria-labelledby', 'schema-source-heading')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('panel-header output-header')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$h2,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$id('schema-source-heading')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$label,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$for('source')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Schema input')
															]))
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('diagram-tools')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$label,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('schema-file-button')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Open JSON'),
																A2(
																$elm$html$Html$input,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$id('schema-file'),
																		$elm$html$Html$Attributes$type_('file'),
																		A2($elm$html$Html$Attributes$attribute, 'accept', '.json,application/json')
																	]),
																_List_Nil)
															])),
														A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Events$onClick($author$project$SchemaMain$Format),
																$elm$html$Html$Attributes$disabled(
																$elm$core$String$isEmpty(
																	$elm$core$String$trim(model.o)))
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Format')
															])),
														($elm$core$String$isEmpty(
														$elm$core$String$trim(model.o)) && $elm$core$String$isEmpty(model.n)) ? $elm$html$Html$text('') : A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Events$onClick($author$project$SchemaMain$LoadExample)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Load example')
															]))
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('source-editor')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$pre,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('source-highlight'),
														A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
													]),
												_Utils_ap(
													$author$project$Json$Highlight$tokensToHtml(
														$author$project$Json$Highlight$tokenize(model.o)),
													_List_fromArray(
														[
															$elm$html$Html$text('\u000A')
														]))),
												A2(
												$elm$html$Html$textarea,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$id('source'),
														$elm$html$Html$Attributes$value(model.o),
														$elm$html$Html$Events$onInput($author$project$SchemaMain$Edit),
														$elm$html$Html$Attributes$spellcheck(false),
														A2($elm$html$Html$Attributes$attribute, 'autocapitalize', 'off'),
														A2($elm$html$Html$Attributes$attribute, 'wrap', 'off'),
														$elm$html$Html$Attributes$placeholder('Paste JSON or load an example.')
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$details,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('syntax-help schema-panel-footer')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$summary,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('Input help')
													])),
												A2(
												$elm$html$Html$p,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('Paste JSON Schema or an OpenAPI or Swagger document in JSON format. Local references such as '),
														A2(
														$elm$html$Html$code,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text('#/$defs/Address')
															])),
														$elm$html$Html$text(' can be expanded in the diagram.')
													])),
												A2(
												$elm$html$Html$p,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('Tab indents. Shift+Tab outdents. Press Esc then Tab to move focus out of the editor.')
													]))
											]))
									])),
								A2(
								$elm$html$Html$section,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('panel'),
										A2($elm$html$Html$Attributes$attribute, 'aria-labelledby', 'schema-preview-heading')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('panel-header output-header')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$h2,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$id('schema-preview-heading')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Preview')
													])),
												_Utils_eq(model.C, $elm$core$Maybe$Nothing) ? $elm$html$Html$text('') : A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('diagram-tools')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Events$onClick($author$project$SchemaMain$ToggleFit),
																A2(
																$elm$html$Html$Attributes$attribute,
																'aria-pressed',
																model.M ? 'true' : 'false')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Fit to panel')
															])),
														A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Events$onClick($author$project$SchemaMain$Download)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Download SVG')
															])),
														A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Events$onClick($author$project$SchemaMain$FullScreen)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Full screen')
															]))
													]))
											])),
										$author$project$SchemaMain$preview(model)
									]))
							])),
						$author$project$SchemaMain$themeSettings(model)
					]))
			]));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$SchemaMain$Parse = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Process$sleep = _Process_sleep;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$map8 = _Json_map8;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $author$project$DiagramTheme$validate = F3(
	function (message, isValid, decoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (value) {
				return isValid(value) ? $elm$json$Json$Decode$succeed(value) : $elm$json$Json$Decode$fail(message);
			},
			decoder);
	});
var $author$project$DiagramTheme$color = A3(
	$author$project$DiagramTheme$validate,
	'Expected a six-digit hex color',
	function (value) {
		return ($elm$core$String$length(value) === 7) && (A2($elm$core$String$startsWith, '#', value) && A2(
			$elm$core$String$all,
			function (_char) {
				return A2(
					$elm$core$String$contains,
					$elm$core$String$fromChar(_char),
					'0123456789abcdefABCDEF');
			},
			A2($elm$core$String$dropLeft, 1, value)));
	},
	$elm$json$Json$Decode$string);
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$DiagramTheme$optionalColor = F2(
	function (key, fallback) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (field) {
				if (field.$ === 1) {
					return $elm$json$Json$Decode$succeed(fallback);
				} else {
					return A2($elm$json$Json$Decode$field, key, $author$project$DiagramTheme$color);
				}
			},
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, key, $elm$json$Json$Decode$value)));
	});
var $author$project$DiagramTheme$decode = $elm$json$Json$Decode$decodeString(
	A4(
		$elm$json$Json$Decode$map3,
		F3(
			function (theme, radius, border) {
				return A2(theme, radius, border);
			}),
		A9(
			$elm$json$Json$Decode$map8,
			$author$project$DiagramTheme$Theme,
			A2($elm$json$Json$Decode$field, 'background', $author$project$DiagramTheme$color),
			A2($elm$json$Json$Decode$field, 'text', $author$project$DiagramTheme$color),
			A2($elm$json$Json$Decode$field, 'participant', $author$project$DiagramTheme$color),
			A2($elm$json$Json$Decode$field, 'participantText', $author$project$DiagramTheme$color),
			A2($elm$json$Json$Decode$field, 'activation', $author$project$DiagramTheme$color),
			A2($author$project$DiagramTheme$optionalColor, 'lifeline', $author$project$DiagramTheme$classic.aZ),
			A2($author$project$DiagramTheme$optionalColor, 'activationBorder', $author$project$DiagramTheme$classic.a7),
			A2(
				$elm$json$Json$Decode$field,
				'font',
				A3(
					$author$project$DiagramTheme$validate,
					'Unknown font',
					function (font) {
						return A2(
							$elm$core$List$member,
							font,
							A2($elm$core$List$map, $elm$core$Tuple$first, $author$project$DiagramTheme$fonts));
					},
					$elm$json$Json$Decode$string))),
		A2(
			$elm$json$Json$Decode$field,
			'radius',
			A3(
				$author$project$DiagramTheme$validate,
				'Radius must be between 0 and 19',
				function (radius) {
					return (radius >= 0) && (radius <= 19);
				},
				$elm$json$Json$Decode$int)),
		A2(
			$elm$json$Json$Decode$andThen,
			$author$project$DiagramTheme$optionalColor('participantBorder'),
			A2($elm$json$Json$Decode$field, 'participant', $author$project$DiagramTheme$color))));
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$DiagramTheme$encode = function (theme) {
	return A2(
		$elm$json$Json$Encode$encode,
		2,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'background',
					$elm$json$Json$Encode$string(theme.a3)),
					_Utils_Tuple2(
					'text',
					$elm$json$Json$Encode$string(theme.T)),
					_Utils_Tuple2(
					'participant',
					$elm$json$Json$Encode$string(theme.a5)),
					_Utils_Tuple2(
					'participantBorder',
					$elm$json$Json$Encode$string(theme.a8)),
					_Utils_Tuple2(
					'participantText',
					$elm$json$Json$Encode$string(theme.a6)),
					_Utils_Tuple2(
					'activation',
					$elm$json$Json$Encode$string(theme.aa)),
					_Utils_Tuple2(
					'lifeline',
					$elm$json$Json$Encode$string(theme.aZ)),
					_Utils_Tuple2(
					'activationBorder',
					$elm$json$Json$Encode$string(theme.a7)),
					_Utils_Tuple2(
					'font',
					$elm$json$Json$Encode$string(theme.ay)),
					_Utils_Tuple2(
					'radius',
					$elm$json$Json$Encode$int(theme.Z))
				])));
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $author$project$SchemaDiagram$format = function (source) {
	return A2(
		$elm$core$Result$mapError,
		$elm$json$Json$Decode$errorToString,
		A2(
			$elm$core$Result$map,
			$elm$json$Json$Encode$encode(4),
			A2($elm$json$Json$Decode$decodeString, $elm$json$Json$Decode$value, source)));
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$SchemaMain$example = '{\u000A    \u0022$schema\u0022: \u0022https://json-schema.org/draft/2020-12/schema\u0022,\u000A    \u0022title\u0022: \u0022Order\u0022,\u000A    \u0022type\u0022: \u0022object\u0022,\u000A    \u0022required\u0022: [\u0022id\u0022, \u0022items\u0022],\u000A    \u0022properties\u0022: {\u000A        \u0022id\u0022: { \u0022type\u0022: \u0022string\u0022, \u0022format\u0022: \u0022uuid\u0022 },\u000A        \u0022status\u0022: {\u000A            \u0022type\u0022: \u0022string\u0022,\u000A            \u0022enum\u0022: [\u0022pending\u0022, \u0022paid\u0022, \u0022shipped\u0022]\u000A        },\u000A        \u0022shipping\u0022: { \u0022$ref\u0022: \u0022#/$defs/Address\u0022 },\u000A        \u0022items\u0022: {\u000A            \u0022type\u0022: \u0022array\u0022,\u000A            \u0022items\u0022: {\u000A                \u0022type\u0022: \u0022object\u0022,\u000A                \u0022properties\u0022: {\u000A                    \u0022sku\u0022: { \u0022type\u0022: \u0022string\u0022 },\u000A                    \u0022quantity\u0022: { \u0022type\u0022: \u0022integer\u0022, \u0022minimum\u0022: 1 }\u000A                }\u000A            }\u000A        }\u000A    },\u000A    \u0022$defs\u0022: {\u000A        \u0022Address\u0022: {\u000A            \u0022type\u0022: \u0022object\u0022,\u000A            \u0022properties\u0022: {\u000A                \u0022street\u0022: { \u0022type\u0022: \u0022string\u0022 },\u000A                \u0022city\u0022: { \u0022type\u0022: \u0022string\u0022 }\u000A            }\u000A        }\u000A    }\u000A}';
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$SchemaMain$saveTheme = _Platform_outgoingPort('saveTheme', $elm$json$Json$Encode$string);
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$Json$Schema$Model = F2(
	function (definitions, schema) {
		return {bk: schema, bv: definitions};
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(0));
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Json$Schema$Null = function (a) {
	return {$: 6, a: a};
};
var $author$project$Json$Schema$null = F4(
	function (title, description, examples, combinator) {
		return $author$project$Json$Schema$Null(
			{N: title, u: examples, I: combinator, a: description});
	});
var $author$project$Json$Schema$AllOf = function (a) {
	return {$: 10, a: a};
};
var $author$project$Json$Schema$AnyOf = function (a) {
	return {$: 9, a: a};
};
var $author$project$Json$Schema$OneOf = function (a) {
	return {$: 8, a: a};
};
var $author$project$Json$Schema$Array = function (a) {
	return {$: 1, a: a};
};
var $author$project$Json$Schema$array = F7(
	function (title, description, items, minItems, maxItems, examples, combinator) {
		return $author$project$Json$Schema$Array(
			{bf: items, N: title, u: examples, bq: maxItems, br: minItems, I: combinator, a: description});
	});
var $author$project$Json$Schema$Number = function (a) {
	return {$: 4, a: a};
};
var $author$project$Json$Schema$float = F7(
	function (title, description, minumum, maximum, _enum, examples, combinator) {
		return $author$project$Json$Schema$Number(
			{w: _enum, N: title, aT: maximum, aU: minumum, u: examples, I: combinator, a: description});
	});
var $author$project$Json$Schema$String = function (a) {
	return {$: 2, a: a};
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $author$project$Json$Schema$Object = function (a) {
	return {$: 0, a: a};
};
var $author$project$Json$Schema$Optional = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Json$Schema$Required = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Json$Schema$object = F8(
	function (title, description, properties, required, minProperties, maxProperties, examples, combinator) {
		var isRequired = function (p) {
			return A2($elm$core$List$member, p, required);
		};
		var property = function (_v0) {
			var p = _v0.a;
			var v = _v0.b;
			return isRequired(p) ? A2($author$project$Json$Schema$Required, p, v) : A2($author$project$Json$Schema$Optional, p, v);
		};
		return $author$project$Json$Schema$Object(
			{
				N: title,
				u: examples,
				I: combinator,
				bu: A2(
					$elm$core$List$map,
					property,
					$elm$core$Dict$toList(properties)),
				a: description,
				bA: maxProperties,
				bB: minProperties
			});
	});
var $author$project$Json$Schema$string = F9(
	function (title, description, minLength, maxLength, pattern, format, _enum, examples, combinator) {
		return {w: _enum, N: title, bh: format, bp: pattern, u: examples, bs: maxLength, bt: minLength, I: combinator, a: description};
	});
var $author$project$Json$Schema$Boolean = function (a) {
	return {$: 5, a: a};
};
var $author$project$Json$Schema$boolean = F5(
	function (title, description, _enum, examples, combinator) {
		return $author$project$Json$Schema$Boolean(
			{w: _enum, N: title, u: examples, I: combinator, a: description});
	});
var $author$project$Json$Schema$Integer = function (a) {
	return {$: 3, a: a};
};
var $author$project$Json$Schema$integer = F7(
	function (title, description, minumum, maximum, _enum, examples, combinator) {
		return $author$project$Json$Schema$Integer(
			{w: _enum, N: title, aT: maximum, aU: minumum, u: examples, I: combinator, a: description});
	});
var $author$project$Json$Schema$Fallback = function (a) {
	return {$: 11, a: a};
};
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2($elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (!_v0.$) {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (!_v1.$) {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _v1.a;
					return $elm$json$Json$Decode$fail(
						$elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2($elm$json$Json$Decode$field, key, $elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$Json$Schema$Decode$constant = F2(
	function (expectedValue, decoder_) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (actualValue) {
				return _Utils_eq(actualValue, expectedValue) ? $elm$json$Json$Decode$succeed(actualValue) : $elm$json$Json$Decode$fail('Constant value mismatch');
			},
			decoder_);
	});
var $author$project$Json$Schema$Decode$withType = F2(
	function (typeString, decoder_) {
		return A2(
			$elm$json$Json$Decode$andThen,
			$elm$core$Basics$always(decoder_),
			A2(
				$elm$json$Json$Decode$field,
				'type',
				A2($author$project$Json$Schema$Decode$constant, typeString, $elm$json$Json$Decode$string)));
	});
var $author$project$Json$Schema$AllOfKind = 2;
var $author$project$Json$Schema$AnyOfKind = 1;
var $author$project$Json$Schema$OneOfKind = 0;
var $author$project$Json$Schema$Ref = function (a) {
	return {$: 7, a: a};
};
var $author$project$Json$Schema$reference = F5(
	function (title, description, ref, examples, combinator) {
		return $author$project$Json$Schema$Ref(
			{ax: ref, N: title, u: examples, I: combinator, a: description});
	});
var $author$project$Json$Schema$Decode$withField = F2(
	function (fieldName, decoder_) {
		return A2(
			$elm$json$Json$Decode$andThen,
			$elm$core$Basics$always(decoder_),
			A2($elm$json$Json$Decode$field, fieldName, $elm$json$Json$Decode$value));
	});
var $author$project$Json$Schema$Decode$normalizeRef = function (ref) {
	return A2($elm$core$String$startsWith, '#/$defs/', ref) ? ('#/definitions/' + A2($elm$core$String$dropLeft, 8, ref)) : ref;
};
var $author$project$Json$Schema$Uri = {$: 5};
var $author$project$Json$Schema$Ipv4 = {$: 3};
var $author$project$Json$Schema$Ipv6 = {$: 4};
var $author$project$Json$Schema$Email = {$: 1};
var $author$project$Json$Schema$Custom = function (a) {
	return {$: 6, a: a};
};
var $author$project$Json$Schema$DateTime = {$: 0};
var $author$project$Json$Schema$Hostname = {$: 2};
var $author$project$Json$Schema$Decode$stringFormat = function (format) {
	switch (format) {
		case 'date-time':
			return $author$project$Json$Schema$DateTime;
		case 'email':
			return $author$project$Json$Schema$Email;
		case 'hostname':
			return $author$project$Json$Schema$Hostname;
		case 'ipv4':
			return $author$project$Json$Schema$Ipv4;
		case 'ipv6':
			return $author$project$Json$Schema$Ipv6;
		case 'uri':
			return $author$project$Json$Schema$Uri;
		default:
			return $author$project$Json$Schema$Custom(format);
	}
};
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$Json$Schema$Decode$maybeOptional = F2(
	function (key, decoder_) {
		return A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			key,
			$elm$json$Json$Decode$nullable(decoder_),
			$elm$core$Maybe$Nothing);
	});
var $author$project$Json$Schema$baseCombinatorSchema = F4(
	function (title, description, subSchemas, examples) {
		return {N: title, u: examples, I: $elm$core$Maybe$Nothing, an: subSchemas, a: description};
	});
function $author$project$Json$Schema$Decode$cyclic$combinatorDecoder() {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$map,
				function (s) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(0, s));
				},
				A2(
					$elm$json$Json$Decode$field,
					'oneOf',
					$elm$json$Json$Decode$list(
						$author$project$Json$Schema$Decode$cyclic$schemaDecoder()))),
				A2(
				$elm$json$Json$Decode$map,
				function (s) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(1, s));
				},
				A2(
					$elm$json$Json$Decode$field,
					'anyOf',
					$elm$json$Json$Decode$list(
						$author$project$Json$Schema$Decode$cyclic$schemaDecoder()))),
				A2(
				$elm$json$Json$Decode$map,
				function (s) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(2, s));
				},
				A2(
					$elm$json$Json$Decode$field,
					'allOf',
					$elm$json$Json$Decode$list(
						$author$project$Json$Schema$Decode$cyclic$schemaDecoder()))),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
}
function $author$project$Json$Schema$Decode$cyclic$schemaDecoder() {
	return $elm$json$Json$Decode$lazy(
		function (_v0) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2(
						$author$project$Json$Schema$Decode$withType,
						'object',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'maxProperties',
									$elm$json$Json$Decode$int,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'minProperties',
										$elm$json$Json$Decode$int,
										A4(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
											'required',
											$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
											_List_Nil,
											A4(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
												'properties',
												$elm$json$Json$Decode$dict(
													$author$project$Json$Schema$Decode$cyclic$schemaDecoder()),
												$elm$core$Dict$empty,
												A3(
													$author$project$Json$Schema$Decode$maybeOptional,
													'description',
													$elm$json$Json$Decode$string,
													A3(
														$author$project$Json$Schema$Decode$maybeOptional,
														'title',
														$elm$json$Json$Decode$string,
														$elm$json$Json$Decode$succeed($author$project$Json$Schema$object)))))))))),
						A2(
						$author$project$Json$Schema$Decode$withType,
						'array',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'maxItems',
									$elm$json$Json$Decode$int,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'minItems',
										$elm$json$Json$Decode$int,
										A3(
											$author$project$Json$Schema$Decode$maybeOptional,
											'items',
											$author$project$Json$Schema$Decode$cyclic$schemaDecoder(),
											A3(
												$author$project$Json$Schema$Decode$maybeOptional,
												'description',
												$elm$json$Json$Decode$string,
												A3(
													$author$project$Json$Schema$Decode$maybeOptional,
													'title',
													$elm$json$Json$Decode$string,
													$elm$json$Json$Decode$succeed($author$project$Json$Schema$array))))))))),
						A2(
						$elm$json$Json$Decode$map,
						$author$project$Json$Schema$String,
						A2(
							$author$project$Json$Schema$Decode$withType,
							'string',
							A2(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
								$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
								A4(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
									'examples',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
									_List_Nil,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'enum',
										$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
										A3(
											$author$project$Json$Schema$Decode$maybeOptional,
											'format',
											A2($elm$json$Json$Decode$map, $author$project$Json$Schema$Decode$stringFormat, $elm$json$Json$Decode$string),
											A3(
												$author$project$Json$Schema$Decode$maybeOptional,
												'pattern',
												$elm$json$Json$Decode$string,
												A3(
													$author$project$Json$Schema$Decode$maybeOptional,
													'maxLength',
													$elm$json$Json$Decode$int,
													A3(
														$author$project$Json$Schema$Decode$maybeOptional,
														'minLength',
														$elm$json$Json$Decode$int,
														A3(
															$author$project$Json$Schema$Decode$maybeOptional,
															'description',
															$elm$json$Json$Decode$string,
															A3(
																$author$project$Json$Schema$Decode$maybeOptional,
																'title',
																$elm$json$Json$Decode$string,
																$elm$json$Json$Decode$succeed($author$project$Json$Schema$string)))))))))))),
						A2(
						$author$project$Json$Schema$Decode$withType,
						'integer',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'enum',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$int),
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'maximum',
										$elm$json$Json$Decode$int,
										A3(
											$author$project$Json$Schema$Decode$maybeOptional,
											'minimum',
											$elm$json$Json$Decode$int,
											A3(
												$author$project$Json$Schema$Decode$maybeOptional,
												'description',
												$elm$json$Json$Decode$string,
												A3(
													$author$project$Json$Schema$Decode$maybeOptional,
													'title',
													$elm$json$Json$Decode$string,
													$elm$json$Json$Decode$succeed($author$project$Json$Schema$integer))))))))),
						A2(
						$author$project$Json$Schema$Decode$withType,
						'number',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'enum',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$float),
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'maximum',
										$elm$json$Json$Decode$float,
										A3(
											$author$project$Json$Schema$Decode$maybeOptional,
											'minimum',
											$elm$json$Json$Decode$float,
											A3(
												$author$project$Json$Schema$Decode$maybeOptional,
												'description',
												$elm$json$Json$Decode$string,
												A3(
													$author$project$Json$Schema$Decode$maybeOptional,
													'title',
													$elm$json$Json$Decode$string,
													$elm$json$Json$Decode$succeed($author$project$Json$Schema$float))))))))),
						A2(
						$author$project$Json$Schema$Decode$withType,
						'boolean',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'enum',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$bool),
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'description',
										$elm$json$Json$Decode$string,
										A3(
											$author$project$Json$Schema$Decode$maybeOptional,
											'title',
											$elm$json$Json$Decode$string,
											$elm$json$Json$Decode$succeed($author$project$Json$Schema$boolean))))))),
						A2(
						$author$project$Json$Schema$Decode$withType,
						'null',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'description',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'title',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Json$Schema$null)))))),
						A2(
						$author$project$Json$Schema$Decode$withField,
						'properties',
						A2(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
							$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'examples',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
								_List_Nil,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'maxProperties',
									$elm$json$Json$Decode$int,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'minProperties',
										$elm$json$Json$Decode$int,
										A4(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
											'required',
											$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
											_List_Nil,
											A4(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
												'properties',
												$elm$json$Json$Decode$dict(
													$author$project$Json$Schema$Decode$cyclic$schemaDecoder()),
												$elm$core$Dict$empty,
												A3(
													$author$project$Json$Schema$Decode$maybeOptional,
													'description',
													$elm$json$Json$Decode$string,
													A3(
														$author$project$Json$Schema$Decode$maybeOptional,
														'title',
														$elm$json$Json$Decode$string,
														$elm$json$Json$Decode$succeed($author$project$Json$Schema$object)))))))))),
						A2(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
						$author$project$Json$Schema$Decode$cyclic$combinatorDecoder(),
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'examples',
							$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
							_List_Nil,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'$ref',
								A2($elm$json$Json$Decode$map, $author$project$Json$Schema$Decode$normalizeRef, $elm$json$Json$Decode$string),
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'description',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'title',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Json$Schema$reference)))))),
						A2(
						$elm$json$Json$Decode$map,
						$author$project$Json$Schema$OneOf,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'examples',
							$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
							_List_Nil,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'oneOf',
								$elm$json$Json$Decode$list(
									$author$project$Json$Schema$Decode$cyclic$schemaDecoder()),
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'description',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'title',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Json$Schema$baseCombinatorSchema)))))),
						A2(
						$elm$json$Json$Decode$map,
						$author$project$Json$Schema$AnyOf,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'examples',
							$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
							_List_Nil,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'anyOf',
								$elm$json$Json$Decode$list(
									$author$project$Json$Schema$Decode$cyclic$schemaDecoder()),
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'description',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'title',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Json$Schema$baseCombinatorSchema)))))),
						A2(
						$elm$json$Json$Decode$map,
						$author$project$Json$Schema$AllOf,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'examples',
							$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
							_List_Nil,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'allOf',
								$elm$json$Json$Decode$list(
									$author$project$Json$Schema$Decode$cyclic$schemaDecoder()),
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'description',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'title',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed($author$project$Json$Schema$baseCombinatorSchema)))))),
						A2($elm$json$Json$Decode$map, $author$project$Json$Schema$Fallback, $elm$json$Json$Decode$value)
					]));
		});
}
var $author$project$Json$Schema$Decode$combinatorDecoder = $author$project$Json$Schema$Decode$cyclic$combinatorDecoder();
$author$project$Json$Schema$Decode$cyclic$combinatorDecoder = function () {
	return $author$project$Json$Schema$Decode$combinatorDecoder;
};
var $author$project$Json$Schema$Decode$schemaDecoder = $author$project$Json$Schema$Decode$cyclic$schemaDecoder();
$author$project$Json$Schema$Decode$cyclic$schemaDecoder = function () {
	return $author$project$Json$Schema$Decode$schemaDecoder;
};
var $author$project$Json$Schema$Decode$isOpenApi = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			$elm$core$Basics$always(0),
			A2($elm$json$Json$Decode$field, 'openapi', $elm$json$Json$Decode$string)),
			A2(
			$elm$json$Json$Decode$map,
			$elm$core$Basics$always(0),
			A2($elm$json$Json$Decode$field, 'swagger', $elm$json$Json$Decode$string))
		]));
var $author$project$Json$Schema$Decode$syntheticObject = F4(
	function (title, description, requiredList, props) {
		return A8(
			$author$project$Json$Schema$object,
			title,
			description,
			$elm$core$Dict$fromList(props),
			requiredList,
			$elm$core$Maybe$Nothing,
			$elm$core$Maybe$Nothing,
			_List_Nil,
			$elm$core$Maybe$Nothing);
	});
var $author$project$Json$Schema$Decode$syntheticRoot = function (pairs) {
	return A4(
		$author$project$Json$Schema$Decode$syntheticObject,
		$elm$core$Maybe$Just('OpenAPI Document'),
		$elm$core$Maybe$Just('Top-level sections of this OpenAPI document.'),
		_List_Nil,
		pairs);
};
var $author$project$Json$Schema$Decode$definitionsDecoder = function () {
	var readDefs = function (key) {
		return A2(
			$elm$json$Json$Decode$map,
			$elm$core$Maybe$withDefault($elm$core$Dict$empty),
			$elm$json$Json$Decode$maybe(
				A2(
					$elm$json$Json$Decode$field,
					key,
					A2(
						$elm$json$Json$Decode$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$List$map(
								$elm$core$Tuple$mapFirst(
									function (k) {
										return '#/definitions/' + k;
									})),
							$elm$core$Dict$fromList),
						$elm$json$Json$Decode$keyValuePairs($author$project$Json$Schema$Decode$schemaDecoder)))));
	};
	return A3(
		$elm$json$Json$Decode$map2,
		$elm$core$Dict$union,
		readDefs('definitions'),
		readDefs('$defs'));
}();
var $author$project$Json$Schema$Decode$stringPill = F2(
	function (title, description) {
		return $author$project$Json$Schema$String(
			{w: $elm$core$Maybe$Nothing, N: title, bh: $elm$core$Maybe$Nothing, bp: $elm$core$Maybe$Nothing, u: _List_Nil, bs: $elm$core$Maybe$Nothing, bt: $elm$core$Maybe$Nothing, I: $elm$core$Maybe$Nothing, a: description});
	});
var $author$project$Json$Schema$Decode$refSchemaDecoder = A2(
	$elm$json$Json$Decode$map,
	function (ref) {
		return A5(
			$author$project$Json$Schema$reference,
			$elm$core$Maybe$Nothing,
			$elm$core$Maybe$Nothing,
			$author$project$Json$Schema$Decode$normalizeRef(ref),
			_List_Nil,
			$elm$core$Maybe$Nothing);
	},
	A2($elm$json$Json$Decode$field, '$ref', $elm$json$Json$Decode$string));
var $author$project$Json$Schema$Decode$linkDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					$author$project$Json$Schema$Decode$refSchemaDecoder,
					A4(
					$elm$json$Json$Decode$map3,
					F3(
						function (opId, opRef, desc) {
							var title = function () {
								if (!opId.$) {
									var v = opId.a;
									return $elm$core$Maybe$Just(v);
								} else {
									return opRef;
								}
							}();
							return A2($author$project$Json$Schema$Decode$stringPill, title, desc);
						}),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'operationId', $elm$json$Json$Decode$string)),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'operationRef', $elm$json$Json$Decode$string)),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)))
				]));
	});
var $author$project$Json$Schema$Decode$combineLists = A2(
	$elm$core$List$foldr,
	$elm$json$Json$Decode$map2($elm$core$Basics$append),
	$elm$json$Json$Decode$succeed(_List_Nil));
var $author$project$Json$Schema$Decode$anySchema = A2($author$project$Json$Schema$Decode$stringPill, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
var $author$project$Json$Schema$Decode$mergeDescriptions = F2(
	function (outer, inner) {
		var _v0 = _Utils_Tuple2(outer, inner);
		if (_v0.a.$ === 1) {
			if (_v0.b.$ === 1) {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $elm$core$Maybe$Nothing;
			} else {
				var _v4 = _v0.a;
				var i = _v0.b.a;
				return $elm$core$Maybe$Just(i);
			}
		} else {
			if (_v0.b.$ === 1) {
				var o = _v0.a.a;
				var _v3 = _v0.b;
				return $elm$core$Maybe$Just(o);
			} else {
				var o = _v0.a.a;
				var i = _v0.b.a;
				return $elm$core$Maybe$Just(o + ('\u000A\u000A' + i));
			}
		}
	});
var $author$project$Json$Schema$Decode$attachDescription = F2(
	function (outer, schema) {
		if (outer.$ === 1) {
			return schema;
		} else {
			switch (schema.$) {
				case 2:
					var r = schema.a;
					return $author$project$Json$Schema$String(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 3:
					var r = schema.a;
					return $author$project$Json$Schema$Integer(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 4:
					var r = schema.a;
					return $author$project$Json$Schema$Number(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 5:
					var r = schema.a;
					return $author$project$Json$Schema$Boolean(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 0:
					var r = schema.a;
					return $author$project$Json$Schema$Object(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 1:
					var r = schema.a;
					return $author$project$Json$Schema$Array(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 6:
					var r = schema.a;
					return $author$project$Json$Schema$Null(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 7:
					var r = schema.a;
					return $author$project$Json$Schema$Ref(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 8:
					var r = schema.a;
					return $author$project$Json$Schema$OneOf(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 9:
					var r = schema.a;
					return $author$project$Json$Schema$AnyOf(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				case 10:
					var r = schema.a;
					return $author$project$Json$Schema$AllOf(
						_Utils_update(
							r,
							{
								a: A2($author$project$Json$Schema$Decode$mergeDescriptions, outer, r.a)
							}));
				default:
					return schema;
			}
		}
	});
var $author$project$Json$Schema$Decode$parameterOrHeaderDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					$author$project$Json$Schema$Decode$refSchemaDecoder,
					A3(
					$elm$json$Json$Decode$map2,
					$author$project$Json$Schema$Decode$attachDescription,
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)),
					A2($elm$json$Json$Decode$field, 'schema', $author$project$Json$Schema$Decode$schemaDecoder)),
					$author$project$Json$Schema$Decode$schemaDecoder,
					$elm$json$Json$Decode$succeed($author$project$Json$Schema$Decode$anySchema)
				]));
	});
var $author$project$Json$Schema$Decode$headerDecoder = $author$project$Json$Schema$Decode$parameterOrHeaderDecoder;
var $author$project$Json$Schema$Decode$exampleDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					$author$project$Json$Schema$Decode$refSchemaDecoder,
					A3(
					$elm$json$Json$Decode$map2,
					F2(
						function (summary, desc) {
							return A2($author$project$Json$Schema$Decode$stringPill, summary, desc);
						}),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'summary', $elm$json$Json$Decode$string)),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)))
				]));
	});
var $author$project$Json$Schema$Decode$decodersToList = A2(
	$elm$core$List$foldr,
	$elm$json$Json$Decode$map2($elm$core$List$cons),
	$elm$json$Json$Decode$succeed(_List_Nil));
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Json$Schema$Decode$buildOperation = F9(
	function (verb, summary, description, operationId, deprecated, tags, parameters, requestBody, responses) {
		var verbUpper = $elm$core$String$toUpper(verb);
		var descLines = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					description,
					A2(
					$elm$core$Maybe$map,
					function (o) {
						return 'operationId: ' + o;
					},
					operationId),
					$elm$core$List$isEmpty(tags) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					'tags: ' + A2($elm$core$String$join, ', ', tags))
				]));
		var baseTitle = function () {
			if (!summary.$) {
				var s = summary.a;
				return verbUpper + (' — ' + s);
			} else {
				return verbUpper;
			}
		}();
		var titleText = deprecated ? (baseTitle + ' [DEPRECATED]') : baseTitle;
		var descText = $elm$core$List$isEmpty(descLines) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			A2($elm$core$String$join, '\u000A\u000A', descLines));
		var props = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					A2(
					$elm$core$Maybe$map,
					function (p) {
						return _Utils_Tuple2('parameters', p);
					},
					parameters),
					A2(
					$elm$core$Maybe$map,
					function (b) {
						return _Utils_Tuple2('requestBody', b);
					},
					requestBody),
					A2(
					$elm$core$Maybe$map,
					function (r) {
						return _Utils_Tuple2('responses', r);
					},
					responses)
				]));
		return A4(
			$author$project$Json$Schema$Decode$syntheticObject,
			$elm$core$Maybe$Just(titleText),
			descText,
			_List_Nil,
			props);
	});
var $author$project$Json$Schema$Decode$refOrDescribed = function (content) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$author$project$Json$Schema$Decode$refSchemaDecoder,
				A3(
				$elm$json$Json$Decode$map2,
				$author$project$Json$Schema$Decode$attachDescription,
				$elm$json$Json$Decode$maybe(
					A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)),
				content)
			]));
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Json$Schema$Decode$pickContentSchema = function (pairs) {
	var preferred = A2(
		$elm$core$List$filterMap,
		function (_v2) {
			var ct = _v2.a;
			var ms = _v2.b;
			return (ct === 'application/json') ? ms : $elm$core$Maybe$Nothing;
		},
		pairs);
	if (preferred.b) {
		var s = preferred.a;
		return s;
	} else {
		var _v1 = A2($elm$core$List$filterMap, $elm$core$Tuple$second, pairs);
		if (_v1.b) {
			var s = _v1.a;
			return s;
		} else {
			return $author$project$Json$Schema$Decode$anySchema;
		}
	}
};
var $author$project$Json$Schema$Decode$contentSchemaDecoder = A2(
	$elm$json$Json$Decode$map,
	function (maybePairs) {
		if (!maybePairs.$) {
			var pairs = maybePairs.a;
			return $author$project$Json$Schema$Decode$pickContentSchema(pairs);
		} else {
			return $author$project$Json$Schema$Decode$anySchema;
		}
	},
	$elm$json$Json$Decode$maybe(
		A2(
			$elm$json$Json$Decode$field,
			'content',
			$elm$json$Json$Decode$keyValuePairs(
				$elm$json$Json$Decode$maybe(
					A2($elm$json$Json$Decode$field, 'schema', $author$project$Json$Schema$Decode$schemaDecoder))))));
var $author$project$Json$Schema$Decode$requestBodyDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $author$project$Json$Schema$Decode$refOrDescribed($author$project$Json$Schema$Decode$contentSchemaDecoder);
	});
var $author$project$Json$Schema$Decode$responseDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $author$project$Json$Schema$Decode$refOrDescribed($author$project$Json$Schema$Decode$contentSchemaDecoder);
	});
var $author$project$Json$Schema$Decode$responsesMapDecoder = A2(
	$elm$json$Json$Decode$map,
	function (pairs) {
		return A4($author$project$Json$Schema$Decode$syntheticObject, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, _List_Nil, pairs);
	},
	$elm$json$Json$Decode$keyValuePairs($author$project$Json$Schema$Decode$responseDecoder));
var $author$project$Json$Schema$Decode$refName = function (ref) {
	return A2(
		$elm$core$Maybe$withDefault,
		ref,
		$elm$core$List$head(
			$elm$core$List$reverse(
				A2($elm$core$String$split, '/', ref))));
};
var $author$project$Json$Schema$Decode$inlineParameterSchema = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A3(
			$elm$json$Json$Decode$map2,
			$author$project$Json$Schema$Decode$attachDescription,
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)),
			A2($elm$json$Json$Decode$field, 'schema', $author$project$Json$Schema$Decode$schemaDecoder)),
			$author$project$Json$Schema$Decode$schemaDecoder,
			$elm$json$Json$Decode$succeed($author$project$Json$Schema$Decode$anySchema)
		]));
var $author$project$Json$Schema$Decode$inlineParameterEntry = A2(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
	$author$project$Json$Schema$Decode$inlineParameterSchema,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'required',
		$elm$json$Json$Decode$bool,
		false,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'name',
			$elm$json$Json$Decode$string,
			$elm$json$Json$Decode$succeed(
				F3(
					function (name, requiredFlag, schema) {
						return _Utils_Tuple3(name, requiredFlag, schema);
					})))));
var $author$project$Json$Schema$Decode$parameterEntryDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$map,
					function (ref) {
						var normalized = $author$project$Json$Schema$Decode$normalizeRef(ref);
						return _Utils_Tuple3(
							$author$project$Json$Schema$Decode$refName(normalized),
							false,
							A5($author$project$Json$Schema$reference, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, normalized, _List_Nil, $elm$core$Maybe$Nothing));
					},
					A2($elm$json$Json$Decode$field, '$ref', $elm$json$Json$Decode$string)),
					$author$project$Json$Schema$Decode$inlineParameterEntry
				]));
	});
var $author$project$Json$Schema$Decode$parametersListDecoder = A2(
	$elm$json$Json$Decode$map,
	function (entries) {
		var requiredNames = A2(
			$elm$core$List$filterMap,
			function (_v1) {
				var n = _v1.a;
				var r = _v1.b;
				return r ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
			},
			entries);
		var pairs = A2(
			$elm$core$List$map,
			function (_v0) {
				var n = _v0.a;
				var s = _v0.c;
				return _Utils_Tuple2(n, s);
			},
			entries);
		return A4($author$project$Json$Schema$Decode$syntheticObject, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, requiredNames, pairs);
	},
	$elm$json$Json$Decode$list($author$project$Json$Schema$Decode$parameterEntryDecoder));
var $author$project$Json$Schema$Decode$operationDecoder = function (verb) {
	return $elm$json$Json$Decode$lazy(
		function (_v0) {
			return A2(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
				$elm$json$Json$Decode$maybe(
					A2($elm$json$Json$Decode$field, 'responses', $author$project$Json$Schema$Decode$responsesMapDecoder)),
				A2(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'requestBody', $author$project$Json$Schema$Decode$requestBodyDecoder)),
					A2(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
						$elm$json$Json$Decode$maybe(
							A2($elm$json$Json$Decode$field, 'parameters', $author$project$Json$Schema$Decode$parametersListDecoder)),
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'tags',
							$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
							_List_Nil,
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'deprecated',
								$elm$json$Json$Decode$bool,
								false,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'operationId',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'description',
										$elm$json$Json$Decode$string,
										A3(
											$author$project$Json$Schema$Decode$maybeOptional,
											'summary',
											$elm$json$Json$Decode$string,
											$elm$json$Json$Decode$succeed(
												$author$project$Json$Schema$Decode$buildOperation(verb))))))))));
		});
};
var $author$project$Json$Schema$Decode$pathItemVerbsDecoder = function () {
	var decodeVerb = function (verb) {
		return A2(
			$elm$json$Json$Decode$map,
			$elm$core$Maybe$map(
				function (op) {
					return _Utils_Tuple2(verb, op);
				}),
			$elm$json$Json$Decode$maybe(
				A2(
					$elm$json$Json$Decode$field,
					verb,
					$author$project$Json$Schema$Decode$operationDecoder(verb))));
	};
	var verbs = _List_fromArray(
		['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']);
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$List$filterMap($elm$core$Basics$identity),
		$author$project$Json$Schema$Decode$decodersToList(
			A2($elm$core$List$map, decodeVerb, verbs)));
}();
var $author$project$Json$Schema$Decode$inlinePathItemDecoder = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (summary, description, verbPairs) {
			return A4($author$project$Json$Schema$Decode$syntheticObject, summary, description, _List_Nil, verbPairs);
		}),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'summary', $elm$json$Json$Decode$string)),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)),
	$author$project$Json$Schema$Decode$pathItemVerbsDecoder);
var $author$project$Json$Schema$Decode$pathItemDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[$author$project$Json$Schema$Decode$refSchemaDecoder, $author$project$Json$Schema$Decode$inlinePathItemDecoder]));
	});
var $author$project$Json$Schema$Decode$callbackDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					$author$project$Json$Schema$Decode$refSchemaDecoder,
					A2(
					$elm$json$Json$Decode$map,
					function (pairs) {
						return A4($author$project$Json$Schema$Decode$syntheticObject, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, _List_Nil, pairs);
					},
					$elm$json$Json$Decode$keyValuePairs($author$project$Json$Schema$Decode$pathItemDecoder))
				]));
	});
var $author$project$Json$Schema$Decode$maybeToSection = F2(
	function (title, m) {
		if (!m.$) {
			var s = m.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(title, s)
				]);
		} else {
			return _List_Nil;
		}
	});
var $author$project$Json$Schema$Decode$linesToDescription = function (lines) {
	return $elm$core$List$isEmpty(lines) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		A2($elm$core$String$join, '\u000A', lines));
};
var $author$project$Json$Schema$Decode$infoBlockDecoder = function () {
	var build = F9(
		function (title, version, description, tos, contactName, contactEmail, contactUrl, licenseName, licenseUrl) {
			var lines = A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'title: ' + v;
						},
						title),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'version: ' + v;
						},
						version),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'description: ' + v;
						},
						description),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'terms of service: ' + v;
						},
						tos),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'contact name: ' + v;
						},
						contactName),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'contact email: ' + v;
						},
						contactEmail),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'contact url: ' + v;
						},
						contactUrl),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'license: ' + v;
						},
						licenseName),
						A2(
						$elm$core$Maybe$map,
						function (v) {
							return 'license url: ' + v;
						},
						licenseUrl)
					]));
			return A2(
				$author$project$Json$Schema$Decode$stringPill,
				title,
				$author$project$Json$Schema$Decode$linesToDescription(lines));
		});
	return A2(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
		$elm$json$Json$Decode$maybe(
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['license', 'url']),
				$elm$json$Json$Decode$string)),
		A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			$elm$json$Json$Decode$maybe(
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['license', 'name']),
					$elm$json$Json$Decode$string)),
			A2(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
				$elm$json$Json$Decode$maybe(
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['contact', 'url']),
						$elm$json$Json$Decode$string)),
				A2(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
					$elm$json$Json$Decode$maybe(
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['contact', 'email']),
							$elm$json$Json$Decode$string)),
					A2(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
						$elm$json$Json$Decode$maybe(
							A2(
								$elm$json$Json$Decode$at,
								_List_fromArray(
									['contact', 'name']),
								$elm$json$Json$Decode$string)),
						A3(
							$author$project$Json$Schema$Decode$maybeOptional,
							'termsOfService',
							$elm$json$Json$Decode$string,
							A3(
								$author$project$Json$Schema$Decode$maybeOptional,
								'description',
								$elm$json$Json$Decode$string,
								A3(
									$author$project$Json$Schema$Decode$maybeOptional,
									'version',
									$elm$json$Json$Decode$string,
									A3(
										$author$project$Json$Schema$Decode$maybeOptional,
										'title',
										$elm$json$Json$Decode$string,
										$elm$json$Json$Decode$succeed(build))))))))));
}();
var $author$project$Json$Schema$Decode$infoSectionDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Json$Schema$Decode$maybeToSection('Info'),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'info', $author$project$Json$Schema$Decode$infoBlockDecoder)));
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Json$Schema$Decode$tagsBlockDecoder = A2(
	$elm$json$Json$Decode$map,
	function (entries) {
		var lines = A2(
			$elm$core$List$map,
			function (_v0) {
				var name = _v0.a;
				var mDesc = _v0.b;
				if (!mDesc.$) {
					var d = mDesc.a;
					return name + (' — ' + d);
				} else {
					return name;
				}
			},
			entries);
		return A2(
			$author$project$Json$Schema$Decode$stringPill,
			$elm$core$Maybe$Just('Tags'),
			$author$project$Json$Schema$Decode$linesToDescription(lines));
	},
	$elm$json$Json$Decode$list(
		A3(
			$elm$json$Json$Decode$map2,
			$elm$core$Tuple$pair,
			A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)))));
var $author$project$Json$Schema$Decode$tagsSectionDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Json$Schema$Decode$maybeToSection('Tags'),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'tags', $author$project$Json$Schema$Decode$tagsBlockDecoder)));
var $author$project$Json$Schema$Decode$namedPairsAt = F2(
	function (path, inner) {
		return A2(
			$elm$json$Json$Decode$map,
			$elm$core$Maybe$withDefault(_List_Nil),
			$elm$json$Json$Decode$maybe(
				A2(
					$elm$json$Json$Decode$at,
					path,
					$elm$json$Json$Decode$keyValuePairs(inner))));
	});
var $author$project$Json$Schema$Decode$pairsToSection = F3(
	function (title, description, pairs) {
		return $elm$core$List$isEmpty(pairs) ? _List_Nil : _List_fromArray(
			[
				_Utils_Tuple2(
				title,
				A4(
					$author$project$Json$Schema$Decode$syntheticObject,
					$elm$core$Maybe$Just(title),
					$elm$core$Maybe$Just(description),
					_List_Nil,
					pairs))
			]);
	});
var $author$project$Json$Schema$Decode$pathsSectionDecoder = A2(
	$elm$json$Json$Decode$map,
	A2($author$project$Json$Schema$Decode$pairsToSection, 'Paths', 'API endpoints defined by this document.'),
	A2(
		$author$project$Json$Schema$Decode$namedPairsAt,
		_List_fromArray(
			['paths']),
		$author$project$Json$Schema$Decode$pathItemDecoder));
var $author$project$Json$Schema$Decode$schemasSectionDecoder = A2(
	$elm$json$Json$Decode$map,
	A2($author$project$Json$Schema$Decode$pairsToSection, 'Schemas', 'Named schemas declared by this OpenAPI document.'),
	A3(
		$elm$json$Json$Decode$map2,
		$elm$core$Basics$append,
		A2(
			$author$project$Json$Schema$Decode$namedPairsAt,
			_List_fromArray(
				['components', 'schemas']),
			$author$project$Json$Schema$Decode$schemaDecoder),
		A2(
			$author$project$Json$Schema$Decode$namedPairsAt,
			_List_fromArray(
				['definitions']),
			$author$project$Json$Schema$Decode$schemaDecoder)));
var $author$project$Json$Schema$Decode$securitySchemeDecoder = $elm$json$Json$Decode$lazy(
	function (_v0) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					$author$project$Json$Schema$Decode$refSchemaDecoder,
					A3(
					$elm$json$Json$Decode$map2,
					F2(
						function (type_, desc) {
							return A2(
								$author$project$Json$Schema$Decode$stringPill,
								$elm$core$Maybe$Just(
									A2($elm$core$Maybe$withDefault, '(security scheme)', type_)),
								desc);
						}),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string)),
					$elm$json$Json$Decode$maybe(
						A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)))
				]));
	});
var $author$project$Json$Schema$Decode$serversBlockDecoder = A2(
	$elm$json$Json$Decode$map,
	function (entries) {
		var lines = A2(
			$elm$core$List$map,
			function (_v0) {
				var url = _v0.a;
				var mDesc = _v0.b;
				if (!mDesc.$) {
					var d = mDesc.a;
					return url + (' — ' + d);
				} else {
					return url;
				}
			},
			entries);
		return A2(
			$author$project$Json$Schema$Decode$stringPill,
			$elm$core$Maybe$Just('Servers'),
			$author$project$Json$Schema$Decode$linesToDescription(lines));
	},
	$elm$json$Json$Decode$list(
		A3(
			$elm$json$Json$Decode$map2,
			$elm$core$Tuple$pair,
			A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)))));
var $author$project$Json$Schema$Decode$serversSectionDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Json$Schema$Decode$maybeToSection('Servers'),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'servers', $author$project$Json$Schema$Decode$serversBlockDecoder)));
var $author$project$Json$Schema$Decode$webhooksSectionDecoder = A2(
	$elm$json$Json$Decode$map,
	A2($author$project$Json$Schema$Decode$pairsToSection, 'Webhooks', 'Outgoing webhook endpoints.'),
	A2(
		$author$project$Json$Schema$Decode$namedPairsAt,
		_List_fromArray(
			['webhooks']),
		$author$project$Json$Schema$Decode$pathItemDecoder));
var $author$project$Json$Schema$Decode$componentsSectionDecoder = F5(
	function (subKey, swaggerPaths, sectionTitle, sectionDesc, entryDecoder) {
		var fallbacks = A2(
			$elm$core$List$map,
			function (p) {
				return A2($author$project$Json$Schema$Decode$namedPairsAt, p, entryDecoder);
			},
			swaggerPaths);
		var primary = A2(
			$author$project$Json$Schema$Decode$namedPairsAt,
			_List_fromArray(
				['components', subKey]),
			entryDecoder);
		return A2(
			$elm$json$Json$Decode$map,
			A2($author$project$Json$Schema$Decode$pairsToSection, sectionTitle, sectionDesc),
			$author$project$Json$Schema$Decode$combineLists(
				A2($elm$core$List$cons, primary, fallbacks)));
	});
var $author$project$Json$Schema$Decode$parameterComponentDecoder = $author$project$Json$Schema$Decode$parameterOrHeaderDecoder;
var $author$project$Json$Schema$Decode$oasRootSectionsDecoder = $author$project$Json$Schema$Decode$combineLists(
	_List_fromArray(
		[
			$author$project$Json$Schema$Decode$infoSectionDecoder,
			$author$project$Json$Schema$Decode$serversSectionDecoder,
			$author$project$Json$Schema$Decode$tagsSectionDecoder,
			$author$project$Json$Schema$Decode$pathsSectionDecoder,
			$author$project$Json$Schema$Decode$webhooksSectionDecoder,
			$author$project$Json$Schema$Decode$schemasSectionDecoder,
			A5(
			$author$project$Json$Schema$Decode$componentsSectionDecoder,
			'parameters',
			_List_fromArray(
				[
					_List_fromArray(
					['parameters'])
				]),
			'Parameters',
			'Reusable parameter definitions.',
			$author$project$Json$Schema$Decode$parameterComponentDecoder),
			A5($author$project$Json$Schema$Decode$componentsSectionDecoder, 'requestBodies', _List_Nil, 'Request Bodies', 'Reusable request body definitions.', $author$project$Json$Schema$Decode$requestBodyDecoder),
			A5(
			$author$project$Json$Schema$Decode$componentsSectionDecoder,
			'responses',
			_List_fromArray(
				[
					_List_fromArray(
					['responses'])
				]),
			'Responses',
			'Reusable response definitions.',
			$author$project$Json$Schema$Decode$responseDecoder),
			A5($author$project$Json$Schema$Decode$componentsSectionDecoder, 'headers', _List_Nil, 'Headers', 'Reusable header definitions.', $author$project$Json$Schema$Decode$headerDecoder),
			A5(
			$author$project$Json$Schema$Decode$componentsSectionDecoder,
			'securitySchemes',
			_List_fromArray(
				[
					_List_fromArray(
					['securityDefinitions'])
				]),
			'Security Schemes',
			'Security schemes declared by this document.',
			$author$project$Json$Schema$Decode$securitySchemeDecoder),
			A5($author$project$Json$Schema$Decode$componentsSectionDecoder, 'examples', _List_Nil, 'Examples', 'Reusable example definitions.', $author$project$Json$Schema$Decode$exampleDecoder),
			A5($author$project$Json$Schema$Decode$componentsSectionDecoder, 'links', _List_Nil, 'Links', 'Reusable link definitions.', $author$project$Json$Schema$Decode$linkDecoder),
			A5($author$project$Json$Schema$Decode$componentsSectionDecoder, 'callbacks', _List_Nil, 'Callbacks', 'Reusable callback definitions.', $author$project$Json$Schema$Decode$callbackDecoder)
		]));
var $author$project$Json$Schema$Decode$prefixed = function (prefix) {
	return $elm$json$Json$Decode$map(
		$elm$core$List$map(
			$elm$core$Tuple$mapFirst(
				$elm$core$Basics$append(prefix))));
};
var $author$project$Json$Schema$Decode$oasAllDefinitionsDecoder = A2(
	$elm$json$Json$Decode$map,
	$elm$core$Dict$fromList,
	$author$project$Json$Schema$Decode$combineLists(
		_List_fromArray(
			[
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/schemas/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'schemas']),
					$author$project$Json$Schema$Decode$schemaDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/parameters/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'parameters']),
					$author$project$Json$Schema$Decode$parameterComponentDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/requestBodies/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'requestBodies']),
					$author$project$Json$Schema$Decode$requestBodyDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/responses/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'responses']),
					$author$project$Json$Schema$Decode$responseDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/headers/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'headers']),
					$author$project$Json$Schema$Decode$headerDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/securitySchemes/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'securitySchemes']),
					$author$project$Json$Schema$Decode$securitySchemeDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/examples/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'examples']),
					$author$project$Json$Schema$Decode$exampleDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/links/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'links']),
					$author$project$Json$Schema$Decode$linkDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/components/callbacks/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['components', 'callbacks']),
					$author$project$Json$Schema$Decode$callbackDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/parameters/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['parameters']),
					$author$project$Json$Schema$Decode$parameterComponentDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/responses/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['responses']),
					$author$project$Json$Schema$Decode$responseDecoder)),
				A2(
				$author$project$Json$Schema$Decode$prefixed,
				'#/securityDefinitions/',
				A2(
					$author$project$Json$Schema$Decode$namedPairsAt,
					_List_fromArray(
						['securityDefinitions']),
					$author$project$Json$Schema$Decode$securitySchemeDecoder))
			])));
var $author$project$Json$Schema$Decode$openApiDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (_v0) {
		return A4(
			$elm$json$Json$Decode$map3,
			F3(
				function (jsonSchemaDefs, oasDefs, sections) {
					return A2(
						$author$project$Json$Schema$Model,
						A2($elm$core$Dict$union, jsonSchemaDefs, oasDefs),
						$author$project$Json$Schema$Decode$syntheticRoot(sections));
				}),
			$author$project$Json$Schema$Decode$definitionsDecoder,
			$author$project$Json$Schema$Decode$oasAllDefinitionsDecoder,
			$author$project$Json$Schema$Decode$oasRootSectionsDecoder);
	},
	$author$project$Json$Schema$Decode$isOpenApi);
var $author$project$Json$Schema$Decode$decoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			$author$project$Json$Schema$Decode$openApiDecoder,
			A3($elm$json$Json$Decode$map2, $author$project$Json$Schema$Model, $author$project$Json$Schema$Decode$definitionsDecoder, $author$project$Json$Schema$Decode$schemaDecoder)
		]));
var $author$project$SchemaSource$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $author$project$SchemaSource$objectFields = A2(
	$elm$core$Basics$composeR,
	$elm$json$Json$Decode$decodeValue(
		$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value)),
	$elm$core$Result$withDefault(_List_Nil));
var $author$project$SchemaSource$Named = function (a) {
	return {$: 0, a: a};
};
var $author$project$SchemaSource$Single = function (a) {
	return {$: 2, a: a};
};
var $author$project$SchemaSource$Indexed = function (a) {
	return {$: 1, a: a};
};
var $author$project$SchemaSource$schemaChildren = F2(
	function (key, value) {
		return A2(
			$elm$core$List$member,
			key,
			_List_fromArray(
				['$defs', 'definitions', 'properties', 'patternProperties', 'dependentSchemas'])) ? A2(
			$elm$core$Maybe$map,
			$author$project$SchemaSource$Named,
			$elm$core$Result$toMaybe(
				A2(
					$elm$json$Json$Decode$decodeValue,
					$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value),
					value))) : (A2(
			$elm$core$List$member,
			key,
			_List_fromArray(
				['allOf', 'anyOf', 'oneOf', 'prefixItems'])) ? A2(
			$elm$core$Maybe$map,
			$author$project$SchemaSource$Indexed,
			$elm$core$Result$toMaybe(
				A2(
					$elm$json$Json$Decode$decodeValue,
					$elm$json$Json$Decode$list($elm$json$Json$Decode$value),
					value))) : (A2(
			$elm$core$List$member,
			key,
			_List_fromArray(
				['items', 'if', 'then', 'else', 'not', 'contains', 'additionalProperties'])) ? $elm$core$Maybe$Just(
			$author$project$SchemaSource$Single(value)) : $elm$core$Maybe$Nothing));
	});
var $author$project$SchemaSource$normalize = F2(
	function (root, value) {
		var _v1 = A2(
			$elm$json$Json$Decode$decodeValue,
			$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value),
			value);
		if (_v1.$ === 1) {
			return value;
		} else {
			var original = _v1.a;
			var definitionProperties = A2(
				$elm$core$List$map,
				$elm$core$Tuple$mapSecond(
					$author$project$SchemaSource$normalize(false)),
				$elm$core$Dict$toList(
					$elm$core$Dict$fromList(
						A2(
							$elm$core$List$concatMap,
							A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $author$project$SchemaSource$objectFields),
							A2(
								$elm$core$List$filter,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Tuple$first,
									function (key) {
										return A2(
											$elm$core$List$member,
											key,
											_List_fromArray(
												['$defs', 'definitions']));
									}),
								original)))));
			var fields = A2(
				$elm$core$List$map,
				function (_v5) {
					var key = _v5.a;
					var child = _v5.b;
					return _Utils_Tuple2(
						key,
						A2($author$project$SchemaSource$normalizeChild, key, child));
				},
				original);
			var constraints = A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					function (key) {
						return A2(
							$elm$core$List$member,
							key,
							_List_fromArray(
								['const', 'dependentRequired', 'additionalItems']));
					}),
				fields);
			var description = A2(
				$elm$core$List$filterMap,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$second,
					A2(
						$elm$core$Basics$composeR,
						$elm$json$Json$Decode$decodeValue($elm$json$Json$Decode$string),
						$elm$core$Result$toMaybe)),
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Tuple$first,
						$elm$core$Basics$eq('description')),
					fields));
			var displayFields = (root && ((!A2(
				$elm$core$List$any,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					function (key) {
						return A2(
							$elm$core$List$member,
							key,
							_List_fromArray(
								['type', 'properties', '$ref', 'allOf', 'anyOf', 'oneOf']));
					}),
				fields)) && (!$elm$core$List$isEmpty(definitionProperties)))) ? A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'properties',
					$elm$json$Json$Encode$object(definitionProperties)),
				fields) : fields;
			var annotated = $elm$core$List$isEmpty(constraints) ? displayFields : A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'description',
					$elm$json$Json$Encode$string(
						A2(
							$elm$core$String$join,
							'\u000A',
							_Utils_ap(
								description,
								A2(
									$elm$core$List$map,
									function (_v4) {
										var key = _v4.a;
										var entry = _v4.b;
										return key + (': ' + A2($elm$json$Json$Encode$encode, 0, entry));
									},
									constraints))))),
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Tuple$first,
						$elm$core$Basics$neq('description')),
					displayFields));
			var _v2 = A2(
				$elm$core$List$partition,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq('$ref')),
				annotated);
			if (_v2.a.b && (!_v2.a.b.b)) {
				var _v3 = _v2.a;
				var reference = _v3.a;
				var rest = _v2.b;
				return A2(
					$elm$core$List$any,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Tuple$first,
						function (key) {
							return A2(
								$elm$core$List$member,
								key,
								_List_fromArray(
									['type', 'properties', 'allOf', 'anyOf', 'oneOf']));
						}),
					rest) ? $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'allOf',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$object,
								_List_fromArray(
									[
										_List_fromArray(
										[reference]),
										rest
									])))
						])) : $elm$json$Json$Encode$object(annotated);
			} else {
				return $elm$json$Json$Encode$object(annotated);
			}
		}
	});
var $author$project$SchemaSource$normalizeChild = F2(
	function (key, value) {
		var _v0 = A2($author$project$SchemaSource$schemaChildren, key, value);
		if (!_v0.$) {
			switch (_v0.a.$) {
				case 0:
					var fields = _v0.a.a;
					return $elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							$elm$core$Tuple$mapSecond(
								$author$project$SchemaSource$normalize(false)),
							fields));
				case 1:
					var children = _v0.a.a;
					return A2(
						$elm$json$Json$Encode$list,
						$author$project$SchemaSource$normalize(false),
						children);
				default:
					var child = _v0.a.a;
					return A2($author$project$SchemaSource$normalize, false, child);
			}
		} else {
			return value;
		}
	});
var $author$project$SchemaSource$childrenList = function (children) {
	switch (children.$) {
		case 0:
			var fields = children.a;
			return A2($elm$core$List$map, $elm$core$Tuple$second, fields);
		case 1:
			var values = children.a;
			return values;
		default:
			var value = children.a;
			return _List_fromArray(
				[value]);
	}
};
var $author$project$SchemaSource$anchors = F2(
	function (root, value) {
		if ((!root) && $author$project$SchemaSource$isOk(
			A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$field, '$id', $elm$json$Json$Decode$string),
				value))) {
			return $elm$core$Dict$empty;
		} else {
			var nested = A3(
				$elm$core$List$foldl,
				$elm$core$Dict$union,
				$elm$core$Dict$empty,
				A2(
					$elm$core$List$map,
					$author$project$SchemaSource$anchors(false),
					A2(
						$elm$core$List$concatMap,
						$author$project$SchemaSource$childrenList,
						A2(
							$elm$core$List$filterMap,
							function (_v1) {
								var key = _v1.a;
								var child = _v1.b;
								return A2($author$project$SchemaSource$schemaChildren, key, child);
							},
							$author$project$SchemaSource$objectFields(value)))));
			var _v0 = A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$field, '$anchor', $elm$json$Json$Decode$string),
				value);
			if (!_v0.$) {
				var name = _v0.a;
				return A3(
					$elm$core$Dict$insert,
					'#' + name,
					A2($author$project$SchemaSource$normalize, false, value),
					nested);
			} else {
				return nested;
			}
		}
	});
var $author$project$SchemaSource$prepare = function (value) {
	return $author$project$SchemaSource$isOk(
		A2(
			$elm$json$Json$Decode$decodeValue,
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, 'openapi', $elm$json$Json$Decode$string),
						A2($elm$json$Json$Decode$field, 'swagger', $elm$json$Json$Decode$string)
					])),
			value)) ? _Utils_Tuple2(value, $elm$core$Dict$empty) : _Utils_Tuple2(
		A2($author$project$SchemaSource$normalize, true, value),
		A2($author$project$SchemaSource$anchors, true, value));
};
var $author$project$SchemaDiagram$Document = F3(
	function (model, initial, title) {
		return {V: model, N: title, bn: initial};
	});
var $author$project$SchemaDiagram$nonEmpty = function (value) {
	return $elm$core$String$isEmpty(value) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value);
};
var $elm$core$Set$union = F2(
	function (_v0, _v1) {
		var dict1 = _v0;
		var dict2 = _v1;
		return A2($elm$core$Dict$union, dict1, dict2);
	});
var $author$project$Json$Schema$Decode$namesAt = function (path) {
	return A2(
		$elm$json$Json$Decode$map,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$withDefault(_List_Nil),
			$elm$core$List$map($elm$core$Tuple$first)),
		$elm$json$Json$Decode$maybe(
			A2(
				$elm$json$Json$Decode$at,
				path,
				$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value))));
};
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $author$project$Json$Schema$Decode$unionNames = function (paths) {
	return $author$project$Json$Schema$Decode$combineLists(
		A2($elm$core$List$map, $author$project$Json$Schema$Decode$namesAt, paths));
};
var $author$project$Json$Schema$Decode$collapseForSection = F2(
	function (sectionName, namesDecoder) {
		return A2(
			$elm$json$Json$Decode$map,
			$elm$core$List$map(
				function (n) {
					return 'root.properties.' + (sectionName + ('.properties.' + n));
				}),
			namesDecoder);
	});
var $author$project$Json$Schema$Decode$schemasNamesDecoder = $author$project$Json$Schema$Decode$unionNames(
	_List_fromArray(
		[
			_List_fromArray(
			['components', 'schemas']),
			_List_fromArray(
			['definitions'])
		]));
var $author$project$Json$Schema$Decode$propNameSchema = function (prop) {
	if (!prop.$) {
		var n = prop.a;
		var s = prop.b;
		return _Utils_Tuple2(n, s);
	} else {
		var n = prop.a;
		var s = prop.b;
		return _Utils_Tuple2(n, s);
	}
};
var $author$project$Json$Schema$Decode$multiPaths = F2(
	function (basePath, subs) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, s) {
						var itemPath = basePath + ('.' + $elm$core$String$fromInt(i));
						return A2(
							$elm$core$List$cons,
							itemPath,
							A2($author$project$Json$Schema$Decode$allExpandablePathsUnder, itemPath, s));
					}),
				subs));
	});
var $author$project$Json$Schema$Decode$combinatorPaths = F2(
	function (basePath, m) {
		if (m.$ === 1) {
			return _List_Nil;
		} else {
			var _v4 = m.a;
			var subs = _v4.b;
			var combPath = basePath + '.combinator';
			return A2(
				$elm$core$List$cons,
				combPath,
				A2($author$project$Json$Schema$Decode$multiPaths, combPath, subs));
		}
	});
var $author$project$Json$Schema$Decode$allExpandablePathsUnder = F2(
	function (basePath, schema) {
		switch (schema.$) {
			case 0:
				var combinator = schema.a.I;
				var properties = schema.a.bu;
				return _Utils_ap(
					A2(
						$elm$core$List$concatMap,
						function (prop) {
							var _v1 = $author$project$Json$Schema$Decode$propNameSchema(prop);
							var name = _v1.a;
							var child = _v1.b;
							var childPath = basePath + ('.properties.' + name);
							return A2(
								$elm$core$List$cons,
								childPath,
								A2($author$project$Json$Schema$Decode$allExpandablePathsUnder, childPath, child));
						},
						properties),
					A2($author$project$Json$Schema$Decode$combinatorPaths, basePath, combinator));
			case 1:
				var combinator = schema.a.I;
				var items = schema.a.bf;
				return _Utils_ap(
					function () {
						if (!items.$) {
							var s = items.a;
							var itemPath = basePath + '.items';
							return A2(
								$elm$core$List$cons,
								itemPath,
								A2($author$project$Json$Schema$Decode$allExpandablePathsUnder, itemPath, s));
						} else {
							return _List_Nil;
						}
					}(),
					A2($author$project$Json$Schema$Decode$combinatorPaths, basePath, combinator));
			case 8:
				var subSchemas = schema.a.an;
				return A2($author$project$Json$Schema$Decode$multiPaths, basePath, subSchemas);
			case 9:
				var subSchemas = schema.a.an;
				return A2($author$project$Json$Schema$Decode$multiPaths, basePath, subSchemas);
			case 10:
				var subSchemas = schema.a.an;
				return A2($author$project$Json$Schema$Decode$multiPaths, basePath, subSchemas);
			default:
				return _List_Nil;
		}
	});
var $author$project$Json$Schema$Decode$deepCollapseInEndpointSections = function (rootSchema) {
	if (!rootSchema.$) {
		var properties = rootSchema.a.bu;
		return $elm$core$Set$fromList(
			A2(
				$elm$core$List$concatMap,
				function (prop) {
					var _v1 = $author$project$Json$Schema$Decode$propNameSchema(prop);
					var name = _v1.a;
					var child = _v1.b;
					return ((name === 'Paths') || (name === 'Webhooks')) ? A2($author$project$Json$Schema$Decode$allExpandablePathsUnder, 'root.properties.' + name, child) : _List_Nil;
				},
				properties));
	} else {
		return $elm$core$Set$empty;
	}
};
var $author$project$Json$Schema$Decode$endpointsDeepCollapseDecoder = A2(
	$elm$json$Json$Decode$map,
	function (_v0) {
		var schema = _v0.bk;
		return $author$project$Json$Schema$Decode$deepCollapseInEndpointSections(schema);
	},
	$author$project$Json$Schema$Decode$openApiDecoder);
var $author$project$Json$Schema$Decode$oasCollapsedPathsDecoder = A3(
	$elm$json$Json$Decode$map2,
	$elm$core$Set$union,
	A2(
		$elm$json$Json$Decode$map,
		$elm$core$Set$fromList,
		$author$project$Json$Schema$Decode$combineLists(
			_List_fromArray(
				[
					A2($author$project$Json$Schema$Decode$collapseForSection, 'Schemas', $author$project$Json$Schema$Decode$schemasNamesDecoder),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Parameters',
					$author$project$Json$Schema$Decode$unionNames(
						_List_fromArray(
							[
								_List_fromArray(
								['components', 'parameters']),
								_List_fromArray(
								['parameters'])
							]))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Request Bodies',
					$author$project$Json$Schema$Decode$namesAt(
						_List_fromArray(
							['components', 'requestBodies']))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Responses',
					$author$project$Json$Schema$Decode$unionNames(
						_List_fromArray(
							[
								_List_fromArray(
								['components', 'responses']),
								_List_fromArray(
								['responses'])
							]))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Headers',
					$author$project$Json$Schema$Decode$namesAt(
						_List_fromArray(
							['components', 'headers']))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Security Schemes',
					$author$project$Json$Schema$Decode$unionNames(
						_List_fromArray(
							[
								_List_fromArray(
								['components', 'securitySchemes']),
								_List_fromArray(
								['securityDefinitions'])
							]))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Examples',
					$author$project$Json$Schema$Decode$namesAt(
						_List_fromArray(
							['components', 'examples']))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Links',
					$author$project$Json$Schema$Decode$namesAt(
						_List_fromArray(
							['components', 'links']))),
					A2(
					$author$project$Json$Schema$Decode$collapseForSection,
					'Callbacks',
					$author$project$Json$Schema$Decode$namesAt(
						_List_fromArray(
							['components', 'callbacks'])))
				]))),
	$author$project$Json$Schema$Decode$endpointsDeepCollapseDecoder);
var $author$project$Json$Schema$Decode$initialCollapsedPaths = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (_v0) {
				return $author$project$Json$Schema$Decode$oasCollapsedPathsDecoder;
			},
			$author$project$Json$Schema$Decode$isOpenApi),
			$elm$json$Json$Decode$succeed($elm$core$Set$empty)
		]));
var $author$project$SchemaDiagram$parse = function (source) {
	return A2(
		$elm$core$Result$mapError,
		$elm$json$Json$Decode$errorToString,
		A2(
			$elm$core$Result$andThen,
			function (value) {
				var _v0 = $author$project$SchemaSource$prepare(value);
				var prepared = _v0.a;
				var anchors = _v0.b;
				var definitions = A3(
					$elm$core$Dict$foldl,
					F3(
						function (key, child, acc) {
							var _v2 = A2($elm$json$Json$Decode$decodeValue, $author$project$Json$Schema$Decode$decoder, child);
							if (!_v2.$) {
								var model = _v2.a;
								return A3($elm$core$Dict$insert, key, model.bk, acc);
							} else {
								return acc;
							}
						}),
					$elm$core$Dict$empty,
					anchors);
				return A2(
					$elm$core$Result$map,
					function (document) {
						var model = document.V;
						return _Utils_update(
							document,
							{
								V: _Utils_update(
									model,
									{
										bv: A2($elm$core$Dict$union, model.bv, definitions)
									})
							});
					},
					A2(
						$elm$json$Json$Decode$decodeValue,
						A2(
							$elm$json$Json$Decode$andThen,
							function (_v1) {
								return A4(
									$elm$json$Json$Decode$map3,
									$author$project$SchemaDiagram$Document,
									$author$project$Json$Schema$Decode$decoder,
									$author$project$Json$Schema$Decode$initialCollapsedPaths,
									A2(
										$elm$json$Json$Decode$map,
										A2(
											$elm$core$Basics$composeR,
											$elm$core$Maybe$map($elm$core$String$trim),
											$elm$core$Maybe$andThen($author$project$SchemaDiagram$nonEmpty)),
										$elm$json$Json$Decode$maybe(
											$elm$json$Json$Decode$oneOf(
												_List_fromArray(
													[
														A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
														A2(
														$elm$json$Json$Decode$at,
														_List_fromArray(
															['info', 'title']),
														$elm$json$Json$Decode$string)
													])))));
							},
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$json$Json$Decode$map,
										$elm$core$Basics$always(0),
										$elm$json$Json$Decode$bool),
										A2(
										$elm$json$Json$Decode$map,
										$elm$core$Basics$always(0),
										$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value))
									]))),
						prepared));
			},
			A2(
				$elm$json$Json$Decode$decodeString,
				$elm$json$Json$Decode$value,
				A2($elm$core$String$startsWith, '\uFEFF', source) ? A2($elm$core$String$dropLeft, 1, source) : source)));
};
var $author$project$SchemaMain$parseSource = F2(
	function (source, model) {
		var folding = model.t;
		if ($elm$core$String$isEmpty(
			$elm$core$String$trim(source))) {
			return _Utils_update(
				model,
				{n: '', C: $elm$core$Maybe$Nothing});
		} else {
			var _v0 = $author$project$SchemaDiagram$parse(source);
			if (!_v0.$) {
				var document = _v0.a;
				return _Utils_update(
					model,
					{
						n: '',
						t: _Utils_eq(
							model.C,
							$elm$core$Maybe$Just(document)) ? folding : {x: false, z: document.bn, _: false},
						C: $elm$core$Maybe$Just(document)
					});
			} else {
				var error = _v0.a;
				return _Utils_update(
					model,
					{n: error, C: $elm$core$Maybe$Nothing});
			}
		}
	});
var $author$project$SchemaMain$loadSource = F2(
	function (source, model) {
		return A2(
			$author$project$SchemaMain$parseSource,
			source,
			_Utils_update(
				model,
				{o: source, J: model.J + 1}));
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$SchemaMain$downloadDiagram = _Platform_outgoingPort(
	'downloadDiagram',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$SchemaMain$openDiagramViewer = _Platform_outgoingPort(
	'openDiagramViewer',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$SchemaMain$update = F2(
	function (msg, model) {
		var folding = model.t;
		var finish = function (next) {
			return _Utils_Tuple2(next, $elm$core$Platform$Cmd$none);
		};
		switch (msg.$) {
			case 0:
				var value_ = msg.a;
				var generation = model.J + 1;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{y: $elm$core$Maybe$Nothing, o: value_, J: generation}),
					A2(
						$elm$core$Task$perform,
						function (_v1) {
							return $author$project$SchemaMain$Parse(generation);
						},
						$elm$core$Process$sleep(220)));
			case 1:
				var generation = msg.a;
				return _Utils_eq(generation, model.J) ? finish(
					A2($author$project$SchemaMain$parseSource, model.o, model)) : finish(model);
			case 2:
				return finish(
					A2($author$project$SchemaMain$loadSource, $author$project$SchemaMain$example, model));
			case 3:
				var _v2 = $author$project$SchemaDiagram$format(model.o);
				if (!_v2.$) {
					var formatted = _v2.a;
					return finish(
						A2($author$project$SchemaMain$loadSource, formatted, model));
				} else {
					var error = _v2.a;
					return finish(
						_Utils_update(
							model,
							{n: error}));
				}
			case 4:
				var result = msg.a;
				return result.at ? finish(
					A2($author$project$SchemaMain$loadSource, result.T, model)) : finish(
					_Utils_update(
						model,
						{n: result.T}));
			case 5:
				return finish(
					_Utils_update(
						model,
						{M: !model.M}));
			case 6:
				var fixed = msg.a;
				return finish(
					_Utils_update(
						model,
						{
							t: _Utils_update(
								folding,
								{x: fixed})
						}));
			case 7:
				var action = msg.a;
				var next = function () {
					switch (action) {
						case 'expand':
							return _Utils_update(
								folding,
								{z: $elm$core$Set$empty, _: false});
						case 'collapse':
							return _Utils_update(
								folding,
								{z: $elm$core$Set$empty, _: true});
						default:
							var path = action;
							return _Utils_update(
								folding,
								{
									z: A2($elm$core$Set$member, path, folding.z) ? A2($elm$core$Set$remove, path, folding.z) : A2($elm$core$Set$insert, path, folding.z)
								});
					}
				}();
				return finish(
					_Utils_update(
						model,
						{y: $elm$core$Maybe$Nothing, t: next}));
			case 8:
				var hover = msg.a;
				return finish(
					_Utils_update(
						model,
						{
							y: $elm$core$Maybe$Just(hover)
						}));
			case 9:
				return finish(
					_Utils_update(
						model,
						{y: $elm$core$Maybe$Nothing}));
			case 10:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{y: $elm$core$Maybe$Nothing}),
					$author$project$SchemaMain$openDiagramViewer(0));
			case 11:
				return _Utils_Tuple2(
					model,
					$author$project$SchemaMain$downloadDiagram(0));
			case 12:
				var preset = msg.a;
				return finish(
					_Utils_update(
						model,
						{B: preset, K: ''}));
			case 13:
				var custom = msg.a;
				return finish(
					_Utils_update(
						model,
						{O: custom, K: ''}));
			case 15:
				return _Utils_Tuple2(
					model,
					$author$project$SchemaMain$saveTheme(
						$author$project$DiagramTheme$encode(
							$author$project$SchemaMain$currentTheme(model))));
			default:
				var contents = msg.a;
				var _v4 = A2(
					$elm$core$Maybe$andThen,
					A2($elm$core$Basics$composeR, $author$project$DiagramTheme$decode, $elm$core$Result$toMaybe),
					contents);
				if (!_v4.$) {
					var theme = _v4.a;
					return finish(
						_Utils_update(
							model,
							{O: theme, B: 'custom', K: ''}));
				} else {
					return finish(
						_Utils_update(
							model,
							{K: 'Could not load theme. Choose a theme JSON exported by the viewer.'}));
				}
		}
	});
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$core$String$indexes = _String_indexes;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {az: host, aB: path, aI: port_, aJ: query, aY: fragment, a$: protocol};
	});
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$browser$Browser$document = _Browser_document;
var $author$project$SchemaMain$themeFile = _Platform_incomingPort(
	'themeFile',
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
			])));
var $author$project$SchemaMain$ReadSource = function (a) {
	return {$: 4, a: a};
};
var $author$project$SchemaMain$sourceFile = _Platform_incomingPort(
	'sourceFile',
	A2(
		$elm$json$Json$Decode$andThen,
		function (text) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (ok) {
					return $elm$json$Json$Decode$succeed(
						{at: ok, T: text});
				},
				A2($elm$json$Json$Decode$field, 'ok', $elm$json$Json$Decode$bool));
		},
		A2($elm$json$Json$Decode$field, 'text', $elm$json$Json$Decode$string)));
var $author$project$SchemaMain$ImportTheme = function (a) {
	return {$: 14, a: a};
};
var $author$project$SchemaMain$foldDiagram = _Platform_incomingPort('foldDiagram', $elm$json$Json$Decode$string);
var $author$project$SchemaMain$main = $elm$browser$Browser$document(
	{
		bb: function (prefersDark) {
			return _Utils_Tuple2(
				{
					M: true,
					n: '',
					y: $elm$core$Maybe$Nothing,
					O: prefersDark ? $author$project$DiagramTheme$dark : $author$project$DiagramTheme$classic,
					B: prefersDark ? 'dark' : 'classic',
					o: '',
					t: {x: false, z: $elm$core$Set$empty, _: false},
					C: $elm$core$Maybe$Nothing,
					J: 0,
					K: ''
				},
				$elm$core$Platform$Cmd$none);
		},
		bd: function (model) {
			return {
				a9: _List_fromArray(
					[
						$author$project$SchemaMain$view(model)
					]),
				N: 'JSON Schema Viewer'
			};
		},
		bl: $author$project$SchemaMain$update,
		bC: function (_v0) {
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						$author$project$SchemaMain$foldDiagram($author$project$SchemaMain$Fold),
						$author$project$SchemaMain$themeFile($author$project$SchemaMain$ImportTheme),
						$author$project$SchemaMain$sourceFile($author$project$SchemaMain$ReadSource)
					]));
		}
	});
_Platform_export({'SchemaMain':{'init':$author$project$SchemaMain$main($elm$json$Json$Decode$bool)(0)}});}(this));