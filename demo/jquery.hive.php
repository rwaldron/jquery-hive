<!DOCTYPE html>
<html>
  <head>
    <title>jquery.hive.js</title>
    <meta name="cache-control" content="no-cache">
    <meta http-equiv="pragma" content="no-cache">
    <script src="http://code.jquery.com/jquery-latest.js"></script> 
    <style>
      body,pre {
        font-family: Consolas, "Lucida Console"
      }
    </style>
  </head>
<body>
  <img src="hive-logo-520w.png" />

  
  <?php
  
  $POLLEN = file('jquery.hive.js');
  
  
  foreach ( $POLLEN as $_line ) {
    $_line  = trim($_line);
    if ( strpos($_line, '* ') !== false AND strpos($_line, '* ') == 0 ) {
      
      if ( strpos($_line, '-->') === false ) {
        echo '<br><br>';
      }
      else {
        echo '<br>';
      }
      
      $_line  = str_replace(array('* jQuery.Hive.',' ->'), array('* <span style="color:#3366ff">jQuery.Hive.','</span> ->'), $_line);      
      $_line  = str_replace(array('array','function','expression','args','arg ','keys','values','iteration','request','context','message','callback','options','id'), 
                            array('<span style="color:#ff33ee">array</span>',
                                  '<span style="color:#ff33ee">function</span>',
                                  '<span style="color:#ff33ee">expression</span>',
                                  '<span style="color:#ff33ee">args</span>',
                                  '<span style="color:#ff33ee">arg</span> ',
                                  '<span style="color:#ff33ee">keys</span>',
                                  '<span style="color:#ff33ee">values</span>',
                                  '<span style="color:#ff33ee">iteration</span>',
                                  '<span style="color:#ff33ee">request</span>',
                                  '<span style="color:#ff33ee">context</span>',
                                  '<span style="color:#ff33ee">message</span>',
                                  '<span style="color:#ff33ee">callback</span>',
                                  '<span style="color:#ff33ee">options</span>',
                                  '<span style="color:#ff33ee">id</span>'), 
                            $_line);

      echo $_line; 
    }
  
  }
?>

<hr>

Basic Hive creation:

<br><br>

(assumes jquery-1.4.2.js and jquery.hive.js are loaded) 
<pre>


$(function () {

  $.Hive.create({

    count: 100,  
    worker: 'worker.js',
    receive: function (data) {
      
      console.group('RECEIVED MESSAGE - WORKER: #' + data._from_);
        console.log( data );  
      console.groupEnd();   
      
      /*
      ------------------------------------------------------
        Or... 
        
        Populate a massive data table...
        
        Update a browser based IM client
        
        Update a feed reader app ( 1-to-1 worker to feed?)
      ------------------------------------------------------        
      */
      
    },
    created: function (hive) {
      console.log( 'Created ' + hive.length + ' workers' );
      
      /*
      ------------------------------------------------------
        Or...
        
        Impress the hell out of your friends by 
        executing code after all the workers are created
      ------------------------------------------------------  
      */        
    }
  });
  
  /*
  ------------------------------------------------------
    This contradicts what I noted above, but  it's for 
    illustration purposes, so I'm ok with that.
  ------------------------------------------------------  
  */        

    
  $( $.Hive.get(1) ).send({ 
    
    "message" : { 
      "a" : "a-value",
      "b" : "b-value",
      "c" : "c-value"
    }      
  
  });
  
  /*
  ------------------------------------------------------
    Alternative syntax
  ------------------------------------------------------      
  */
  $.Hive.get(1).send({ 
    
    "message" : { 
      "a" : "a-value",
      "b" : "b-value",
      "c" : "c-value"
    }      
  
  });  


  /*
  ------------------------------------------------------
    Specify an additional callback
  ------------------------------------------------------      
  */
  $.Hive.get(1).send({ 
    
    "message" : { 
      "a" : "a-value",
      "b" : "b-value",
      "c" : "c-value"
    }      
  
  }, function (data) {
    
    console.log('This is from a task specific message receipt callback');
  
  });  
  
  
});

</pre>

<hr>
<small>jQuery.Hive Logo &copy; Nick Piava 2010</small>
</body>
</html>