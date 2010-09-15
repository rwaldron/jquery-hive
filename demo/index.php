<!DOCTYPE html>
<html>
  <head>
    <title>jQuery.Hive / Pollen - threading - latest</title>
    <meta name="cache-control"  content="no-cache">
    <meta http-equiv="pragma"   content="no-cache">

    <link href="blueprint-0.8.css"  rel="stylesheet" type="text/css" />
    <link href="jquery.ui-1.8.css"  rel="stylesheet" type="text/css" />
    

    <script src="jquery-latest.js"></script>
    <script src="jquery.ui.min-1.8.js"></script>
    
    <script src="../jquery.hive.js"></script>
    <script src="hive.demo.js"></script>
    
  
  
    
  </head>
  <body>
  
  <div class="container">
    
    <div class="push-2 span-22 last">
      <img src="hive-logo-300w.png">
      <img src="pollenjs-logo-300w.png">
    </div>
    
    <h2>Your FireBug or WebKit console must be opened and enabled to view results</h2>
    
    <div class="span-24 success last">
      
      <div class="span-5">
        <h3>Active Workers: <span id="active"></span></h3>

        <input type="button" id="generate"  value="generate new worker">
      </div>
      <div class="span-6">      
      
      
        <h3>Send Message To All: </h3>
        
      
      
        <input type="button" class="message-not-special"   data-type="string"   value="string">  
        <input type="button" class="message-has-special"   data-type="string"   value="string (adds special callback)">  
        
        
        <code class="clearfix">
        this is a string
        </code>
        
        
      </div>      
      <div class="span-6">      
      
        
        <h3>&nbsp;</h3>
        <input type="button" class="message-not-special"   data-type="array"   value="array">
        <input type="button" class="message-has-special"   data-type="array"   value="array (adds special callback)">
        
        <code class="clearfix">
        [ "is", "an", "array" ]
        </code>      
      
      </div>
      <div class="span-6 last">
        
        <h3>&nbsp;</h3>
        
        <input type="button" class="message-not-special"   data-type="object" value="object">
        <input type="button" class="message-has-special"   data-type="object"   value="object (adds special callback)">

        <code class="clearfix">
        { "file": "json-test/100.js" }
        </code>

      </div>        
      
    </div>
    
    
    <hr class="space">

    <div class="span-24 notice last">
      
      <h3>Worker Set (existing Worker ID's, click to inspect in console): <br>
      
      <span class="worker-range"></span></h3>
    
    
      From: 
      <select id="_sender" class="_workerselect">
      </select>


      To :

      <select id="_recipient" class="_workerselect">
      </select>  


      <input type="button"  id="relayto"   value="trigger direct message"> <br />
      (fires a message to the starting worker signaling the relay command. When the message returns to the client, it should be from the last work in the relay: <span id="last-worker-relay"></span>)



      <input type="text"    id="sender"     class="workertoworker" value="" style="display:none">
      <input type="text"    id="recipient"  class="workertoworker" value="" style="display:none">
    </div>
    
    <hr class="space">
    
    <div class="span-24 error last">
      <h3>Worker Set (existing Worker ID's, click to inspect in console): <br>
      
      <span class="worker-range"></span></h3>
      
      <select id="_delete" class="_workerselect">
      </select>
      <input type="button"  id="delete"   value="delete worker thread">
    
    </div>
  </div>

  </body>
</html>


