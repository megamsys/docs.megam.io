---
title: Attach Disks
order: 4
requirements:
  build: Jekyll
  plan: Free
  hosting: Any
---

The **MegamVertice Console (UI - Nilavu)** is the main way to launch and manage virtual machines. A command line facility will be issued in our future launch.

---

### Getting Started

Enter MegamVertice Console (UI - nilavu) by typing [https://localhost](https://localhost) in the browser.

Replace *localhost* with *your ip*

### Watch this animation

![Deploying Machine](/img/machines/attach_disk.gif){: srcset="/img/machines/attach_disk.gif 800w, /img/machines/attach_disk.gif 1600w"}

### Go to Dashboard

Click on the virtual machine that was just launched.

This will open the *management page*.

#### Click Disks tab

Choose `Attach Disk` and type the expandable size for your VM in MB.

Click Attach.

####  Disk Attached

[Connect to your VM](connecting) and verify if the disk was added.

Here we find that `vda` has `10GB` of storage expanded in the VM.

![Expanded VM](/img/machines/disk_attached.png)

Enjoy the extra space you have :).
