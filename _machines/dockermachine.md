---
title: "Docker Machine"
order: 2
---

The **MegamVertice Console (UI - Nilavu)** is the main way to launch and manage virtual machines. A command line facility will be issued in our future launch.

---

### Getting Started

Enter MegamVertice Console (UI - nilavu) by typing [https://localhost](https://localhost) in the browser.

Replace *localhost* with *your ip*

### Watch this launch animation

![Deploying DockerMachine](/img/machines/deploy.gif){: srcset="/img/machines/deploy.gif 800w, /img/machines/deploy.gif 1600w"}

### Launch

There are 3 ways to launch.

1. *Marketplaces*
2. *+*
3. *Create VM*

This will open a *new-launcher*.

#### Step 1

Choose *Virtual Machine*.

Choose the *region*, *flavor*, HDD or SSD.

#### Step 2

Choose the *os tab - DockerMachine*, and the *version* you want to launch

#### Step3

- Choose SSH Key (or) Root password option.

*SSH Key*

- You can *create a new sshkeypair*
- Use an existing sshkey
- Upload your own sshkeys

*Root password*

- Type a password for accessing the *root* username for the deployed VM.


#### Launch your DockerMachine


Click Launch.

Voila ! Your "Machine with Docker engine" is launched.

Your will be redirected to the management page. Go ahead and [Connect into your VM](connecting).

#### Launch containers from your workstation


Now that you have launched,  you might want to install **docker-machine** in your *workstation (laptop)* and launch containers in the running dockermachine VM.

[Install Docker Machine in your laptop](https://docs.docker.com/machine/install-machine/)

~~~bash

docker-machine create --url=tcp://<launched_docker_machine_ip> custombox

$ docker-machine ls
NAME        ACTIVE   DRIVER    STATE     URL
custombox   *


~~~
