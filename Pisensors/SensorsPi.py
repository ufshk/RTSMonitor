import RPi.GPIO as GPIO
import time
from firebase import firebase

x = 0

firebase = firebase.FirebaseApplication('https://rts-monitor.firebaseio.com', None)
new_user = 'Ozgur Vatansever'

result = firebase.post('devices', new_user, {'print': 'pretty'}, {'X_FANCY_HEADER': 'VERY FANCY'})
print result(
{u'name': u'-Io26123nDHkfybDIGl7'})

result = firebase.post('/users', new_user, {'print': 'silent'}, {'X_FANCY_HEADER': 'VERY FANCY'})
print result == None
True

'''
while x < 1:
      GPIO.setmode(GPIO.BOARD)

      PIN_TRIGGER = 7
      PIN_ECHO = 11

      GPIO.setup(PIN_TRIGGER, GPIO.OUT)
      GPIO.setup(PIN_ECHO, GPIO.IN)

      GPIO.output(PIN_TRIGGER, GPIO.LOW)

      print("Waiting for sensor to settle")

      time.sleep(2)

      print("Calculating distance")

      GPIO.output(PIN_TRIGGER, GPIO.HIGH)

      time.sleep(0.00001)

      GPIO.output(PIN_TRIGGER, GPIO.LOW)

      while GPIO.input(PIN_ECHO)==0:
            pulse_start_time = time.time()
      while GPIO.input(PIN_ECHO)==1:
            pulse_end_time = time.time()

      pulse_duration = pulse_end_time - pulse_start_time
      distance = round(pulse_duration * 17150, 2)
      print("Distance:",distance,"cm")


GPIO.cleanup()
'''
