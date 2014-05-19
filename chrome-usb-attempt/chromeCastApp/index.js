
onload = function() {
	var $ = function(sel) {
		return document.querySelector(sel);
	};

	var wv1=$('#wv1');
	var wv2=$('#wv2');
	var logEl=$('textarea');
  var syncEl=$('.sync');
  var statusEl=$('.status');

	function log(str) {
		logEl.value = str+"\n"+logEl.value;
	}

window.talkToWindow = function (cmd) {
  data = {
      command: cmd
    }
    wv1.contentWindow.postMessage(data, "*");
    log("Just sent : "+cmd);
};

  syncEl.addEventListener('click', function(e){
    window.talkToWindow("sync");

    var permissionObj = {permissions: [{'usbDevices': [DEVICE_INFO] }]};
    chrome.permissions.request( permissionObj, function(result) {
      if (result) {
        gotPermission();
      } else {
        console.log('App was not granted the "usbDevices" permission.');
        console.log(chrome.runtime.lastError);
      }
    });
  });

	window.addEventListener('message', function(e) {
		log("[???] messagereceived: "+e.data+" - "+ e.data.command+" : "+e.data.value);
    statusEl.classList.remove('stop')
    statusEl.classList.remove('go')
    if (e.data.value == 0){
      statusEl.classList.add('stop')
    } else if (e.data.value == 1) {
      statusEl.classList.add('go')
    }
		console.log("received message", e);
	});



var gotPermission = function(result) {
    //requestButton.style.display = 'none';
    //knob.style.display = 'block';
    console.log('App was granted the "usbDevices" permission.');
    //debugger;
    usb.findDevices( DEVICE_INFO, 
      function(devices) {
        if (!devices || !devices.length) {
          console.log('device not found');
          return;
        }
        console.log('Found device: ' + devices[0].handle);
        powerMateDevice = devices[0];
        window.reb = powerMateDevice;
        /*usb.controlTransfer(powerMateDevice, {
            requestType: 'standard',
            recipient: 'device',
            direction: 'in',
            request: 9, // SET_CONFIGURATION
            value: 0,
            index: 0,
            data: new Uint8Array(0).buffer
          }, function(info) {
            console.log("FUCK YES");
            console.log(info);
          });*/
      
        usb.interruptTransfer(powerMateDevice, transfer, onEvent);
        //chrome.usb.resetDevice(powerMateDevice, function(info) {
          console.log("Reset w/ info ");
          usb.claimInterface(powerMateDevice, 0, function() {
            console.log("Did I win yet?");
            usb.interruptTransfer(powerMateDevice, transfer, onEvent);
            usb.listInterfaces(powerMateDevice, function(x){
              console.log("Inside list interfaces");
              console.log(x);
            });
          });
        //});
    });
  };


var transfer = {
  direction: 'in',
  endpoint: 129,
  length: 3
};
window.prevVal = 0;
var onEvent=function(usbEvent) {
  // 88 -> 77 means toggle
    if (usbEvent.resultCode) {
      console.log("Error: " + usbEvent.error);
      return;
    }
    var buffer = new Int8Array(usbEvent.data);
    if(buffer[0] == 88) {
      //console.log("DOWN "+window.prevVal+" "+buffer[0]);
    } else if (buffer[0] == 77) {
      //console.log("UP "+window.prevVal+" "+buffer[0]);
    }
    if(window.prevVal == 88 && buffer[0] == 77) {
      console.log("FLIP THE FUCKING CODE");

      log("==== BUTTON PRESS===");
      window.talkToWindow("rebecca");
    }

    window.prevVal = buffer[0];

    /*amount += buffer[1] * 4;

    knob.style.webkitTransform = 'rotate(' + amount + 'deg)';
    usb.interruptTransfer( powerMateDevice, transfer, onEvent );
    console.log("Rebecca totes got shit yo");
    */
    //console.log(buffer);
    usb.interruptTransfer( powerMateDevice, transfer, onEvent );
  };


  var POWERMATE_VENDOR_ID = 1003; //0x03eb;
var POWERMATE_PRODUCT_ID = 8257;//8257;
var DEVICE_INFO = {"vendorId": POWERMATE_VENDOR_ID, "productId": POWERMATE_PRODUCT_ID};

var powerMateDevice;
var usb = chrome.usb;



}