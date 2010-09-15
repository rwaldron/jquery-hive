importScripts('../jquery.hive.pollen.js');


$.receive(function (data) {
  
  if ( data.message.test === 'send' ) {
    $.send({
      "message" : data.message.content
    });
  }

  if ( data.message.test === 'array' ) {
    
    var _arrayObj = data.message.content;
    
    $.send({
      message: [
        $.isArr(_arrayObj.a)                ? 'PASS - $.isArr() _arrayObj.a is an array'                 : 'FAIL - _arrayObj.a is not an array',
        $.isAtIndex(_arrayObj.b, 1, 'b')    ? 'PASS - $.isAtIndex() "b" is at index 1 of _arrayObj.b'    : 'FAIL - "b" is NOT at index 1 of _arrayObj.b',
        $.getIndex(_arrayObj.c, 'c') === 5  ? 'PASS - $.getIndex(_arrayObj.c, "c") === 5'                : 'FAIL - $.getIndex(_arrayObj.c, "c") !== 5',//5
        $.inArr(_arrayObj.a, 'a') === false ? 'PASS - $.inArr(_arrayObj.a, "a") should return false'     : 'FAIL - $.inArr(_arrayObj.a, "a") should return false',
        
        
        ( $.clone(_arrayObj.a) ).join(',') === _arrayObj.a.join(',') ? 'PASS - ( $.clone(_arrayObj.a) ).join(",") === _arrayObj.a.join(",")'  : 'FAIL - ( $.clone(_arrayObj.a) ).join(",") === _arrayObj.a.join(",")',
        
        $.last(_arrayObj.a) === 3             ? 'PASS - $.last(_arrayObj.a) === 3'        : 'FAIL - $.last(_arrayObj.a) !== 3',
        
        $.decode({ "foo" : "bar" }), 
        $.encode('{ "foo" : "bar" }')
        
      ]
    });
  }

});