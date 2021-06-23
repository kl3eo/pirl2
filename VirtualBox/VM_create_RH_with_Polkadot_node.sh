#!/bin/bash
mkdir -p ~/VB && cd ~/VB
vboxmanage createvm --name xTER --ostype RedHat_64 --register --basefolder `pwd`
vboxmanage modifyvm xTER --memory 5120 --cpus 2 --audio none --firmware efi --nic1 nat --nataliasmode1 proxyonly
vboxmanage modifyvm xTER --natpf1 "https,tcp,,8443,,443"
vboxmanage modifyvm xTER --natpf1 "chat,tcp,,8843,,8443"
vboxmanage modifyvm xTER --natpf1 "polkadot_port1,tcp,,30333,,30333"
vboxmanage modifyvm xTER --natpf1 "polkadot_port2,tcp,,9944,,9944"
vboxmanage modifyvm xTER --natpf1 "polkadot_port3,tcp,,9933,,9933"
vboxmanage modifyvm xTER --natpf1 "polkadot_port4,tcp,,9615,,9615"
#NB: size of the Polkadot blockchain partition: here 60G, change to how much is required
vboxmanage createmedium --filename 60G.vdi --size 60000
vboxmanage storagectl xTER --name SATA --add sata
vboxmanage storageattach xTER --storagectl SATA --medium loop.vdi --port 0 --type hdd
vboxmanage storageattach xTER --storagectl SATA --medium 60G.vdi --port 1 --type hdd
vboxmanage modifyvm xTER --boot1 disk --boot2 none --boot3 none --boot4 none
