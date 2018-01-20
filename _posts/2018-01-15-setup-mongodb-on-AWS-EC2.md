---
layout: post
title: "Launch mongoDB on EC2 instance"
date: 2018-01-18
---



# Launch mongoDB on EC2 instance

### SSH on the EC2 instance

In a new terminal (change *MY-Public-DNS-(IPv4)*):
```
ssh ec2-user@MYPublicDNS(IPv4)
```

### MongoDB installation
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/

1° Once connected to the EC2
```
sudo vi /etc/yum.repos.d/mongodb-org-3.6.repo
```
The copy-paste the following lines:
<code><br>
[mongodb-org-3.6]<br>
name=MongoDB Repository<br>
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.6/x86_64/<br>
gpgcheck=1<br>
enabled=1<br>
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
</code>

2° You can now **install** mongodb:
```
sudo yum install -y mongodb-org
```

3° Then **launch** mongod:
```
sudo service mongod start
```

The log is accessible by the command:
```sudo cat /var/log/mongodb/mongod.log```

4° You can **stop** or **restart** mongod:
```
sudo service mongod stop
sudo service mongod restart
```


### Python 3 installation

#### Install Python
Check **Python3** avaible versions:
```
sudo yum list | grep python3
```

In this example we use **Python 3.6**:
```
sudo yum install python36
```

You can now check by using `python36 --version`

#### Packages installation: Pandas, Twisted, Pymongo...
```
sudo python36 -m pip install pandas
sudo python36 -m pip install pymongo
sudo python36 -m pip install autobahn
sudo python36 -m pip install requests
sudo python36 -m pip install html5lib
sudo python36 -m pip install bs4
```

For **Twisted** (Need gcc installed):
```
sudo yum install -y python36-devel.x86_64
sudo yum install -y gcc
sudo python36 -m pip install twisted
```
