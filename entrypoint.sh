#! /bin/sh

echo "starting X server and VNC display"
Xvfb :1 -screen 0 1500x1000x24 &
x11vnc -display :1.0 -quiet -forever &
DISPLAY=:1.0
export DISPLAY

echo "starting node server"
node main.js
