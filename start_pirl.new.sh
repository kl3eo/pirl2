#!/bin/bash

#download binary from : https://room-house.com/pirl_0.8.29_07222021
#and place it to /opt/nvme/
#download library from : https://room-house.com/libstdc++.so.6.0.28
#and place it to /usr/local/lib64/
#then create a link: cd /usr/local/lib64/ && ln -s libstdc++.so.6.0.28 libstdc++.so.6
#change paths, names and ports accordingly
#also, may need to remove "-b" flag from cpulimit if you're not on ubuntu

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib64/
/opt/nvme/pirl_0.8.29_07222021 --base-path /ssd/pirl2/ --port 30331 --ws-port 9942 --rpc-port 9931 --bootnodes /dns/cube.room-house.com/tcp/8470/p2p/12D3KooWHLuE4bhtpGVo6wzMYXtrZoZpzSR6n18yZ5m3NXzvsi2e --rpc-cors all --validator --name xTER2 & cpulimit -p $! -l 25 -b 

