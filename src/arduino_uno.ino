// 🌞 Light, 🌡️ Temp, 🎤 Sound pins
int lightPin = A0;
int tempPin  = A1;
int soundPin = A2;

// 💡 LED output pin (PWM supported)
int ledPin = 11;

// Thresholds
int LIGHT_THRESH = 500;   // below = bright
int TEMP_LOW     = 100;   // below = hot
int TEMP_HIGH    = 110;   // above = cold
int SOUND_THRESH = 9;    // above = noisy

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
}

void loop() {

  int lightVal = analogRead(A0);
  int tempVal  = analogRead(A1);
  int soundVal = analogRead(A2);

  Serial.print("{");
  Serial.print("\"light\":"); Serial.print(lightVal); Serial.print(",");
  Serial.print("\"temp\":");  Serial.print(tempVal);  Serial.print(",");
  Serial.print("\"sound\":"); Serial.print(soundVal);
  Serial.println("}");

  delay(300);
}
