import RPi.GPIO as GPIO
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import Adafruit_DHT

sensor = Adafruit_DHT.DHT11

#Firebase Credentials
cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

#Counter
x = 0

#Pins
PIN_TRIGGER = 18
PIN_ECHO = 24
PIN_DHT11 = 27
dist = 0.00
GPIO.cleanup()





def Distance(PIN_TRIGGER, PIN_ECHO):
    #Mapping
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(PIN_TRIGGER, GPIO.OUT)
    GPIO.setup(PIN_ECHO, GPIO.IN)
    GPIO.output(PIN_TRIGGER, GPIO.LOW)
    print("Waiting for sensor to settle")
    time.sleep(1)
    print("Calculating distance")
    GPIO.output(PIN_TRIGGER, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(PIN_TRIGGER, GPIO.LOW)

    while GPIO.input(PIN_ECHO)==0:
        pulse_start_time = time.time()
    while GPIO.input(PIN_ECHO)==1:
        pulse_end_time = time.time()

    pulse_duration = pulse_end_time - pulse_start_time
    dist = round(pulse_duration * 17150, 2)
    print("Distance:",dist,"cm")

    return dist

def Data_Send(dist, temperature, humidity):
    data = {
        u'value': dist,   
    }
    db.collection(u'devices').document(u'DistanceSensor').set(data)
    data = {
        u'value': temperature,   
    }
    db.collection(u'devices').document(u'TemperatureSensor').set(data)
    data = {
        u'value': humidity,   
    }
    db.collection(u'devices').document(u'HumiditySensor').set(data)

def Motor():
    GPIO.setup(4, GPIO.OUT) # Connected to PWMA
    GPIO.setup(20, GPIO.OUT) # Connected to AIN2
    GPIO.setup(21, GPIO.OUT) # Connected to AIN1

    # Drive the motor clockwise
    GPIO.output(20, GPIO.HIGH) # Set AIN1
    GPIO.output(21, GPIO.LOW) # Set AIN2
    # Set the motor speed
    pwm = GPIO.PWM(4, 40) # Set PWMA
    pwm.start(40)
    time.sleep(0.1)
while x < 1:
    
    dist = Distance(PIN_TRIGGER, PIN_ECHO)
    
    humidity, temperature = Adafruit_DHT.read_retry(sensor, PIN_DHT11)
    print("Temperature: ",temperature, " humidity: ", humidity)
    
    Data_Send(dist, temperature, humidity)
    time.sleep(1.5)
    
    GPIO.setmode(GPIO.BCM)
    Motor()
    GPIO.cleanup()
