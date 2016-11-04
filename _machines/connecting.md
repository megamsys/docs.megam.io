---
title: Connecting to the VM
order: 3
---

The **MegamVertice Console (UI - Nilavu)** is the main way to launch and manage virtual machines. A command line facility will be issued in our future launch.

---

### Getting Started

Enter MegamVertice Console (UI - nilavu) by typing [https://localhost](https://localhost) in the browser.

Replace *localhost* with *your ip*

### Watch this animation

![Deploying DockerMachine](/img/machines/deploy.gif){: srcset="/img/machines/deploy.gif 800w, /img/machines/deploy.gif 1600w"}

### Go to Dashboard

Click on the virtual machine that was just launched.

This will open the *management page*.

#### Click Security tab

We have 2 options, to connect to the running virtual machine.

*1. SSH Key*

Download your private key.

Assume that the key is named `id_rsa_01`

~~~bash

  $ chmod 600 id_rsa_01

  $ ssh -i id_rsa_01 root@<vm ip_address>
  Welcome to Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-32-generic x86_64)
  Documentation:  https://help.ubuntu.com/
  137 packages can be updated.
  72 updates are security updates.
  root@ubuntu:~#

~~~

*2. Root password*

Keep your root_password you just entered during the launch.

~~~bash

  $ ssh root@<vm ip_address>
  Password: <type the root password>
  Welcome to Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-32-generic x86_64)
  Documentation:  https://help.ubuntu.com/
  137 packages can be updated.
  72 updates are security updates.
  root@ubuntu:~#

~~~

#### Voila, I am in.
