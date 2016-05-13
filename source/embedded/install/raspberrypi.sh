sudo apt-get update 
(grep "deb http://wyliodrin.com/public/debian/raspberrypi trusty main" /etc/apt/sources.list || sudo bash -c "echo \"deb http://wyliodrin.com/public/debian/raspberrypi trusty main\" >> /etc/apt/sources.list") 
sudo apt-get install -y apt-transport-https 
sudo apt-get update 
sudo apt-get install -y --force-yes libstrophe=0.8.8 libstrophe-dev=0.8.8 
sudo apt-get install -y --force-yes libwyliodrin1 libwyliodrin-dev 
sudo apt-get install -y --force-yes wyliodrin-server 
sudo apt-get install -y --force-yes wyliodrin-shell 
sudo apt-get install -y --force-yes wyliodrin-app-server 
sudo apt-get install -y --force-yes node-red 
sudo apt-get install -y --force-yes wyliodrin-social