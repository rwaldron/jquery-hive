$(function () {

  var  _completeTestObj = {
         count: 1,
         worker: 'qunit.worker.js',
         receive: $.noop,
         created: $.noop
      },
      _noFileTestObj = {
         count: 1,
         receive: $.noop,
         created: $.noop
      },

      o=0
      ;

  test("jQuery.Hive", function() {

    //ok(  !$.Hive.create(_noFileTestObj), "$.Hive.create() Should error if: no worker file is specified, and no worker file is cached");
    ok(  "length" in $.Hive.create(_completeTestObj), "$.Hive.create() Should always return an array");
    ok(  "length" in $.Hive.get()  , "$.Hive.get() Should always return an array");


    var _sizeOf = $.Hive.get().length,
        _strTest, _arrTest, _objTest;

    for (var i = 0; i < _sizeOf; i++) {
      equal(  $.Hive.get(i).toString(), "[object Worker]", "All workers in $.Hive.get() should be [object Worker]");
    }

    $.each( $.Hive.get(), function (id, worker) {

      ok(  $.Hive.get(id)  , "$.Hive.get() index has Worker with ID #" + id);

      _strTest = $.Hive.get(id).send("string test")._lastMessage;
      _arrTest = $.Hive.get(id).send(["array","test"])._lastMessage;
      _objTest = $.Hive.get(id).send({ message: { object : "test" } })._lastMessage;
    });
  });


  $.Hive.destroy();
  $.Hive.create(_completeTestObj);


  var _result = {};

  $.Hive.get(0).send({
    message: {
      test: "send",
      content: "hello worker thread"
      }
    },
    function (data) {
      _result["send"] = {
        msg:  data.message,
        type: typeof data,
        prop: data.message ? true : false
      };

      test("jQuery.Hive.Pollen", function() {
        equal(_result.send.msg, "hello worker thread", 'jQuery.Hive.send() --- Round trip with message: "hello worker thread"' );
        equal(_result.send.type, "object", 'jQuery.Hive.send() --- callback first arg is always typeof === object' );
        ok(_result.send.prop, 'jQuery.Hive.send() --- callback first arg object always has the "message" property' );
      });
    }
  );


  $.Hive.destroy();
  $.Hive.create(_completeTestObj);


  $.Hive.get(0).send({
      message: {
        test: "array",
        content: {
          a: [1,2,3],
          b: ["a","b","c"],
          c: [1,2,3,"a","b","c"]
        }
      }
    },
    function( data ) {

      var expectations = [
            'PASS - $.isArr() _arrayObj.a is an array',
            'PASS - $.isAtIndex() "b" is at index 1 of _arrayObj.b',
            'PASS - $.inArray(_arrayObj.a, "a") should return false',
            'PASS - $.inArray("a", _arrayObj.a) should return false',
            'PASS - ( $.clone(_arrayObj.a) ).join(",") === _arrayObj.a.join(",")',
            'PASS - $.last(_arrayObj.a) === 3',
            '{"foo":"bar"}',
            { foo: 'bar' }
          ];

      test("Data Response Expectations", function() {
        $.each(data.message, function (i, msg) {

          same(msg, expectations[i], expectations[i]);

        });
      });
    }
  );

  test("jQuery.Hive.create /  jQuery.Hive.destroy", function() {

    var _liveThreads = $.Hive.get(),
        _liveLength  = _liveThreads.length;

    var addThreads = 15,
        delThreads = 6,
        resThreads = ( ( _liveLength + addThreads ) - delThreads ) + addThreads;

    $.Hive.create( $.extend({}, _completeTestObj, {
      count: addThreads
    }) );

    var createdlength = $.Hive.get().length;

    equal( $.Hive.get().length, (_liveLength + addThreads), "Create " + addThreads + " new threads and add to Hive ("+_liveLength+") " );

    var i = Math.floor( $.Hive.get().length / 2 ),
        d = i + delThreads;

    for ( ; i < d; i++ ) {
      $.Hive.destroy(i);
    }

    equal( $.Hive.get().length, (createdlength - delThreads), "Destroy " + delThreads + " threads in Hive ("+createdlength+") " );

    var destroyedLength = $.Hive.get().length;

    $.Hive.create( $.extend({}, _completeTestObj, {
                                                    count: addThreads
                                                  }) );

    equal( $.Hive.get().length, (destroyedLength + addThreads), "Create " + addThreads + " new threads and add to Hive ("+destroyedLength+") " );
  });
});
