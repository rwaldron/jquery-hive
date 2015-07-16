// IMPORT POLLEN
importScripts('jquery.hive.pollen.js');



$(function (data) {
  
  
  
  if ( data.file ) {
  
    $.ajax.get({ 
      url: data.file, 
      dataType:'json', 
      success: function(jsonObj) { 
      
        $.send(
          $.unique(
            $.filter(jsonObj, function (obj) {
              if ( $.inStr(obj.company, 'Atlantic') ) {
                return true;
              }
              return false;
            })
          )
        );
      } 
    });      
  }
  else {
    

    if ( data.RELAY_TO ) {
      $.send( { message: 'Worker #' + data.WORKER_ID + ' calling Worker #' + data.RELAY_TO , SEND_TO : data.RELAY_TO  } );
      return;
    }
    
    
  
    if ( data.SEND_TO ) {
      $.send( { message: 'Worker #' + data.SEND_TO + ' Received a direct message from Worker #' + data.SEND_FROM + ' @ '+  $.now() + "\n" + '{ message: ' + data.message + ' }' } );
      return;
    }
    
    $.send( { message: data.message  } );
  }    
});


