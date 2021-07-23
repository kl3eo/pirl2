#!/bin/bash

#download binary from : https://room-house.com/pirl_0.8.29_07222021
#and place it to /opt/nvme/

cd /opt/nvme && wget https://room-house.com/pirl_0.8.29_07232021

#download library from : https://room-house.com/libstdc++.so.6.0.28
#and place it to /usr/local/lib64/

cd /usr/local/lib64 && wget https://room-house.com/libstdc++.so.6.0.28

#then create a link: 

ln -s libstdc++.so.6.0.28 libstdc++.so.6

#change paths, names and ports accordingly
#also, may need to remove "-b" flag from cpulimit if you're not on ubuntu

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib64/
/opt/nvme/pirl_0.8.29_07232021 --base-path /ssd/pirl3/ --port 30330 --ws-port 9941 --rpc-port 9930 --bootnodes /dns/cube.room-house.com/tcp/8480/p2p/12D3KooWP3QEtphfi5iTfyss8jf1WYSgywVNDUrPkQukxgmTFuhp --rpc-cors all --validator --name xTER2 & cpulimit -p $! -l 25 -b
