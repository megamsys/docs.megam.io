---
title: Vertice
order: 1
---

{% include install_bulb.md %}

At the start, install OpenJDK8 and cassandra for which the following are needed.

### Supported Platforms

| Operating System                        | Status                                                |
|:-------------------------------------- :| :---------------------------------------------------- |
| Ubuntu 14.04, 16.04, Debian 8.5         | Well tested                                           |
| CentOS 7.2                              | *experimental*, [report issues](https://github.com/megamsys/gitpackager){: target="_blank"} |


---

#### Ubuntu 14.04

##### OpenJDK8

~~~bash

$ sudo apt-add-repository -y ppa:openjdk-r/ppa

$ sudo apt-get -y update

$ sudo apt-get -y install openjdk-8-jdk

~~~

##### Ruby2.3

~~~bash

$ sudo apt-add-repository ppa:brightbox/ruby-ng

$ sudo apt-get -y update

$ sudo apt-get -y install ruby2.3 ruby2.3-dev

~~~

##### Ubuntu 16.04

~~~bash

$ sudo apt-get install openjdk-8-jre-headless

~~~  

##### Debian Jessie

~~~bash

$ echo "deb http://http.debian.net/debian jessie-backports main" > /etc/apt/sources.list

$ sudo apt-get update

$ sudo apt-get install openjdk-8-jre-headless

$ sudo apt-get install openjdk-8-jdk

$ sudo /usr/sbin/update-java-alternatives -s java-1.8.0-openjdk-amd64

~~~    

##### CentOS 7.2

##### OpenJDK8

~~~bash

$ wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u45-b14/jdk-8u45-linux-x64.rpm"

$ rpm -ivh jdk-8u45-linux-x64.rpm

~~~  

#### Cassandra 3.7

Install cassandra 3.7 by following the link for your operating system.


| Operating System             | Link                                                                                        |
|:--------------------------- :| :------------------------------------------------------------------------------------------ |
| Ubuntu 14.04/16.04/Debian 8.5|[Ubuntu/Debian](http://docs.datastax.com/en/cassandra/3.x/cassandra/install/installDeb.html){: target="_blank"} |
| CentOS 7.2                   |[CentOS](http://docs.datastax.com/en/cassandra/3.x/cassandra/install/installRHEL.html){: target="_blank"}       |
| Using tarball                |[All Linux using tarball](http://docs.datastax.com/en/cassandra/3.x/cassandra/install/installTarball.html){: target="_blank"}                                    |

##### Ubuntu 14.04

In case you find issues in installing cassandra 3.7 in *Ubuntu 14.04*, follow the instructions given below:

~~~bash

$ sudo echo "deb http://debian.datastax.com/datastax-ddc 3.7 main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list

$ sudo curl -L https://debian.datastax.com/debian/repo_key | sudo apt-key add -

$ sudo apt-get update

$ sudo apt-get install datastax-ddc

~~~

##### Enable access using *private_ip*

Open the file */etc/cassandra/cassandra.yaml* in your favourite EDITOR.

Lets use *nano*

~~~bash

$ nano  /etc/cassandra/cassandra.yaml

~~~

- Change *listen_address* to *private_ip*

- Change *rpc_address* to *private_ip*

- Change *seeds* to *private_ip*


Restart the cassandra (in all operating systems)

~~~bash

$ service cassandra restart

~~~



##### Enable password-auth in cassandra

Open the file */etc/cassandra/cassandra.yaml* in your favourite EDITOR.

Lets use *nano*

~~~bash

$ nano  /etc/cassandra/cassandra.yaml

~~~

- Change authenticator  “AllowAllAuthenticator” to “PasswordAuthenticator”.

- Change authorizer “AllowAllAuthorizer” to “CassandraAuthorizer”

~~~yaml

  # - AllowAllAuthenticator performs no checks - set it to disable authentication.
  # - PasswordAuthenticator relies on username/password pairs to authenticate
  #   users. It keeps usernames and hashed passwords in system_auth.credentials table.
  #   Please increase system_auth keyspace replication factor if you use this authenticator.
  #   If using PasswordAuthenticator, CassandraRoleManager must also be used (see below)
  authenticator: PasswordAuthenticator

  # - AllowAllAuthorizer allows any action to any user - set it to disable authorization.
  # - CassandraAuthorizer stores permissions in system_auth.permissions table. Please
  #   increase system_auth keyspace replication factor if you use this authorizer.
  authorizer: CassandraAuthorizer

~~~


Restart the cassandra (in all operating systems)

~~~bash

$ service cassandra restart

~~~

---

### Install OpenSource MegamVertice

#### Ubuntu 14.04

~~~bash

  sudo apt-add-repository "deb [arch=amd64] http://get.megam.io/repo/1.5/ubuntu/14.04/stable trusty stable"

  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 9B46B611

  sudo apt-get update

  sudo apt-get install verticenilavu verticegateway nsqd vertice verticevnc

~~~

To start MegamVertice then

~~~bash

  sudo start nsqd

  sudo start nsqadmin

  sudo start nsqlookupd

  sudo start verticegateway

  sudo start verticevnc

  sudo start vertice

  sudo sv start nginx

  sudo sv start unicorn

~~~

To stop MegamVertice then

~~~bash

  sudo stop nsqd

  sudo stop nsqadmin

  sudo stop nsqlookupd

  sudo stop verticegateway

  sudo stop verticevnc

  sudo stop vertice

  sudo sv stop nginx

  sudo sv stop unicorn

~~~

#### Ubuntu 16.04/Debian Jessie

~~~bash

  sudo apt-add-repository "deb [arch=amd64] https://get.megam.io/repo/1.5/ubuntu/16.04/stable xenial stable"

  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 9B46B611

  sudo apt-get update

  sudo apt-get install verticenilavu verticegateway nsqd vertice verticevnc

~~~

To start MegamVertice

~~~bash

  sudo systemctl start nsqd

  sudo systemctl start nsqadmin

  sudo systemctl start nsqlookupd

  sudo systemctl start verticegateway

  sudo systemctl start verticevnc

  sudo systemctl start vertice

  sudo sv start nginx

  sudo sv start unicorn

~~~

To stop MegamVertice

~~~bash

  sudo systemctl stop nsqd

  sudo systemctl stop nsqadmin

  sudo systemctl stop nsqlookupd

  sudo systemctl stop verticegateway

  sudo systemctl stop verticevnc

  sudo systemctl stop vertice

  sudo sv stop nginx

  sudo sv stop unicorn

~~~


#### CentOS 7.2 *experimental*

At the start, install Ruby2.3 and Runit for VerticeNilavu.


##### Ruby2.3

~~~bash

$ wget https://github.com/feedforce/ruby-rpm/releases/download/2.3.1/ruby-2.3.1-1.el7.centos.x86_64.rpm

$ sudo yum install -y libyaml

$ sudo rpm -ivh ruby-2.3.1-1.el7.centos.x86_64.rpm

~~~
##### Runit

~~~bash

$ curl -s https://packagecloud.io/install/repositories/imeyer/runit/script.rpm.sh | sudo bash

$ sudo yum install -y runit-2.1.1-7.el7.centos.x86_64

~~~

~~~bash

  cat << EOT > /etc/yum.repos.d/vertice.repo
  [vertice]
  name=vertice
  baseurl=https://get.megam.io/repo/1.5/centos/7.2/stable
  enabled=1
  gpgcheck=0
  EOT

  sudo yum update

  sudo yum install verticenilavu verticegateway nsqd vertice verticevnc

~~~

To start MegamVertice

~~~bash

  sudo systemctl start nsqd

  sudo systemctl start nsqadmin

  sudo systemctl start nsqlookupd

  sudo systemctl start verticegateway

  sudo systemctl start verticevnc

  sudo systemctl start vertice

  if sv service does not start to run the following command

  runsvdir /var/service &

  then do this

  sudo sv start nginx

  sudo sv start unicorn

~~~

To stop MegamVertice

~~~bash

  sudo systemctl stop nsqd

  sudo systemctl stop nsqadmin

  sudo systemctl stop nsqlookupd

  sudo systemctl stop verticegateway

  sudo systemctl stop verticevnc

  sudo systemctl stop vertice

  sudo sv stop nginx

  sudo sv stop unicorn

~~~

### Docker Images

Here you may be in a position to  use [Habitat - Docker images](https://github.com/megamsys/habitat_plans){: target="_blank"}. *Your choice is open to contribute habitat packages by intimating your interest to the [forum](https://forum.megam.io){: target="_blank"}.*
