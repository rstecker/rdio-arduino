rdio-arduino
============

I make no promise about the state of this code. 

I have an Arduino.  I have an Rdio subscription.  I have a LED shield for the Ardunio.  I have a lot of fake fur.

My goal is to make an optimal device to sit on my desk and reflect what I'm playing, and allow me to interact with it.  Knowing me, I clearly would like it to look like a monster.

## Progress

**Hackday 3 - Music Hack Day SF ** : I pulled all the existing code together and posted this git repo.  I also started investigating audio-in for the Arduino.

**Hackday 2 - HackIllinois** : I used a simple python serial library and managed to display my current play information on the LED shield.  It was really easy.

**Hackday 1 - Rdio **: I used the Chrome USB library and a bunch of code on the internet to turn my Ardunio into a USB peripheral... It was really hard, and I only managed to get Arduino -> computer working.

##Desired Feature List


- Display currenty playing information
  - track 
  * source / artist 
  * duration/position
* Display playstate
  * playing/paused
  * size of queue
  * shuffle state
* Input controls
  * play / pause toggle 
  * next/previous 
  * change shuffle state
* Display plugged in/powered state?


##TODOs

* Include USBtoSerial code for the chrome-usb-attempt
* Be able to handle audio-in
    * http://www.instructables.com/id/Arduino-Audio-Input/?ALLSTEPS
    * http://electronics.stackexchange.com/questions/28404/what-is-the-voltage-range-of-a-standard-headphone-jack-from-a-phone
    * Hardware needed
       * male-to-male audio cable
       * Inline Audio Jack
       * Linear aplifier chip?
* Handle computer -> adruino comminications with Chrome USB 
* Better handle playstate detection with the python USB code
* Construct enclosure/monster
  * How many inputs do I need/want?
    * How many LEDs do I need/want? What types/colors? 
    * How's the USB cable going to fit in? Collar/leash idea? 
    * What's the overall size we're talking here? Needs to be able to contain Arduino + LED shield