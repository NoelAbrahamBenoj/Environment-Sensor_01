# ENV.SYS - Smart Environment Monitor
ENV.SYS is a live IoT environment monitor which utilizes the Web Serial API, HTML5/CSS3, Chart.js and Arduino to display live 
light, temperature and sound levels from an analog hardware input sensor 
and assess an ambient environment relative to prescribed environments which triggers alert actions.
---
Features
- Live Serial Streaming: Directly connect from the web-browser to the micro-controller via the Web Serial API at 115200 baud.
- Live Visualizations: A 120s rolling window with an animated color-coded glowing system, mapped to severity using Chart.js.
- Environment Modes: Analyse sensor data against 12 modes (Sleep, Library, Classroom, Study, Hospital, Gym, Meditate, Office, Cinema, Dining, Concert, Lab).
- Automated Alerts: Red flag and provide live system advice and session data for a given condition.
- Built-in Demo System: Falls back to a realistic simulated sensor reading if no hardware is connected or browser is not compatible to interface with the Arduino.
---
Repository Structure
```text
my-env-sys/
docs/ # The project assets, reference materials and diagrams
 src/ # Source files and code
 index.html # Web Serial interface, dashboard and frontend.
 Firmware.ino # The Arduino or ESP32 firmware sketch.
 .gitignore # files such as temporary builds and secrets that shouldn't be committed.
 README.md # The project documentation.
