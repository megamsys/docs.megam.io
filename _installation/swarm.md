---
title: Swarm
order: 2
---

In case you want to setup your bare metal to run **docker 1.12** then follow these instructions.
{: .info}

---

![Docker architectural view](/img/gettingstarted/docker_architecture_overview.png){: srcset="/img/gettingstarted/docker_architecture_overview.png 800w, /img/gettingstarted/docker_architecture_overview.png 800w"}


### Setup Swarm

To setup swarm master a small VM can be suffice.

####  Pull the swarm master from DockerHub.

~~~bash

$ curl -fsSL https://get.docker.com/ | sh

$ docker run --rm swarm create
Unable to find image 'swarm:latest' locally
latest: Pulling from library/swarm
220609e0bc51: Pull complete
b54bf338fe2f: Pull complete
d53aac5750d5: Pull complete
Digest: sha256:c9e1b4d4e399946c0542accf30f9a73500d6b0b075e152ed1c792214d3509d70
Status: Downloaded newer image for swarm:latest
b38992e6f59c094272e42dd92d72ace2  //this is your unique cluster id

~~~

Keep the `CLUSTERID` handy which is *b38992e6f59c094272e42dd92d72ace2*.

#### Run swarm master in a private/public ip

~~~bash

$ docker run -t -p 2375:2375 -t swarm manage -H :2375 --addr <private/public hostip>:2375  token://b38992e6f59c094272e42dd92d72ace2

~~~


Now upon completion, swarm master is running.

#### Prepare your node(s).

This step needs to be repeated in all the baremetal nodes in which you plan to run docker containers.

We recommend `Docker 1.12 >`

~~~bash

$ curl -fsSL https://get.docker.com/ | sh

//start the docker deaemon with defult subnet for docker0 bridge

$ sudo docker daemon -D -H tcp://<private/public nodeip>:2375 --bip <subnet>/24 --default-gateway <ip>

~~~

Now docker is running in the node using the **subnet docker0**


#### Join all the nodes to the swarm master.

Use the `CLUSTERID` you got in **1.**

Join the node to swarm master.

Paste the token and execute the below command on the master to join node to master

~~~bash

$ docker run -d swarm join --advertise=<private/public nodeip>:2375 token://b38992e6f59c094272e42dd92d72ace2

~~~

Next, configure MegamVertice to deploy containers [here](/configuration/swarm/).
{: .info}
