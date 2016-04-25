download
unzip

mkdir "C:\Program Files\node"

copy node.exe "C:\Program Files\node"
copy npm.cmd "C:\Program Files\node"

rem copy serial port

setx PATH "%PATH%;C:\Program Files\node"
setx APPDATA c:\Users\Default\AppData\Roaming /M
set NODE_PATH=%APPDATA%\node_modules /M
setx NODE_PATH %APPDATA%\node_modules /M
shutdown /r /t 0

