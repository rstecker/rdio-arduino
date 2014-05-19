#include <LiquidCrystal.h>
#include <LCDKeypad.h>
#include <SoftwareSerial.h>

#define MINVAL 1
#define MAXVAL 1000

// software serial #1: TX = digital pin 10, RX = digital pin 11
SoftwareSerial portOne(10,11);

LCDKeypad lcd;
int incomingByte = 0;   // for incoming serial data
int i = 0;
void setup()
{
 // Open serial communications and wait for port to open:
  Serial.begin(9600);
   while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  lcd.begin(16, 2);
  lcd.clear();
  lcd.print("Rebecca");
  lcd.setCursor(0,1);
  lcd.print("S.");
}
void loop()
{
        // send data only when you receive data:
        if (Serial.available() > 0) {
                // read the incoming byte:
                incomingByte = Serial.read();
                char incomingChar = incomingByte;
                if (incomingChar == '<') {
                  lcd.setCursor(0,0);
                  i = 0;
                } else {
                  lcd.setCursor(i % 16,i/16 % 2);
                  lcd.print(incomingChar);
                  ++i;
                }
        }
}
