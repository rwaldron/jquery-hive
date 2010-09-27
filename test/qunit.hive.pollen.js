if ( !window['console'] ) {
  var console = {}, 
      methods = 'log debug info warn error exception assert dir dirxml trace group groupEnd groupCollapsed time timeEnd profile profileEnd count clear notifyFirebug getFirebugElement firebug element'.split(' ');
  
  for ( var m in methods ) {
    console[ methods[m] ] = function () {
      //Array.prototype.slice.call(arguments)
    };
  }  
}


function enumeratedEquals(iterable, expected, message)  {
  var x = 0;
  
  if ( jQuery.isArray(iterable) ) {
    for ( var i = 0, _len = iterable.length; i < _len; i++ ) {
      equals(iterable[i], expected[i], message + ' ' + iterable.toString());
    }
  }
  
  if ( jQuery.isPlainObject(iterable) ) {
    
    for ( var i in iterable ) {
      equals(iterable[i], expected[i], message + ' ' + iterable.toString());
    }
  }
  
  
}



  
  /*--------------------------------------------------------*/  
  module("$.func.*");
  test("$.noop()", function () {
    expect(3);
    ok(typeof $.noop === 'function', 'typeof === "function"');
    equals(typeof $.noop, typeof (function(){}), 'Empty function expression');
    equals($.noop(undefined), (function(){})(undefined), 'Passing undefined returns undefined');
  });
  /*
  test("$.ident( arg )", function () {
    expect(6);
    equals($.ident('x'), (function(arg){ return arg })('x'), "ident(x) returns");
    equals($.ident(undefined), (function(arg){ return arg })(undefined), "ident(undefined) returns");
    equals($.ident(null), (function(arg){ return arg })(null), "ident(null) returns");
    equals(typeof $.ident({}), typeof (function(arg){ return arg })({}), "ident({}) returns");
    equals(typeof $.ident([]), typeof (function(arg){ return arg })([]), "ident([]) returns");
    equals(typeof $.ident(''), typeof (function(arg){ return arg })(''), "ident('') returns");
  });
  */
  test("$.bind( function, context, args )", function () {
    expect(4);
    var testFn      = function() { 
                        return this;
                      };
    var contextObj  = { foo: "bar", method: testFn };
    
    var testFnBound = $.bind( testFn, contextObj );
    equals( testFnBound(), contextObj, "var testFnBound = $.bind( testFn, contextObj ) [testFnBound(), contextObj] Re-assigned context"  );
    

    var testFnArgsBound = $.bind( function () {
      return arguments.length;
    }, contextObj, [1,2,3] );

    equals( testFnArgsBound(), 3, "var testFnArgsBound = $.bind( function () {return arguments.length;}, contextObj, [1,2,3] ); [testFnArgsBound(), 3] Re-assigned context"  );
    equals( $.bind( testFn, contextObj )(), contextObj, "[$.bind( testFn, contextObj )(), contextObj] Re-assigned context" );
    equals( $.bind( null, contextObj ), contextObj, "[$.bind( null, contextObj ), contextObj] Return context if function arg is null" );
  });
  
  
  module("$.evaluate.*");
  
  
  test("$.isObj( arg )", function () {
    expect(14);
    ok( $.isObj({}), "==={}");
    ok( $.isObj(new Object()), "===new Object()");
    ok( !$.isObj(''), "!string");
    ok( !$.isObj(new String), "!new String");
    ok( !$.isObj([]), "![]");
    ok( !$.isObj(new Array), "!new Array");
    ok( !$.isObj(0), "!0");
    ok( !$.isObj(true), "!true");
    ok( !$.isObj(false), "!false");
    ok( !$.isObj(null), "!null");
    ok( !$.isObj(undefined), "!undefined");
    ok( !$.isObj(new Date), "!new Date");
    ok( !$.isObj(new Function), "!new Function");
    ok( !$.isObj(function(){}), "!function(){}");
  });
  test("$.isArr( arg )", function () {
    
    expect(15)
    ok( $.isArr([]), "===[]");
    ok( $.isArr(new Array), "===new Array");    
    ok( $.isArr(function () { return [1,2,3]}() ), "===function () { return [1,2,3]}()");    
    ok( !$.isArr({}), "!{}");
    ok( !$.isArr(new Object()), "!new Object()");
    ok( !$.isArr(''), "!string");
    ok( !$.isArr(new String), "!new String");
    ok( !$.isArr(0), "!0");
    ok( !$.isArr(true), "!true");
    ok( !$.isArr(false), "!false");
    ok( !$.isArr(null), "!null");
    ok( !$.isArr(undefined), "!undefined");
    ok( !$.isArr(new Date), "!new Date");
    ok( !$.isArr(new Function), "!new Function");
    ok( !$.isArr(function(){}), "!function(){}");
  });
  test("$.isRegExp( arg )", function () {
    expect(15)
    ok( $.isRegExp(/(.)\1/), "===/(.)\1/");
    ok( $.isRegExp(new RegExp), "===new RegExp");    
    ok( $.isRegExp(function () { return /(.)\1/; }() ), "===function () { return /(.)\1/}()");    
    ok( !$.isRegExp('/(.)\1/'), "!'/(.)\1/'  this is a string, not a real reg exp");
    ok( !$.isRegExp({}), "!{}");
    ok( !$.isRegExp(new Object()), "!new Object()");
    ok( !$.isRegExp(new Date), "!new Date");
    ok( !$.isRegExp(new Function), "!new Function");
    ok( !$.isRegExp(function(){}), "!function(){}");
    ok( !$.isRegExp(), "![empty]");
    ok( !$.isRegExp(0), "!0");
    ok( !$.isRegExp(true), "!true");
    ok( !$.isRegExp(false), "!false");
    ok( !$.isRegExp(null), "!null");
    ok( !$.isRegExp(undefined), "!undefined");
  });
  test("$.isFn( arg )", function () {
    expect(19);

    ok( $.isFn(new Function), "===new Function");
    ok( $.isFn(function(){}), "===function(){}");    

    ok( $.isFn(String), "===String Function("+String+")" );
    ok( $.isFn(Array), "===Array Function("+Array+")" );
    ok( $.isFn(Object), "===Object Function("+Object+")" );
    ok( $.isFn(Function), "===Function Function("+Function+")" );    
    ok( !$.isFn(), "![empty]");
    ok( !$.isFn(0), "!0");
    ok( !$.isFn(true), "!true");
    ok( !$.isFn(false), "!false");
    ok( !$.isFn(null), "!null");
    ok( !$.isFn(undefined), "!undefined");
    ok( !$.isFn({}), "!{}");
    ok( !$.isFn(new Object()), "!new Object()");
    ok( !$.isFn(''), "!string");
    ok( !$.isFn(new String), "!new String");
    ok( !$.isFn([]), "![]");
    ok( !$.isFn(new Array), "!new Array");
    ok( !$.isFn(new Date), "!new Date");

  });
  test("$.isStr( arg )", function () {
    expect(17);

    ok( $.isStr('foo'), "==='foo'");
    ok( $.isStr(JSON.stringify({ "foo":"bar", "fn":[1,2,3] })), '===JSON.stringify({ "foo":"bar", "fn":[1,2,3] })');
    ok( $.isStr((new Object).toString()), '===(new Object).toString()');
    
    
    
    ok( !$.isStr(''), "![empty]");
    ok( !$.isStr(new Function), "!new Function");
    ok( !$.isStr(function(){}), "!function(){}");    
    ok( !$.isStr(), "![empty]");
    ok( !$.isStr(0), "!0");
    ok( !$.isStr(true), "!true");
    ok( !$.isStr(false), "!false");
    ok( !$.isStr(null), "!null");
    ok( !$.isStr(undefined), "!undefined");
    ok( !$.isStr({}), "!{}");
    ok( !$.isStr(new Object()), "!new Object()");
    ok( !$.isStr([]), "![]");
    ok( !$.isStr(new Array), "!new Array");
    ok( !$.isStr(new Date), "!new Date");
  });
  test("$.isNum( arg )", function () {
    expect(15);
    
    var a = '1';
    
    ok( $.isNum(0), "===0");
    ok( $.isNum(+a), "===var a = '1' +a");
    
    
    
    
    ok( !$.isNum(''), "![empty]");
    ok( !$.isNum(new Function), "!new Function");
    ok( !$.isNum(function(){}), "!function(){}");    
    ok( !$.isNum(), "![empty]");
    ok( !$.isNum(true), "!true");
    ok( !$.isNum(false), "!false");
    ok( !$.isNum(null), "!null");
    ok( !$.isNum(undefined), "!undefined");
    ok( !$.isNum({}), "!{}");
    ok( !$.isNum(new Object()), "!new Object()");
    ok( !$.isNum([]), "![]");
    ok( !$.isNum(new Array), "!new Array");
    ok( !$.isNum(new Date), "!new Date");
  });

  test("$.isJson( arg )", function () {
    expect(13);
    
    var json_set_1  = '{ "a1" : "value-a", "b1" : "value-b", "c1" : "value-c" }',
        json_set_2  = { "a2" : "value-a", "b2" : "value-b", "c2" : "value-c" };
    
    
    ok( $.isJson(json_set_1), 'String: ' + json_set_1);
    ok( $.isJson(json_set_2), 'Object: ' + json_set_2);

    ok( $.isJson({}), "{}");
    ok( $.isJson(new Object()), "new Object()");
    ok( !$.isJson(''), "![empty]");
    ok( !$.isJson(new Function), "!new Function");
    ok( !$.isJson(function(){}), "!function(){}");    
    ok( !$.isJson(), "![empty]");
    ok( !$.isJson(null), "!null");
    ok( !$.isJson(undefined), "!undefined");
    ok( !$.isJson([]), "![]");
    ok( !$.isJson(new Array), "!new Array");
    ok( !$.isJson(new Date), "!new Date");    
    
  });

  test("$.isDef( arg )", function () {
    expect(13);
    
    var _testDef  = {
          defined: '"_testDef.defined" has a value' 
        };
    
    ok( $.isDef(_testDef), '_testDef - ' + _testDef );
    ok( $.isDef(_testDef.defined),   '_testDef.defined - ' + _testDef.defined );
    ok( $.isDef({}), "{}");
    ok( $.isDef(new Object()), "new Object()");
    ok( $.isDef(new Function), "new Function");
    ok( $.isDef(function(){}), "function(){}");    
    ok( $.isDef(new Date), "new Date");     
    ok( !$.isDef(_testDef.undefined), '!_testDef.undefined - undefined' );
    ok( !$.isDef(''), "![empty]");
    ok( !$.isDef(null), "!null");
    ok( !$.isDef(undefined), "!undefined");
    ok( !$.isDef([]), "![]");
    ok( !$.isDef(new Array), "!new Array");


  });

  test("$.isNull( arg )", function () {
    expect(13);
    
    var _testNull  = {
          defined: '"_testNull.defined" has a value' 
        };
    
    ok( $.isNull(null), "null");
    
    ok( !$.isNull(_testNull), '!_testNull - ' + _testNull );
    ok( !$.isNull(_testNull.defined),   '!_testNull.defined - ' + _testNull.defined );
    ok( !$.isNull({}), "!{}");
    ok( !$.isNull(new Object()), "!new Object()");
    ok( !$.isNull(new Function), "!new Function");
    ok( !$.isNull(function(){}), "!function(){}");    
    ok( !$.isNull(new Date), "!new Date");     
    ok( !$.isNull(_testNull.undefined), '_testNull.undefined - undefined' );
    ok( !$.isNull(''), "![empty]");
    
    ok( !$.isNull(undefined), "!undefined");
    ok( !$.isNull([]), "![]");
    ok( !$.isNull(new Array), "!new Array");

  });

  test("$.isEmpty( arg )", function () {
    //expect(12);
    
    var _testEmpty  = {
          defined: '"_testEmpty.defined" has a value' 
        },
        _isempty  = ''
        ;

    
    ok( $.isEmpty(''), "''(empty string)");
    ok( $.isEmpty(_isempty), "_isempty(empty string)");
    
    ok( !$.isEmpty(_testEmpty), '!_testEmpty - ' + _testEmpty );
    ok( !$.isEmpty(_testEmpty.defined),   '!_testEmpty.defined - ' + _testEmpty.defined );
    ok( !$.isEmpty({}), "!{}");
    ok( !$.isEmpty(new Object()), "!new Object()");
    ok( !$.isEmpty(new Function), "!new Function");
    ok( !$.isEmpty(function(){}), "!function(){}");    
    ok( !$.isEmpty(new Date), "!new Date");     
    ok( $.isEmpty(_testEmpty.undefined), '_testEmpty.undefined - undefined' );
    
    
    ok( $.isEmpty(undefined), "undefined");
    ok( $.isEmpty([]), "[]");
    ok( $.isEmpty(new Array), "new Array");
  });


  test("$.eq( arg, array )", function () {
    //expect(12);
    
    var _filter  = [undefined,null,false];
    var _object_a = {
          a: 'foo' ,
          b: 'bar',
          c: 'baz',
          x: 'fooey',
          y: 'barry',
          z: 'bazzy'          
        }, 
        _array_a  = ['foo','bar',undefined,'baz',null,'fooey',false,'barry','bazzy'],
        _array_b  = [1,2,3,4,5]        
        ;  
    
    
    
    $.each( _array_a, function (i, val) {
      if ( i == 2 || i == 4 || i == 6 ) {
        equals( !$.eq(val, _filter), false, '"' + val + '" is in [undefined,null,false] returned ' );
      }
      else {
        equals( !$.eq(val, _filter), true, '"' + val + '" not in [undefined,null,false] returned ' );
      }
    });
  });

  module("$.string.*");


  test("$.trim( arg )", function () {
    expect(8);

    var nbsp = String.fromCharCode(160);

    equals( $.trim("$  "), "$", "right space" );
    equals( $.trim("  $"), "$", "left space" );
    equals( $.trim("  $   "), "$", "rght and left space" );
    equals( $.trim("  " + nbsp + "$  " + nbsp + " "), "$", "&nbsp;" );

    equals( $.trim(), "", "empty arg" );
    equals( $.trim( undefined ), "", "Undefined" );
    equals( $.trim( null ), "", "Null" );
    equals( $.trim( 5 ), "5", "Number" );
    

  });

  test("$.inStr( arg )", function () {

  });
  
  
  module("$.array.*");  


  test("$.each( object, function )", function () {
    expect(11);
    
    var _array = ['a','b','c'], 
        _object = {
          a: ['foo'] ,
          b: ['bar'],
          c: ['baz']
        },
        _test = ['foo','bar','baz'];
    ;
    
    $.each(_array, function ( i, _a ) {
      
      //_object[_a].push(i);
      _object[i]  = _a;//_object[_a];
      
    });
    
    for ( var i = 0; i < _array.length; i++ ) {
      equals(_object[_object[i]], _test[i], '_object[_object[i]] == _test[i]');
    }
    
    $.each( [0,1,2], function(i, n){
      equals( i, n, "Check array iteration" );
    });

    $.each( [5,6,7], function(i, n){
      equals( i, n - 5, "Check array iteration" );
    });

    $.each( { name: "name", lang: "lang" }, function(i, n){
      equals( i, n, "Check object iteration" );
    });
    
  });

  test("$.toArray( arg )", function () {
    expect(8);
    
    
    
    function argsToArray() {

      pollute = $.toArray(arguments);
      
      return $.toArray(arguments);
    }
    
    var array  = ['foo', 'bar', 'baz'];
    
    argsToArray('foo', 'bar', 'baz');
    
    equals( pollute.length, array.length, 'pollute.length === array.length' );
    equals( $.isArr($.toArray('abc')), true, "$.isArr($.toArray('abc')) returned " );
    equals( $.isArr($.toArray('')), true  , "$.isArr($.toArray('')) returned ");
    equals( $.isArr($.toArray(null)), true, '$.isArr($.toArray(null)) returned ');
    equals( $.isArr($.toArray(undefined)), true, '$.isArr($.toArray(undefined)) returned ');
    equals( $.isArr($.toArray()), true, '$.isArr($.toArray()) returned ');
    equals( $.isArr($.toArray(5)), true, '$.isArr($.toArray(5)) returned ');
    equals( $.isArr($.toArray(true)), true, '$.isArr($.toArray(true)) returned ');
    
    
    
  });
  test("$.isAtIndex( array, index, needle )", function () {
    
    expect(6);
    
    
    var array  = ['foo', 'bar', 'baz'];
    
    
    equals( $.isAtIndex(array, 0, 'foo'), true, "$.isAtIndex(array, 0, 'foo') returned ");
    equals( $.isAtIndex(array, 1, 'bar'), true, "$.isAtIndex(array, 0, 'bar') returned ");
    equals( $.isAtIndex(array, 2, 'baz'), true, "$.isAtIndex(array, 0, 'baz') returned ");
    

    equals( $.isAtIndex(array, 0, 'baz'), false, "$.isAtIndex(array, 0, 'baz') returned ");
    equals( $.isAtIndex(array, 1, 'foo'), false, "$.isAtIndex(array, 0, 'foo') returned ");
    equals( $.isAtIndex(array, 2, 'bar'), false, "$.isAtIndex(array, 0, 'bar') returned ");



  });
  test("$.getIndex( array, needle )", function () {
    expect(3);
    
    
    var array  = ['foo', 'bar', 'baz'];
    
    
    equals( $.getIndex(array, 'foo'), 0, "$.getIndex(array, 'foo') returned ");
    equals( $.getIndex(array, 'bar'), 1, "$.getIndex(array, 'bar') returned ");
    equals( $.getIndex(array, 'baz'), 2, "$.getIndex(array, 'baz') returned ");
    

  });
  test("$.inArray( array, needle )", function () {
    expect(6);
    
    
    var array  = ['foo', 'bar', 'baz'];
    
    
    equals( $.inArray(array, 'foo'), true, "$.inArray(array, 'foo') returned ");
    equals( $.inArray(array, 'bar'), true, "$.inArray(array, 'bar') returned ");
    equals( $.inArray(array, 'baz'), true, "$.inArray(array, 'baz') returned ");
    
    equals( $.inArray(array, 'fooey'), false, "$.inArray(array, 'fooey') returned ");
    equals( $.inArray(array, 'barry'), false, "$.inArray(array, 'barry') returned ");
    equals( $.inArray(array, 'bazzy'), false, "$.inArray(array, 'bazzy') returned ");

  });
  test("$.clone( array )", function () {
    expect(3)    
    var array  = ['foo', 'bar', 'baz'];
    
    equals($.clone(array)[0], array[0], "$.clone(array)[0] returned " );
    equals($.clone(array)[1], array[1], "$.clone(array)[1] returned " );
    equals($.clone(array)[2], array[2], "$.clone(array)[2] returned " );
  });
  test("$.last( array )", function () {

    expect(1)    
    var array  = ['foo', 'bar', 'baz'];
    
    equals($.last(array), array[array.length-1], "$.last(array) returned " );
    

  });
  test("$.first( array )", function () {
    expect(1)    
    var array  = ['foo', 'bar', 'baz'];
    
    equals($.first(array), array[0], "$.first(array) returned " );

  });
  test("$.unique( arg )", function () {
    
    
    same( $.unique([1,1,1]), [1], "$.unique([1,1,1]) passes");
    same( $.unique([1]), [1], "$.unique([1]) passes");
    same( $.unique([0, 1, 2, 2, 3, 0, 2]), [0, 1, 2, 3], "$.unique([0, 1, 2, 2, 3, 0, 2]) passes");
    same( $.unique([0, 1, 3, 0, 2, 3, 3, 2]), [0, 1, 3, 2], "$.unique([0, 1, 3, 0, 2, 3, 3, 2]) passes");
    

  });
  test("$.merge( )", function () {
  
    same( $.merge([0, 1, 2, 3], ['a','b','c','d']),  [0, 1, 2, 3, "a", "b", "c", "d"], "$.merge([0, 1, 2, 3], ['a','b','c','d']) passes");
    
    
    var _object_a = {
          a: 'foo' ,
          b: 'bar',
          c: 'baz'
        },
        _object_b = {
          x: 'foo' ,
          y: 'bar',
          z: 'baz'
        }, 
        _object_c = {
          a: 'foo' ,
          b: 'bar',
          c: 'baz',
          x: 'foo',
          y: 'bar',
          z: 'baz'          
        };
    
    same( $.merge(_object_a, _object_b),  _object_c, "$.merge(_object_a, _object_b) passes");
    

    //  jacked from jQuery unit tests.
    same( $.merge([],[]), [], "Empty arrays" );
    same( $.merge([1],[2]), [1,2], "Basic" );
    same( $.merge([1,2],[3,4]), [1,2,3,4], "Basic" );
    same( $.merge([1,2],[]), [1,2], "Second empty" );
    same( $.merge([],[1,2]), [1,2], "First empty" );
    same( $.merge([-2,-1], [0,1,2]), [-2,-1,0,1,2], "Second array including a zero (falsy)");
    same( $.merge([], [null, undefined]), [null, undefined], "Second array including null and undefined values");
    
    


  });
  
  test("$.combine( keys, values )", function () {
    
    var _array_a  = ['a','b','c']
        _array_b  = ['a-foo','b-foo','c-foo'],
        _object   = {
          a: 'a-foo',
          b: 'b-foo',
          c: 'c-foo'
        };

    same( $.combine(_array_a, _array_b),  _object, "$.combine(_object_a, _object_b) passes");

  });
  
  test("$.filter( arg , function, iteration )", function () {
    
    var _object_a = {
          a: 'foo' ,
          b: 'bar',
          c: 'baz',
          x: 'fooey',
          y: 'barry',
          z: 'bazzy'          
        }, 
        _array_a  = ['foo','bar','baz','fooey','barry','bazzy']
        ;
  
    
    var _array_a_filtered = $.filter(_array_a, function (val) {
                              
                              if ( $.inStr(val, 'ba') ) {
                                return true;
                              }
                              return false;
                            });
    
    
    
    
    same( _array_a_filtered,  ["bar", "baz", "barry", "bazzy"] , 'Filtered array returned ');
  
  
    var _object_a_filtered  = $.filter(_object_a, function (val, i) {

                  if ( $.inStr(val, 'ba') ) {
                    return true;
                  }
                  return false;
                });

    same ( _object_a_filtered, { b:'bar', c: 'baz', y:'barry', z:'bazzy' }, 'Filtered object returned ');
  });
  
  test("$.map( array, function )", function () {
    var _object_a = {
          a: 'foo' ,
          b: 'bar',
          c: 'baz',
          x: 'fooey',
          y: 'barry',
          z: 'bazzy'          
        }, 
        _array_a  = ['foo','bar','baz','fooey','barry','bazzy'],
        _array_b  = [1,2,3,4,5]        
        ;    
    
    same( $.map(_array_a, function (val) {
                                        return val + '-new';
                                     }), ['foo-new','bar-new','baz-new','fooey-new','barry-new','bazzy-new'], "['foo-new','bar-new','baz-new','fooey-new','barry-new','bazzy-new'] returned " );
    
    same( $.map(_array_b, function (val) {
                                  return val * 10;
                                }), [10,20,30,40,50], '[10,20,30,40,50] returned ' );

  });
  
  test("$.size( array )", function () {
    var _object_a = {
          a: 'foo' ,
          b: 'bar',
          c: 'baz',
          x: 'fooey',
          y: 'barry',
          z: 'bazzy'          
        }, 
        _array_a  = ['foo','bar','baz','fooey','barry','bazzy'],
        _array_b  = [1,2,3,4,5]        
        ;    
    
    
    
    equals( $.size(_array_a), 6, "['foo','bar','baz','fooey','barry','bazzy'] returns " );
    equals( $.size(_array_b), 5, '[1,2,3,4,5] returns ' );
    equals( $.size(_object_a), 6, "_object_a = { a: 'foo' , b: 'bar', c: 'baz', x: 'fooey', y: 'barry', z: 'bazzy'} returns " );
    
  });
  
  test("$.grep( array, expression, function )", function () {
    expect(9);
    
    
    same(   $.grep(  ['hello', 'from', 'bizzaro', 'world', 'this', 'is', 'cool'], /(.)\1/ ),
           ["hello", "bizzaro", "cool"],
           '$.grep(  ["hello", "from", "bizzaro", "world", "this", "is", "cool"], /(.)\1/ ) returned ');
    
    same(   $.grep([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], /[05]$/),
             ["0", "5", "10", "15", "20"],
            '$.grep([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], /[05]$/) returned '
            );
    
    
    
    same(   $.grep([0,1,2,3,4,5,6,7,8,9,10], /[05]$/, function(n) { return n - 1; }), 
             [-1, 4, 9],
            '$.grep([0,1,2,3,4,5,6,7,8,9,10], /[05]$/, function(n) { return n - 1; }) returned ');
    
      
    //  adapted from prototype.js Enumerable.grep unit tests      
    same(  $.grep(['?foo','bar','baz?'], '?'), ["?foo", "baz?"], "$.grep(['?foo','bar','baz?'], '?') returned ");
    same(  $.grep(['*foo','bar','baz*'], '*'), ["*foo", "baz*"], "$.grep(['*foo','bar','baz*'], '*') ");
    same(  $.grep(['+foo','bar','baz+'], '+'), ["+foo", "baz+"] , "$.grep(['+foo','bar','baz+'], '+') ");
    
    same(  $.grep(['(foo','bar','baz('], '('), ["(foo", "baz("] , "$.grep(['(foo','bar','baz('] ");
    same(  $.grep(['|foo','bar','baz|'], '|'), ["|foo", "baz|"] , "$.grep(['|foo','bar','baz|'], '|') ");
    
    same(  $.grep(['{1}foo','bar','baz{1}'], '{1}'),  ["{1}foo", "baz{1}"], "$.grep(['{1}foo','bar','baz{1}'], '{1}') ");
    
    
  });


  
  test("$.compact( array, expression, function )", function () {
    
    var _object_a = {
          a: 'foo' ,
          b: undefined,
          c: 'baz',
          x: null,
          y: 'barry',
          z: 'bazzy'          
        }, 
        _array_a  = ['foo','bar',undefined,'baz',null,'fooey',false,'barry','bazzy'],
        _array_b  = [1,2,3,4,5]        
        ;  
        
    same($.compact(_array_a), 
            ['foo', 'bar', 'baz', 'fooey', 'barry', 'bazzy'], 
            "$.compact({ a: 'foo' , b: 'bar', c: 'baz', x: 'fooey', y: 'barry', z: 'bazzy'}) ['foo', 'bar', 'baz', 'fooey', 'barry', 'bazzy'] returns");

    
    same( $.compact(_object_a), {"foo":"foo","baz":"baz","barry":"barry","bazzy":"bazzy"}, '$.compact(_object_a = { a: "foo" , b: undefined, c: "baz", x: null, y: "barry", z: "bazzy"}) {"foo":"foo","baz":"baz","barry":"barry","bazzy":"bazzy"}' );    
  });
  
  
  module("$.object.*");  
  
  
  test("$.extend( object, _object )", function () {

    var _object_a       = { a: 5, b: 7, c: "foo", d: "bar" },
        _object_b       = { b: 1, d: "x", _str: "string!" },
        _object_b_copy  = { b: 1, d: "x", _str: "string!" },
        _object_c       = { a: 5, b: 1, c: "foo", d: "x", _str: "string!" };



    $.extend(_object_a, _object_b);
    same( _object_a, _object_c, "$.extend(_object_a, _object_b) extended: _object_a == _object_c" );
    
    $.extend(null, _object_b);
    same( _object_b, _object_b_copy, "$.extend(null, _object_b) unchanged: _object_b == _object_b_copy" );
    
    
    //  NEED MORE TESTS

  });
  
  
  module("$.ajax.*");  
  //test("$.ajax.get( request )", function () {
  //});
  
  var _ajax_sent_a  = { "arg1" : "SN", "arg2" : "AFU" }, 
      _ajax_sent_b  = { "arg1" : "FU", "arg2" : "BAR" },
      _ajax_sent_c, _ajax_sent_d, _ajax_sent_e, _ajax_sent_f;
  

  var _ajax_data_a,_ajax_data_b,_ajax_data_c, _ajax_data_d, _ajax_data_e, _ajax_data_f;


  $.ajax.get({ 
    url: 'xhr_echo_request_json.php', 
    data: $.param( _ajax_sent_a ),
    success: function(data) { 
      
      _ajax_data_a  = data.text;
      //equals( JSON.stringify(_ajax_sent_a), data.text, "JSON.stringify(_ajax_sent_a), data.text returns exactly the object sent" );
    } 
  });
  
  

  $.ajax.get({ 
    url: 'xhr_echo_request_json.php', 
    dataType: 'json',
    data: $.param( _ajax_sent_b ),
    success: function(data) { 
      //same( _ajax_sent_b, data, "dataType: 'json' returns exactly the object sent" );
      
      _ajax_data_b  = data;
    } 
  });
  


  asyncTest("$.ajax.get( request )", function() {
    setTimeout(function(){
  
      equals( _ajax_data_a, JSON.stringify(_ajax_sent_a), "JSON.stringify(_ajax_sent_a) ["+JSON.stringify(_ajax_sent_a)+"], data.text returns exactly the object sent" );
      same( _ajax_data_b, _ajax_sent_b , "dataType: 'json' returns exactly the object sent" );

      start();
    }, 30);
  });




  test("$.ajax.post( request )", function () {

  });
  
  
  module("$.json.*");
  
  
  test("$.encode / $.toObj", function () {
  


      same( $.encode("{}"), {}, "Plain object parsing." );
      same( $.encode('{"test":1}'), {"test":1}, "Plain object parsing." );

      same( $.encode('\n{"test":1}'), {"test":1}, "Make sure leading whitespaces are handled." );

      
      
      try {
        $.encode("{a:1}");
        ok( false, "Test malformed JSON string." );
      } catch( e ) {
        ok( true, "Test malformed JSON string." );
      }
  });
  

  test("$.decode / $.toStr", function () {
  

      equals( $.decode( null ), "null", "`null` in, string null out." );
      

      same( $.decode({}), "{}", "Plain object to string" );
      same( $.decode({test:1}), '{"test":1}', "Plain object to string" );
      
  });

  
  module("$.data.*");
  
  
  test("$.param( arg )", function () {
    var _object_a       = { a: 5, b: 7, c: "foo", d: "bar" },
        _object_b       = { b: 1, d: "x", _str: "string!" },
        _object_b_copy  = { b: 1, d: "x", _str: "string!" },
        _object_c       = { a: 5, b: 1, c: "foo", d: "x", _str: "string!" };
    
    
    
    equals( $.param( _object_a, true ), 'a=5&b=7&c=foo&d=bar&WORKER_ID=0', 'Object to params, added WORKER_ID' );
   
    var params = {foo:"bar", baz:42, quux:"All your base are belong to us"};
    equals( $.param(params), "foo=bar&baz=42&quux=All+your+base+are+belong+to+us", "simple" );

    ///params = {someName: [1, 2, 3], regularThing: "blah" };
    ///equals( $.param(params), "someName%5B%5D=1&someName%5B%5D=2&someName%5B%5D=3&regularThing=blah", "with array" );

    
    
  });

  test("$.storage( key, val )", function () {
    
    var _object_a       = { a: 5, b: 7, c: "foo", d: "bar" },
        _object_b       = { b: 1, d: "x", _str: "string!" },
        _object_b_copy  = { b: 1, d: "x", _str: "string!" },
        _object_c       = { a: 5, b: 1, c: "foo", d: "x", _str: "string!" };

    
    $.storage('test', _object_a);
    
    same( $.storage('test'), _object_a, " { a: 5, b: 7, c: 'foo', d: 'bar' } Stored and retrieved" );
    
    
  });

    var _object_a = [
      {id:1, foo:'bar', rating:4},
      {id:2, foo:'baz', rating:2}
    ];
    
    
   test("$.query( obj, query ):   ?property='value' ", function () {
    
    var _object_a = [
      {id:1, foo:'bar', rating:4},
      {id:2, foo:'baz', rating:2}
    ];
    
    
    var result = $.query("?foo='bar'", _object_a);
    
    

    
    equals(result.length, 1, "$.query(\"?foo='bar'\", _object_a) should return the correct number of results");
    equals(result[0].id, 1, "$.query(\"?foo='bar'\", _object_a) should return the correct object");
    
    
    result = $.query("?foo='x'", _object_a);
    equals(result.length, 0, "$.query(\"?foo='x'\", _object_a) should return an empty result if there are no value matches");

    console.log(result);

    result = $.query("?doesnotexist='x'", _object_a);
    equals(result.length, 0, "$.query(\"?doesnotexist='x'\", _object_a) should return an emtpy result if there are no property matches");
    
    console.log(result);
  });


  test("$.query( obj, query ):   ?property=value using a number for comparison", function() {
    var result = $.query("?rating=4", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    result = $.query("?rating=7", _object_a);
    equals(result.length, 0, "should return an empty result if there are no value matches");
    result = $.query("?x=7", _object_a);
    equals(result.length, 0, "should return an emtpy result if there are no property matches");
  });

  test('$.query( obj, query ):   ?property>=value when value and target are equal', function() {
    var result = $.query("?rating>=4", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
  });

  test('$.query( obj, query ):   ?property>=value when target is less than value', function() {
    var result = $.query("?rating>=5", _object_a);
    equals(result.length, 0, "should return an empty result set");
  });

  test('$.query( obj, query ):   ?property>=value when target is greater than value', function() {
    var result = $.query("?rating>=3", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
    result = $.query("?rating>=2", _object_a);
    equals(result.length, 2, "should return the correct number of results for mulitple matches");
  });

  test('$.query( obj, query ):   ?property<=value when value and target are equal', function() {
    var result = $.query("?rating<=2", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 2, "should return the correct result");
  });

  test('$.query( obj, query ):   ?property<=value when target is greater than value', function() {
    var result = $.query("?rating<=1", _object_a);
    equals(result.length, 0, "should return an empty result set");
  });

  test('$.query( obj, query ):   ?property<=value when target is less than value', function() {
    var result = $.query("?rating<=3", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 2, "should return the correct result");
    result = $.query("?rating<=5", _object_a);
    equals(result.length, 2, "should return the correct number of results for multiple matches");
  }); 


  test('$.query( obj, query ):   ?property>value when target is greater than value', function() {
    var result = $.query('?rating>3', _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
    result = $.query('?rating>1', _object_a);
    equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  test('$.query( obj, query ):   ?property>value when target is equal to value', function() {
    var result = $.query('?rating>4', _object_a);
    equals(result.length, 0, "should return an empty result set");
  });

  test('$.query( obj, query ):   ?property>value when target is less than value', function() {
    var result = $.query('?rating>5', _object_a);
    equals(result.length, 0, "should return an empty result set");
  });

  test('$.query( obj, query ):   ?property < value when target is greater than value', function() {
    var result = $.query('?rating<2', _object_a);
    equals(result.length, 0, "should return an empty result set");
  });

  test('$.query( obj, query ):   ?property < value when target is equal to value', function() {
    var result = $.query('?rating<2', _object_a);
    equals(result.length, 0, "should return an empty result set");
  });

  test('$.query( obj, query ):   ?property < value when target is less than value', function() {
    var result = $.query('?rating<3', _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 2, "should return the correct result");
    result = $.query('?rating<5', _object_a);
    equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  test("?property!='value' using a string for comparison", function() {
    var result = $.query("?foo!='bar'", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 2, "should return the correct result");
    result = $.query("?foo!='x'", _object_a);
    equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  test('$.query( obj, query ):   ?property!=value', function() {
    var result = $.query('?rating!=2', _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
    result = $.query('?rating!=7', _object_a);
    equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  test('$.query( obj, query ):   value extraction with [=property]', function() {
    var result = $.query('[=foo]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    equals(result[0], 'bar', "should extract the named values");
    equals(result[1], 'baz', "should extract the named values");
    result = $.query('[=doesnotexist]', _object_a);
    equals(result.length, 2, "should return a result for every object in the _object_a even if there are no matches");
    ok(typeof result[0] === 'undefined', "should return undefined for elements with properties that do not exist");
    ok(typeof result[1] === 'undefined', "should return undefined for elements with properties that do not exist");
  });

  test('$.query( obj, query ):   [index]', function() {
    var result = [];
    for(var i=0; i<_object_a.length; i++) {
      result = $.query('['+i+']', _object_a);
      ok(typeof result.length === 'undefined', "should not return an array");
      equals(result.id, i+1, "should return the correct item");
    }
  });

  test('$.query( obj, query ):   array slicing with [start:end]', function() {
    var result = [];
    for(var i=1; i<_object_a.length; i++) {
      result = $.query('[0:'+i+']', _object_a);
      equals(result.length, i, "should return the correct number of results");
    }
    result = $.query('[1:2]', _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 2, "should use the correct offset");
    result = $.query('[0:]', _object_a);
    equals(result.length, 2, "should default to the max length if no stop is defined");
    result = $.query('[1:]', _object_a);
    equals(result.length, 1, "should default to the max length if no stop is defined");
    result = $.query('[:2]', _object_a);
    equals(result.length, 2, "should default to 0 for the offset");
  });

  test('$.query( obj, query ):   array slicing with [start:end:step]', function() {
    var objects = [{id:1},{id:2},{id:3},{id:4}];
    var result = $.query('[0:3:2]', objects);
    equals(result.length, 2, "should return the correct number of elements");
    equals(result[0].id, 1, "should return the correct first element");
    equals(result[1].id, 3, "should return the next element factoring in the step offset");
  });

  test('$.query( obj, query ):   unions with [expr,expr]', function() {
    var result = $.query("[?foo='bar',rating=4]", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
  });

  test('$.query( obj, query ):   filter chaining with [expr][expr]...', function() {
    var result = $.query('[?id>0][?rating>2]', _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
  });

  test('$.query( obj, query ):   +', function() {
    var result = $.query('[=id+1]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i], i+2, "should return the correct result");
    }
  });

  test('$.query( obj, query ):   -', function() {
    var result = $.query('[=id-1]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i], i, "should return the correct result");
    }
  });

  test('$.query( obj, query ):   /', function() {
    var result = $.query('[=id/1]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i], i+1, "should return the correct result");
    }
  });

  test('$.query( obj, query ):   *', function() {
    var result = $.query('[=id*2]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i], (i+1)*2, "should return the correct result");
    }
  });

  test('$.query( obj, query ):   bitwise AND with &', function() {
    var result = $.query('[=foo&3]', [{foo:10}]);
    equals(result[0], 2, "should return the correct result");
  });

  test('$.query( obj, query ):   bitwise OR with |', function() {
    var result = $.query('[=foo|3]', [{foo:10}]);
    equals(result[0], 11, "should return the correct result");
  });

  test('$.query( obj, query ):   %', function() {
    var result = $.query('[=5%id]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    equals(result[1], 1, "should return the correct result");
  });

  test('$.query( obj, query ):   ( and )', function() {
    var result = $.query('[=(id+1)*2]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    equals(result[0], 4, "should return the correct result");
    equals(result[1], 6, "should return the correct result");
  });

  test('$.query( obj, query ):   accessing the current object with @', function() {
    var result = $.query("[?@.rating=4]", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].foo, 'bar', "should return the correct result");
  });

  test('$.query( obj, query ):   accessing the root object with $', function() {
    var result = $.query("$[?rating=4]", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].foo, 'bar', "should return the correct result");
  });

  test('$.query( obj, query ):   accessing all properties with [*]', function() {
    var result = $.query('[*]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i].id, i+1, "should return the correct result");
      ok(result[i].hasOwnProperty('foo'), "should include the foo property");
      ok(result[i].hasOwnProperty('rating'), "should include the rating property");
    }
  });

  test('$.query( obj, query ):   accessing all properties with .*', function() {
    var result = $.query('.*', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i].id, i+1, "should return the correct result");
      ok(result[i].hasOwnProperty('foo'), "should include the foo property");
      ok(result[i].hasOwnProperty('rating'), "should include the rating property");
    }
  });

  test('$.query( obj, query ):   recursive find with ..property', function() {
    var nested = [
      {id:1,number:1},
      {id:2,foo:3,inside:{number:2}},
      {id:3,foo:4,inside:{bar:[{number:3}]}}
    ];
    var result = $.query('..number', nested);
    equals(result.length, 3, "should return the correct number of results");
    for(var i=0; i<nested.length; i++) {
      equals(result[i], i+1, "should find the nested property");
    }
  });

  test('$.query( obj, query ):   creating new object literals with [={new object literal}]', function() {
    var result = $.query('[={x:id}]', _object_a);
    equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<_object_a.length; i++) {
      equals(result[i].x, i+1, "should return the correct result");
    }
  });

  test('$.query( obj, query ):   case insensitive matching with [expr ~ expr]', function() {
    var result = $.query("[?foo~'BAR']", _object_a);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
  });

  test('$.query( obj, query ):   partial string matching with *', function() {
    var result = $.query("?foo='ba*'", _object_a);
    equals(result.length, 2, "should return the correct number of results");
  });

  test('$.query( obj, query ):   value substitution with $1 $2 etc.', function() {
    var result = $.query("[?foo=$1,rating=$2]", _object_a, 'bar', 4);
    equals(result.length, 1, "should return the correct number of results");
    equals(result[0].id, 1, "should return the correct result");
  });

  var sortables = [
    {first:'john',last:'doe'},
    {first:'joe',last:'pass'},
    {first:'alice',last:'doe'}
  ];

  test('$.query( obj, query ):   ascending sort with [/expr]', function() {
    var result = $.query('[/last]', sortables);
    equals(result.length, 3, "should return the correct number of results");
    equals(result[0].last, 'doe', "should return a correctly ordered result");
    equals(result[1].last, 'doe', "should return a correctly ordered result");
    equals(result[2].last, 'pass', "should return a correctly ordered result");
    result = $.query('[/doesnotexist]', _object_a);
    equals(_object_a.length, result.length, "should ignore the sort when the property does not exist");
  });

  test('$.query( obj, query ):   descending sort with [\\expr]', function() {
    var result = $.query('[\\last]', sortables);
    equals(result.length, 3, "should return the correct number of results");
    equals(result[0].last, 'pass', "should return a correctly ordered result");
    equals(result[1].last, 'doe', "should return a correctly ordered result");
    equals(result[2].last, 'doe', "should return a correctly ordered result");
    result = $.query('[\\doesnotexist]', _object_a);
    equals(result.length, _object_a.length, "should ignore the sort when the property does not exist");
  });

  test('$.query( obj, query ):   prioritized sorting with [/expr, /expr]', function() {
    var result = $.query('[/last, /first]', sortables);
    equals(result.length, 3, "should return the correct number of results");
    ok(result[0].last == 'doe' && result[0].first == 'alice', "should return a correctly ordered result");
    ok(result[1].last == 'doe' && result[1].first == 'john', "should return a correctly ordered result");
    ok(result[2].last == 'pass' && result[2].first == 'joe', "should return a correctly ordered result");
  });

  test('$.query( obj, query ):   mixed direction, prioritized sorting with [/expr, \\expr]', function() {
    var result = $.query('[/last, \\first]', sortables);
    equals(result.length, 3, "should return the correct number of results");
    ok(result[0].last == 'doe' && result[0].first == 'john', "should return a correctly ordered result");
    ok(result[1].last == 'doe' && result[1].first == 'alice', "should return a correctly ordered result");
    ok(result[2].last == 'pass' && result[2].first == 'joe', "should return a correctly ordered result");
  });  
  
  
  module("$.worker.*");
  
  
  test("$.send( message )", function () {

  });

  test("$.receive( function )", function () {

  });


