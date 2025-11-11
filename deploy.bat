@echo off
echo install...
call npm install

echo start...
pm2 start server.js --name "grpc-server" || pm2 restart "grpc-server"

echo autostart...
pm2 save

echo ready.
pm2 list