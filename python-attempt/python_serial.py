#!/usr/bin/env python

import serial

from rdio import Rdio
from rdio_consumer_credentials import RDIO_CREDENTIALS
import time

ser = serial.Serial('/dev/tty.usbserial', 9600)
ser.write('<Server starting ...')

spaces = '                ' # 16 spaces

try:
    from urllib.error import HTTPError
except ImportError:
    from urllib2 import HTTPError

# Fix for Python 2.X
try:
    input = raw_input
except NameError:
    pass

# create an instance of the Rdio object with our consumer credentials
rdio = Rdio(RDIO_CREDENTIALS)

try:
  # authenticate against the Rdio service
  url = rdio.begin_authentication('oob')

  print('Go to: ' + url)
  verifier = input('Then enter the code: ').strip()
  rdio.complete_authentication(verifier)

  line1 = 'yy'
  line2 = 'xx'
  while 1:
    # find out what playlists you created
    mySong = rdio.call('currentUser',{'extras':'-*,lastSongPlayed'})['result']['lastSongPlayed']
    print mySong['album']
    print mySong['artist']
    print mySong['name']
    if line2 is not mySong['artist'][:16]:
      line2 = mySong['artist'][:16]
      ser.write('<' + spaces + line2.encode('utf-8') + spaces)
    if line1 is not mySong['name'][:16]:
      line1 = mySong['name'][:16]
      ser.write('<' + line1.encode('utf-8'))

except HTTPError as e:
  # if we have a protocol error, print it
  print(e.read())
