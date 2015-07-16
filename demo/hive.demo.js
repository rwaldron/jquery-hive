//  DEMO.
      
$(function () {
  
  var $divcontainer = $('div.container > h1');
  
  $divcontainer
    .hide();
  
  
  
  if ( !('console' in window) ) {
    $divcontainer
      .show();
  }
  
  

  function _createdCallback(hive) {
    if ( hive.length > 0 ) {
      
      var _range  = [];
    
      $('._workerselect')
        .empty();

      $.each( hive, function (i, worker) {
        $('._workerselect')
          .append('<option value='+worker.id+'> $.Hive  ID #: '+worker.id+'</option>');
          
        _range.push(worker.id);
      });

      $('.worker-range')
        .html('[ <a href="javascript:;" class="inspect-worker">'+ _range.join('</a>, <a href="javascript:;" class="inspect-worker">')  +'</a> ]');
      
      
      $('#active')
        .text(hive.length);
      
    }          
  }
  
  function _receivedCallback(data) {
    //  inside callbacks, this refers to the data object received.
    
    console.group('* WORKER SENT AND RECEIVED MESSAGE FROM WORKER: #' + this.WORKER_ID + '  ---  ' + Math.round( +new Date() / 1000 ) );
      console.log( data );  
      //console.dir( data );  
      //console.log( '(this callback explicitly logs the data object to the console)' );  
    console.groupEnd();  
  }

  $('.inspect-worker')
    .live(
      'click',
      function () {
        
        var id = $(this).text();
        
        console.log( $.Hive.get(id) );
      }
    );

  $('.message-not-special').click(function () {

    var $this = $(this), 
        $hive = $.Hive.get(),
        message;          
    
    message = $this.attr('data-type') === 'string' ? $this.nextAll('code').text().trim() : JSON.parse($this.nextAll('code').text().trim());
    
    //  If you want to send to a set of workers, use $()
    $( $hive )
      .send(message);
  });
  
  $('.message-has-special')
    .hide();

  $('#relayto')
    .click(function () {
      
      var _sender     = $('#_sender').val(),
          _recipient  = $('#_recipient').val();
      
      $.Hive.get(_sender)
        .send( { 
          message: 'test: worker to worker messaging - ' + _sender + ' will get the relay assignment and fire a direct message to ' + _recipient, 
          RELAY_TO : _recipient 
        });

      
      $('#last-worker-relay')
        .text(_recipient);
    
    });
  
  $('#delete')
    .click(function () {
      
      var id = $('#_delete').val();
      
      if ( $.Hive.destroy( id ) ) {
      
        var $hive   = $.Hive.get(), 
            _range  = [];
        
        $('._workerselect')
          .empty();
        
        
        
        $.each( $hive, function (i, worker) {
          
          $('._workerselect')
            .append('<option value='+worker.id+'> $.Hive  ID #: '+worker.id+'</option>');
          
          _range.push(worker.id);
        });
        
        $('.worker-range')
          .html('[ <a href="javascript:;" class="inspect-worker">'+ _range.join('</a>, <a href="javascript:;" class="inspect-worker">')  +'</a> ]');


        $('#active')
          .text( $hive.length);      
      }      
      
    });

  
  var _workerSetup = {
          worker: 'hive.worker.js',
          receive: _receivedCallback,
          created: _createdCallback
        };

  
  $('#generate')
    .click(function () {
      
      /* adding more workers */
      $.Hive.create(_workerSetup);
    });

  


  /* Basic Set up */
  $.Hive
    .create(_workerSetup);
    


  $('input:first')
    .focus();


  //$('.message')
  //  .trigger('click');

});