Chrome USB Attempt
============

The goal of this attempt was to creatue a USB device that you could plug into any computer.  The user would need to install a Chrome app, run it, and then boom! You can view & control Rdio on your peripheral device.

This was really hard.  Really, really, really hard.  And I didn't get very far... but half of it was gathering the information and setting up my eviorment so hopefully it'll be easier to make progress next/if I circle back...

All of this was possible due to this AMAZING blog post [Arduino UNO Big Joystick HID firmware](http://hunt.net.nz/users/darran/weblog/15f92/Arduino_UNO_Big_Joystick_HID_firmware.html).

## Arduino Portion

The actual Scratch? file was rediculously simple.  Just send info down the serial line when buttons are pressed.  Easy.  ... so easy, that I've lost the code for that portion.

## Chrome App Portion

At the time I was using [Chrome's USB library](https://developer.chrome.com/apps/first_app), which would only work with the Canary release... I haven't checked back to see if that's still true.

I was using the Rdio JS API which has an OAuth 2 flow and it didn't play well with the Chrome App security.  I wound up having to use a web view and running all my Rdio code within there.  `postMessage` was used to communicate to the "top" layer and then down to the USB device.  This whole section could be improved.

## Reprogramming the Atmega8U2

This was the black hole of time.  I wanted to flash the atmega so that it would act like my custom USB device rather than an Arduino.  

Arduino's page on how to put the device in DFU (Device Firmware Update) mode : http://arduino.cc/en/Hacking/DFUProgramming8U2

My fragmented notes on getting started:

* `brew install libusb` (or `port install`)
* manually instal `dfu-programmer` 0.6.1 (`port` has 0.5.4, `brew` has 0.5.5 and neither have/had the `atmega16u2` at that time)
* `sudo port install avr-gcc`
* `sudo port install avr-libc`

I'll be honest, installing `avr-gcc`/all that stuff nearly did me in.  I can fight code, but fighting my OS/dependancies is too demoralizing.  Luckily my boyfriend used to do a lot of Debian and C/C++ work an was able to help set up my machine just right. 

After that it was a lot of tweak code/try/fail/repeat.  