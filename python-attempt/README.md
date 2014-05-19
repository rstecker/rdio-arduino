Python Serial Attempt
============

It turns out talking to the Arduino via Python is stupid easy.  Rdio has some basic APIs that you can use with Python.  Boom- simple easy first pass attempt at exporting info to the device.

Unfortunately, most the functionality desired is only currently available from Rdio via the JS API so... something further on this would be needed... 

## Setup

In the same folder as `python_serial.py` you'll need to have `om.py` and `rdio.py` from https://github.com/rdio/rdio-simple/tree/master/python  You'll also need to have a `rdio_consumer_credentials.py` file w/ your credientials.

You'll need to `pip install pyserial` : http://pyserial.sourceforge.net/

Note that in `python_serial.py` there's this line

> ``ser = serial.Serial('/dev/tty.usbserial', 9600)``

That has been aliased on my machine to the USB port of the Arduino... from something, like, `/dev/tty.usbmodem1411` (the USB port you plug it into matters so be careful if you're unplugging & plugging it back in)

For the Arduino LED portion I was using a special `LCDKeypad` library, which I've included.  My particular shield is a [SainSmart 1602 LCD Shield Module Display V3 for Arduino UNO R3 MEGA2560 Nano DUE](http://www.amazon.com/gp/product/B007MYZF9S/ref=cm_cr_ryp_prd_ttl_sol_0)