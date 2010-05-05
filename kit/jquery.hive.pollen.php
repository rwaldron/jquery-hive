<!DOCTYPE html>
<html>
  <head>
    <title>pollen.js</title>
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
<img src="pollenjs-logo-520w.png" />
<?php

$POLLEN = file('jquery.hive.pollen.js');


foreach ( $POLLEN as $_line ) {
  $_line  = trim($_line);
  if ( strpos($_line, '* ') !== false AND strpos($_line, '* ') == 0 ) {
    
    if ( strpos($_line, '-->') === false ) {
      echo '<br><br>';
    }
    else {
      echo '<br>';
    }
    
    
    $_line  = str_replace(array('*  $.', ') ->'), array('* <span style="color:#3366ff">$.',')</span> ->'), $_line);
    
    $_line  = str_replace(array('array','function','expression','args','arg ','keys','values','iteration','object','request','context','message'), 
                          array('<span style="color:#ff33ee">array</span>',
                                '<span style="color:#ff33ee">function</span>',
                                '<span style="color:#ff33ee">expression</span>',
                                '<span style="color:#ff33ee">args</span>',
                                '<span style="color:#ff33ee">arg</span> ',
                                '<span style="color:#ff33ee">keys</span>',
                                '<span style="color:#ff33ee">values</span>',
                                '<span style="color:#ff33ee">iteration</span>',
                                '<span style="color:#ff33ee">object</span>',
                                '<span style="color:#ff33ee">request</span>',
                                '<span style="color:#ff33ee">context</span>',
                                '<span style="color:#ff33ee">message</span>'), 
                          $_line);
    
    
    echo $_line; 
  }

}



?>

<hr>

Basic Worker setup:

<pre>

importScripts('pollen.js');

$.receive(function (data) {

  $.ajax.get({  
    url: 'get-data-from-the-server.php',  
    dataType:'json', 
    data: $.param(data.message), 
    success: function(jsonObj) { 

      $.send( 
        $.unique( 
          $.filter(jsonObj, function (obj) { 
            //  Assume its a list of company contacts.
            //  If not passed in the data property above, we could filter here.
            //  Not the most efficient way, the example is really to illustrate Pollen's syntax
            
            if ( $.inStr(obj.company, data.company) ) { 
              return true; 
            } 
            return false;
          })
        )
      );
    } 
  });      


});

</pre>

<hr>
<small>PollenJS Logo &copy; Nick Piava 2010</small>
</body>
</html>